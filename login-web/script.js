/* =========================================
   1. ELEMENTOS DEL DOM
========================================= */
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");
const togglePassword = document.getElementById("togglePassword");
const rememberEmail = document.getElementById("rememberEmail");
const forgotPassword = document.getElementById("forgotPassword");

/* =========================================
   2. CREDENCIALES DE DEMOSTRACIÓN
========================================= */
// IMPORTANTE: esta autenticación es exclusivamente DIDÁCTICA.
// No es un mecanismo seguro. En una aplicación real, las credenciales
// deben validarse en un servidor mediante HTTPS y contraseñas con hash.
// Nunca se deben almacenar contraseñas en el navegador.
const DEMO_EMAIL = "demo@ejemplo.com";
const DEMO_PASSWORD = "Demo1234!";

/* =========================================
   3. RECORDAR SOLO EL CORREO
========================================= */
// Se guarda únicamente el correo; jamás la contraseña.
const savedEmail = localStorage.getItem("rememberedEmail");
if (savedEmail) {
    emailInput.value = savedEmail;
    rememberEmail.checked = true;
}

/* =========================================
   4. MOSTRAR / OCULTAR CONTRASEÑA
========================================= */
togglePassword.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Ocultar" : "Mostrar";
    togglePassword.setAttribute("aria-label", isPassword ? "Ocultar contraseña" : "Mostrar contraseña");
    togglePassword.setAttribute("aria-pressed", String(isPassword));
});

/* =========================================
   5. FUNCIONES DE MENSAJES
========================================= */
function clearFieldError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
}

function showFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}

function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "form-message";
}

/* =========================================
   6. VALIDAR CORREO
========================================= */
function validateEmail() {
    const email = emailInput.value.trim();

    if (email === "") {
        showFieldError(emailInput, emailError, "El correo electrónico es obligatorio.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError(emailInput, emailError, "Ingresa un correo electrónico válido.");
        return false;
    }

    clearFieldError(emailInput, emailError);
    return true;
}

/* =========================================
   7. VALIDAR CONTRASEÑA
========================================= */
function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        showFieldError(passwordInput, passwordError, "La contraseña es obligatoria.");
        return false;
    }

    if (password.length < 8) {
        showFieldError(passwordInput, passwordError, "La contraseña debe tener al menos 8 caracteres.");
        return false;
    }

    clearFieldError(passwordInput, passwordError);
    return true;
}

/* =========================================
   8. VALIDACIÓN EN TIEMPO REAL
========================================= */
emailInput.addEventListener("blur", function () {
    if (emailInput.value.trim() !== "") validateEmail();
});

passwordInput.addEventListener("blur", function () {
    if (passwordInput.value !== "") validatePassword();
});

emailInput.addEventListener("input", function () {
    clearFieldError(emailInput, emailError);
    clearMessage();
});

passwordInput.addEventListener("input", function () {
    clearFieldError(passwordInput, passwordError);
    clearMessage();
});

/* =========================================
   9. ENVÍO DEL FORMULARIO
========================================= */
loginForm.addEventListener("submit", function (event) {
    // Evita que el formulario recargue la página.
    event.preventDefault();
    clearMessage();

    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();

    // Detener el proceso si hay errores.
    if (!emailIsValid || !passwordIsValid) {
        showMessage("Corrige los errores antes de continuar.", "error");
        if (!emailIsValid) emailInput.focus();
        else passwordInput.focus();
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Guardar o eliminar solamente el correo.
    if (rememberEmail.checked) {
        localStorage.setItem("rememberedEmail", email);
    } else {
        localStorage.removeItem("rememberedEmail");
    }

    // AUTENTICACIÓN SIMULADA (solo para fines educativos).
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        showMessage("¡Bienvenido! Has iniciado sesión correctamente.", "success");
    } else {
        showMessage("Credenciales incorrectas. Verifica tu correo y contraseña.", "error");
    }
});

/* =========================================
   10. RECUPERAR CONTRASEÑA (DEMO)
========================================= */
forgotPassword.addEventListener("click", function (event) {
    event.preventDefault();
    alert("Función demostrativa: la recuperación de contraseña no está implementada.");
});
