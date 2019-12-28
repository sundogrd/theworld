const path = require('path');
const fse = require('fs-extra');

async function registerI18n(loader) {
    const i18nDirectories = fse
        .readdirSync(path.resolve('./i18n'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        i18nDirectories.map(async dir => {
            await loader.registerI18n(
                dir.name,
                require(path.resolve('./i18n', dir.name, 'index.js')),
            );
        }),
    );
}

async function registerItems(loader) {
    // register items
    const itemDirectories = fse
        .readdirSync(path.resolve('./items/items'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        itemDirectories.map(async dir => {
            await loader.registerItem(
                require(path.resolve('./items/items', dir.name, 'index.js')),
            );
        }),
    );

    // register template
    const templateFiles = fse
        .readdirSync(path.resolve('./items/templates'), { withFileTypes: true })
        .filter(dirent => !dirent.isDirectory());
    await Promise.all(
        templateFiles.map(async file => {
            await loader.registerItemTemplate(
                require(path.resolve('./items/templates', dir.name)),
            );
        }),
    );
}

async function registerCreatures(loader) {
    // register items
    const itemDirectories = fse
        .readdirSync(path.resolve('./items/items'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        itemDirectories.map(async dir => {
            await loader.registerItem(
                require(path.resolve('./items/items', dir.name, 'index.js')),
            );
        }),
    );

    // register template
    const templateFiles = fse
        .readdirSync(path.resolve('./items/templates'), { withFileTypes: true })
        .filter(dirent => !dirent.isDirectory());
    await Promise.all(
        templateFiles.map(async file => {
            await loader.registerItemTemplate(
                require(path.resolve('./items/templates', file.name)),
            );
        }),
    );
}

async function registerAttributes(loader) {
    // register items
    const attributesDirectories = fse
        .readdirSync(path.resolve('./attributes'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        attributesDirectories.map(async dir => {
            await loader.registerItem(
                dir.name,
                require(path.resolve('./attributes', dir.name, 'index.js')),
            );
        }),
    );
}

async function registerActions(loader) {
    const actionDirectories = fse
        .readdirSync(path.resolve('./actions'), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    await Promise.all(
        actionDirectories.map(async dir => {
            await loader.registerItem(
                dir.name,
                require(path.resolve('./actions', dir.name, 'index.js')),
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
