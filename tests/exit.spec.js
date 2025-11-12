import { test, expect } from '@playwright/test';
import { SignUpPage, MainPage } from '../src/index.js';
import { createUser } from '../src/fixtures.js';
    
const URL = 'https://realworld.qa.guru';

    test.describe('Проверка функциональности элементов навигации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Залогиненный пользователь может осуществить выход из портала', async ({ page }) => { 
        const user = createUser()
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);

            await mainPage.logOut()
            
            await expect(mainPage.logInLink).toBeVisible()
    }) 
    })
        // TODO: проверить, что после логаута пользователь не может получить доступ к защищенным страницам