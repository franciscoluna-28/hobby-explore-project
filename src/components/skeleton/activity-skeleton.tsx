import { Skeleton } from "../ui/skeleton";

export default function ActivitySkeleton() {
  return (
    <Skeleton className="bg-slate-100 w-full h-full flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Skeleton className="w-full max-w-screen-xl h-48 m-auto bg-slate-300" />
          <Skeleton className="w-16 h-16 rounded-full bg-slate-400 absolute top-0 left-4 my-4" />
        </div>

        <div className="mx-4 my-2">
          <Skeleton className="w-full max-w-screen-xl h-8 bg-slate-300" />
          <Skeleton className="w-full max-w-screen-xl mt-4 h-4 bg-slate-300" />
          <Skeleton className="w-20 max-w-screen-xl mt-4 h-4 bg-slate-300" />
          <Skeleton className="w-24 max-w-screen-xl mt-4 h-8 bg-slate-300" />
          <Skeleton className="w-40 max-w-screen-xl mt-4 mb-2 h-8 bg-slate-300" />
        </div>
      </div>
    </Skeleton>
  );
}
