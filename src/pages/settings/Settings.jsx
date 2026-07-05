import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoLogout: 15,
    defaultLength: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    clipboardClear: 30,
  });

  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    toast.success("Settings Saved");
  };

  const update = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const enableMFA = async () => {
  try {
    await api.post("/auth/mfa/enable");

    toast.success("Two-Factor Authentication Enabled");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to enable MFA"
    );
  }
};

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure SecureVault preferences.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Password Generator
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label>Default Length</label>

              <input
                type="number"
                min="8"
                max="64"
                value={settings.defaultLength}
                onChange={(e) =>
                  update(
                    "defaultLength",
                    Number(e.target.value)
                  )
                }
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label>Auto Logout (minutes)</label>

              <input
                type="number"
                min="1"
                max="120"
                value={settings.autoLogout}
                onChange={(e) =>
                  update(
                    "autoLogout",
                    Number(e.target.value)
                  )
                }
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div className="mt-8 space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.uppercase}
                onChange={(e) =>
                  update(
                    "uppercase",
                    e.target.checked
                  )
                }
              />
              Require Uppercase
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.lowercase}
                onChange={(e) =>
                  update(
                    "lowercase",
                    e.target.checked
                  )
                }
              />
              Require Lowercase
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.numbers}
                onChange={(e) =>
                  update(
                    "numbers",
                    e.target.checked
                  )
                }
              />
              Require Numbers
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.symbols}
                onChange={(e) =>
                  update(
                    "symbols",
                    e.target.checked
                  )
                }
              />
              Require Symbols
            </label>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Security
          </h2>

          <div className="space-y-5">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  update(
                    "darkMode",
                    e.target.checked
                  )
                }
              />
              Dark Mode
            </label>

            <div>
              <label>
                Clipboard Auto Clear (seconds)
              </label>

              <input
                type="number"
                value={settings.clipboardClear}
                onChange={(e) =>
                  update(
                    "clipboardClear",
                    Number(e.target.value)
                  )
                }
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

          </div>
          <hr className="my-6" />

<div>
  <h3 className="mb-2 text-lg font-semibold">
    Two-Factor Authentication
  </h3>

  <p className="mb-4 text-sm text-slate-500">
    Add an extra layer of security by requiring
    a one-time verification code during login.
  </p>

  <button
    onClick={enableMFA}
    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
  >
    Enable Two-Factor Authentication
  </button>
</div>

        </div>

        <button
          onClick={saveSettings}
          className="rounded-xl bg-blue-600 px-8 py-3 text-white"
        >
          Save Settings
        </button>

      </div>

    </DashboardLayout>
  );
};

export default Settings;