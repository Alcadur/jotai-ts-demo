import { Post, updatePostAtom } from './store';
import styles from "./post-details.module.css"
import { Dispatch, SetStateAction, useState } from 'react';
import { useSetAtom } from 'jotai';

export const PostDetails = ({ post }: { post: Post }) => {

    const [isOpened, setIsOpened] = useState(false);
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const updatePost = useSetAtom(updatePostAtom);

    const toggleHandler = () => setIsOpened(isOpened => !isOpened);

    const saveHandler = (event: any) => {
        event.preventDefault();
        const form = event.target;

        updatePost({ id: post.id, title: form.title.value, body: form.body.value })
    }

    const onChange = (setter: Dispatch<SetStateAction<string>>) => {
        return (event: any) => setter(event.target.value);
    }

    const titleClassName = styles.postTitle + (isOpened ? ' ' + styles.opened : '');

    return (
        <>
            <dt key={post.id + '-title'} onClick={toggleHandler} className={titleClassName}>{post.title}</dt>
            <dd key={post.id + '-body'} className={styles.postBody}>
                <form onSubmit={saveHandler}>
                    <input name="title" value={title} onChange={onChange(setTitle)}/>
                    <p className={styles.preview}>({post.title})</p>
                    <textarea name="body" value={body} onChange={onChange(setBody)}></textarea>
                    <p className={styles.preview}>({post.body})</p>

                    <button type="submit">Save</button>
                </form>
            </dd>
        </>
    )
}
