import Card from '../components/Home/Card.js';
import RecentHistory from '../components/Home/RecentHistory.js';
import RecentMoney from '../components/Home/RecentMoney.js';
import RecentUser from '../components/Home/RecentUser.js'


export default function HomePage() {
 
  return (
    <div className='flex flex-col w-[100%] p-8'>
      <div className='w-[100%] h-[200px] grid grid-flow-row grid-cols-3'>
        <Card />
        <RecentMoney />
        <RecentUser />
      </div>
      <div className='mt-4'>
        <RecentHistory />
      </div>
    </div>
  );
}
