from flask import Blueprint

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('/comment-test')
def tester():
  return 'hello from comment-test route'
