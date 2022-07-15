
const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let organization,Res;
    let sqlquery = `SELECT * FROM organization`;
    pool.getConnection((err, conn) => {
        
        let fetchAddressesPromise = new Promise((resolve, reject) => {
            conn.promise().query(sqlquery)
            .then(([rows, fields]) => {
                organization = rows;
            })
            .then(() => {
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        let fetchAllPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM researcher')
            .then(([rows, fields]) => {
                Res = rows;
            })
            .then(() => {
               // console.log(organization)
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        Promise.all([fetchAllPromise, fetchAddressesPromise]).then(() => {
            res.render('addresearcher.ejs', {
                pageTitle: "Researcher",
                Res:Res,organization:organization
            })  
        })
    })
  
}
exports.postadd = (req,res,next) =>{
    const name = req.body.namer
    const surname = req.body.surnamer;
    const sex = req.body.sexr
    const date = req.body.dater
    const org = req.body.nameor
     /*this parmaters come fromejs in script there difined bythere id*/
   pool.getConnection((err, conn) => {
       var sqlQuery = `INSERT INTO researcher (name,Surname,Sex,DateOfBirth,organization) VALUES(?,?,?,?,?)`;
       /*make the query for the add*/
       conn.promise().query(sqlQuery, [name,surname,sex,date,org])
       .then(() => {
           pool.releaseConnection(conn);
           res.redirect('/Researcher/addResearchers');
       })
       .catch(err => {
          console.log("failed")
          res.redirect('/Researcher/addResearchers');
       })
       /*what ever happens stay in current page*/
   })

}
exports.postedit= (req, res, next) => {
    const id = req.body.rid
    const name = req.body.rname
    const surname = req.body.rsurname;
    const sex = req.body.rsex
    const date = req.body.rdate
    const org = req.body.rnameo
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE researcher   SET  name='${name}',Surname='${surname}',Sex='${sex}',DateOfBirth='${date}',organization='${org}' WHERE Researher_id='${id}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Researcher/addResearchers');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Researcher/addResearchers');
        })
    })

}
exports.postDelete = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM researcher WHERE  Researher_id= '${id}'`;
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Researcher/addResearchers');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Researcher/addResearchers');
        })
    })

}