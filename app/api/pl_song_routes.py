from flask import Blueprint, jsonify, request
from ..models import db
from flask_login import current_user
# from app.models.playlist import Playlist
from app.models.playlists_song import playlist_songs
from sqlalchemy import select


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


# Get songs by playlist id
@pl_songs_bp.route('/playlists/<int:playlistId>/songs')
def get_pl_songs(playlistId):
  get_songs = select([playlist_songs.columns.song_id, playlist_songs.columns.playlist_id])

  pl_songs = db.session.execute(get_songs)

  songs_formatted = [
    {
      'song_id': song.song_id,
      'pl_id': song.playlist_id
    }
    for song in pl_songs]

  # print(list(pl_songs), '***********')
  # print(songs_formatted, '***********')

  return jsonify(songs_formatted)
