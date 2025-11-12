import { test, expect } from '@playwright/test';
import { MainPage } from '../src/index.js';


const URL = 'https://realworld.qa.guru';

    test.describe('Проверка функциональности сайта без аутентификации и авторизации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Незарегистрированный пользователь может просмотреть список статей', async ({ page }) => { 
        const mainPage = new MainPage(page);
        const articlePreviews = mainPage.page.locator('div.article-preview');
        await mainPage.globalFeedCheck()
        const firstArticle = articlePreviews.first();
        await expect(firstArticle).toBeVisible();
    })
    })