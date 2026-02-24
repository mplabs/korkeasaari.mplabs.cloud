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
