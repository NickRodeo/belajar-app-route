import Skeleton from "./skeleton";

export default function Loading() {
  return (
    <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-3 gap-2">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={`Skeleton-${i}`} />
      ))}
    </div>
  );
}
