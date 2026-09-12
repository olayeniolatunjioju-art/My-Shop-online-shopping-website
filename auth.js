/* =========================================
   MY SHOP — FIREBASE AUTHENTICATION
========================================= */

const firebaseConfig = {
    apiKey: "AIzaSyCj9u6Kl8L6o3WAH5ryDuY1OFg8CsHqLCQ",
    authDomain: "my-login-app-1bf2d.firebaseapp.com",
    projectId: "my-login-app-1bf2d",
    storageBucket: "my-login-app-1bf2d.firebasestorage.app",
    messagingSenderId: "284334674092",
    appId: "1:284334674092:web:33b701ea3c2a4c75178f09",
    measurementId: "G-QM729YSRDR"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();


/* =========================================
   CHECK LOGIN STATUS
========================================= */

auth.onAuthStateChanged(function (user) {

    if (user) {

        localStorage.setItem("loggedIn", "true");

    } else {

        localStorage.removeItem("loggedIn");

        // Only redirect protected pages
        if (
            !window.location.pathname.endsWith("login.html") &&
            !window.location.pathname.endsWith("/")
        ) {
            window.location.href = "login.html";
        }
    }

});


/* =========================================
   LOGOUT
========================================= */

function logout() {

    if (!auth) {
        window.location.href = "login.html";
        return;
    }

    auth.signOut()
        .then(function () {

            localStorage.removeItem("loggedIn");

            window.location.replace("login.html");

        })
        .catch(function (error) {

            console.error("Logout failed:", error);

            alert("Logout failed. Please try again.");

        });

}
