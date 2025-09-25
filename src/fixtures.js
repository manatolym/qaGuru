import { faker } from '@faker-js/faker';

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