from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(user_id=2, title='Sweet', artist='Oakland', genre='pop', song_url='https://cloudsoundsongs.s3.amazonaws.com/81dd5228f6bd472d80db94362dd65297.mp3', likes=103, play_count=220)
    song2 = Song(user_id=2, title='Rumor', artist='Kismet', genre='pop', song_url='https://cloudsoundsongs.s3.amazonaws.com/1155c0eda7f1400bbd0814e5004748bf.mp3', likes=1367, play_count=2930)
    song3 = Song(user_id=2, title='Old School', artist='Cameron', genre='jazz', song_url='https://cloudsoundsongs.s3.amazonaws.com/12080afb7f4b42fa8c4537d81975c356.mp3', likes=724, play_count=1032)

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
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
    
