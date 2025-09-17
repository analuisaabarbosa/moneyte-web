import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import ConfirmationDeleteModal from "../components/ConfirmationDeleteModal";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";
import { toast } from "react-toastify";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../services/transactionService";

const AllTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [editingTransactionType, setEditingTransactionType] =
    useState("despesa");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      setError("Não foi possível carregar as transações.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDeleteModal = (id) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setTransactionToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;
    try {
      await deleteTransaction(transactionToDelete);
      setTransactions((prev) =>
        prev.filter((t) => t._id !== transactionToDelete)
      );
      toast.success("Transação excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
      toast.error("Não foi possível excluir a transação.");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleOpenUpdateModal = (transaction) => {
    setEditingTransaction(transaction);
    setEditingTransactionType(transaction.type);
    setIsEditModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleUpdateTransaction = async (transactionData) => {
    if (!editingTransaction) return;
    try {
      const updated = await updateTransaction(
        editingTransaction._id,
        transactionData
      );
      setTransactions((prev) =>
        prev.map((t) => (t._id === editingTransaction._id ? updated : t))
      );
      toast.success("Transação atualizada com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
      toast.error("Não foi possível atualizar a transação.");
    } finally {
      handleCloseUpdateModal();
    }
  };

  if (loading)
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-white text-center">Carregando...</p>
      </main>
    );
  if (error)
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-white-500">{error}</p>;
      </main>
    );

  return (
    <>
      <Navbar showBackButton={true} />
      <main className="container mx-auto py-8 px-10 text-white">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Todas as Transações</h1>
          <p className="text-gray-400">
            Aqui está o histórico completo de suas finanças.
          </p>
        </header>
        <TransactionList
          transactions={transactions}
          onDeleteClick={handleOpenDeleteModal}
          onEditClick={handleOpenUpdateModal}
        />
        <ConfirmationDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message="Tem certeza de que deseja excluir esta transação? Esta ação é permanente e não poderá ser desfeita."
        />
        {editingTransaction && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={handleCloseUpdateModal}
            title="Editar Transação"
          >
            <TransactionForm
              onSubmit={handleUpdateTransaction}
              onClose={handleCloseUpdateModal}
              initialData={editingTransaction}
              type={editingTransactionType}
              setType={setEditingTransactionType}
            />
          </Modal>
        )}
      </main>
    </>
  );
};

export default AllTransactionsPage;
