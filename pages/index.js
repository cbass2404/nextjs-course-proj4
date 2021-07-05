import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../helper/posts-util';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Cory's Blog</title>
                <meta
                    name="description"
                    content="I post about programming and web development."
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    );
};

export const getStaticProps = () => {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
    };
};

export default HomePage;
