const db = firebase.firestore();
const card= document.getElementById("data");


const getLibros= () => db.collection('libros').get();

 function abrir() {
   
   }


window.addEventListener('DOMContentLoaded', async (e) => {

    const querySnapshot = await getLibros();
     querySnapshot.forEach(doc => {
         libro= doc.data();
         libro.id = doc.id;
       


       card.innerHTML += ` <div class="card" style="width: 200px; margin-left:10px">
       <img src=${libro.url_imagen} class="card-img-top" alt="..." style= "width:197px ;height:300">
       <div class="card-body">

       <br>
       <div class="container" id="${libro.id}">
       <h4 class="badge badge-light badge-calificar" style="cursor: pointer" id="${libro.id}1">★</h4>
       <h4 class="badge badge-light badge-calificar" style="cursor: pointer" id="${libro.id}2">★</h4>
       <h4 class="badge badge-light badge-calificar" style="cursor: pointer" id="${libro.id}3">★</h4>
       <h4 class="badge badge-light badge-calificar" style="cursor: pointer" id="${libro.id}4">★</h4>
       <h4 class="badge badge-light badge-calificar" style="cursor: pointer" id="${libro.id}5">★</h4>
       </div>
         <a href="#" class="btn btn-primary btn-verMas" id=${libro.id}>Ver mas</a>
       </div>
     </div>`

     
     const badgeCalificar = document.querySelectorAll('.badge-calificar');
       
     badgeCalificar.forEach(btn=> {
         btn.addEventListener('click',(e) => {
             
             const calificacion= e.target.id;
            
             var idSolo=calificacion.substring(0, calificacion.length - 1);

             var num=calificacion.charAt(calificacion.length - 1);
             
             document.getElementById(idSolo+"1").style.color="gray"
             document.getElementById(idSolo+"2").style.color="gray"
             document.getElementById(idSolo+"3").style.color="gray"
             document.getElementById(idSolo+"4").style.color="gray"
             document.getElementById(idSolo+"5").style.color="gray"
             pintar(idSolo,num);
            
         })
        })

       const btnVermas = document.querySelectorAll('.btn-verMas');
       
       btnVermas.forEach(btn=> {
           btn.addEventListener('click',(e) => {
               
               const id= e.target.id;
              // alert(id);
               traeLibro(id);
           })
       })
    })
    })
 
    function traeLibro(id) {

        var docRef= db.collection("libros").doc(id)
        docRef.get().then(function(doc){

            title= doc.data().titulo;
            desc= doc.data().descripcion;
            ruta= doc.data().url_imagen;
            autor= doc.data().autor,
             
            Swal.fire({
                
                title:"Autor: "+autor,
                text: "Descripcion: "+desc,
              })
            
        })
          
    }

    function pintar(starId,num) {

      //  alert(starId);
      //  alert(num);
        switch (num) {
            case '1':
              document.getElementById(starId+"1").style.color="gold"
              break;
            case '2':
              document.getElementById(starId+"1").style.color="gold"
              document.getElementById(starId+"2").style.color="gold"
              break;
            case '3':
              document.getElementById(starId+"1").style.color="gold"
              document.getElementById(starId+"2").style.color="gold"
              document.getElementById(starId+"3").style.color="gold"
              break;
            case '4':
              document.getElementById(starId+"1").style.color="gold"
              document.getElementById(starId+"2").style.color="gold"
              document.getElementById(starId+"3").style.color="gold"
              document.getElementById(starId+"4").style.color="gold"
              break;
            case '5':
              document.getElementById(starId+"1").style.color="gold"
              document.getElementById(starId+"2").style.color="gold"
              document.getElementById(starId+"3").style.color="gold"
              document.getElementById(starId+"4").style.color="gold"
              document.getElementById(starId+"5").style.color="gold";
              break;
            default:
              console.log('Lo lamentamos, por el momento no disponemos de ' + expr + '.');
       }

    }