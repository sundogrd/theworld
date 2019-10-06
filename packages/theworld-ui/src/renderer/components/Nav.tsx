import * as React from 'react';
import './index.less';
import { Link } from 'react-router-dom';

export default function Nav({ to }: { to?: string }) {
    return (
        <div className="nav">
            <Link to={to ? to : '/home'}>返回</Link>
        </div>
    );
}
