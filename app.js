const mostrarVentanaBtn = document.getElementById('mostrarVentana');
const ventanaEmergente = document.getElementById('miVentanaEmergente');
const cerrarVentanaBtn = document.getElementById('cerrarVentana');

mostrarVentanaBtn.addEventListener('click', () => {
    ventanaEmergente.style.display = 'block';
    ventanaEmergente.style.transition = '1s';
});

cerrarVentanaBtn.addEventListener('click', () => {
    ventanaEmergente.style.display = 'none';
    ventanaEmergente.style.transition = '1s';
});