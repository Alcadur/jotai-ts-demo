import { atom } from 'jotai';

/**
 * store types
 */
export type Post = {
    id?: number,
    title: string,
    body: string
}

/**
 * Store atoms
 */
export const postsAtom = atom<Post[]>([]);
export const numberOfPostsAtom = atom(get => get(postsAtom).length);

/**
 * write only atoms
 */
export const addOnTopAtom = atom(null, (get, set, post: Post) => {
    const posts = get(postsAtom);
    posts.unshift({ id: Date.now(), ...post });

    set(postsAtom, [...posts]);
});
export const updatePostAtom = atom(null, (get, set, updatedPost: Post) => {
    let postIndex = -1;
    const { id: updatedPostId, title, body } = updatedPost;
    const posts = get(postsAtom);
    const post = posts.find(({ id }, index) => {
        const result = updatedPostId === id;

        if (result) {
            postIndex = index;
        }

        return result;
    });

    post!.title = title;
    post!.body = body;
    posts.splice(postIndex, 1, post!);

    set(postsAtom, [...posts])
});
