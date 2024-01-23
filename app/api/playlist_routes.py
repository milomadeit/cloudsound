from flask import Blueprint, jsonify, request
from app.models.playlist import Playlist
from ..models import db
from flask_login import current_user


playlist_bp = Blueprint('playlist_bp', __name__)


# Get Playlists
# @playlist_bp.route('/playlists')


# Create Playlist
@playlist_bp.route('/playlists/new', methods=['POST'])
def create_playlist():
  title = request.form.get('title')
  userId = request.form.get('user_id')

  new_playlist = Playlist(title=title, user_id=userId)

  db.session.add(new_playlist)
  db.session.commit()

  return jsonify('Playlist created!')
