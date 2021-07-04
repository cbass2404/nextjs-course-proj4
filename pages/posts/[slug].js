import PostContent from '../../components/posts/post-detail/post-content';
import { getPostDetails, getPostsFiles } from '../../helper/posts-util';

const PostDetailPage = (props) => {
    return <PostContent post={props.post} />;
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
