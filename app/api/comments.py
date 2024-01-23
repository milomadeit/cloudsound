from flask import Blueprint, jsonify,request,redirect
from app.models.comment import Comment
from app.models.db import db
from app.forms.comment_validation_form import CommentForm
from flask_login import current_user
from sqlalchemy import desc

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

@comments_bp.route("/tracks/<int:id>/comments")
def get_comment_form(id):
  form=CommentForm()
  print(form)
  return {"form":form.comment}

@comments_bp.route("/tracks/<int:id>/comments", methods=['POST'])
def post_comment(id):
  form=CommentForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user:

      if form.validate_on_submit():



          comment=form.data.get("comment")

          new_comment=Comment(user_id=current_user.id,song_id=id,content=comment)

          db.session.add(new_comment)
          db.session.commit()
         

          res_comment={
            "id":new_comment.id,
            "content":comment,
            "user_id":current_user.id
          }


          return jsonify(res_comment)


      if form.errors:
          return jsonify(form.errors)
  return jsonify("Login please")
