import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VaultCard from "../../components/vault/VaultCard";

import {
  getCategoryVaults,
  deleteVault,
  toggleFavourite,
} from "../../services/vaultService";

const CategoryVaults = () => {
  const { category } = useParams();

  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    loadVaults();
  }, [category]);

  const loadVaults = async () => {
    try {
      const data = await getCategoryVaults(category);
      setVaults(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteVault(id);
    loadVaults();
  };

  const handleFavourite = async (id) => {
    await toggleFavourite(id);
    loadVaults();
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            {category}
          </h1>

          <p className="text-slate-500">
            Passwords inside this category
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {vaults.map((vault) => (
            <VaultCard
              key={vault._id}
              vault={vault}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={handleDelete}
              onFavourite={handleFavourite}
            />
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default CategoryVaults;