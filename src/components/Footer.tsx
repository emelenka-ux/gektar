import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.08] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="ГектарЪ" className="h-10 w-auto" />
            <span className="text-[19px] font-semibold tracking-tight text-[#1d1d1f]">ГектарЪ</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[15px] text-[#6e6e73]">
            <a href="tel:+79951691230" className="hover:text-[#1d1d1f] transition-colors">+7 (995) 169-12-30</a>
            <a href="mailto:Gektar.RF@yandex.com" className="hover:text-[#1d1d1f] transition-colors">Gektar.RF@yandex.com</a>
          </div>
        </div>

        <SocialLinks size="md" className="mt-10" />

        <p className="text-center text-[#86868b] text-[12px] mt-8 max-w-2xl mx-auto leading-relaxed">
          * Meta Platforms Inc. признана экстремистской и запрещена на территории РФ
        </p>

        <div className="border-t border-black/[0.06] mt-8 pt-8 text-center text-[#86868b] text-[13px]">
          © 2024 ГектарЪ. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
