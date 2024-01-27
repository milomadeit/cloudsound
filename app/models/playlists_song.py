from .db import db, environment, SCHEMA, add_prefix_for_prod
from .song import Song
from .playlist import Playlist

__tablename__ = ""

__tablename__ = "playlistsongs"
if environment == "production":
    __tablename__ = f"{SCHEMA}.playlist_songs"
    __table_args__ = {'schema': SCHEMA}


# Should handle many to many relationship and create a join table
playlistsongs = db.Table(
    __tablename__,
    db.metadata,
    db.Column("song_id", db.ForeignKey(Song.id), primary_key=True),
    db.Column("playlist_id", db.ForeignKey(Playlist.id), primary_key=True))
