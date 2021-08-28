const initialState = [

]

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case 'TODO_ADD':
			return [...state, {
				id: Date.now(),
				title: action.title,
				done: false,
			}]
		case 'TODO_DONE':
			state.forEach(item => {
				if (item.id === action.id) {
					item.done = true;
				}
			});
			return [...state]
		case 'TODO_EDIT':
			state.forEach(item => {
				if (item.id === action.id) {
					item.title = action.title
				}
			})
			return [...state]
		case 'TODO_REMOVE':
			return state.filter(item => item.id === action.id)
		case 'TODO_REMOVE_DONE':
			return state.filter(item => !item.done)
		default:
			return state
	}
}
