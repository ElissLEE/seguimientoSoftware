const db = firebase.firestore();

async function buscarLibro() {

    const textoBusqueda = document.getElementById('texto-busqueda');
    const containerInformacion = document.getElementById('informacionBusqueda');
    containerInformacion.innerHTML = ""
    try {
        const isbn = await db.collection("libros").where("ISBN", "==", textoBusqueda.value).get()
        const autor = await db.collection("libros").where("autor", "==", textoBusqueda.value).get()
        const titulo = await db.collection("libros").where("titulo", "==", textoBusqueda.value).get()
        const res = []


        function imprimirLibro(doc) {
            if (!res.includes(doc.id)) {

                containerInformacion.innerHTML += "<div> <h1>" + doc.data().titulo + "</h1> " + "Autor: " + doc.data().autor
                    + "<br/>"+ "Calificacion: "  + doc.data().calificacion + "<br/>" + "Editorial: " + doc.data().editorial + "<br/>"+ "Descripcion: "  + doc.data().descripcion + "<br/>" +
                     " <img src= '"+ doc.data().url_imagen + "'/> " + "</div>"
                res.join(doc.id)
            }
        }

        isbn.forEach(imprimirLibro)
        autor.forEach(imprimirLibro)
        titulo.forEach(imprimirLibro)
    }
    catch (error) {
        console.log("Error ", error);
    }

}

