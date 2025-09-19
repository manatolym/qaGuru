import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../src/index.js';



const URL = 'https://realworld.qa.guru'

test.describe('Тесты главной страницы', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test('Создание пользователя', async ({ page }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const signUpPage = new SignUpPage(page)
        await signUpPage.register(user)
        await signUpPage.expectPageContainsText(user.name);
        })
    })



    