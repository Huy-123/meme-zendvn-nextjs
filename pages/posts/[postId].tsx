import React from 'react'
import { HomeSidebar } from '../../components/HomeSidebar';
import { PostDetailContent } from '../../components/PostDetailContent';

function PostDetail() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent/>
        </div>
        <div className="col-lg-4">
          <HomeSidebar />
        </div>
      </div>
    </div>
  )
}


export default PostDetail;
