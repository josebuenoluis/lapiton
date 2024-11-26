from flask import Flask,render_template,request
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
# from werkzeug.security import generate_password_hash,check_password_hash

#Creamos una instancia de sqlalchemy
db = SQLAlchemy()

#Creamos la aplicacion de Flask
app = Flask(__name__)

#Configuramos nuestra aplicacion de Flask con la ruta de la base de datos
# Ejemplo de conexion app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:alumno@localhost/juego'
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:alumno@localhost/juego"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route("/")
def index():
    jugadores = listarMejores()
    return render_template("tiburon.html",jugadores=jugadores)
    # return render_template("juego2_copy.html",jugadores=jugadores)


# Creamos la ruta para el metodo post
@app.route("/",methods=["POST"])
def agregarUsuario():
    data = request.get_json()
    if data != "":
        guardarPuntos(data)
        jugadores = listarMejores()
        return render_template("tiburon.html",jugadores=jugadores)
#Hay que inicializar la app extension sqlalchemy con la app para que conozca el contexto
db.init_app(app)

#Con flask-SQLAlchemy creamos nuestro modelo para guardar en la base de 
#Heredamos de los modelos de la base de datos
#TABLA USUARIOS
class Usuarios(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer,primary_key=True,AUTO_INCREMENT=True)
    nombre = db.Column(db.VARCHAR(45))
    puntos = db.Column(db.Integer)
    dificultad = db.Column(db.Integer)
    def __init__(self,nombre,puntos,dificultad) -> None:
        self.nombre = nombre
        self.puntos = puntos
        self.dificultad = dificultad
#TABLA JUEGOS
class Juegos(db.Model):
    __tablename__ = "Juegos"
    id = db.Column(db.Integer,primary_key=True,AUTO_INCREMENT=True)
    nombre = db.Column(db.VARCHAR(45))
    categoria = db.Column(db.VARCHAR(45))
    def __init__(self,nombre,categoria) -> None:
        self.nombre = categoria
        self.nombre = nombre

#Creamos un registro en la tabla
def guardarPuntos(usuario:dict):
    jugador = Usuarios(usuario['nombre'],usuario['puntos'],usuario['dificultad'])
    #Add es para decir que vamos a añadir el jugador
    db.session.add(jugador)
    #Commit para la persistencia de datos
    db.session.commit()

#Obtener todos los jugadores
def listarJugadores():
    #Creamos la consulta
    consulta = db.select(Usuarios)
    #Ejecutamos la consulta
    resultado = db.session.execute(consulta)
    #Guardamos la consulta con scalars que nos devolvera una lista de objetos
    jugadores = resultado.scalars()
    return jugadores

#Obtener los mejores 10
def listarMejores():
    #Creamos la consulta limit(num_registros) y order_by(recibe atributos del objeto y tipo de orden)
    consulta = db.select(Usuarios).limit(10).order_by(Usuarios.puntos.desc())
    #Ejecutamos la consulta
    resultado = db.session.execute(consulta)
    #Guardamos  los 10 mejores
    jugadores = resultado.scalars()
    return jugadores


if __name__ == '__main__':
    #Ya creados las tablas y los modelos, las crearemos manualmente
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0",port="80")
    