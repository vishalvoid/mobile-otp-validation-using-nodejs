# Send and verify sms using Node.js Express.js Mongo & Fast2SMS

create `config/config.env` in your project root

```

FAST2SMS_API_KEY=
PORT=
MONGO_URI=

```


## Api endpoint

/api/v1/signup

```
    {
        "phone":"your phone number"
    }
```

/api/v1/verify_otp

```
    {
        "phone":"your phone number",
        "otp":"your otp"
    }

```
