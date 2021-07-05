import { Fragment } from 'react';
import Head from 'next/head';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostDetails, getPostsFiles } from '../../helper/posts-util';

const PostDetailPage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    const { params } = context;

    const slug = params.slug;

    const postDetails = getPostDetails(slug);

    return {
        props: {
            post: postDetails,
        },
        revalidate: 600,
    };
};

export const getStaticPaths = () => {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, '')
    );

    const pathsWithparams = slugs.map((slug) => ({
        params: { slug },
    }));

    return {
        paths: pathsWithparams,
        fallback: false,
    };
};

export default PostDetailPage;
