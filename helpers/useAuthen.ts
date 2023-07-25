import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { parseJwt } from '.';
import { useRouter } from 'next/router';

function useAuthen() {
	const token = Cookies.get('token');
	const router = useRouter();

	useEffect(() => {
		const userToken = parseJwt(token);
		if(!(userToken && userToken.id && userToken.email)){
			// Chua dang nhap
			router.push('/login');
		}
	}, [token])

}

// Chua dnag nhap cho phep vao Login
// Da dang nhap -> Day qua HomePage

function useNotAuthen() {
	const token = Cookies.get('token');
	const router = useRouter();

	useEffect(() => {
		const userToken = parseJwt(token);
		if((userToken && userToken.id && userToken.email)){
			router.push('/');
		}
	}, [token])

}

export {useAuthen, useNotAuthen}