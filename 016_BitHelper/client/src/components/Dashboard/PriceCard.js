const PriceCard = ({ price }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Current Bitcoin Price</h2>
      {price ? (
        <p className="text-4xl font-bold text-green-600">
          ${price.toLocaleString()}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PriceCard;