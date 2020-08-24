# IAM module

This is an IAM module.

## Available APIs

## SET Content-Type : application/json

### User APIs

#### POST `/api/v1/signup`

You can do a POST to `/api/v1/signup` to create a new user.

The body must have:

* `name`: The name
* `password`: The password
* `user_role`: OR["Student","Industry","Professional,"Founder","Recruiter","Fresher"],


It returns the following:

```json
{
    "user_id": "...",
    "token": "...",
    "message": "verification mail sent to ..."
}
```
![example](https://res.cloudinary.com/angelchristian/image/upload/v1597317752/mail_f4a287.png)


#### POST `/api/v1/signup/confirmation`

You can do a POST to `/api/v1/signup/confirmation` to confirm your email(link and code for this will be in mail) .

The body must have:

* `email`: The email
* `code`: The verification code sent in mail

It returns the following:
 on success:
```json
{
    "message":"The account has been verified. Please log in."
}
```
on failure:
appropriate error

#### POST `/api/v1/signup/resend`

You can do a POST to `/api/v1/signup/resend` to get the code again on mail for verification.

The body must have:

* `email`: The email


It returns the following:

```json
{
    "user_id": "...",
    "message": "verification mail sent to ..."
}
```


#### GET `/debug-sentry`

You can do a GET to `/debug-sentry` to test your sentry error tracking is working.

It reports the following in your sentry console:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1597318199/sentry_pwvi24.png)

#### POST `/api/v1/login`

You can do a POST to `/api/v1/login` to create a new user.

The body must have:

* `email`: The email
* `password`: The password

It returns the following:

```json
{
    "user_id": "...",
    "token": "...",
    "user_role": "...",
    "user_status": "..."
}
```


## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).

If you want to run it on another port, just run `PORT=3000 node index.js` to run it on port 3000 

## Testing it

Just run `npm test`


## Author

[Angel Christian](https://github.com/AngelChristian)

## Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing


[![Run NodeJS JWT Authentication in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c57ddc507592c436662c)