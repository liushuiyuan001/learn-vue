import React from 'react'
import data from '../data/data.js';
const pageLen = 3

export default function List(props) {
	const { activePage = 1 } = props
	const start = pageLen * (activePage - 1)
	const end = activePage * pageLen
	const newData = data.filter((_, index) => index >= start && index <= end)
	return (
		<ul>
			{
				newData.map(item => {
					return <li key={item.id}>
						<h2>{item.title}</h2>
						<p>{item.describe}</p>
					</li>
				})
			}
		</ul>
	)
}