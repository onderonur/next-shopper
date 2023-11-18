export default function SelectableItemSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center gap-2 py-1">
      <div className="h-8 w-8 flex-none rounded-md bg-skeleton" />
      <div className="h-8 flex-1 rounded-md bg-skeleton" />
    </div>
  );
}
