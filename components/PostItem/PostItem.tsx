import React from 'react'
import { PostType } from '../../pages'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import viLocal from 'dayjs/locale/vi'
import { hightlightText } from '../../helpers';
type PropsType = {
	post: PostType;
	customClass?: string;
	isHightlight?: boolean;
	query?: string;
}

const PostItem: React.FC<PropsType> = ({ post, customClass, isHightlight, query }) => {
	// console.log("post ", post);
	dayjs.extend(relativeTime)
	const timeFormat = dayjs(post.time_added).locale(viLocal).fromNow();
	
	let className = "ass1-section__item";
	if(customClass){
		className = className + ' ' + customClass;
	}

	// Function Render Hightlight/ NoHightlight FullName
	const renderFullname = () => {
		if(isHightlight && query){
			return(
				hightlightText(post.fullname, query)
			)
		}
		return (post.fullname)
	}

	// Function Render Hightlight/ NoHightlight FullName
	const renderContent = () => {
		if(isHightlight && query){
			return(
				hightlightText(post.post_content, query)
			)
		}
		return (post.post_content)
	}	

	return (
		<div className={className}>
			<div className="ass1-section">
				<div className="ass1-section__head">
					<Link href="/users/[userId]" as={`/users/${post.USERID}`} className="ass1-section__avatar ass1-avatar">
						<img src={post.profilepicture || 'images/avatar-02.png'} alt={post.fullname} />
					</Link>
					<div>
						<Link href="/users/[userId]" as={`/users/${post.USERID}`} className="ass1-section__name" dangerouslySetInnerHTML={{__html: renderFullname()}}>
						</Link>
						<span className="ass1-section__passed">{timeFormat}</span>
					</div>
				</div>
				<div className="ass1-section__content">
					<p dangerouslySetInnerHTML={{__html: renderContent()}}></p>
					<div className="ass1-section__image">
						<Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
							<img src={post.url_image || "images/microphone-1209816_1920.jpg"} alt={post.url_image} />
						</Link>
					</div>
				</div>
				<div className="ass1-section__footer">
					<Link href="/posts/[postId]" as={`/posts/${post.PID}`} className="ass1-section__btn-comment ass1-btn-icon">
						<i className="icon-Comment_Full" />
						<span>{post.count || 0}</span>
					</Link>

				</div>
			</div>
		</div>

	)
}

export default PostItem
