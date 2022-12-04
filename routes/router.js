const express = require('express')
const router = express.Router()
const crud = require('../controllers/crud')
const authController = require('../controllers/authController')
const conexion = require('../database/db');
//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    res.render('index', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/Nproyecto', authController.isAuthenticated, (req, res)=>{
    res.render('proyectos/Nproyecto')
})
router.get('/create', (req, res)=>{
    res.render('create')
})
router.get('/edit', (req, res)=>{
    res.render('edit')
})

router.get('/proyectos', (req, res)=>{     
    conexion.query('SELECT * FROM proyectos',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('proyectos.ejs', {results:results});            
        }   
    })
})

router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM proyectos WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {user:results[0]});            
        }        
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM proyectos WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});



//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/save', crud.save)
router.post('/update', crud.update)
module.exports = router