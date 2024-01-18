from flask import Blueprint
from app.forms.comment_validation_form import CommentForm
from app.models.comment import Comment
from app.models.db import db
from flask_login import current_user

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('/comment-test')
def tester():
  return 'hello from comment-test route'

@comments_bp.route("/songs/<int:id>/comments")
def get_comment_form():
  form=CommentForm()
  return

@comments_bp.route("/songs/<int:id>/comments", methods=['POST'])
def post_comment(id):
  form=CommentForm()
  if current_user:
      if form.validate_on_submit():
          comment=form.comment.data

          new_comment=Comment(user_id=current_user.id,song_id={id},comment=comment)

          db.session.add(new_comment)
          db.session.commit()
          return redirect("/")
  return "Bad Data"
