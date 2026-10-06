export default function PartnerTableSkeleton() {
  return (
    <div className="animate-pulse">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="grid grid-cols-6 gap-4 border-b border-gray-100 px-6 py-4"
        >
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-6 w-20 rounded-full bg-gray-200" />
          <div className="h-8 w-20 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
