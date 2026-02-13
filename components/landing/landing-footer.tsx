import { Facebook, Twitter, Instagram, Youtube, Printer } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="w-full bg-[#F5F3EE] py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo y texto */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-b from-[#E94C89] to-[#6B5CB0] rounded-sm flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-[#E94C89] font-bold text-xs">SF</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Santa Fe</p>
                <p className="text-xs text-gray-600">PROVINCIA</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300 mx-2"></div>
            <p className="text-sm text-gray-700">Ministerio de Educación</p>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              <Printer className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Botón de accesibilidad */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF9A76] hover:bg-[#FF8A66] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Accesibilidad"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M15.89 8.11C15.5 7.72 14.83 7 13.53 7H10.47C9.17 7 8.5 7.72 8.11 8.11C7.72 8.5 7.72 9.2 8.11 9.59C8.5 9.97 9.2 9.97 9.59 9.59C9.71 9.47 9.96 9 10.47 9H13.53C14.04 9 14.29 9.47 14.41 9.59C14.8 9.97 15.5 9.97 15.89 9.59C16.28 9.2 16.28 8.5 15.89 8.11M13 11H11V18C11 18.55 11.45 19 12 19S13 18.55 13 18V11Z"/>
        </svg>
      </button>
    </footer>
  )
}
