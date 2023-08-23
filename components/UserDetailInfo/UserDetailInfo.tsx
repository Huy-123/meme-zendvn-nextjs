import React from 'react'
import { TypeUser, useGlobalState } from '../../state'
import Link from 'next/link';
import { useRouter } from 'next/router';

type PropsType = {
  userDetailInfo: TypeUser;
  postCount: number
}

const UserDetailInfo: React.FC<PropsType> = ({ userDetailInfo, postCount }) => {
  const [currentUser] = useGlobalState("currentUser")

  if (!userDetailInfo) return null

  const check = currentUser?.USERID === userDetailInfo?.USERID;

  return (
    <div className="ass1-head-user">
      <div className="ass1-head-user__content">
        <div className="ass1-head-user__image">
          <a href="#">
            <img src={userDetailInfo.profilepicture || "/images/avatar-02.png"} alt={userDetailInfo.fullname} />
          </a>
        </div>
        <div className="ass1-head-user__info">
          <div className="ass1-head-user__info-head">
            <div className="ass1-head-user__name">
              <span>{userDetailInfo.fullname}</span>
              <i><img src="/fonts/emotion/svg/Verified.svg" alt="" /></i>
            </div>
            <div className="w-100" />
            {
              check ?
                <>
                  <Link href="/users/password" className="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</Link>
                  <Link href="/users/profile" className="ass1-head-user__btn-follow ass1-btn">Profile</Link>
                </> :
                <a style={{cursor: "pointer"}} className="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
            }
            {/* <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> */}
          </div>
          <div className="ass1-head-user__info-statistic">
            <div className="ass1-btn-icon"><i className="icon-Post" /><span>Bài viết: {postCount}</span></div>
            <div className="ass1-btn-icon"><i className="icon-Followers" /><span>Theo dõi: 99999</span></div>
            <div className="ass1-btn-icon"><i className="icon-Following" /><span>Đang theo dõi: 999</span></div>
            {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
          </div>
          <p>{userDetailInfo.description}</p>
        </div>
      </div>
    </div>

  )
}


export default UserDetailInfo
