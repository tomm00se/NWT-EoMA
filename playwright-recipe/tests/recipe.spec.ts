import { test, expect } from '@playwright/test';

test('Test expanding recipie tile', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await page.locator('div:nth-child(2) > .recipe-image').click();
  await expect(page.getByText('Easy Lamb Biryani × 🍽️ Easy')).toBeVisible();
  await expect(page.locator('#recipeModal')).toMatchAriaSnapshot(`
    - text: Easy Lamb Biryani
    - button "×"
    - text: 🍽️
    - heading "Easy Lamb Biryani" [level=3]
    - text: /Main ⏱️ \\d+ minutes/
    - heading "Rating" [level=4]
    - text: ★ ★ ★ ★ ★
    - paragraph: A real centrepiece dish that’s surprisingly easy to make. Garnish with pomegranate seeds for a special finish.
    - heading "Ingredients" [level=4]
    - list:
      - listitem: /\\d+\\.\\d+ tbsp Vegetable oil/
      - listitem: /\\d+\\.\\d+ pieces Onions \\(finely sliced\\)/
      - listitem: /\\d+\\.\\d+ ml Greek or natural yoghurt/
      - listitem: /\\d+\\.\\d+ tsp Ginger \\(finely grated\\)/
      - listitem: /\\d+\\.\\d+ tsp Garlic \\(finely grated\\)/
      - listitem: /\\d+\\.\\d+ tsp Kashmiri red chilli powder/
      - listitem: /\\d+\\.\\d+ tsp Ground cumin/
      - listitem: /\\d+\\.\\d+ tsp Ground cardamom seeds/
      - listitem: /\\d+\\.\\d+ tsp Sea salt/
      - listitem: /\\d+\\.\\d+ tbsp Lime \\(juice only\\)/
      - listitem: /\\d+\\.\\d+ tbsp Coriander leaves\\/stalks \\(chopped\\)/
      - listitem: /\\d+\\.\\d+ tbsp Mint leaves \\(chopped\\)/
      - listitem: /\\d+\\.\\d+ tbsp Green chillies \\(chopped\\)/
      - listitem: /\\d+\\.\\d+ g Boneless lamb/
      - listitem: /\\d+\\.\\d+ ml Double cream/
      - listitem: /\\d+\\.\\d+ ml Full-fat milk/
      - listitem: /\\d+\\.\\d+ pinch Saffron strands/
      - listitem: /\\d+\\.\\d+ g Basmati rice/
      - listitem: /\\d+\\.\\d+ tbsp Pomegranate seeds \\(optional garnish\\)/
    - heading "Instructions" [level=4]
    - list:
      - listitem: Fry onions until browned and crispy.
      - listitem: Make marinade with half the onions, yoghurt, spices, and herbs.
      - listitem: Add lamb to marinade and coat well.
      - listitem: Soak rice and cook with saffron milk.
      - listitem: Layer rice, lamb, and herbs in a pot. Bake or steam until cooked through.
    `);
  await expect(page.getByRole('button', { name: '×' })).toBeVisible();
  await page.getByRole('button', { name: '×' }).click();
});

test('Test rate a recipie when not logged in', async ({ page }) => {
  await page.goto('http://localhost/frontend/');

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toBe('Please sign in to rate recipes!');
    dialog.dismiss().catch(() => {});
  });

 await page.locator('div:nth-child(2) > .recipe-info > .recipe-meta > .recipe-rating-container > .star-rating > .stars > span:nth-child(4)').click();

});

test('Test favourite recipe when not logged in', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toBe('Please sign in to favorite recipes!');
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#recipesGrid div').filter({ hasText: 'undefined Main Easy Lamb' }).locator('path').click();
});

test('Test update and verify ratings', async ({ page }) => {
  await page.goto('http://localhost/frontend/');
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('admin@bbc.com');
  await page.locator('#loginPassword').click();
  await page.locator('#loginPassword').fill('bbc123');
  await page.locator('#loginPassword').press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Hello, BBC Admin!' })).toBeVisible();
  await page.locator('div:nth-child(2) > .recipe-info > .recipe-meta > .recipe-rating-container > .star-rating > .stars > span:nth-child(5)').click();
  await expect(page.getByText('Your rating:').nth(1)).toBeVisible();
  await expect(page.getByText('Your rating:').nth(1)).toContainText('Your rating: 5');
  await page.locator('div:nth-child(2) > .recipe-info > .recipe-meta > .recipe-rating-container > .star-rating > .stars > span:nth-child(2)').click();
  await expect(page.getByText('Your rating: 2')).toBeVisible();
});

test('Test favorite and un favorite a recipie ', async ({ page }) => {
  await page.goto('http://localhost/frontend/index.html#');
  await page.locator('#navMenu').getByRole('link', { name: 'Sign In' }).click();
  await page.locator('#loginEmail').click();
  await page.locator('#loginEmail').fill('admin@bbc.com');
  await page.locator('#loginPassword').dblclick();
  await page.locator('#loginPassword').fill('bbc123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#recipesGrid div').filter({ hasText: 'undefined Main Couscous Salad' }).locator('path').click();
  await page.locator('#recipesGrid div').filter({ hasText: 'undefined Main Couscous Salad' }).locator('path').click();
  await expect(page.locator('#recipesGrid')).toMatchAriaSnapshot(`- img`);
  await page.locator('#recipesGrid div').filter({ hasText: 'undefined Main Couscous Salad' }).getByRole('img').click();
  await expect(page.locator('#recipesGrid')).toMatchAriaSnapshot(`- img`);
  await expect(page.locator('div:nth-child(3) > .recipe-image > .heart-icon')).toBeVisible();
  await expect(page.locator('#recipesGrid div').filter({ hasText: 'undefined Healthy Pizza No' }).locator('path')).toBeVisible();
});