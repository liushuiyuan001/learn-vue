import React, { Fragment } from 'react'
import { navs } from '../router/router'
import { NavLink, useLocation } from 'react-router-dom'
export default function Nav() {
	let { pathname } = useLocation()
	return (
		<div>
			<span>|</span>
			{
				navs.map(item => {
					return <Fragment key={item.to}>
						<NavLink
							to={item.to}
							exact={item.exact}
							isActive={item.isActive ? () => {
								return item.isActive(pathname)
							} : null}
						>
							{item.title}
						</NavLink>
					</Fragment>
				})
			}
		</div>
	)
}
