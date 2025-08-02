import { test, expect } from '@playwright/test';

test('Test Login Fails Invalid Username and Password', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('bbc@admin');
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill('bbc123');

  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/api/users/login') &&
      resp.request().method() === 'POST'
    ),
     page.getByRole('button', { name: 'Sign In' }).click(),
  ]);

  const responseBody = await response.json();

  expect(responseBody.message).toBe('Login failed. Invalid credentials.');
  await expect(page.getByText('Login failed. Invalid')).toBeVisible();
});

test('Test unable to login when no login credentials have been provided', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
});

test('Test unable to login when invalid username has been provided', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('5r4r34r34r43r43r434r43');
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill('FakePassword');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('Test unable to login when invalid password has been provided', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('test@outlook.com');
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill('FakePassword');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('Test Successful Login and Logout', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('admin@bbc.com');
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill('bbc123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login successful! Redirecting')).toBeVisible();
  await page.goto('http://localhost/frontend/index.html');
  await expect(page.getByRole('link', { name: 'Hello, BBC Admin!' })).toBeVisible();
  await expect(page.locator('#navMenu')).toMatchAriaSnapshot(`
    - link "Hello, BBC Admin!":
      - /url: "#"
    `);
  await expect(page.locator('#navMenu')).toContainText('Hello, BBC Admin!');
  await page.getByRole('link', { name: 'Hello, BBC Admin!' }).click();
  await expect(page.getByText('Sign Out ×')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  await expect(page.getByText('Sign Out × Are you sure you')).toBeVisible();
  await page.getByRole('button', { name: '×' }).click();
  await expect(page.getByText('Sign Out × Are you sure you')).not.toBeVisible();
  await page.getByRole('link', { name: 'Hello, BBC Admin!' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByText('Sign Out × Are you sure you')).not.toBeVisible();
  await page.getByRole('link', { name: 'Hello, BBC Admin!' }).click();
  
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

    page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Successfully logged out!');
  });

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Discover Your Next Favorite' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Recipe Hub', exact: true })).toBeVisible();
});
