import * as React from 'react';
import './index.less';
import { Link } from 'react-router-dom';

const Home: React.FunctionComponent<{}> = () => {
    return (
        <div className="home-view">
            <div className="logo-wrapper">
                <img src={require('../../public/logo.jpg')} alt="" />
            </div>
            <Link to="/bundle" className="operate">
                新的冒险
            </Link>
            <Link to="/records" className="operate">
                旧的回忆
            </Link>
        </div>
    );
}

export default Home
