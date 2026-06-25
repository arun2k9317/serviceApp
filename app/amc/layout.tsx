import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Maintenance Contracts (AMC) Packages',
  description: 'Select from our Residential or Commercial Annual Maintenance Contracts (AMC) for complete peace of mind with scheduled checks and 24/7 priority support.',
};

export default function AMCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
