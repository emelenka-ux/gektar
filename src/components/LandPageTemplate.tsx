import { ArrowLeft, FileText, Image, Map, TrendingUp, FileCheck, Camera, MapPin, Phone, MessageCircle, Grid3X3, Box, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Footer from './Footer'
import { usePageMeta } from '../lib/usePageMeta'

interface LandData {
  name: string
  fullName: string
  location: string
  image: string
  mapUrl: string
  inDevelopment: boolean
  buttons: {
    presentation: string
    tour3d: string
    chess: string
    renders: string
    layouts: string
    profitability: string
    documentsClient: string
    documentsAgent: string
    photos: string
  }
}

interface LandPageTemplateProps {
  landData: LandData
}

function ResourceCard({ href, icon: Icon, label, external = true }: { href: string; icon: LucideIcon; label: string; external?: boolean }) {
  if (!href) return null
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group bg-white rounded-3xl p-5 flex items-center gap-4 shadow-[0_2px_10px_rgba(20,40,28,0.05)] hover:shadow-[0_12px_36px_rgba(20,40,28,0.12)] transition-shadow"
    >
      <span className="w-11 h-11 rounded-2xl bg-[#2fae5b]/12 flex items-center justify-center text-[#1c5238] shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <span className="font-semibold text-[15px] text-[#16201a]">{label}</span>
      <ArrowUpRight className="ml-auto w-5 h-5 text-[#16201a]/25 group-hover:text-[#2fae5b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </a>
  )
}

export default function LandPageTemplate({ landData }: LandPageTemplateProps) {
  usePageMeta(
    `${landData.fullName} — земельный участок · ГектарЪ`,
    `${landData.fullName}: ${landData.location}. Презентация, 3D-тур, генплан, документы и запись на просмотр.`
  )
  const b = landData.buttons
  return (
    <div className="min-h-screen bg-white text-[#16201a]">
      {/* ===== Hero ===== */}
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden flex items-end">
        <img src={landData.image} alt={landData.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1711]/85 via-[#0c1711]/25 to-[#0c1711]/40" />

        <a href="#/" className="absolute top-5 left-5 z-30 glass-soft rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-medium hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-4 h-4" /> На главную
        </a>

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-10 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{landData.fullName}</h1>
          <div className="mt-4 inline-flex items-center gap-2 glass-soft rounded-full px-4 py-2">
            <MapPin className="w-4 h-4 text-[#3ec469]" />
            <span className="text-white text-sm font-medium">{landData.location}</span>
          </div>
        </div>
      </section>

      {/* ===== Resources ===== */}
      <section className="bg-white hectare-grid py-12 px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-3">
            <ResourceCard href={b.presentation} icon={FileText} label="Презентация" />
            <ResourceCard href={b.tour3d} icon={Box} label="3D тур" />
            <ResourceCard href={b.chess} icon={Grid3X3} label="Шахматка" />
            <ResourceCard href={b.renders} icon={Image} label="Рендеры" />
            <ResourceCard href={b.layouts} icon={Map} label="Генплан" />
            <ResourceCard href={b.profitability} icon={TrendingUp} label="Калькулятор рассрочки" external={false} />
            <ResourceCard href={b.documentsClient} icon={FileCheck} label="Договор для клиентов" />
            <ResourceCard href={b.documentsAgent} icon={FileCheck} label="Договор для агентов" />
            <ResourceCard href={b.photos} icon={Camera} label="Фотографии" />
            <ResourceCard href={landData.mapUrl} icon={MapPin} label="Как доехать" />
          </div>

          {/* Contact */}
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#2fae5b] text-center mb-4">Записаться на просмотр</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href="tel:+79951691230" className="bg-[#2fae5b] hover:bg-[#27964d] text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-4 h-4" /> Позвонить
              </a>
              <a href="https://max.ru/join/YnMdb16FNlLs-wTTF6a7sWa39jW2hVquJ_c73ChGi-k" target="_blank" rel="noopener noreferrer" className="bg-[#1c5238] hover:bg-[#16432e] text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> Написать в MAX
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#16201a]/40 mb-4">Для агентов</p>
            <a href="https://t.me/gektarexpert_agents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#f4f1ea] hover:bg-[#ece7db] text-[#16201a] py-4 px-8 rounded-full font-semibold transition-colors">
              <MessageCircle className="w-4 h-4 text-[#1c5238]" /> Канал в Telegram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
