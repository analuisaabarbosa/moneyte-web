import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setError(null);

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
    }
  };

  return (
    <main className="flex min-h-screen p-4 items-center justify-center">
      <AuthForm
        formType="login"
        handleSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </main>
  );
};

export default LoginPage;
