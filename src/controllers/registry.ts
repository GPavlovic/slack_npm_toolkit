import express = require("express");
import axios from 'axios';

import { PackageMetadata } from "../models/package-metadata";
import { SlackMessagePayload } from "../models/slack-message-payload";
import { buildPackageMetadataBlocks } from "../message-builders/package-metadata-message";
import { SearchResults } from "../models/search-result";
import { buildPackageSearchMessage } from "../message-builders/package-search-message";
import { buildPackageErrorMessage } from "../message-builders/error-message";

const router = express.Router();

// GET package metadata
router.post('/package', async (req, res) =>
{
    const packageName = req.body.text;
    try
    {
        const registryResponse = await axios.get(`https://registry.npmjs.org/${packageName}`, {
            headers: { 'Accept': 'application/json' }
        });
        const packageMetadata = registryResponse.data as PackageMetadata;
        const messagePayload = new SlackMessagePayload('', buildPackageMetadataBlocks(packageMetadata));
        res.status(200).send(messagePayload);
    }
    catch (err)
    {
        const messagePayload = new SlackMessagePayload('', buildPackageErrorMessage(packageName));
        res.status(200).send(messagePayload);
    }
});

// GET search for npm package
router.post('/search', async (req, res) =>
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

export default router;