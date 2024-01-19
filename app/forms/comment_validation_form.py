from flask_wtf import FlaskForm
from flask_wtf.file import DataRequired
from wtforms import SubmitField, StringField


class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    submit = SubmitField("Create Comment")
    
