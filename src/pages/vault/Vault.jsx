import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VaultCard from "../../components/vault/VaultCard";
import ViewPasswordModal from "../../components/vault/ViewPasswordModal";
import AddPasswordModal from "../../components/vault/AddPasswordModal";
import EditPasswordModal from "../../components/vault/EditPasswordModal";
import DeleteConfirmModal from "../../components/vault/DeleteConfirmModal";
import toast from "react-hot-toast";
import { importCSV } from "../../utils/importVault";
import {
  getVaults,
  deleteVault,
  toggleFavourite,
} from "../../services/vaultService";

import {
  exportCSV,
  exportJSON,
} from "../../utils/exportVault";

const Vault = () => {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedVault, setSelectedVault] = useState(null);
  const [editVault, setEditVault] = useState(null);
  const [deleteVaultId, setDeleteVaultId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    loadVaults();
  }, []);

  const loadVaults = async () => {
    try {
      const response = await getVaults();
      setVaults(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteVault(deleteVaultId);

      setVaults((prev) =>
        prev.filter((item) => item._id !== deleteVaultId)
      );

      setDeleteVaultId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavourite = async (id) => {
    try {
      await toggleFavourite(id);
      loadVaults();
    } catch (err) {
      console.error(err);
    }
  };
 const handleImport = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    const result = await importCSV(file);

    toast.success(
      `${result.imported} imported, ${result.skipped} skipped`
    );

    loadVaults();
  } catch (err) {
    console.error(err);

    toast.error("Import failed");
  }

  e.target.value = "";
};

  const filteredVaults = useMemo(() => {
    return vaults.filter((item) => {
      const q = search.toLowerCase();

      return (
        item.websiteName?.toLowerCase().includes(q) ||
        item.username?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q)
      );
    });
  }, [vaults, search]);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Password Vault
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your saved passwords.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

  <button
    onClick={() => exportCSV(vaults)}
    className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
  >
    Export CSV
  </button>

  <button
    onClick={() => exportJSON(vaults)}
    className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700"
  >
    Export JSON
  </button>

  <label className="cursor-pointer rounded-xl bg-amber-500 px-5 py-3 font-medium text-white hover:bg-amber-600">

    Import CSV

    <input
      type="file"
      accept=".csv"
      onChange={handleImport}
      hidden
    />

  </label>

  <button
    onClick={() => setOpenAddModal(true)}
    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
  >
    <FiPlus />
    Add Password
  </button>

</div>

        </div>

        {/* Search */}
        <div className="relative">

          <FiSearch
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search passwords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Vault List */}
        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : filteredVaults.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white py-24 text-center">

            <h2 className="text-3xl font-bold">
              No Passwords
            </h2>

            <p className="mt-3 text-slate-500">
              Add your first password.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredVaults.map((vault) => (
              <VaultCard
                key={vault._id}
                vault={vault}
                onDelete={(id) => setDeleteVaultId(id)}
                onFavourite={handleFavourite}
                onView={setSelectedVault}
                onEdit={setEditVault}
              />
            ))}

          </div>
        )}

        {/* Modals */}

        <AddPasswordModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onSuccess={loadVaults}
        />

        <EditPasswordModal
          open={!!editVault}
          vault={editVault}
          onClose={() => setEditVault(null)}
          onSuccess={loadVaults}
        />

        <DeleteConfirmModal
          open={!!deleteVaultId}
          onClose={() => setDeleteVaultId(null)}
          onDelete={confirmDelete}
        />

        <ViewPasswordModal
          vault={selectedVault}
          onClose={() => setSelectedVault(null)}
        />

      </div>
    </DashboardLayout>
  );
};

export default Vault;