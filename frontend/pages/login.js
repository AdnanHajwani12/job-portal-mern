import { useState } from "react";
import Layout from "../components/Layout";
import { apiFetch } from "../utils/api";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveAuth(data.token, data.user);
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login to Job Portal
          </h1>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full border border-gray-400 p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-400 p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}