import React, { useRef, useState } from 'react'
import { useGlobalState } from '../../state'
import userService from '../../services/userService';

function UserProfile() {
	const [currentUser, setCurrentUser] = useGlobalState('currentUser');
	const [token] = useGlobalState('token');
	// console.log('token ', token);
	const [user, setUser] = useState(currentUser);
	const [objFile, setObjFile] = useState({ file: null, base64URL: '' })

	const handleOnChange = (key: string) => {
		return (e) => {
			const value = e.target.value;
			setUser({
				...user,
				[key]: value
			})
		}
	}

	const inputFileEl = useRef(null);

	const handleClickSelectFile = () => {
		inputFileEl.current.click()
	}

	const OnChangeFile = (e: any) => {
		const listFiles = e.target.files;
		if (listFiles.length === 0) return;

		const file = listFiles[0] as File;


		if ((/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(file.type)) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				// convert image file to base64 string
				setObjFile({
					file,
					base64URL: reader.result as string
				})
			}, false,);
			reader.readAsDataURL(file);
		} else {
			alert('File khong hop le')
		}

	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			fullname: user.fullname,
			description: user.description,
			gender: user.gender,
			avatar: objFile.file 
		}

		userService
			.updateProfile(data, token)
			.then((res) => {
				if(res.status === 200){
					setCurrentUser(res.user)
					alert('Cap nhat Profile thanh cong :)')
				}else{
					alert(res.error)
				}
				console.log('res ', res);
				
			})
	}

	const avatarURL = objFile.base64URL || user.profilepicture || "/images/avatar-02.png";

	return (
		<div className="ass1-login">
			<div className="ass1-login__content">
				<p>Profile</p>
				<div className="ass1-login__form">
					<div
						onClick={handleClickSelectFile}
						style={{ cursor: "pointer" }}
						className="avatar">
						<img src={avatarURL} alt="" />
					</div>
					<form action="#" onSubmit={handleSubmit}>
						<input
							value={user?.fullname}
							onChange={handleOnChange("fullname")}
							type="text" className="form-control" placeholder="Tên ..." required />
						<select
							value={user.gender}
							onChange={handleOnChange("gender")}
							className="form-control">
							<option >Giới tính</option>
							<option value="nam">Nam</option>
							<option value="nu">Nữ</option>
						</select>
						<input
							onChange={OnChangeFile}
							ref={inputFileEl}
							style={{ display: 'none' }}
							type="file" name="avatar" placeholder="Ảnh đại diện" className="form-control" />
						<textarea
							value={user?.description}
							onChange={handleOnChange("description")}
							className="form-control" cols={30} rows={5} placeholder="Mô tả ngắn ..." defaultValue={""} />
						<div className="ass1-login__send justify-content-center">
							<button type="submit" className="ass1-btn">Cập nhật</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	)
}


export default UserProfile
