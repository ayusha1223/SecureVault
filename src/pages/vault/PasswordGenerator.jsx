import { useEffect, useState } from "react";
import {
  FiCopy,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { generatePassword } from "../../utils/passwordGenerator";

const PasswordGenerator = () => {
  const [settings, setSettings] = useState({
    defaultLength: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      const s = JSON.parse(saved);

      setSettings(s);

      setPassword(
        generatePassword({
          length: s.defaultLength,
          uppercase: s.uppercase,
          lowercase: s.lowercase,
          numbers: s.numbers,
          symbols: s.symbols,
        })
      );
    } else {
      generate();
    }
  }, []);

  const generate = () => {
    setPassword(
      generatePassword({
        length: settings.defaultLength,
        uppercase: settings.uppercase,
        lowercase: settings.lowercase,
        numbers: settings.numbers,
        symbols: settings.symbols,
      })
    );
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password Copied");
  };

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Password Generator
        </h1>

        <p className="mt-2 text-slate-500">
          Uses your Settings automatically.
        </p>

        <div className="mt-8 flex">

          <input
            readOnly
            value={password}
            className="flex-1 rounded-l-xl border border-r-0 p-4 font-mono"
          />

          <button
            onClick={copy}
            className="border border-r-0 px-5"
          >
            <FiCopy />
          </button>

          <button
            onClick={generate}
            className="rounded-r-xl border px-5"
          >
            <FiRefreshCw />
          </button>

        </div>

        <div className="mt-10 rounded-2xl bg-slate-100 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Current Settings
          </h2>

          <div className="grid gap-3 md:grid-cols-2">

            <p>
              Length:
              <strong>
                {" "}
                {settings.defaultLength}
              </strong>
            </p>

            <p>
              Uppercase:
              <strong>
                {" "}
                {settings.uppercase
                  ? "Yes"
                  : "No"}
              </strong>
            </p>

            <p>
              Lowercase:
              <strong>
                {" "}
                {settings.lowercase
                  ? "Yes"
                  : "No"}
              </strong>
            </p>

            <p>
              Numbers:
              <strong>
                {" "}
                {settings.numbers
                  ? "Yes"
                  : "No"}
              </strong>
            </p>

            <p>
              Symbols:
              <strong>
                {" "}
                {settings.symbols
                  ? "Yes"
                  : "No"}
              </strong>
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default PasswordGenerator;