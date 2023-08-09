import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react'
import { PostType } from '../';
import { PostItem } from '../../components/PostItem';
import postService from '../../services/postService';
import Masonry from 'react-masonry-component';
import { useGlobalState } from '../../state';

type PropsType = {
	listPosts: PostType[]
}

const SearchPage: NextPage<PropsType> = ({ listPosts }) => {
	const router = useRouter();
	const categoriesId = (router.query.cateId|| null);
	const [categories, setCategories] = useGlobalState('categories');

	useEffect(() => {
		if(!categoriesId){
			router.push('/')
		}
	}, [categoriesId]);

	const findText = useMemo(() => {
		const findObj = categories.find((o) => o.id === Number(categoriesId));
		return findObj.text
	}, [categoriesId]);

	console.log("findText ", findText);
	

	return (
		<div className="container">
			<div className="header-search" style={{margin: "30px 0 "}}>
				<h3>Danh mục tìm kiếm: <strong>{findText}</strong></h3>
				<p>Tìm kiếm được <strong>({listPosts.length})</strong> kết quả</p>
			</div>
			<Masonry
				className="ass1-section__wrap row ass1-section__isotope-init"
			>
				{listPosts.map((post) => (
					<PostItem 
						// key={post.PID} 
						post={post} 
						customClass="col-lg-6"
					/>
				))}
			</Masonry>
		</div>
	)
}

SearchPage.getInitialProps = async (context: NextPageContext) => {

	const tagIndex = context.query.cateId as string;
	
	const listPostsRes = await postService.getPostsPagingByCategory({ tagIndex });
	return {
		listPosts: listPostsRes?.posts || []
	}
}


export default SearchPage;
