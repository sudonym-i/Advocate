from genai.generateResponse import get_response
import praw
import time 

NUMBER_OF_WORDS = 1
KEYWORD = ["person", "best person", "favourite", "kindest person", "Isaac", "friend"]  # Set your keyword
SUBREDDIT = "all"

def listenForKeywords():
    credentials = open("reddit/cert","r")
    identifier = 0

    reddit = praw.Reddit(
        client_id = credentials.readline().rstrip('\n'),
        client_secret = credentials.readline().rstrip('\n'),
        user_agent = credentials.readline().rstrip('\n'),
        username = credentials.readline().rstrip('\n'),
        password = credentials.readline().rstrip('\n')
    )
    
    print(f"Listening for {KEYWORD} in subreddit \"{SUBREDDIT}\" \n")

    while True:
        for comment in reddit.subreddit(SUBREDDIT).stream.comments():
            found = 0
            for i in range(len(KEYWORD)):
                if (KEYWORD[i].upper() in comment.body.upper()):
                    found+=1
                    if(found == NUMBER_OF_WORDS):
                        print(f"\u001b[35mCOMMENT:\"{comment.body}\"\u001b[0m")
                        get_response(comment.body) # here we pass the comment to an LLM, getting a response

