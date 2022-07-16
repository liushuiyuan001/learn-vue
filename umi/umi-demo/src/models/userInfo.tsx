import type { Reducer, Effect,  Subscription } from 'umi'

export interface UserInfoModelState {
	name: string;
	age: number;
}
export interface UserInfoModelType {
	namespace: 'userInfo',
	state: UserInfoModelState;
	effects: {
		query: Effect;
	};
	reducers: {
		save: Reducer<UserInfoModelState>;
		changeName: Reducer<UserInfoModelState>;
		// 启用 immer 之后
		// save: ImmerReducer<UserInfoModelState>;
	};
	subscriptions: { setup: Subscription}
}

const UserInfoModel: UserInfoModelType = {
	namespace: 'userInfo',
	state: {
		name: 'zs',
		age: 18
	},
	effects: {
		*query({}, { call, put }) {

		}
	},
	reducers: {
		save(state,action) {
			return {
				...state,
				...action.payload
			}
		},
		changeName(state,action) {
			return {
				...state,
				...action.payload
			}
		},
		// 启用immer之后
		// save(state,action) {
		// 	state.name =action.payload			
		// }
	},
	subscriptions: { 
		setup({ dispatch, history}) {
			return history.listen(({pathname}) => {
				if(pathname === '/') {
					console.log('？？？')
					dispatch({ 
						type: 'query'
					})
				}
			})
		}
	}
}

export default UserInfoModel;
