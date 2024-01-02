import React from 'react';
import './App.css';
import { PostsList } from './Posts';
import { AddPostForm } from './AddPostForm';


function App() {

    return (
        <div className="App">
            <AddPostForm />
            <PostsList />
        </div>
    );
}

export default App;
