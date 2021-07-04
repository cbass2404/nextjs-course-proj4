import { Fragment } from 'react';

import Hero from '../components/home-page/hero';
import Posts from '../components/home-page/featured-posts';

const HomePage = () => {
    return (
        <Fragment>
            <Hero />
            <Posts />
        </Fragment>
    );
};

export default HomePage;

// 1) hero => present ourselves
// 2) Featured Posts
