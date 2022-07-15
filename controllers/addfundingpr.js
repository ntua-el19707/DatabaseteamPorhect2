const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
 let funding_program, addresses;
    
    pool.getConnection((err, conn) => {
        
        let fetchAddressesPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM address')
            .then(([rows, fields]) => {
                addresses = rows;
            })
            .then(() => {
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        let fetchAllPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM funding_program')
             .then(([rows, fields]) => {
             funding_program = rows;
        })
        .then(() => {
              pool.releaseConnection(conn)
              resolve();  
        })
        .catch(err => console.log(err))
        })

        Promise.all([fetchAllPromise, fetchAddressesPromise]).then(() => {
           res.render('addfundin.ejs', {
                pageTitle: "Funding Programs",
                funding_program:funding_program,
                addresses:addresses
            })   
        })
    })
    }

exports.getfundin= (req,res,next) => {

    const name= req.body.name;
    const budget= req.body.budget;
    const address= req.body.address;

    /*this parmaters come fromejs in script there difined bythere id*/
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO funding_program (name,Budget,address_ID) VALUES(?,?,?)`;
        /*make the query for the add*/
        conn.promise().query(sqlQuery, [name,budget,address])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addfundingpr');
        })
        .catch(err => {
           console.log("failed")
           res.redirect('/Organization/addfundingpr');
        })
        /*what ever happens stay in current page*/
    })
}

exports.postDeletefun = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    console.log(id)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM funding_program WHERE name = '${id}'`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addfundingpr');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addfundingpr');
        })
    })

}

exports.postedit= (req, res, next) => {
    
    const name = req.body.fundin_name;
    const budget = req.body.fundin_budget;
    const address = req.body.address_id;
    console.log(address)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE funding_program SET name ='${name}',Budget=${budget},address_ID=${address} WHERE name='${name}'`;
        
        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addfundingpr');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addfundingpr');
        })
    })

}