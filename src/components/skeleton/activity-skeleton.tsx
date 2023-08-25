import { Skeleton } from "../ui/skeleton";

// Skeleton based on the activity card
export default function ActivitySkeleton() {
    return (
        <Skeleton className="bg-slate-100 w-80 h-full flex flex-col">
            <div className="flex flex-col gap-4">

                <div className="relative">
                    <Skeleton className="w-80 h-48 m-auto bg-slate-200" />
                    <Skeleton className="w-16 h-16 rounded-full bg-slate-300 absolute top-0 left-4 my-4 py-2" />
                </div>

                <div className="mx-4 my-2">
                    <Skeleton className="w-72 h-8 bg-slate-200" />
                    <Skeleton className="w-64 mt-4 h-4 bg-slate-200" />
                    <Skeleton className="w-24 mt-4 h-4 bg-slate-200" />
                    <Skeleton className="w-32 mt-4 h-8 bg-slate-200" />
                    <Skeleton className="w-48 mt-4 h-8 bg-slate-200" />
                </div>
            </div>
        </Skeleton>
    );
}
