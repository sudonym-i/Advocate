import json
from reddit.redditListener import listenForKeywords


def main():
    mode = input()

    if mode == "1":
        with open( "../config.json", 'r') as file:
            config = json.load(file)

        positive_keyphrases = config["positive-keyphrases"].replace(" ", "").split(",")
        negative_keyphrases = config["negative-keyphrases"].replace(" ", "").split(",")

        listenForKeywords(config["context"], positive_keyphrases, negative_keyphrases, config["number-of-positive"], config["require-confirmation"], config["subreddit"])
        file.close()

    elif mode == "2":
        listenForKeywords(config["context"], "", "", "", config["subreddit"])
main()
