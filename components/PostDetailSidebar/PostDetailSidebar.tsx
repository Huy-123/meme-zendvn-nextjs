import React from 'react'
import { useGlobalState } from '../../state';
import { Button } from '../Button';

type PropsType = {
	category: string[];
	onChangeDetailForm: (key:string, value: string[]) => void;
	handleSubmitPost: () => void;
	loading: boolean;
}

const PostDetailSidebar: React.FC<PropsType> = ({ category, onChangeDetailForm, handleSubmitPost, loading }) => {
	// GlobalState
	const [listCategories] = useGlobalState("categories")

	// Function

	const handleOnChange = (e) => {
		// console.log('checked ', e.target.checked);
		// isCheck  value  findIdx  isExisting 
		const isCheck = e.target.checked;
		const value = e.target.value;
		const findIdx = category.findIndex((cateId) => {
			return (cateId === value)
		});
		const isExisting = findIdx !== -1;
		if(!isExisting && isCheck){
			onChangeDetailForm('category',[...category, value])
		} else if(!isCheck){
			onChangeDetailForm('category' ,category.filter((id) => (value !== id)))
		} 
	}

	return (
		<aside className="ass1-aside ass1-aside__edit-post">
			<div>
				<Button onClick={handleSubmitPost} isLoading={loading} className="ass1-btn">Đăng bài</Button>
			</div>
			<div className="ass1-aside__edit-post-head">
				<span style={{ display: 'block', width: '100%', marginBottom: '10px' }}>Chọn danh mục</span>
				{
					listCategories.map((cate) => {
						return (
							<label className="ass1-checkbox" key={cate.id}>
								<input 
									type="checkbox" 
									name="category" 
									value = {cate.id}
									checked = {category.indexOf(cate.id.toString()) !== -1}
									onChange={handleOnChange}
								/>
								<span />
								<p>{cate.text}</p>
							</label>
						)
					})
				}
			</div>
			<div className="ass1-aside__get-code">
				<p>Share Link</p>
			</div>
			<div className="ass1-aside__social">
				<a className="ass1-btn-social__facebook ass1-btn-social"><i className="fa fa-facebook" aria-hidden="true" /></a>
				<a className="ass1-btn-social__twitter ass1-btn-social"><i className="fa fa-twitter" aria-hidden="true" /></a>
				<a className="ass1-btn-social__google ass1-btn-social"><i className="fa fa-google-plus" aria-hidden="true" /></a>
			</div>
		</aside>

	)
}


export default PostDetailSidebar
