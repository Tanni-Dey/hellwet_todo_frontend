import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [passError, setPassError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cPassword = e.target.cPassword.value;
    if (password === cPassword) {
      createUserWithEmailAndPassword(email, password);
      setPassError("");
    } else {
      setPassError("Password and Confirm Password Not Same");
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <>
      <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              className="input input-bordered mb-5 input-md w-full max-w-xs"
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              required
            />
            <input
              className="input input-bordered mb-5 input-md w-full max-w-xs"
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
            />
            <input
              className="input input-bordered mb-5 input-md w-full max-w-xs"
              type="password"
              name="cPassword"
              placeholder="Enter Confirm Password"
              required
            />
            <p className="text-error">{passError}</p>
            <p>{error?.message}</p>
            <div className="card-actions justify-center">
              <button className="btn w-full btn-accent" type="submit">
                Sigu Up
              </button>
            </div>
          </form>

          <p>
            Already Have an Account ?{" "}
            <Link className="text-secondary" to="/login">
              Login
            </Link>
          </p>
          <div className="divider mx-auto max-w-xs">OR</div>

          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline w-full max-w-xs"
          >
            Google Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
