from flask import Blueprint, jsonify, request
from app.models.playlist import Playlist
from ..models import db
from flask_login import current_user


playlist_bp = Blueprint('playlist_bp', __name__)


# Get Playlists
@playlist_bp.route('/playlists/current')
def get_user_playlists():
  userId = current_user.id
  playlists = Playlist.query.filter_by(user_id = userId)
  # playlists = Playlist.query.filter_by(user_id = userId).join()


  user_playlists = [
    {
      'id': list.id,
      'user_id': list.user_id,
      'title': list.title
    }
    for list in playlists]

  # for lst in user_playlists:
  #   print(lst, '******')

  return jsonify(user_playlists)


# Create Playlist
@playlist_bp.route('/playlists/new', methods=['POST'])
def create_playlist():
  title = request.form.get('title')
  userId = request.form.get('user_id')

  new_playlist = Playlist(title=title, user_id=userId)

  db.session.add(new_playlist)
  db.session.commit()

  return jsonify(new_playlist)
