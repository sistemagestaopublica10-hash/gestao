import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f5f5' }}>
      <main className="flex-1 pb-16 sm:pb-0">
        {children}
      </main>
      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
