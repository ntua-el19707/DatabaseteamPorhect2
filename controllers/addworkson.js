
const { pool } = require('../utils/database');
//const w = require('alert');

exports.getMain= (req,res,next) => {
    let work;
    let workers;
    let projects
       pool.getConnection((err, conn) => {    
           let fetchworkersPromise = new Promise((resolve, reject) => {
               conn.promise().query(`SELECT * FROM researcher`)
               .then(([rows, fields]) => {
                 workers = rows; 
                 })
               .then(() => {

                   pool.releaseConnection(conn)
                   resolve(); 
               })
               .catch(err => console.log(err))
           })
           let fetchProjectsPromise = new Promise((resolve, reject) => {
               conn.promise().query('SELECT Title FROM  project')
                .then(([rows, fields]) => {
                projects = rows;
           })
           .then(() => {
                 pool.releaseConnection(conn)
                 resolve();  
           })
           .catch(err => console.log(err))
           })
           let fetchworkPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM  work_on')
             .then(([rows, fields]) => {
             work = rows;
        })
        .then(() => {
              pool.releaseConnection(conn)
              resolve();  
        })
        .catch(err => console.log(err))
        })
           Promise.all([fetchProjectsPromise, fetchworkersPromise,fetchworkPromise]).then(() => {
        
            res.render('addworkson.ejs', {
                pageTitle: "Works on",
                work:work,
                workers:workers,projects

            })   
           })
       })
       }

exports.postadd = (req,res,next) =>{
        const id  = req.body.Workerid
        const tittle = req.body.tittle
         /*this parmaters come fromejs in s
         cript there difined bythere id*/
        if(id && tittle){
         pool.getConnection((err, conn) => {
           var sqlQuery = `INSERT INTO work_on (worker_id,project_title) VALUES(?,?)`;
           /*make the query for the add*/
           conn.promise().query(sqlQuery, [id,tittle])
           .then(() => {
               pool.releaseConnection(conn);
               res.redirect('/Researcher/addworkson');
           })
           .catch(err => {
              console.log("failed")
              res.redirect('/Researcher/addworkson');
           })
           /*what ever happens stay in current page*/
       })
    }else{
        
        res.redirect('/Researcher/addworkson');
    }
   }
   exports.postDelete = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    const title = req.params.title;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM work_on WHERE worker_id = '${id}' AND project_title='${title}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Researcher/addworkson');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Researcher/addworkson');
        })
    })

}

