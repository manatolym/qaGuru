import { expect } from '@playwright/test'

export class MainPage {
    constructor(page) {
        this.page = page
        this.homeLink = page.getByRole('link', { name: 'Home' })
        this.newArticleLink = page.getByRole('link', { name: 'New Article' })
        this.sourceLink = page.getByRole('link', { name: 'Source code' })
        this.yourFeedButton = page.getByRole('button', { name: 'Your Feed' })
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' })
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' })
        this.articleNameInput = page.getByRole('textbox', { name: 'Article Title' })
        this.articleAboutInput = page.getByRole('textbox', { name: 'What\'s this article about?' })
        this.articleBodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' })
        this.articleTagInput = page.getByRole('textbox', { name: 'Enter tags' })
    }
    async makeArticle(article) {    
        const { articleTitle, description, text, tag } = article;
        await this.newArticleLink.waitFor({ state: 'visible' })
        await this.newArticleLink.click()
        await this.articleNameInput.click()
        await this.articleNameInput.fill(articleTitle)
        await this.articleAboutInput.click()
        await this.articleAboutInput.fill(description)
        await this.articleBodyInput.click()
        await this.articleBodyInput.fill(text)
        await this.articleTagInput.click()
        await this.articleTagInput.fill(tag)
        await this.publishArticleButton.click()
    }
    async expectPageContainsArticle(text) {
        const locator = this.page.getByText(text)
        await expect(locator).toBeVisible()
    }
}