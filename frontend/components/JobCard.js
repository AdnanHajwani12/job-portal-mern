export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        {job.title}
      </h3>

      <p className="text-gray-700 mt-1">
        {job.description}
      </p>

      <div className="text-sm text-gray-600 mt-3 space-y-1">
        <p>📍 Location: {job.location}</p>
        <p>💼 Type: {job.type}</p>
        <p>💰 Salary: {job.salary}</p>
      </div>

      {onApply && (
        <button
          onClick={onApply}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Apply
        </button>
      )}
    </div>
  );
}