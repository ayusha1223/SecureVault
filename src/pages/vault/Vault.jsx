import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getVaults } from "../../services/vaultService";

const Vault = () => {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVaults();
  }, []);

  const loadVaults = async () => {
    try {
      const data = await getVaults();
      setVaults(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            My Password Vault
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all your saved passwords.
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vaults.map((vault) => (
              <div
                key={vault._id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold">
                  {vault.websiteName}
                </h2>

                <p className="mt-2 text-slate-500">
                  {vault.username}
                </p>

                <p className="mt-2 text-sm">
                  {vault.email}
                </p>

                <span className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {vault.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vault;