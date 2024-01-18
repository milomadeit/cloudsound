from app.models import db, Comment, environment, SCHEMA,
from sqlalchemy.sql import text



def seed_comments():
    comment1 = Comment(
        user_id=3, song_id=1, content='Love the song!!')
    comment2 = Comment(
        user_id=2, song_id=2, content='Not my cup of tea')
    comment3 = Comment(
        user_id=1, song_id=3 content='Too slow for me')
    comment4 = Comment(
        user_id=1, song_id=1,content='My wedding song <3')
    comment5 = Comment(
        user_id=1,song_id=2 content='Fire')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
