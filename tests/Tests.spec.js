import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage, MainPage } from '../src/index.js';
import { createUser, createArticle } from '../src/fixtures.js';


const URL = 'https://realworld.qa.guru';



test.describe('Проверка функциональности сайта realworld.qa.guru', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

test.describe('Проверка действий со статьями', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test('Создание статьи', async ({ page }) => {
        const article = createArticle()
        const user = createUser()
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        await signUpPage.register(user);
        await signUpPage.expectPageContainsText(user.name);
        await mainPage.makeArticle(article); // создание статьи
        await mainPage.expectPageContainsArticle(article.articleTitle); // провкерка существования статьи на странице
    });

 test('Редактирование статьи', async ({ page }) => {
        const article = createArticle()
        const user = createUser()
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        await signUpPage.register(user);
        await signUpPage.expectPageContainsText(user.name);
        await mainPage.makeArticle(article); // создание статьи
        await mainPage.expectPageContainsArticle(article.articleTitle); // провкерка существования статьи на странице
        await mainPage.editArticle()
    });

    test('Проверка ленты статей', async ({ page }) => { 
        const user = createUser()
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
        await mainPage.globalFeedCheck()
    })
    })

    test.describe('Проверка функциональности элементов навигации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Открытие проекта на GIT', async ({ page }) => { 
        const mainPage = new MainPage(page);
        await mainPage.sourceCheck()
    })

    test('Выход из портала', async ({ page }) => { 
        const user = createUser()
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
            await mainPage.logOut()
    })


    
test.describe('Проверка регистрации и авторизации', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test('Регистрация', async ({ page }) => {
        const user = createUser()
        const signUpPage = new SignUpPage(page)
        await signUpPage.register(user)
        await signUpPage.expectPageContainsText(user.name)
        })

    test('Авторизация', async ({ page }) => {
        const user = createUser()
        const signUpPage = new SignUpPage(page)
        await signUpPage.register(user)
        await signUpPage.expectPageContainsText(user.name)
        await signUpPage.logOut()
        await signUpPage.loggingIn(user)
        await signUpPage.expectPageContainsText(user.name)
    })
    })
    })
})
