import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VaultCard from "../../components/vault/VaultCard";
import {
  getVaults,
  deleteVault,
  toggleFavourite,
} from "../../services/vaultService";


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
  const handleDelete = async (id) => {
  try {
    await deleteVault(id);

    setVaults((prev) =>
      prev.filter((vault) => vault._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

const handleFavourite = async (id) => {
  try {
    await toggleFavourite(id);

    loadVaults();
  } catch (error) {
    console.error(error);
  }
};

const handleView = (vault) => {
  console.log(vault);
};

const handleEdit = (vault) => {
  console.log(vault);
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
    <VaultCard
      key={vault._id}
      vault={vault}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onView={handleView}
      onFavourite={handleFavourite}
    />
  ))}
</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vault;