import { getVaults } from "./vaultService";

export const getDashboardStats = async () => {
  const response = await getVaults();

  const vaults = response.data || [];

  const favourites = vaults.filter(
    (v) => v.favourite
  ).length;

  const weakPasswords = vaults.filter(
    (v) => (v.password || "").length < 12
  ).length;

  const securityScore =
    vaults.length === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            ((vaults.length - weakPasswords) /
              vaults.length) *
              100
          )
        );

  return {
    total: vaults.length,
    favourites,
    weakPasswords,
    securityScore,
    recent: vaults.slice(0, 5),
  };
};