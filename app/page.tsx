'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  ThemeIcon,
  Card,
  Stack,
  Box,
  rem,
  Badge,
  Avatar,
  Divider,
  Grid,
  Image,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import {
  IconShieldCheck,
  IconClock,
  IconCircleCheck,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsDown,
  IconBolt,
  IconDroplet,
  IconSnowflake,
  IconSparkles,
  IconArmchair,
  IconPaint,
  IconHome,
  IconBug,
  IconTool,
  IconBuilding,
  IconBuildingSkyscraper,
  IconBuildingHospital,
  IconBuildingStore,
  IconSchool,
  IconBuildingWarehouse,
  IconBuildingFactory,
  IconHotelService,
  IconStar,
  IconHeartHandshake,
  IconBulb,
  IconAward,
  IconTargetArrow,
  IconCheck,
  IconCalendar,
  IconFileText,
  IconHeadset,
  IconUserCheck,
  IconFileCheck,
  IconMapPin,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Custom components
import Counter from '../components/ui/Counter';
import CallbackForm from '../components/forms/CallbackForm';
import JsonLd from '../components/SEO/JsonLd';

// Server Actions imports
import { getTestimonials } from '../lib/actions';

// ─── REUSABLE SECTION HEADER COMPONENT (Mantine-based) ──────────────────────
function SectionHeader({ subtitle, title, description, white }: {
  subtitle: string;
  title: string;
  description?: string;
  white?: boolean;
}) {
  return (
    <Stack align="center" gap={4} ta="center" mb={40} pt={40}>
      <Text
        fz="md"
        fs="italic"
        c={white ? '#CBDCEB' : 'dimmed'}
        style={{ letterSpacing: 0, textTransform: 'none' }}
      >
        {subtitle}
      </Text>
      <Title
        order={2}
        fz={{ base: rem(24), sm: rem(28), md: rem(32) }}
        fw={700}
        c={white ? '#ffffff' : undefined}
        style={{ fontFamily: 'var(--font-open-sans), sans-serif', textTransform: 'uppercase', letterSpacing: rem(1) }}
      >
        {title}
      </Title>
      {/* Bricks-style divider */}
      <Group gap={10} align="center" my="sm" style={{ width: rem(180) }}>
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(203,220,235,0.3)' : 'linear-gradient(to right, transparent, #CBDCEB)' }} />
        <Box style={{ width: rem(7), height: rem(7), borderRadius: '50%', border: `1px solid ${white ? 'rgba(203,220,235,0.5)' : '#CBDCEB'}`, background: white ? 'transparent' : 'var(--mantine-color-body)' }} />
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(203,220,235,0.3)' : 'linear-gradient(to left, transparent, #CBDCEB)' }} />
      </Group>
      {description && (
        <Text
          fz="sm"
          c={white ? '#e9ecef' : 'dimmed'}
          maw={600}
          style={{ lineHeight: 1.6 }}
        >
          {description}
        </Text>
      )}
    </Stack>
  );
}

// ─── SERVICE CATEGORIES DATA ─────────────────────────────────────────────────
const serviceCategories = [
  {
    icon: IconBolt,
    title: 'Electrical Services',
    color: 'yellow',
    accentHex: '#f59f00',
    illustrations: ['/electrical1.jpeg', '/electrical2.jpeg'],
    items: ['Electrical Installation & Wiring', 'Electrical Maintenance', 'Lighting Installation', 'Panel Board Maintenance', 'Generator Support', 'Emergency Electrical Repairs'],
  },
  {
    icon: IconDroplet,
    title: 'Plumbing Services',
    color: 'blue',
    accentHex: '#228be6',
    illustrations: ['/plumbing1.jpeg', '/plumbing2.jpeg'],
    items: ['Pipe Installation & Repair', 'Leak Detection', 'Drain Cleaning', 'Water Tank Maintenance', 'Pump Installation & Maintenance', 'Bathroom & Kitchen Plumbing'],
  },
  {
    icon: IconSnowflake,
    title: 'HVAC & Air Conditioning',
    color: 'cyan',
    accentHex: '#15aabf',
    illustrations: ['/ac1.jpeg'],
    items: ['AC Installation', 'AC Repair & Servicing', 'HVAC Maintenance', 'Duct Cleaning', 'Preventive Maintenance', 'Commercial HVAC Solutions'],
  },
  {
    icon: IconSparkles,
    title: 'Deep Cleaning Services',
    color: 'green',
    accentHex: '#2f9e44',
    illustrations: ['/cleaning1.jpeg', '/cleaning2.jpeg'],
    items: ['Residential Deep Cleaning', 'Commercial Deep Cleaning', 'Move-In / Move-Out Cleaning', 'Floor Cleaning & Polishing', 'Post-Construction Cleaning', 'Sanitization Services'],
  },
  {
    icon: IconArmchair,
    title: 'Sofa, Carpet & Upholstery',
    color: 'grape',
    accentHex: '#ae3ec9',
    illustrations: ['/sofa1.jpeg', '/sofa2.jpeg'],
    items: ['Sofa Shampooing', 'Fabric Cleaning', 'Leather Cleaning', 'Carpet Cleaning', 'Mattress Cleaning', 'Curtain Cleaning'],
  },
  {
    icon: IconPaint,
    title: 'Painting & Renovation',
    color: 'orange',
    accentHex: '#f76707',
    illustrations: ['/painting1.jpeg','/painting2.jpeg'],
    items: ['Interior Painting', 'Exterior Painting', 'Wall Repairs', 'Waterproofing', 'Minor Renovation Works', 'Property Refurbishment'],
  },
  {
    icon: IconHome,
    title: 'Housekeeping Services',
    color: 'teal',
    accentHex: '#0c8599',
    illustrations: ['/housekeeping1.jpeg'],
    items: ['Office Housekeeping', 'Apartment Maintenance', 'Building Cleaning', 'Facility Support Staff', 'Janitorial Services'],
  },
  {
    icon: IconBug,
    title: 'Pest Control Services',
    color: 'red',
    accentHex: '#e03131',
    illustrations: ['/pest1.jpeg'],
    items: ['Residential Pest Control', 'Commercial Pest Management', 'Termite Control', 'Rodent Control', 'Mosquito Treatment'],
  },
  {
    icon: IconTool,
    title: 'General Maintenance',
    color: 'indigo',
    accentHex: '#3b5bdb',
    illustrations: ['/maintenance.jpeg'],
    items: ['Handyman Services', 'Preventive Maintenance', 'Property Inspection', 'Building Maintenance', 'Emergency Breakdown Support'],
  },
];

// ─── HOMEPAGE SPECIFIC COMPACT SERVICES ──────────────────────────────────────
const homepageCategories = [
  {
    icon: IconBolt,
    title: 'Electrical Services',
    illustrations: ['/electrical1.jpeg', '/electrical2.jpeg', '/electrical3.jpeg'],
    accentHex: '#f59f00',
  },
  {
    icon: IconDroplet,
    title: 'Plumbing Services',
    illustrations: ['/plumbing1.jpeg', '/plumbing2.jpeg'],
    accentHex: '#228be6',
  },
  {
    icon: IconSnowflake,
    title: 'HVAC Maintenance',
    illustrations: ['/ac1.jpeg', '/ac2.jpeg'],
    accentHex: '#15aabf',
  },
  {
    icon: IconSparkles,
    title: 'Deep Cleaning Services',
    illustrations: ['/cleaning1.jpeg', '/cleaning2.jpeg'],
    accentHex: '#2f9e44',
  },
  {
    icon: IconTool,
    title: 'Preventive Maintenance',
    illustrations: ['/general_maintenance.png'],
    accentHex: '#3b5bdb',
  },
  {
    icon: IconShieldCheck,
    title: 'Security & Support Services',
    illustrations: ['/corporate_office.png'],
    accentHex: '#ae3ec9',
  },
];

// ─── WHY CHOOSE US DATA ──────────────────────────────────────────────────────
const whyChooseUs = [
  { icon: IconAward, title: 'Professional Expertise', desc: 'Highly trained technicians and facility management professionals.' },
  { icon: IconClock, title: 'Quick Response', desc: 'Fast and efficient service delivery with minimal downtime.' },
  { icon: IconShieldCheck, title: 'Quality Assurance', desc: 'Consistent quality standards across all services.' },
  { icon: IconTargetArrow, title: 'Affordable Solutions', desc: 'Cost-effective maintenance plans tailored to your needs.' },
  { icon: IconShieldCheck, title: 'Safety First', desc: 'Strict adherence to safety regulations and industry standards.' },
  { icon: IconHeartHandshake, title: 'Customer Satisfaction', desc: 'Dedicated support focused on long-term client relationships.' },
  { icon: IconCircleCheck, title: 'One-Stop Solution', desc: 'All facility management services from a single trusted partner.' },
];

// ─── INDUSTRIES WE SERVE DATA ────────────────────────────────────────────────
const industries = [
  { title: 'Corporate Offices', tagline: 'Workplace Excellence', img1: '/corporate_office1.jpeg', img2: '/corporate_office2.jpeg' },
  { title: 'Commercial Buildings', tagline: 'Premium Upkeep', img1: '/commercial_building1.jpeg', img2: '/commercial_building2.jpeg' },
  { title: 'Residential Apartments', tagline: 'Modern Living', img1: '/residential_apartment1.jpeg', img2: '/residential_apartment2.jpeg' },
  { title: 'Villas & Homes', tagline: 'Personal Comfort', img1: '/villa1.jpeg', img2: '/villa2.jpeg' },
  { title: 'Hospitals & Healthcare', tagline: 'Critical Environments', img1: '/hospital1.jpeg', img2: '/hospital2.jpeg' },
  { title: 'Hotels & Resorts', tagline: 'Hospitality Standards', img1: '/hotel1.jpeg', img2: '/hotel2.jpeg' },
  { title: 'Educational Institutions', tagline: 'Campus Care', img1: '/edcational_institution1.jpeg', img2: '/educational_institution2.jpeg' },
  { title: 'Retail Stores & Malls', tagline: 'Shopper Experience', img1: '/retail_store_and_mall1.jpeg', img2: '/retail_store_and_mall2.jpeg' },
  { title: 'Warehouses & Garages', tagline: 'Industrial Spaces', img1: '/warehouse1.jpeg', img2: '/warehouse2.jpeg' },
  { title: 'Industrial Facilities', tagline: 'Heavy Duty Solutions', img1: '/industry1.jpeg', img2: '/industry2.jpeg' },
];



// ─── INDUSTRY CARD — Premium photo card with swipe (mobile) & hover (desktop) ─
function IndustryCard({ title, tagline, img1, img2, index }: {
  title: string;
  tagline: string;
  img1: string;
  img2: string;
  index: number;
}) {
  const [showSecond, setShowSecond] = useState(false);
  const touchRef = React.useRef<{ startX: number; startY: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchRef.current.startX;
    const deltaY = e.changedTouches[0].clientY - touchRef.current.startY;
    // Only trigger if horizontal swipe is dominant and > 40px
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setShowSecond(deltaX < 0 ? true : false);
    }
    touchRef.current = null;
  };

  return (
    <div
      className={`industry-photo-card${showSecond ? ' industry-photo-card--swiped' : ''}`}
      id={`industry-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        borderRadius: rem(16),
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        cursor: 'default',
      }}
    >
      {/* ── Dual-image layer ── */}
      <div style={{ position: 'absolute', inset: 0 }} className="industry-card-img-wrap">
        <Image
          src={img1}
          alt={`${title} — Photo 1`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          className="industry-card-img industry-card-img-a"
        />
        <Image
          src={img2}
          alt={`${title} — Photo 2`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          className="industry-card-img industry-card-img-b"
        />
      </div>

      {/* ── Cinematic gradient scrim ── */}
      <div
        className="industry-card-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 25, 47, 0.45) 60%, rgba(10, 25, 47, 0.88) 100%)',
          zIndex: 2,
          transition: 'background 0.5s ease',
        }}
      />

      {/* ── Dot indicators (mobile) ── */}
      <div
        style={{
          position: 'absolute',
          top: rem(10),
          right: rem(10),
          zIndex: 4,
          display: 'flex',
          gap: rem(5),
        }}
        className="industry-card-dots"
      >
        <div
          style={{
            width: rem(6),
            height: rem(6),
            borderRadius: '50%',
            backgroundColor: showSecond ? 'rgba(255,255,255,0.4)' : '#ffffff',
            transition: 'background-color 0.3s ease',
          }}
        />
        <div
          style={{
            width: rem(6),
            height: rem(6),
            borderRadius: '50%',
            backgroundColor: showSecond ? '#ffffff' : 'rgba(255,255,255,0.4)',
            transition: 'background-color 0.3s ease',
          }}
        />
      </div>

      {/* ── Bottom text content ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          padding: `${rem(20)} ${rem(16)} ${rem(16)}`,
        }}
      >
        {/* Thin accent line */}
        <div
          className="industry-card-accent"
          style={{
            width: rem(28),
            height: rem(2),
            backgroundColor: '#00a8ff',
            borderRadius: rem(1),
            marginBottom: rem(8),
            transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
        <Text
          fw={700}
          fz={{ base: rem(13), md: rem(14) }}
          c="#ffffff"
          style={{
            fontFamily: 'var(--font-open-sans), sans-serif',
            textTransform: 'uppercase',
            letterSpacing: rem(0.8),
            lineHeight: 1.25,
          }}
        >
          {title}
        </Text>
        <Text
          fz={{ base: rem(11), md: rem(11) }}
          c="rgba(203, 220, 235, 0.8)"
          style={{
            marginTop: rem(3),
            letterSpacing: rem(0.3),
            lineHeight: 1.3,
            fontStyle: 'italic',
          }}
        >
          {tagline}
        </Text>
      </div>
    </div>
  );
}

const angles = [-2, 2.5, -1.5, 3, -2.5, 1.5];

function ServiceCategoryCard({ service }: { service: any }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = service.illustrations || [];

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setActiveImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, images]);

  return (
    <Link
      href={`/services#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <div
        className="service-glass-card"
        id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          borderRadius: rem(20),
          overflow: 'hidden',
          aspectRatio: '4 / 3',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          height: '100%',
        }}
      >
        {/* Top Image Section with Transitions */}
        <div className="service-glass-card-img-wrap" style={{ position: 'absolute', inset: 0 }}>
          {images.map((src: string, idx: number) => (
            <motion.div
              key={src}
              initial={{ opacity: idx === 0 ? 1 : 0 }}
              animate={{ opacity: idx === activeImageIndex ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              <Image
                src={src}
                alt={service.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                className="service-glass-card-img"
              />
            </motion.div>
          ))}
        </div>

        {/* Gradient Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 25, 47, 0.35) 60%, rgba(10, 25, 47, 0.88) 100%)',
            zIndex: 1,
          }}
        />

        {/* Frosted Glass Bottom Panel */}
        <div
          className="service-glass-panel"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: `${rem(16)} ${rem(20)}`,
            display: 'flex',
            alignItems: 'center',
            gap: rem(12),
          }}
        >
          {/* Floating Icon Wrapper */}
          <div
            className="service-glass-icon"
            style={{
              width: rem(40),
              height: rem(40),
              borderRadius: rem(12),
              background: `linear-gradient(135deg, ${service.accentHex}33, ${service.accentHex}66)`,
              border: `1px solid ${service.accentHex}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'transform 0.3s ease',
            }}
          >
            <service.icon size={20} color="#ffffff" />
          </div>

          {/* Text Label & Action */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text
              fw={700}
              fz={{ base: rem(14), md: rem(15) }}
              c="#ffffff"
              style={{
                fontFamily: 'var(--font-open-sans), sans-serif',
                lineHeight: 1.25,
              }}
            >
              {service.title}
            </Text>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: rem(4),
                color: '#00a8ff',
                marginTop: rem(4),
              }}
            >
              <Text size="11px" fw={700} className="service-glass-cta-text">
                Explore Service
              </Text>
              <IconArrowRight size={11} className="service-glass-cta-icon" />
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <Group
            gap={6}
            style={{
              position: 'absolute',
              top: rem(16),
              right: rem(16),
              zIndex: 4,
              backgroundColor: 'rgba(10, 25, 47, 0.6)',
              padding: `${rem(4)} ${rem(8)}`,
              borderRadius: rem(10),
              backdropFilter: 'blur(4px)',
              opacity: isHovered ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            {images.map((_: any, idx: number) => (
              <div
                key={idx}
                style={{
                  width: rem(6),
                  height: rem(6),
                  borderRadius: '50%',
                  backgroundColor: idx === activeImageIndex ? '#00a8ff' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </Group>
        )}

        {/* Top Gradient Highlight Accent Line */}
        <div
          className="service-glass-accent"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: rem(4),
            background: `linear-gradient(90deg, ${service.accentHex}, ${service.accentHex}88)`,
            zIndex: 3,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const isDesktop = useMediaQuery('(min-width: 992px)');

  useEffect(() => {
    getTestimonials().then((res) => {
      setTestimonials(res.filter(t => t.is_featured));
    });
  }, []);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Full Maintenance — Facility Management",
    "image": "https://fullmaintenance.com/og-image.jpg",
    "@id": "https://fullmaintenance.com/#organization",
    "url": "https://fullmaintenance.com",
    "telephone": "+919048199754",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Edappally, Kochi",
      "addressLocality": "Ernakulam",
      "addressRegion": "Kerala",
      "postalCode": "682024",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What facility management services do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide comprehensive facility management including electrical maintenance, plumbing, HVAC services, deep cleaning, housekeeping, painting, pest control, and comprehensive property maintenance."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer 24/7 emergency support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide round-the-clock emergency breakdown support for all our facility management clients, ensuring minimal downtime and quick resolution."
        }
      }
    ]
  };

  return (
    <Box style={{ backgroundColor: '#ffffff' }}>
      <JsonLd schema={businessSchema} />
      <JsonLd schema={faqSchema} />

      {/* ═══════════════════════ FIRST FOLD CONTAINER ═══════════════════════ */}
      <Box
        style={isDesktop ? {
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 65px)',
          position: 'relative',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        } : {
          backgroundColor: '#ffffff',
        }}
      >

      <Box
        h={isDesktop ? undefined : 'auto'}
        style={{
          flex: isDesktop ? 1 : 'none',
          minHeight: isDesktop ? rem(280) : rem(450),
          position: 'relative',
          overflow: 'hidden',
        }}
        pt={isDesktop ? rem(10) : rem(40)}
        pb={isDesktop ? undefined : rem(20)}
      >
        {/* ── Hero background image carousel ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/homepage1.jpeg"
            alt=""
            aria-hidden="true"
            className="hero-bg-img hero-bg-img-a"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center right',
            }}
          />
          <img
            src="/homepage2.jpeg"
            alt=""
            aria-hidden="true"
            className="hero-bg-img hero-bg-img-b"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center right',
            }}
          />
             <img
            src="/homepage3.jpeg"
            alt=""
            aria-hidden="true"
            className="hero-bg-img hero-bg-img-c"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center right',
            }}
          />
        </div>

        {/* ── Gradient overlay ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(90deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.75) 50%, rgba(10, 25, 47, 0.25) 100%)',
          }}
        />
        <Container size="xl" style={{ height: isDesktop ? '100%' : 'auto', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 5 }}>
          <Stack gap={isDesktop ? 'xs' : 'sm'} style={{ maxWidth: rem(680), zIndex: 5, paddingBottom: isDesktop ? rem(50) : rem(10) }}>
            {/* Small top tagline indicator */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Group gap="xs" align="center">
                <Box style={{ width: rem(3), height: rem(18), backgroundColor: '#00a8ff' }} />
                <Text fz="xs" fw={700} style={{ letterSpacing: rem(1.5), color: '#00a8ff', textTransform: 'uppercase' }}>
                  SMARTER SPACES. BETTER LIVING.
                </Text>
              </Group>
            </motion.div>

            {/* Main Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Title
                order={2}
                fz={{ base: rem(24), sm: rem(32), md: isDesktop ? rem(40) : rem(48) }}
                fw={800}
                c="#ffffff"
                style={{
                  lineHeight: 1.15,
                  fontFamily: 'var(--font-open-sans), sans-serif',
                }}
              >
                Complete Facility Management Solutions{' '}
                <Text component="span" inherit style={{ color: '#00a8ff' }}>for Modern Buildings</Text>
              </Title>
            </motion.div>

            {/* Subtext description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Text
                fz={{ base: rem(13), sm: rem(14), md: rem(16) }}
                c="#CBDCEB"
                style={{
                  lineHeight: 1.6,
                  maxWidth: rem(560),
                }}
              >
                Delivering world-class maintenance, cleaning and technical solutions that keep your spaces safe, efficient, and always operational.
              </Text>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ marginTop: rem(10) }}
            >
              <Group gap="sm" wrap="wrap">
                <Button
                  component={Link}
                  href="/contact"
                  size={isDesktop ? "md" : "sm"}
                  radius="md"
                  leftSection={<IconCalendar size={18} />}
                  id="hero-cta-inspection"
                  styles={{
                    root: {
                      backgroundColor: '#00a8ff',
                      color: '#ffffff',
                      fontWeight: 700,
                      paddingLeft: isDesktop ? rem(22) : rem(16),
                      paddingRight: isDesktop ? rem(22) : rem(16),
                      boxShadow: '0 4px 14px rgba(0, 168, 255, 0.3)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#0096e6',
                        transform: 'translateY(-1px)',
                      },
                    },
                  }}
                >
                  GET A FREE SITE INSPECTION
                </Button>
                <Button
                  component={Link}
                  href="/contact?subject=amc"
                  size={isDesktop ? "md" : "sm"}
                  radius="md"
                  variant="outline"
                  leftSection={<IconFileText size={18} />}
                  id="hero-cta-amc"
                  styles={{
                    root: {
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      fontWeight: 700,
                      paddingLeft: isDesktop ? rem(22) : rem(16),
                      paddingRight: isDesktop ? rem(22) : rem(16),
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: '#ffffff',
                        transform: 'translateY(-1px)',
                      },
                    },
                  }}
                >
                  REQUEST AN AMC QUOTE
                </Button>
              </Group>
            </motion.div>
          </Stack>
        </Container>

        {/* Floating Dark Highlight Banner at bottom */}
        <Box
          style={{
            position: isDesktop ? 'absolute' : 'relative',
            bottom: isDesktop ? 0 : undefined,
            left: isDesktop ? 0 : undefined,
            right: isDesktop ? 0 : undefined,
            backgroundColor: 'rgba(7, 21, 41, 0.95)',
            backdropFilter: 'blur(8px)',
            borderTopLeftRadius: isDesktop ? rem(16) : 0,
            borderTopRightRadius: isDesktop ? rem(16) : 0,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 10,
            marginTop: isDesktop ? 0 : rem(30),
          }}
          py={rem(22)}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={{ base: 'md', md: 'xl' }}>
              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size={isDesktop ? "lg" : "md"} radius="xl" variant="transparent" style={{ color: '#00a8ff', flexShrink: 0 }}>
                  <IconHeadset size={isDesktop ? 24 : 20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size={isDesktop ? "13px" : "12px"} fw={800} c="#ffffff" lh={1.2}>24/7</Text>
                  <Text size={isDesktop ? "11px" : "10px"} c="#8F9CAE" lh={1.2} fw={600}>Emergency Support</Text>
                </Stack>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size={isDesktop ? "lg" : "md"} radius="xl" variant="transparent" style={{ color: '#00a8ff', flexShrink: 0 }}>
                  <IconUserCheck size={isDesktop ? 24 : 20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size={isDesktop ? "13px" : "12px"} fw={800} c="#ffffff" lh={1.2}>Trained &</Text>
                  <Text size={isDesktop ? "11px" : "10px"} c="#8F9CAE" lh={1.2} fw={600}>Verified Technicians</Text>
                </Stack>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size={isDesktop ? "lg" : "md"} radius="xl" variant="transparent" style={{ color: '#00a8ff', flexShrink: 0 }}>
                  <IconShieldCheck size={isDesktop ? 24 : 20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size={isDesktop ? "13px" : "12px"} fw={800} c="#ffffff" lh={1.2}>ISO Standard</Text>
                  <Text size={isDesktop ? "11px" : "10px"} c="#8F9CAE" lh={1.2} fw={600}>Procedures</Text>
                </Stack>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size={isDesktop ? "lg" : "md"} radius="xl" variant="transparent" style={{ color: '#00a8ff', flexShrink: 0 }}>
                  <IconClock size={isDesktop ? 24 : 20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size={isDesktop ? "13px" : "12px"} fw={800} c="#ffffff" lh={1.2}>Fast</Text>
                  <Text size={isDesktop ? "11px" : "10px"} c="#8F9CAE" lh={1.2} fw={600}>Response Time</Text>
                </Stack>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size={isDesktop ? "lg" : "md"} radius="xl" variant="transparent" style={{ color: '#00a8ff', flexShrink: 0 }}>
                  <IconFileCheck size={isDesktop ? 24 : 20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size={isDesktop ? "13px" : "12px"} fw={800} c="#ffffff" lh={1.2}>Annual Maintenance</Text>
                  <Text size={isDesktop ? "11px" : "10px"} c="#8F9CAE" lh={1.2} fw={600}>Contracts (AMC)</Text>
                </Stack>
              </Group>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </Box>

      {/* ═══════════════════════ 2. OUR SERVICES (GLASSMORPHIC GRID) ═══════════════════════ */}
      <Box
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f4f6f9 100%)',
          minHeight: isDesktop ? 'calc(100vh - 65px)' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        py={{ base: rem(40), md: rem(48) }}
      >
        <Container size="xl" style={{ width: '100%' }}>
          <SectionHeader
            subtitle="What We Offer"
            title="Our Services"
            description="Premium, reliable facility management solutions crafted to keep your property running flawlessly."
          />

          <SimpleGrid
            cols={{ base: 1, sm: 3 }}
            spacing={{ base: rem(16), md: rem(24) }}
            style={{ marginTop: rem(20) }}
          >
            {serviceCategories.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.8, 0.25, 1] }}
                style={{ height: '100%' }}
              >
                <ServiceCategoryCard service={service} />
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ═══════════════════════ 4. WHY CHOOSE US ═══════════════════════ */}
      <Box 
        style={{ 
          backgroundColor: '#E8DFCA',
          position: 'relative',
          overflow: 'hidden',
        }} 
        py={{ base: 50, md: 80 }} 
        className="why-us-bg"
      >
        {/* Animated Background Vector Shape 1 */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: rem(350),
            height: rem(350),
            borderRadius: '45% 55% 70% 30% / 45% 60% 40% 55%',
            background: 'linear-gradient(135deg, rgba(109, 148, 197, 0.3) 0%, rgba(203, 220, 235, 0.15) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Animated Background Vector Shape 2 */}
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.85, 1.1, 1],
            rotate: [360, 270, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: rem(400),
            height: rem(400),
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            background: 'linear-gradient(135deg, rgba(43, 58, 85, 0.15) 0%, rgba(109, 148, 197, 0.25) 100%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Decorative Dot Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.08,
            backgroundImage: `radial-gradient(var(--mantine-color-brandBlue-6) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
          <Grid gap={{ base: 'xl', md: 50 }} align="stretch">
            {/* Left Column: Visual/Stats Panel */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div style={{ position: 'sticky', top: '140px' }}>
                  <Badge color="brandBlue" variant="light" size="lg" mb="md" styles={{ root: { fontWeight: 800 } }}>
                    Our Core Promise
                  </Badge>
                  
                  <Title
                    order={2}
                    fw={900}
                    fz={{ base: rem(28), sm: rem(36) }}
                    lh={1.15}
                    mb="md"
                    style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}
                  >
                    Your Trusted <span className="gradient-text-primary">Facility Partner</span>
                  </Title>
                  
                  <Text c="dimmed" fz="md" mb={40} lh={1.6}>
                    We set high standards in facility management by focusing on quality, safety, and customer satisfaction. Our systematic approach ensures your assets are always running at peak efficiency.
                  </Text>

                  {/* Sleek Stats Block */}
                  <Stack gap="lg" style={{ borderLeft: '3px solid #6D94C5', paddingLeft: rem(20) }}>
                    <div>
                      <Text fw={900} fz={rem(32)} lh={1} style={{ color: '#2B3A55' }} className="why-us-stat-num">
                        10,000+
                      </Text>
                      <Text size="sm" fw={600} c="dimmed" mt={4}>
                        Satisified Residential & Commercial Clients
                      </Text>
                    </div>
                    <div>
                      <Text fw={900} fz={rem(32)} lh={1} style={{ color: '#2B3A55' }} className="why-us-stat-num">
                        98%
                      </Text>
                      <Text size="sm" fw={600} c="dimmed" mt={4}>
                        SLA Response Within 2 Hours
                      </Text>
                    </div>
                    <div>
                      <Text fw={900} fz={rem(32)} lh={1} style={{ color: '#2B3A55' }} className="why-us-stat-num">
                        24/7
                      </Text>
                      <Text size="sm" fw={600} c="dimmed" mt={4}>
                        Emergency Support Dispatch Available
                      </Text>
                    </div>
                  </Stack>
                </div>
              </motion.div>
            </Grid.Col>

            {/* Right Column: Dynamic Modern List (No Cards) */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        display: 'flex',
                        gap: rem(20),
                        alignItems: 'flex-start',
                        padding: rem(20),
                        borderRadius: rem(12),
                        border: '1px solid rgba(109, 148, 197, 0.15)',
                        backgroundColor: 'rgba(255, 255, 255, 0.45)',
                        transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                        cursor: 'default',
                      }}
                      className="why-us-row"
                    >
                      <ThemeIcon
                        radius="md"
                        size={48}
                        color="brandBlue"
                        variant="light"
                        style={{ flexShrink: 0, transition: 'transform 0.3s ease' }}
                        className="why-us-row-icon"
                      >
                        <item.icon size={24} style={{ color: '#6D94C5' }} />
                      </ThemeIcon>
                      
                      <div style={{ flex: 1 }}>
                        <Text fw={700} fz="md" style={{ color: '#2B3A55' }} className="why-us-row-title">
                          {item.title}
                        </Text>
                        <Text size="sm" c="dimmed" lh={1.5} mt={4}>
                          {item.desc}
                        </Text>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* ═══════════════════════ 5. INDUSTRIES WE SERVE ═══════════════════════ */}
      <Box
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(43, 58, 85, 0.92), rgba(43, 58, 85, 0.92)), url("/hero_female_engineer.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
        }}
        py={{ base: 50, md: 80 }}
      >
        <Container size="lg">
          <SectionHeader
            subtitle="Sectors We Cover"
            title="Industries We Serve"
            white
          />

          <SimpleGrid
            cols={{ base: 2, xs: 2, sm: 3, md: 5 }}
            spacing={{ base: 'sm', md: rem(16) }}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.25, 0.8, 0.25, 1],
                }}
              >
                <IndustryCard
                  title={industry.title}
                  tagline={industry.tagline}
                  img1={industry.img1}
                  img2={industry.img2}
                  index={index}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>



      {/* ═══════════════════════ 7. TESTIMONIALS ═══════════════════════ */}
      {testimonials.length > 0 && (
        <Box
          style={{
            position: 'relative',
            backgroundImage: 'linear-gradient(135deg, rgba(43, 58, 85, 0.95) 0%, rgba(43, 58, 85, 0.8) 50%, rgba(109, 148, 197, 0.25) 100%), url("/people.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#ffffff',
          }}
          py={{ base: 50, md: 90 }}
        >
          <Container size="lg">
            <SectionHeader
              subtitle="Testimonials"
              title="What People Say"
              description="We pride ourselves on providing high-quality facility management and property maintenance services. Here is what our clients say about our work."
              white
            />

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30} style={{ overflow: 'visible' }}>
              {testimonials.slice(0, 6).map((t, index) => {
                const initials = t.customer_name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ height: '100%' }}
                  >
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: rem(12),
                        padding: rem(24),
                      }}
                      className="testimonial-glass-card"
                    >
                      <Stack gap="sm">
                        <Group gap="md" align="center" wrap="nowrap">
                          <Avatar
                            color="brandBlue"
                            radius="xl"
                            size={50}
                            style={{ border: '2px solid rgba(109, 148, 197, 0.4)', flexShrink: 0 }}
                            styles={{ placeholder: { color: '#ffffff', fontWeight: 700 } }}
                          >
                            {initials}
                          </Avatar>
                          <Box>
                            <Text
                              size="sm"
                              fw={700}
                              c="#ffffff"
                              tt="uppercase"
                              lts={rem(0.5)}
                              ff="var(--font-open-sans), sans-serif"
                            >
                              {t.customer_name}
                            </Text>
                            {t.designation && (
                              <Text
                                size="xs"
                                c="#CBDCEB"
                                fs="italic"
                                ff="var(--font-pt-sans), sans-serif"
                              >
                                {t.designation}
                              </Text>
                            )}
                          </Box>
                        </Group>
                        <Text
                          size="sm"
                          fs="italic"
                          lh={1.6}
                          c="#dee2e6"
                          ff="var(--font-pt-sans), sans-serif"
                          style={{ marginTop: rem(4) }}
                        >
                          « {t.review} »
                        </Text>
                      </Stack>
                    </div>
                  </motion.div>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* ═══════════════════════ 8. CTA WITH LEAD FORM ═══════════════════════ */}
      <Box
        style={{
          background: 'linear-gradient(135deg, rgba(109, 148, 197, 0.08) 0%, rgba(203, 220, 235, 0.06) 100%)',
          borderTop: '1px solid var(--mantine-color-default-border)',
        }}
        py={{ base: 50, md: 80 }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} style={{ alignItems: 'center' }}>
            {/* Left side: text CTA */}
            <Stack gap="md">
              <Badge color="brandBlue" size="lg" radius="sm" styles={{ root: { color: '#ffffff', fontWeight: 700 } }}>
                📞 24/7 Support | Quality Service
              </Badge>
              <Title
                order={2}
                fw={900}
                fz={{ base: rem(26), md: rem(34) }}
                lh={1.25}
                ff="var(--font-open-sans), sans-serif"
              >
                Your Property.<br />
                <Text component="span" inherit c="#6D94C5">Our Responsibility.</Text>
              </Title>
              <Text c="dimmed" lh={1.6}>
                Professional Facility Management Solutions for Every Space. Get a free consultation with our experts and let us take care of your property maintenance needs.
              </Text>

              <Stack gap="xs" mt="xs">
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green" style={{ flexShrink: 0 }}>
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>Comprehensive facility management under one roof</Text>
                </Group>
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green" style={{ flexShrink: 0 }}>
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>Skilled professionals with quality assurance</Text>
                </Group>
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green" style={{ flexShrink: 0 }}>
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>Affordable plans for residential & commercial properties</Text>
                </Group>
              </Stack>
            </Stack>

            {/* Right side: quick callback form */}
            <Box>
              <CallbackForm />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
