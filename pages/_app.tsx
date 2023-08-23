// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../components/Header/header.scss";
import "../node_modules/nprogress/nprogress.css"
import "../assets/css/loading.css";

// Libary
import es6Promise from "es6-promise";
import Head from "next/head"
// import "../assets/style.scss";
import App from "next/app";
import { AppProps, AppContext } from "next/app";
import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header/index"
import { Footer } from "../components/Footer";
import { getTokenSSRAndCSR } from "../helpers";
import userService from "../services/userService";
import { useGlobalState } from "../state";
import postService from "../services/postService";
import NProgress from "nprogress"


es6Promise.polyfill();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	const pathname = router.pathname;
	// Sate
	const [token, SetToken] = useGlobalState('token')
	const [categories, SetCategories] = useGlobalState('categories');
	const [currentUser, SetCurrentUser] = useGlobalState('currentUser');
	// lOADING
	// const [loading, setLoading] = useState(false)


	useMemo(() => {
		// console.log('Chạy 1 lần duy nhất tại phía Server Side');
		// console.log("pageProps.userInfo ", pageProps.userInfo);

		//  Chạy 1 lan duy nhat khoi tao global state
		SetToken(pageProps.token)
		SetCurrentUser(pageProps.userInfo);
		SetCategories(pageProps.categories);
	}, [])

	// Router Event - Naviga to new Page
	useEffect(() => {
		router.events.on('routeChangeStart', (url) => {
			// setLoading(true)
			NProgress.start()
			NProgress.set(0.5);
		})
		router.events.on('routeChangeComplete', (url) => {
			// setLoading(false)
			NProgress.done()
		})
		router.events.on('routeChangeError', (url) => {
			// setLoading(false)
			NProgress.done()
		})
	})

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

			{/* Loading */}
			{/* {
				loading &&
				<div className="loading-page">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
						width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<g transform="translate(50 50)">
							<g>
								<animateTransform attributeName="transform" type="rotate" values="0;45" keyTimes="0;1" dur="0.2s" repeatCount="indefinite" /><path d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" fill="#4554da" /></g></g>
					</svg>
				</div>
			} */}

		</div>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => {
	let userPos = null;
	let categoriesPos = null;
	// let token = '';
	const appProps = await App.getInitialProps(appContext);

	let [token, userToken] = getTokenSSRAndCSR(appContext.ctx)

	if (typeof window === 'undefined') {
		if (userToken?.id && userToken?.email) {
			userPos = userService.getUserById(userToken.id)
		}
		categoriesPos = postService.getCategories();
	}

	const [userRes, categoriesRes] = await Promise.all([userPos, categoriesPos]);

	// console.log("chạy o Client - Serer");
	// if (typeof window === 'undefined') {
	// 	const cookieStr = appContext.ctx.req.headers.cookie || '';
	// 	token = cookie.parse(cookieStr).token;
	// 	const userToken = parseJwt(token);
	// 	if (userToken && userToken.id) {
	// 		userRes = await userService.getUserById(userToken.id)
	// 	}
	// }else{
	// 	token = Cookies.get('token') || ''
	// }
	// console.log('token ',token )
	return {
		pageProps: {
			...appProps.pageProps,
			token: token,
			userInfo: userRes?.user || null,
			categories: categoriesRes?.categories || [],
		},
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