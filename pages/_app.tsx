import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../components/Header/header.scss";

import fetch from "isomorphic-fetch";
import es6Promise from "es6-promise";
import cookie from "cookie"
import Head from "next/head"
// import "../assets/style.scss";
import App from "next/app";
import { AppProps, AppContext } from "next/app";
import React, { useEffect, useMemo } from "react";
import { Header } from "../components/Header/index"
import { Footer } from "../components/Footer";
import { parseJwt } from "../helpers";
import userService from "../services/userService";
import { useGlobalState } from "../state";
import Cookies from "js-cookie";

es6Promise.polyfill();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	const pathname = router.pathname;
	const [token, SetToken] = useGlobalState('token')
	const [currentUser, SetCurrentUser] = useGlobalState('currentUser');
	

	useMemo(() => {
		// console.log('Chạy 1 lần duy nhất tại phía Server Side');
		// console.log("pageProps.userInfo ", pageProps.userInfo);
				
		//  Chạy 1 lan duy nhat khoi tao global state
		SetToken(pageProps.token)
		SetCurrentUser(pageProps.userInfo);
	},[])

	const hiddenHeader = useMemo(() => {
		const exclude = ['/login', '/register'];
		const currentRouter = pathname;

		return (
			exclude.indexOf(currentRouter) !== -1
		)
	}, [pathname])

	const hiddenFooter = useMemo(() => {
		const excluded = ['/', '/posts/[postId]'];
		const currentRouter = pathname;
		return (
			excluded.indexOf(currentRouter) !== -1
		)
	}, [pathname]);

	return (
		<div id="root">
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
				<meta name="keywords" content="HTML5 Template" />
				<meta name="description" content="Cộng đồng chế ảnh ZendVN" />
				<meta name="author" content="etheme.com" />
				<title>Cộng đồng chế ảnh ZendVN</title>
				<link rel="icon" href="/favicon.ico" />

				<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />

				{/* <!-- Font Awesome --> */}
				<link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
				<link rel="stylesheet" href="/fonts/emotion/style.css" />

				{/* <--! CSS --> */}
				{/* <link href="css/style.css" rel="stylesheet" /> */}
				{/* JAVA SCRIPT */}
				{/* require */}
				{/*  */}
				{/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
				{/*[if lt IE 9]>
	
	
	<![endif]*/}


			</Head>

			{!hiddenHeader && <Header />}
			<main>
				<Component {...pageProps} />
			</main>
			{!hiddenFooter && <Footer />}
		</div>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => {
	let userRes = null;
	let token = '';
	const appProps = await App.getInitialProps(appContext);

	// console.log("chạy o Client - Serer");
	
	if (typeof window === 'undefined') {
		// Server Side Rederingg
		// console.log('chạy ở Server Side');	

		const cookieStr = appContext.ctx.req.headers.cookie || '';
		token = cookie.parse(cookieStr).token;
		const userToken = parseJwt(token);

		// console.log('4. App Run, getInitialProps');
		// console.log('4. Nhận được header (token)', userToken);

		if (userToken && userToken.id) {
			// Co ton ti UserID -> Call API lay thong tin UserId
			userRes = await userService.getUserById(userToken.id)
			// console.log('userRes ', userRes);
			
		}
	}else{
		token = Cookies.get('token') || ''
	}
	console.log('token ',token )
	return {
		pageProps: {
			...appProps.pageProps,
			userInfo: userRes && userRes.user,
			token: token
		}
	}
}

export default MyApp;


// export default function MyApp({ Component, pageProps }) {
// 	// Đại diện cho 1 Page match url
// 	return (
// 		<div className="root-app">
// 			<Head>
// 				<title>Create Next App</title>
// 				<link rel="icon" href="/favicon.ico" />
// 				<link rel="stylesheet" href="/css/global.css" />
// 			</Head>
// 			<Component {...pageProps} />
// 		</div>
// 	)
// }

{/* <Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/css/global.css" />
				<link rel="stylesheet" href="/components/ModalDemo/modal.scss" />
			</Head> */}