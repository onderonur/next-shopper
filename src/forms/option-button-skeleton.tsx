export default function OptionButtonSkeleton() {
  return (
    <div className="w-full p-1 flex gap-2 animate-pulse">
      <div className="w-8 h-8 flex-none bg-skeleton rounded-md" />
      <div className="h-8 flex-1 bg-skeleton rounded-md" />
    </div>
  );
}
