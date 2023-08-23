
import Link from "next/link";
import { useGlobalState } from "../../state";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";

export default function Header() {

	const [token, setToken] = useGlobalState('token');
	const [userInfo, setUserInfo] = useGlobalState('currentUser');
	const router = useRouter();

	const handleLogout = () => {
		const check = window.confirm('Are you sure you want to Logout?');

		if (check) {
			Cookies.remove('token');
			setToken('');
			setUserInfo(null);
			router.push('/login')
		}

	}

	return (
		<header>
			<div className="ass1-header">
				<div className="container">
					<Link href="/" className="ass1-logo">ZendVn Meme</Link>
					<HeaderMenu />
					<HeaderSearch />
					<Link href="/posts/create" className="ass1-header__btn-upload ass1-btn">
						<i className="icon-Upvote" /> Upload
					</Link>
					{
						userInfo
							?
							<div className="wrapper-user">
								<Link href="/users/[userId]" as={`/users/${userInfo.USERID}`} className="user-header">
									<span className="avatar">
										<img src={userInfo.profilepicture || "/images/avatar-02.png"} alt="avatar" />
									</span>
									<span className="email">{userInfo.fullname}</span>
								</Link>
								<div onClick={handleLogout} className="logout">Logout</div>
							</div>
							:
							<Link href='/login' className="ass1-header__btn-upload ass1-btn">
								Login
							</Link>
					}
				</div>
			</div>
		</header>

	)
}