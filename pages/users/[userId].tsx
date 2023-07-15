import React from 'react'
import { UserDetailInfo } from '../../components/UserDetailInfo'
import { UserDetailPosts } from '../../components/UserDetailPosts'

function UserDetail(props) {
  return (
	<div className="container">

		<UserDetailInfo/>

		<UserDetailPosts/>
		
	</div>
  )
}

export default UserDetail
