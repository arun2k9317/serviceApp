import React from 'react';
import { redirect } from 'next/navigation';
import DashboardClient from '../../../components/admin/DashboardClient';
import {
  checkAdminAuth,
  getDashboardStats,
  getInquiries,
  getCallbacks,
  getTestimonials,
  getOffers,
  getGalleryItems,
  getProperties,
  getTechniciansAndCaretakers,
  getServiceRequests,
  getServicesList,
  getWorkLogs,
} from '../../../lib/actions';

export const metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow',
};

// Ensure Next.js doesn't cache this page statically so auth check and new leads load dynamically
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // 1. Verify Authorization
  const isAuthenticated = await checkAdminAuth();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  // 2. Query Data in parallel on the server
  const [stats, inquiries, callbacks, testimonials, offers, gallery, properties, technicians, requests, services, workLogs] = await Promise.all([
    getDashboardStats(),
    getInquiries(),
    getCallbacks(),
    getTestimonials(),
    getOffers(),
    getGalleryItems(),
    getProperties(),
    getTechniciansAndCaretakers(),
    getServiceRequests(),
    getServicesList(),
    getWorkLogs(),
  ]);

  return (
    <DashboardClient
      stats={stats}
      inquiries={inquiries}
      callbacks={callbacks}
      testimonials={testimonials}
      offers={offers}
      gallery={gallery}
      properties={properties}
      technicians={technicians}
      requests={requests}
      services={services}
      workLogs={workLogs}
    />
  );
}
