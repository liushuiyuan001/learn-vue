import React from 'react';
import { Button } from 'antd';

interface Props {
	name: string;
}
export default function Child(props: Props) {
	return <div>
		<Button type="primary">Child-{props.name}</Button>
	</div>;
}
