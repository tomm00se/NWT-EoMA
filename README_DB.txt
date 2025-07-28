How to Import the Database

Open MySQL Workbench.

Go to the menu and select Server > Data Import.

Choose the option Import from Self-Contained File.

Select the file dump_updated.sql.

Under Default Schema to be Imported To, select your schema (e.g., recipe_app_group_a) or create a new one with that name.

Click Start Import.

Notes:

This SQL dump uses the utf8mb4_general_ci collation for full compatibility with MariaDB (used by XAMPP).

The database includes the full schema and sample data for all six required BBC recipes.

Foreign keys use ON DELETE CASCADE where appropriate to preserve referential integrity.

Access

This dump assumes a local setup (e.g., XAMPP or standalone MySQL/MariaDB server):
Host: localhost
Port: 3306
Username: root
Password: (leave blank)

If your server uses different credentials, adjust them in MySQL Workbench before importing.