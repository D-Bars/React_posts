import React from 'react';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({ remove, posts, title }) => {

    if(!posts.length){
        return (
            <h2 style={{ color: 'red', fontSize: '3vw', textAlign: 'center', marginTop: '2vw' }}>Posts not found!</h2>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post}  />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};
export default PostList;