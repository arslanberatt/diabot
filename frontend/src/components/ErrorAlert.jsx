function ErrorAlert({ error }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
      <p className="text-red-800">{error}</p>
    </div>
  );
}

export default ErrorAlert;

