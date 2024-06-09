import Chart from '@/components/Home/Chart.js';
import Card from '../components/Home/Card.js';
import RecentHistory from '../components/Home/RecentHistory.js';
import RecentUser from '../components/Home/RecentUser.js';

export default function HomePage() {
  return (
    <div className="flex flex-col w-[100%]">
      <div className="w-[100%] h-[200px] grid grid-flow-row grid-cols-3">
        <Card />
        <Chart />
        <RecentUser />
      </div>
      <div className="mt-8">
        <RecentHistory />
      </div>
    </div>
  );
}
