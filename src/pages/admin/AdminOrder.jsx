import React from 'react';
import { useGetOrdersQuery } from '../../services/apiSlice';

const AdminOrders = () => {
    const { data: orders, error, isLoading } = useGetOrdersQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching orders: {error.message}</p>;
     console.log(orders.data.length)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Buyurtmalar</h1>
            {orders.data.length === 0 ? (
                <p>Buyurtmalar mavjud emas.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Foydalanuvchi ID</th>
                            <th className="py-2 px-4 border-b">Umumiy Narx</th>
                            <th className="py-2 px-4 border-b">Sana</th>
                            <th className="py-2 px-4 border-b">Savatcha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((order) => (
                            <tr key={order.id}>
                                <td className="py-2 px-4 border-b">{order.id}</td>
                                <td className="py-2 px-4 border-b">{order.user_id}</td>
                                <td className="py-2 px-4 border-b">{order.total_price} UZS</td>
                                <td className="py-2 px-4 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">
                                    <ul>
                                        {order.basket_items.map((item) => (
                                            <li key={item.id}>
                                                {item.name} - {item.quantity} x {item.price} UZS
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminOrders;
