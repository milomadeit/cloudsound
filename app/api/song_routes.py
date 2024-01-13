from flask import Blueprint, jsonify
from ..forms.song_validation_form import SongForm
from .s3buckets import get_unique_filename, upload_file_to_s3, remove_file_from_s3

song_routes = Blueprint('songs', __name__)

@song_routes.route('/upload/', methods=['POST'])
def SongUpload():
	form = SongForm();

	if form.validate_on_submit():
		return 'valid'
	
	return 'not valid'


	
