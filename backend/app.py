import os

from flask import Flask, jsonify, request
from postgrest import APIError
from supabase import Client, create_client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
if not supabase_url or not supabase_key:
    raise RuntimeError("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be configured")

supabase: Client = create_client(supabase_url, supabase_key)


@app.after_request
def enable_cors(response):
    """Allow browser clients from any origin to call this API."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


def database_error(error):
    return jsonify({"error": getattr(error, "message", str(error))}), 500


@app.get("/api/events")
def list_events():
    try:
        response = supabase.table("events").select("*").execute()
        return jsonify(response.data), 200
    except APIError as error:
        return database_error(error)


@app.get("/api/events/<event_id>")
def get_event(event_id):
    try:
        response = (
            supabase.table("events")
            .select("*")
            .eq("id", event_id)
            .limit(1)
            .execute()
        )
        if not response.data:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(response.data[0]), 200
    except APIError as error:
        return database_error(error)


@app.post("/api/registrations")
def create_registration():
    body = request.get_json(silent=True) or {}
    user_id = body.get("user_id")
    event_id = body.get("event_id")
    if not user_id or not event_id:
        return jsonify({"error": "user_id and event_id are required"}), 400

    try:
        event_response = (
            supabase.table("events")
            .select("id, capacity")
            .eq("id", event_id)
            .limit(1)
            .execute()
        )
        if not event_response.data:
            return jsonify({"error": "Event not found"}), 404

        existing_response = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user_id)
            .eq("event_id", event_id)
            .limit(1)
            .execute()
        )
        if existing_response.data:
            return jsonify({"error": "Already registered for this event"}), 409

        capacity = event_response.data[0].get("capacity")
        if capacity is not None:
            registrations_response = (
                supabase.table("registrations")
                .select("id")
                .eq("event_id", event_id)
                .execute()
            )
            if len(registrations_response.data) >= capacity:
                return jsonify({"error": "Event is full"}), 409

        response = (
            supabase.table("registrations")
            .insert({"user_id": user_id, "event_id": event_id})
            .execute()
        )
        registration = response.data[0] if response.data else None
        return jsonify(registration), 201
    except APIError as error:
        # Keep duplicate conflicts correct under concurrent requests too, when
        # the database has a unique constraint for the user/event pair.
        if getattr(error, "code", None) == "23505":
            return jsonify({"error": "Already registered for this event"}), 409
        return database_error(error)


@app.get("/api/me/registrations")
def my_registrations():
    # There is no authentication, so clients identify themselves by supplying
    # user_id. This value is not verified and must not be treated as identity.
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id query parameter is required"}), 400

    try:
        response = (
            supabase.table("registrations")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )
        return jsonify(response.data), 200
    except APIError as error:
        return database_error(error)


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    # The API is intentionally unauthenticated. The screenshot describes this
    # attendee list as organizer-only, but ownership cannot be verified without
    # a trusted identity, so this route is public under the requested policy.
    try:
        response = (
            supabase.table("registrations")
            .select("*, users(id, email, role)")
            .eq("event_id", event_id)
            .execute()
        )
        return jsonify(response.data), 200
    except APIError as error:
        return database_error(error)


@app.get("/")
def index():
    return jsonify({"message": "Events API"}), 200


@app.get("/health")
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=os.environ.get("FLASK_DEBUG", "0").lower() in {"1", "true", "yes"},
    )
