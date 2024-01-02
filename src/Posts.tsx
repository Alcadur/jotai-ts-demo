import { numberOfPostsAtom, Post, postsAtom } from './store';
import styles from "./posts.module.css";
import { useState } from 'react';
import { PostDetails } from './PostDetails';
import { useSetAtom, useAtomValue } from 'jotai';

export const useLoadPostsToStore = () => {
    const postSetter = useSetAtom(postsAtom);
    const numberOfPosts = useAtomValue(numberOfPostsAtom);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postJSON: Post[] = await postsResponse.json();
        setIsLoading(false);
        postSetter(postJSON);
    }

    if (!numberOfPosts && !isLoading) {
        fetchData();
    }
};

export const PostsList = () => {
    useLoadPostsToStore();

    const posts = useAtomValue(postsAtom);
    /**
     * or
     * const [posts, setPosts] = useAtom(postsAtom);
     */
    const numberOfPosts = useAtomValue(numberOfPostsAtom);

    return (
        <section>
            <h3>We have {numberOfPosts} posts in total</h3>

            <dl className={styles.itemsList}>
                {posts.map(post => <PostDetails key={post.id} post={post} />)}
            </dl>
        </section>
    );
};
