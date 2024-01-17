from flask import Blueprint
from app.models.comment import Comment

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('/comments-test')
def tester():
  data = Comment.query.all()
  return data
