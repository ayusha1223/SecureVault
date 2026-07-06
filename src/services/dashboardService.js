import { getVaults, getPasswordHealth } from "./vaultService";

export const getDashboardStats = async () => {
  const [vaultResponse, healthResponse] =
    await Promise.all([
      getVaults(),
      getPasswordHealth(),
    ]);

  const vaults = vaultResponse.data || [];
  const health = healthResponse.data || {};

  return {
    total: health.vaults?.length || 0,

    favourites: vaults.filter(
      (v) => v.favourite
    ).length,

    weakPasswords:
      health.weakPasswords?.length || 0,

    reusedPasswords:
      health.reused?.length || 0,

    expiredPasswords:
      health.expired?.length || 0,

    securityScore: health.score || 100,

    recent: vaults.slice(0, 5),
  };
};