import React, { useEffect } from 'react'
import { useState } from 'react';
import fetch from "isomorphic-fetch"
import { BASE_URL } from "../constants"
import api from '../services/api';
import { useRouter } from 'next/router'
import { useGlobalState } from '../state';
import { useNotAuthen } from '../helpers/useAuthen';
import Link from 'next/link';
import { Button } from '../components/Button';

// import Cookies from 'js-cookie'

interface FormLogin {
	email: string;
	password: string;
}

const initFormLogin = {
	email: '',
	password: ''
}

function Login() {
	useNotAuthen()
	const [formLogin, setFormLogin] = useState<FormLogin>(initFormLogin)
	const [loading, setLoading] = useState(false)
	const router = useRouter();
	const errorString = router.query.error;
	const [userInfo] = useGlobalState('currentUser');

	// useEffect(() => {
	// 	console.log('userInfo in Login Page ', userInfo);

	// }, [userInfo])

	useEffect(() => {
		if (errorString) {
			alert('Dang nhap that bai')
			window.history.pushState({}, document.title, "/login")

		}
	}, [errorString])

	// Cách 1

	// const handleOnChangeFormLogin = (e: any, key: string) => {
	// 	const value = e.target.value;

	// 	setFormLogin({
	// 		...formLogin,
	// 		[key]: value
	// 	})
	// }

	// Cách 2

	const handleOnChangeFormLogin = (key: string) => {
		return (evt: any) => {
			const value = evt.target.value;
			setFormLogin({
				...formLogin,
				[key]: value
			})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		// Cookies.set("name3", Math.floor(Math.random() * 1000), {expires: 7});
		// Cookies.remove("nam3")


		const body = JSON.stringify(formLogin);
		const method = "POST";

		fetch('/api/login', {
			method,
			body,
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				// console.log("Data: ", data);
				// Cookies.set("token", data.token, {expires: 30})
				router.push('/');
			})

	}

	const handleSubmitForm = (e) => {
		e.preventDefault();
		if (loading === true) return;
		const formElement = e.target

		// B1. Handle Vadidation Form 
		setLoading(true)

		// B2. Goi ham onSubmit
		formElement.submit();
	}

	return (
		<div className="ass1-login">
			<div className="ass1-login__logo">
				<Link href="/" className="ass1-logo">ZendVn Meme</Link>
			</div>
			<div className="ass1-login__content">
				<p>Đăng nhập</p>
				<div className="ass1-login__form" >
					{/* <form action="#" onSubmit={handleSubmit}> */}
					<form action="/api/login" method="POST" onSubmit={handleSubmitForm}>
						<input
							// value={formLogin.email}
							// onChange={handleOnChangeFormLogin("email")} 
							name="email"
							type="text" className="form-control"
							placeholder="Email" required />
						<input
							// value={formLogin.password} 
							// onChange={handleOnChangeFormLogin("password")} 
							name="password"
							type="password"
							className="form-control"
							placeholder="Mật khẩu" required />
						{/* <a href="#">Copy</a> */}
						<div className="ass1-login__send">
							<Link href="/register">Đăng ký một tài khoản</Link>
							<Button type="submit" className="ass1-btn" isLoading={loading}>Đăng nhập</Button>
						</div>
					</form>
				</div>
			</div>
		</div>

	)
}


export default Login
