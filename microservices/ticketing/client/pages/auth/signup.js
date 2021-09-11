import axios from "axios";
import React from "react";
import { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/users/signup", { email, password });
    console.log(data);
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className='form-group'>
        <label htmlFor=''>Email Address</label>
        <input
          type='text'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};

export default signup;
