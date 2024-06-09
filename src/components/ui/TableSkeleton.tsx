import { cn } from '../../lib/utils';
<<<<<<< HEAD
import { Skeleton } from './skeleton.tsx';
=======
import { Skeleton } from './skeleton';
>>>>>>> 07de5a7c6149ae9675458fbbf6da49f59f3a3d72

export default function ListSkeleton({ className }: { className: string }) {
  return (
    <div className={cn('w-full flex flex-col gap-8 h-[90vh]', className)}>
      <Skeleton className={'w-2/5 h-10 '} />
      <Skeleton className={'w-full h-2/3  rounded-xl'} />
      <Skeleton className={'w-2/5 h-10 self-end'} />
    </div>
  );
}
