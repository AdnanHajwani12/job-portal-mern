import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiFetch } from "../../utils/api";

export default function ApplicantApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    apiFetch("/applicant/applications")
      .then(setApplications)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl border border-slate-300">
        <h1 className="text-3xl font-semibold text-slate-900 mb-8">
          My Applications
        </h1>

        {applications.length === 0 && (
          <p className="text-slate-600">
            You haven’t applied to any jobs yet.
          </p>
        )}

        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border border-slate-300 rounded-xl p-6 bg-slate-50"
            >
              {/* Job title */}
              <h2 className="text-xl font-semibold text-slate-900">
                {app.job.title}
              </h2>

              {/* Job meta */}
              <p className="text-slate-700 mt-1">
                {app.job.location} • {app.job.type}
              </p>

              {/* Status */}
              <p className="mt-3 text-slate-800">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    app.status === "Shortlisted"
                      ? "text-green-700"
                      : app.status === "Rejected"
                      ? "text-red-700"
                      : "text-slate-700"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
