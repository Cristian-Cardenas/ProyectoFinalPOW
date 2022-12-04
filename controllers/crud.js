//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const NombreP = req.body.NombreP;
    const Descripcion_P = req.body.Descripcion_P;
    conexion.query('INSERT INTO proyectos SET ?',{NombreP:NombreP, Descripcion_P:Descripcion_P}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/proyectos');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.id;
    const NombreP = req.body.NombreP;
    const Descripcion_P = req.body.Descripcion_P;
    conexion.query('UPDATE proyectos SET ? WHERE id = ?',[{NombreP:NombreP, Descripcion_P:Descripcion_P}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/proyectos');         
        }
});
};