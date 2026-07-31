import { useEffect, useState } from "react";
import axiosInstance from "../../Helpers/axiosInstance";

function Payments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        async function fetchPayments() {

            const res = await axiosInstance.get("/payments");

            setPayments(res.data.payments);

        }

        fetchPayments();

    }, []);

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Payments
            </h1>

            <table className="table">

                <thead>

                    <tr>

                        <th>User</th>

                        <th>Amount</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {payments.map((payment) => (

                        <tr key={payment._id}>

                            <td>{payment.user?.fullName}</td>

                            <td>₹{payment.amount}</td>

                            <td>{payment.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Payments;