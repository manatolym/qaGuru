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
        this.editLink = page.getByRole('link', { name: 'Edit Article' }).first()
        this.deleteButton = page.getByRole('button', { name: ' Delete Article' })
        this.updateArticleButton = page.getByRole('button', { name: ' Update Article' })
        this.logInLink = page.getByRole('link', { name: 'Login' })
        this.checkArticle = page.getByRole('main');

    }
    
    // Метод создания статьи с параметрами из объекта article
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
    // TODO: добавить проверку успешной публикации статьи

    // Редактирование статьи с фиксированным новым заголовком
        async editArticle() {
        await this.editLink.click();
        await this.articleNameInput.click();
        await this.articleNameInput.fill('New Article Title');
        await this.updateArticleButton.click();
        //await expect(this.page.locator('body')).toContainText('New Article Title');
    }
    // TODO: добавить проверку, что изменения сохранились на сервере

    // Проверка отображения глобальной ленты статей
    async globalFeedCheck() {
        await this.globalFeedButton.click()
        await this.page.waitForSelector('div.article-preview');
    }
    // TODO: проверка что список статей не пустой

    // Выход из аккаунта
    async logOut() {
        await this.page.click('.nav-link.dropdown-toggle.cursor-pointer')
        await this.page.click('.ion-log-out');
    }
    // TODO: добавить проверку, что пользователь действительно вышел

}