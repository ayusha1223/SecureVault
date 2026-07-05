import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../components/AdminLayout";

import {
  getSystemSettings,
  updateSystemSettings,
} from "../../services/adminService";

const defaultSettings = {
  autoLogout: 15,
  loginAttempts: 5,
  lockDuration: 15,
  passwordExpiry: 90,

  requireEmailVerification: true,
  enableMFA: false,

  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,

  notifyRegistration: true,
  notifyPasswordReset: true,
  notifyAccountLocked: true,
};

const Settings = () => {
  const [settings, setSettings] =
    useState(defaultSettings);

  useEffect(() => {
  loadSettings();
}, []);

const loadSettings = async () => {
  try {
    const response = await getSystemSettings();

    setSettings(response.data);
  } catch (err) {
    console.error(err);

    toast.error("Failed to load settings");
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : Number(value),
    }));
  };

  const saveSettings = async () => {
  try {
    await updateSystemSettings(settings);

    toast.success("Settings updated successfully.");
  } catch (err) {
    console.error(err);

    toast.error("Failed to update settings.");
  }
};

  return (
    <AdminLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Admin Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure SecureVault system settings.
          </p>

        </div>

        {/* Security */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Security
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label>
                Auto Logout (minutes)
              </label>

              <input
                type="number"
                name="autoLogout"
                value={settings.autoLogout}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label>
                Maximum Login Attempts
              </label>

              <input
                type="number"
                name="loginAttempts"
                value={settings.loginAttempts}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label>
                Lock Duration (minutes)
              </label>

              <input
                type="number"
                name="lockDuration"
                value={settings.lockDuration}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label>
                Password Expiry (days)
              </label>

              <input
                type="number"
                name="passwordExpiry"
                value={settings.passwordExpiry}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border p-3"
              />

            </div>

          </div>

        </div>

        {/* Authentication */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Authentication
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="requireEmailVerification"
                checked={
                  settings.requireEmailVerification
                }
                onChange={handleChange}
              />

              Require Email Verification

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="enableMFA"
                checked={settings.enableMFA}
                onChange={handleChange}
              />

              Enable MFA By Default

            </label>

          </div>

        </div>

        {/* Password Policy */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Password Policy
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="requireUppercase"
                checked={
                  settings.requireUppercase
                }
                onChange={handleChange}
              />

              Require Uppercase

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="requireLowercase"
                checked={
                  settings.requireLowercase
                }
                onChange={handleChange}
              />

              Require Lowercase

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="requireNumbers"
                checked={
                  settings.requireNumbers
                }
                onChange={handleChange}
              />

              Require Numbers

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="requireSymbols"
                checked={
                  settings.requireSymbols
                }
                onChange={handleChange}
              />

              Require Symbols

            </label>

          </div>

        </div>

        {/* Notifications */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="notifyRegistration"
                checked={
                  settings.notifyRegistration
                }
                onChange={handleChange}
              />

              Notify on New Registration

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="notifyPasswordReset"
                checked={
                  settings.notifyPasswordReset
                }
                onChange={handleChange}
              />

              Notify on Password Reset

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="notifyAccountLocked"
                checked={
                  settings.notifyAccountLocked
                }
                onChange={handleChange}
              />

              Notify when Account is Locked

            </label>

          </div>

        </div>

        <button
          onClick={saveSettings}
          className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Save Settings
        </button>

      </div>

    </AdminLayout>
  );
};

export default Settings;