(function app() {

    "use strict";

    var produit, prix, id_marque, description, marque, createProduit, createMarque, btnRemove, btn, btnDisplayMarque, tableau, tableauMarque, removeProduct;
    var payload = [];



    var box = document.createElement("input");

    const doAjax = function doAjax(url, method, callback, data) {
        try {
            const xhr = new XMLHttpRequest();
            // xhr.open(MSInputMethodContext, url);
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            data = data ? JSON.stringify(data) : null; // si y'a data alors data, sinon data = null.
            if (method.toLowerCase() === "post") {
                if (!data) throw new Error("bad call");
            }
            //on attend le retour de l'appel AJAX
            xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
            xhr.send(data);

        } catch (err) {
            console.error(err);
        }

    };

    
    
    
   





    //@@@@@@@@@@ Section Produit @@@@@@@@@@@@@

    const getProduct = function getProduct() {
        const url = 'http://localhost:7777/produit';
        doAjax(url, "GET", res => {
            //            console.log(JSON.parse(res))
            displayProduct(JSON.parse(res))
        })
    }



    const getAllStock = function getAllStock() {
        const url = 'http://localhost:7777/getAll';
        doAjax(url, "GET", res => {
            console.log(JSON.parse(res))
            displayProduct(JSON.parse(res))
        })
    }



    const addProducts = function addProducts(e) {
        e.preventDefault();

        const url = "http://localhost:7777/produit";
        doAjax(url, "POST", res => {
                //                console.log(JSON.parse(res)
            },

            {

                id_marque: id_marque.value,
                nom: produit.value,
                prix: prix.value,
                description: description.value
            });
    };



    const displayProduct = function displayProduct(productList) {



        productList.forEach(produit => {


            var box = document.createElement("input");
            box.type = "checkbox";
            box.id = `produit_${produit.id_produit}`;

            tableau.innerHTML+= "<tr><td><button id=update>Modifier</button><br><br><button id=delete>Supprimer</button></td><td>" + produit.id_produit + " </td><td>  " + produit.id_marque + " </td><td> " + produit.nom_produit + "</td><td>" + produit.prix + "</td><td>" + produit.description + "</td></tr>"
            payload.push(produit.id_produit)
      
        });
     
        
              
           
    }
    
     
    //@@@@@@@@@@ Section Produit @@@@@@@@@@@@@


    
         
    
    
    
    
    
    
    const deleteProduct = function deleteProduit(){
      
          const url = 'http://localhost:7777/produit/:id';
        doAjax(url, "DELETE", res => {
            //            console.log(JSON.parse(res))
//            displayMarque(JSON.parse(res))
        }, )
    }


    
   


    //@@@@@@@@@@ Section Marque @@@@@@@@@@@@@




    const getMarque = function getMarque() {
        const url = 'http://localhost:7777/marque';
        doAjax(url, "GET", res => {
            //            console.log(JSON.parse(res))
            displayMarque(JSON.parse(res))
        })
    }

    
    
    const addMarque = function addMarque(e) {
        e.preventDefault();

        const url = "http://localhost:7777/marque";
        doAjax(url, "POST", res => {
                console.log(JSON.parse(res));
            },

            {

                nom: marque.value,

            });
    };

    
    
    const displayMarque = function displayMarque(marqueList) {



        marqueList.forEach(marque => {


            var box = document.createElement("input");
            box.type = "checkbox";
            box.id = `marque_${marque.id_produit}`;

            //            document.body.innerHTML+= produit.nom_marque;
            tableauMarque.innerHTML+= "<tr><td><input class=check name=oui type=checkbox></td><td>" + marque.id + " </td><td>  " + marque.nom_marque + " </td></tr>" 

            payload.push(marque)
          
        
        });
        console.log(payload)
      
    }
    


    //@@@@@@@@@@ Section Marque @@@@@@@@@@@@@
    
    
    
    
    
    var start = function start() {



        produit = document.getElementById('nom');
        prix = document.getElementById('prix');
        id_marque = document.getElementById('id_marque');
        description = document.getElementById('description');
        tableau = document.getElementById('tableau');
        marque = document.getElementById('marque');
        createProduit = document.getElementById('btn-product-add');
        createMarque = document.getElementById('btn-marque-add');
        btnRemove = document.getElementById('remove');
        btn = document.getElementById('affiche-produit');
        btnDisplayMarque = document.getElementById('affiche-marque');
        tableauMarque = document.getElementById('tableau-marque');
        removeProduct= document.getElementById('delete-produit')
        removeProduct.addEventListener('click', function(){
            
            console.log(payload)
            
        })

//         console.log(payload)
        
        
        
        
        
        
        
        createProduit.addEventListener('click', addProducts);
        btn.addEventListener('click', getProduct);
        createMarque.addEventListener('click', addMarque);
        btnDisplayMarque.addEventListener('click', getMarque);
        
      

        console.log('DOM READY !');
    }

    window.addEventListener("DOMContentLoaded", start);

}());
