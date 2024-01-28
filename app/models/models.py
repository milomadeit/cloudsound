from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    songs = db.relationship('Song', back_populates='user', cascade="all, delete-orphan") # not actually columns in our table, sqlalchemy creates
    playlists = db.relationship("Playlist", back_populates='user', cascade="all, delete-orphan") # objects with relevant info based on the relationship
    likes = db.relationship('Like', back_populates='user', cascade="all, delete-orphan") # without having make additional queries
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Song(db.Model):
	__tablename__ = 'songs'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer(), primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)))  # references users id column
	title = db.Column(db.String(50), nullable=False)
	artist = db.Column(db.String(50), nullable=False)
	genre = db.Column(db.String())
	song_url = db.Column(db.String(), nullable=False)
	likes = db.Column(db.Integer, default=0)
	play_count = db.Column(db.Integer(), default=0)
	image_url = db.Column(db.String())

	user = db.relationship('User', back_populates='songs')
	playlists = db.relationship('Playlist', secondary='playlistsongs', back_populates='songs')
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

class Playlist(db.Model):
	__tablename__ = 'playlists'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(60), nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)))

	user = db.relationship('User', back_populates='playlists')
	songs = db.relationship('Song', secondary='playlistsongs', back_populates="playlists")


playlistsongs = db.Table(
    'playlistsongs',
    db.metadata,
    db.Column("song_id", db.ForeignKey(Song.id), primary_key=True),
    db.Column("playlist_id", db.ForeignKey(Playlist.id), primary_key=True)
)

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(Song.id)))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)))
    content = db.Column(db.String(100), nullable=False)


    user = db.relationship('User', back_populates='comments')
    song = db.relationship('Song', back_populates='comments')


class Like(db.Model):
	__tablename__ = 'likes'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)), nullable=False)
	song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(Song.id)), nullable=False)

	user = db.relationship('User', back_populates='likes') # not actually fields on the table but sqlalchemy will create
	song = db.relationship('Song', back_populates='likes_relationship') # a user or song object with info related to the like.

	def to_dict(self):
		return {
			'id': self.id,
			'user_id': self.user_id,
			'song_id': self.song_id
		}
