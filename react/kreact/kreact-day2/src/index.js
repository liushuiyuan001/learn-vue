import ReactDOM from './kreact/react-dom';
import Component from './kreact/component'
import './index.css';


function FunctionComponent(props) {
	return (
		<div>
			<p>函数组件-{props.name}</p>
		</div>
	)
}
class ClassComponent extends Component {
	render() {
		return (
			<div>
				<p>类组件-{this.props.name}</p>
			</div>
		)
	}
}
const jsx = (
	<div className="border">
		<h1>全栈</h1>
		<a href="http://kaikeba.com">开课吧</a>
		<FunctionComponent name="function" />
		<ClassComponent name="class" />
	</div>
)
ReactDOM.render(
	jsx,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
