import { test, expect } from '../src/fixtures.js'
import { createUser } from '../src/fixtures.js';

    test.describe('Проверка функциональности элементов навигации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Залогиненный пользователь может осуществить выход из портала', async ({ app }) => { 
        //arrange
        const user = createUser()
        //act
        await app.signUpPage.register(user)
        await app.signUpPage.expectPageContainsText(user.name)
        await app.mainPage.logOut()
        //assert
        await expect(app.mainPage.logInLink).toBeVisible()
    }) 
    })
        // TODO: проверить, что после логаута пользователь не может получить доступ к защищенным страницам