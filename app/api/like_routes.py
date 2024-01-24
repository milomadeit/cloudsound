from flask import Blueprint, jsonify
from ..models import db, Like, Song
from flask_login import current_user

like_routes = Blueprint('likes', __name__)

#  get likes of a song
@like_routes.route('/tracks/<int:trackId>')
def SongLikes(trackId):
    likes = Like.query.filter_by(song_id=trackId).all()
    song_likes = [like.to_dict() for like in likes]
    num_likes = len(song_likes)
    return jsonify({"likes": num_likes, 'track_id': trackId} )


#  post like for a song
@like_routes.route('/tracks/<int:trackId>', methods=['POST'])
def LikeSong(trackId):
    # make sure user is logged in
    if not current_user:
        return jsonify({'error': 'must be logged in to like a song'}), 401

    song = Song.query.filter_by(id=trackId).first()
    # check that song exists
    if not song:
        return jsonify({'error': 'could not find song'}), 404

    like = Like.query.filter_by(song_id=trackId, user_id=current_user.id).first()
    # check that song like exists for current_user
    if like:
        return jsonify({'error': 'user has already liked'}), 403

    new_like = Like(
        user_id=current_user.id,
        song_id=trackId
    )
    db.session.add(new_like)

    if song.likes is None:
        song.likes = 0
    song.likes = song.likes + 1
    db.session.commit()
    return jsonify({'message': 'like song successful', 'likeCount': song.likes}), 200

# remove like for a song
@like_routes.route('/tracks/<int:trackId>', methods=['DELETE'])
def UnlikeSong(trackId):
    # make sure user is logged in
    if not current_user:
        return jsonify({'error': 'must be logged in to like a song'}), 401

    song = Song.query.filter_by(id=trackId).first()
    # check that song exists
    if not song:
        return jsonify({'error': 'could not find song'}), 404

    like = Like.query.filter_by(song_id=trackId, user_id=current_user.id).first()
    # check that song like exists for current_user
    if not like:
        return jsonify({'error': 'unauthorized'}), 403

    db.session.delete(like)
    song.likes = song.likes - 1
    db.session.commit()
    payload = {
        'likes': song.likes,
        'trackId': trackId
    }
    return jsonify(payload), 200
