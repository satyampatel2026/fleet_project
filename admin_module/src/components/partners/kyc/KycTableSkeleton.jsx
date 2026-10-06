export default function KycTableSkeleton() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-4 border-b border-gray-100 px-6 py-5"
        >
          <div className="h-4 rounded bg-gray-200" />

          <div className="h-4 rounded bg-gray-200" />

          <div className="h-4 rounded bg-gray-200" />

          <div className="h-4 rounded bg-gray-200" />

          <div className="h-6 w-20 rounded-full bg-gray-200" />

          <div className="ml-auto h-8 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
