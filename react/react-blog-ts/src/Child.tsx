import { Button } from 'antd';
import State from './Timer';
import { observer } from 'mobx-react'
import './Child.less'

interface Props {
	name: string;
}

const Child = observer((props: Props) => {
	return <div>
		<Button type="primary">Primary Button</Button>
		<Button type="primary">Child-{props.name}</Button>
		<div className="custom">自定义css变量</div>
		<div>{State.seconds}</div>
		<Button onClick={State.increase}>增加</Button>
		<Button onClick={State.reset}>重置</Button>
	</div>;
})

export default Child;