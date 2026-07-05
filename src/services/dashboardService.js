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
    total: health.total || 0,
    favourites: vaults.filter((v) => v.favourite).length,

    strongPasswords: health.strong || 0,
    weakPasswords: health.weak || 0,
    reusedPasswords: health.reused || 0,
    expiredPasswords: health.expired || 0,

    securityScore: health.score || 100,

    recent: vaults.slice(0, 5),
  };
};