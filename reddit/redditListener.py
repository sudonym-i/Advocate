import praw
import time 

KEYWORD = ["doggystyle", "cool", "fun"]  # Set your keyword
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
            for i in range(len(KEYWORD)):
                if KEYWORD[i].upper() in comment.body.upper():
                    cache = open(f"reddit/reddit_chache/{identifier}" ,"w")
                    cache.write(comment.body)
                    cache.close()

listenForKeywords()
#  ^^ can be usd to call as a funtion later, If i choose 
#  to implement things dfferently in the future
