import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiShield,
  FiXCircle,
} from "react-icons/fi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getSecurityData } from "../../services/securityService";

const Security = () => {
  const [data, setData] = useState({
    score: 100,
    vaults: [],
    weakPasswords: [],
    reused: [],
    expired: [],
    expiringSoon: [],
  });

  useEffect(() => {
    loadSecurity();
  }, []);

  const loadSecurity = async () => {
    try {
      const result = await getSecurityData();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Security Center
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor your vault security and password health.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">

          <div className="rounded-3xl bg-green-600 p-6 text-white shadow">
            <FiShield size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.score}%
            </h2>
            <p>Security Score</p>
          </div>

          <div className="rounded-3xl bg-red-500 p-6 text-white shadow">
            <FiAlertTriangle size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.weakPasswords.length}
            </h2>
            <p>Weak Passwords</p>
          </div>

          <div className="rounded-3xl bg-orange-500 p-6 text-white shadow">
            <FiXCircle size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.reused.length}
            </h2>
            <p>Reused Passwords</p>
          </div>

          <div className="rounded-3xl bg-red-700 p-6 text-white shadow">
            <FiAlertTriangle size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.expired.length}
            </h2>
            <p>Expired</p>
          </div>

          <div className="rounded-3xl bg-yellow-500 p-6 text-white shadow">
            <FiAlertTriangle size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.expiringSoon.length}
            </h2>
            <p>Expiring Soon</p>
          </div>

          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow">
            <FiCheckCircle size={32} />
            <h2 className="mt-4 text-3xl font-bold">
              {data.vaults.length}
            </h2>
            <p>Total Passwords</p>
          </div>

        </div>

        {/* Weak Passwords */}
        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Weak Passwords
          </h2>

          {data.weakPasswords.length === 0 ? (
            <p className="text-green-600">
              No weak passwords 🎉
            </p>
          ) : (
            data.weakPasswords.map((item) => (
              <div
                key={item._id}
                className="mb-4 rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {item.websiteName}
                </h3>

                <p>{item.username}</p>

                <p className="mt-1 text-sm text-red-600">
                  Weak password detected
                </p>
              </div>
            ))
          )}
        </div>

        {/* Reused Passwords */}
        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Reused Passwords
          </h2>

          {data.reused.length === 0 ? (
            <p className="text-green-600">
              No reused passwords 🎉
            </p>
          ) : (
            data.reused.map((item) => (
              <div
                key={item._id}
                className="mb-4 rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {item.websiteName}
                </h3>

                <p>{item.username}</p>

                <p className="mt-1 text-sm text-orange-600">
                  Password is reused
                </p>
              </div>
            ))
          )}
        </div>

        {/* Expired Passwords */}
        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Expired Passwords
          </h2>

          {data.expired.length === 0 ? (
            <p className="text-green-600">
              No expired passwords 🎉
            </p>
          ) : (
            data.expired.map((item) => (
              <div
                key={item._id}
                className="mb-4 rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {item.websiteName}
                </h3>

                <p>{item.username}</p>

                <p className="mt-1 text-sm text-red-600">
                  Password expired
                </p>
              </div>
            ))
          )}
        </div>

        {/* Expiring Soon */}
        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Expiring Soon
          </h2>

          {data.expiringSoon.length === 0 ? (
            <p className="text-green-600">
              No passwords expiring soon 🎉
            </p>
          ) : (
            data.expiringSoon.map((item) => (
              <div
                key={item._id}
                className="mb-4 rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {item.websiteName}
                </h3>

                <p>{item.username}</p>

                <p className="mt-1 text-sm text-yellow-600">
                  Password expires within 7 days
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Security;