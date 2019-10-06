import * as React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';

import { observer } from 'mobx-react';

import "./index.less"
import BundleItem from './BundleItem';
import { useLocalStore } from 'mobx-react';

type BundleViewProps = {
}

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

const BundleView: React.FunctionComponent<BundleViewProps> = observer(() => {
    const bundleStore: any = useLocalStore<any>(() => ({
        totalBundles: totalBundles,
        pickedBundles: [],
        bundleDependencies: [],
        curBundle: {
            name: 'SuperBundle',
            description: 'The bundle use to do something like super man',
            dependencies: ['PowerBundle', 'ManBundle'],
        },
        pickBundle(bundle: IBundle, addOrDelete: boolean) {
            if (addOrDelete) {
                this.pickedBundles.push(bundle);
            } else {
                const idx = this.pickedBundles.findIndex(
                    (b: IBundle) => b.name === bundle.name,
                );
                this.pickedBundles.splice(idx, 1);
            }
            console.log(this);
        },
        selectBundle(bundle: IBundle) {
            this.curBundle = {...bundle};
            console.log(this.curBundle)
        }
    }))
    // const {totalBundles, pickedBundles, curBundle} = bundleStore;
    // const {pickBundle, selectBundle} = bundleStore;
    // const bundles: IBundle[] = totalBundles;

    return (
        <div className="bundle-view">
            <Nav />
            <div className="bundle-body">
                <div className="bundle-side">
                    <ul>
                        {bundleStore.totalBundles.map((bundle: IBundle, idx: number) => (
                            <BundleItem
                                key={idx}
                                onBundlePick={step =>
                                    bundleStore.pickBundle(bundleStore.totalBundles[idx], step > 0)
                                }
                                onBundleSelect={() =>
                                    bundleStore.selectBundle(bundleStore.totalBundles[idx])
                                }
                                bundle={bundle}
                            />
                        ))}
                    </ul>
                </div>
                <div className="bundle-info">
                    <div className="info-title">{bundleStore.curBundle.name}</div>
                    <div className="info-desc">{bundleStore.curBundle.description}</div>
                    <div className="info-deps">
                        <span>Dependencies:</span>
                        <ul>
                            {bundleStore.curBundle.dependencies.map((dep: any, idx: number) => (
                                <li key={idx}>{dep}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bundle-footer">
                <div>
                    You total picked {bundleStore.pickedBundles.length} bundles:
                    <ul>
                        {bundleStore.pickedBundles.map((b: any, i: any) => (
                            <p key={i}>{b.name}</p>
                        ))}
                    </ul>
                </div>
                <Link to="/game">进入游戏</Link>
            </div>
        </div>
    );
})




export default BundleView;
