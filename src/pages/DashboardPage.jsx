import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import ConfirmationDeleteModal from "../components/ConfirmationDeleteModal";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  getSummary,
  getTransactions,
  deleteTransaction,
  createTransaction,
} from "../services/transactionService";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const DashboardPage = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState("despesa");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, transactionsData] = await Promise.all([
          getSummary(),
          getTransactions(),
        ]);

        setSummary(summaryData);
        setTransactions(
          transactionsData.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError(
          "Não foi possível carregar os dados do dashboard. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setTransactionToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleOpenCreateModal = (type) => {
    setNewTransactionType(type);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;
    try {
      await deleteTransaction(transactionToDelete);

      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t._id !== transactionToDelete)
      );

      const summaryData = await getSummary();
      setSummary(summaryData);
      toast.success("Transação excluida com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
      toast.error("Não foi possível excluir a transação.");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleCreateTransaction = async (transactionData) => {
    console.log("Dados recebidos do formulário:", transactionData);
    try {
      const dataToSubmit = { ...transactionData, type: newTransactionType };
      const newTransaction = await createTransaction(dataToSubmit);

      setTransactions((prev) =>
        [newTransaction, ...prev].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );

      const summaryData = await getSummary();
      setSummary(summaryData);

      toast.success("Transação adicionada com sucesso!");
      handleCloseCreateModal();
    } catch (err) {
      console.error("Erro ao criar transação:", err);
      toast.error("Não foi possível adicionar a transação.");
    }
  };

  // -- svg icons --
  const DollarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-dollar-sign"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
  const TrendingUpIcon = () => (
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
      className="lucide lucide-trending-up"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
  const TrendingDownIcon = () => (
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
      className="lucide lucide-trending-down"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
  const ListIcon = () => (
    <svg
      className="h-4 w-4 sm:h-5 sm:w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
  // --- end ---

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto p-4">
          <p className="text-white text-center">Carregando...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto p-4">
          <p className="text-red-500 text-center">{error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-10 text-white">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user.name}</h1>
            <p className="text-gray-400">
              Gerencie suas finanças com facilidade.
            </p>
          </div>
          <button className="border border-white/20 bg-white/10 text-gray-300 hover:bg-white/20 rounded-2xl flex items-center gap-2 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">
            <ListIcon />
            Todas as Transações
          </button>
        </header>
        <section
          className="bg-white/10 p-6 rounded-2xl mb-8 border border-white/20"
          aria-labelledby="saldo-total-heading"
        >
          <header className="flex flex-col items-center border-b border-white/10 pb-6 mb-6">
            <div className="bg-purple-600 p-3 rounded-full flex items-center justify-center mb-2">
              <DollarIcon />
            </div>
            <h2
              id="saldo-total-heading"
              className="text-lg text-white font-semibold"
            >
              Saldo Total
            </h2>
            <p
              className={`text-4xl font-bold ${
                summary?.saldo < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {summary ? formatCurrency(summary.saldo) : formatCurrency(0)}
            </p>
          </header>
          <dl className="flex justify-around items-center text-center">
            <div className="flex flex-col items-center gap-1">
              <dt className="flex items-center gap-2 text-green-400">
                <TrendingUpIcon />
                <span className="text-md text-gray-400">Receitas</span>
              </dt>
              <dd className="text-xl font-semibold text-green-400">
                {summary
                  ? formatCurrency(summary.totalReceitas)
                  : formatCurrency(0)}
              </dd>
            </div>
            <div className="flex flex-col items-center gap-1">
              <dt className="flex items-center gap-2 text-red-400">
                <TrendingDownIcon />
                <span className="text-md text-gray-400">Despesas</span>
              </dt>
              <dd className="text-xl font-semibold text-red-400">
                {summary
                  ? formatCurrency(summary.totalDespesas)
                  : formatCurrency(0)}
              </dd>
            </div>
          </dl>
        </section>
        <section
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          aria-labelledby="acoes-heading"
        >
          <h2 id="acoes-heading" className="sr-only">
            Ações rápidas
          </h2>

          <ul className="contents">
            <li>
              <button
                onClick={() => handleOpenCreateModal("receita")}
                className="border border-white/20 h-full w-full bg-white/5 hover:bg-white/10 text-white p-6 rounded-2xl flex items-center gap-4 text-left transition-colors duration-200"
              >
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full flex items-center justify-center">
                  {/* + icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white">
                    Adicionar Receita
                  </span>
                  <span className="block text-gray-400 text-sm">
                    Registre dinheiro recebido
                  </span>
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpenCreateModal("despesa")}
                className="border border-white/20 h-full w-full bg-white/5 hover:bg-white/10 text-white p-6 rounded-2xl flex items-center gap-4 text-left transition-colors duration-200"
              >
                <span className="bg-gradient-to-r from-red-600 to-orange-500 p-3 rounded-full flex items-center justify-center">
                  {/* - icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white">
                    Adicionar Despesa
                  </span>
                  <span className="block text-gray-400 text-sm">
                    Registre dinheiro gasto
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </section>
        <TransactionList
          transactions={transactions}
          onDeleteClick={handleOpenDeleteModal}
        />
        <ConfirmationDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message="Tem certeza de que deseja excluir esta transação? Esta ação é permanente e não poderá ser desfeita."
        />
        <Modal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          title={
            newTransactionType === "receita"
              ? "Adicionar Receita"
              : "Adicionar Despesa"
          }
        >
          <TransactionForm
            onSubmit={handleCreateTransaction}
            onClose={handleCloseCreateModal}
            type={newTransactionType}
            setType={setNewTransactionType}
          />
        </Modal>
      </main>
    </>
  );
};

export default DashboardPage;
