import { test, expect } from '../src/fixtures.js'


    test.describe('Проверка функциональности сайта без аутентификации и авторизации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Незарегистрированный пользователь может просмотреть список статей', async ({ app }) => { 
        //arrange
        const articlePreviews = app.mainPage.page.locator('div.article-preview');
        //act
        await app.mainPage.globalFeedCheck()
        const firstArticle = articlePreviews.first();
        //assert
        await expect(firstArticle).toBeVisible();
    })
    })