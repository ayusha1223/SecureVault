import { getVaults } from "./vaultService";

export const getSecurityData = async () => {
  const response = await getVaults();

  const vaults = response.data || [];

  const weakPasswords = [];
  const reused = [];
  const expired = [];
  const expiringSoon = [];

  const seen = {};

  const today = new Date();

  vaults.forEach((vault) => {
    if ((vault.password || "").length < 12) {
      weakPasswords.push(vault);
    }

    if (seen[vault.password]) {
      reused.push(vault);
    } else {
      seen[vault.password] = true;
    }

    if (vault.passwordExpiry) {
      const expiry = new Date(vault.passwordExpiry);

      if (expiry < today) {
        expired.push(vault);
      } else {
        const diff =
          (expiry - today) /
          (1000 * 60 * 60 * 24);

        if (diff <= 7) {
          expiringSoon.push(vault);
        }
      }
    }
  });

  const score =
    vaults.length === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            ((vaults.length -
              weakPasswords.length -
              reused.length -
              expired.length) /
              vaults.length) *
              100
          )
        );

  return {
    vaults,
    weakPasswords,
    reused,
    expired,
    expiringSoon,
    score,
  };
};