from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import declarative_base, relationship
from .user import User

class Song(db.Model):
	__tablename__ = 'songs'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer(), primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey(User.id))  # references users id column
	title = db.Column(db.String(50), nullable=False)
	artist = db.Column(db.String(50), nullable=False)
	genre = db.Column(db.String())
	song_url = db.Column(db.String(), nullable=False)
	likes = db.Column(db.Integer, default=0)
	play_count = db.Column(db.Integer(), default=0)
	image_url = db.Column(db.String())

	user = db.relationship('User', back_populates='songs')
	playlists = db.relationship('Playlist', secondary="playlist_songs", back_populates='songs')
	likes_relationship = db.relationship('Like', back_populates='song', cascade="all, delete-orphan")
	comments=db.relationship("Comment", back_populates="song",  cascade="all, delete-orphan")



	def to_dict(self):
		return {
			'id': self.id,
			'user_id': self.user_id,
			'title': self.title,
			'artist': self.artist,
			'genre': self.genre,
			'song_url': self.song_url,
			'likes': self.likes
		}
