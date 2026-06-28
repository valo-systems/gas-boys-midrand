import { Star } from '@phosphor-icons/react'
import { reviews, overallRating } from '../data/mock'

export default function ReviewsWidget({ limit = 3 }: { limit?: number }) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div>
            <div className="font-display text-6xl text-yellow-500 leading-none">{overallRating.average}</div>
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={16} weight="fill" className="text-yellow-500" />)}
            </div>
            <div className="text-xs text-gas-muted mt-1">Based on {overallRating.total} Google Reviews</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gas-card border border-gas-border rounded-xl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21.56 10.74H12v3.3h5.52C17.08 15.8 15.64 17 12 17a5.5 5.5 0 010-11c1.48 0 2.82.56 3.84 1.46l2.4-2.4A9 9 0 1012 21a9 9 0 009-9c0-.45-.04-.9-.12-1.26z" fill="#FFD600"/>
          </svg>
          <span className="text-sm font-semibold">Google Reviews</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.slice(0, limit).map(r => (
          <div key={r.id} className="card p-5">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} size={13} weight="fill" className="text-yellow-500" />
              ))}
            </div>
            <p className="text-sm text-gas-text2 leading-relaxed mb-4 italic">"{r.text}"</p>
            <div>
              <div className="text-sm font-semibold">{r.author}</div>
              <div className="text-xs text-gas-muted">{r.location} · {r.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
