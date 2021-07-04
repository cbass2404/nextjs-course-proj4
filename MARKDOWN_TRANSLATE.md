# Creating Markdown Files and turning them into JSX for React

[Markdown Documentation](https://www.markdownguide.org/)

[react-markdown Documentation](https://www.npmjs.com/package/react-markdown)

```
$ npm install react-markdown
```

-   Importing into your project

```javascript
import ReactMarkdown from 'react-markdown';

<ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>;
```

-   You can add metadata (gray matter) to a markdown file in the following way:

```
---
title: 'Getting Started with NextJS'
date: '2022-10-15'
image: 'getting-started-nextjs.png'
excerpt: 'NextJS is a React framework for production - it makes building fullstack React Apps a breeze and ships with SSR'
isFeatured: true
---

# This is a title

This is some regular text with a [link](https://google.com)

```

_metadata is done in yml format, be sure to do three dashes to close the metadata section_

-   Next, to parse metadata add the graymatter library to your app

```
$ npm install gray-matter
```

```javascript
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // passes string and return an object with two properties
    // data property that returns metadata as javascript object
    // content property that returns the markdown content as a string
    const { data, content } = matter(fileContent);

    // removes the .md file extension from fileName
    const postSlug = fileName.replace(/\.md$/, '');

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
};

export const getAllPosts = () => {
    // returns array of strings
    const postFiles = fs.readdirSync(postsDirectory);

    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
    });

    const sortedPosts = allPosts.sort((postA, postB) =>
        postA.date > postB.date ? -1 : 1
    );

    return sortedPosts;
};

export const getFeaturedPosts = () => {
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    return featuredPosts;
};
```

## Configuring ReactMarkdown

-   To make full use of nextjs' image optimization and lazy loading you have to tell markdown to render it another way as follows:

```javascript
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
```

_components prop lets you target different Markdown elements to change how they work_

-   for the code snippet look, import two dependencies below:

```
$ npm install react-syntax-highlighter
```

[React-Syntax-Highlight Documentation](https://www.npmjs.com/package/react-syntax-highlighter)
