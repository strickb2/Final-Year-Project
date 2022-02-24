from sqlite3 import connect
import tweepy
from tweepy import OAuthHandler

def connectToTwitter():
    try:
        # Authenticate to Twitter
        auth = tweepy.OAuthHandler("vrpBXKviYYOocIcC6Zs0PefXu",
            "OkJ2ru8m6iYHYXsFvCQY5tdbqxdHbtR5rXhKoJaMhSkmdTrwtH")  # Generated on dev account
        auth.set_access_token("1295661156883935233-9Tk7AKUqe7UIjXAfiJwSU9p6abJJXg",
            "ftWX8qT89nBrYWgBOUZ89zaPxJhmf0KLZnXeiTIDIdRjL")  # Generated on dev account
        api = tweepy.API(auth)
        return api
    except:
        return ConnectionError("Could not connect to Twitter")

def fetch_tweets_text(screen_name):
    api = connectToTwitter() # Gets the tweepy API object
    try:
        # Fetches the tweets using the api
        fetched_data = api.user_timeline(screen_name=str(screen_name), count=200, exclude_replies=True, include_rts=False)
        tweets = [] # Empty list that stores all the tweets
        for tweet in fetched_data:
            txt = tweet.text # Gets the text from the tweet
            created_at = tweet.created_at # Gets time tweet was made
            tweets.append({"text":txt, "created_at": created_at})
            if len(tweets) == 5:
                break
        return tweets
    except:
        return {'error':"No Tweets Found"}

def fetch_tweets_sentiment(screen_name):
    api = connectToTwitter()
    try:
        # Fetches the tweets using the api
        fetched_data = api.user_timeline(screen_name=str(screen_name), count=200, exclude_replies=True, include_rts=False)
        tweets = [] # Empty list that stores all the tweets
        for tweet in fetched_data:
            tweets.append(tweet)
            if len(tweets) == 20:
                break
        return tweets
    except:
        return {'error':"No Tweets Found"}