import Head from 'next/head'
import React, { useEffect } from 'react'
import { PostListItem } from '../components/PostListItem';
import { HomeSidebar } from '../components/HomeSidebar';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { getTokenSSRAndCSR } from '../helpers';
import { NextPageContext } from 'next';
import postService from '../services/postService';

export type PostType = {
  USERID: string,
  fullname: string,
  profilepicture: string,
  url_image: string,
  PID: string,
  post_content: string,
  time_added: string,
  status: string,
  count: string | null,
}

type HomeDataProps = {
  listPosts: PostType[];
  userPosts: PostType[];
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: HomeProps = ({listPosts, userPosts}) => {

  // useEffect(() => {
  //   console.log('listPosts ', listPosts);
  //   console.log('userPosts ', userPosts);
  // }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts}/>
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps<HomeDataProps> = async (context) => {

  const ctx = context as unknown  as NextPageContext;
  const [token, userToken] = getTokenSSRAndCSR(ctx)
  const userid = userToken?.id;

  const listPostsPos = postService.getPostsPaging();
  const userPostsPos = postService.getPostsByUserId({userid, token})

  // Đợi 2 Promise cùng 1 lúc
  const [listPostsRes, userPostsRes] = await Promise.all([listPostsPos, userPostsPos]);

  // console.log('listPostsRes ',listPostsRes);
  // console.log('userPostsRes ',userPostsRes);
  
  

  const props = {
    listPosts: listPostsRes.posts,
    userPosts: userPostsRes.posts
  }

  return {
    props
  }
}

export default Home;