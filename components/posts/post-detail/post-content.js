import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent = (props) => {
    const { slug, image, content, title } = props.post;

    const imagePath = `/images/posts/${slug}/${image}`;

    const customRenderers = {
        // image(image) {
        //     return (
        //         <Image
        //             src={`/images/posts/${slug}/${image.src}`}
        //             alt={image.alt}
        //             width={600}
        //             height={300}
        //         />
        //     );
        // },
        paragraphs(paragraph) {
            const { node } = paragraph;

            if (node.children[0].type === 'image') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${slug}/${image.url}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={title} image={imagePath} />
            <ReactMarkdown renderers={customRenderers}>{content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;
