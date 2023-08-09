import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { PostType } from './';
import { PostItem } from '../components/PostItem';
import postService from '../services/postService';
import Masonry from 'react-masonry-component';

type PropsType = {
	listPosts: PostType[];
}

const SearchPage: NextPage<PropsType> = ({ listPosts }) => {
	const router = useRouter();
	const searchStr = (router.query.query || '') as string;

	useEffect(() => {
		if (searchStr === '') {
			router.push('/')
		}
	}, [searchStr]);

	return (
		<div className="container">
			<div className="header-search" style={{margin: "30px 0 "}}>
				<h3>Từ khóa tìm kiếm: <strong>{searchStr}</strong></h3>
				<p>Tìm kiếm được <strong>({listPosts.length})</strong> kết quả</p>
			</div>
			<Masonry
				className="ass1-section__wrap row ass1-section__isotope-init"
			>
				{listPosts.map((post) => (
					<PostItem 
						key={post.PID} 
						post={post} 
						customClass="col-lg-6"
						isHightlight={true}
						query={searchStr}
					/>
				))}
			</Masonry>
		</div>
	)
}

SearchPage.getInitialProps = async (context: NextPageContext) => {

	const query = context.query.query || '';
	const listPostsRes = await postService.getPostSearch({ query });
	return {
		listPosts: listPostsRes?.posts || []
	}
}


export default SearchPage;
