import { createVault } from "../services/vaultService";

const clean = (value = "") =>
  value.replace(/^"/, "").replace(/"$/, "").trim();

export const importCSV = async (file) => {
  const text = await file.text();

  const rows = text
    .split("\n")
    .filter((row) => row.trim() !== "");

  // Remove header
  rows.shift();

  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

      if (!cols || cols.length < 9) {
        skipped++;
        continue;
      }

      const [
        websiteName,
        websiteUrl,
        username,
        email,
        password,
        category,
        favourite,
        notes,
        tags,
      ] = cols.map(clean);

      if (!websiteName || !password) {
        skipped++;
        continue;
      }

      await createVault({
        websiteName,
        websiteUrl,
        username,
        email,
        password,
        category,
        favourite: favourite === "true",
        notes,
        tags: tags
          ? tags.split("|").filter(Boolean)
          : [],
      });

      imported++;
    } catch (err) {
      console.error(err);
      skipped++;
    }
  }

  return {
    imported,
    skipped,
  };
};