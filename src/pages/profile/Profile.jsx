import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/userService";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    lastLogin: "",
    createdAt: "",
    isVerified: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });

      toast.success("Profile Updated");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    }
  };

  const passwordHandler = async (e) => {
    e.preventDefault();

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      toast.success("Password Changed");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Password change failed"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your account.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Personal Information
            </h2>

            <form
              onSubmit={updateHandler}
              className="space-y-5"
            >

              <input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    firstName: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="First Name"
              />

              <input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    lastName: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="Last Name"
              />

              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="Email"
              />

              <button className="rounded-xl bg-blue-600 px-8 py-3 text-white">
                Save Changes
              </button>

            </form>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Change Password
            </h2>

            <form
              onSubmit={passwordHandler}
              className="space-y-5"
            >

              <input
                type="password"
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

              <input
                type="password"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    newPassword:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

              <button className="rounded-xl bg-green-600 px-8 py-3 text-white">
                Update Password
              </button>

            </form>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Account Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <p>
              <strong>Role:</strong> {profile.role}
            </p>

            <p>
              <strong>Email Verified:</strong>{" "}
              {profile.isVerified
                ? "Yes"
                : "No"}
            </p>

            <p>
              <strong>Member Since:</strong>{" "}
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Last Login:</strong>{" "}
              {profile.lastLogin
                ? new Date(
                    profile.lastLogin
                  ).toLocaleString()
                : "Never"}
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;