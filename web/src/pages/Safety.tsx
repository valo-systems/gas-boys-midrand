import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Warning, CheckCircle, XCircle, Phone, ChatsCircle,
  FireSimple, Wind, ArrowRight, ShieldCheck, Question,
  SealWarning, Lightbulb, ArrowDown,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

// ── DO / DON'T flip cards ─────────────────────────────────────────────────────
const FLIP_CARDS = [
  {
    do:   { title: 'Store cylinders upright', body: 'Always keep cylinders standing vertically, outdoors or in a well-ventilated space — never in a basement or enclosed room.' },
    dont: { title: 'Store cylinders on their side', body: 'LPG is heavier than air. If stored horizontally or indoors, a leak will pool at floor level and become an explosion risk.' },
    icon: '🔴',
  },
  {
    do:   { title: 'Check for leaks with soapy water', body: 'Apply soapy water around valves and connections. Bubbles = leak. Turn off the valve and call us immediately.' },
    dont: { title: 'Use a naked flame to find leaks', body: 'Never hold a lighter or match near fittings to find a gas leak. This can trigger an instant explosion.' },
    icon: '💧',
  },
  {
    do:   { title: 'Ventilate before lighting', body: 'Before using any gas appliance, open windows or doors for a few seconds to clear any accumulated vapours.' },
    dont: { title: 'Use gas appliances in sealed rooms', body: 'Carbon monoxide builds up quickly in enclosed spaces. Always ensure adequate airflow — especially for heaters.' },
    icon: '💨',
  },
  {
    do:   { title: 'Turn off at the cylinder when done', body: 'After cooking or heating, close the valve at the cylinder — not just the appliance. This stops any slow leaks overnight.' },
    dont: { title: 'Leave valves open when not in use', body: 'An open valve on an unlit appliance slowly releases gas. One spark — from a phone, light switch, or fridge — is all it takes.' },
    icon: '🔧',
  },
  {
    do:   { title: 'Use SAQCC-registered installers', body: 'All gas installations in South Africa must comply with SANS 10087 and be done by a registered gas practitioner. Always ask for a CoC certificate.' },
    dont: { title: 'DIY gas installations', body: 'Illegal and dangerous. An uncertified installation voids your insurance, can kill you, and is a criminal offence under SA law.' },
    icon: '🛠️',
  },
  {
    do:   { title: 'Inspect cylinders for damage', body: 'Before connecting, check for rust, dents, bulging, or damaged valves. A damaged cylinder must not be used — return it to your supplier.' },
    dont: { title: 'Use damaged or expired cylinders', body: 'Cylinders have a test date stamped on them. Expired, corroded, or dented cylinders are structurally compromised and can rupture.' },
    icon: '🔍',
  },
]

// ── Safety quiz ───────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: 'Do you store your gas cylinder indoors or in an enclosed space (kitchen cupboard, basement, garage)?',
    safe: false,   // "yes" = unsafe
    yesLabel: 'Yes, indoors',
    noLabel: 'No, outside / ventilated',
    tip: 'Cylinders must be stored outdoors or in a space open to the sky. LPG vapour sinks and accumulates at floor level — a single spark can ignite it.',
  },
  {
    q: 'Do you turn off the cylinder valve (not just the appliance) when you\'re done cooking?',
    safe: true,    // "yes" = safe
    yesLabel: 'Yes, always',
    noLabel: 'No, just the appliance',
    tip: 'Turning off at the cylinder valve prevents any slow seepage from hoses or regulators overnight. Make it a habit.',
  },
  {
    q: 'Has your gas installation been done by a SAQCC-registered technician with a CoC certificate?',
    safe: true,
    yesLabel: 'Yes, certified',
    noLabel: 'No / I\'m not sure',
    tip: 'An uncertified installation is illegal and voids your insurance. Book a Gas Boys CoC inspection — we\'ll certify your setup.',
  },
  {
    q: 'Do you have a gas leak detector or carbon monoxide alarm in your home?',
    safe: true,
    yesLabel: 'Yes, I have one',
    noLabel: 'No, I don\'t',
    tip: 'Carbon monoxide is odourless and colourless. A CO detector is inexpensive and can save your life — especially if you use gas heaters overnight.',
  },
  {
    q: 'If you smell gas right now, do you know exactly what steps to take?',
    safe: true,
    yesLabel: 'Yes, I know the steps',
    noLabel: 'Not really sure',
    tip: 'Scroll down to our emergency protocol. Save Gas Boys number in your phone: 010 023 0000',
  },
]

// ── Cylinder checklist ────────────────────────────────────────────────────────
const CHECKLIST = [
  'Cylinder is stored upright and outdoors / well-ventilated',
  'No visible rust, dents, or physical damage to the cylinder body',
  'Valve cap is intact and closes properly',
  'Regulator is SABS approved and shows no cracks or wear',
  'Hose is flexible, has no cracks, kinks, or perishing',
  'All connections are tight — tested with soapy water',
  'Installation has a valid CoC certificate',
  'A CO detector is installed in the same room as gas appliances',
]

// ── Emergency steps ───────────────────────────────────────────────────────────
const EMERGENCY_STEPS = [
  { icon: '🚫', action: 'Don\'t touch any switches', detail: 'No light switches, power points, or appliances. Even a spark from a switch can ignite accumulated gas.' },
  { icon: '📵', action: 'Put your phone away', detail: 'Don\'t use your mobile near the leak. Walk to another room or outside before making any calls.' },
  { icon: '🪟', action: 'Open windows and doors', detail: 'Ventilate the space immediately. LPG is heavier than air — open low windows to let it escape.' },
  { icon: '🔴', action: 'Turn off the cylinder valve', detail: 'Rotate the valve clockwise (right) until it stops. Don\'t force it. If it won\'t close, leave it and evacuate.' },
  { icon: '🚪', action: 'Evacuate the building', detail: 'Get everyone out — people and pets. Don\'t re-enter until the area has been cleared by a professional.' },
  { icon: '📞', action: 'Call us from outside', detail: 'Call Gas Boys on 010 023 0000. We\'ll dispatch a technician and guide you on next steps.' },
]

// ── FlipCard component ────────────────────────────────────────────────────────
function FlipCard({ card, index }: { card: typeof FLIP_CARDS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      viewport={{ once: true }}
      className="perspective-1000 h-52 cursor-pointer"
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front — DO */}
        <div className="absolute inset-0 rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex flex-col backface-hidden">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={18} weight="fill" className="text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Do This</span>
            <span className="ml-auto text-lg">{card.icon}</span>
          </div>
          <div className="font-heading font-semibold text-sm mb-2 text-green-300">{card.do.title}</div>
          <div className="text-xs text-gas-muted leading-relaxed flex-1">{card.do.body}</div>
          <div className="text-[10px] text-gas-muted2 mt-3 text-center">Tap to see what NOT to do →</div>
        </div>

        {/* Back — DON'T */}
        <div
          className="absolute inset-0 rounded-2xl border border-red-500/30 bg-red-500/5 p-5 flex flex-col backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={18} weight="fill" className="text-red-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Never Do This</span>
            <span className="ml-auto text-lg">{card.icon}</span>
          </div>
          <div className="font-heading font-semibold text-sm mb-2 text-red-300">{card.dont.title}</div>
          <div className="text-xs text-gas-muted leading-relaxed flex-1">{card.dont.body}</div>
          <div className="text-[10px] text-gas-muted2 mt-3 text-center">← Tap to go back</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Safety() {
  // Quiz state
  const [quizStep, setQuizStep]   = useState(0)  // 0 = not started, 1-5 = question, 6 = result
  const [answers,  setAnswers]    = useState<boolean[]>([])
  const [showTip,  setShowTip]    = useState(false)

  // Checklist state
  const [checked, setChecked] = useState<boolean[]>(new Array(CHECKLIST.length).fill(false))

  // Emergency steps - reveal one by one
  const [revealedSteps, setRevealedSteps] = useState(1)

  const toggleCheck = (i: number) => setChecked(c => c.map((v, idx) => idx === i ? !v : v))
  const checkedCount = checked.filter(Boolean).length
  const checkPercent = Math.round((checkedCount / CHECKLIST.length) * 100)

  function answerQuiz(yes: boolean) {
    const q = QUIZ[quizStep - 1]
    const isSafe = q.safe ? yes : !yes
    setAnswers(a => [...a, isSafe])
    setShowTip(!isSafe)
    if (isSafe) {
      // Move on immediately if safe answer
      setTimeout(() => {
        if (quizStep >= QUIZ.length) setQuizStep(QUIZ.length + 1)
        else setQuizStep(s => s + 1)
      }, 300)
    }
  }

  function nextAfterTip() {
    setShowTip(false)
    if (quizStep >= QUIZ.length) setQuizStep(QUIZ.length + 1)
    else setQuizStep(s => s + 1)
  }

  const safeCount   = answers.filter(Boolean).length
  const quizScore   = answers.length ? Math.round((safeCount / answers.length) * 100) : 0
  const scoreColor  = quizScore >= 80 ? 'text-green-400' : quizScore >= 50 ? 'text-yellow-500' : 'text-red-400'
  const scoreBorder = quizScore >= 80 ? 'border-green-500' : quizScore >= 50 ? 'border-yellow-500' : 'border-red-500'
  const scoreLabel  = quizScore >= 80 ? 'You\'re Gas Safe! 🎉' : quizScore >= 50 ? 'Room to Improve ⚠️' : 'Action Needed! 🚨'

  return (
    <div className="pt-16 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gas-bg py-20 px-6 md:px-12">
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-orange-500/10"
              style={{ width: i * 300, height: i * 300 }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <FireSimple size={20} weight="fill" className="text-orange-400" />
              </div>
              <span className="section-label">LPG Safety · SANS 10087 Compliant</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl mb-4">
              GAS <span className="text-orange-400">SAFETY</span>
            </h1>
            <p className="text-lg text-gas-muted max-w-2xl mb-8">
              LPG is one of the safest fuels available — when handled correctly.
              Gas Boys is committed to keeping every home and business in Midrand safe.
              Test your knowledge, check your setup, and know what to do in an emergency.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#emergency" className="btn-primary py-3 px-6">
                <Warning size={16} weight="fill" /> I Smell Gas — What Do I Do?
              </a>
              <a href="#quiz" className="btn-ghost py-3 px-6">
                <Question size={16} /> Take the Safety Quiz
              </a>
            </div>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {[
              { num: '80%', label: 'of gas incidents are preventable', color: 'text-orange-400' },
              { num: 'SANS 10087', label: 'South Africa\'s gas installation standard', color: 'text-yellow-500' },
              { num: 'SAQCC', label: 'Only certified technicians should install', color: 'text-blue-400' },
              { num: '010 023 0000', label: 'Gas Boys emergency line', color: 'text-green-400' },
            ].map(s => (
              <motion.div
                key={s.label}
                className="card p-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={`font-display text-2xl mb-1 ${s.color}`}>{s.num}</div>
                <div className="text-xs text-gas-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency Protocol ───────────────────────────────────────────── */}
      <section id="emergency" className="py-20 px-6 md:px-12 bg-red-950/20 border-y border-red-500/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-2">
              <SealWarning size={24} weight="fill" className="text-red-400" />
              <span className="section-label text-red-400">Emergency Protocol</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-3">
              IF YOU <span className="text-red-400">SMELL GAS</span>
            </h2>
            <p className="text-gas-muted mb-10 max-w-xl">Follow these steps in order. Don't skip any. Every second counts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {EMERGENCY_STEPS.map((step, i) => (
              <motion.div
                key={i}
                className={`card p-5 border-l-4 ${
                  i < revealedSteps ? 'border-l-red-500 opacity-100' : 'border-l-gas-border opacity-30'
                } transition-all duration-500`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-sm font-display text-red-400">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xl mb-1">{step.icon}</div>
                    <div className="font-heading font-semibold text-sm mb-1 text-red-300">{step.action}</div>
                    <div className="text-xs text-gas-muted leading-relaxed">{step.detail}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reveal steps interactively */}
          {revealedSteps < EMERGENCY_STEPS.length ? (
            <button
              onClick={() => setRevealedSteps(s => Math.min(s + 1, EMERGENCY_STEPS.length))}
              className="flex items-center gap-2 text-sm text-red-400 border border-red-500/30 bg-red-500/10 px-5 py-2.5 rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <ArrowDown size={14} /> Reveal Step {revealedSteps + 1}
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a href="tel:0100230000" className="btn-primary py-3.5 px-6">
                <Phone size={17} weight="fill" /> Call Gas Boys: 010 023 0000
              </a>
              <a
                href="https://wa.me/27640263510?text=EMERGENCY%3A%20I%20smell%20gas%20at%20my%20property.%20Please%20help!"
                target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp py-3.5 px-6 justify-center"
              >
                <ChatsCircle size={17} weight="fill" /> WhatsApp Emergency
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── DO / DON'T flip cards ────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="section-label mb-2 block">Interactive Safety Guide</span>
            <h2 className="font-display text-5xl md:text-6xl mb-3">
              DO'S &amp; <span className="text-yellow-500">DON'TS</span>
            </h2>
            <p className="text-gas-muted">Each card shows the safe action — tap to flip it and see what to avoid.</p>
          </div>

          <style>{`
            .perspective-1000 { perspective: 1000px; }
            .backface-hidden  { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          `}</style>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FLIP_CARDS.map((card, i) => (
              <FlipCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Safety Quiz ──────────────────────────────────────────────────── */}
      <section id="quiz" className="py-20 px-6 md:px-12 bg-gas-surface border-y border-gas-border">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="section-label mb-2 block">Safety Self-Check</span>
            <h2 className="font-display text-5xl md:text-6xl mb-3">
              HOW SAFE <span className="text-yellow-500">ARE YOU?</span>
            </h2>
            <p className="text-gas-muted">5 quick questions. Find out if your gas setup meets South African safety standards.</p>
          </div>

          {/* Not started */}
          {quizStep === 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} weight="duotone" className="text-yellow-500" />
                </div>
                <div className="font-display text-3xl mb-2">READY?</div>
                <p className="text-gas-muted text-sm mb-6">5 questions · Takes 60 seconds · No personal data collected</p>
                <button onClick={() => setQuizStep(1)} className="btn-primary px-8 py-3.5 mx-auto">
                  Start Safety Check <ArrowRight size={15} weight="bold" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Active question */}
          {quizStep >= 1 && quizStep <= QUIZ.length && (
            <AnimatePresence mode="wait">
              <motion.div
                key={quizStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="flex gap-1.5 mb-6">
                  {QUIZ.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        i < quizStep - 1 ? (answers[i] ? 'bg-green-500' : 'bg-red-500') :
                        i === quizStep - 1 ? 'bg-yellow-500' : 'bg-gas-border'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-xs text-gas-muted mb-4">Question {quizStep} of {QUIZ.length}</div>

                <div className="card p-8">
                  <div className="flex items-start gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 font-display text-yellow-500">
                      {quizStep}
                    </div>
                    <div className="font-heading font-semibold text-lg leading-snug">{QUIZ[quizStep - 1].q}</div>
                  </div>

                  {!showTip ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => answerQuiz(true)}
                        className="py-4 rounded-2xl border-2 border-green-500/40 bg-green-500/10 text-green-400 font-semibold hover:bg-green-500/20 transition-all cursor-pointer"
                      >
                        <CheckCircle size={20} className="mx-auto mb-1" weight="fill" />
                        {QUIZ[quizStep - 1].yesLabel}
                      </button>
                      <button
                        onClick={() => answerQuiz(false)}
                        className="py-4 rounded-2xl border-2 border-red-500/40 bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        <XCircle size={20} className="mx-auto mb-1" weight="fill" />
                        {QUIZ[quizStep - 1].noLabel}
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 mb-4">
                        <div className="flex items-start gap-2.5">
                          <Lightbulb size={18} weight="fill" className="text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-orange-300 text-sm mb-1">Safety Tip</div>
                            <div className="text-sm text-gas-muted">{QUIZ[quizStep - 1].tip}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={nextAfterTip}
                        className="btn-primary w-full justify-center py-3"
                      >
                        {quizStep < QUIZ.length ? 'Next Question' : 'See My Results'} <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Results */}
          {quizStep > QUIZ.length && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <div className="card p-8 text-center">
                {/* Score ring */}
                <div className={`w-32 h-32 rounded-full border-4 ${scoreBorder} flex flex-col items-center justify-center mx-auto mb-6`}>
                  <div className={`font-display text-4xl ${scoreColor}`}>{quizScore}%</div>
                  <div className="text-xs text-gas-muted">Safety Score</div>
                </div>

                <div className={`font-display text-3xl mb-2 ${scoreColor}`}>{scoreLabel}</div>

                {/* Per-question breakdown */}
                <div className="grid grid-cols-5 gap-2 my-6">
                  {answers.map((safe, i) => (
                    <div key={i} className={`h-2 rounded-full ${safe ? 'bg-green-500' : 'bg-red-500'}`} title={`Q${i + 1}`} />
                  ))}
                </div>

                {quizScore < 100 && (
                  <p className="text-gas-muted text-sm mb-6">
                    {quizScore < 60
                      ? "Your setup has some serious safety risks. Let's get these fixed before they become emergencies."
                      : "You're doing well, but there's room to improve. Small fixes can make a big difference."}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {quizScore < 100 && (
                    <Link to="/book" className="btn-primary py-3 px-6">
                      Book a Safety Inspection
                    </Link>
                  )}
                  <button
                    onClick={() => { setQuizStep(0); setAnswers([]); setShowTip(false) }}
                    className="btn-ghost py-3 px-6"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Cylinder Inspection Checklist ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="section-label mb-2 block">Monthly Check</span>
            <h2 className="font-display text-5xl md:text-6xl mb-3">
              CYLINDER <span className="text-yellow-500">CHECKLIST</span>
            </h2>
            <p className="text-gas-muted">Run through this every month. Tick each item as you check it.</p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gas-muted">{checkedCount} of {CHECKLIST.length} checked</span>
              <span className={checkPercent === 100 ? 'text-green-400 font-semibold' : 'text-yellow-500'}>{checkPercent}%</span>
            </div>
            <div className="h-2 bg-gas-card2 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-colors ${checkPercent === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                animate={{ width: `${checkPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {CHECKLIST.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  checked[i]
                    ? 'border-green-500/40 bg-green-500/5'
                    : 'border-gas-border bg-gas-card hover:border-gas-border2'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checked[i] ? 'bg-green-500 border-green-500' : 'border-gas-border'
                }`}>
                  {checked[i] && <CheckCircle size={14} weight="fill" className="text-black" />}
                </div>
                <span className={`text-sm ${checked[i] ? 'text-green-300 line-through decoration-green-500/50' : 'text-gas-text2'}`}>
                  {item}
                </span>
              </motion.button>
            ))}
          </div>

          {checkPercent === 100 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6 border-green-500/30 text-center"
            >
              <CheckCircle size={36} weight="fill" className="text-green-400 mx-auto mb-3" />
              <div className="font-display text-2xl text-green-400 mb-2">ALL CLEAR!</div>
              <p className="text-gas-muted text-sm">Your cylinder setup passes the monthly check. Recheck again next month.</p>
            </motion.div>
          ) : checkedCount > 0 && checkPercent < 100 ? (
            <div className="card p-5 border-orange-500/20">
              <div className="flex items-start gap-3">
                <Warning size={18} weight="fill" className="text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gas-muted">
                  <span className="text-orange-300 font-semibold">{CHECKLIST.length - checkedCount} item{CHECKLIST.length - checkedCount > 1 ? 's' : ''} outstanding.</span>{' '}
                  If any item can't be checked, call Gas Boys — we'll inspect and fix it.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Compliance info ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-gas-surface border-t border-gas-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: 'SANS 10087',
                body: 'The South African National Standard for the installation, maintenance and use of liquefied petroleum gas. All Gas Boys work complies.',
                color: 'text-blue-400',
              },
              {
                title: 'SAQCC Gas',
                body: 'The South African Qualification and Certification Committee for Gas. All our technicians are SAQCC registered — ask to see their card.',
                color: 'text-yellow-500',
              },
              {
                title: 'CoC Certificate',
                body: 'Required by law for all gas installations. Essential for property transfers, insurance claims, and business compliance. We issue them same-day.',
                color: 'text-green-400',
              },
            ].map(c => (
              <div key={c.title} className="card p-6">
                <div className={`font-display text-2xl mb-2 ${c.color}`}>{c.title}</div>
                <div className="text-sm text-gas-muted leading-relaxed">{c.body}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wind size={18} weight="duotone" className="text-yellow-500" />
                <span className="font-heading font-semibold">Not sure if your setup is safe?</span>
              </div>
              <p className="text-sm text-gas-muted">Gas Boys offers professional safety inspections and CoC certification across Midrand and surrounds.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/book" className="btn-primary py-3 px-6 justify-center">
                Book an Inspection
              </Link>
              <a href="tel:0100230000" className="btn-ghost py-3 px-6 justify-center">
                <Phone size={15} weight="fill" /> 010 023 0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
