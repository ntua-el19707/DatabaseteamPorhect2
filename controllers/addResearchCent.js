const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let ResCenter;
    let avbl;
       
       pool.getConnection((err, conn) => {    
           let fetchavailablePromise = new Promise((resolve, reject) => {
               conn.promise().query(`(SELECT name FROM organization where type_of_organization ="research center" EXCEPT SELECT Organization_name FROM  researcher_center)`)
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
               conn.promise().query('SELECT * FROM  researcher_center')
                .then(([rows, fields]) => {
                ResCenter = rows;
           })
           .then(() => {
                 pool.releaseConnection(conn)
                 resolve();  
           })
           .catch(err => console.log(err))
           })
   
           Promise.all([fetchAllPromise, fetchavailablePromise]).then(() => {
            res.render('addResCent.ejs', {
                pageTitle: "Researcher Center",
                ResCenter:ResCenter,avbl:avbl
            })       
           })
       })
       }

       exports.postadd = (req,res,next) =>{
    const name  = req.body.name
    const budget1 = req.body.budget1
    const budget2 = req.body.budget2
    console.log(name,budget1,budget2)
         /*this parmaters come fromejs in script there difined bythere id*/
       pool.getConnection((err, conn) => {
           var sqlQuery = `INSERT INTO researcher_center (Organization_name,Budget_From_Ministry_of_Education,Budget_From_Private_Actions) VALUES(?,?,?)`;
           /*make the query for the add*/
           conn.promise().query(sqlQuery, [name,budget1,budget2])
           .then(() => {
               pool.releaseConnection(conn);
               res.redirect('/Organization/addResearchCent');
           })
           .catch(err => {
              console.log("failed")
              res.redirect('/Organization/addResearchCent');
           })
           /*what ever happens stay in current page*/
       })
   
   }

exports.postDelete = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
   
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM researcher_center WHERE Organization_name = '${id}'`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addResearchCent');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addResearchCent');
        })
    })

}
exports.postedit= (req, res, next) => {
    const name = req.body.name;
    const budget1 = req.body.budget1
    const budget2 = req.body.budget2
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE researcher_center SET Budget_From_Ministry_of_Education=${budget1},Budget_From_Private_Actions=${budget2} WHERE Organization_name='${name}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addResearchCent');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addResearchCent');
        })
    })

}