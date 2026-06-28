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
  { title: 'Corporate Offices', imgLeft: '/buildings/citytower-left.png', imgRight: '/buildings/citytower-right.png' },
  { title: 'Commercial Buildings', imgLeft: '/buildings/building01-left.png', imgRight: '/buildings/building01-right.png' },
  { title: 'Residential Apartments', imgLeft: '/buildings/apartment-left.png', imgRight: '/buildings/apartment-right.png' },
  { title: 'Villas & Homes', imgLeft: '/buildings/house-left.png', imgRight: '/buildings/house-right.png' },
  { title: 'Hospitals & Healthcare', imgLeft: '/buildings/hospital-left.png', imgRight: '/buildings/hospital-right.png' },
  { title: 'Hotels & Resorts', imgLeft: '/buildings/beachhouse-left.png', imgRight: '/buildings/beachhouse-right.png' },
  { title: 'Educational Institutions', imgLeft: '/buildings/building02-left.png', imgRight: '/buildings/building02-right.png' },
  { title: 'Retail Stores & Malls', imgLeft: '/buildings/mall-left.png', imgRight: '/buildings/mall-right.png' },
  { title: 'Warehouses & Garages', imgLeft: '/buildings/garage-left.png', imgRight: '/buildings/garage-right.png' },
  { title: 'Industrial Facilities', imgLeft: '/buildings/factory-left.png', imgRight: '/buildings/factory-right.png' },
];



// ─── INDUSTRY CARD HELPER COMPONENT (Zooms building asset on hover) ──────────
function IndustryCard({ title, imgLeft }: { title: string; imgLeft: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      p={{ base: 'sm', md: 'md' }}
      radius="md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.06)',
        border: hovered ? '1px solid rgba(203, 220, 235, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        height: '100%',
        cursor: 'default',
        transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(203,220,235,0.2)' : 'none',
        // overflow must be visible so the image can burst out
        overflow: 'visible',
        position: 'relative',
        zIndex: hovered ? 10 : 1,
      }}
    >
      <Stack align="center" gap="sm" style={{ paddingTop: rem(28) }}>
        {/* Icon wrapper: tall enough for the zoomed image to not reflow text */}
        <div
          style={{
            position: 'relative',
            width: rem(80),
            height: rem(80),
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            // overflow visible so the scaled image bursts outside the card
            overflow: 'visible',
            zIndex: hovered ? 20 : 1,
          }}
        >
          <NextImage
            src={imgLeft}
            alt={title}
            width={80}
            height={80}
            style={{
              objectFit: 'contain',
              transformOrigin: 'center bottom',
              transform: hovered
                ? 'scale(1.75) translateY(-14px)'
                : 'scale(1) translateY(0px)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: hovered
                ? 'drop-shadow(0 16px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 8px rgba(203,220,235,0.25))'
                : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
              willChange: 'transform, filter',
            }}
          />
        </div>
        <Text
          fw={600}
          fz={{ base: 'xs', md: 'sm' }}
          c={hovered ? '#ffffff' : '#e9ecef'}
          style={{
            lineHeight: 1.3,
            transition: 'color 0.3s ease',
            marginTop: rem(6),
          }}
        >
          {title}
        </Text>
      </Stack>
    </Card>
  );
}

const angles = [-2, 2.5, -1.5, 3, -2.5, 1.5];

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
      "streetAddress": "100 Main Street, Suite 400",
      "addressLocality": "Metro City",
      "addressRegion": "MC",
      "postalCode": "10001",
      "addressCountry": "US"
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
        h={isDesktop ? undefined : rem(580)}
        style={{
          flex: isDesktop ? 1 : 'none',
          minHeight: isDesktop ? rem(280) : rem(480),
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(90deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.75) 50%, rgba(10, 25, 47, 0.25) 100%), url("/homepage.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
        pt={isDesktop ? rem(10) : rem(50)}
      >
        <Container size="xl" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Stack gap={isDesktop ? 'xs' : 'lg'} style={{ maxWidth: rem(680), zIndex: 5, paddingBottom: isDesktop ? rem(50) : rem(60) }}>
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
                fz={{ base: rem(32), sm: rem(38), md: isDesktop ? rem(40) : rem(48) }}
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
                fz={{ base: rem(14), md: rem(16) }}
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
              <Group gap="md" wrap="wrap">
                <Button
                  component={Link}
                  href="/contact"
                  size="md"
                  radius="md"
                  leftSection={<IconCalendar size={18} />}
                  id="hero-cta-inspection"
                  styles={{
                    root: {
                      backgroundColor: '#00a8ff',
                      color: '#ffffff',
                      fontWeight: 700,
                      paddingLeft: rem(22),
                      paddingRight: rem(22),
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
                  size="md"
                  radius="md"
                  variant="outline"
                  leftSection={<IconFileText size={18} />}
                  id="hero-cta-amc"
                  styles={{
                    root: {
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      fontWeight: 700,
                      paddingLeft: rem(22),
                      paddingRight: rem(22),
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
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(7, 21, 41, 0.9)',
            backdropFilter: 'blur(8px)',
            borderTopLeftRadius: rem(16),
            borderTopRightRadius: rem(16),
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 10,
          }}
          py={rem(22)}
        >
          <Container size="xl">
            <SimpleGrid cols={{ base: 1, sm: 3, md: 5 }} spacing="xl">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size="lg" radius="xl" variant="transparent" style={{ color: '#00a8ff' }}>
                  <IconHeadset size={24} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="13px" fw={800} c="#ffffff" lh={1.2}>24/7</Text>
                  <Text size="11px" c="#8F9CAE" lh={1.2} fw={600}>Emergency Support</Text>
                </Stack>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size="lg" radius="xl" variant="transparent" style={{ color: '#00a8ff' }}>
                  <IconUserCheck size={24} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="13px" fw={800} c="#ffffff" lh={1.2}>Trained &</Text>
                  <Text size="11px" c="#8F9CAE" lh={1.2} fw={600}>Verified Technicians</Text>
                </Stack>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size="lg" radius="xl" variant="transparent" style={{ color: '#00a8ff' }}>
                  <IconShieldCheck size={24} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="13px" fw={800} c="#ffffff" lh={1.2}>ISO Standard</Text>
                  <Text size="11px" c="#8F9CAE" lh={1.2} fw={600}>Procedures</Text>
                </Stack>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size="lg" radius="xl" variant="transparent" style={{ color: '#00a8ff' }}>
                  <IconClock size={24} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="13px" fw={800} c="#ffffff" lh={1.2}>Fast</Text>
                  <Text size="11px" c="#8F9CAE" lh={1.2} fw={600}>Response Time</Text>
                </Stack>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size="lg" radius="xl" variant="transparent" style={{ color: '#00a8ff' }}>
                  <IconFileCheck size={24} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="13px" fw={800} c="#ffffff" lh={1.2}>Annual Maintenance</Text>
                  <Text size="11px" c="#8F9CAE" lh={1.2} fw={600}>Contracts (AMC)</Text>
                </Stack>
              </Group>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      {/* ═══════════════════════ 2. OUR SERVICES (HORIZONTAL CAROUSEL) ═══════════════════════ */}
      <Box
        style={{
          flex: isDesktop ? '0 0 auto' : 'none',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
        }}
        py={isDesktop ? rem(14) : rem(40)}
      >
        <Container size="xl" style={{ width: '100%' }}>
          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%', xl: '16.666%' }}
            slideGap="md"
            withControls={true}
            emblaOptions={{ loop: true, align: 'start', slidesToScroll: 1 }}
            styles={{
              root: { width: '100%' },
              controls: {
                paddingLeft: rem(10),
                paddingRight: rem(10),
              },
              control: {
                backgroundColor: 'rgba(10, 25, 47, 0.85)',
                border: 'none',
                color: '#ffffff',
                width: rem(36),
                height: rem(36),
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: '#00a8ff',
                },
              },
            }}
          >
            {serviceCategories.map((service, index) => (
              <Carousel.Slide key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    padding={0}
                    radius="md"
                    className="hover-lift"
                    id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    style={{
                      height: isDesktop ? rem(175) : rem(240),
                      position: 'relative',
                      overflow: 'hidden',
                      border: '1px solid #eaeaea',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Top Image/Carousel Section */}
                    <Box style={{ height: isDesktop ? rem(135) : rem(130), position: 'relative', overflow: 'hidden' }}>
                      {service.illustrations && service.illustrations.length > 1 ? (
                        <Carousel
                          withIndicators={true}
                          withControls={isDesktop ? false : true}
                          emblaOptions={{ loop: true }}
                          plugins={[Autoplay({ delay: 3500 + index * 200, stopOnInteraction: false })]}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                          }}
                          styles={{
                            root: { height: '100%', width: '100%' },
                            viewport: { height: '100%', width: '100%' },
                            container: { height: '100%', width: '100%' },
                            control: {
                              backgroundColor: 'rgba(0, 0, 0, 0.45)',
                              border: 'none',
                              color: '#ffffff',
                              width: rem(20),
                              height: rem(20),
                            },
                          }}
                        >
                          {service.illustrations.map((imgUrl, idx) => (
                            <Carousel.Slide key={idx} style={{ height: '100%', width: '100%' }}>
                              <Image
                                src={imgUrl}
                                alt={`${service.title} - ${idx + 1}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            </Carousel.Slide>
                          ))}
                        </Carousel>
                      ) : (
                        <Image
                          src={service.illustrations?.[0] || ''}
                          alt={service.title}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                          }}
                          className="service-card-img"
                        />
                      )}
                    </Box>

                    {/* Overlapping Icon Badge */}
                    <ThemeIcon
                      size={rem(32)}
                      radius="xl"
                      color="blue"
                      style={{
                        position: 'absolute',
                        top: isDesktop ? rem(119) : rem(114),
                        left: rem(16),
                        zIndex: 10,
                        border: '2px solid #ffffff',
                        boxShadow: '0 2px 8px rgba(11, 94, 215, 0.2)',
                      }}
                    >
                      <service.icon size={16} />
                    </ThemeIcon>

                    {/* Bottom Inline Row Details Section */}
                    <div
                      style={{
                        padding: isDesktop ? `${rem(8)} ${rem(10)}` : `${rem(14)} ${rem(16)}`,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#ffffff',
                        gap: rem(8),
                      }}
                    >
                      <Text
                        fw={800}
                        fz={isDesktop ? rem(11) : rem(13)}
                        c="#0A192F"
                        style={{
                          lineHeight: 1.2,
                          fontFamily: 'var(--font-open-sans), sans-serif',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          flex: 1,
                        }}
                      >
                        {service.title}
                      </Text>
                      <Link
                        href={`/services#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: rem(2),
                          textDecoration: 'none',
                          color: '#00a8ff',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <Text size={isDesktop ? '10px' : 'xs'} fw={700}>
                          Read More
                        </Text>
                        <IconArrowRight size={isDesktop ? 10 : 12} />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Box>
    </Box>

      {/* ═══════════════════════ 4. WHY CHOOSE US ═══════════════════════ */}
      <Box style={{ backgroundColor: '#E8DFCA' }} py={{ base: 50, md: 80 }} className="why-us-bg">
        <Container size="lg">
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
            cols={{ base: 2, xs: 3, sm: 4, md: 5 }}
            spacing={{ base: 'sm', md: 'lg' }}
            style={{ overflow: 'visible' }}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <IndustryCard
                  title={industry.title}
                  imgLeft={industry.imgLeft}
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
