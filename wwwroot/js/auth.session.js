document.addEventListener("DOMContentLoaded", function () {
  validateToken();
});
async function validateToken() {
  setupLogoutButton();
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Unauthorized: Please log in first.");
    window.location.href = "http://localhost:5039"; // Redirect to login page
    return;
  }

  try {
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
  } catch (error) {
    alert("Unauthorized: Please log in first.");
    window.location.href = "http://localhost:5039"; // Redirect to login page
  }
}
