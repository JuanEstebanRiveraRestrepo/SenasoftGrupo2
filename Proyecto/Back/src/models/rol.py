from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request


from conexion import mongo

Rol = Blueprint('rol', __name__)

@Rol.route('/rol')
def obtenerRol():
    roles = mongo.db.rol.find()
    respuesta = json_util.dumps(roles)
    
    return respuesta 

@Rol.route('/rol', methods=['POST'])
def creaRol():
    nombre = request.json['nombre']
    
    if nombre: 
        mongo.db.rol.insert({
            'nombre': nombre
        })
        
        return jsonify({'mensaje': 'Se agrego rol'}) 

@Rol.route('/rol/<id>')
def buscarRol(id):
    rol = mongo.db.rol.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(rol)
    return respuesta
    
@Rol.route('/rol/<id>', methods=['PUT'])
def editarRol(id):
    nombre = request.json['nombre']
    
    if nombre:
        mongo.db.rol.update_one({'_id': ObjectId(id)}, {'$set':{
          'nombre': nombre  
        }})
        
        respuesta = jsonify({'mensaje': 'se edito el rol'}) 
        return respuesta   

@Rol.route('/rol/<id>', methods=['DELETE'])
def eliminarRol(id):
    mongo.db.rol.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el rol'}) 