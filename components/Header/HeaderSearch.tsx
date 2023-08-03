import { useRouter } from 'next/router';
import React, { useState } from 'react'

function HeaderSearch() {

	const router = useRouter()

	const [queryStr, setQueryStr] = useState('');

	const onChange = (e) => {
		setQueryStr(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (queryStr) {
			router.push(`/search?query=${queryStr}`);
		}
	}

	return (
		<div className="ass1-header__search">
			<form action="#" onSubmit={handleSubmit}>
				<label>
					<input
						value={queryStr}
						onChange={onChange}
						type="search"
						className="form-control"
						placeholder="Nhập từ khóa ..."
					/>
					<i className="icon-Search" />
				</label>
			</form>
		</div>
	)
}


export default HeaderSearch
