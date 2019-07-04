const buildButtonElement = (text: string) =>
{
    return {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": text,
            "emoji": false
        },
        "value": text
    }
};

const buildMrkdwnElement = (text: string) =>
{
    return {
        "type": "mrkdwn",
        "text": text
    };
};

export { buildButtonElement, buildMrkdwnElement };