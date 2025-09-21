import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage, MainPage } from '../src/index.js';

const URL = 'https://realworld.qa.guru';

test.describe('Тесты главной страницы', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Создание статьи', async ({ page }) => {
        const article = {
            articleTitle: faker.lorem.words(3), // название статьи из 3 слов
            description: faker.lorem.sentences(2), // описание из 2 предложений
            text: faker.lorem.sentences(4), // основной текст из 4 предложений
            tag: faker.lorem.word() // тег из одного слова
        };

        const mainPage = new MainPage(page);

        // Начало регистрации
        const signUpPage = new SignUpPage(page);
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        await signUpPage.register(user);
        await signUpPage.expectPageContainsText(user.name);
        // Конец регистрации

        await mainPage.makeArticle(article); // создание статьи
        await mainPage.expectPageContainsArticle(article.articleTitle); // провкерка существования статьи на странице
    });

 test('Редактирование статьи', async ({ page }) => {
        const article = {
            articleTitle: faker.lorem.words(3), // название статьи из 3 слов
            description: faker.lorem.sentences(2), // описание из 2 предложений
            text: faker.lorem.sentences(4), // основной текст из 4 предложений
            tag: faker.lorem.word() // тег из одного слова
        };

        const mainPage = new MainPage(page);

        // Начало регистрации
        const signUpPage = new SignUpPage(page);
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        await signUpPage.register(user);
        await signUpPage.expectPageContainsText(user.name);
        // Конец регистрации

        await mainPage.makeArticle(article); // создание статьи
        await mainPage.expectPageContainsArticle(article.articleTitle); // провкерка существования статьи на странице
        await mainPage.editArticle()
    });

    test('Открытие проекта на GIT', async ({ page }) => { 
        const mainPage = new MainPage(page);
        await mainPage.sourceCheck()
    })

    test('Выход из портала', async ({ page }) => { 
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
            await mainPage.logOut()
    })

    test('Проверка ленты статей', async ({ page }) => { 
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const signUpPage = new SignUpPage(page)
            await signUpPage.register(user)
            await signUpPage.expectPageContainsText(user.name)
        const mainPage = new MainPage(page);
        await mainPage.globalFeedCheck()
    })
    


});
