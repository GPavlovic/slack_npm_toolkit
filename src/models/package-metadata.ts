export interface PackageMetadata 
{
    name: string;
    description: string;
    'dist-tags': {
        latest: string,
        next: string
    },
    license: string;
    modified: string;
    versions: { [version: string]: PackageVersion };
}

export interface PackageVersion
{
    name: string,
    version: string,
}