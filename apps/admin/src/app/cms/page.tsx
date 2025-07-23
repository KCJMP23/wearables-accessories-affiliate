import { Metadata } from 'next';
import CMSDashboard from '@/components/cms/CMSDashboard';

export const metadata: Metadata = {
  title: 'CMS Dashboard - Affiliate Platform',
  description: 'Manage your content, posts, and media',
};

export default function CMSPage() {
  return (
    <div className="container mx-auto py-6">
      <CMSDashboard />
    </div>
  );
} 