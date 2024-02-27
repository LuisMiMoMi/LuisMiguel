document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos referencias a los elementos del DOM
    const btnCurriculum = document.getElementById("btnCurriculum");
    const btnVideos = document.getElementById("btnVideos");
    const sectionCurriculum = document.getElementById("curriculum");
    const sectionVideos = document.getElementById("videos");
    let timer; // Variable para almacenar el temporizador

    // Mostramos la sección de currículum y ocultamos la de videos al inicio
    sectionCurriculum.style.display = "block";
    sectionVideos.style.display = "none";

    // Event listener para el botón de currículum
    btnCurriculum.addEventListener("click", function() {
        sectionCurriculum.style.display = "block";
        sectionVideos.style.display = "none";
    });

    // Event listener para el botón de videos
    btnVideos.addEventListener("click", function() {
        sectionCurriculum.style.display = "none";
        sectionVideos.style.display = "block";
    });

    // Seleccionamos los elementos necesarios para la galería de videos
    const previousVideo = document.getElementById('previousVideo').querySelector('video');
    const currentVideo = document.getElementById('currentVideo').querySelector('video');
    const nextVideo = document.getElementById('nextVideo').querySelector('video');

    // Lista de videos para la galería
    const videoList = ["Video1.mp4", "Video2.mp4", "Video3.mp4", "Video4.mp4"];
    let currentVideoIndex = 0;

    // Función para cambiar el video actual
    function changeVideo() {
        currentVideo.src = "./assets/videos/" + videoList[currentVideoIndex];
        previousVideo.src = "./assets/videos/" + videoList[(currentVideoIndex - 1 + videoList.length) % videoList.length];
        nextVideo.src = "./assets/videos/" + videoList[(currentVideoIndex + 1) % videoList.length];
        currentVideo.pause(); // Pausar el video central
    }

    // Mostrar el primer video al cargar la página
    changeVideo();

    // Event listener para el video anterior
    previousVideo.parentElement.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
        changeVideo();
    });

    // Event listener para el siguiente video
    nextVideo.parentElement.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        changeVideo();
    });

    // Función para ampliar el video y su contenedor
    function expandVideo() {
        // Establecer el tamaño ampliado del video y su contenedor con una transición
        currentVideo.style.transition = 'width 0.5s, height 0.5s';
        currentVideo.parentElement.style.transition = 'width 0.5s, height 0.5s';
        currentVideo.style.width = '100%';
        currentVideo.parentElement.style.width = '100%';
        currentVideo.style.height = '100%';
        currentVideo.parentElement.style.height = '100%';
    }

    // Función para restaurar el tamaño normal del video y su contenedor
    function resetVideoSize() {
        // Restaurar el tamaño normal del video y su contenedor con una transición
        currentVideo.style.transition = 'width 0.5s, height 0.5s';
        currentVideo.parentElement.style.transition = 'width 0.5s, height 0.5s';
        currentVideo.style.width = ''; // Restaurar el ancho original del video
        currentVideo.parentElement.style.width = ''; // Restaurar el ancho original del contenedor
        currentVideo.style.height = ''; // Restaurar el alto original del video
        currentVideo.parentElement.style.height = ''; // Restaurar el alto original del contenedor
    }

    // Reproducir el video central al pasar el ratón sobre él
    currentVideo.addEventListener('mouseenter', function() {
        timer = setTimeout(expandVideo, 1000); // Ampliar el video después de 1 segundo
        currentVideo.play();
    });

    currentVideo.addEventListener('mouseleave', function() {
        clearTimeout(timer); // Limpiar el temporizador si el ratón sale antes del tiempo establecido
        resetVideoSize(); // Restaurar el tamaño normal del video y su contenedor
        currentVideo.currentTime = 0; // Reiniciar el video al salir del área
        currentVideo.pause();
    });

    // Quitar los controles de los videos
    currentVideo.removeAttribute("controls");
    previousVideo.removeAttribute("controls");
    nextVideo.removeAttribute("controls");
});
