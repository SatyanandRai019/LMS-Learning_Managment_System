function RecentPayments({ payments = [] }) {
  return (
    <div className="mt-8 rounded-xl bg-slate-800 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Payments
      </h2>

      <table className="table text-white">

        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.user?.fullName || "N/A"}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No Payments Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentPayments;