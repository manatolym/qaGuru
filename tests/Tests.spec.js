import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage, MainPage } from '../src/index.js';
import { createUser, createArticle } from '../src/fixtures.js';

const URL = 'https://realworld.qa.guru';

test.describe('Проверка функциональности сайта realworld.qa.guru', ()=> {

test.describe('Проверка действий со статьями', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL)
    })

    test('Создание статьи', async ({ page }) => {
        const article = createArticle()
        const user = createUser()
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        await signUpPage.register(user); // Регистрация пользователя
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
    // TODO: добавить negative тесты на создание статьи с пустыми полями

    test('Проверка ленты статей', async ({ page }) => { 
        const user = createUser()
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
        await mainPage.globalFeedCheck()
    })
    })
    // TODO: проверить, что лента не пустая (кол-во статей > 0)

    test.describe('Проверка функциональности элементов навигации', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Открытие проекта на GIT', async ({ page }) => { 
        const mainPage = new MainPage(page);
        await mainPage.sourceCheck()
    })
    // TODO: добавить проверку, что вкладка открылась в новом окне или в том же, в зависимости от поведения

    test('Выход из портала', async ({ page }) => { 
        const user = createUser()
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
            await mainPage.logOut()
    })
    // TODO: проверить, что после логаута пользователь не может получить доступ к защищенным страницам

    
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
        // TODO: добавить проверку на ошибки регистрации (повторная регистрация с тем же email)

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
    // TODO: добавить negative тесты на неверный пароль, пустые поля и т.п.
    })
})
