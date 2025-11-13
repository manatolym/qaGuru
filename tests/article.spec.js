import { test, expect } from '../src/fixtures.js'
import { createUser, createArticle } from '../src/fixtures.js';

test.describe('Проверка действий со статьями', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

test('Авторизованный пользователь может создать статью', async ({ app }) => {
    //arrange
    const user = createUser();
    const article = createArticle();
    //act
    await app.signUpPage.register(user);
    await app.mainPage.makeArticle(article);
    await expect(app.mainPage.articleTitleLocator).toBeVisible();
    //assert 
    await expect(app.mainPage.articleTitleLocator).toHaveText(article.articleTitle);
});



 test('Авторизованный пользователь может редактировать статью', async ({ app }) => {
        //arrange
        const article = createArticle()
        const editedArticle = createArticle()
        const user = createUser()
        //act
        await app.signUpPage.register(user);
        await app.signUpPage.expectPageContainsText(user.name);
        await app.mainPage.makeArticle(article); // создание статьи
        await app.mainPage.editArticle(editedArticle)
        //assert
        await expect(app.mainPage.checkArticle).toContainText(editedArticle.articleTitle)
    });
    // TODO: добавить negative тесты на создание статьи с пустыми полями

    test('Авторизованный пользователь ставит статье "лайк"', async ({ app }) => {
        //arrange
        const user = createUser();
        //act
        await app.signUpPage.goToRegister();
        await app.signUpPage.register(user);
        await app.likePage.gotoLike();
        //assert
        await expect(app.likePage.checkLike).toBeVisible();
    });
        // TODO: проверить, что лента не пустая (кол-во статей > 0)
    })


