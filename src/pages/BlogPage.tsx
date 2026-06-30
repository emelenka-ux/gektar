import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar, ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'
import { usePageMeta } from '../lib/usePageMeta'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  author: string
}

export default function BlogPage() {
  usePageMeta(
    'Блог ГектарЪ — о земле и инвестициях',
    'Полезные статьи о земельных инвестициях, выборе участков и партнёрской программе ГектарЪ.'
  )
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/blog/posts.json')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading posts:', err)
        setError('Не удалось загрузить статьи')
        setLoading(false)
      })
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-white text-[#16201a]">
      {/* ===== Floating glass nav ===== */}
      <nav className="fixed top-3 inset-x-0 z-50 px-3 sm:px-5">
        <div className="max-w-6xl mx-auto glass rounded-full shadow-[0_8px_30px_rgba(20,40,28,0.12)]">
          <div className="px-4 sm:px-5 h-14 flex items-center justify-between">
            <a href="#/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="ГектарЪ" className="h-8 w-auto" />
              <span className="text-[17px] font-extrabold tracking-tight">ГектарЪ</span>
            </a>
            <div className="flex items-center gap-5">
              <a href="#/" className="text-[14px] font-medium text-[#16201a]/70 hover:text-[#16201a] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> На главную
              </a>
              <a href="tel:+79951691230" className="hidden sm:block text-[14px] font-semibold text-[#1c5238]">+7 (995) 169-12-30</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="bg-white hectare-grid pt-32 pb-14 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2fae5b] mb-4">Блог</p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl lg:text-6xl font-bold">
            О земле и инвестициях
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 text-[18px] text-[#16201a]/55 max-w-2xl mx-auto">
            Полезные статьи о земельных инвестициях, выборе участков и партнёрской программе ГектарЪ.
          </motion.p>
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="bg-white px-5 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading && <p className="text-center text-[#16201a]/50 py-16">Загрузка статей…</p>}
          {error && <p className="text-center text-red-500 py-16">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.a
                  key={post.slug}
                  href={`/blog-article.html?slug=${post.slug}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                  className="group bg-white rounded-[28px] p-3 shadow-[0_2px_10px_rgba(20,40,28,0.05)] hover:shadow-[0_16px_44px_rgba(20,40,28,0.13)] transition-shadow flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-[20px] h-48">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                    <span className="absolute top-3 left-3 glass-soft text-[#16201a] text-[12px] font-semibold px-3 py-1.5 rounded-full capitalize">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[#16201a]/40 text-[13px] mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="text-[19px] font-bold leading-snug mb-2 line-clamp-2 group-hover:text-[#1c5238] transition-colors">{post.title}</h3>
                    <p className="text-[14px] text-[#16201a]/50 line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2fae5b]">
                      Читать <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
