[![Checks & Deploy](https://github.com/Br-Dev-Streamers/brdevstreamers-ui/actions/workflows/checks-deploy.yml/badge.svg)](https://github.com/Br-Dev-Streamers/brdevstreamers-ui/actions/workflows/checks-deploy.yml)

# Welcome to BR Dev Streamers 👋

O Br Dev Streamers surgiu com a ideia de agregar todas as pessoas que fazem live coding em português na Twitch.

### 💻 [BR Dev Streamers](https://brstreamers.dev)

## Installation

Install my-project with npm

```bash
  cd my-project
  yarn install
```

```bash
  cp .env.example .env
```

## Usage

```bash
  yarn start
```

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

To start visual tests with Cypress playground:

```bash
  yarn start
  yarn cy:open
```

To run tests in CI:

```bash
  yarn build && yarn test:e2e
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Br-Dev-Streamers/brdevstreamers-ui/issues). You can also take a look at the [contributing guide](https://brstreamers.dev/contribute).

## ✨ Deployment

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

```sh
  docker build -t brdevstreamers-ui .
```

And:

```
  sudo docker run -d -p 80:80 -v "/home/brdevstreamers/letsencrypt:/etc/letsencrypt" --network host --name brdevstreamers-ui brdevstreamers-ui
```

## Contributors

<a href="https://github.com/Br-Dev-Streamers/brdevstreamers-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Br-Dev-Streamers/brdevstreamers-ui" />
</a>
