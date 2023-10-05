const mostrarVentanaBtn = document.getElementById('mostrarVentana');
const ventanaEmergente = document.getElementById('miVentanaEmergente');
const cerrarVentanaBtn = document.getElementById('cerrarVentana');
const btnCancelar = document.getElementById('cancelarVentana');
const btnGuardar = document.querySelector('#cerrarVentana');
const txtIngreso = document.querySelector('#txtIngreso');
const txtDescripcion = document.querySelector('#txtDescripcion');
const retirosContainer = document.querySelector('.withdrawal-history');
const ingresosContainer = document.querySelector('.income-history');
const btnRetiros = document.querySelector('#btnRetiros');
const contRet = document.querySelector('.retiros');
const btnIngresos = document.querySelector('#btnIngresos');
const contIng = document.querySelector('#ingresos');
const txtSaldo = document.querySelector('#saldo');
const txtPassword = document.querySelector('#password');
const txtUser = document.querySelector('#user');
const btnLogin = document.querySelector('#login');
const inicioContainer = document.querySelector('.inicio-sesion');

let acum = 0;

const users = [
    { user: 'jorge', lastname: 'Santacruz', password: '1234' },
    { user: 'valeria', lastname: 'torres', password: '147' },
    { user: 'karol', lastname: 'santacruz', password: '258' }
  ];

mostrarVentanaBtn.addEventListener('click', () => {
    ventanaEmergente.style.display = 'block';
    ventanaEmergente.style.transition = '1s';
});

cerrarVentanaBtn.addEventListener('click', () => {
    ventanaEmergente.style.display = 'none';
    ventanaEmergente.style.transition = '1s';
});

function createWithdrawal(){
    if(txtDescripcion.value === ""){
        alert("Debes llenar el campo de Descripcion");
    }else if(txtIngreso.value === ""){
        alert("Debes llenar el campo de Ingreso");
    }else{
        const radioRetiro = document.querySelector('#radio-retiro');
        const radioIngreso = document.querySelector('#radio-ingreso');
        let clase = "";
        let container;
        let svg;
        if(radioIngreso.checked){
            clase = 'income';
            svg = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.70626 5.29375C7.31563 4.90312 6.68126 4.90312 6.29063 5.29375L1.29063 10.2937C0.900005 10.6844 0.900005 11.3187 1.29063 11.7094C1.68126 12.1 2.31563 12.1 2.70626 11.7094L7.00001 7.41562L11.2938 11.7062C11.6844 12.0969 12.3188 12.0969 12.7094 11.7062C13.1 11.3156 13.1 10.6812 12.7094 10.2906L7.70938 5.29062L7.70626 5.29375Z" fill="#196200"/>
            </svg>
            `;
            container = ingresosContainer;
        }else if(radioRetiro.checked){
            clase = 'withdrawal';
            svg = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29374 10.7063C6.68437 11.0969 7.31874 11.0969 7.70937 10.7063L12.7094 5.70625C13.1 5.31563 13.1 4.68125 12.7094 4.29063C12.3187 3.9 11.6844 3.9 11.2937 4.29063L6.99999 8.58438L2.70624 4.29375C2.31562 3.90313 1.68124 3.90313 1.29062 4.29375C0.899994 4.68438 0.899994 5.31875 1.29062 5.70938L6.29062 10.7094L6.29374 10.7063Z" fill="#762400"/>
            </svg>
            `;
            container = retirosContainer;
        }
        let band = true;
        if(container === ingresosContainer){
            acum += Number(txtIngreso.value);
            txtSaldo.innerText = acum;
        }else if(container === retirosContainer){
            let num = (Number(txtIngreso.value));
            let tot = acum - num;
            if(tot < 0){
                alert("Saldo insuficiente");
                band = false;
            }else{
                acum -= Number(txtIngreso.value);
                txtSaldo.innerText = acum;
            }
        }
        const numeroFormateado = acum.toLocaleString();
        txtSaldo.innerHTML = numeroFormateado;
        if(band){
            const descripcion = txtDescripcion.value;
            const saldo = txtIngreso.value;
            const transaccion = document.createElement("div");
            transaccion.className = clase;
            transaccion.innerHTML = `
                ${svg}
                <div class="${clase}-div">
                    <h3>${descripcion}</h2>
                    <h4>${saldo} MXN</h4>
                </div>`;
            container.appendChild(transaccion);
            txtIngreso.value = "";
            txtDescripcion.value = "";
        }
    }
}

function viewRetiros(){
    retirosContainer.style.display = 'block';
    ingresosContainer.style.display = 'none';
    btnRetiros.style.backgroundColor = "#D4052A";
    btnRetiros.style.color = "#ffffff";
    
    btnIngresos.style.backgroundColor = "#f0f0f0";
    btnIngresos.style.color = "#0FB001";
}

function viewIngresos(){
    retirosContainer.style.display = 'none';
    ingresosContainer.style.display = 'block';

    btnRetiros.style.backgroundColor = "#f0f0f0";
    btnRetiros.style.color = "#D4052A";
    
    btnIngresos.style.backgroundColor = "#0FB001";
    btnIngresos.style.color = "#ffffff";
}

function cancelar(){
    txtDescripcion.value = "";
    txtIngreso.value = "";
    ventanaEmergente.style.display = "none";
}

function checkUser(){
    const checkUser = users.find(user => user.user === txtUser.value);
    console.dir(txtPassword)
    if(checkUser){
        const password = users.find(user => user.password === txtPassword.value);
        if(password){
            inicioContainer.style.display = 'none';
        }else{
            alert('Contraseña incorrecta');
        }
    }else{
        alert('El usuario que ingresaste no existe');
    }
}

btnLogin.addEventListener('click',checkUser);
btnCancelar.addEventListener('click',cancelar);
btnRetiros.addEventListener('click',viewRetiros);
btnIngresos.addEventListener('click',viewIngresos);
btnGuardar.addEventListener('click',createWithdrawal);