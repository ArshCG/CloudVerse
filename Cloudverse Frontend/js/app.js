const sign_in_btn = document.querySelector("#login");
const sign_up_btn = document.querySelector("#signup");
console.log("sign in button  =>", sign_in_btn);
console.log("sign up button  ==>", sign_up_btn);

const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function register2() {
  var username = document.getElementById("username");

  var password = document.getElementById("password");

  var su = document.getElementById("signup");

  var abc = new Date();

  // su.addEventListener("click",function(){

  fetch("http://localhost:58604/api/register", {
    method: "POST",

    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      username: username.value,

      password: CryptoJS.MD5(password.value).toString(),

      createdAt: abc.toISOString(),
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => console.log(data))

    .catch((error) => console.log(error));
}

var userid = 0;

function login2() {
  console.log("Inside login 2");
  var username2 = document.getElementById("username2");

  var password2 = document.getElementById("password2");

  var lg = document.getElementById("login");

  // lg.addEventListener("click", function(){
  fetch("http://localhost:58604/api/login", {
    method: "POST",
    mode: "cors",

    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      username: username2.value,

      password: CryptoJS.MD5(password2.value).toString(),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => showstorage(data))
    .catch((error) => console.log(error));
}

function showstorage(data) {
  if (data.token != null && data.token != undefined && data.token != "") {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userid", data.id);
    sessionStorage.setItem("Name", username2.value);
  }

  loc();
}

function loc() {
  if (sessionStorage.getItem("token") != null) {
    window.location.href = "folder.html";
  } else {
    alert("Login Credentials are wrong");
  }
}

function cloud() {
  var x = document.getElementById("cloudverse");
  if (x.style.display === "none") {
    x.style.display = "inline";
    x.style.marginLeft = "45px";
  } else {
    x.style.display = "none";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index1.html";
}

function support() {
  Swal.fire({
    title: "Your query is submitted",
    text: "We will revert back to you shortly!",
    icon: "success",
    confirmButtonColor: "green",
    confirmButtonText: "OK",
  });
}
