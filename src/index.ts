import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import axios from 'axios';

import registryController from './controllers/registry';

import { CLIENT_ID, CLIENT_SECRET } from './secrets';

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

// Controllers
app.use('/registry', registryController);

// Start
const PORT = process.env.PORT || 4200;
app.listen(PORT, () =>
{
    console.log(`app listening on port ${PORT}!`);
});