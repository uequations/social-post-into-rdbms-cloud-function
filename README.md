# social-post-into-rdbms-cloud-function

## test function endpoint locally
```shell script
curl --location --request POST "localhost:9000/socialPost" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --data "strange=boom"
```

## test function endpoint on Netlify
```shell script
curl --location --request POST "https://*.netlify.app/.netlify/functions/socialPost" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --data "strange=boom"
```
