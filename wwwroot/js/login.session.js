document.addEventListener("DOMContentLoaded", function () {
  setupLoginForm();
  setupRgistForm();
});

function setupLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("loginName").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("http://localhost:8000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserName: username, Password: password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.token);
          window.location.href = "http://localhost:5039/Home/Index";
        } else {
          const errorText = await response.text();
          alert(`Unable to login: ${errorText}`);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(`Error occurred: ${error.message}`);
      }
    });
  } else {
    console.error("Login form not found");
  }
}
async function setupRgistForm() {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("registerName").value;
      const password = document.getElementById("registerPassword").value;

      try {
        const response = await fetch("http://localhost:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserName: username, Password: password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.token);
          window.location.href = "http://localhost:5039/user/product";
        } else {
          const errorText = await response.text();
          alert(`Unable to register: ${errorText}`);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(`Error occurred: ${error.message}`);
      }
    });
  } else {
    console.error("Register form not found");
  }
}
