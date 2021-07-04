import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
    // returns array of strings
    return fs.readdirSync(postsDirectory);
};

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
    const postFiles = getPostsFiles();

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

export const getPostDetails = (slug) => {
    const allPosts = getAllPosts();

    const PostDetail = allPosts.find((post) => post.slug === slug);

    return PostDetail;
};
