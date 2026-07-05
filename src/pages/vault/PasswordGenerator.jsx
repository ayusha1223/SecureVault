import { useState } from "react";
import {
  FiCopy,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { generatePassword } from "../../utils/passwordGenerator";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState(
    generatePassword({
      length: 16,
      ...options,
    })
  );

  const generate = () => {
    setPassword(
      generatePassword({
        length,
        ...options,
      })
    );
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied");
  };

  const toggle = (name) => {
    setOptions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Password Generator
        </h1>

        <div className="mt-8 flex">

          <input
            readOnly
            value={password}
            className="flex-1 rounded-l-xl border border-r-0 p-4 font-mono text-lg"
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

        <div className="mt-8">

          <label className="font-semibold">
            Length : {length}
          </label>

          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) =>
              setLength(Number(e.target.value))
            }
            className="mt-3 w-full"
          />

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={() =>
                toggle("uppercase")
              }
            />
            Uppercase
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={() =>
                toggle("lowercase")
              }
            />
            Lowercase
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={() =>
                toggle("numbers")
              }
            />
            Numbers
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={() =>
                toggle("symbols")
              }
            />
            Symbols
          </label>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default PasswordGenerator;