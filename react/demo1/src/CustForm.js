import React from 'react';

import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

class Index extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleSelectChange = value => {
		console.log(value);
		this.props.form.setFieldsValue({
			note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { obj = {} } = this.props;
		return (
			<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
				<Form.Item label="Note">
					{getFieldDecorator('note', {
						rules: [{
							required: true,
							message: 'Please input your note!',
							validator: (rule, value, callback) => {
								try {
									throw new Error('Something wrong!');
								} catch (err) {
									// callback(err);
								}
							}

						},],
						initialValue: obj.note
					})(<Input />)}
				</Form.Item>
				<Form.Item label="Gender">
					{getFieldDecorator('gender', {
						rules: [{ required: true, message: 'Please select your gender!' }],
						initialValue: obj.gender || ''
					})(
						<Select
							allowClear
							placeholder="Select a option and change input text above"
						>
							<Option value="male">male</Option>
							<Option value="female">female</Option>
						</Select>,
					)}
				</Form.Item>
			</Form>
		);
	}
}

export default Form.create({})(Index);

