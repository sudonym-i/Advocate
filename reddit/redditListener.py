from genai.generateResponse import get_response
import praw
import time 

def listenForKeywords(context, positive_keyphrases, negative_keyphrases, number_of_words, require_confirmation, subreddit):
    credentials = open("auth-reddit","r")
    identifier = 0

    reddit = praw.Reddit(
        client_id = credentials.readline().rstrip('\n'),
        client_secret = credentials.readline().rstrip('\n'),
        user_agent = credentials.readline().rstrip('\n'),
        username = credentials.readline().rstrip('\n'),
        password = credentials.readline().rstrip('\n')
    )
    
    print(f"Listening for {positive_keyphrases} in subreddit \"{subreddit}\" \n")

    while True:
        for comment in reddit.subreddit(subreddit).stream.comments():
            found = 0
            for i in range(len(positive_keyphrases)):
                if (positive_keyphrases[i].upper() in comment.body.upper()):
                    found+=1
                    if(found == number_of_words):
                        print(f"\u001b[35mCOMMENT:\"{comment.body}\"\u001b[0m")
                        get_response(comment.body + context) # here we pass the comment to an LLM, getting a response

