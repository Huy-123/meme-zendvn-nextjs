import React from 'react'
import { PostDetailForm } from '../../components/PostDetailForm'
import { PostDetailSidebar } from '../../components/PostDetailSidebar'
import { useAuthen } from '../../helpers/useAuthen'

function PostCreate() {
	useAuthen();
  return (
	<div className="container">
		<div className="row">
			<div className="col-lg-8">
				<PostDetailForm/>
			</div>
			<div className="col-lg-4">
				<PostDetailSidebar/>
			</div>
		</div>
	</div>
  )
}

export default PostCreate
