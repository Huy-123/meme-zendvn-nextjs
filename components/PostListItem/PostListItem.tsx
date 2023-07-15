import React from 'react';
import {PostItem} from "../PostItem"

function PostListItem() {
  return (
	<div className="ass1-section__list">
		<PostItem/>
		<PostItem/>
		<PostItem/>	
		<button className="load-more ass1-btn"><span>Xem thêm</span></button>
	</div>
  )
}


export default PostListItem
