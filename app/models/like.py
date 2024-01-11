from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .song import Song

class Like(db.Model):
	__tablename__ = 'likes'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
	song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)

	user = db.relationship('User', back_populates='likes') # not actually fields on the table but sqlalchemy will create
	song = db.relationship('Song', back_populates='likes') # a user or song object with info related to the like.