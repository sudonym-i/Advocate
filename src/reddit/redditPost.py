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

    print(f"Replying to the latest post in subreddit \"{subreddit}\" \n")
    try:
        # Get the latest submission
        submission = reddit.submission(id=ident)
        submission.reply(context)
        print(f"Replied to: {submission.title} in r/{subreddit} with: {context}")
    except Exception as e:
        print(f"Failed to reply: {e}")