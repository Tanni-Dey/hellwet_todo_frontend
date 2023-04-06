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
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="flex justify-center">
          <div className="card w-96 my-20 glass">
            <div className="card-body">
              <h2 className="card-title text-2xl text-white">Login</h2>
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
                  <button
                    className="btn w-full hover:opacity-70 text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 border-0"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="text-white">
                Create an Account ?{" "}
                <Link className="text-black hover:text-white" to="/signup">
                  Sign up
                </Link>
              </p>
              <div className="divider mx-auto max-w-xs text-white">OR</div>

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

export default Login;
