import { observable, action } from 'mobx'

const totalBundles = [
    {
        name: 'SuperBundle',
        description: 'The bundle use to do something like super man',
        dependencies: ['PowerBundle', 'ManBundle'],
    },
    {
        name: 'DoubiBundle',
        description: 'The bundle just for fun',
        dependencies: ['FantasyBundle'],
    },
];

class BundleStore {
    @observable totalBundles: IBundle[] = [...totalBundles]
    @observable pickedBundles: IBundle[] = []
    @observable bundleDependencies: string [] = []
    @observable curBundle: IBundle = totalBundles[0]

    @action pickBundle = (bundle: IBundle, addOrDelete: boolean) => {
        if (addOrDelete) {
            this.pickedBundles.push(bundle);
        } else {
            const idx = this.pickedBundles.findIndex(
                (b: IBundle) => b.name === bundle.name,
            );
            this.pickedBundles.splice(idx, 1);
        }
        console.log(this);
    }

    @action selectBundle = (bundle: IBundle) => {
        this.curBundle = {...bundle};
        console.log(this.curBundle)
    }
}

export default BundleStore