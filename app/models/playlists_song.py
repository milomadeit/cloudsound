from .db import db, environment, SCHEMA, add_prefix_for_prod
from .song import Song
from .playlist import Playlist



from .playlist import Playlist
from .song import Song

# Should handle many to many relationship and create a join table

playlist_song = db.Table(
    "playlist_songs",
    db.metadata,
    db.Column("song_id", db.ForeignKey(Song.id), primary_key=True),
    db.Column("playlist_id", db.ForeignKey(Playlist.id), primary_key=True))