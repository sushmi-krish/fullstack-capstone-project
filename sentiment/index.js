require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
//  import the natural library
const natural = require("natural");

// initialize the express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Define the sentiment analysis route
//  create the POST /sentiment analysis
app.post('/sentiment', async (req, res) => {

    // Task 4: extract the sentence parameter
    const { sentence } = req.body;


    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Perform sentiment analysis
    try {
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        let sentiment = "neutral";

        // Task 5: set sentiment to negative or positive based on score rules
      if(analysisResult<0){
             sentiment = "Negative";
      }
      else if(analysisResult <=0.33){
             sentiment ="neutral"
      }
      else{
             sentiment = 'positive'
      }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        // send a status code of 200 with both sentiment score and the sentiment txt in the format { sentimentScore: analysisResult, sentiment: sentiment }
          res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment})
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        //  if there is an error, return a HTTP code of 500 and the json {'message': 'Error performing sentiment analysis'}
        res.status(500).json({'message':'Error performing sentiment analysis'})
    }
});

//start the server
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
