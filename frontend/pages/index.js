import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import JobCard from "../components/JobCard";
import { apiFetch } from "../utils/api";
import { getUser } from "../utils/auth";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const user = getUser();

  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams();
      if (type) query.append("type", type);
      if (location) query.append("location", location);

      const data = await apiFetch(`/jobs?${query.toString()}`);
      setJobs(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    const resumeLink = prompt("Enter resume link:");
    const comment = prompt("Any comment?");
    if (!resumeLink) return;

    try {
      await apiFetch(`/jobs/${jobId}/apply`, {
        method: "POST",
        body: JSON.stringify({ resumeLink, comment }),
      });
      alert("Applied successfully ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      {/* FILTER CARD */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-300 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Filter Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Location (e.g. Dubai)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="border border-slate-400 p-3 rounded-md bg-white text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Job Type (Remote / Full-time)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <button
            onClick={fetchJobs}
            className="bg-slate-900 text-white rounded-md font-semibold
                       hover:bg-slate-800 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="bg-white p-8 rounded-xl border border-slate-300">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6">
          Available Jobs
        </h1>

        {jobs.length === 0 && (
          <p className="text-slate-600">No jobs found.</p>
        )}

        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={
                user?.role === "applicant"
                  ? () => applyJob(job._id)
                  : null
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}