import { test, expect } from '@playwright/test';


test('Test Search Bar', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await expect(page.getByRole('heading', { name: 'Couscous Salad' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Easy Lamb Biryani' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Healthy Pizza' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mango Pie' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mushroom Doner' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Vegan Pancakes' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search for recipes,' }).click();
  await page.getByRole('textbox', { name: 'Search for recipes,' }).fill('Mushroom');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('heading', { name: 'Mango Pie' })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mushroom Doner' })).toBeVisible();
  await expect(page.getByText('A meat-free mushroom ‘doner’')).toBeVisible();
  await expect(page.getByText('⏱️ 30 minutes')).toBeVisible();
  await expect(page.locator('.heart-icon')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search for recipes,' }).click();
  await page.getByRole('textbox', { name: 'Search for recipes,' }).fill('Pizza');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('heading', { name: 'Mushroom Doner' })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Healthy Pizza' })).toBeVisible();
  await expect(page.getByText('No yeast required for this')).toBeVisible();
  await expect(page.getByText('⏱️ 30 minutes')).toBeVisible();
  await expect(page.locator('.heart-icon')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Search Results for "pizza" (1' })).toBeVisible();
});

test('Test pre existing recipe filter options', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await expect(page.locator('button.filter-btn[data-filter="all"].active')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Couscous Salad' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Easy Lamb Biryani' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Healthy Pizza' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Load More (1 remaining)' })).toBeVisible();
  await page.getByRole('button', { name: 'Load More (1 remaining)' }).click();
  await expect(page.getByRole('heading', { name: 'Plum Clafoutis' })).toBeVisible();
  await page.getByRole('button', { name: 'Main' }).click();
  await expect(page.getByRole('heading', { name: 'Couscous Salad' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Easy Lamb Biryani' })).toBeVisible();
  await page.getByRole('button', { name: 'Vegetarian' }).click();
  await expect(page.getByRole('heading', { name: 'Plum Clafoutis' })).toBeVisible();
  await page.getByRole('button', { name: 'Vegan' }).click();
  await expect(page.getByRole('heading', { name: 'Couscous Salad' })).toBeVisible();
  await page.getByRole('button', { name: 'Desserts' }).click();
  await expect(page.getByRole('heading', { name: 'Plum Clafoutis' })).toBeVisible();
  await page.getByRole('button', { name: 'Breakfast' }).click();
  await expect(page.getByRole('heading', { name: 'Breakfast Recipes' })).toBeVisible();
  await page.locator('#recipes').click();
});