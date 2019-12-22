import * as packageJson from 'package-json';

const getLatestNpmVersion = async (
    packageName: string,
    options?: packageJson.Options,
): Promise<string | undefined> => {
    try {
        const { version } = await packageJson(
            packageName.toLowerCase(),
            options,
        );
        return version as string;
    } catch (e) {
        return undefined;
    }
};

export default getLatestNpmVersion;
