from app.models import db, User, environment, SCHEMA, Comment
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=3, content='Love the song!!')
    comment2 = Comment(
        user_id=2, content='Not my cup of tea')
    comment3 = Comment(
        user_id=1, content='Too slow for me')
    comment4 = Comment(
        user_id=1, content='Too slow for me')
    comment5 = Comment(
        user_id=1, content='Too slow for me')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
