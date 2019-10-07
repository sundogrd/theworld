const Bundle = require("theworld-core").Bundle
const path = require("path")
const fse = require("fs-extra")

async function regitserI18n() {
    const i18nDirectories = fse.readdirSync(path.resolve("./i18n"), { withFileTypes: true }).filter(dirent => dirent.isDirectory())

    await Promise.all(i18nDirectories.map(async dir => {
        await Bundle.registerI18n(dir.name, require(path.resolve("./i18n", dir.name, "index.js")))
    }))
}

function registerItems() {
    // register items
    const itemDirectories = fse.readdirSync(path.resolve("./items/items"), { withFileTypes: true }).filter(dirent => dirent.isDirectory())

    await Promise.all(itemDirectories.map(async dir => {
        await Bundle.registerItem(require(path.resolve("./items/items", dir.name, "index.js")))
    }))

    // register template
    const templateFiles = fse.readdirSync(path.resolve("./items/templates"), { withFileTypes: true }).filter(dirent => !dirent.isDirectory())
    await Promise.all(templateFiles.map(async file => {
        await Bundle.registerItemTemplate(require(path.resolve("./items/templates", dir.name)))
    }))
}

function registerCreatures() {
    // register items
    const itemDirectories = fse.readdirSync(path.resolve("./items/items"), { withFileTypes: true }).filter(dirent => dirent.isDirectory())

    await Promise.all(itemDirectories.map(async dir => {
        await Bundle.registerItem(require(path.resolve("./items/items", dir.name, "index.js")))
    }))

    // register template
    const templateFiles = fse.readdirSync(path.resolve("./items/templates"), { withFileTypes: true }).filter(dirent => !dirent.isDirectory())
    await Promise.all(templateFiles.map(async file => {
        await Bundle.registerItemTemplate(require(path.resolve("./items/templates", file.name)))
    }))
}

function registerAttributes() {
    // register items
    const attributesDirectories = fse.readdirSync(path.resolve("./attributes"), { withFileTypes: true }).filter(dirent => dirent.isDirectory())

    await Promise.all(attributesDirectories.map(async dir => {
        await Bundle.registerItem(dir.name, require(path.resolve("./attributes", dir.name, "index.js")))
    }))
}

function registerActions() {
    const actionDirectories = fse.readdirSync(path.resolve("./actions"), { withFileTypes: true }).filter(dirent => dirent.isDirectory())

    await Promise.all(actionDirectories.map(async dir => {
        await Bundle.registerItem(dir.name, require(path.resolve("./actions", dir.name, "index.js")))
    }))
}

module.exports = {
    init: () => {
        registerI18n()
        registerActions()
        registerAttributes()
        registerItems()
        registerCreatures()
    }
}
