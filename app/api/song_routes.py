from flask import Blueprint, jsonify, request, redirect
from ..forms.song_validation_form import SongForm
from .s3buckets import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from ..models import db, Song
from flask_login import current_user

song_routes = Blueprint('songs', __name__)


#  upload a song
@song_routes.route('/upload', methods=['POST'])
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
                return jsonify(new_song)
        if form.errors:
            return jsonify(form.errors)

    return 'must be logged in to upload a song'

# edit a song
@song_routes.route('/<int:songId>', methods=['PUT'])
def SongEdit(songId):
    if current_user:
        current_song = Song.query.filter_by(id=int(songId)).first()
        if not current_song:
            return ('Song not found')

	    # Merge request.form and request.files into a single dictionary
        form_data = {**request.form, **request.files}
        form = SongForm(formdata=form_data)  # Initialize form with combined data
    
        if form.validate_on_submit():
            song_file = form.song.data
            song_title = form.title.data
            artist = form.artist.data
            genre = form.genre.data

            # update the current song details
            current_song.title = song_title
            current_song.artist = artist
            current_song.genre = genre

            if song_file:
                old_song_url = current_song.song_url
                remove_file_from_s3(old_song_url)
                upload = upload_file_to_s3(song_file)

                if 'url' not in upload:
                    return 'upload failed'

                current_song.song_url =  upload['url'] 

                db.session.commit()
                return jsonify(current_song)

        if form.errors:
            return jsonify(form.errors)

    return 'must be logged in to edit a song'


# delete song by id
@song_routes.route('/<int:songId>', methods=['DELETE'])
def DeleteSong(songId):
    # make sure user is logged in
    if not current_user:
        return jsonify({'error': 'must be logged in to delete a song'}), 401

    song = Song.query.filter_by(id=songId).first()
    # check that song exists
    if not song:
        return jsonify({'error': 'could not find song'}), 404
    
    # check if user is the owner of the song
    if song.user_id != current_user.id:
        return jsonify({'error': 'unauthorized'}), 403
    
    try:
        remove_file_from_s3(song.song_url)
        db.session.delete(song)
        db.session.commit()
        return jsonify({'message': 'song deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"error deleting song: {e}")
        return jsonify({'error': 'An error occurred during deletion'}), 500

# get all songs by user id
@song_routes.route('/:username')
def UserSongs():

    if not current_user:
        return jsonify({'error': 'must be logged in to view your songs'}), 401
    
    user_songs = Song.query.filter_by(user_id=current_user.id)
    songs_list = [{'title': song.title, 'artist': song.artist, 'genre': song.genre, 'song_url': song.song_url, 'likes': song.likes} for song in user_songs]

    return jsonify(songs_list)


# get all songs
@song_routes.route('/')
def AllSongs():
    all_songs = Song.query.all()

    return jsonify(all_songs)




                
                
                  
            


	
