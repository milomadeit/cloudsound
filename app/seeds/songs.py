from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        user_id=1, artist='PrincessK', title='Sweet', genre='edm', song_url='https://cloudsoundsongs.s3.us-east-1.amazonaws.com/TRACK.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMiJGMEQCIGJA3XgfUK%2F3ejoKRZgKwWEkLtPjP6nMnCV6DZHysxomAiBLo5fHAJYH6Y0Z97wxmXhyAgcNNjlAbpZSeAVyxR%2B5yyrkAggaEAAaDDMzOTcxMzEwOTE5NyIMq1MgSoJuxSGQ73%2FLKsECWcnR9cUgp%2BrK0VQrPmxpy08gQ%2F%2FdP1vhaMlKWSwA1cQqdyX7c%2F2TTh81CVREKFbNgeOhwEa4Qv1ndcyTZ3sIYxb5PyUQ2%2BXpN20mZUuoW%2BgbcbcBrvghckZ66QlU9S5Fgt%2FJpo50UQGfU%2BTNmqTQ%2FzHi%2F8XTcBRNOs2b8JEmrwgA%2BCXJuL39odHJ3PEfaJlyHLheftiXWwirT55Vw8QOsTiamTqdvHTM1WYhfMxeOqpy1ea2NiU8pUXVzieVHOyrKz0bNZAVYlhdYO2DukSvm8dh%2Fa8A2a%2FouUgOKXaLFYgETIYPs38Rs6iJeXqPsqu4raRvz%2F30cOy5KxBLN1UO38LdXB49l7wxKpTrdPoq4SJ1rRYXbNH1NlHWqDU%2FuEZHO5ECuzeEFmumQvREEzJzCXq78zoTOF974djVphcEE5Y%2BMOH1r60GOrQCL2klzZc3laamrE6YhENAr%2BgdxoKKlOObYrmkufK2fdmGHO%2BfrIS5SexafLPNdyQFH39X4y9oM0zRmnlzb29koMtfnipg6cf9tBK4y9ZToGlZQGOymJngiwMQEwsPw9Jy5yNct3ZbcX0t1XV8UgyGQ8SdIc4rH3pkRG9Gx%2FTfXrMIz3PB2FFTE657n8Spmg13J0jtXn%2FhvFayWzwJs5cRMnUa5SgzBeOIRaKKKNOtP9zk%2FtgcJPxc%2FpLL5OVY38A6JdsJPXNCYhRv9B83Ik%2BnJTdQc%2FYWjVnhKeH%2FyS1V5J%2FnVy4O3t9PJf6ifVSV9CQNPmK1V0GotF2HrMNrY1Jn8kKYTqIwPdPS58SagthTTASD7bNE81LpnrEoiO4p80AGSmEs%2BFOEhGDSad3Ve0C0tjwxhOg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240120T185103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAU6GD2VTGUISTGF5X%2F20240120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9ca56fa64829a83b67b4d55be0492ed83159db327fef9ab8527fc75544ba4d133')
    song2 = Song(
        user_id=2, artist='BeatLorde', title='Chill vibesss', genre='synth', song_url='https://cloudsoundsongs.s3.us-east-1.amazonaws.com/old%20school%202.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMiJGMEQCIGJA3XgfUK%2F3ejoKRZgKwWEkLtPjP6nMnCV6DZHysxomAiBLo5fHAJYH6Y0Z97wxmXhyAgcNNjlAbpZSeAVyxR%2B5yyrkAggaEAAaDDMzOTcxMzEwOTE5NyIMq1MgSoJuxSGQ73%2FLKsECWcnR9cUgp%2BrK0VQrPmxpy08gQ%2F%2FdP1vhaMlKWSwA1cQqdyX7c%2F2TTh81CVREKFbNgeOhwEa4Qv1ndcyTZ3sIYxb5PyUQ2%2BXpN20mZUuoW%2BgbcbcBrvghckZ66QlU9S5Fgt%2FJpo50UQGfU%2BTNmqTQ%2FzHi%2F8XTcBRNOs2b8JEmrwgA%2BCXJuL39odHJ3PEfaJlyHLheftiXWwirT55Vw8QOsTiamTqdvHTM1WYhfMxeOqpy1ea2NiU8pUXVzieVHOyrKz0bNZAVYlhdYO2DukSvm8dh%2Fa8A2a%2FouUgOKXaLFYgETIYPs38Rs6iJeXqPsqu4raRvz%2F30cOy5KxBLN1UO38LdXB49l7wxKpTrdPoq4SJ1rRYXbNH1NlHWqDU%2FuEZHO5ECuzeEFmumQvREEzJzCXq78zoTOF974djVphcEE5Y%2BMOH1r60GOrQCL2klzZc3laamrE6YhENAr%2BgdxoKKlOObYrmkufK2fdmGHO%2BfrIS5SexafLPNdyQFH39X4y9oM0zRmnlzb29koMtfnipg6cf9tBK4y9ZToGlZQGOymJngiwMQEwsPw9Jy5yNct3ZbcX0t1XV8UgyGQ8SdIc4rH3pkRG9Gx%2FTfXrMIz3PB2FFTE657n8Spmg13J0jtXn%2FhvFayWzwJs5cRMnUa5SgzBeOIRaKKKNOtP9zk%2FtgcJPxc%2FpLL5OVY38A6JdsJPXNCYhRv9B83Ik%2BnJTdQc%2FYWjVnhKeH%2FyS1V5J%2FnVy4O3t9PJf6ifVSV9CQNPmK1V0GotF2HrMNrY1Jn8kKYTqIwPdPS58SagthTTASD7bNE81LpnrEoiO4p80AGSmEs%2BFOEhGDSad3Ve0C0tjwxhOg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240120T185223Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAU6GD2VTGUISTGF5X%2F20240120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=05eafd1fe8fe29109fb14cfe229e0e5c70809d25b0e6c95001badfc784ed61c3')
    song3 = Song(
        user_id=3, artist='Don Ron', title='For the homies', genre='underground', song_url='https://cloudsoundsongs.s3.us-east-1.amazonaws.com/goaway.m4a?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMiJGMEQCIGJA3XgfUK%2F3ejoKRZgKwWEkLtPjP6nMnCV6DZHysxomAiBLo5fHAJYH6Y0Z97wxmXhyAgcNNjlAbpZSeAVyxR%2B5yyrkAggaEAAaDDMzOTcxMzEwOTE5NyIMq1MgSoJuxSGQ73%2FLKsECWcnR9cUgp%2BrK0VQrPmxpy08gQ%2F%2FdP1vhaMlKWSwA1cQqdyX7c%2F2TTh81CVREKFbNgeOhwEa4Qv1ndcyTZ3sIYxb5PyUQ2%2BXpN20mZUuoW%2BgbcbcBrvghckZ66QlU9S5Fgt%2FJpo50UQGfU%2BTNmqTQ%2FzHi%2F8XTcBRNOs2b8JEmrwgA%2BCXJuL39odHJ3PEfaJlyHLheftiXWwirT55Vw8QOsTiamTqdvHTM1WYhfMxeOqpy1ea2NiU8pUXVzieVHOyrKz0bNZAVYlhdYO2DukSvm8dh%2Fa8A2a%2FouUgOKXaLFYgETIYPs38Rs6iJeXqPsqu4raRvz%2F30cOy5KxBLN1UO38LdXB49l7wxKpTrdPoq4SJ1rRYXbNH1NlHWqDU%2FuEZHO5ECuzeEFmumQvREEzJzCXq78zoTOF974djVphcEE5Y%2BMOH1r60GOrQCL2klzZc3laamrE6YhENAr%2BgdxoKKlOObYrmkufK2fdmGHO%2BfrIS5SexafLPNdyQFH39X4y9oM0zRmnlzb29koMtfnipg6cf9tBK4y9ZToGlZQGOymJngiwMQEwsPw9Jy5yNct3ZbcX0t1XV8UgyGQ8SdIc4rH3pkRG9Gx%2FTfXrMIz3PB2FFTE657n8Spmg13J0jtXn%2FhvFayWzwJs5cRMnUa5SgzBeOIRaKKKNOtP9zk%2FtgcJPxc%2FpLL5OVY38A6JdsJPXNCYhRv9B83Ik%2BnJTdQc%2FYWjVnhKeH%2FyS1V5J%2FnVy4O3t9PJf6ifVSV9CQNPmK1V0GotF2HrMNrY1Jn8kKYTqIwPdPS58SagthTTASD7bNE81LpnrEoiO4p80AGSmEs%2BFOEhGDSad3Ve0C0tjwxhOg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240120T185254Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAU6GD2VTGUISTGF5X%2F20240120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=67e8e1c14277a76575e16a7993dd8f867b60a7c5a398ac3648a490c44269cbec')

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()