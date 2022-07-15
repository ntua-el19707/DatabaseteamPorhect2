const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let organization,phones;
    const sel = req.query.nameq;

    let sqlquery = `SELECT * FROM phones`;
    if(sel) {sqlquery += ` WHERE name='${sel}'`}
    else{
        sqlquery += ` order by name asc`
    }
    pool.getConnection((err, conn) => {
        
        let fetchAddressesPromise = new Promise((resolve, reject) => {
            conn.promise().query(sqlquery)
            .then(([rows, fields]) => {
                phones = rows;
            })
            .then(() => {
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        let fetchAllPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM organization')
            .then(([rows, fields]) => {
                organization = rows;
            })
            .then(() => {
               // console.log(organization)
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        Promise.all([fetchAllPromise, fetchAddressesPromise]).then(() => {
            res.render('addphones.ejs', {
                pageTitle: "Phones",
                phones:phones,
                organization:organization
            })  
        })
    })
  
}
exports.postadd = (req,res,next) =>{
    const name  = req.body.name
    const phone = req.body.phone
     /*this parmaters come fromejs in script there difined bythere id*/
   pool.getConnection((err, conn) => {
       var sqlQuery = `INSERT INTO phones (name,phone) VALUES(?,?)`;
       /*make the query for the add*/
       conn.promise().query(sqlQuery, [name,phone])
       .then(() => {
           pool.releaseConnection(conn);
           res.redirect('/Organization/addphones');
       })
       .catch(err => {
          console.log("failed")
          res.redirect('/Organization/addphones');
       })
       /*what ever happens stay in current page*/
   })

}
exports.postDelete = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    const phone = req.params.phone;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM phones WHERE name = '${id}' AND phone='${phone}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addphones');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addphones');
        })
    })

}
exports.postedit= (req, res, next) => {
    const name = req.body.namemf;
    const phone = req.body.phonemf;
    const oldphone = req.body.oldmf;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE phones SET phone='${phone}' WHERE name='${name}' AND  phone='${oldphone}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addphones');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addphones');
        })
    })

}