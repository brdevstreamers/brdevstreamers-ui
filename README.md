# Br Dev Steamers

![Preview](/public/preview.png)

The main purpose of this project is giving visibility to Brazilian Developers that stream in Twitch.

## Requirements

[] Node > 12.7 (I think.. 👀)

[] Happyness 🙂

## How to run?

Create a `.env` file with the following content:

```
REACT_APP_API_URL=https://brstreamers.dev:8000 # You can use our production server 🖥
REACT_APP_GA_ID="" # This is a Google Analytics Tracking code. You can keep it empty
```

Then you can run:

### `yarn install`

And:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Testing

To start visual tests with Cypress playground:

```
yarn start
yarn cy:open
```

To run tests in CI:

```
yarn build && yarn test:e2e
```

## Production Deployment

There is a Dockerfile that already serves an NGINX with SSL.

You can simply, edit the `nginx.conf` file to match your domain:

```
server {
    listen              443 ssl;
    server_name         brstreamers.dev;
    ssl_certificate     /etc/letsencrypt/live/brstreamers.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/brstreamers.dev/privkey.pem;
    location / {
        root   /usr/share/nginx/html;
        try_files $uri $uri/ /index.html =404;
    }
}
```

Then:

### `docker build -t brdevstreamers-ui .`

And:

### `sudo docker run -d -p 80:80 -v "/home/brdevstreamers/letsencrypt:/etc/letsencrypt" --network host --name brdevstreamers-ui brdevstreamers-ui`
