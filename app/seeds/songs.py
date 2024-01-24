from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        user_id=1, artist='PrincessK', title='Sweet', genre='edm', song_url='https://cloudsoundsongs.s3.amazonaws.com/sweet.mp3')
    song2 = Song(
        user_id=1, artist='BeatLorde', title='Chill vibesss', genre='synth', song_url='https://cloudsoundsongs.s3.amazonaws.com/old+school+2.mp3')
    song3 = Song(
        user_id=1, artist='Don Ron', title='For the homies', genre='underground', song_url='https://cloudsoundsongs.s3.amazonaws.com/Moore+Kismet+-+Rumor+(ft.+WYN).mp3')

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
    
