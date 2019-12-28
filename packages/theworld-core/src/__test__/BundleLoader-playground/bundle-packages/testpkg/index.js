const path = require('path');
const fse = require('fs-extra');

async function registerI18n(loader) {
    const i18nDirectories = fse
        .readdirSync(path.resolve(__dirname, './i18n'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        i18nDirectories.map(async dir => {
            await loader.loadI18n(
                dir.name,
                require(path.resolve(
                    __dirname,
                    './i18n',
                    dir.name,
                    'index.js',
                )),
            );
        }),
    );
}

async function registerItems(loader) {
    // register template
    const templateFiles = fse
        .readdirSync(path.resolve(__dirname, './items/templates'), {
            withFileTypes: true,
        })
        .filter(dirent => !dirent.isDirectory());
    await Promise.all(
        templateFiles.map(async file => {
            await loader.loadItemTemplate(
                require(path.resolve(
                    __dirname,
                    './items/templates',
                    file.name,
                )),
            );
        }),
    );
    // register items
    const itemDirectories = fse
        .readdirSync(path.resolve(__dirname, './items/items'), {
            withFileTypes: true,
        })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        itemDirectories.map(async dir => {
            await loader.loadItem(
                require(path.resolve(
                    __dirname,
                    './items/items',
                    dir.name,
                    'index.js',
                )),
            );
        }),
    );
}

async function registerCreatures(loader) {
    // register template
    const templateFiles = fse
        .readdirSync(path.resolve(__dirname, './creatures/templates'), {
            withFileTypes: true,
        })
        .filter(dirent => !dirent.isDirectory());
    await Promise.all(
        templateFiles.map(async file => {
            await loader.loadCreatureTemplate(
                require(path.resolve(
                    __dirname,
                    './creatures/templates',
                    file.name,
                )),
            );
        }),
    );
    // register creatures
    const itemDirectories = fse
        .readdirSync(path.resolve(__dirname, './creatures/creatures'), {
            withFileTypes: true,
        })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        itemDirectories.map(async dir => {
            await loader.loadCreature(
                require(path.resolve(
                    __dirname,
                    './creatures/creatures',
                    dir.name,
                    'index.js',
                )),
            );
        }),
    );
}

async function registerAttributes(loader) {
    // register items
    const attributesDirectories = fse
        .readdirSync(path.resolve(__dirname, './attributes'), {
            withFileTypes: true,
        })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        attributesDirectories.map(async dir => {
            await loader.loadAttribute(
                require(path.resolve(
                    __dirname,
                    './attributes',
                    dir.name,
                    'index.js',
                )),
            );
        }),
    );
}

async function registerActions(loader) {
    const actionDirectories = fse
        .readdirSync(path.resolve(__dirname, './actions'), {
            withFileTypes: true,
        })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        actionDirectories.map(async dir => {
            await loader.loadAction(
                require(path.resolve(
                    __dirname,
                    './actions',
                    dir.name,
                    'index.js',
                )),
            );
        }),
    );
}

const init = async loader => {
    await registerI18n(loader);
    await registerActions(loader);
    await registerAttributes(loader);
    await registerItems(loader);
    await registerCreatures(loader);
};

module.exports = {
    init: init,
};
