import { getVaults } from "./vaultService";

export const getSecurityData = async () => {
  const response = await getVaults();

  const vaults = response.data || [];

  const weakPasswords = vaults.filter(
    (v) => (v.password || "").length < 12
  );

  const reused = [];

  const seen = {};

  vaults.forEach((v) => {
    if (seen[v.password]) {
      reused.push(v);
    } else {
      seen[v.password] = true;
    }
  });

  const strong =
    vaults.length -
    weakPasswords.length -
    reused.length;

  const score =
    vaults.length === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            (strong / vaults.length) * 100
          )
        );

  return {
    vaults,
    weakPasswords,
    reused,
    score,
  };
};