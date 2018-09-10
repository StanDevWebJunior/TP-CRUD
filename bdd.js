(function app() {

    "use strict";

    const mysql = require('mysql');

    const connection = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gestion_des_stocks',
    });


    connection.connect();

    const end = () => {
        connection.end();
    };



    const test = () => {

        const sql = 'SELECT 1 + 1 AS solution';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
    };





//@@@@@ Section Produit @@@@@@@@@@@@


    const getProduct = (id, clbk) => {
        var sql;
        if (id == null) {
            sql = 'SELECT * FROM produit'
        } else {
            sql = 'SELECT nom FROM produit'
        };

        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }


    const addProduct = (clbk, data) => {
        var sql = "INSERT INTO produit (id_marque,nom_produit,prix,description) VALUES (?,?,?,?)";
        const payload = [data.id_marque, data.nom, data.prix, data.description];
        connection.query(sql, payload, (err, res, cols) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };


    const getProductIds = (id, clbk) => {
        var sql;
        if (id == null) {
            sql = 'SELECT name FROM produit'
        } else {
            sql = 'SELECT * FROM produit WHERE id = ?'
        };

        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }



    const getAllStocks = (id, clbk) => {
        var sql;

        if (id != null) {
            sql = 'SELECT name FROM produit'
        } else {
            sql = "SELECT * FROM produit INNER JOIN marque on produit.id_marque = marque.id "
        };


        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }

    
    const deleteProduct = (id, clbk) => {
        var sql;
      
            sql = 'DELETE FROM produit WHERE id IN (?)'
        

        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }
    
    //@@@@@ Section Produit @@@@@@@@@@@@



    
    


//@@@@@ Section Marque @@@@@@@@@@@@


    const getMarque = (id, clbk) => {
        var sql;
        if (id == null) {
            sql = 'SELECT * FROM marque'
        } else {
            sql = 'SELECT nom FROM marque'
        };

        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }

 const getMarqueIds = (id, clbk) => {
        var sql;
        if (id == null) {
            sql = 'SELECT name FROM marque'
        } else {
            sql = 'SELECT * FROM marque WHERE id = ?'
        };

        connection.query(sql, [id], (error, results, fields) => {
            if (error) throw error;
            clbk(results);
        });
    }




    const addMarque = (clbk, data) => {
        var sql = "INSERT INTO marque (nom_marque) VALUES (?)";
        const payload = [data.nom];
        connection.query(sql, payload, (err, res, cols) => {
            if (err) return clbk(err, null);
            return clbk(null, res);
        });
    };

//@@@@@ Section Marque @@@@@@@@@@@@



    module.exports = {
        test: test,
        getProduct: getProduct,
        addProduct: addProduct,
        getProductIds: getProductIds,
        getAllStocks: getAllStocks,
        getMarque: getMarque,
        addMarque: addMarque,
        getMarqueIds: getMarqueIds,
//        deleteProduct: deleteProduct,
        end,
    };

}())
