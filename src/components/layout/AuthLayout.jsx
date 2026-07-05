const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl bg-slate-900 border border-slate-800">

        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">

          <h1 className="text-5xl font-bold mb-6">
            SecureVault
          </h1>

          <p className="text-lg text-blue-100 leading-8">
            Store, organize and protect all of your passwords
            using military-grade AES encryption, multi-factor
            authentication and enterprise-grade security.
          </p>

          <div className="mt-16 space-y-4 text-blue-100">

            <div>✔ AES-256 Encryption</div>

            <div>✔ Multi-Factor Authentication</div>

            <div>✔ Password Generator</div>

            <div>✔ Security Audit Logs</div>

          </div>

        </div>

        {/* Right */}

        <div className="bg-white p-12 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-slate-500 mt-2 mb-10">
            {subtitle}
          </p>

          {children}

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;