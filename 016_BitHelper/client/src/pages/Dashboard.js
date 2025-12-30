import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrice } from '../redux/actions/priceActions';
import { fetchTransactions } from '../redux/actions/portfolioActions';
import PriceCard from '../components/Dashboard/PriceCard';
import PortfolioCard from '../components/Dashboard/PortfolioCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.price.current);
  const { totalBTC } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPrice());
    dispatch(fetchTransactions());

    const priceInterval = setInterval(() => dispatch(fetchPrice()), 60000);
    return () => clearInterval(priceInterval);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">BitHelper Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PriceCard price={price} />
        <PortfolioCard totalBTC={totalBTC} currentPrice={price} />
      </div>
    </div>
  );
};

export default Dashboard;