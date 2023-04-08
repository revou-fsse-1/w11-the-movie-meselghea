//Register Function
async function register() {
  const username = document.getElementById("username").value;
  console.log(username);
  const email = document.getElementById("email").value;
  console.log(email);
  const password = document.getElementById("password").value;
  console.log(password);
  const rePassword = document.getElementById("confirm-password").value;
  console.log(rePassword);

  if (!username) {
    alert("Please input your username");
  } else if (!email) {
    alert("Please input your email");
  } else if (!password) {
    alert("Please input your password");
  } else if (password != rePassword) {
    alert("Password do not match!");
  } else {
    try {
      const response = await fetch("http://localhost:3004/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const newUser = await response.json();
      alert(`Successfully registered with ID ${newUser.id}`);
          window.location.href = "../index.html";
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  }
}