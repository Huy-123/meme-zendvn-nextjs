import React from 'react';
import { TypeComment } from '../../pages/posts/[postId]';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import viLocal from 'dayjs/locale/vi';
import Link from 'next/link';


type PropsType = {
  listComments: TypeComment[]
}

dayjs.extend(relativeTime)

const PostCommentList: React.FC<PropsType> = ({ listComments }) => {
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">{listComments.length} Bình luận</div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /></a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon"><i className="icon-Expand_all" /></a>
        </div>
      </div>
      {/*comment*/}
      {listComments.map((comment) => {
        return (
          <div className="ass1-comments__section" key={comment.CID}>
            <Link href="/users/[userId]" as={`/users/${comment.USERID}`} className="ass1-comments__avatar ass1-avatar">
              <img src={comment.profilepicture || "/images/avatar-02.png"} alt={comment.fullname} />
            </Link>
            <div className="ass1-comments__content">
              <Link href="/users/[userId]" as={`/users/${comment.USERID}`} className="ass1-comments__name">
                {comment.fullname || 'Tây Tạng'}
              </Link>
              <span className="ass1-comments__passed">  {dayjs(comment?.time_added).locale(viLocal).fromNow()}</span>
              <p>{comment.comment || 'Scratch off globe, for when you want to wipe out any country that displeases you but lack the weaponry to do so.'}</p>
              <div className="ass1-comments__info">
                <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>901</span></a>
                <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>36</span></a>
              </div>
            </div>
          </div>
        )
      })}
    </div>

  )
}


export default PostCommentList
