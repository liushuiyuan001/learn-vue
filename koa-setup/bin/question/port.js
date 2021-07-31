export default () => {
	return {
		type: 'input',
		name: 'port',
		default() {
			return 8000
		},
		message: 'set port'
	}
}