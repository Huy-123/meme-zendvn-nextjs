import React, { useEffect } from 'react'
import { NextPageContext, NextPage } from 'next';
import { UserDetailInfo } from '../../components/UserDetailInfo'
import { UserDetailPosts } from '../../components/UserDetailPosts'
import { TypeUser } from '../../state';
import { PostType } from '..';
import { getTokenSSRAndCSR } from '../../helpers';
import userService from '../../services/userService';
import postService from '../../services/postService';
import { useAuthen } from '../../helpers/useAuthen';
import { useRouter } from 'next/router';

type PropsType = {
	userDetailInfo: TypeUser;
	userDetailPosts: PostType[];
}

const UserDetail:NextPage<PropsType> = ({userDetailInfo, userDetailPosts}) => {

	useAuthen();
	const router = useRouter();
	useEffect(() => {
		if(!userDetailInfo){
			alert('User khong ton tai :((');
			router.push('/')
		}
	}, [userDetailInfo])

  return (
	<div className="container">

		<UserDetailInfo userDetailInfo = {userDetailInfo} postCount = {userDetailPosts.length}/>

		<UserDetailPosts userDetailPosts = {userDetailPosts}/>
		
	</div>
  )
}

UserDetail.getInitialProps = async (ctx:NextPageContext) => {
	const [token, userToken] = getTokenSSRAndCSR(ctx)
	const userid = ctx.query.userId as string;
	
	const userPos = userService.getUserById(userid);
	const postPos = postService.getPostsByUserId({token, userid});

	const [userRes, postRes] = await Promise.all([userPos, postPos])

	return {
		userDetailInfo: userRes.user || null,
		userDetailPosts: postRes?.posts || [],
	}
}

export default UserDetail;
