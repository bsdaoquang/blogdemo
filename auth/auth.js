const data = localStorage.getItem("users");
const users = data ? JSON.parse(data) : [];

const handleSignIn = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const rePass = document.getElementById("password-repeat").value;

  if (!username || !password || !rePass) {
    alert("Vui lòng nhập đầy đủ thông tin");
  } else {
    if (password !== rePass) {
      document.getElementById("helpPassword").innerHTML =
        "Password không trùng khớp";
    } else {

        const userExesting = users.find(element => element.username === username)

        if (userExesting) {
            alert('User has is ready!')
        }else{

            const user = {
              username,
              password,
            };
      
           
      
            users.push(user);
      
            localStorage.setItem("users", JSON.stringify(users));
      
            alert("Register successfully!!!");
      
            window.history.back()
        }
    }
  }
};

const handleLogin = () => {
    const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(element => element.username === username)

  if (!user) {
    alert('user not found');
  }

  if (!user.password !== password) {
    alert('Username/Password is not correct!')
  }else{
      window.history.back()
  }

}