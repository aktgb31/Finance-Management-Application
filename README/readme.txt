Finance-Management-Application 
- A web application to keep track of personal expenses to promote financial planning.

Running the application
    1. Setting up the database
        1.1. Install MySQL as per your operating system from `https://www.mysql.com/downloads/` and start the server.
        1.2. Login to MySQL as root user.
        1.3. Create a database named 'finance'.
                SQL Command: `CREATE DATABASE finance;`
        1.4. Create a user with name and password as per your choice.
                SQL Command: `CREATE USER 'finance'@'localhost' IDENTIFIED BY 'finance';`
        1.5. Grant all privileges to the user 'finance' on the database 'finance'.
                SQL Command: `GRANT ALL PRIVILEGES ON finance.* TO 'finance'@'localhost' WITH GRANT OPTION;`
        1.6. Flush the privileges.
                SQL Command: `FLUSH PRIVILEGES;`
        1.7. Exit MySQL.

    2. Get the twilio credentials

        2.1. Go to https://signup.sendgrid.com/ and create an account.
        2.2. Go to ->Settings->API Keys->Create API Key.
        2.3. Go to ->Guide->Add Sender identity.
        2.4. Set the value of the MAIL_API_KEY environment variable to be the API key created in step 2 .

    3. Setting up the server
        3.1. Install Nodejs with version >=15 as per your operating system from `https://nodejs.org/en/download/`.
        3.2. Navigate to the `CODE` directory.
        3.3. Install the dependencies.
                Command: `npm install`
        3.4. Create a `.env` file with following details
                - NODE_ENV          set to "development" for development mode or "production" for production mode
                - PORT              The port on which server is to be started
                - DATABASE_URI      The MYSQL database url
                - DATABASE_NAME     The MYSQL database name
                - DATABASE_USER     Database User Name
                - DATABASE_PASS     Database User password
                - ENCRYPTION_KEY    Key to encrypt messages
                - ENCRYPTION_SALT   Key to salt messages
                - SESSION_SECRET    Key to encrypt sessions
                - MAIL_API_KEY      Twilio api key
        3.5. Start the server.
                Command: `npm start`

    4. Accessing the website 
        The website is accessible at `http://localhost:3000` if the server is started on localhost and port 3000.

Other details
- In `development` mode, email-service is disabled and there is heavy logging enabled to console.
- In `production` mode, email-service is enabled, there is almost no logging enabled and the logs are generated in `logs/`.
- `start.js` is the entry point of the application.
- The homepage is accessible at `http://localhost:3000` if the server is started on localhost and port 3000.

Backing up the database
    1. Navigate to the `CODE` directory.
    2. Run the following command to backup the database.
            Command: `npm run backup`
    3. The backup file is generated in `CODE/backups/` directory.

Note: The application is developed and tested on Ubuntu 20.04.1 LTS. It is not tested on other operating systems. Some changes might be required to run the application on other operating systems.