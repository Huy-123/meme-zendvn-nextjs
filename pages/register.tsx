import React, { useMemo, useState } from 'react'
import { handleError } from '../helpers';
import userService from '../services/userService';
import api from '../services/api';
import fetch from "isomorphic-fetch"
import { useGlobalState } from '../state';
import Cookies from 'js-cookie';
import { useNotAuthen } from '../helpers/useAuthen';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import Link from 'next/link';

const initRegisterData = {
	fullname: {
		value: '',
		error: '',
	},
	email: {
		value: '',
		error: '',
	},
	password: {
		value: '',
		error: '',
	},
	repassword: {
		value: '',
		error: '',
	},
}


function Register() {

	useNotAuthen() // tự động push qua trang Home (/)
	// const router = useRouter()

	const [loading, setLoading] = useState(false)

	const [ ,SetToken] = useGlobalState('token')
	const [ ,SetCurrentUser] = useGlobalState('currentUser');

	// State
	const [registerData, setRegisterData] = useState(initRegisterData);

	const isValidate = useMemo((): boolean => {
		for (let key in registerData) {
			const error = registerData[key].error;
			if (error !== '') {
				return false
			}
		}
		return true;
	}, [registerData]);

	const onChangeData = (key: string) => {
		return (
			(e: any) => {
				const value = e.target.value;
				const password = registerData.password.value
				// Handle Error 4 Case
				const error = handleError(key, value, password);

				setRegisterData({
					...registerData,
					[key]: {
						value: value,
						error: error
					}
				})
			}
		)
	}

	const handleRegister = (e: any) => {
		e.preventDefault()

		if(loading === true) return;

		if (isValidate === false) {
			alert('Du lieu nhap vao khong hop le!');
		};

		const fullname = registerData.fullname.value;
		const email = registerData.email.value;
		const password = registerData.password.value;
		const repassword = registerData.repassword.value

		const data = {
			email,
			fullname,
			password,
			repassword,
		}

		// fetch('http://apiluc.zendvn.com/api/member/register.php', {
		// 	method: 'POST',
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},body: JSON.stringify(data)},
		// 	).then(res => res.json())

		setLoading(true);

		userService
			.register(data)
			.then((res) => {
				if (res.status === 200) {
					SetToken(res.token);
					SetCurrentUser(res.user);
					Cookies.set("token", res.token, { expires: 30 * 12 });
					// router.push('/')
				} else {
					alert(res.error)
				}
			})
			.finally(() => {
				setLoading(false)
			})

	}

	return (
		<div className="ass1-login">
			<div className="ass1-login__logo">
				<Link href="/" className="ass1-logo">ZendVn Meme</Link>
			</div>
			<div className="ass1-login__content">
				<p>Đăng ký một tài khoản</p>
				<div className="ass1-login__form">
					<form action="#" onSubmit={handleRegister}>
						<div className="form-group">
							<input
								value={registerData.fullname.value}
								onChange={onChangeData('fullname')}
								type="text" className="form-control" placeholder="Tên hiển thị" required />
							{registerData.fullname.error &&
								<small className="form-text text-danger">{registerData.fullname.error}</small>}
						</div>
						<div className="form-group">
							<input
								value={registerData.email.value}
								onChange={onChangeData('email')}
								type="email" className="form-control" placeholder="Email" required />
							{registerData.email.error &&
								<small className="form-text text-danger">{registerData.email.error}</small>}
						</div>
						<div className="form-group">
							<input
								value={registerData.password.value}
								onChange={onChangeData('password')}
								type="password" className="form-control" placeholder="Mật khẩu" required />
							{registerData.password.error &&
								<small className="form-text text-danger">{registerData.password.error}</small>}
						</div>
						<div className="form-group">
							<input
								value={registerData.repassword.value}
								onChange={onChangeData('repassword')}
								type="password" className="form-control" placeholder="Nhập lại mật khẩu" required />
							{registerData.repassword.error &&
								<small className="form-text text-danger">{registerData.repassword.error}</small>}
						</div>
						<div className="ass1-login__send">
							<Link href="/login">Đăng nhập</Link>
							<Button type="submit" className="ass1-btn" isLoading={loading}>Đăng ký</Button>
						</div>
					</form>
				</div>
			</div>
		</div>

	)
}


export default Register
