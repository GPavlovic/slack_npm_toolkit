import { PackageMetadata } from './models/package-metadata';
import { buildMarkdownSectionBlock, buildMarkdownContextBlock } from './block-builder';

const buildPackageMetadataBlocks = (packageMetadata: PackageMetadata): any[] =>
{
    const messageBlocks = [];
    // Name
    messageBlocks.push(buildMarkdownSectionBlock(`*${packageMetadata.name}*`));
    // Versions
    let versionsLiteral = ``;
    const latestVersion = packageMetadata['dist-tags'].latest;
    const nextVersion = packageMetadata['dist-tags'].next;
    if (latestVersion != null)
    {
        versionsLiteral += `Latest: ${packageMetadata['dist-tags'].latest}`;
    }
    if (nextVersion != null)
    {
        if (versionsLiteral.length > 0)
        {
            versionsLiteral += ' | '
        }
        versionsLiteral += `Next: ${packageMetadata['dist-tags'].next}`;
    }
    if (versionsLiteral != null)
    {
        messageBlocks.push(buildMarkdownContextBlock(versionsLiteral));
    }
    // Description & homepage
    messageBlocks.push(buildMarkdownSectionBlock(`${packageMetadata.description}\n <${packageMetadata.homepage}|Homepage>`));
    return messageBlocks;
};
export { buildPackageMetadataBlocks };