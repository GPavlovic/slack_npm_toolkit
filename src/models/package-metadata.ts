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
    homepage: string;
    repository: PackageRepository;
    time: {
        modified: Date;
        created: Date;
        [version: string]: Date
    }
}

export interface PackageVersion
{
    name: string,
    version: string,
}

export interface PackageRepository
{
    type: string;
    url: string;
}