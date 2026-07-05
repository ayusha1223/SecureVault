const passwords = [
  {
    website: "Google",
    username: "aayush@gmail.com",
    category: "Personal",
  },
  {
    website: "GitHub",
    username: "denimdev",
    category: "Development",
  },
  {
    website: "Facebook",
    username: "aayush123",
    category: "Social",
  },
];

const RecentPasswords = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Passwords
        </h2>

        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Website</th>
              <th className="pb-3">Username</th>
              <th className="pb-3">Category</th>
            </tr>
          </thead>

          <tbody>
            {passwords.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-slate-50"
              >
                <td className="py-4 font-semibold text-slate-800">
                  {item.website}
                </td>

                <td className="py-4 text-slate-600">
                  {item.username}
                </td>

                <td className="py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {item.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPasswords;