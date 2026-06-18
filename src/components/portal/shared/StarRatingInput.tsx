'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Props {
  value: number
  onChange: (v: number) => void
}

export default function StarRatingInput({ value, onChange }: Props) {
  const [hover, setHover] = useState(0)
  const active = hover || value

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Nota de 1 a 5 estrelas">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}`}
          className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5FA6] rounded"
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              n <= active ? 'fill-[#D97706] text-[#D97706]' : 'text-[#D1D5DB]'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
