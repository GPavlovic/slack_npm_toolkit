import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import { PackageMetadata } from './models/package-metadata';
import { buildPackageMetadataBlocks } from './package-metadata-message-builder';
import { SlackMessagePayload } from './models/slack-message-payload';

const request = require('request');
// Create the app
const app = express();

// Middleware
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Temp for testing
app.get('/', (req, res) => 
{
    res.send('Hello World!');
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function (req, res)
{
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code)
    {
        res.status(500);
        res.send({ "Error": "Looks like we're not getting code." });
        console.log("Looks like we're not getting code.");
    } else
    {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: { code: req.query.code, client_id: "***REMOVED***", client_secret: "***REMOVED***" }, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body)
            {
                if (error)
                {
                    console.log(error);
                }
                else
                {
                    res.json(body);

                }
            })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function (req, res)
{
    res.send('Your ngrok tunnel is up and running!');
});

app.post('/package', async (req, res) =>
{
    const packageName = req.body.text;
    const registryResponse = await axios.get(`https://registry.npmjs.org/${packageName}`, {
        headers: { 'Accept': 'application/json' }
    });
    const packageMetadata = registryResponse.data as PackageMetadata;
    const messagePayload = new SlackMessagePayload('', buildPackageMetadataBlocks(packageMetadata));
    res.status(200).send(messagePayload);
});

// Start
app.listen(4200, () =>
{
    console.log('app listening on port 4200!');
});