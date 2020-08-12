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

## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).

If you want to run it on another port, just run `PORT=3000 node index.js` to run it on port 3000 


## Author

[Angel Christian](https://github.com/AngelChristian)

## Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing

Here is a [small collection](https://documenter.getpostman.com/view/3232248/auth0-nodejs-jwt-auth/7LnAi4o) to highlight the features of this sample API.

[![Run NodeJS JWT Authentication in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c57ddc507592c436662c)