from flask import Blueprint, jsonify, request, redirect
from ..forms.song_validation_form import SongForm
from .s3buckets import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from ..models import db, Song
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict
song_routes = Blueprint('songs', __name__)

#  upload a song
@song_routes.route('/upload', methods=['POST'])
def SongUpload():
    if current_user:
	# Merge request.form and request.files into a single dictionary
        # form_data = {**request.form, **request.files}
        form =  SongForm(CombinedMultiDict((request.files, request.form)))   # Initialize form with combined data
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            # File data is accessed from request.files
            song_file = request.files.get('song')

            if song_file: # check if file is there
                # create unique filename from file
                song_file.filename = get_unique_filename(song_file.filename)
                upload = upload_file_to_s3(song_file)

                if 'url' not in upload:
                    return jsonify('upload failed'), 500

                url = upload['url']

                # create new song in table
                new_song = Song(
                user_id=current_user.id,
                title=request.form.get('title'),
                artist=request.form.get('artist'),
                genre=request.form.get('genre'),
                song_url=url
                )
                db.session.add(new_song)
                db.session.commit()
                response_data = new_song.to_dict()
                return (jsonify(response_data), 200)

        if form.errors:
            return jsonify(form.errors)

    return 'must be logged in to upload a song'

# edit a song
@song_routes.route('/<int:songId>', methods=['PUT'])
def SongEdit(songId):
    if not current_user:
        return jsonify({'error': 'must be logged in to edit a song'}), 401


    current_song = Song.query.filter_by(id=songId).first()
    if not current_song:
        return jsonify({'error': 'song not found'}), 404

    form = SongForm(CombinedMultiDict((request.files, request.form)))  # Initialize form with combined data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if 'song' in request.files:
            song_file = request.files['song']
            song_file.filename = get_unique_filename(song_file.filename)
            upload = upload_file_to_s3(song_file)

            if 'url' not in upload:
                return jsonify({'error': 'Upload failed'}), 500

            old_song_url = current_song.song_url
            remove_file_from_s3(old_song_url)
            current_song.song_url = upload['url']

        current_song.title = form.title.data or current_song.title
        current_song.artist = form.artist.data or current_song.artist
        current_song.genre = form.genre.data or current_song.genre

        db.session.commit()
        response_data = current_song.to_dict()  # Assuming you have a to_dict method
        return jsonify(response_data), 200

    if form.errors:
        return jsonify(form.errors), 400

    return jsonify({'error': 'Invalid request'}), 400



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
        return jsonify({'error': 'An error occurred during deletion'}), 500

# get all songs by user id
@song_routes.route('/current')
def UserSongs():

    if not current_user:
        return jsonify({'error': 'must be logged in to view your songs'}), 401

    user_songs = Song.query.filter_by(user_id=current_user.id)
    songs_list = [song.to_dict() for song in user_songs]

    return jsonify(songs_list)


# get all songs
@song_routes.route('')
def AllSongs():
    all_songs = Song.query.all()
    songs_list = [song.to_dict() for song in all_songs]

    return jsonify(songs_list)
