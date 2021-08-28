import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
export default function Pagation(props) {
	const { activePage, pageLength } = props
	return (
		<div>
			{
				[...('.'.repeat(pageLength))].map((item, index) => {
					return (
						<Fragment key={index}>
							<span>|</span>
							<Link
								to={"/list/" + (index + 1)}
								style={{
									color: activePage === (index + 1) ? "red" : "#000"
								}}
							>{index + 1}</Link>
						</Fragment>
					)
				})
			}
			<span>|</span>
		</div>
	)
}
