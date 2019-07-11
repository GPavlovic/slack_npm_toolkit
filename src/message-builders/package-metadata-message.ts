import { PackageMetadata } from '../models/package-metadata';
import { buildMarkdownSectionBlock, buildMarkdownContextBlock } from './block';

const buildPackageMetadataBlocks = (packageMetadata: PackageMetadata): any[] =>
{
    const searchMessageBlocks = [];
    // Name
    searchMessageBlocks.push(buildMarkdownSectionBlock(`*${packageMetadata.name}*`));
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
        searchMessageBlocks.push(buildMarkdownContextBlock(versionsLiteral));
    }
    // Description & Homepage
    searchMessageBlocks.push(buildMarkdownSectionBlock(`${packageMetadata.description}\n <${packageMetadata.homepage}|Homepage>`));
    // Search time
    const searchTime = new Date();
    const searchTimeUnixTimestamp = (searchTime.getTime() / 1000).toFixed(0);
    searchMessageBlocks.push(buildMarkdownContextBlock(`<!date^${searchTimeUnixTimestamp}^{date_num} {time_secs}|${searchTime.toLocaleTimeString()}>`));
    return searchMessageBlocks;
};
export { buildPackageMetadataBlocks };