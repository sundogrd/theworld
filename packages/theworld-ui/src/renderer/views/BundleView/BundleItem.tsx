import * as React from "react";

type BundleItemProps = {
    bundle: IBundle;
    onBundleSelect: React.EventHandler<React.MouseEvent>;
    onBundlePick: (order: number) => void;
}
const BundleItem: React.FunctionComponent<BundleItemProps> = ({
    bundle,
    onBundleSelect,
    onBundlePick,
}) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (): void => {
        setChecked(!checked);
    };

    React.useEffect(() => {
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

export default BundleItem
