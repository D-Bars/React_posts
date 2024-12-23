import React, { useEffect, useMemo, useRef, useState } from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../components/hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../components/hooks/useFetching';
import { getPagesCount, getPagesArray } from '../utils/pages.js';
import Pagination from '../components/UI/pagination/Pagination.jsx';
import { useObserver } from '../components/hooks/useObserver.js';
import MySelect from '../components/UI/select/MySelect.jsx';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page+1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '0.5vw' }} onClick={() => setModal(true)}>
        создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect 
      value={limit}
      onChange={value => setLimit(value)}
      defaultValue="Number of posts loaded"
      options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 15, name: '15'},
        {value: -1, name: 'All posts'}
      ]}
      />
      {postError &&
        <h1>Error{postError}</h1>
      }
      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vw' }}><Loader /></div>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{height: '1vw', background: 'red'}} />
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
