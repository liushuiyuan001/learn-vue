import Button from './Button.vue'
import { mount } from '@cypress/vue'
describe('Button', function () {
	it('it', function () {
		mount(Button)
		cy.contains("btn").click()
	})
})