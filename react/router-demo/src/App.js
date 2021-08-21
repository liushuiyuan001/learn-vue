import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './component/nav'
import { routes } from './router/router'
function App() {
	return (
		<Fragment>
			<Nav></Nav>
			<Switch>
				{
					routes.map(item => {
						return <Route
							key={item.path}
							path={item.path}
							exact={item.exact}
							render={item.render}
						>

						</Route>
					})
				}
			</Switch>
		</Fragment>
	)
}

export default App
