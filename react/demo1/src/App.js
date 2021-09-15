
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import CTab from './Tab'
import CForm from './CForm';

class HorizontalLoginForm extends React.Component {

	state = {
		// 从接口中取值
		tab: '1',
		tab1: '1'
	}

	callback = (val) => {
		this.setState({ tab: val });
	}

	callback1 = (val) => {
		this.setState({ tab1: val });
	}

	render() {
		return (
			<CForm />
		)
	}
	// render() {
	// 	const { tab, tab1 } = this.state
	// 	return (
	// 		<div>
	// 			<CTab tab={tab} test={() => { }} callback={this.callback}></CTab>
	// 			{
	// 				[1].map(item => {
	// 					return (
	// 						<CTab tab={tab1} test={() => { }} callback={this.callback1}></CTab>
	// 					)
	// 				})
	// 			}
	// 		</div>
	// 	)
	// }
}

export default HorizontalLoginForm