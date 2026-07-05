import { useEffect, useState } from "react";
import { FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getCategories } from "../../services/vaultService";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="mt-2 text-slate-500">
            Browse passwords by category.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <FiFolder
              size={50}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-5 text-2xl font-bold">
              No Categories Found
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  navigate(`/categories/${category}`)
                }
                className="rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <FiFolder
                  size={36}
                  className="text-blue-600"
                />

                <h2 className="mt-6 text-2xl font-bold">
                  {category}
                </h2>

              </button>
            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
};

export default Categories;