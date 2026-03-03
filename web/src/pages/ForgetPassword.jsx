import {useState} from "react";
import { forgotPassword } from "../api/authApi";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const submitPassword = () => {
        forgotPassword(email)
        .then(response => {
            alert(response.message);
        })
        .catch(error => {
            alert(error.response.data.message || "An error occurred");
        });
    }
  return (
    <>
      <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center mt-10">
            Forget Password
          </h1>
          <p className="text-center text-gray-600 mt-4">
            Enter your email to receive a password reset link.
          </p>
          <form className="max-w-md mx-auto mt-6" onSubmit={submitPassword}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
                placeholder="you@example.com"
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
