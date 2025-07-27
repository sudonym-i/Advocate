from openai import OpenAI
from reddit.redditReply import replyToLatestPost

#meta-llama/llama-3.2-1b-instruct:free
#              ^^ Free but terrible LLM model - Definitely use for testing however

# openai/gpt-4.1-nano
#          ^^ Not free, but affordable and much better preformance

MODEL = "mistralai/mistral-nemo"

client = OpenAI(
base_url="https://openrouter.ai/api/v1",
api_key= open("auth-ai" , "r").read().rstrip('\n'),
)

def get_response(prompt, id, subreddit):
   
    print("......")
    
    completion = client.chat.completions.create(
        model = MODEL,
        messages=[{"role": "user","content": prompt}]
    )

    replyToLatestPost(completion.choices[0].message.content, id, subreddit)
    print("\n\n") # temporary spacing for demo
    return False
