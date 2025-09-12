import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password, confirmPassword }) => {
    setError(null);
    if (password !== confirmPassword) {
      return setError("As senhas não conferem.");
    }
    try {
      await register(name, email, password);
      navigate("/");
      alert("Login feito com sucesso");
    } catch (error) {
      console.error(error);
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        setError(error.response.data.errors);
      } else {
        const errorMessage =
          error.response?.data?.message || "Erro no cadastro. Tente novamente.";
        setError(errorMessage);
      }
    }
  };

  return (
    <main className="flex min-h-screen p-4 items-center justify-center">
      <AuthForm
        formType="register"
        handleSubmit={handleRegister}
        loading={loading}
        error={error}
      />
    </main>
  );
};

export default RegisterPage;
