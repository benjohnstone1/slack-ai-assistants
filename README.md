# slack-ai-assistants

## Create Slack App

Sign up for dev account, provision sandbox
https://api.slack.com/docs/developer-sandbox

Create new app https://api.slack.com/apps

Add Oauth permissions to app
Subscribe to events and make sure your request URL matches your app (e.g. ngrok webhook)

## Env variables

cp .env.example .env add environment variables

## Run app

npm install
npm run dev
(optionally) ngrok
