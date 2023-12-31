import React from 'react'
import { PostType } from '../../pages';
import Masonry from 'react-masonry-component';
import { PostItem } from '../PostItem';
import { TypeUser, useGlobalState } from '../../state';


type PropsType = {
  userDetailPosts: PostType[];
  userDetailInfo: TypeUser;
}

const UserDetailPosts: React.FC<PropsType> = ({ userDetailPosts, userDetailInfo }) => {

  const [currentUser] = useGlobalState("currentUser")

  const checkIsOwner = currentUser?.USERID === userDetailInfo?.USERID;

  return (
    // <div className="ass1-section__wrap row ass1-section__isotope-init">
    //   {/*section*/}
    //   {/* <div className="grid-sizer" /> */}
    //   <div className="ass1-section__item col-lg-6">
    //     <div className="ass1-section">
    //       <div className="ass1-section__head">
    //         <a href="single_post.html" className="ass1-section__avatar ass1-avatar"><img src="/images/avatar-02.png" alt="" /></a>
    //         <div>
    //           <a href="#" className="ass1-section__name">Thanos</a>
    //           <span className="ass1-section__passed">2 giờ trước</span>
    //         </div>
    //       </div>
    //       <div className="ass1-section__content">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut, aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit laudantium unde quidem perferendis!</p>
    //         <div className="ass1-section__image">
    //           <a href="single_post.html"><img src="/images/microphone-1209816_1920.jpg" alt="" /></a>
    //         </div>
    //       </div>
    //       <div className="ass1-section__footer">
    //         <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
    //         <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
    //         <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
    //         <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="ass1-section__item col-lg-6">
    //     <div className="ass1-section">
    //       <div className="ass1-section__head">
    //         <a href="single_post.html" className="ass1-section__avatar ass1-avatar"><img src="/images/avatar-02.png" alt="" /></a>
    //         <div>
    //           <a href="#" className="ass1-section__name">Thanos</a>
    //           <span className="ass1-section__passed">2 giờ trước</span>
    //         </div>
    //       </div>
    //       <div className="ass1-section__content">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut, aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit laudantium unde quidem perferendis!</p>
    //         <div className="ass1-section__image">
    //           <a href="single_post.html"><img src="/images/blog-rating.png" alt="" /></a>
    //         </div>
    //       </div>
    //       <div className="ass1-section__footer">
    //         <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
    //         <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
    //         <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
    //         <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="ass1-section__item col-lg-6">
    //     <div className="ass1-section">
    //       <div className="ass1-section__head">
    //         <a href="single_post.html" className="ass1-section__avatar ass1-avatar"><img src="/images/avatar-02.png" alt="" /></a>
    //         <div>
    //           <a href="#" className="ass1-section__name">Thanos</a>
    //           <span className="ass1-section__passed">2 giờ trước</span>
    //         </div>
    //       </div>
    //       <div className="ass1-section__content">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut, aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit laudantium unde quidem perferendis!</p>
    //         <div className="ass1-section__image">
    //           <a href="single_post.html"><img src="/images/dress_owesom.jpg" alt="" /></a>
    //         </div>
    //       </div>
    //       <div className="ass1-section__footer">
    //         <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
    //         <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
    //         <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
    //         <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="ass1-section__item col-lg-6">
    //     <div className="ass1-section">
    //       <div className="ass1-section__head">
    //         <a href="single_post.html" className="ass1-section__avatar ass1-avatar"><img src="/images/avatar-02.png" alt="" /></a>
    //         <div>
    //           <a href="#" className="ass1-section__name">Thanos</a>
    //           <span className="ass1-section__passed">2 giờ trước</span>
    //         </div>
    //       </div>
    //       <div className="ass1-section__content">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut, aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit laudantium unde quidem perferendis!</p>
    //         <div className="ass1-section__image">
    //           <a href="single_post.html"><img src="/images/frog-1530803_960_720.jpg" alt="" /></a>
    //         </div>
    //       </div>
    //       <div className="ass1-section__footer">
    //         <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
    //         <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
    //         <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
    //         <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Masonry
    		className="ass1-section__wrap row ass1-section__isotope-init"
    	>
    		{userDetailPosts.map((post) => (
    			<PostItem 
    				key={post.PID} 
    				post={post} 
    				customClass="col-lg-6"
            isOwner = {checkIsOwner}
    			/>
    		))}
    	</Masonry>

  )
}

export default UserDetailPosts
