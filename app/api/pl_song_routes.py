from flask import Blueprint, jsonify, request
from ..models import db
# from flask_login import current_user
from app.models import Song, Playlist
from sqlalchemy import select, delete


pl_songs_bp = Blueprint('pl_songs_bp', __name__)


# Add Song to Playlist
@pl_songs_bp.route('/playlists/<int:playlistId>/add', methods=['POST'])
def add_pl_song(playlistId):
  songId = request.form.get('songId')
  playlistId = request.form.get('playlistId')

  song = Song.query.get(songId)
  playlist = Playlist.query.get(playlistId)

  if song and playlist:
        playlist.songs.append(song)
        db.session.commit()
        return jsonify('Song added to Playlist!')
  else:
        return jsonify('Song or Playlist not found'), 404



# Get songs by playlist id
@pl_songs_bp.route('/playlists/<int:playlistId>/songs')
def get_pl_songs(playlistId):
  playlist = Playlist.query.get(playlistId)

  if playlist:
        songs_formatted = [{'song_id': song.id, 'pl_id': playlistId} for song in playlist.songs]
        return jsonify(songs_formatted)
  else:
        return jsonify('Playlist not found'), 404


# Remove a song from playlist
@pl_songs_bp.route('/playlists/<int:playlistId>/songs/<int:songId>', methods=['DELETE'])
def remove_song_from_playlist(playlistId, songId):
  playlist = Playlist.query.get(playlistId)
  song = Song.query.get(songId)

  if song and playlist:
        playlist.songs.remove(song)
        db.session.commit()
        return jsonify('Song removed from Playlist!')
  else:
        return jsonify('Song or Playlist not found'), 404