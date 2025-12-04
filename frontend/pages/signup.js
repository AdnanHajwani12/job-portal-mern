import { useState } from "react";
import Layout from "../components/Layout";
import { apiFetch } from "../utils/api";
import { saveAuth } from "../utils/auth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
      });
      saveAuth(data.token, data.user);
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create an Account
          </h1>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full border border-gray-400 p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your full name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full border border-gray-400 p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Email address"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-400 p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Create a password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                className="w-full border border-gray-400 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="applicant">Applicant</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <button className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900">
              Signup
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}