import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MapPin, ArrowRight, Menu, X, ArrowUpRight, Check } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import CountUp from '../components/CountUp'
import Footer from '../components/Footer'
import { usePageMeta } from '../lib/usePageMeta'

const lands = [
  { id: 1, region: 'Тульская область', name: 'Щекинские берега', location: '200 км от Москвы', type: 'ИЖС', area: '4 га', image: '/images/tula-plan.png', link: '#/tula' },
  { id: 2, region: 'Тверская область', name: 'Светлая долина', location: '235 км от Москвы', type: 'Сельхоз', area: '170 га', image: '/images/tver-plan.png', link: '#/tver' },
  { id: 3, region: 'Крым', name: 'Крымская Ривьера', location: '1 км до моря', type: 'Сельхоз / ИЖС', area: '2 га', image: '/images/crimea-plan.png', link: '#/crimea' },
  { id: 4, region: 'Московская область', name: 'Подмосковье', location: '165 км от МКАД', type: 'Сельхоз', area: '4,29 га', image: '/images/moscow-plan.png', link: '#/moscow' },
]

const reasons = [
  { title: 'Высокая комиссия', description: 'До 20% от стоимости каждой сделки — одна из самых высоких ставок на рынке земли.' },
  { title: 'Быстрые выплаты', description: 'Деньги поступают на счёт в течение 3 рабочих дней после закрытия сделки.' },
  { title: 'Юридическая поддержка', description: 'Сопровождаем сделку на всех этапах — от фиксации клиента до регистрации.' },
  { title: 'Персональный менеджер', description: 'Индивидуальный подход и помощь по каждому объекту и клиенту.' },
]

const stats = [
  { value: 12, suffix: '', label: 'лет на рынке' },
  { value: 500, suffix: '+', label: 'успешных сделок' },
  { value: 150, suffix: '+', label: 'активных партнёров' },
  { value: 150, suffix: ' млн ₽', label: 'выплачено партнёрам' },
]

const bonuses = [
  { price: 'от 1 500 000 ₽', title: 'Apple Watch', subtitle: 'Series 10 · 46 mm', image: '/images/bonus-watch.png' },
  { price: 'от 2 500 000 ₽', title: 'iPhone 17 Pro Max', subtitle: 'Orange Titanium', image: '/images/bonus-iphone.png' },
  { price: 'от 5 000 000 ₽', title: 'MacBook Air', subtitle: 'M4 · 15″', image: '/images/bonus-macbook.png' },
]

const navLinks = [
  { label: 'Проекты', target: 'projects' },
  { label: 'Почему мы', target: 'reasons' },
  { label: 'Бонусы', target: 'bonuses' },
  { label: 'Калькулятор', target: 'calculator' },
]

const ease = [0.16, 1, 0.3, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease },
}

const lineReveal = {
  hidden: { opacity: 0, y: 44, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
}
const floatTransition = (delay: number) => ({ duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay })

export default function HomePage() {
  usePageMeta(
    'ГектарЪ — партнёрская программа по земельным участкам · 20% комиссии',
    'Зарабатывайте до 20% комиссии с продажи земельных участков. 600 га земли в 4 регионах России, выплаты за 3 дня, юридическое сопровождение. До 5 млн ₽ с одной сделки.'
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dealAmount, setDealAmount] = useState(2000000)

  const commission = Math.round(dealAmount * 0.2)
  const sliderMin = 500000
  const sliderMax = 25000000
  const fillPct = ((dealAmount - sliderMin) / (sliderMax - sliderMin)) * 100

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25])
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (window.location.hash === '#/lands') {
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#16201a]">
      {/* ===== Floating glass nav ===== */}
      <nav className="fixed top-3 inset-x-0 z-50 px-3 sm:px-5">
        <div className="max-w-6xl mx-auto glass rounded-full shadow-[0_8px_30px_rgba(20,40,28,0.12)]">
          <div className="px-4 sm:px-5 h-14 flex items-center justify-between">
            <a href="#/" className="flex items-center gap-2 shrink-0">
              <img src="/images/logo.png" alt="ГектарЪ" className="h-8 w-auto" />
              <span className="text-[17px] font-extrabold tracking-tight">ГектарЪ</span>
            </a>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((l) => (
                <button key={l.target} onClick={() => scrollTo(l.target)} className="text-[14px] font-medium text-[#16201a]/70 hover:text-[#16201a] transition-colors">
                  {l.label}
                </button>
              ))}
              <a href="#/blog" className="text-[14px] font-medium text-[#16201a]/70 hover:text-[#16201a] transition-colors">Блог</a>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+79951691230" className="text-[14px] font-semibold text-[#16201a] hover:text-[#1c5238] transition-colors">+7 (995) 169-12-30</a>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#1c5238] hover:bg-[#16432e] text-white text-[14px] font-semibold pl-4 pr-2 py-2 rounded-full flex items-center gap-2 transition-colors">
                Фиксация
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><ArrowUpRight className="w-3.5 h-3.5" /></span>
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center" aria-label="Меню">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden border-t border-white/40">
                <div className="px-5 py-4 space-y-1">
                  {navLinks.map((l) => (
                    <button key={l.target} onClick={() => scrollTo(l.target)} className="block w-full text-left py-2.5 text-[16px] font-medium">{l.label}</button>
                  ))}
                  <a href="#/blog" className="block py-2.5 text-[16px] font-medium">Блог</a>
                  <a href="tel:+79951691230" className="block py-2.5 text-[16px] font-semibold text-[#1c5238]">+7 (995) 169-12-30</a>
                  <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true) }} className="mt-2 w-full bg-[#1c5238] text-white text-[15px] font-semibold py-3 rounded-full">Фиксация клиента</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-end overflow-hidden">
        <motion.img style={{ y: heroY, scale: heroScale }} src="/images/hero-river-view.png" alt="Земельные участки с высоты" className="absolute inset-0 w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1711]/85 via-[#0c1711]/25 to-[#0c1711]/35" />

        {/* faded background wordmark — signature */}
        <div aria-hidden className="absolute -bottom-6 sm:bottom-4 left-0 right-0 text-center pointer-events-none select-none">
          <span className="font-display text-white/10 text-[19vw] leading-none font-bold">ГЕКТАРЪ</span>
        </div>

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 pb-14 lg:pb-20 pt-28">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
            {/* left: headline */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 glass-soft rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3ec469]" />
                <span className="text-[13px] font-semibold text-white">Партнёрская программа · с 2014 года</span>
              </motion.div>

              <motion.h1 initial="hidden" animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
                className="font-display text-white text-[32px] sm:text-6xl lg:text-[76px] font-bold">
                <motion.span variants={lineReveal} className="block">Зарабатывайте</motion.span>
                <motion.span variants={lineReveal} className="block">на земле</motion.span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.35 }}
                className="mt-6 text-[17px] sm:text-xl text-white/85 max-w-xl leading-relaxed">
                Станьте партнёром ГектарЪ и получайте <span className="text-white font-semibold">20% комиссии</span> с каждой сделки по земельным участкам. До 5 млн ₽ с одной продажи.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsModalOpen(true)}
                  className="bg-[#2fae5b] hover:bg-[#27964d] text-white pl-6 pr-2 py-3.5 rounded-full text-[16px] font-semibold flex items-center justify-center gap-2 transition-colors">
                  Фиксация клиента
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><ArrowRight className="w-4 h-4" /></span>
                </button>
                <button onClick={() => scrollTo('projects')}
                  className="glass text-white px-6 py-3.5 rounded-full text-[16px] font-semibold hover:bg-white/80 hover:text-[#16201a] transition-colors">
                  Наши проекты
                </button>
              </motion.div>
            </div>

            {/* right: floating glass stat cards */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.6 }}
              className="hidden lg:flex flex-col gap-3">
              <motion.div animate={{ y: [0, -10, 0] }} transition={floatTransition(0)} className="glass rounded-3xl p-6">
                <div className="font-display text-5xl font-bold text-[#16201a]">20%</div>
                <div className="text-[14px] text-[#16201a]/60 mt-1">комиссия с каждой сделки</div>
              </motion.div>
              <div className="grid grid-cols-2 gap-3">
                <motion.div animate={{ y: [0, -8, 0] }} transition={floatTransition(0.8)} className="glass rounded-3xl p-5">
                  <div className="font-display text-3xl font-bold text-[#16201a]">3 дня</div>
                  <div className="text-[13px] text-[#16201a]/60 mt-1">на выплату</div>
                </motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={floatTransition(1.6)} className="glass rounded-3xl p-5">
                  <div className="font-display text-3xl font-bold text-[#16201a]">150+</div>
                  <div className="text-[13px] text-[#16201a]/60 mt-1">партнёров</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== ASCII land (Adaline-style living map) ===== */}
      <section className="bg-[#f4f1ea] py-20 lg:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2fae5b] mb-5 mono">Цифровая карта земли</p>
            <h2 className="tight text-3xl sm:text-4xl lg:text-[44px] font-bold">
              Видим каждый участок сверху
            </h2>
            <p className="mt-6 text-[17px] text-[#16201a]/60 leading-relaxed max-w-md">
              Аэросъёмка, кадастровые планы и генпланы — каждый гектар оцифрован
              до сотки и готов к показу клиенту в один клик.
            </p>
            <button onClick={() => scrollTo('projects')}
              className="mt-8 inline-flex items-center gap-2 bg-[#1c5238] hover:bg-[#16432e] text-white pl-6 pr-2 py-3.5 rounded-full text-[16px] font-semibold transition-colors">
              Смотреть участки
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><ArrowRight className="w-4 h-4" /></span>
            </button>
          </motion.div>

          <motion.div {...fadeUp} className="relative rounded-[28px] overflow-hidden border border-[#1c5238]/10 h-[320px] sm:h-[400px] lg:h-[460px]">
            <img src="/images/hero-river-view.png" alt="Аэропанорама земельного участка" className="absolute inset-0 w-full h-full object-cover kenburns" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 glass-soft rounded-full px-3.5 py-2">
              <MapPin className="w-3.5 h-3.5 text-[#3ec469]" />
              <span className="text-white text-[13px] font-medium">Аэросъёмка участка</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="bg-white hectare-grid py-20 lg:py-28 px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#f4f1ea] rounded-3xl p-7 text-center">
              <div className="font-display text-[26px] sm:text-4xl lg:text-5xl font-bold text-[#1c5238]">
                <CountUp end={s.value} duration={2.2} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[14px] text-[#16201a]/55">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="bg-white py-16 lg:py-24 px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
          <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2fae5b] mb-6">О компании</p>
          <p className="tight text-[28px] sm:text-4xl lg:text-[46px] font-bold text-[#16201a]">
            ГектарЪ — девелопер с 2014 года. Строим жильё, апарт-отели и создаём инвестиционно привлекательные земельные активы.
          </p>
        </motion.div>
      </section>

      {/* ===== Reasons (4 причины) ===== */}
      <section id="reasons" className="bg-white py-16 lg:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="tight text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 max-w-2xl">
            4 причины работать <span className="text-[#2fae5b]">с нами</span>
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <motion.div {...fadeUp} className="rounded-[32px] overflow-hidden min-h-[320px] relative">
              <img src="/images/tver-bg.jpg" alt="Земельные участки" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 glass-soft rounded-2xl px-6 py-5">
                <div className="font-display text-4xl lg:text-5xl font-bold text-white">600 га</div>
                <div className="text-[14px] text-white/85 mt-1">общей земли в наших проектах</div>
              </div>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="bg-[#f4f1ea] rounded-3xl p-6 flex flex-col">
                  <div className="w-9 h-9 rounded-xl bg-[#2fae5b]/15 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-[#1c5238]" />
                  </div>
                  <h3 className="text-[17px] font-bold mb-1.5">{r.title}</h3>
                  <p className="text-[14px] text-[#16201a]/60 leading-relaxed">{r.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Projects — "земля сверху" ===== */}
      <section id="projects" className="bg-[#f4f1ea] hectare-grid py-20 lg:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 lg:mb-20">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2fae5b] mb-3">Наши проекты</p>
              <h2 className="tight text-3xl sm:text-4xl lg:text-5xl font-bold">Земля, которую видно сверху</h2>
            </div>
            <p className="text-[16px] text-[#16201a]/55 max-w-xs">4 проекта · 600 га земли в регионах России. Готовые кадастровые планы под каждого клиента.</p>
          </motion.div>

          <div className="space-y-14 lg:space-y-24">
            {lands.map((land, i) => {
              const reverse = i % 2 === 1
              return (
                <motion.div key={land.id}
                  initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}
                  className="grid lg:grid-cols-2 gap-7 lg:gap-14 items-center">
                  <a href={land.link}
                    className={`group relative block rounded-[36px] overflow-hidden h-[320px] sm:h-[440px] lg:h-[540px] shadow-[0_4px_24px_rgba(20,40,28,0.08)] ${reverse ? 'lg:order-2' : ''}`}>
                    <img src={land.image} alt={land.region} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
                    <div className="absolute top-5 left-5 glass-soft rounded-full px-4 py-2 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#1c5238]" />
                      <span className="text-[14px] font-semibold text-[#16201a]">{land.region}</span>
                    </div>
                    <div className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-[#2fae5b] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </a>

                  <div className={reverse ? 'lg:order-1' : ''}>
                    <p className="mono text-[12px] tracking-[0.18em] uppercase text-[#2fae5b] mb-4">
                      Проект {String(i + 1).padStart(2, '0')} — {land.region}
                    </p>
                    <h3 className="font-display text-[30px] sm:text-5xl lg:text-[58px] font-bold leading-[1.05]">{land.name}</h3>

                    <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                      <div className="bg-white rounded-2xl px-4 py-4">
                        <p className="text-[12px] text-[#16201a]/45 mb-1">Локация</p>
                        <p className="text-[15px] font-semibold">{land.location}</p>
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-4">
                        <p className="text-[12px] text-[#16201a]/45 mb-1">Назначение</p>
                        <p className="text-[15px] font-semibold">{land.type}</p>
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-4">
                        <p className="text-[12px] text-[#16201a]/45 mb-1">Площадь</p>
                        <p className="text-[15px] font-semibold text-[#1c5238]">{land.area}</p>
                      </div>
                    </div>

                    <a href={land.link}
                      className="mt-8 inline-flex items-center gap-2 bg-[#1c5238] hover:bg-[#16432e] text-white pl-6 pr-2 py-3.5 rounded-full text-[16px] font-semibold transition-colors">
                      Смотреть проект
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><ArrowRight className="w-4 h-4" /></span>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Bonuses — deep green premium ===== */}
      <section id="bonuses" className="bg-[#0f1d15] py-20 lg:py-32 px-5 sm:px-6 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#3ec469] mb-4">Бонусы партнёрам</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">Награды за крупные сделки</h2>
            <p className="mt-5 text-[18px] text-white/55 max-w-2xl mx-auto">Чем больше сделка — тем ценнее подарок. И всегда +20% комиссии сверху.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {bonuses.map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                whileHover={{ y: -8 }}
                className="glass-dark rounded-[32px] overflow-hidden flex flex-col">
                <div className="flex-1 flex items-center justify-center p-8">
                  <img src={b.image} alt={b.title} className="w-full h-[280px] lg:h-[340px] object-contain" />
                </div>
                <div className="px-7 pb-9 text-center">
                  <p className="text-[12px] font-semibold tracking-widest uppercase text-[#c9a978] mb-2">{b.price}</p>
                  <h3 className="font-display text-2xl font-bold text-white">{b.title}</h3>
                  <p className="mt-1 text-[14px] text-white/45">{b.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Calculator ===== */}
      <section id="calculator" className="bg-white hectare-grid py-20 lg:py-28 px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2fae5b] mb-4">Калькулятор</p>
            <h2 className="tight text-3xl sm:text-4xl lg:text-5xl font-bold">Сколько вы заработаете</h2>
          </div>

          <div className="glass rounded-[36px] p-8 lg:p-14 shadow-[0_12px_50px_rgba(20,40,28,0.10)]">
            <p className="text-[15px] text-[#16201a]/55">Сумма сделки</p>
            <p className="font-display text-[28px] sm:text-4xl lg:text-5xl font-bold mt-1 mb-8">{dealAmount.toLocaleString('ru-RU')} ₽</p>

            <input type="range" min={sliderMin} max={sliderMax} step={100000} value={dealAmount}
              onChange={(e) => setDealAmount(Number(e.target.value))}
              className="gk-range w-full"
              style={{ background: `linear-gradient(to right, #2fae5b ${fillPct}%, #dfe5e0 ${fillPct}%)` }} />
            <div className="flex justify-between text-[13px] text-[#16201a]/40 mt-3">
              <span>500 тыс ₽</span>
              <span>25 млн ₽</span>
            </div>

            <div className="mt-10 pt-10 border-t border-[#16201a]/10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[15px] text-[#16201a]/55">Ваша комиссия · 20%</p>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c5238] mt-2">{commission.toLocaleString('ru-RU')} ₽</p>
              </div>
              <button onClick={() => setIsModalOpen(true)}
                className="bg-[#2fae5b] hover:bg-[#27964d] text-white px-6 py-3.5 rounded-full text-[16px] font-semibold transition-colors">
                Получить эту сделку
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#f4f1ea] py-24 lg:py-32 px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">Обсудим детали?</h2>
          <p className="mt-5 text-[18px] sm:text-xl text-[#16201a]/55">Присоединяйтесь к партнёрской программе ГектарЪ.</p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setIsModalOpen(true)}
              className="bg-[#1c5238] hover:bg-[#16432e] text-white px-8 py-4 rounded-full text-[17px] font-semibold transition-colors">
              Оставить заявку
            </button>
            <a href="https://max.ru/u/f9LHodD0cOKGmwKtxVHtowELQauNtni0QxVzToNr9E1Khu1saPkEz-4g8DU" target="_blank" rel="noopener noreferrer"
              className="bg-white hover:bg-white/70 text-[#16201a] px-8 py-4 rounded-full text-[17px] font-semibold transition-colors">
              Написать в MAX
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* ===== Modal ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
            <div className="absolute inset-0 bg-[#0c1711]/50 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease }} className="relative z-10 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsModalOpen(false)} className="absolute -top-11 right-0 text-white/90 hover:text-white" aria-label="Закрыть">
                <X className="w-6 h-6" />
              </button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
