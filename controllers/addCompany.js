const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let Company;
    let avbl;
       
       pool.getConnection((err, conn) => {    
           let fetchavailablePromise = new Promise((resolve, reject) => {
               conn.promise().query(`(SELECT name FROM organization where type_of_organization ="company" EXCEPT SELECT Organization_name FROM  company)`)
               .then(([rows, fields]) => {
                 avbl = rows; 
            
                 })
               .then(() => {

                   pool.releaseConnection(conn)
                   resolve(); 
               })
               .catch(err => console.log(err))
           })
          
           let fetchAllPromise = new Promise((resolve, reject) => {
               conn.promise().query('SELECT * FROM  company')
                .then(([rows, fields]) => {
                Company = rows;
           })
           .then(() => {
                 pool.releaseConnection(conn)
                 resolve();  
           })
           .catch(err => console.log(err))
           })
   
           Promise.all([fetchAllPromise, fetchavailablePromise]).then(() => {
        
            res.render('addCompany.ejs', {
                pageTitle: "Companys",
                Company: Company,
                avbl:avbl
            })     
           })
       })
       }

    exports.postadd = (req,res,next) =>{
        const name  = req.body.University_name
        const budget = req.body.budget
         /*this parmaters come fromejs in script there difined bythere id*/
       pool.getConnection((err, conn) => {
           var sqlQuery = `INSERT INTO company (Organization_name,Budget) VALUES(?,?)`;
           /*make the query for the add*/
           conn.promise().query(sqlQuery, [name,budget])
           .then(() => {
               pool.releaseConnection(conn);
               res.redirect('/Organization/addCompany');
           })
           .catch(err => {
              console.log("failed")
              res.redirect('/Organization/addCompany');
           })
           /*what ever happens stay in current page*/
       })
   
   }
   exports.postDelete = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    console.log(id)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM company WHERE Organization_name = '${id}'`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addCompany');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addCompany');
        })
    })

}
exports.postedit= (req, res, next) => {
    const name = req.body.name;
    const budget = req.body.budget;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE company SET Budget=${budget} WHERE Organization_name='${name}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addCompany');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addCompany');
        })
    })

}