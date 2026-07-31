function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-base-200 p-6 shadow">

      <h2 className="text-sm font-medium text-gray-500">
        {title}
      </h2>

      <h1 className="mt-3 text-4xl font-bold">
        {value}
      </h1>

    </div>
  );
}

export default StatCard;