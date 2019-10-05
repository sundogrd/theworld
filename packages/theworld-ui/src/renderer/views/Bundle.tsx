import * as React from 'react';
import { Link } from 'react-router-dom';
import '../style/views/bundle.less';
import Nav from '../components/Nav';
// import '../../types/store';
import { observer, inject } from 'mobx-react';
import BundleStore from '@/renderer/store/bundleStore';
const { useEffect, useState } = React;


function BundleItem({
    bundle,
    onBundleSelect,
    onBundlePick,
}: {
    bundle: IBundle;
    onBundlePick: (event: any) => void;
    onBundleSelect: (event: any) => void;
}) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        if (checked) {
            onBundlePick(1);
        } else {
            onBundlePick(-1);
        }
    }, [checked]);

    return (
        <div onClick={onBundleSelect}>
            {bundle.name}
            <input checked={checked} onChange={handleChange} type="checkbox" />
        </div>
    );
}

function BundleComp({bundleStore}: {bundleStore: BundleStore}) {
    const {totalBundles, pickedBundles, curBundle} = bundleStore;
    const {pickBundle, selectBundle} = bundleStore;
    const bundles: IBundle[] = totalBundles;

    return (
        <div className="bundle-view">
            <Nav />
            <div className="bundle-body">
                <div className="bundle-side">
                    <ul>
                        {bundles.map((bundle, idx) => (
                            <BundleItem
                                key={idx}
                                onBundlePick={step =>
                                    bundleStore.pickBundle(bundles[idx], step > 0)
                                }
                                onBundleSelect={() =>
                                    bundleStore.selectBundle(bundles[idx])
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
                            {bundleStore.curBundle.dependencies.map((dep, idx) => (
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
                        {bundleStore.pickedBundles.map((b, i) => (
                            <p key={i}>{b.name}</p>
                        ))}
                    </ul>
                </div>
                <Link to="/game">进入游戏</Link>
            </div>
        </div>
    );
}




export default inject('bundleStore')(observer(BundleComp));