import { test, expect } from '@playwright/test';

test('Test Home Page Expected Element Visibility', async ({ page }) => {
  await page.goto('http://localhost/frontend/index.html');
  await expect(page.getByRole('link', { name: 'Recipe Hub', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Recipe Hub Logo' }).click();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Recipes' })).toBeVisible();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Search' })).toBeVisible();
  await expect(page.locator('#navMenu').getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Discover Your Next Favorite' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore Recipes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Join Now' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search for recipes,' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Main', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vegetarian' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vegan' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Desserts' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Breakfast' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect(page.locator('.recipe-image').first()).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .recipe-image')).toBeVisible();
  await expect(page.getByText('💾 Save Favorites Create your')).toBeVisible();
  await expect(page.getByText('📱 Mobile Friendly Access')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get Started Now' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Recipes' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});

test('Test Login Page Expected Element Visibility', async ({ page }) => {
  await page.goto('http://localhost/frontend/index.html');
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await expect(page.locator('#loginEmail')).toBeVisible();
  await expect(page.locator('#loginPassword')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register Here' })).toBeVisible();
});

test('Test Register Page Expected Element Visibility', async ({ page }) => {
  await page.goto('http://localhost/frontend/signin.html');
  await page.getByRole('link', { name: 'Register Here' }).click();
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toBeVisible();
  await expect(page.locator('#registerEmail')).toBeVisible();
  await expect(page.locator('#registerPassword')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Confirm Password' })).toBeVisible();
  await expect(page.getByLabel('Dietary Preference')).toBeVisible();
  await expect(page.getByLabel('Dietary Preference')).toContainText('No dietary restrictions');
  await page.getByLabel('Dietary Preference').selectOption('vegan');
  await expect(page.getByLabel('Dietary Preference')).toContainText('Vegan');
  await page.getByLabel('Dietary Preference').selectOption('vegetarian');
  await expect(page.getByLabel('Dietary Preference')).toHaveValue('vegetarian');
  await page.getByLabel('Dietary Preference').selectOption('pescetarian');
  await expect(page.getByLabel('Dietary Preference')).toHaveValue('pescetarian');
  await page.getByLabel('Dietary Preference').selectOption('gluten_free');
  await expect(page.getByLabel('Dietary Preference')).toHaveValue('gluten_free');
  await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  await expect(page.locator('#showSignIn')).toBeVisible();
});