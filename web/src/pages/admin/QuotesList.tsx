import { useState } from 'react'
import { ChatsCircle, CheckCircle, X, CurrencyDollar } from '@phosphor-icons/react'
import { useQuoteStore } from '../../stores/useQuoteStore'

const TABS: { label: string; value: string }[] = [
  { label: 'All',       value: 'all' },
  { label: 'New',       value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Responded', value: 'responded' },
  { label: 'Won',       value: 'won' },
  { label: 'Lost',      value: 'lost' },
]

const STATUS_COLORS: Record<string, string> = {
  new:        'text-yellow-500 bg-yellow-500/10 border-yellow-500/25',
  in_review:  'text-blue-400   bg-blue-500/10   border-blue-500/25',
  responded:  'text-purple-400 bg-purple-500/10 border-purple-500/25',
  won:        'text-green-400  bg-green-500/10  border-green-500/25',
  lost:       'text-red-400    bg-red-500/10    border-red-500/25',
}

export default function QuotesList() {
  const quotes   = useQuoteStore(s => s.quotes)
  const respond  = useQuoteStore(s => s.respond)
  const markWon  = useQuoteStore(s => s.markWon)
  const markLost = useQuoteStore(s => s.markLost)

  const [tab,          setTab]         = useState('all')
  const [respondId,    setRespondId]   = useState<string | null>(null)
  const [respondAmt,   setRespondAmt]  = useState('')
  const [respondNotes, setRespondNotes]= useState('')

  const filtered = [...quotes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(q => tab === 'all' || q.status === tab)

  const counts: Record<string, number> = TABS.reduce((acc, t) => {
    acc[t.value] = t.value === 'all' ? quotes.length : quotes.filter(q => q.status === t.value).length
    return acc
  }, {} as Record<string, number>)

  const respondingQuote = quotes.find(q => q.id === respondId)

  function handleRespond() {
    if (!respondId) return
    respond(respondId, parseFloat(respondAmt) || 0, respondNotes)
    setRespondId(null)
    setRespondAmt('')
    setRespondNotes('')
  }

  function buildWaMessage(q: typeof quotes[0]) {
    const lines = [
      `Hi ${q.contact}! Thanks for your Gas Boys quote request (${q.ref}).`,
      q.requirements ? `Enquiry: ${q.requirements}` : '',
      q.responseAmount != null ? `Our quote: R${q.responseAmount.toFixed(2)}` : '',
      q.responseNotes ? q.responseNotes : '',
      `Feel free to reply or call us at 010 023 0000. 🔥`,
    ].filter(Boolean).join('\n')
    return lines
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1">QUOTES</h1>
          <p className="text-sm text-gas-muted">
            {quotes.length} total · {quotes.filter(q => q.status === 'new' || q.status === 'in_review').length} open
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer flex items-center gap-2 ${
              tab === t.value
                ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'
            }`}
          >
            {t.label}
            {counts[t.value] > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                tab === t.value ? 'bg-yellow-500 text-black' : 'bg-gas-card text-gas-muted'
              }`}>{counts[t.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Quote cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="card p-12 text-center text-gas-muted text-sm">No quotes in this category</div>
        )}
        {filtered.map(q => (
          <div key={q.id} className={`card p-5 transition-all ${
            q.status === 'new' ? 'border-yellow-500/30' : ''
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs text-yellow-500">{q.ref}</span>
                  {q.status === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[q.status] ?? ''}`}>
                    {q.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="font-medium mb-0.5">{q.company}</div>
                <div className="text-sm text-gas-muted mb-0.5">Contact: {q.contact}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gas-muted mb-3">
                  <span>{q.phone}</span>
                  {q.email && <span>{q.email}</span>}
                  <span>{new Date(q.createdAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  {q.gasType && (
                    <span className="bg-gas-card2 border border-gas-border px-2.5 py-1 rounded-lg text-gas-muted">
                      {q.gasType}
                    </span>
                  )}
                  {q.volume && (
                    <span className="bg-gas-card2 border border-gas-border px-2.5 py-1 rounded-lg text-gas-muted">
                      {q.volume}
                    </span>
                  )}
                  {q.address && (
                    <span className="bg-gas-card2 border border-gas-border px-2.5 py-1 rounded-lg text-gas-muted">
                      📍 {q.address}
                    </span>
                  )}
                </div>

                {/* Requirements */}
                {q.requirements && (
                  <div className="bg-gas-card2 border border-gas-border rounded-xl px-4 py-3 text-xs text-gas-muted mb-3">
                    <span className="text-[10px] text-gas-muted2 uppercase tracking-widest block mb-1">Requirements</span>
                    {q.requirements}
                  </div>
                )}

                {/* Response if any */}
                {q.responseAmount != null && (
                  <div className="flex items-center gap-2 mt-1">
                    <CurrencyDollar size={14} className="text-green-400" />
                    <span className="text-green-400 font-display text-lg">R{q.responseAmount.toFixed(2)}</span>
                    {q.responseNotes && <span className="text-gas-muted text-xs">— {q.responseNotes}</span>}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0 min-w-[140px]">
                {/* Respond button (new/in_review) */}
                {(q.status === 'new' || q.status === 'in_review') && (
                  <button
                    onClick={() => { setRespondId(q.id); setRespondAmt(''); setRespondNotes('') }}
                    className="btn-primary py-2.5 px-4 text-sm justify-center"
                  >
                    <CurrencyDollar size={14} /> Respond
                  </button>
                )}

                {/* Won / Lost (responded) */}
                {q.status === 'responded' && (
                  <>
                    <button
                      onClick={() => markWon(q.id)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all cursor-pointer"
                    >
                      <CheckCircle size={14} weight="fill" /> Mark Won
                    </button>
                    <button
                      onClick={() => markLost(q.id)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                      <X size={14} weight="bold" /> Mark Lost
                    </button>
                  </>
                )}

                {/* WhatsApp always */}
                <a
                  href={`https://wa.me/27${q.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(buildWaMessage(q))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp justify-center py-2.5 text-sm"
                >
                  <ChatsCircle size={15} weight="fill" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Respond Modal */}
      {respondId && respondingQuote && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setRespondId(null)}>
          <div className="card p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <div className="font-heading font-semibold">Send Quote</div>
              <button onClick={() => setRespondId(null)} className="text-gas-muted hover:text-gas-text"><X size={18} /></button>
            </div>
            <div className="text-xs text-gas-muted mb-5">
              {respondingQuote.ref} · {respondingQuote.company} ({respondingQuote.contact})
            </div>

            {respondingQuote.requirements && (
              <div className="bg-gas-card2 border border-gas-border rounded-xl px-4 py-3 text-xs text-gas-muted mb-4">
                {respondingQuote.requirements}
              </div>
            )}

            <label className="label">Quote Amount (R)</label>
            <input
              className="input mb-4"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={respondAmt}
              onChange={e => setRespondAmt(e.target.value)}
              autoFocus
            />

            <label className="label">Notes / Breakdown (optional)</label>
            <textarea
              className="input resize-none mb-6"
              rows={3}
              placeholder="e.g. Includes delivery, 2× 9kg cylinders…"
              value={respondNotes}
              onChange={e => setRespondNotes(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={() => setRespondId(null)} className="btn-ghost flex-1 py-3">Cancel</button>
              <button
                onClick={handleRespond}
                disabled={!respondAmt}
                className="btn-primary flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
