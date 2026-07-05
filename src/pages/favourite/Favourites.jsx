import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import VaultCard from "../../components/vault/VaultCard";

import {
  favourites,
  deleteVault,
  toggleFavourite,
} from "../../services/vaultService";

const Favourites = () => {
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const data = await favourites();
      setVaults(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteVault(id);
    loadFavourites();
  };

  const handleFavourite = async (id) => {
    await toggleFavourite(id);
    loadFavourites();
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Favourite Passwords
          </h1>

          <p className="mt-2 text-slate-500">
            Your starred passwords.
          </p>

        </div>

        {vaults.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <h2 className="text-3xl font-bold">
              No Favourite Passwords
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {vaults.map((vault) => (
              <VaultCard
                key={vault._id}
                vault={vault}
                onDelete={handleDelete}
                onFavourite={handleFavourite}
                onView={() => {}}
                onEdit={() => {}}
              />
            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
};

export default Favourites;