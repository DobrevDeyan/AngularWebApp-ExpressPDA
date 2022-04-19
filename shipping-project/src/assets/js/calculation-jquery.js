document.addEventListener("readystatechange", function () {
  if (document.readyState === "complete") {
    init();
  }
});

function init() {
  const signInBtn = document.querySelector(".signinBtn");
  const signUpBtn = document.querySelector(".signupBtn");
  const formBx = document.querySelector(".formBx");
  const box = document.querySelector(".loggin-wrapper");

  signUpBtn.onclick = function () {
    formBx.classList.add("active");
    box.classList.add("active");
  };
  signInBtn.onclick = function () {
    formBx.classList.remove("active");
    box.classList.remove("active");
  };
}
