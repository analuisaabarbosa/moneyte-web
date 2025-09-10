import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        setError(error.response.data.errors);
      } else {
        const errorMessage =
          error.response?.data?.message || "Erro no login. Tente novamente.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen p-4 items-center justify-center">
      <section className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md">
        <div className="mb-6 text-center text-white">
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path
                fill="#fff"
                d="M0 109.5v310.1c0 19.4 11.8 37.3 30.3 43.3 94 30 158.8 8.4 223.3-13.1C316 429 378 408.3 465.7 434.5c22.2 6.6 46.2-8.8 46.2-32V92.4c0-19.4-11.8-37.3-30.3-43.3-94-30-158.8-8.4-223.3 13.1C195.9 83 133.9 103.7 46.2 77.5 24 70.9-.1 86.3-.1 109.5zM256 368c-53 0-96-50.1-96-112s43-112 96-112 96 50.1 96 112-43 112-96 112zm-128.9 37.5c.7 4.4-2.8 8.1-7.2 8.1-15.7 0-32.1-1.8-50-6.1-3.5-.8-6-4-6-7.7L64 360c0-4.4 3.6-8.1 8-7.5 28.1 3.5 50.6 25.2 55.2 53zM448 354.6c0 5-4.6 8.8-9.5 8-15.4-2.5-30.2-3.9-44.4-4.3-4.9-.1-8.7-4.5-7.2-9.2 7.3-23.7 28-41.4 53.2-44.6 4.4-.5 8 3.1 8 7.5v42.6zm-8-195.1c-28.1-3.5-50.6-25.2-55.2-53-.7-4.4 2.8-8.1 7.2-8.1 15.7 0 32.1 1.8 50 6.1 3.5.8 6 4 6 7.7v39.9c0 4.4-3.6 8.1-8 7.5zm-322.1-5.8c4.9.1 8.7 4.5 7.2 9.2-7.3 23.7-28 41.4-53.2 44.6-4.4.5-8-3.1-8-7.5v-42.6c0-5 4.6-8.8 9.5-8 15.4 2.5 30.2 3.9 44.4 4.3zM240 188c-11 0-20 9-20 20 0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h48c11 0 20-9 20-20s-9-20-20-20h-4v-68c0-11-9-20-20-20h-16z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
          <p className="text-gray-300">Acesse sua conta moneyte</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="mb-2 block text-sm font-medium text-gray-300"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 text-gray-400 hover:text-white focus:outline-none"
            >
              {showPassword ? (
                // close eye icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                // open eye icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-bold text-white transition-transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md bg-red-500/20 p-3 text-sm text-red-400">
            {Array.isArray(error) ? (
              <ul className="list-disc pl-5">
                {error.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p className="before:content-['\2022'] before:mr-2">{error}</p>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem uma conta?{" "}
          <a href="#" className="font-medium text-blue-400 hover:underline">
            Cadastre-se aqui
          </a>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
