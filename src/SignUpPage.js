import { expect } from '@playwright/test'

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' })
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })
        this.signUpNavLink = page.getByRole('link', { name: 'Sign up' })
    }

    async register(user) {    
        const { name, email, password } = user;
        await this.signUpNavLink.waitFor({ state: 'visible' })
        await this.signUpNavLink.click()
        await this.nameInput.click()
        await this.nameInput.fill(name)
        await this.emailInput.click()
        await this.emailInput.fill(email)
        await this.passwordInput.click()
        await this.passwordInput.fill(password)
        await this.signUpButton.click()
    }
    async expectPageContainsText(text) {
        const locator = this.page.getByText(text)
        await expect(locator).toBeVisible()
    }
}