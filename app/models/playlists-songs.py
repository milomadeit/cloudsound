from .db import db, environment, SCHEMA, add_prefix_for_prod



from .playlists import Playlist
from .songs import Song

# class PlaylistSong(db.Model):
#     __tablename__ = 'playlist_songs'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
        
#     id = db.Column(db.Integer, primary_key=True)
#     song_id = db.Column(db.Integer, nullable=False)
#     playlist_id = db.Column(db.Integer, nullable=False)
#     playlist = db.relationship("Playlist", back_populates="playlist_songs")


# Should handle many to many relationship and create a join table

playlist_song = db.Table(
    "playlist_songs",
    db.metadata,
    db.Column("song_id", db.ForeignKey("songs.id"), primary_key=True),
    db.Column("playlist_id", db.ForeignKey("playlists.id"), primary_key=True))