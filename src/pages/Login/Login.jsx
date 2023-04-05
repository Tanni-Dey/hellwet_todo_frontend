import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };
  if (loading) {
    return "";
  }

  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <>
      <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              className="input input-bordered mb-5 input-md w-full max-w-xs"
              type="email"
              name="email"
              placeholder="Enter your Email Address"
            />

            <input
              className="input input-bordered mb-5 input-md w-full max-w-xs"
              type="password"
              name="password"
              placeholder="Enter your Password"
            />
            <div className="card-actions justify-center">
              <button className="btn btn-accent w-full" type="submit">
                Login
              </button>
            </div>
          </form>

          <p>
            Create an Account ?{" "}
            <Link className="text-secondary" to="/signup">
              Sign up
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

export default Login;
