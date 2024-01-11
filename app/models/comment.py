from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    content = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', back_populates='comments')
    