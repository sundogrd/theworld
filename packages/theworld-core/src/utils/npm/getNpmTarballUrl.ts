function normalizeRegistry(registry: string): string {
    if (registry.endsWith('/')) {
        return registry;
    }
    return `${registry}/`;
}

function getScopelessName(name: string): string {
    if (!name.startsWith('@')) {
        return name;
    }
    return name.split('/')[1];
}

export default function(
    pkgName: string,
    pkgVersion: string,
    opts?: {
        registry?: string;
    },
): string {
    const registry = normalizeRegistry(
        (opts && opts.registry) || 'https://registry.npmjs.org/',
    );

    const scopelessName = getScopelessName(pkgName);
    return `${registry}${pkgName}/-/${scopelessName}-${pkgVersion}.tgz`;
}
