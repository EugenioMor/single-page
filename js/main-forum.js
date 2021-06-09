var app = new Vue({
    el: "#app",
    data: {
        nuevos: [],
        user: null,
        password: null,
        currentUser: null,
        message: null,
        games: null,
    },
    methods: {

        show: function (mostrar, games) {
            app.nuevos = [],
                app.games = games
            document.getElementById("index").style.display = "none"
            document.getElementById("schedule").style.display = "none"
            document.getElementById("locations").style.display = "none"
            document.getElementById("forum").style.display = "none"
            document.getElementById("contact").style.display = "none"
            document.getElementById(mostrar).style.display = "block"
            app.leerBaseDeDatos();
        },

        crearNuevo: function () {
            firebase.database().ref("Messages" + app.games).push({
                user: app.currentUser,
                message: app.message,
            })
        },

        leerBaseDeDatos: function () {

            firebase.database().ref("Messages" + app.games).on('child_added', function (dataSnapshot) {
                app.nuevos.push(dataSnapshot.val());
            });
        },

        crearUsuario: function () {
            firebase.auth().createUserWithEmailAndPassword(app.user, app.password)
                .catch(function (error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                    console.log(error);
                });
        },

        iniciarSesion: function () {
            firebase.auth().signInWithEmailAndPassword(app.user, app.password)
                .catch(function (error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        },

        registerGoogle: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
            })
        },

        cerrarSesion: function () {
            firebase.auth().signOut()

        },

        configurarAuth: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    app.currentUser = user.email;
                } else {
                    app.currentUser = null;
                }
            });
        },

        configurarFirebase: function () {
            var firebaseConfig = {
                apiKey: "AIzaSyBBPGtfFwdIroR3BRVBOCPrZ0upUbL--Qw",
                authDomain: "test-database-eugenio.firebaseapp.com",
                projectId: "test-database-eugenio",
                storageBucket: "test-database-eugenio.appspot.com",
                messagingSenderId: "413761931316",
                appId: "1:413761931316:web:8740f385b83e2d73442261"
            };
            firebase.initializeApp(firebaseConfig);
        }
    }
})

app.configurarFirebase();
app.configurarAuth();
app.show('index')



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var today = new Date();
var day = today.getDate();
var year = today.getFullYear();
var hour = today.getHours();
var min = today.getMinutes();

day = ('0' + day).slice(-1);
min = ('0' + min).slice(-2);

var date = `${monthNames[today.getMonth()]}${" "}${day},${" "}${year}${" "}${hour}:${min}`
console.log(date)