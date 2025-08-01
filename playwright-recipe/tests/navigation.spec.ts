import { test, expect } from '@playwright/test';

test('Test Click Recipe Option', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await page.locator('#navMenu').getByRole('link', { name: 'Recipes' }).click();
  await expect(page.getByRole('heading', { name: 'Featured Recipes' })).toBeVisible();
  await expect(page.locator('#recipes')).toContainText('Featured Recipes');
  await expect(page.locator('#recipes')).toMatchAriaSnapshot(`- heading "Featured Recipes" [level=2]`);
});

test('Test Navigation back to home via logo', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByRole('link', { name: 'Recipe Hub', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Discover Your Next Favorite' })).toBeVisible();
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Register Here' }).click();
  await page.getByRole('link', { name: 'Recipe Hub Logo' }).click();
  await page.getByRole('heading', { name: 'Discover Your Next Favorite' }).click();
  await expect(page.getByRole('heading', { name: 'Discover Your Next Favorite' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore Recipes' })).toBeVisible();
});