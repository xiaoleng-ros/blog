import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/SidebarWrapper";
import Footer from "@/components/layout/Footer";
import Rightside from "@/components/layout/Rightside";
import AsideWrapper from "@/components/aside/AsideWrapper";
import ClickEffect from "@/components/effects/ClickEffect";
import { SidebarProvider } from "@/components/contexts/SidebarContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClickEffect type="text" text="🦋" enable={true} />
      <SidebarProvider>
        <div id="web_bg" className="bg-animation" style={{
          background: '#FFFFFF',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -999,
        }} />
        <SidebarWrapper />
        <div id="body-wrap">
          <Header />
          <main id="content-inner" className="layout">
            <div className="main-content">
              {children}
            </div>
            <AsideWrapper />
          </main>
          <Footer />
        </div>
        <Rightside />
      </SidebarProvider>
    </>
  );
}
