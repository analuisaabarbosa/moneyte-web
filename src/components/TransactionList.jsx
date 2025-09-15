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
  >
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const TransactionList = ({ transactions }) => {
  return (
    <section
      className="border border-white/20 bg-white/10 rounded-2xl p-6"
      aria-labelledby="transacoes-heading"
    >
      <h2
        id="transacoes-heading"
        className="text-2xl font-bold mb-4 text-white"
      >
        Transações Recentes
      </h2>
      <div className="p-4">
        {transactions.length > 0 ? (
          <ul>
            {transactions.slice(0, 5).map((transaction) => (
              <li
                key={transaction._id}
                className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white/5 border border-white/20 rounded-xl mb-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      transaction.type === "receita"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.type === "receita" ? (
                      <TrendingUpIcon />
                    ) : (
                      <TrendingDownIcon />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(transaction.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 text-right mt-2 sm:mt-0">
                  <p
                    className={`font-bold ${
                      transaction.type === "receita"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type === "receita" ? "+" : "-"}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <button className="hover:text-blue-400 transition-colors">
                      <EditIcon />
                    </button>
                    <button className="hover:text-red-500 transition-colors">
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 p-4">
            Nenhuma transação encontrada.
          </p>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
