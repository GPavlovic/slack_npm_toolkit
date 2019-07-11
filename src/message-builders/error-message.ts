import { buildMarkdownSectionBlock } from "./block";

const buildPackageErrorMessage = (packageName: string): any[] =>
{
    const messageBlocks = [];
    // Name
    messageBlocks.push(buildMarkdownSectionBlock(`Failed to fetch information for package *${packageName}*`));
    return messageBlocks;
};
export { buildPackageErrorMessage };