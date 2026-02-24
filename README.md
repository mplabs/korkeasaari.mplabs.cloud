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

### With docker compose

Edit the build args in `docker-compose.yml`, then:

```sh
docker compose up -d --build
```

The site will be available on port `8080`.

### With docker build

```sh
docker build \
  --build-arg VITE_LAST_VISIT=2025-07-12 \
  --build-arg VITE_NEXT_VISIT=2026-07-11 \
  --build-arg VITE_DESTINATION=Korkeasaari \
  -t island-timer .

docker run -d -p 8080:80 island-timer
```

To update the dates, rebuild the image with new `--build-arg` values.

## CI/CD

A GitHub Actions workflow builds and pushes the image to `ghcr.io` on every push to `main`. It can also be triggered manually via `workflow_dispatch`.

The vacation dates are read from **GitHub repository variables** (Settings > Variables > Actions). If not set, the defaults from `.env.example` are used.

| Variable | Default |
|---|---|
| `VITE_LAST_VISIT` | `2025-07-12` |
| `VITE_NEXT_VISIT` | `2026-07-11` |
| `VITE_DESTINATION` | `Korkeasaari` |

To pull the image on your server:

```sh
docker pull ghcr.io/mplabs/korkeasaari.mplabs.cloud:latest
```
