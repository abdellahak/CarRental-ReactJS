import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginForm({
  handleSubmit,
  identifier,
  setIdentifier,
  password,
  setPassword,
}) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
          {isEnglish ? "Login" : "تسجيل الدخول"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish
                ? "UserName or Email:"
                : "اسم المستخدم أو البريد الإلكتروني:"}
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Password:" : "كلمة المرور:"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-brand-600 rounded-md shadow-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            {isEnglish ? "Login" : "تسجيل الدخول"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isEnglish ? "Don't have an account?" : "ليس لديك حساب؟"}{" "}
            <Link
              to="/register"
              className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {isEnglish ? "Register" : "سجل"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
