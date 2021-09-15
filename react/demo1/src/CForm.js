import React, { useState } from 'react'
import { Form, Input, Select, Button } from 'antd'
const { Option } = Select;

function CForm(props) {
	const { getFieldDecorator } = props.form;

	const [list, setList] = useState([])

	const handleSubmit = e => {
		e.preventDefault();
		console.log('object', props.form.getFieldsValue())
		// props.form.validateFields((err, values) => {
		// 	if (!err) {
		// 		console.log('Received values of form: ', values);
		// 	}
		// });
	};

	const handleAdd = e => {
		console.log('list', list);
		setList([...list, { name: '', type: '' }]);
	}

	const handleDelete = i => {
		console.log('handleDelete', i)
		list.splice(i, 1);
		setList([...list])
	}

	const inputChange = (e, i) => {
		console.log('object', e, e.target.value)
		list[i]['name'] = e.target.value;
		console.log('objeclistt', list)
		setList([...list])
	}
	const handleSelectChange = value => {
		console.log(value);
	};

	const InputCom = (val, index) => {
		return <Input value={val} onChange={(e) => inputChange(e, index)} />
	}

	return (
		<div>
			<Form>
				<Form.Item>
					<Button type="primary" onClick={handleAdd}>
						ADD
					</Button>
				</Form.Item>
				<div>
					{
						list.map((item, index) => {
							console.log('objectITem', item, index);
							return (
								<div key={index + Math.random() * 100}>
									<Form.Item label="Note">
										{getFieldDecorator(`note-${index}`, {
											rules: [{ required: true, message: 'Please input your note!' }],
											initialValue: item.name
										})(InputCom(item.name, index))}
									</Form.Item>
									<Form.Item label="Gender">
										{getFieldDecorator(`gender-${index}`, {
											rules: [{ required: true, message: 'Please select your gender!' }],
										})(
											<Select
												placeholder="Select a option and change input text above"
												onChange={handleSelectChange}
											>
												<Option value="male">male</Option>
												<Option value="female">female</Option>
											</Select>,
										)}
									</Form.Item>
									<Form.Item>
										<Button type="primary" onClick={() => handleDelete(index)}>
											Delete
										</Button>
									</Form.Item>
								</div>
							)
						})
					}
				</div>
				<Form.Item>
					<Button type="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Form.create()(CForm)
