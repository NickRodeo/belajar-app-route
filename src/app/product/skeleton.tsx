export default function Skeleton() {
  return (
    <>
      <div className="w-full max-w-sm bg-slate-900 animate-pulse border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 rounded-t-lg w-full aspect-[8/9] bg-slate-300 animate-pulse" />

        <div className="px-5 pb-5 flex-col gap-10">
          <div className=" h-6 rounded-lg bg-slate-300 animate-pulse my-2"></div>

          <div className=" h-5 rounded-lg bg-slate-300 animate-pulse my-2"></div>
          <div className="h-10 rounded-lg bg-slate-300 animate-pulse mt-5"></div>
        </div>
      </div>
    </>
  );
}
