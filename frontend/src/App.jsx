import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check,
  Clock3, Compass, Flame, MapPin, Menu, Search, Sparkles, Ticket, Users, X,
} from 'lucide-react'

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'https://gnu-rahp.onrender.com').replace(/\/$/, '')
const categories = ['All events', 'Technology', 'Creative', 'Community']
const art = [
  { className: 'art-violet', label: 'Build something brilliant', icon: '✳' },
  { className: 'art-cyan', label: 'Ideas meet momentum', icon: '⌁' },
  { className: 'art-coral', label: 'A little room to explore', icon: '◉' },
  { className: 'art-blue', label: 'Make your next move', icon: '↗' },
  { className: 'art-lime', label: 'Come curious', icon: '✳' },
]

function visitorId() {
  const key = 'campus-connect-visitor'
  let id = window.localStorage.getItem(key)
  if (!id) {
    id = globalThis.crypto?.randomUUID?.() || `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`
    window.localStorage.setItem(key, id)
  }
  return id
}

async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.error || `Request failed (${response.status})`)
  return body
}

function categoryFor(title = '') {
  const name = title.toLowerCase()
  if (/python|ai|machine|data|tech|code|robot|science/.test(name)) return 'Technology'
  if (/music|art|design|film|dance|creative/.test(name)) return 'Creative'
  return 'Community'
}

function formatDate(value) {
  if (!value) return 'DATE TO BE ANNOUNCED'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value).toUpperCase() : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date).toUpperCase()
}

function App() {
  const [events, setEvents] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All events')
  const [selected, setSelected] = useState(null)
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api('/api/events')
      if (!Array.isArray(result)) throw new Error('The events endpoint returned an unexpected response.')
      setEvents(result)
      const registrations = await Promise.all(result.map(async (event) => {
        try {
          const rows = await api(`/api/events/${encodeURIComponent(event.id)}/registrations`)
          return [event.id, Array.isArray(rows) ? rows.length : 0]
        } catch {
          return [event.id, null]
        }
      }))
      setCounts(Object.fromEntries(registrations))
    } catch (err) {
      setError(err.message || 'Could not load events from the backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadEvents() }, [loadEvents])
  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(null), 4200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const filtered = useMemo(() => events.filter((event) => {
    const matchesCategory = category === 'All events' || categoryFor(event.title) === category
    return matchesCategory && `${event.title} ${event.status || ''}`.toLowerCase().includes(query.toLowerCase())
  }), [events, query, category])

  async function joinEvent(event) {
    setBusy(event.id)
    try {
      await api('/api/registrations', {
        method: 'POST',
        body: JSON.stringify({ user_id: visitorId(), event_id: event.id }),
      })
      setNotice({ type: 'success', text: `You’re on the list for ${event.title}.` })
      await loadEvents()
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Could not reserve your place.' })
    } finally {
      setBusy('')
    }
  }

  const totalCapacity = events.reduce((sum, event) => sum + (Number(event.capacity) || 0), 0)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Campus Connect home">
          <span className="brand-mark"><Compass size={18} strokeWidth={2.4} /></span>
          <span>campus<span className="brand-light">connect</span><i>.</i></span>
        </a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a className="nav-active" href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>The campus pulse</a>
        </nav>
        <div className="topbar-right">
          <span className="api-status"><span className="status-dot" /> Live events</span>
          <a className="top-cta" href="#discover">Find your thing <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-star">✳</span> YOUR CAMPUS, IN MOTION <span className="eyebrow-line" /></div>
            <h1>Good things<br />happen <span>between</span><br />classes<span className="hero-period">.</span></h1>
            <p className="hero-description">Find the rooms where ideas take off, strangers become your people, and an ordinary Tuesday turns into a story.</p>
            <a href="#discover" className="hero-button">Explore what’s on <ArrowDownRight size={18} /></a>
            <div className="hero-footnote"><span className="tiny-avatars"><i>J</i><i>M</i><i>A</i></span><span>made for the beautifully curious</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of campus event moments">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="hero-note note-top"><Sparkles size={15} /> FIND YOUR PEOPLE</div>
            <div className="hero-sun"><span>✳</span></div>
            <div className="hero-shape shape-purple" /><div className="hero-shape shape-orange" /><div className="hero-shape shape-blue" />
            <div className="hero-sticker sticker-left">MAKE<br />SOMETHING<br /><b>MATTER</b></div>
            <div className="hero-sticker sticker-right">GOOD<br />ENERGY<br /><b>ONLY ↗</b></div>
            <div className="hero-note note-bottom"><span className="pulse-small" /> SOMETHING’S HAPPENING</div>
            <div className="hero-number">01 <span>— 05</span></div>
          </div>
          <div className="hero-side-label">A LITTLE CURIOSITY GOES A LONG WAY <span>↘</span></div>
        </section>

        <section className="ticker" aria-label="Campus event ticker">
          <div className="ticker-label"><span className="pulse-small" /> THE CAMPUS PULSE</div>
          <div className="ticker-copy">A new room. A new idea. A reason to stay a little longer.</div>
          <div className="ticker-index">CAMPUS / 2026 <span>✳</span></div>
        </section>

        <section className="intro-row" id="about">
          <div className="section-kicker"><span>01</span> OUT THERE, RIGHT NOW</div>
          <div className="intro-content"><h2>There’s more to<br />campus than <em>campus.</em></h2><p>Little gatherings. Big beginnings. The workshop you didn’t know you needed. It’s all happening somewhere close.</p></div>
          <div className="intro-metric"><span>{String(events.length).padStart(2, '0')}</span><small>GOOD REASONS<br />TO GET OUT THERE</small></div>
        </section>

        <section className="events-section" id="discover">
          <div className="events-heading">
            <div><div className="section-kicker"><span>02</span> PICK A DIRECTION</div><h2>Make a little <em>room.</em></h2></div>
            <p>Curiosity looks good on you.<br />See what’s waiting around the corner.</p>
          </div>
          <div className="filters-row">
            <div className="category-tabs" role="tablist" aria-label="Filter by category">
              {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'filter-tab active' : 'filter-tab'} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your next thing" /><kbd>⌘ K</kbd></label>
          </div>

          {error && <div className="error-panel"><div><b>We lost the campus signal.</b><span>{error}</span></div><button onClick={loadEvents}>Try again <ArrowRight size={15} /></button></div>}
          {loading && <div className="loading-grid">{[0, 1, 2].map((item) => <div className="skeleton-card" key={item}><div /><span /><span /></div>)}</div>}
          {!loading && !error && filtered.length === 0 && <div className="empty-state"><span>✳</span><h3>No events in this little corner.</h3><p>Try another search or check back soon.</p></div>}
          {!loading && filtered.length > 0 && <div className="event-grid">{filtered.map((event, index) => {
            const visual = art[index % art.length]
            const count = counts[event.id]
            const capacity = Number(event.capacity) || 0
            const places = count === null || count === undefined ? null : Math.max(0, capacity - count)
            const soldOut = capacity > 0 && places === 0
            return <article className="event-card" key={event.id}>
              <button className={`event-art ${visual.className}`} onClick={() => setSelected(event)} aria-label={`Details for ${event.title}`}>
                <span className="art-kicker">CAMPUS CONNECT <span>✳</span></span><span className="art-glyph">{visual.icon}</span><span className="art-caption">{visual.label}</span>
                <span className="art-arrow"><ArrowUpRight size={19} /></span><span className="art-date">{formatDate(event.date || event.starts_at || event.start_date)}</span>
              </button>
              <div className="event-content">
                <div className="event-tags"><span>{categoryFor(event.title)}</span><span className="event-live"><i /> {event.status || 'UPCOMING'}</span></div>
                <button className="event-title" onClick={() => setSelected(event)}>{event.title}</button>
                <div className="event-meta"><span><MapPin size={14} /> Campus gathering</span><span><Clock3 size={14} /> Details soon</span></div>
                <div className="event-bottom"><span className="spots"><Users size={14} /> {count === null ? 'RSVP count unavailable' : `${count} joined${capacity ? ` · ${places} spots left` : ''}`}</span>
                  <button className={soldOut ? 'join-button disabled' : 'join-button'} disabled={soldOut || busy === event.id} onClick={() => joinEvent(event)}>{busy === event.id ? 'Joining…' : soldOut ? 'All full' : 'I’m in'} {busy !== event.id && !soldOut && <ArrowUpRight size={15} />}</button>
                </div>
              </div>
            </article>
          })}</div>}
          <div className="events-foot"><span>SHOWING {filtered.length} OF {events.length} EXPERIENCES</span><span><span className="pulse-small" /> LIVE FROM YOUR CAMPUS API</span></div>
        </section>

        <section className="manifesto">
          <div className="manifesto-mark">✳</div><div className="manifesto-copy"><div className="section-kicker"><span>03</span> THE BEST PART IS SHOWING UP</div><h2>You don’t need<br />a plan. Just <em>a place.</em></h2><p>Bring your half-formed idea, your friend who’s “just looking,” your very specific interest. There’s a seat for you.</p><a href="#discover">See you out there <ArrowUpRight size={16} /></a></div>
          <div className="manifesto-aside"><div className="manifesto-orbit"><span>✳</span></div><div className="manifesto-stat"><b>{totalCapacity || '∞'}</b><span>ROOM FOR<br />WHAT’S NEXT</span></div><div className="manifesto-scribble">be there<br />for the<br /><em>plot twist.</em></div></div>
        </section>

        <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Compass size={17} /></span><span>campus<span className="brand-light">connect</span><i>.</i></span></a><span>GOOD THINGS HAPPEN BETWEEN CLASSES.</span><a href="#top">BACK TO THE TOP ↑</a></footer>
      </main>

      {selected && <div className="modal-backdrop" role="presentation" onClick={(event) => event.target === event.currentTarget && setSelected(null)}><section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details"><X size={19} /></button><div className="modal-kicker"><CalendarDays size={15} /> {formatDate(selected.date || selected.starts_at || selected.start_date)}</div><h2 id="modal-title">{selected.title}</h2><p>A campus experience for curious minds. Gather your people and make room for something new.</p><div className="modal-facts"><span><MapPin size={16} /> Campus gathering</span><span><Ticket size={16} /> {selected.capacity ? `${selected.capacity} places` : 'Open to campus'}</span><span><Users size={16} /> {counts[selected.id] ?? '—'} going</span></div><button className="modal-join" disabled={busy === selected.id} onClick={() => joinEvent(selected)}>{busy === selected.id ? 'Joining…' : 'Count me in'} <ArrowRight size={17} /></button><small>No account needed. A guest ID is saved in this browser for your RSVP.</small></section></div>}
      {notice && <div className={`toast ${notice.type}`}><span>{notice.type === 'success' ? <Check size={17} /> : <Flame size={17} />}</span>{notice.text}<button onClick={() => setNotice(null)} aria-label="Dismiss"><X size={15} /></button></div>}
    </div>
  )
}

export default App
