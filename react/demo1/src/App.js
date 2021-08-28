
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Select, Button } from 'antd';
import CustForm from './CustForm.js'
const { Option } = Select;

class HorizontalLoginForm extends React.Component {

	state = {
		// 从接口中取值
		names: '',
		list: [{ 'note': '1', 'gender': '' }, { 'note': '', 'gender': 'male' }]
	}

	handleSubmit = () => {
		const { list = [] } = this.state;
		let formArr = list.map((item, i) => {
			return this.refs['cform' + i]
		})
		// for (let i = 0; i < list.length; i++) {
		// 	const form = this.refs['cform' + i]
		// 	formArr.push(form)
		// }
		console.log(formArr)
		for (let j = 0; j < formArr.length; j++) {
			const cForm = formArr[j];
			// cForm.resetFields()
			console.log('getFieldsError', cForm.getFieldsError())
			console.log('getFieldsValue', cForm.getFieldsValue())
			// cForm.validateFields()
			cForm.validateFields(['gender', 'note'], { force: true }, (error, value) => {
				console.log(error, value)
			})

		}
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
				{
					this.state.list.map((item, index) => {
						return (
							<CustForm ref={'cform' + index} key={index} obj={item}></CustForm>
						)
					})
				}
				<Button onClick={this.handleSubmit}>
					Submit
				</Button>
			</div >
		)
	}
}

export default HorizontalLoginForm