import React, { useState } from 'react';
import { PostDetailForm } from '../../../components/PostDetailForm';
import { PostDetailSidebar } from '../../../components/PostDetailSidebar';
import { useAuthen } from '../../../helpers/useAuthen';
import { useGlobalState } from '../../../state';
import postService from '../../../services/postService';
import { PostType } from '../..';
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';
import { TypeCategory } from '.';
import { getTokenSSRAndCSR } from '../../../helpers';

type PostEditDataProps = {
	postid?: string;
	postDetailData: PostType;
	postCategories: TypeCategory[];
}

type PostEditProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostEdit: PostEditProps = ({ postDetailData, postCategories, postid }) => {
	useAuthen();
	const [loading, setLoading] = useState(false)
	const [token] = useGlobalState('token')
	const [postData, setPostData] = useState(() => {
		return {
			postid: postid,
			url_image: postDetailData.url_image,
			post_content: postDetailData.post_content,
			category: postCategories.map((category) => category.tag_index),
			obj_image: {
				file: null,
				base64: '',
			},
		}
	});

	// Function

	const onChangeDetailForm = (key: string, value: any) => {
		if (key === "obj_image") {
			setPostData({
				...postData,
				[key]: value,
				"url_image": ''
			})
			return;
		}
		setPostData({
			...postData,
			[key]: value
		})
	}

	const handleSubmitPost = () => {
		setLoading(true);
		postService.editPost(postData, token)
			.then((res) => {
				if (res.status === 200) {
					alert('Cập nhật bài viết thành công :))');
					setPostData({
						...postData,
						url_image: res.data.post.url_image,
						obj_image: {
							file: null,
							base64: '',
						}
					})
				} else {
					alert(res.error);
				}
			})
			.finally(() => {
				setLoading(false);
			})
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<PostDetailForm
						post_content={postData.post_content}
						url_image={postData.url_image}
						obj_image={postData.obj_image}
						onChangeDetailForm={onChangeDetailForm}
					/>
				</div>
				<div className="col-lg-4">
					<PostDetailSidebar category={postData.category} onChangeDetailForm={onChangeDetailForm} handleSubmitPost={handleSubmitPost} loading={loading} />
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<PostEditDataProps> = async (context) => {

	const ctx = context as unknown as NextPageContext;
	const [token] = getTokenSSRAndCSR(ctx);
	const postid = ctx.query.postId as string;

	const postDetailPos = postService.getPostsByPostId({ postid, token })

	const [postDetailRes] = await Promise.all([postDetailPos]);

	const props = {
		postid: postid,
		postDetailData: postDetailRes?.data?.post || null,
		postCategories: postDetailRes?.data?.categories || [],
	}

	return {
		props
	}
}

export default PostEdit;
