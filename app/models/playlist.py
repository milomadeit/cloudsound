from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import UserMixin
from playlists_song import playlistsongs

class Playlist(db.Model):
	__tablename__ = 'playlists'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(60), nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey(User.id))

	user = db.relationship('User', back_populates='playlists')
	songs = db.relationship('Song', secondary=playlistsongs, back_populates="playlists")