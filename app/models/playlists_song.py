from .db import db, environment, SCHEMA, add_prefix_for_prod
from .song import Song
from .playlist import Playlist

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


table_name = "playlist_songs"
if environment == "production":
    table_name = f"{SCHEMA}.playlist_songs"


# Should handle many to many relationship and create a join table
playlist_songs = db.Table(
    table_name,
    db.metadata,
    db.Column("song_id", db.ForeignKey(Song.id), primary_key=True),
    db.Column("playlist_id", db.ForeignKey(Playlist.id), primary_key=True))
