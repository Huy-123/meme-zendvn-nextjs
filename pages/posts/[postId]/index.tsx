import React from 'react'
import { HomeSidebar } from '../../../components/HomeSidebar';
import { PostDetailContent } from '../../../components/PostDetailContent';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { GetServerSideProps } from 'next';
import { getTokenSSRAndCSR } from '../../../helpers';
import postService from '../../../services/postService';
import { PostType } from '../..';
import userService from '../../../services/userService';

export type TypeCategory = {
  TAG_ID: string,
  PID: string,
  tag_index: string,
  tag_value: string
}

export type TypeComment = {
  CID: string,
  PID: string,
  USERID: string,
  fullname: string,
  profilepicture: string,
  comment: string,
  time_added:string,
}

type PostDetailDataProps = {
  postDetailData: PostType;
  postCategories: TypeCategory[];
  userPosts: PostType[];
  comments: TypeComment[];
}

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;


const PostDetail: PostDetailProps = ({ userPosts, postDetailData, postCategories, comments }) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent 
            postDetailData={postDetailData} 
            postCategories={postCategories} 
            listComments = {comments} />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {

  const ctx = context as unknown as NextPageContext;
  const [token, userToken] = getTokenSSRAndCSR(ctx);
  const userid = userToken?.id;
  const postid = ctx.query.postId;

  // const listPostsPos = postService.getPostsPaging();
  const postDetailPos = postService.getPostsByPostId({ postid, token })
  const userPostsPos = postService.getPostsByUserId({ userid, token });
  const commentsPos = postService.getCommentByPostId(postid);

  // Đợi 2 Promise cùng 1 lúc
  const [postDetailRes, userPostsRes, commentsRes] = await Promise.all([postDetailPos, userPostsPos, commentsPos]);

  const postUserId = postDetailRes?.data?.post?.USERID;

  const userInfoData = await userService.getUserById(postUserId)

  let postDetailData = null

  if (postDetailRes?.data?.post) {
    postDetailData = {
      ...postDetailRes?.data?.post,
      fullname: userInfoData?.user?.fullname || '',
      profilepicture: userInfoData?.user?.profilepicture || '',
    }
  }

  const props = {
    postDetailData: postDetailData || null,
    postCategories: postDetailRes?.data?.categories || [],
    userPosts: userPostsRes.posts,
    comments: commentsRes?.comments || []
  }

  return {
    props
  }
}


export default PostDetail;
