document.addEventListener("DOMContentLoaded", function () {
  setupLogout();
});

async function setupLogout() {
  const token = localStorage.getItem("authToken");
  if (token) {
      const response = await fetch(
        "http://localhost:8000/api/users/validateToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Token is valid:", data);
      } else {
        throw new Error("Unauthorized");
      }
   }else{
    alert("Unauthorized: Please log in first.");
    window.location.href = "http://localhost:5039"; // Redirect to login page
    return;
   } 

    document.getElementById("logout");
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", async function (event) {
      event.preventDefault();
      // const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("http://localhost:8000/api/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Token is valid:", data);
          localStorage.removeItem("authToken");
          window.location.href = "http://localhost:5039"; // Redirect to login page
        } else {
          throw new Error("expired session");
        }
      } catch (error) {
        alert("Unauthorized: Please log in first.");
      }
    });
  
}
