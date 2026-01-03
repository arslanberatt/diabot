function LoginForm({
  isLoginMode,
  setIsLoginMode,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleRegister,
  loading,
  error,
}) {
  return (
    <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Diyobot</div>
          <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLoginMode ? "Giriş Yap" : "Hesap Oluştur"}
          </h1>
          <p className="text-gray-600">
            {isLoginMode
              ? "Diyobot Admin Paneline hoş geldiniz"
              : "Yeni hesap oluşturun ve blog yazmaya başlayın"}
          </p>
        </div>

        {/* Toggle Login/Register */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(true);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
              isLoginMode
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition ${
              !isLoginMode
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        <form
          onSubmit={isLoginMode ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="kullaniciadi"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-semibold text-sm">
                Şifre
              </label>
              {isLoginMode && (
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Şifremi Unuttum?
                </a>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? isLoginMode
                ? "Giriş yapılıyor..."
                : "Kayıt yapılıyor..."
              : isLoginMode
              ? "Giriş Yap"
              : "Hesap Oluştur"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

