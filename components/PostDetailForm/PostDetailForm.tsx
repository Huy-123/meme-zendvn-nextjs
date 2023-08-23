import React, { useRef } from 'react'

type PropsType = {
  post_content: string;
  url_image: string;
  obj_image: {
    base64: string,
    file: File | null;
  };
  onChangeDetailForm: (key: string, value: any) => void
}

const PostDetailForm: React.FC<PropsType> = ({ post_content, url_image, obj_image, onChangeDetailForm }) => {

  const inputFileEl = useRef(null);

  const imageURL = url_image || obj_image.base64 || "/images/no_image_available.jpg";

  const handleOnChange = (key: string) => {
    return (e) => {
      const value = e.target.value;
      onChangeDetailForm(key, value);
    }
  }

  // OnChangeFile =================================
  const OnChangeFile = (e: any) => {
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0] as File;
    if ((/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        onChangeDetailForm("obj_image", { file: file, base64: reader.result as string })
      }, false,);
      reader.readAsDataURL(file);
    } else {
      alert('File khong hop le')
    }
  }

  // handleClickSelectFile =================================
  const handleClickSelectFile = () => {
		inputFileEl.current.click()
	}

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <input
              value={url_image}
              onChange={handleOnChange("url_image")}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://" />
          </div>
          <div className="ass1-section__content">
            <p>You can create new Meme Image here </p>
            <a href="https://memeful.com/" target="_blank">https://memeful.com/</a>
          </div>
          <div className="form-group">
            <textarea
              value={post_content}
              onChange={handleOnChange('post_content')}
              className="form-control ttg-border-none"
              placeholder="Mô tả ..."
              defaultValue={""}
            />
          </div>
        </form>
        <input
          onChange={OnChangeFile}
          ref={inputFileEl}
          style={{ display: 'none' }}
          type="file" className="form-control" />
        <div className="ass1-section__image">
          <a href="#"><img src={imageURL} alt="default" /></a>
        </div>
        <a href="https://memeful.com/" target="_blank" className="ass1-btn ass1-btn-meme">Chế ảnh từ meme</a>
        <button onClick={handleClickSelectFile}  className="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
      </div>
    </div>

  )
}

export default PostDetailForm
