import { faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';
import { MainPage, SignUpPage, LikePage } from './index.js';

export function createUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

export function createArticle() {
  return {
    articleTitle: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    text: faker.lorem.sentences(4),
    tag: faker.lorem.word()
  };
}

export const test = base.extend({
 app: async ({ page }, use) => {
 const app = {
 mainPage: new MainPage(page),
 signUpPage: new SignUpPage(page),
 likePage: new LikePage(page),
 };
 await use(app);
 }
})

export { expect } from '@playwright/test';