from app import DB as db

# class Person(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def __repr__(self):
#         return '<Person %r>' % self.username
        
class Player(db.Model):
    #__tablename__ = 'Player'
    username = db.Column(db.String(80), unique=True, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return '<Player %r>' % self.username