from flask import Blueprint, jsonify, request, redirect
from ..forms.song_validation_form import SongForm
from .s3buckets import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from ..models import db, Song
from flask_login import current_user

song_routes = Blueprint('songs', __name__)

@song_routes.route('/upload/', methods=['POST'])
def SongUpload():
    if current_user:
	# Merge request.form and request.files into a single dictionary
        form_data = {**request.form, **request.files}
        form = SongForm(formdata=form_data)  # Initialize form with combined data
    
        if form.validate_on_submit():
            song_file = form.song.data  # Access the file part from merged data
            song_title = form.title.data  # Access the title text
            artist = form.artist.data
            genre = form.genre.data
        
        
		
            if song_file: # check if file is there
                unique_filename = get_unique_filename(song_title)
                upload = upload_file_to_s3(song_file)
            
                if 'url' not in upload:
                    return 'upload failed'
            
                url = upload['url']
            
                new_song = Song(
                    user_id = current_user.id, # how to get dynamic user id?
                    title=song_title,
                    artist=artist,
                    genre=genre,
                    song_url=url
			    )
                db.session.add(new_song)
                db.session.commit()
                return redirect('/')
        if form.errors:
            return jsonify(form.errors)

    return 'must be logged in to upload a song'
                
                
                  
            


	
