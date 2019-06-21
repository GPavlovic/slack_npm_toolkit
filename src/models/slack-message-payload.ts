export class SlackMessagePayload
{
    // The usage of this field changes depending on whether you're using blocks or not. If you are, this is used as a fallback string to display in notifications. If you aren't, this is the main body text of the message. It can be formatted as plain text, or with mrkdwn. This field is not enforced as required when using blocks, however it is highly recommended that you include it as the aforementioned fallback.
    public text: string;
    // An array of layout blocks in the same format as described in the layout block guide.
    // https://api.slack.com/messaging/composing/layouts#
    public blocks?: any[];
    // An array of legacy secondary attachments. We recommend you use blocks instead.
    // https://api.slack.com/reference/messaging/attachments
    public attachments?: any[];
    // The ID of another un-threaded message to reply to.
    // https://api.slack.com/messaging/managing#threading
    public thread_ts?: string;
    // Determines whether the text field is rendered according to mrkdwn formatting or not. Defaults to true.
    // https://api.slack.com/messaging/composing/formatting#basics
    public mrkdwn?: boolean;

    constructor(text: string, blocks?: any[], attachments?: any[], thread_ts?: string, mrkdwn?: boolean)
    {
        this.text = text;
        this.blocks = blocks;
        this.attachments = attachments;
        this.thread_ts = thread_ts;
        this.mrkdwn = mrkdwn;
    }
}