import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../components/hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import PostService from '../API/PostService';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1vw' }}>
            <h1>You`re opened post with ID{params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>{params.id}. {post.title}</div>
            }
            <h1 style={{fontSize: '3vw'}}>Comments</h1>
            {isCommentsLoading
                ? <Loader />
                : <div className='comment__block'>
                    {comments.map(comment => 
                        <div className='comment__box' key={comment.id}>
                            <div className='comment__mail'>{comment.email}</div>
                            <div className='comment__content'>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
export default PostIdPage;