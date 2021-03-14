const db = firebase.firestore();

/*
    Guarda la reseña en el arreglo y la actualiza en pantalla
*/
function generarResenia() {

    const parametro = obtenerParametros()
    const resenias = db.collection('libros').doc(parametro.id)
    const textoResenia = document.getElementById('texto-resenia');

    resenias.update({
        resenias: firebase.firestore.FieldValue.arrayUnion(textoResenia.value)
    });

    $('#modal').modal('hide')

    obtenerLibro()
    textoResenia.value = ""
}

/*
    Muestra en un modal la vista previa de la reseña
*/
function mostrarResenia() {

    const textoResenia = document.getElementById('texto-resenia');
    const texto = document.getElementById('textoD-resenia');

    texto.innerHTML = textoResenia.value
    $('#modal').modal('show')

}

/*
    Obtiene los parametros de la pagina 
*/
function obtenerParametros() {

    var loc = document.location.href;

    if (loc.indexOf('?') > 0) {

        var getString = loc.split('?')[1];

        var GET = getString.split('&');
        var get = {};

        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

/*
    Obtiene el libro del id correpondiente
*/
async function obtenerLibro(){
   
    const containerInformacion = document.getElementById('reseniasTotales');
    const parametros = obtenerParametros()
    const libro = await db.collection('libros').doc(parametros.id).get()
    const resenias =libro.data().resenias
    containerInformacion.innerHTML = "<h2>Reseñas</h2>"
   
    for (let index = 0; index < resenias.length; index++) {

        containerInformacion.innerHTML += resenias[index] + "<br>"

    }
}
// al cargar la pagina  ejecuta el metodo  
window.onload = obtenerLibro