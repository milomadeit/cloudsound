from flask import Blueprint, jsonify
from app.models.like import Like


likes_bp = Blueprint('likes_bp', __name__)


# Get Likes
@likes_bp.route('songs/<int:songId>/likes')
def get_likes_by_song_id(songId):
  likes = Like.query.filter(Like.song_id == songId)

  # get count
  # likes = Like.query.filter(Like.song_id == songId).count()

  song_likes = [
    {
      'id': like.id,
      'user_id': like.user_id,
      'song_id': like.song_id
    }
  for like in likes]

  return jsonify(song_likes)


# Create Like
@likes_bp.route('songs/<int:songId>/likes/new', methods=['POST'])
def create_like(songId):
  # song = ...


  # if song:
  #   return 'added like'


  # else:
  #   return 'song not found'

  return 'added like'


# Delete Like
@likes_bp.route('songs/<int:songId>/likes/delete')
def delete_like(likeId):
  # song = ...


  # if song:
  #   return 'added like'


  # else:
  #   return 'song not found'

  return 'added like'
