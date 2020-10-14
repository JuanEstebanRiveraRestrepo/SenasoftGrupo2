from flask import  Flask
from flask_pymongo import PyMongo

conexion =  Flask(__name__)
conexion.config['MONGO_URI'] = 'mongodb://localhost/senasoft'

mongo = PyMongo(conexion)
