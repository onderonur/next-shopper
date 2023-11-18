export default function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-md border-2 p-2 md:p-4">
      <div className="p-2">
        <div className="aspect-[12/10] rounded-md bg-skeleton" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="mx-auto h-6 w-16 rounded-md bg-skeleton" />
        <div className="mx-auto h-4 w-full max-w-[theme(spacing.48)] rounded-md bg-skeleton" />
        <div className="mx-auto h-4 w-full max-w-[theme(spacing.28)] rounded-md bg-skeleton" />
      </div>
    </div>
  );
}
