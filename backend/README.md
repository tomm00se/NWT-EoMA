# Recipe App

- Turn on XAMPP
- Configure the environment variables
- Download Insomnia and import either the yaml or har to make tests.
- Config -> Contains the DB Configuration
- Controllers -> Logic and Validations about the app
- Models -> SQLs and Database Connection
- Public/api -> Routes

Based on the Potential User Stories the following features were included:

- Registration
- Login
- Logout
- Recipe Retrieval Partial by Id
- Recipe Retrieval by Name
- Recipe Retrieval Full by Id
- Recipe Retrieval All
- Add Rate to Recipe
- Get Rates by Recipe
- Add Favourite Recipe
- Remove Favourite Recipe
- Get Favourite Recipes

Edge cases were not considered on this first sprint, but can be implemented on next week. Things like rate limit, csrf token, generic email validation, and forgot password were not implemented. Also, user information retrieval can be implemented on next week. 

Sorting and Ordering of Recipes can be executed on the front end.

Create a .env file on the root:
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=recipe_app_group_a
