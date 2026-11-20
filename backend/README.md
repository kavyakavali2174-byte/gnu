# Events API backend

Flask API backed by Supabase. It reads the `events`, `registrations`, and `users` tables.

## Setup

1. Create and activate a virtual environment.

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install the pinned dependencies.

   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and fill in `SUPABASE_URL` and
   `SUPABASE_PUBLISHABLE_KEY` from your Supabase project settings.

4. Start the backend.

   ```bash
   python app.py
   ```

The API listens on `http://localhost:5000` by default. Set `HOST`, `PORT`, and
`FLASK_DEBUG` in the environment to change the server settings. Debug mode is
off by default.

## Deploy to Render

This folder includes `render.yaml` for a Render Blueprint deployment. Push the
folder to a Git repository, create a Blueprint in Render from that repository,
and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` when prompted. The
Blueprint installs `requirements.txt` and starts the Flask app with Gunicorn;
Render supplies the listening port. `/health` is configured as the health
check endpoint.

You can also create a Web Service manually with the Python runtime, build
command `pip install -r requirements.txt`, and start command
`gunicorn app:app --bind 0.0.0.0:$PORT`. The `.python-version` file selects
Python 3.14.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/events` | List events |
| GET | `/api/events/<event_id>` | Get one event |
| POST | `/api/registrations` | Create a registration; JSON body requires `user_id` and `event_id` |
| GET | `/api/me/registrations?user_id=<user_id>` | List registrations for a supplied user ID |
| GET | `/api/events/<event_id>/registrations` | List registrations and attendee user details |

The API has no authentication or authorization. CORS allows requests from any
origin. The `user_id` passed to the `/api/me` route is not verified, and the
attendee list is public. Supabase's publishable key and database permissions
still govern which database operations succeed.

## Supabase table shape

The app expects the schema shown in
`.agents/skills/screenshot/database.png` (the API route list is in
`.agents/skills/screenshot/api.jpeg`):

- `events`: `id`, `organizer_id`, `title`, `capacity`, `status`
- `registrations`: `id`, `user_id`, `event_id`, `created_at`
- `users`: `id`, `email`, `role`

The attendee endpoint uses the foreign key relationship from
`registrations.user_id` to `users.id`. The Supabase Data API must expose these
tables, and its grants and RLS policies must allow the intended requests.
