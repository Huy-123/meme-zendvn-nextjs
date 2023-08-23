import React, { useState } from 'react'
import { PostDetailForm } from '../../components/PostDetailForm'
import { PostDetailSidebar } from '../../components/PostDetailSidebar'
import { useAuthen } from '../../helpers/useAuthen'
import { useGlobalState } from '../../state'
import postService from '../../services/postService'


const initState = {
	url_image: '',
	post_content: '',
	category: [],
	obj_image: {
		file: null,
		base64: '',		
	}
}

function PostCreate() {
	useAuthen();
	const [loading, setLoading] = useState(false)
	const [token] = useGlobalState('token')
	const [postData, setPostData] = useState(initState);

	// Function

	const onChangeDetailForm = (key: string, value: any) => {
		// console.log(key, " ", value);
		
		setPostData({
			...postData,
			[key]: value
		})
	}

	const handleSubmitPost = () => {
		setLoading(true);
		postService.createNewPost(postData, token)
		.then((res) => {
			if(res.status === 200){
				alert('Đăng bài viết thành công :))');
				setPostData(initState);
			}else{
				alert(res.error);
			}
		})
		.finally(()=>{
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
						onChangeDetailForm = {onChangeDetailForm}
					/>
				</div>
				<div className="col-lg-4">
					<PostDetailSidebar category={postData.category} onChangeDetailForm={onChangeDetailForm} handleSubmitPost={handleSubmitPost} loading={loading} />
				</div>
			</div>
		</div>
	)
}

export default PostCreate
