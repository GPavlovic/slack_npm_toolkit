const buildMarkdownSectionBlock = (markdownText: string) =>
{
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": markdownText
        }
    };
};

const buildMarkdownContextBlock = (markdownText: string) =>
{
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": markdownText
        }
    };
};

export { buildMarkdownSectionBlock, buildMarkdownContextBlock };