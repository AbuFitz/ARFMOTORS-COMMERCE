export default function ShopLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="animate-pulse">
          <div className="h-12 bg-neutral-200 rounded w-64 mb-4" />
          <div className="h-6 bg-neutral-200 rounded w-32 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-neutral-200 rounded-lg" />
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                <div className="h-6 bg-neutral-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
