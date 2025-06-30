"use client";
export default function Error() {
  return (
    <div className="mt-50 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-red-500 text-center text-8xl font-medium">500</h1>
      <p className="text-md font-thin text-center">Something went wrong :/</p>
    </div>
  );
}
