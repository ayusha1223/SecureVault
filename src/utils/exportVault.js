export const exportJSON = (vaults) => {
  const blob = new Blob(
    [JSON.stringify(vaults, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "SecureVault.json";
  link.click();

  URL.revokeObjectURL(url);
};

export const exportCSV = (vaults) => {
  const headers = [
    "websiteName",
    "websiteUrl",
    "username",
    "email",
    "password",
    "category",
    "favourite",
    "notes",
    "tags",
  ];

  const rows = vaults.map((v) => [
    `"${v.websiteName || ""}"`,
    `"${v.websiteUrl || ""}"`,
    `"${v.username || ""}"`,
    `"${v.email || ""}"`,
    `"${v.password || ""}"`,
    `"${v.category || ""}"`,
    v.favourite,
    `"${v.notes || ""}"`,
    `"${(v.tags || []).join("|")}"`,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "SecureVault.csv";

  link.click();

  URL.revokeObjectURL(url);
};