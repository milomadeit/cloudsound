from flask import Blueprint, jsonify, request
from ..models import db
from flask_login import current_user
# from app.models.playlist import Playlist
from app.models.playlists_song import playlist_songs


pl_songs_bp = Blueprint('pl_songs_bp', __name__)


# Add Song to Playlist
@pl_songs_bp.route('/playlists/<int:playlistId>/add', methods=['POST'])
def add_pl_song(playlistId):
  songId = request.form.get('songId')
  playlistId = request.form.get('playlistId')

  add_song = playlist_songs.insert().values(song_id=songId, playlist_id=playlistId)

  db.session.execute(add_song)
  db.session.commit()

  return jsonify('Song added to Playlist!')
