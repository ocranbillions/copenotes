# copenotes
A simple e-mail scheduler with randomized messages that sends random encouraging messages to subscribers

URL: https://copenotes.herokuapp.com/docs

## Setup Requirements
To setup locally, you'll need the following:
> Nodejs (v16 ideally)
>
> Mysql DB
>
> A 2FA Enabled Google Account. This is required when creating an App-Specific Google password. The email sender uses this to authenticate into Google (our email service provider).

## Setup Instructions
1. Clone this repository `git clone https://github.com/ocranbillions/copenotes.git`
2. Install the project `npm install`
3. Create a `.env` file in the root folder `touch .env`
4. Copy and paste the contents in `env.sample` into the `.env` file
5. Replace the values for the variables in the `.env` file with yours
    > If you have mysql installed on your system, login and create a new database `CREATE DATABASE mydatabase;`
    >
    > Next replace the value of `DATABASE_NAME` with `mydatabase` assuming this is your database name
    >
    > Also replace `DATABASE_USERNAME` and `DATABASE_PASSWORD` with your mysql login details
    >
   


## Creating a Google Password for the APP
I have provided a google password below if you'd like to setup quickly. Otherwise you can get your Google App specific password by visiting https://myaccount.google.com/security and follow the screenshots below

Select `App Passwords`
<img width="919" alt="Screenshot 2022-10-06 at 09 06 59" src="https://user-images.githubusercontent.com/20531075/194289273-5d047298-2cd0-4c0a-b5d1-f847f9f90929.png">

Choose `Other (Custom Name)`, enter your preferred app name and click on `Generate`
<img width="652" alt="Screenshot 2022-10-06 at 09 38 44" src="https://user-images.githubusercontent.com/20531075/194289440-6fb86926-1ea1-4a81-b736-4459eafee8b4.png">

Your new app password can be seen in the yellow field
<img width="652" alt="Screenshot 2022-10-06 at 09 11 45" src="https://user-images.githubusercontent.com/20531075/194289498-03904d4b-b483-4942-80a1-54f87229ce7a.png">


## Heroku Hosted MySQL DB (use if unable to setup local db)
```
DATABASE_HOST=us-cdbr-east-06.cleardb.net
DATABASE_NAME=heroku_f301422ce823e1f
DATABASE_USERNAME=b20682167ca73d
DATABASE_PASSWORD=e2199dfe
```

## Google Credentials for nodemailer (use if unable to setup Google App Password)
```
GOOGLE_EMAIL=ocrantestuser007@gmail.com
APP_SPECIFIC_PASSWORD=vremkmaweipfzvpe
```
The MySql and Google credentials above were created to ease your setup, use them if you want to ignore creating your own database and google app password. Note that it will only be available until this project is assessed.




## Running the app.
You can start the app once you have updated the values in the `.env` file with valid credentials
1. First you need to prepare the database. Run `npm run db:migrate` to generate the database tables and seed some sample data.
2. Start the app with `npm start`. This command generates the api documentation which can be accessed at localhost:5000/docs. 
    > Note that you must change hostname in api-service/router.js line 10 and 33 to locahost:5000 to have requests at http://localhost:5000/docs work successfully. Eg https://copenotes.herokuapp.com/subscribe should be changed to http://localhost:5000/subscribe . This should be done before the `npm start` command to enable apiDoc.js regenerate the docs.
3. If you would like to access the endpoint directly without using the docs; send a post request with your `email` to http://localhost:5000/subscribe 
4. If you choose to `npm run dev` server. You'll need to manually run the `generate:apidoc` command in a separate terminal to generate the docs. 


The start command starts the api server and the task scheduler as two separate services. You can choose to start these sevices with separate commands if you so wish. The `dev:server` and `dev:scheduler` commands have been created for this purpose.




