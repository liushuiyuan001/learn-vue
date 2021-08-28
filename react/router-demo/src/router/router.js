import React from 'react';
import IndexView from '../view/index'
import AboutView from '../view/about'
import ListView from '../view/list'
import UndefinedView from '../view/404'
let routes = [
	{
		path: '/',
		exact: true,
		render(props) {
			return <IndexView {...props} />;
		}
	},
	{
		path: '/about',
		exact: true,
		render(props) {
			return <AboutView {...props} />;
		}
	},
	{
		path: ["/list", "/list/:page"],
		exact: true,
		render(props) {
			let { page = 1 } = props.match.params;
			if (page >= 1) {
				return <ListView {...props} />;
			}
			return <UndefinedView {...props} />;
		}
	},
	{
		path: "",
		exact: true,
		render(props) {
			return <UndefinedView {...props} />;
		}
	}
]

let navs = [
	{
		to: "/",
		exact: true,
		title: '首页'
	},
	{
		to: "/about",
		exact: true,
		title: "关于"
	},
	{
		to: "/list",
		title: "课程列表",
		isActive(url) {
			let urlData = url.split("/")
			const listHave = urlData.length === 3 && urlData[1] === "list" && Number(urlData[2]) > 0
			if (url === '/list' || listHave) {
				return true
			}
			return false
		}
	}
]

export { routes, navs }