export default function QuadraCardSkeleton() {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden shadow-card flex flex-col">
      <div className="h-44 shimmer" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-4 w-3/4 rounded-full shimmer" />
        <div className="h-3.5 w-1/2 rounded-full shimmer" />
        <div className="h-3.5 w-2/3 rounded-full shimmer" />
        <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[#F3F4F6]">
          <div className="h-3.5 w-16 rounded-full shimmer" />
          <div className="h-3.5 w-14 rounded-full shimmer" />
        </div>
      </div>
    </div>
  )
}
