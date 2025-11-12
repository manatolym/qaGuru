import { test, expect } from '@playwright/test';
import { SignUpPage, MainPage, LikePage } from '../src/index.js';
import { createUser, createArticle } from '../src/fixtures.js';

test.describe('Проверка действий со статьями', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Авторизованный пользователь может создать статью', async ({ page }) => {
        const article = createArticle()
        const user = createUser()
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);

        await signUpPage.register(user); // Регистрация пользователя
        await signUpPage.expectPageContainsText(user.name);
        await mainPage.makeArticle(article); // создание статьи

        await expect(mainPage.checkArticle).toContainText(article.articleTitle);// провкерка существования статьи на странице
    });

 test('Авторизованный пользователь может редактировать статью', async ({ page }) => {
        const article = createArticle()
        const user = createUser()
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);

        await signUpPage.register(user);
        await signUpPage.expectPageContainsText(user.name);
        await mainPage.makeArticle(article); // создание статьи
        await mainPage.editArticle()

        await expect(mainPage.checkArticle).toContainText('New Article Title');
    });
    // TODO: добавить negative тесты на создание статьи с пустыми полями

    test('Авторизованный пользователь ставит статье "лайк"', async ({ page }) => {
        const user = createUser();
        const signUpPage = new SignUpPage(page);
        const likePage = new LikePage(page);

        await signUpPage.goToRegister();
        await signUpPage.register(user);
        await likePage.gotoLike();

        await expect(likePage.checkLike).toBeVisible();
    });
        // TODO: проверить, что лента не пустая (кол-во статей > 0)
    })


