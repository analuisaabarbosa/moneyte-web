import { useState, useEffect } from "react";

const TransactionForm = ({ onSubmit, initialData = null, type, setType }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount);
      setDate(new Date(initialData.date).toISOString().split("T")[0]);
      setType(initialData.type);
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setDescription("");
    }
  }, [initialData, setType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const transactionData = {
      title,
      amount: parseFloat(amount),
      date,
      type,
      description,
    };
    onSubmit(transactionData);
  };

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <legend className="sr-only">Detalhes da Transação</legend>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tipo de Transação
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType("receita")}
            className={`px-4 py-2 text-sm font-semibold border border-white/20 rounded-lg transition-colors ${
              type === "receita"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Receita
          </button>
          <button
            type="button"
            onClick={() => setType("despesa")}
            className={`px-4 py-2 text-sm font-semibold border border-white/20 rounded-lg transition-colors ${
              type === "despesa"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Despesa
          </button>
        </div>
      </div>
      <fieldset>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mt-4"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mt-4"
          >
            Valor
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mt-4"
          >
            Descrição
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            placeholder="Digite a descrição"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300 mt-4"
          >
            Data
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            required
          />
        </div>
      </fieldset>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 transition-transform hover:scale-105"
        >
          {initialData ? "Salvar Alterações" : "Salvar Transação"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
