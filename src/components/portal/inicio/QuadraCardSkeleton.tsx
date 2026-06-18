export default function QuadraCardSkeleton() {
  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-card">
      {/* Foto */}
      <div className="h-40 shimmer" />
      {/* Corpo */}
      <div className="p-4 space-y-3">
        {/* Badge */}
        <div className="h-5 w-24 rounded-pill shimmer" />
        {/* Nome */}
        <div className="h-5 w-3/4 rounded shimmer" />
        {/* Bairro */}
        <div className="h-4 w-1/2 rounded shimmer" />
        {/* Nota */}
        <div className="h-4 w-2/3 rounded shimmer" />
        {/* Botão */}
        <div className="h-9 w-full rounded-[12px] shimmer mt-2" />
      </div>
    </div>
  )
}
