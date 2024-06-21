/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const { user, signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: e.target.querySelector("input[type=email]").value,
        password: e.target.querySelector("input[type = password]").value,
        role: "member",
      };
      await signIn(data.email, data.password);
      const res = await axios.post(
        "https://daily-hut-backend.vercel.app/api/v1/users",
        data
      );
      console.log(res);
      if (res?.data) {
        localStorage.setItem("token", res.data?.data);
      }
    } catch (e) {
      toast.error(`Login Failed due to ${e.code}`);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin().then((data) => {
      if (data?.user?.email) {
        const userInfo = {
          email: data?.user?.email,
          name: data?.user?.displayName,
          role: "member",
        };
        fetch("https://daily-hut-backend.vercel.app/api/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data?.data);
          });
        toast.success("login success");
      }
    });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="xl:text-5xl text-4xl font-bold">Login now!</h1>
          <p className="lg:py-6 py-4 lg:max-w-full md:max-w-[75%] mx-auto">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 card-body">
          <form className="" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="form-control">
            <button
              className="btn bg-orange-600 text-white"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </button>
          </div>
          <div>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-600">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
