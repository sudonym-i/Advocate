import praw

def replyToLatestPost(context, ident, subreddit):
    with open("auth-reddit", "r") as credentials:
        reddit = praw.Reddit(
            client_id=credentials.readline().rstrip('\n'),
            client_secret=credentials.readline().rstrip('\n'),
            user_agent=credentials.readline().rstrip('\n'),
            username=credentials.readline().rstrip('\n'),
            password=credentials.readline().rstrip('\n')
        )

    try:
        comment = reddit.comment(id=ident)
        print(f"\033[32mReplying to comment by u/{comment.author} in r/{subreddit} with:\033[0m \n\n {context}\n")
        comment.reply(context)
        print("\n\033[32mPOSTED SUCCESFULLY\033[0m")
    except Exception as e:
        print(f"FAILED TO REPLY: {e}")