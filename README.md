# Island Timer

A minimal countdown/countup page that shows the days since your last island visit and the days until the next one, with a visual progress bar.

Built with **Vite** and **Tailwind CSS v4**.

## Configuration

Copy the example env file and set your dates:

```sh
cp .env.example .env
```

| Variable | Description | Example |
|---|---|---|
| `VITE_LAST_VISIT` | Date of the last visit (ISO format) | `2025-07-12` |
| `VITE_NEXT_VISIT` | Date of the next visit (ISO format) | `2026-07-11` |
| `VITE_DESTINATION` | Name shown in the header | `Korkeasaari` |

Values are embedded at build time, so a rebuild is needed after changes.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

The output in `dist/` uses relative asset paths and works behind any reverse proxy base path without extra configuration.

## Preview

```sh
npm run preview
```

## Docker

The vacation dates are configured via **environment variables** at container start — no rebuild needed.

| Variable | Default | Description |
|---|---|---|
| `LAST_VISIT` | `2025-07-12` | Date of the last visit |
| `NEXT_VISIT` | `2026-07-11` | Date of the next visit |
| `DESTINATION` | `Korkeasaari` | Name shown in the header |

### With docker compose

```sh
docker compose up -d
```

Edit the `environment` section in `docker-compose.yml` to change the dates. Restart the container to apply.

### With docker run

```sh
docker run -d -p 8080:80 \
  -e LAST_VISIT=2025-07-12 \
  -e NEXT_VISIT=2026-07-11 \
  -e DESTINATION=Korkeasaari \
  ghcr.io/mplabs/korkeasaari.mplabs.cloud:latest
```

### Build locally

```sh
docker build -t island-timer .
docker run -d -p 8080:80 -e LAST_VISIT=2025-07-12 island-timer
```

## CI/CD

A GitHub Actions workflow builds and pushes the image to `ghcr.io` on every push to `main`. It can also be triggered manually via `workflow_dispatch`.

```sh
docker pull ghcr.io/mplabs/korkeasaari.mplabs.cloud:latest
```
