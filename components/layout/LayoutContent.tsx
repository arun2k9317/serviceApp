'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import QuickCallButton from './QuickCallButton';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith('/admin') : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdmin && <Header />}
      
      <main 
        className="main-content"
        style={{ 
          flex: 1,
          paddingTop: isAdmin ? 0 : '65px'
        }}
      >
        {children}
      </main>
      
      {!isAdmin && <Footer />}

      {!isAdmin && (
        <>
          <div className="floating-widgets">
            <WhatsAppButton />
          </div>
          <QuickCallButton />
        </>
      )}
    </div>
  );
}
