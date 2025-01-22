import React from 'react';
import Navbar from '@/app/Navbar/Navbar';
import Footer from '@/app/Footer/Footer';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background overflow-x-hidden md:overflow-x-auto"> 
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default DashboardLayout;