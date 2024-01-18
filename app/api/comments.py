from flask import Blueprint, jsonify
from app.models.comment import Comment

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('/<int:track_id>/comments')
def get_comments_by_track_id(track_id):
  comments = Comment.query.all()
  # comments = Comment.query.filter(Comment.song_id == track_id)
  track_comments = [
    {
      'id': comment.id,
      'user_id': comment.user_id,
      'content': comment.content
    }
    for comment in comments]

  return jsonify(track_comments)
