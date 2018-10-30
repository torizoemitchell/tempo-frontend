document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();
  register()
  login()
})

let signUpButton = document.getElementById("sign-up")
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
//let url = 'http://localhost:5000'
let url = "https://shark-week-server.herokuapp.com"

// function showSignUpForm (event){
//   signUpForm = document.getElementById("signup-form")
//   logInForm = document.getElementById("login-form")
//
//   //console.log(signUpForm)
//   signUpForm.setAttribute("hidden", false)
//
//   // logInForm.setAttribute("hidden", true)
// }

function register (event) {
  let form = document.getElementById('signup')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (var i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if( inputName ) {
        postData[inputName] = formElements[i].value
      }
    }

    console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.post(`${url}/users`, postData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}

function login (event) {
  let form = document.getElementById('login')
  form.addEventListener('click', (ev) => {
    ev.preventDefault()
    // grab all values from the form
    let postData = {}


      let email = document.getElementById('email')
      let password = document.getElementById('password')
      postData[email.id] = email.value
      postData[password.id] = password.value

    //console.log('postData', postData);

    // axios.get that data and backend will respond with user info and all entries
    axios.get(`${url}/users/login?email=${email.value}&password=${password.value}`, postData)
    .then((response) => {
      console.log('response:', response);
      localStorage.setItem('User ID',JSON.stringify(response.data.id))
      localStorage.setItem('User Name',JSON.stringify(response.data.name))
      localStorage.setItem('User Entries',JSON.stringify(response.data.entries))
      window.location = 'http://localhost:3000/home.html'



    })
    .catch((error) => {
      console.log('error:',error)
    })

  })
}
