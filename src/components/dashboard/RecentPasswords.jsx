import {
  FiCopy,
  FiEdit2,
  FiEye,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

const RecentPasswords = ({ passwords = [] }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>
          <h2 className="text-2xl font-bold">
            Recent Passwords
          </h2>

          <p className="text-slate-500">
            Latest saved credentials
          </p>
        </div>

      </div>

      {passwords.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No passwords available.
        </div>
      ) : (
        <div className="divide-y divide-slate-200">

          {passwords.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50"
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {item.websiteName}
                </h3>

                <p className="text-slate-500">
                  {item.username}
                </p>

              </div>

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700">
                {item.category}
              </span>

              <div className="flex items-center gap-2">

                <button className="rounded-lg p-2 hover:bg-slate-200">
                  <FiEye />
                </button>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(item.password)
                  }
                  className="rounded-lg p-2 hover:bg-slate-200"
                >
                  <FiCopy />
                </button>

                <button className="rounded-lg p-2 hover:bg-slate-200">
                  <FiEdit2 />
                </button>

                <button className="rounded-lg p-2 hover:bg-slate-200">
                  <FiTrash2 />
                </button>

                <button
                  className={`rounded-lg p-2 ${
                    item.favourite
                      ? "text-yellow-500"
                      : "text-slate-400"
                  }`}
                >
                  <FiStar
                    fill={
                      item.favourite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default RecentPasswords;