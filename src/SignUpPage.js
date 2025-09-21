import { expect } from '@playwright/test'

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' })
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })
        this.signUpLink = page.getByRole('link', { name: 'Sign up' })
        this.logInLink = page.getByRole('link', { name: 'Login' })
        this.logInButton = page.getByRole('button', { name: 'Login' })
    }

    async register(user) {    
        const { name, email, password } = user;
        await this.signUpLink.waitFor({ state: 'visible' })
        await this.signUpLink.click()
        await this.nameInput.click()
        await this.nameInput.fill(name)
        await this.emailInput.click()
        await this.emailInput.fill(email)
        await this.passwordInput.click()
        await this.passwordInput.fill(password)
        await this.signUpButton.click()
    }
    async loggingIn(user) {
        await this.logInLink.waitFor({ state: 'visible' })
        await this.logInLink.click()
        await this.emailInput.click()
        await this.emailInput.fill(user.email)
        await this.passwordInput.click()
        await this.passwordInput.fill(user.password)
        await this.logInButton.click()
    }
    async expectPageContainsText(text) {
        const locator = this.page.getByText(text)
        await expect(locator).toBeVisible()
    }
    async logOut() {
        await this.page.click('.nav-link.dropdown-toggle.cursor-pointer')
        await this.page.click('.ion-log-out');
        await expect(this.logInLink).toBeVisible()
    }
}