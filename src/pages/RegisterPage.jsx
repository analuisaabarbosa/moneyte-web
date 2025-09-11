import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async ({ email, password, confirmPassword }) => {
    setError(null);
    if (password !== confirmPassword) {
      return setError("As senhas não conferem.");
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Falha no cadastro. Verifique os dados.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
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
