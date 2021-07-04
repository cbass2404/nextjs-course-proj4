import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent = (props) => {
    const { slug, image, content, title } = props.post;

    const imagePath = `/images/posts/${slug}/${image}`;

    const customRenderers = {
        // img(image) {
        //     return (
        //         <Image
        //             src={`/images/posts/${slug}/${image.src}`}
        //             alt={image.alt}
        //             width={600}
        //             height={300}
        //         />
        //     );
        // },
        p(paragraph) {
            const { node } = paragraph;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
        code(code) {
            const { className, children } = code;
            const language = className.split('-')[1];
            // className is something like language-js => We need the "js" part here
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default PostContent;
