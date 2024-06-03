import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, selectCounter } from '../store';
import { increaseCount } from '../store/slices/counterSlice';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const counter = useSelector((state: RootState) => selectCounter(state));

  return (
    <div>
      <p>{counter.count}</p>
      <button onClick={() => dispatch(increaseCount())}>Increment</button>
    </div>
  );
}
