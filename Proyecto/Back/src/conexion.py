from flask import  Flask
from flask_pymongo import PyMongo

conexion =  Flask(__name__)

#Ruta de conexion con base de datos mongodb
conexion.config['MONGO_URI'] = 'mongodb://localhost/senasoft'

#Conector para base de datos mongodb
mongo = PyMongo(conexion)
