import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import axios from 'axios';

import { CLIENT_ID, CLIENT_SECRET } from './secrets';
import { PackageMetadata } from './models/package-metadata';
import { buildPackageMetadataBlocks } from './message-builders/package-metadata-message-builder';
import { SlackMessagePayload } from './models/slack-message-payload';
import { SearchResults } from './models/search-result';
import { buildPackageSearchMessage } from './message-builders/package-search-message-builder';

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', async (req, res) =>
{
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code)
    {
        res.status(500);
        res.send({ "Error": "Looks like we're not getting code." });
        console.log("Looks like we're not getting code.");
    }
    else
    {
        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        const oauthResponse = await axios.get('https://slack.com/api/oauth.access', {
            params: { code: req.query.code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }
        });
        if (oauthResponse.status != 200)
        {
            console.log(oauthResponse.data);
        }
        else
        {
            res.status(200);
            res.send("App successfully installed!");
        }
    }
});

// GET package metadata
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

// GET search for npm package
app.post('/search', async (req, res) =>
{
    const searchString = req.body.text;
    const registryResponse = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
        headers: { 'Accept': 'application/json' },
        params: {
            'text': searchString
        }
    });
    const searchResults = registryResponse.data as SearchResults;
    const messagePayload = new SlackMessagePayload('', buildPackageSearchMessage(searchResults));
    res.status(200).send(messagePayload);
});

// Start
const PORT = process.env.PORT || 4200;
app.listen(PORT, () =>
{
    console.log(`app listening on port ${PORT}!`);
});