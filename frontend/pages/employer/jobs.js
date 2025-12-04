import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiFetch } from "../../utils/api";
import { getUser } from "../../utils/auth";

export default function EmployerJobs() {
  const user = getUser();

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
  });

  if (!user || user.role !== "employer") {
    return (
      <Layout>
        <div className="bg-white p-6 rounded-xl border border-slate-300">
          <p className="text-red-600 font-semibold">
            Access denied. Employers only.
          </p>
        </div>
      </Layout>
    );
  }

  const fetchJobs = async () => {
    try {
      const data = await apiFetch("/jobs");
      setJobs(data.filter(j => j.employer._id === user.id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/jobs", {
        method: "POST",
        body: JSON.stringify(form),
      });
      alert("Job created ✅");
      setForm({
        title: "",
        description: "",
        location: "",
        type: "",
        salary: "",
      });
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      {/* CREATE JOB */}
      <div className="bg-white p-8 rounded-xl border border-slate-300 mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6">
          Create Job Posting
        </h1>

        <form onSubmit={createJob} className="grid gap-4">
          <input
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Job Description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <input
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Location (e.g. Dubai)"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Job Type (Full-time / Remote)"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            required
          />

          <input
            type="number"
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) =>
              setForm({ ...form, salary: e.target.value })
            }
            required
          />

          <button
            className="mt-3 bg-slate-900 text-white py-3 rounded-md
                       font-semibold hover:bg-slate-800 transition"
          >
            Create Job
          </button>
        </form>
      </div>

      {/* MY JOBS */}
      <div className="bg-white p-8 rounded-xl border border-slate-300">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          My Job Postings
        </h2>

        {jobs.length === 0 && (
          <p className="text-slate-600">
            You haven’t posted any jobs yet.
          </p>
        )}

        <ul className="space-y-4">
          {jobs.map(job => (
            <li
              key={job._id}
              className="border border-slate-300 p-5 rounded-xl"
            >
              <p className="text-lg font-semibold text-slate-900">
                {job.title}
              </p>
              <p className="text-slate-700">
                {job.location} • {job.type} • ₹{job.salary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}