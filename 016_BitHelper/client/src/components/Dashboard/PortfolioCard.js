const PortfolioCard = ({ totalBTC, currentPrice }) => {
  const totalValue = totalBTC * currentPrice;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Portfolio</h2>
      <p className="text-xl">Holdings: <strong>{totalBTC?.toFixed(6) || 0} BTC</strong></p>
      <p className="text-2xl font-bold text-blue-600 mt-4">
        Value: ${totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
      </p>
    </div>
  );
};

export default PortfolioCard;