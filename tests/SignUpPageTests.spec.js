import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../src/index.js';



const URL = 'https://realworld.qa.guru'
const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

test.describe('Тесты регистрации и авторизации', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test('Регистрация', async ({ page }) => {
      
        const signUpPage = new SignUpPage(page)
        await signUpPage.register(user)
        await signUpPage.expectPageContainsText(user.name)
        })

    test('Авторизация', async ({ page }) => {
        const signUpPage = new SignUpPage(page)
        await signUpPage.loggingIn(user)
        await signUpPage.expectPageContainsText(user.name)
    })
    })



    