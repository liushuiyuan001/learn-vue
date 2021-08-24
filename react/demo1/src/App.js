
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Select } from 'antd';
const { Option } = Select;

class HorizontalLoginForm extends React.Component {

	state = {
		// 从接口中取值
		names: ''
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ names: 'zs,ls' })
		}, 2000)
	}

	//* 计算属性 为了给select用 其实把逗号分隔的字符串变成数组
	get namesList() {
		// console.log('this.state.names', this.state.names)
		return this.state.names.split(',').filter(v => v)
	}

	//* 把select选择的数组变成逗号分号的字符串 给state赋值
	handleSelectChange = (value) => {
		const arr = value.toString()
		this.setState({
			names: arr
		})
	}

	render() {

		return (
			<div>
				< Select
					mode="multiple"
					style={{ width: '200px' }}
					value={this.namesList}
					initialValue={[]}
					defaultValue={[]}
					onChange={this.handleSelectChange}
				>
					<Option key={'zs'}>{'张三'}</Option>
					<Option key={'ls'}>{'李四'}</Option>
					<Option key={'ww'}>{'王五'}</Option>
				</Select >
			</div >
		)
	}
}

export default HorizontalLoginForm