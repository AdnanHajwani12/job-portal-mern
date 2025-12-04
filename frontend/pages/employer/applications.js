import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiFetch } from "../../utils/api";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    apiFetch("/employer/applications")
      .then(setApplications)
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      fetchApplications();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl border border-slate-300">
        <h1 className="text-3xl font-semibold text-slate-900 mb-8">
          Job Applications
        </h1>

        {applications.length === 0 && (
          <p className="text-slate-600">
            No applications received yet.
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
                {app.job?.title}
              </h2>

              {/* Applicant info */}
              <p className="text-slate-700 mt-1">
                Applicant:{" "}
                <span className="font-medium">
                  {app.applicant.name}
                </span>{" "}
                <span className="text-slate-600">
                  ({app.applicant.email})
                </span>
              </p>

              {/* Comment */}
              <p className="text-slate-700 mt-2">
                <span className="font-medium">Comment:</span>{" "}
                {app.comment || "—"}
              </p>

              {/* Resume */}
              <a
                href={app.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-blue-700 font-medium underline"
              >
                View Resume
              </a>

              {/* Status */}
              <p className="mt-4 text-slate-800">
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

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(app._id, "Shortlisted")}
                  className="px-4 py-2 bg-green-700 text-white rounded-md
                             hover:bg-green-800 font-medium"
                >
                  Shortlist
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Rejected")}
                  className="px-4 py-2 bg-red-700 text-white rounded-md
                             hover:bg-red-800 font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}