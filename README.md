# Recipe Web App - EoMA Group A

This is our recipe web app project for our Networks and Web Technology module. It's a full-stack application where users can search for recipes, rate them, save favorites, and manage their accounts.

## What it does

### For Users
- Sign up and log in to your account
- Browse through a collection of recipes
- Search for recipes by name, ingredients, or description
- Filter recipes by category (like vegetarian, vegan, desserts, etc.)
- Rate recipes with 1-5 stars
- Save your favorite recipes
- Set your dietary preferences

### Technical
- Built with PHP backend and vanilla JavaScript frontend
- Uses MySQL database to store everything
- Works on both mobile and desktop
- Real-time search as you type
- Pagination for browsing lots of recipes

## What you need to run this

- **XAMPP** - for Apache, MySQL, and PHP
- **MySQL Workbench** - to manage the database
- **A modern browser** (Chrome works best)
- **Insomnia** (optional) - for testing the API

## How to set it up

### Step 1: Get XAMPP running

1. **Download XAMPP** from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. **Install it** on your computer
3. **Start XAMPP Control Panel**
4. **Click "Start"** for both Apache and MySQL
5. Make sure both show green status (means they're running)

### Step 2: Put the project in the right place

- Copy the entire project folder to: `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/xamppfiles/htdocs/` (Mac)
- You should be able to access it at `http://localhost/frontend` in your browser

### Step 3: Set up the database

1. **Open MySQL Workbench**
2. **Connect to your local server**:
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: (leave blank - that's the default)

3. **Create the database**:
   - Right-click in the schemas panel
   - Create new schema called `recipe_app_group_a`

4. **Import the data**:
   - Go to Server → Data Import
   - Choose "Import from Self-Contained File"
   - Select `DB/populated_database_EOM.sql`
   - Set the default schema to `recipe_app_group_a`
   - Click "Start Import"
   - The database uses the utf8mb4_bin collation for strict binary comparison and full Unicode support.

5. **Check it worked** - you should see tables like `users`, `recipes`, `categories`, etc.

### Step 4: Configure the backend

1. **Open** `backend/.env`
2. **Check the database settings** (they should work with default XAMPP):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=recipe_app_group_a
   ```

### Step 5: Test it out

1. **Open your browser** and go to `http://localhost/frontend`
2. **Try registering** a new account
3. **Browse some recipes** and test the search
4. **Try rating and favoriting** some recipes

## API endpoints

### Users
- `POST /users/registration/` - Sign up
- `POST /users/login/` - Log in
- `POST /users/logout/` - Log out

### Recipes
- `GET /recipes/getAll` - Get all recipes
- `GET /recipes/getById?id={id}` - Get one recipe
- `GET /recipes/getByName?name={name}` - Search by name
- `GET /recipes/getFull?id={id}` - Get full recipe details

### Ratings & Favorites
- `POST /ratings/rate/` - Rate a recipe
- `GET /ratings/getByRecipe/?recipe_id={id}` - Get ratings
- `POST /favourites/add/` - Add to favorites
- `POST /favourites/remove/` - Remove from favorites
- `GET /favourites/getMy/` - Get my favorites

## Sample recipes included

We've got 7 BBC Food recipes in the database:
- Couscous Salad
- Easy Lamb Biryani
- Healthy Pizza
- Mango Pie
- Mushroom Doner
- Vegan Pancakes
- Plum clafoutis

## Playwright + Typescript UI Automation

### Setup
1. Go to https://nodejs.org/
2. Download the LTS version and run the installer.
3. Confirm install via Command Prompt:
   ```
   node -v
   npm -v
   ```
4. Go to playwright-recipe
5. Go to the command prompt and run the following
   - npm init -y
   - npx playwright install
   - npm install -D typescript ts-node @types/node
   - npx playwright init - Select TypeScript when prompted.

### Run Test
1. To test Chrome run the following: npx playwright test --project=chromium
2. To test Firefox run the following: npx playwright test --project=webkit
3. Run All results

### View Results
1. Run the following command: npx playwright show-report


## Future improvements (if we had more time)

- Better email validation
- Password reset functionality
- More search filters (cooking time, difficulty)
- Recipe sharing features
- User profile page (Name, Biography, Favourite Dish)
- Instagram style feed that shows recipes a user has made and uploaded photos of
- Rate limiting and security improvements
- Migration to using a modern tech stack - MongoDB + React/Next.JS Framework for hybrid (server/client side rendering)
- Our front end was very repetitive. Using React Components, reusability and readability would be improved dramatically.

## Disclaimer

This project was developed for educational purposes as part of a university assignment. Images used within this recipe web app are sourced from various external websites and are not owned by the project author. All images remain the property of their respective owners. The use of these images is intended strictly for non-commercial, educational, and illustrative purposes under the principles of fair use. If you are a copyright holder and believe your image has been used improperly, please contact the University of Liverpool so that it can be removed or properly credited.
