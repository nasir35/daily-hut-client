/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const { createUser, user, googleLogin } = useAuth();
  const [pass, setPass] = useState(null);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from);
      toast.success("Registration Successful!");
    }
  }, [user, navigate, from]);

  const validatePass = (e) => {
    if (e.target.value.length >= 6 && e.target.value === pass) {
      document.getElementById("register-btn").removeAttribute("disabled");
      setFlag(false);
    } else {
      setFlag(true);
      document
        .getElementById("register-btn")
        .setAttribute("disabled", "disabled");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[name="new-pass"]').value;
    const confirm_password = e.target.querySelector(
      'input[name="confirm-pass"]'
    ).value;

    if (password === confirm_password) {
      try {
        const data = { email, password, role: "member" };
        await createUser(email, password);
        const res = await axios.post(
          "https://daily-hut-backend.vercel.app/api/v1/users",
          data
        );
        if (res?.data) {
          localStorage.setItem("token", res.data?.data);
          toast.success("registration success.", { autoClose: 1000 });
        }
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email is already in use!", { autoClose: 1000 });
        } else {
          toast.error("Failed to register. Please try again.", {
            autoClose: 2000,
          });
        }
        console.error("Error during registration:", error);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  const handleGoogleSignUp = () => {
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
      }
    });
  };

  return (
    <div className="hero xl:py-10 lg:py-8 py-5 bg-base-200">
      <div className="hero-content py-0 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="xl:text-5xl text-4xl font-bold">Register now!</h1>
          <p className="lg:py-6 py-4 lg:max-w-full md:max-w-[75%] mx-auto">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form className="card-body space-y-2" onSubmit={handleRegister}>
            <div className="grid grid-cols-12">
              <label className="label col-span-4">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="col-span-8 input input-bordered"
                required
              />
            </div>
            <div className="grid grid-cols-12">
              <label className="label col-span-4">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                name="new-pass"
                placeholder="password"
                className="col-span-8 input input-bordered"
                required
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12">
              <label className="label col-span-4">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm-pass"
                placeholder="password"
                className="col-span-8 input input-bordered"
                onChange={validatePass}
                required
              />
            </div>
            {flag && (
              <p className="text-red-500 text-xs">
                Error! password didn't match or shorter than 6 characters!
              </p>
            )}
            <label className="label">
              <p className="label-text-alt">
                By registering, you will agree to our{" "}
                <button className="text-blue-600">terms and policy.</button>
              </p>
            </label>
            <div className="form-control">
              <button className="btn btn-primary" id="register-btn" disabled>
                Register
              </button>
            </div>
            <div className="form-control">
              <button
                type="button"
                className="btn bg-orange-600 text-white"
                onClick={handleGoogleSignUp}
              >
                Sign Up with Google
              </button>
            </div>
            <div>
              <p className="text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-600">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
