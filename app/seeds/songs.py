from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(user_id=2, title='Sweet', artist='Oakland', genre='pop', song_url='https://cloudsoundsongs.s3.amazonaws.com/81dd5228f6bd472d80db94362dd65297.mp3', likes=103, play_count=220, image_url='https://thumbs.dreamstime.com/b/candy-sweet-seamless-vector-pattern-pixel-style-51511103.jpg')
    song2 = Song(user_id=2, title='Rumor', artist='Kismet', genre='edm', song_url='https://cloudsoundsongs.s3.amazonaws.com/1155c0eda7f1400bbd0814e5004748bf.mp3', likes=1367, play_count=2930, image_url='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/aesthetic-vaporwave-anime-girl-edm-dance-music-the-perfect-presents.jpg')
    song3 = Song(user_id=2, title='Old School', artist='Cameron', genre='jazz', song_url='https://cloudsoundsongs.s3.amazonaws.com/12080afb7f4b42fa8c4537d81975c356.mp3', likes=724, play_count=1032, image_url='https://f8n-production.s3.us-east-2.amazonaws.com/collections/4hfgamwya-Piano%20banner%201400.png')
    song4 = Song(user_id=2, title='Wanted', artist='Calypso', genre='hip-hop', song_url='https://cloudsoundsongs.s3.amazonaws.com/703c8c519b6842aba143085c0ac5bd52.mp3', likes=528, play_count=601, image_url='https://cdnb.artstation.com/p/assets/images/images/006/779/085/medium/black-duck-overlord-devil-with-music-final-png.jpg')
    song5 = Song(user_id=2, title='On One', artist='Jojo', genre='hip-hop', song_url='https://cloudsoundsongs.s3.amazonaws.com/cacafbb533034630a71ae3fbd32e0525.mp3', likes=723, play_count=833, image_url='https://as2.ftcdn.net/v2/jpg/03/34/96/89/1000_F_334968934_jnpiCtxQBPxEw6TKb9ZBhHBsMVC9LDtv.jpg')
    song6 = Song(user_id=2, title='Forgotten', artist='Wizard', genre='edm', song_url='https://cloudsoundsongs.s3.amazonaws.com/e14fdf1832064bc6b2251b1a912db9c0.mp3', likes=1023, play_count=1254, image_url='https://pbs.twimg.com/profile_images/1568970813386403841/OksU-Zqx_400x400.jpg' )
    song7 = Song(user_id=2, title='Daft Funk', artist='Oakland', genre='pop', song_url='https://cloudsoundsongs.s3.amazonaws.com/b13c14079c0a4255b81be9797dfac2a0.wav', likes=523, play_count=454, image_url='https://64.media.tumblr.com/308acf62aa711b5c3d33804ba0167b21/92ab994a6e6c451d-27/s540x810/2908aca6c375ece986878cf35bca36ee16642b3e.png' )
    song8 = Song(user_id=2, title='About It', artist='Tierre', genre='hip-hop', song_url='https://cloudsoundsongs.s3.amazonaws.com/cc21aae6b9c848d4ab8251dc809d2e69.mp3', likes=733, play_count=724, image_url='https://cdn.pixabay.com/photo/2022/09/23/01/18/pixel-7473436_640.png' )
    song9 = Song(user_id=2, title='Destruction', artist='Tema', genre='edm', song_url='https://cloudsoundsongs.s3.amazonaws.com/49cc6952f5304e18a4316d32a8d150d3.mp3', likes=733, play_count=724, image_url='https://i.pinimg.com/originals/80/be/f8/80bef84cd425a37db7ddf3cc8bc5c710.jpg' )
    song10 = Song(user_id=2, title='Memories', artist='Oakland', genre='hip-hop', song_url='https://cloudsoundsongs.s3.amazonaws.com/579d7f68a274414494dcd078f995b2b9.mp3', likes=733, play_count=724, image_url='https://pixeljoint.com/files/icons/full/orig.png' )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
    
