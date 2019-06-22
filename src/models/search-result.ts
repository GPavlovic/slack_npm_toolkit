export interface SearchResults
{
    objects: PackageSearchResult[];
    total: number;
    time: string;
};

export interface PackageSearchResult
{
    package: PackageResult;
    searchScore: number;
};

export interface PackageResult
{
    name: string;
    description: string;
    version: string;
    links: PackageSearchResultLinks
};

export interface PackageSearchResultLinks
{
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
};