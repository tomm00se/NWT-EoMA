import { test, expect } from '@playwright/test';

test('Test new Registartion then login & logout', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomPassword = Math.random().toString(36).slice(-10) + "A44441";
  const randomEmail = `${randomUsername}@outlook.com`;
  console.log("Username" + randomUsername);
  console.log("Email" + randomEmail);
  console.log("Password" + randomPassword);
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill(randomPassword);
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(randomPassword);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill(randomEmail);
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill(randomPassword);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login successful! Redirecting')).toBeVisible();
  await page.goto('http://localhost/frontend/index.html');
  await expect(page.getByRole('link', { name: 'Hello, '+randomUsername +'!' })).toBeVisible();
  await expect(page.locator('#navMenu')).toContainText('Hello, '+ randomUsername);
  await page.getByRole('link', { name: 'Hello, '+randomUsername +'!' }).click();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toBe('Successfully logged out!');
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Sign In' })).toBeVisible();
});


test('Test attempt to register without all missing information', async ({ page }) => {
  await page.goto('http://localhost/frontend/index.html#');
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Create Account Full Name')).toBeVisible();
  await expect(page.locator('#registrationForm')).toMatchAriaSnapshot(`
    - heading "Create Account" [level=2]
    - text: Full Name
    - textbox "Full Name"
    - text: Email
    - textbox "Email"
    - text: Password
    - textbox "Password"
    - text: Confirm Password
    - textbox "Confirm Password"
    - text: Dietary Preference
    - combobox "Dietary Preference":
      - option "No dietary restrictions" [selected]
      - option "Vegan"
      - option "Vegetarian"
      - option "Pescetarian"
      - option "Gluten Free"
    - button "Create Account"
    - paragraph:
      - text: Already have an account?
      - link "Sign In":
        - /url: "#"
    `);
});

test('Test Missing name', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await expect(page.getByText('Recipe Hub Home Recipes')).toBeVisible();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill('test@gmail.com');
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill('monkey12345');
  await page.getByText('Confirm Password').click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('monkey12345');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test Missing email', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Hello');
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill('5666444555ttttt');
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('5666444555ttttt');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test missing passwords', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomEmail = `${randomUsername}@outlook.com`;
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test missing confirm password', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomPassword = Math.random().toString(36).slice(-10) + "AA1";
  const randomEmail = `${randomUsername}@outlook.com`;
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill(randomPassword);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test invalid email', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomPassword = Math.random().toString(36).slice(-10) + "AA1";
  const randomEmail = `${randomUsername}`;
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill(randomPassword);
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(randomPassword);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test invalid password length', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomPassword = "AA";
  const randomEmail = `${randomUsername}@outlook.com`;
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill(randomPassword);
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(randomPassword);

  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/api/users/registration') &&
      resp.request().method() === 'POST'
    ),
     page.getByRole('button', { name: 'Create Account' }).click(),
  ]);

  const responseBody = await response.json();

  expect(responseBody.message).toBe('Password must be at least 8 alphanumeric characters.');
  await expect(page.locator('#registerContainer')).toBeVisible();
});

test('Test invalid password charcaters', async ({ page }) => {
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const randomPassword = "AA!!!!!!!!!!!2345____$$$";
  const randomEmail = `${randomUsername}@outlook.com`;
  await page.goto('http://localhost/frontend/index.html');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(randomUsername);
  await page.locator('#registerEmail').click();
  await page.locator('#registerEmail').fill(randomEmail);
  await page.locator('#registerPassword').click();
  await page.locator('#registerPassword').fill(randomPassword);
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(randomPassword);

  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/api/users/registration') &&
      resp.request().method() === 'POST'
    ),
     page.getByRole('button', { name: 'Create Account' }).click(),
  ]);
  
  const responseBody = await response.json();

  expect(responseBody.message).toBe('Password must be at least 8 alphanumeric characters.');
  await expect(page.locator('#registerContainer')).toBeVisible();
});