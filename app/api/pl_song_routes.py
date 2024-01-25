from flask import Blueprint, jsonify, request
from ..models import db
from flask_login import current_user
# from app.models.playlist import Playlist
from app.models.playlists_song import playlist_song


pl_songs_bp = Blueprint('pl_songs_bp', __name__)


# Add Song to Playlist
@pl_songs_bp.route('idk yet...')
def add_pl_song():
  # playlists = Playlist.query.filter_by(user_id = userId)

  return jsonify('hello')
