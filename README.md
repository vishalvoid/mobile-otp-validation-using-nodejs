# Send and verify sms using Expressjs and Mongodb

create `.env` in your project root

```

FAST2SMS_API_KEY=
PORT=
MONGO_URI=

```


## Api endpoint

/api/auth/signup

```
    {
        "phone":"your phone number"
    }
```

/api/auth/verify_otp

```
    {
        "phone":"your phone number",
        "otp":"your otp"
    }

```