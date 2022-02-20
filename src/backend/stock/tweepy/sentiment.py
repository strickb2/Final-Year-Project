from .fetch_tweets import fetch_tweets_sentiment
import re 
import nltk
import pandas as pd
nltk.download('punkt')   
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer 
from textblob import TextBlob


def cleanText(text):
    text = text.lower()
    # Removes all mentions (@username) from the tweet since it is of no use to us
    text = re.sub(r'(@[A-Za-z0-9_]+)', '', text)
        
    # Removes any link in the text
    text = re.sub('http://\S+|https://\S+', '', text)

    # Only considers the part of the string with char between a to z or digits and whitespace characters
    # Basically removes punctuation
    text = re.sub(r'[^\w\s]', '', text)

    # Removes stop words that have no use in sentiment analysis 
    text_tokens = word_tokenize(text)
    text = [word for word in text_tokens if not word in stopwords.words()]

    text = ' '.join(text)
    return text

def stem(text):
    # This function is used to stem the given sentence usign Porter's Stemmer Algorithm
    porter = PorterStemmer()
    token_words = word_tokenize(text)
    stem_sentence = []
    for word in token_words:
        stem_sentence.append(porter.stem(word))
    return " ".join(stem_sentence)

def sentiment(cleaned_text):
    # Returns the sentiment based on the polarity of the input TextBlob object
    if cleaned_text.sentiment.polarity > 0:
        return 'positive'
    elif cleaned_text.sentiment.polarity < 0:
        return 'negative'
    else:
        return 'neutral'

def fetch_sentiment(screen_name):
    fetched_tweets = fetch_tweets_sentiment(screen_name)
    # Start sentiment by cleaning, stemming and getting sentiments
    tweets = [] # Empty list that stores all the tweets
    for tweet in fetched_tweets:
        txt = tweet.text # Gets the text from the tweet
        clean_txt = cleanText(txt) # Cleans the tweet
        stem_txt = TextBlob(stem(clean_txt)) # Stems the tweet
        sent = sentiment(stem_txt) # Gets the sentiment from the tweet
        tweets.append((txt, clean_txt, sent))
    
    # Converting the list into a pandas Dataframe
    df = pd.DataFrame(tweets, columns= ['tweets', 'clean_tweets','sentiment'])

    # Dropping the duplicate values just in case there are some tweets that are copied
    df = df.drop_duplicates(subset='clean_tweets')

    ptweets = df[df['sentiment'] == 'positive']
    p_perc = 100 * len(ptweets)/len(tweets)
    ntweets = df[df['sentiment'] == 'negative']
    n_perc = 100 * len(ntweets)/len(tweets)

    if int(p_perc) > int(n_perc) and int(p_perc) > int(100 - p_perc - n_perc):
        return {"sentiment":"pos", "percent": str(int(p_perc))}
    elif int(n_perc) > int(p_perc) and int(n_perc) > int(100 - p_perc - n_perc):
        return {"sentiment":"neg", "percent": str(int(n_perc))}
    else:
        return {"sentiment":"neu", "percent": str(int(100 - p_perc - n_perc))}
