# Triply - Backend

## Setup

1. Clone the repository: `git clone <backend-repo-link>`
2. Navigate to the project directory: `cd triply-api`
3. Install dependencies: `npm install`
4. Duplicate the `.env.sample` file and edit the file name to be `.env`
5. Edit the environment variables in `.env` accordingly:
    1. `PORT=8080`
    2. `DB_HOST=127.0.0.1`
    3. `DB_NAME=<database name>`
    4. `DB_USER=<database user>`
    5. `DB_PASSWORD=<database password>`
    6. `CORS_ORIGIN=http://localhost:<frontend port number>`
        - Ensure no spaces
6. Start the server: `npm run dev`
7. Migrate the tables to the new database: `npm run migrate`
8. Populate the tables in the new database: `npm run seed`
9. Follow the `README` instructions for the frontend `triply`
