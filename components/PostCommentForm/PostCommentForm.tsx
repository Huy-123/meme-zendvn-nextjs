import React, { useRef, useState } from 'react'

type PropsType = {
  handleSubmitForm: (v: string, callback: (e?: Error) => void) => void
}

const PostCommentForm: React.FC<PropsType> = ({ handleSubmitForm }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [commentValue, setCommentValue] = useState('');
  const handleChangeComment = (e) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value)
    }
  }

  const inputElm = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading === true) return;
    if (commentValue.trim().length != 0) {
      setIsLoading(true)
      handleSubmitForm(commentValue, (e) => {
        setCommentValue('')
        inputElm.current.focus();
        setIsLoading(false)
      })
    } else {
      alert('Vui long nhap lai binh luan')
    }
  }

  return (
    <div className="ass1-add-comment">
      <form action="#" onSubmit={handleSubmit}>
        <input
        ref={inputElm}
          value={commentValue}
          onChange={handleChangeComment}
          type="text" className="form-control ttg-border-none" placeholder="Thêm một bình luận" />
      </form>
      <div className="ass1-add-comment__content">
        <a href="#" className="ass1-add-comment__btn-save ass1-btn-icon">
          <span>{180 - commentValue.length}</span>
          <i onClick={handleSubmit} className="icon-Submit_Tick" />
        </a>
      </div>
    </div>

  )
}

export default PostCommentForm
