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
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="flex justify-center">
          <div className="card w-96 my-10 glass">
            <div className="card-body">
              <h2 className="card-title text-white text-2xl">Sign Up</h2>
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
                  <button
                    className="btn w-full hover:opacity-70  bg-gradient-to-r from-violet-800 to-fuchsia-800 border-0"
                    type="submit"
                  >
                    Sigu Up
                  </button>
                </div>
              </form>

              <p className="text-white">
                Already Have an Account ?{" "}
                <Link className="text-black hover:text-white" to="/login">
                  Login
                </Link>
              </p>
              <div className="divider text-white mx-auto max-w-xs">OR</div>

              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline w-full max-w-xs"
              >
                Google Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
