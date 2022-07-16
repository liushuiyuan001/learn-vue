import React, { FC } from 'react';
import { UserInfoModelState, ConnectRC, Loading, connect } from 'umi'
interface PageProps {
	userInfo: UserInfoModelState;
	loading: boolean;
}

const IndexPage: FC<PageProps> = (props) => {
	console.log('props', props);
	const handleClick = () => {
		const { dispatch } : any = props;
		dispatch({
			type: 'userInfo/changeName',
			payload: { 
				name: '李四'
			}
		})
	}
	return (
		<div>
			<div onClick={handleClick}>更改用户名</div>
			<div>用户名{props.userInfo.name}</div>
		</div>
	)
}

export default connect(({ userInfo, loading } : {userInfo: UserInfoModelState; loading: Loading}) => ({
	userInfo,
	loading: loading.models.index
}))(IndexPage)