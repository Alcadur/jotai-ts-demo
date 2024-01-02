import styles from "./add-post-form.module.css";
import { useSetAtom } from 'jotai';
import { addOnTopAtom } from './store';

export const AddPostForm = () => {
    const addPost = useSetAtom(addOnTopAtom)

    const onSubmit = (event: any) => {
        event.preventDefault();

        addPost({ title: event.target.title.value, body: event.target.body.value });
        event.target.reset()
    };


    return (
        <form
            className={styles.form}
            onSubmit={onSubmit}
        >
            <h4>Add new post</h4>
            <label>
                Title:
                <input name="title" id="title" />
            </label>

            <label>
                Body:
                <textarea name="body" id="body"></textarea>
            </label>

            <button type="submit">Add on top</button>
            <button type="reset">Clear</button>
        </form>
    )
}
