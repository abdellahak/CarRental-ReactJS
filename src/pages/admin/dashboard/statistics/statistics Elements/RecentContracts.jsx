import { useSelector } from 'react-redux';

export default function RecentContracts() {
  const contracts = useSelector((state) => state.contracts);
  const users = useSelector((state) => state.users);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">Recent Contracts</h3>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">start Date</th>
            <th className="px-4 py-2">end Date</th>
          </tr>
        </thead>
        <tbody>
          {contracts.slice(0, 5).map((contract) => (
            <tr key={contract.id}>
              <td className="border px-4 py-2">{contract.id}</td>
              <td className="border px-4 py-2">{users.find(user => user.id === contract.userId).name}</td>
              <td className="border px-4 py-2">{contract.startDate}</td>
              <td className="border px-4 py-2">{contract.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}