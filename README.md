# Node JWT Authentication using Mongo and Express

* Clone the repo to your local system
* run `npm install`
* To create `ACCESS_TOKEN_SECRET` token for use the below to generate random token.
```javascript
    require('crypto').randomBytes(256).toString('hex')
```
* Create a similar token for `REFRESH_TOKEN_SECRET`
* Store both `ACCESS_TOKEN_SECRET` & `REFRESH_TOKEN_SECRET` in the .env file in project root directory.
* Start your mongo server locally at port 27017
* run scripts :
    * `npm run devStartServer` to start application server
    * `npm run devStartAuthServer` to start auth server