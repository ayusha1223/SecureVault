import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VaultCard from "../../components/vault/VaultCard";

import {
  getVaults,
  deleteVault,
  toggleFavourite,
} from "../../services/vaultService";

const Vault = () => {
  const navigate = useNavigate();

  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadVaults();
  }, []);

  const loadVaults = async () => {
    try {
      const data = await getVaults();
      setVaults(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteVault(id);

    setVaults((prev) =>
      prev.filter((v) => v._id !== id)
    );
  };

  const handleFavourite = async (id) => {
    await toggleFavourite(id);
    loadVaults();
  };

  const filteredVaults = useMemo(() => {
    return vaults.filter((v) => {
      const q = search.toLowerCase();

      return (
        v.websiteName.toLowerCase().includes(q) ||
        v.username.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q)
      );
    });
  }, [vaults, search]);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Password Vault
            </h1>

            <p className="mt-2 text-slate-500">
              Securely manage all your credentials.
            </p>

          </div>

          <button
            onClick={() => navigate("/vault/new")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <FiPlus />
            Add Password
          </button>

        </div>

        <div className="relative">

          <FiSearch
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            placeholder="Search passwords..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : filteredVaults.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white py-24 text-center">

            <h2 className="text-3xl font-bold">
              No Passwords
            </h2>

            <p className="mt-3 text-slate-500">
              Add your first password to SecureVault.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredVaults.map((vault) => (
              <VaultCard
                key={vault._id}
                vault={vault}
                onDelete={handleDelete}
                onFavourite={handleFavourite}
                onView={(v) => console.log(v)}
                onEdit={(v) => console.log(v)}
              />
            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
};

export default Vault;