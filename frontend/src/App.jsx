import React, { useState, useEffect } from 'react';
import './App.css';

// Mock API service
const ApiService = {
  fetchConfig: async () => {
    // In a real app, this would be a fetch call to an API endpoint
    return {
      "context": ": convince me that 'Isaac' is the best name in 100 or less words",
      "positive-keyphrases": "best, name, fun, name, good, name, called",
      "number-of-positive": 2,
      "negative-keyphrases": "",
      "require-confirmation": false,
      "subreddit": "all"
    };
  },
  
  saveConfig: async (config) => {
    // In a real app, this would be a POST/PUT to an API endpoint
    console.log('Config saved:', config);
    return { success: true };
  },
  
  fetchResponses: async () => {
    // Mock responses data
    return [
      {
        id: 1,
        commentUrl: 'https://reddit.com/r/askreddit/comments/123/example1',
        comment: "What's your opinion on the name Isaac? I think it might be the best name.",
        response: "Isaac is undoubtedly the best name! It has deep historical roots dating back to biblical times, while maintaining relevance in modern society. The name carries a sense of wisdom and intelligence - just think of Sir Isaac Newton! It's versatile, working well for both children and adults. Isaac has a warm, friendly sound that's easy to pronounce globally. It strikes the perfect balance between traditional and contemporary, avoiding trends that will feel dated in a decade. With its timeless charm and distinguished history, Isaac truly stands among the greatest names of all time.",
        timestamp: '2025-04-22T14:35:22Z',
        matchedKeywords: ['best', 'name']
      },
      {
        id: 2, 
        commentUrl: 'https://reddit.com/r/namenerds/comments/456/example2',
        comment: "I'm thinking of naming my son Isaac. Has a good sound to it, doesn't it?",
        response: "You've made an excellent choice with Isaac! It's a name that carries gravitas and warmth simultaneously. Isaac has historical significance while remaining contemporary and approachable. The name Isaac emanates strength and intelligence (like the brilliant Isaac Newton), yet has friendly, gentle undertones. It works beautifully across cultures and languages, and avoids being trendy or dated. Isaac has perfect rhythm - two pleasant syllables that flow naturally. For a lifetime of positive first impressions and a name that suits all ages, Isaac truly stands out as the best possible choice for your son.",
        timestamp: '2025-04-22T12:15:07Z',
        matchedKeywords: ['good', 'name']
      }
    ];
  },
  
  startMonitoring: async () => {
    // In a real app, this would start the monitoring process
    return { status: 'active', message: 'Monitoring started successfully' };
  },
  
  stopMonitoring: async () => {
    // In a real app, this would stop the monitoring process
    return { status: 'inactive', message: 'Monitoring stopped successfully' };
  },
  
  getStatus: async () => {
    // In a real app, this would get the current monitoring status
    return { 
      status: 'active', 
      lastCheck: '2025-04-23T09:45:12Z',
      responseCount: 27,
      uptime: '3 days, 7 hours'
    };
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfig, setEditedConfig] = useState(null);
  const [responses, setResponses] = useState([]);
  const [status, setStatus] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [configData, responsesData, statusData] = await Promise.all([
          ApiService.fetchConfig(),
          ApiService.fetchResponses(),
          ApiService.getStatus()
        ]);
        
        setConfig(configData);
        setEditedConfig(JSON.parse(JSON.stringify(configData)));
        setResponses(responsesData);
        setStatus(statusData);
      } catch (error) {
        showNotification('Error loading data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditConfig = () => {
    setIsEditing(true);
    setEditedConfig(JSON.parse(JSON.stringify(config)));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedConfig(JSON.parse(JSON.stringify(config)));
  };

  const handleSaveConfig = async () => {
    try {
      setIsLoading(true);
      const result = await ApiService.saveConfig(editedConfig);
      if (result.success) {
        setConfig(editedConfig);
        setIsEditing(false);
        showNotification('Configuration saved successfully');
      }
    } catch (error) {
      showNotification('Error saving configuration', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigChange = (key, value) => {
    setEditedConfig({
      ...editedConfig,
      [key]: value
    });
  };

  const handleStartMonitoring = async () => {
    try {
      setIsLoading(true);
      const result = await ApiService.startMonitoring();
      setStatus({ ...status, status: result.status });
      showNotification(result.message);
    } catch (error) {
      showNotification('Error starting monitoring', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopMonitoring = async () => {
    try {
      setIsLoading(true);
      const result = await ApiService.stopMonitoring();
      setStatus({ ...status, status: result.status });
      showNotification(result.message);
    } catch (error) {
      showNotification('Error stopping monitoring', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !config) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <header className="header">
        <div className="logo">
          <h1>Advocate</h1>
          <span className="subtitle">Reddit Response Bot</span>
        </div>
        <nav className="main-nav">
          <button 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            Settings
          </button>
          <button 
            className={`nav-button ${activeTab === 'responses' ? 'active' : ''}`}
            onClick={() => handleTabChange('responses')}
          >
            Responses
          </button>
        </nav>
      </header>
      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Status</h3>
                <div className={`status-indicator ${status?.status}`}>
                  {status?.status === 'active' ? 'Active' : 'Inactive'}
                </div>
                <div className="status-actions">
                  <button 
                    className="button primary"
                    disabled={status?.status === 'active'}
                    onClick={handleStartMonitoring}
                  >
                    Start
                  </button>
                  <button 
                    className="button secondary"
                    disabled={status?.status === 'inactive'}
                    onClick={handleStopMonitoring}
                  >
                    Stop
                  </button>
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Last Check</h3>
                <p className="stat-value">{new Date(status?.lastCheck).toLocaleString()}</p>
              </div>
              
              <div className="stat-card">
                <h3>Total Responses</h3>
                <p className="stat-value">{status?.responseCount}</p>
              </div>
              
              <div className="stat-card">
                <h3>Uptime</h3>
                <p className="stat-value">{status?.uptime}</p>
              </div>
            </div>
            
            <div className="card recent-responses">
              <h2>Recent Responses</h2>
              <div className="response-list">
                {responses.slice(0, 3).map(response => (
                  <div key={response.id} className="response-item">
                    <div className="response-header">
                      <a href={response.commentUrl} target="_blank" rel="noreferrer">
                        Reddit Comment
                      </a>
                      <span className="response-time">
                        {new Date(response.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="response-content">
                      <div className="comment-box">
                        <h4>Comment:</h4>
                        <p>{response.comment}</p>
                      </div>
                      <div className="response-box">
                        <h4>Response:</h4>
                        <p>{response.response}</p>
                      </div>
                    </div>
                    <div className="response-footer">
                      <span className="keywords">
                        Matched: {response.matchedKeywords.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings_card">
              <div className="card-header">
                <h2>Configuration</h2>
                {!isEditing ? (
                  <button className="button primary" onClick={handleEditConfig}>
                    Edit
                  </button>
                ) : (
                  <div className="button-group">
                    <button className="button secondary" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button className="button primary" onClick={handleSaveConfig}>
                      Save
                    </button>
                  </div>
                )}
              </div>
              
              <div className="config-form">
                <div className="form-group">
                  <label htmlFor="context">Context</label>
                  <textarea
                    id="context"
                    value={isEditing ? editedConfig.context : config.context}
                    onChange={(e) => handleConfigChange('context', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                  <p className="form-help">Instructions for the LLM when generating responses.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="positive-keyphrases">Positive Keyphrases</label>
                  <textarea
                    id="positive-keyphrases"
                    value={isEditing ? editedConfig["positive-keyphrases"] : config["positive-keyphrases"]}
                    onChange={(e) => handleConfigChange('positive-keyphrases', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                  />
                  <p className="form-help">Comma-separated list of keywords or phrases to look for.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="number-of-positive">Number of Positive Required</label>
                  <input
                    type="number"
                    id="number-of-positive"
                    value={isEditing ? editedConfig["number-of-positive"] : config["number-of-positive"]}
                    onChange={(e) => handleConfigChange('number-of-positive', parseInt(e.target.value))}
                    disabled={!isEditing}
                    min={0}
                  />
                  <p className="form-help">Minimum number of positive keyphrases that must be present.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="negative-keyphrases">Negative Keyphrases</label>
                  <textarea
                    id="negative-keyphrases"
                    value={isEditing ? editedConfig["negative-keyphrases"] : config["negative-keyphrases"]}
                    onChange={(e) => handleConfigChange('negative-keyphrases', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                  />
                  <p className="form-help">Comma-separated list of keywords or phrases to exclude.</p>
                </div>
                
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="require-confirmation"
                    checked={isEditing ? editedConfig["require-confirmation"] : config["require-confirmation"]}
                    onChange={(e) => handleConfigChange('require-confirmation', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <label htmlFor="require-confirmation">Require Confirmation</label>
                  <p className="form-help">If checked, responses will require manual approval before posting.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subreddit">Subreddit</label>
                  <input
                    type="text"
                    id="subreddit"
                    value={isEditing ? editedConfig.subreddit : config.subreddit}
                    onChange={(e) => handleConfigChange('subreddit', e.target.value)}
                    disabled={!isEditing}
                  />
                  <p className="form-help">Subreddit to monitor (use 'all' for all subreddits).</p>
                </div>
              </div>
              
              <div className="config-json">
                <h3>Config JSON</h3>
                <pre>{JSON.stringify(isEditing ? editedConfig : config, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'responses' && (
          <div className="responses-tab">
            <div className="card">
              <h2>Response History</h2>
              
              <div className="response-list full">
                {responses.map(response => (
                  <div key={response.id} className="response-item">
                    <div className="response-header">
                      <a href={response.commentUrl} target="_blank" rel="noreferrer">
                        Reddit Comment
                      </a>
                      <span className="response-time">
                        {new Date(response.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="response-content">
                      <div className="comment-box">
                        <h4>Comment:</h4>
                        <p>{response.comment}</p>
                      </div>
                      <div className="response-box">
                        <h4>Response:</h4>
                        <p>{response.response}</p>
                      </div>
                    </div>
                    <div className="response-footer">
                      <span className="keywords">
                        Matched: {response.matchedKeywords.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>Advocate© 2025</p>
      </footer>
    </div>
  );
}

export default App;
