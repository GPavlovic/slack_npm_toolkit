import { buildButtonElement, buildMrkdwnElement } from "./element-builder";

const buildMarkdownSectionBlock = (markdownText: string) =>
{
    return {
        "type": "section",
        "text": buildMrkdwnElement(markdownText)
    };
};

const buildMarkdownContextBlock = (markdownText: string) =>
{
    return {
        "type": "context",
        "elements": [buildMrkdwnElement(markdownText)]
    };
};

const buildActionsButtonsBlock = (buttonTexts: string[]) =>
{
    const buttons = [];
    for (const t in buttonTexts)
    {
        buttons.push(buildButtonElement(t));
    }

    return {
        "type": "actions",
        "elements": buttons
    };
};

const buildDivider = () =>
{
    return {
        "type": "divider"
    };
};

export
{
    buildMarkdownSectionBlock,
    buildMarkdownContextBlock,
    buildActionsButtonsBlock,
    buildDivider
};