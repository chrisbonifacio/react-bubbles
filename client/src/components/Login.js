import React, { useState } from "react"
import axios from "axios"

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = event => {
    event.preventDefault()
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        props.history.push("/bubbles")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changeHandler = event => {
    setCreds({
      ...creds,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div className="login-page">
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form
        style={{ display: "flex", justifyContent: "center" }}
        className="login-form"
        onSubmit={login}
      >
        <label htmlFor="username">
          <input
            style={{ width: "200px" }}
            type="text"
            name="username"
            placeholder="username"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="password">
          <input
            style={{ width: "200px" }}
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </label>
        <button style={{ width: "200px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
