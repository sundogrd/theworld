import * as React from 'react';
import { Link } from 'react-router-dom';
const { useEffect, useState } = React;
import '../style/bundle.less';

type Bundle = {
    name: string;
    description: string;
    dependencies: string[];
};

function BundleItem({
    bundle,
    onBundleSelect,
    onBundlePick,
}: {
    bundle: Bundle;
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

export default function Bundle() {
    const bundles: Bundle[] = [
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

    const [curBundle, setCurBundle] = useState(bundles[0]);
    const [pickedBundles, setPickedBundles] = useState([]);
    const addPickedBundle = (bundle: Bundle, addOrDelete: boolean) => {
        if (addOrDelete) {
            pickedBundles.push(bundle);
        } else {
            const idx = pickedBundles.findIndex(
                (b: Bundle) => b.name === bundle.name,
            );
            console.log('idx is ', idx);
            pickedBundles.splice(idx, 1);
        }
        console.log(pickedBundles);
        setPickedBundles([...pickedBundles]);
    };

    return (
        <div className="bundle-view">
            <div className="bundle-nav">
                <Link to="/home">返回</Link>
            </div>
            <div className="bundle-body">
                <div className="bundle-side">
                    <ul>
                        {bundles.map((bundle, idx) => (
                            <BundleItem
                                key={idx}
                                onBundlePick={step =>
                                    addPickedBundle(bundles[idx], step > 0)
                                }
                                onBundleSelect={() =>
                                    setCurBundle(bundles[idx])
                                }
                                bundle={bundle}
                            />
                        ))}
                    </ul>
                </div>
                <div className="bundle-info">
                    <div className="info-title">{curBundle.name}</div>
                    <div className="info-desc">{curBundle.description}</div>
                    <div className="info-deps">
                        <span>Dependencies:</span>
                        <ul>
                            {curBundle.dependencies.map((dep, idx) => (
                                <li key={idx}>{dep}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                You total picked {pickedBundles.length} bundles:
                <ul>
                    {pickedBundles.map((b, i) => (
                        <p key={i}>{b.name}</p>
                    ))}
                </ul>
            </div>
        </div>
    );
}
