async function validation() {
  const username = document.getElementById("username").value;
  console.log(username);
  const userPassword = document.getElementById("password").value;
  console.log(userPassword);

  if (!username) {
    alert("Please fill in username");
  } else if (!userPassword) {
    alert("Please fill in password");
  } else {
    try {
      const response = await fetch(
        `http://localhost:3004/users?username=${username}`
      );
      const user = await response.json();
      if (user[0].password == userPassword) {
        alert("success!");
        window.location.href = "/src/home/home.html";
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.log(error);
      alert(" Error, Please try again");
    }
  }
}