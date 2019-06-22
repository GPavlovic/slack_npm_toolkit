import { SearchResults, PackageSearchResult } from './../models/search-result';
import { buildDivider, buildMarkdownSectionBlock, buildMarkdownContextBlock } from './block-builder';

const buildPackageSearchMessage = (searchResults: SearchResults) =>
{
    const packageBlocks = [];
    // Header
    packageBlocks.push(buildMarkdownSectionBlock(`Found *${searchResults.total}* results`));
    packageBlocks.push(buildDivider());
    for (const searchResult of searchResults.objects.slice(0, 4))
    {
        // Result contents
        let resultLinks = buildResultLinks(searchResult);
        packageBlocks.push(buildMarkdownSectionBlock(`*${searchResult.package.name}* | ${searchResult.package.version}\n${searchResult.package.description}${resultLinks}`));
        // Divider
        packageBlocks.push(buildDivider());
    }
    // Result count
    packageBlocks.push(buildMarkdownContextBlock(`${new Date(searchResults.time).toLocaleTimeString()}`));
    return packageBlocks;
};

const buildResultLinks = (searchResult: PackageSearchResult): string =>
{
    let resultLinks = '';
    if (searchResult.package.links.homepage
        || searchResult.package.links.repository)
    {
        resultLinks += '\n';
        const links = [];
        if (searchResult.package.links.homepage)
        {
            links.push(`<${searchResult.package.links.homepage}|Homepage>`);
        }
        if (searchResult.package.links.repository)
        {
            links.push(`<${searchResult.package.links.repository}|Repository>`);
        }
        resultLinks += links.join(' | ')
    }
    return resultLinks;
};

export { buildPackageSearchMessage };