import React, { useState, useContext } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";
import { Helmet } from "react-helmet";
//Maidul123$
const Signup = () => {
  const { CreateUser, setUser, updateUser, googleSignIn } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup Success",
          showConfirmButton: false,
          timer: 1500,
        });
        const user = result.user;
        const name = user.displayName;
        const photoURL = user.photoURL;
        updateUser({ displayName: name, photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            setUser(user);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSuccess(false);
    setErrorMessage("");

    // Password validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password should contain at least one lowercase letter.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password should contain at least one uppercase letter.");
      return;
    }

    CreateUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
       if(result.user)
       {
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup Success",
          showConfirmButton: false,
          timer: 1500,
        });
       }
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            setUser(user);
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
        <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className="card-body">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleSignup}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
            />
            <label className="label">Photo</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Your email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn-btn-xs absolute top-3 right-6 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>

            <br />
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
          </fieldset>
        </form>
        <button
          onClick={handleGoogleLogIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path fill="#fff" d="m0 0H512V512H0"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p>
          Already have an Account? Please{" "}
          <Link to="/login" className="text-blue-600 underline">
            LogIn
          </Link>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && (
          <p className="text-green-600">User account created successfully</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
