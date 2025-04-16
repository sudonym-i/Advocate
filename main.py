from reddit.redditListener import listenForKeywords
from multiprocessing import Process
import os

def trigger(filepath):
    print(f"Executing {filepath}")
    os.system(f"python3 {filepath}")

def main():
    reddit_listener = Process(target=trigger, args=("reddt/redditListener.py",))
    chatGPT_response = Process(target=run_script, args=("openai/generateResponse.py",))
    reddit_listener.start()
    chatGPT_response.start()

    reddit_listener.join()
    chatGPT_response.join()

main()
