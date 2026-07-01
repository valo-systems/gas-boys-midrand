import { useState } from 'react'
import { ChatsCircle, CalendarCheck, User, X, Check } from '@phosphor-icons/react'
import { useBookingStore, type BookingStatus } from '../../stores/useBookingStore'

const TABS: { label: string; value: string }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

const STATUS_COLORS: Record<string, string> = {
  pending:   'text-yellow-500 bg-yellow-500/10 border-yellow-500/25',
  confirmed: 'text-blue-400   bg-blue-500/10   border-blue-500/25',
  completed: 'text-green-400  bg-green-500/10  border-green-500/25',
  cancelled: 'text-red-400    bg-red-500/10    border-red-500/25',
}

export default function BookingsList() {
  const bookings      = useBookingStore(s => s.bookings)
  const updateStatus  = useBookingStore(s => s.updateStatus)
  const assignTech    = useBookingStore(s => s.assignTech)
  const addNote       = useBookingStore(s => s.addNote)

  const [tab,       setTab]       = useState('all')
  const [expanded,  setExpanded]  = useState<string | null>(null)
  const [techInput, setTechInput] = useState('')
  const [noteInput, setNoteInput] = useState('')

  const filtered = [...bookings]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(b => tab === 'all' || b.status === tab)

  const counts: Record<string, number> = TABS.reduce((acc, t) => {
    acc[t.value] = t.value === 'all' ? bookings.length : bookings.filter(b => b.status === t.value).length
    return acc
  }, {} as Record<string, number>)

  function toggleExpand(id: string) {
    setExpanded(e => e === id ? null : id)
    setTechInput('')
    setNoteInput('')
  }

  const expandedBooking = bookings.find(b => b.id === expanded)

  const waConfirm = (b: typeof bookings[0]) =>
    `Hi ${b.customer.name}! Your Gas Boys service booking (${b.ref}) is confirmed for ${new Date(b.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })} at ${b.time}. Service: ${b.serviceType}. ${b.technicianName ? `Your technician is ${b.technicianName}.` : ''} See you then! 🔥`

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1">BOOKINGS</h1>
          <p className="text-sm text-gas-muted">{bookings.length} total · {bookings.filter(b => b.status === 'pending').length} pending</p>
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

      {/* Booking cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="card p-12 text-center text-gas-muted text-sm">No bookings in this category</div>
        )}
        {filtered.map(b => {
          const isExpanded = expanded === b.id
          const isPast = new Date(b.date) < new Date()
          return (
            <div
              key={b.id}
              className={`card overflow-hidden transition-all ${isExpanded ? 'border-yellow-500/30' : ''}`}
            >
              {/* Summary row */}
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gas-card2 transition-colors"
                onClick={() => toggleExpand(b.id)}
              >
                {/* Date block */}
                <div className="w-14 flex-shrink-0 text-center">
                  <div className="font-display text-2xl text-yellow-500 leading-none">
                    {new Date(b.date).getDate()}
                  </div>
                  <div className="text-[10px] text-gas-muted uppercase tracking-wider">
                    {new Date(b.date).toLocaleDateString('en-ZA', { month: 'short' })}
                  </div>
                  <div className="text-xs text-gas-muted mt-0.5">{b.time}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-yellow-500">{b.ref}</span>
                    {b.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                    {isPast && b.status !== 'completed' && b.status !== 'cancelled' && (
                      <span className="text-[9px] text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-full font-bold">OVERDUE</span>
                    )}
                  </div>
                  <div className="font-medium text-sm">{b.customer.name}</div>
                  <div className="text-xs text-gas-muted truncate">{b.serviceType}</div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {b.technicianName && (
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-gas-muted">
                      <User size={12} /> {b.technicianName}
                    </div>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[b.status] ?? ''}`}>
                    {b.status}
                  </span>
                  <span className="text-gas-muted text-sm">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && expandedBooking?.id === b.id && (
                <div className="border-t border-gas-border px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Customer + notes */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-gas-muted uppercase tracking-widest mb-2">Customer Details</div>
                      <div className="space-y-1.5 text-sm">
                        <div><span className="text-gas-muted">Phone: </span>
                          <a href={`tel:${b.customer.phone}`} className="text-yellow-500 hover:underline">{b.customer.phone}</a>
                        </div>
                        {b.customer.email && <div><span className="text-gas-muted">Email: </span>{b.customer.email}</div>}
                        {b.customer.address && <div><span className="text-gas-muted">Address: </span>{b.customer.address}</div>}
                      </div>
                    </div>

                    {/* Admin notes */}
                    {b.notes && (
                      <div>
                        <div className="text-xs text-gas-muted uppercase tracking-widest mb-2">Notes</div>
                        <div className="text-xs bg-gas-card2 border border-gas-border rounded-lg px-3 py-2 text-gas-muted">{b.notes}</div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input
                        className="input flex-1 text-sm py-2"
                        placeholder="Add a note…"
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && noteInput.trim()) {
                            addNote(b.id, noteInput.trim())
                            setNoteInput('')
                          }
                        }}
                      />
                      <button
                        onClick={() => { if (noteInput.trim()) { addNote(b.id, noteInput.trim()); setNoteInput('') } }}
                        className="btn-primary px-4 py-2 text-sm"
                      >Add</button>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="space-y-4">
                    {/* Assign tech */}
                    <div>
                      <div className="text-xs text-gas-muted uppercase tracking-widest mb-2">Assign Technician</div>
                      <div className="flex gap-2">
                        <input
                          className="input flex-1 text-sm py-2"
                          placeholder={b.technicianName || 'Technician name…'}
                          value={techInput}
                          onChange={e => setTechInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && techInput.trim()) {
                              assignTech(b.id, techInput.trim())
                              setTechInput('')
                            }
                          }}
                        />
                        <button
                          onClick={() => { if (techInput.trim()) { assignTech(b.id, techInput.trim()); setTechInput('') } }}
                          className="btn-secondary px-4 py-2 text-sm"
                        >
                          <User size={13} /> Assign
                        </button>
                      </div>
                    </div>

                    {/* Status actions */}
                    <div>
                      <div className="text-xs text-gas-muted uppercase tracking-widest mb-2">Update Status</div>
                      <div className="flex flex-wrap gap-2">
                        {(['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[])
                          .filter(s => s !== b.status)
                          .map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(b.id, s)}
                              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                                s === 'completed' ? 'border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20' :
                                s === 'cancelled' ? 'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20' :
                                s === 'confirmed' ? 'border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' :
                                'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'
                              }`}
                            >
                              {s === 'completed' ? <><Check size={11} className="inline mr-1" />Mark Complete</> :
                               s === 'cancelled' ? <><X size={11} className="inline mr-1" />Cancel</> :
                               s === 'confirmed' ? <><CalendarCheck size={11} className="inline mr-1" />Confirm</> :
                               'Set Pending'}
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* WhatsApp confirm */}
                    <a
                      href={`https://wa.me/27${b.customer.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(waConfirm(b))}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-whatsapp w-full justify-center py-2.5 text-sm"
                    >
                      <ChatsCircle size={16} weight="fill" /> WhatsApp Customer
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
