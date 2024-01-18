from flask import Blueprint, jsonify
from app.models.comment import Comment

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('/comments-test')
def tester():
  comments = Comment.query.all()
  song_comments = [
    {
      'id': comment.id,
      'user_id': comment.user_id,
      'content': comment.content
    }
    for comment in comments]

  return jsonify(song_comments)
