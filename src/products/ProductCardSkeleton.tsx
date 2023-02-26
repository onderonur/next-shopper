export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 border-2 p-2 md:p-4 rounded-md animate-pulse">
      <div className="p-2">
        <div className="aspect-[12/10] bg-skeleton rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-16 h-6 mx-auto bg-skeleton rounded-md" />
        <div className="w-full max-w-[theme(spacing.48)] h-4 mx-auto bg-skeleton rounded-md" />
        <div className="w-full max-w-[theme(spacing.28)] h-4 mx-auto bg-skeleton rounded-md" />
      </div>
    </div>
  );
}
