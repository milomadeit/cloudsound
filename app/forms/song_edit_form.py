from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired, DataRequired
from wtforms import SubmitField, StringField
from ..api.s3buckets import ALLOWED_EXTENSIONS

class SongEditForm(FlaskForm):
    song = FileField("Song File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")