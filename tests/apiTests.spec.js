import { test, expect } from "@playwright/test";

test.describe("API challenge", () => {
  let token;

  test.beforeAll(async ({ request }, testInfo) => {
    let response = await request.post(`${testInfo.project.use.apiURL}challenger`);
    let headers = await response.headers();
    token = headers["x-challenger"];
    expect(headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });

  test("Запрет удаления списков задач DELETE /challenges возвращает 405", { tag: '@API' }, async ({ request }, testInfo) => {
  const response = await request.delete(`${testInfo.project.use.apiURL}challenges`, {
    headers: {
      "x-challenger": token,
    }
  });
  expect(response.status()).toBe(405)
});

  test("Удаление несуществующего todo DELETE /todos/{id}", { tag: '@API'}, async ({ request }, testInfo) => {
  const nonExistentId = 9999999;
  let response = await request.delete(`${testInfo.project.use.apiURL}todos/${nonExistentId}`, {
    headers: {
      "x-challenger": token
    }
  });
  let headers = await response.headers();
  expect(response.status()).toBe(404);
  expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("Получить список заданий GET /challenges", { tag: '@API'}, async ({ request }, testInfo) => {
    let response = await request.get(`${testInfo.project.use.apiURL}challenges`, {
      headers: {
        "x-challenger": token,
      },
    });
    let body = await response.json();
    let headers = await response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(Array.isArray(body.challenges)).toBeTruthy();
    expect(body.challenges.length).toBeGreaterThan(0);
  });

  test("Получить список todos  GET /todos", { tag: '@API'}, async ({ request }, testInfo) => {
    let response = await request.get(`${testInfo.project.use.apiURL}todos`, {
      headers: {
        "x-challenger": token,
      },
    });
    let body = await response.json();
    let headers = await response.headers();
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(Array.isArray(body.todos)).toBeTruthy();
    expect(body.todos.length).toBeGreaterThan(0);
  });

  test("Получить список todo not plural GET /todo", { tag: '@API'}, async ({ request }, testInfo) => {
    let response = await request.get(`${testInfo.project.use.apiURL}todo`, {
      headers: {
        "x-challenger": token,
      },
    });
    let headers = await response.headers();
    expect(response.status()).toBe(404);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });
});


