import ReactMarkdown from 'react-markdown';

import classes from './post-content.module.css';
import PostHeader from './post-header';

const DUMMY_POST = {
    slug: 'getting-started-with-nextjs1',
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    content: '# This is a first post',
    date: '2022-02-10',
};

const PostContent = (props) => {
    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;
