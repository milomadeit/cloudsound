from flask import Blueprint, jsonify
from app.models.comment import Comment
from app.models.user import User
from ..models import db

comments_bp = Blueprint('comments_bp', __name__)


# Get Comments
@comments_bp.route('tracks/<int:track_id>/comments')
def get_comments_by_track_id(track_id):
  comments = Comment.query.filter(Comment.song_id == track_id)

  track_comments = [
    {
      'id': comment.id,
      'user_id': comment.user_id,
      'content': comment.content
    }
    for comment in comments]

  for comment in track_comments:
    user = User.query.get(comment['user_id'])
    comment['author'] = user.username

  return jsonify(track_comments)


# Edit Comment
@comments_bp.route('/tracks/<int:track_id>/comments/<int:comment_id>', methods=['PUT'])
def edit_comment(comment_id):
  comment = Comment.query.get(comment_id)

  # do stuff..
  # comment.content = 'updated content'
  # db.session.commit()

  return 'Comment successfully updated.'
