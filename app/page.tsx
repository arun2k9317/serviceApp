'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
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
    illustration: '/electrical_services.png',
    items: ['Electrical Installation & Wiring', 'Electrical Maintenance', 'Lighting Installation', 'Panel Board Maintenance', 'Generator Support', 'Emergency Electrical Repairs'],
  },
  {
    icon: IconDroplet,
    title: 'Plumbing Services',
    color: 'blue',
    accentHex: '#228be6',
    illustration: '/plumbing_services.png',
    items: ['Pipe Installation & Repair', 'Leak Detection', 'Drain Cleaning', 'Water Tank Maintenance', 'Pump Installation & Maintenance', 'Bathroom & Kitchen Plumbing'],
  },
  {
    icon: IconSnowflake,
    title: 'HVAC & Air Conditioning',
    color: 'cyan',
    accentHex: '#15aabf',
    illustration: '/hvac_and_air_conditioning.png',
    items: ['AC Installation', 'AC Repair & Servicing', 'HVAC Maintenance', 'Duct Cleaning', 'Preventive Maintenance', 'Commercial HVAC Solutions'],
  },
  {
    icon: IconSparkles,
    title: 'Deep Cleaning Services',
    color: 'green',
    accentHex: '#2f9e44',
    illustration: '/deep_cleaning_services.png',
    items: ['Residential Deep Cleaning', 'Commercial Deep Cleaning', 'Move-In / Move-Out Cleaning', 'Floor Cleaning & Polishing', 'Post-Construction Cleaning', 'Sanitization Services'],
  },
  {
    icon: IconArmchair,
    title: 'Sofa, Carpet & Upholstery',
    color: 'grape',
    accentHex: '#ae3ec9',
    illustration: '/sofa_carpet_and_upholstery.png',
    items: ['Sofa Shampooing', 'Fabric Cleaning', 'Leather Cleaning', 'Carpet Cleaning', 'Mattress Cleaning', 'Curtain Cleaning'],
  },
  {
    icon: IconPaint,
    title: 'Painting & Renovation',
    color: 'orange',
    accentHex: '#f76707',
    illustration: '/painting_and_renovation.png',
    items: ['Interior Painting', 'Exterior Painting', 'Wall Repairs', 'Waterproofing', 'Minor Renovation Works', 'Property Refurbishment'],
  },
  {
    icon: IconHome,
    title: 'Housekeeping Services',
    color: 'teal',
    accentHex: '#0c8599',
    illustration: '/house_keeping_services.png',
    items: ['Office Housekeeping', 'Apartment Maintenance', 'Building Cleaning', 'Facility Support Staff', 'Janitorial Services'],
  },
  {
    icon: IconBug,
    title: 'Pest Control Services',
    color: 'red',
    accentHex: '#e03131',
    illustration: '/pest_control_services.png',
    items: ['Residential Pest Control', 'Commercial Pest Management', 'Termite Control', 'Rodent Control', 'Mosquito Treatment'],
  },
  {
    icon: IconTool,
    title: 'General Maintenance',
    color: 'indigo',
    accentHex: '#3b5bdb',
    illustration: '/general_maintenance.png',
    items: ['Handyman Services', 'Preventive Maintenance', 'Property Inspection', 'Building Maintenance', 'Emergency Breakdown Support'],
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
          <Image
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
    "telephone": "+919000000000",
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
          "text": "We provide comprehensive facility management including electrical maintenance, plumbing, HVAC services, deep cleaning, housekeeping, painting, pest control, and general property maintenance."
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
    <Box>
      <JsonLd schema={businessSchema} />
      <JsonLd schema={faqSchema} />

      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <Box
        style={{
          position: 'relative',
          marginTop: rem(-120),
          overflow: 'hidden',
        }}
        h={{ base: rem(600), sm: rem(650), md: rem(680) }}
      >
        <Carousel
          withIndicators={false}
          emblaOptions={{ loop: true, align: 'center', duration: 35 }}
          style={{ height: '100%' }}
          styles={{
            root: { height: '100%' },
            viewport: { height: '100%' },
            container: { height: '100%' },
            control: {
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              color: '#ffffff',
              opacity: 0.6,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              width: rem(50),
              height: rem(50),
              borderRadius: rem(25),
            },
          }}
          nextControlIcon={<IconChevronRight size={36} stroke={1.5} />}
          previousControlIcon={<IconChevronLeft size={36} stroke={1.5} />}
        >
          {/* Slide 1 */}
          <Carousel.Slide>
            <Box
              style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              pt={{ base: rem(70), md: rem(100) }}
              px={{ base: 'sm', md: 0 }}
            >
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(rgba(43, 58, 85, 0.72), rgba(43, 58, 85, 0.72)), url("/homes.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                }}
              />
              <Container size="md" style={{ position: 'relative', zIndex: 2 }}>
                <Stack align="center" gap="md" ta="center">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <Badge
                      color="brandBlue"
                      size="lg"
                      radius="sm"
                      mb="sm"
                      styles={{ root: { color: '#ffffff', fontWeight: 700 } }}
                    >
                      Reliable Service | Skilled Professionals | Quality Assured
                    </Badge>
                    <Title
                      order={1}
                      fz={{ base: rem(28), sm: rem(38), md: rem(48) }}
                      fw={900}
                      c="#ffffff"
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: rem(1.5),
                        fontFamily: 'var(--font-open-sans), sans-serif',
                        lineHeight: 1.15,
                      }}
                    >
                      Complete Facility Management{' '}
                      <Text component="span" inherit c="#CBDCEB">Solutions</Text>{' '}
                      Under One Roof
                    </Title>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  >
                    <Text
                      fz={{ base: rem(15), md: rem(18) }}
                      ff="var(--font-pt-sans), sans-serif"
                      fs="italic"
                      c="#f8f9fa"
                      maw={760}
                      lh={1.6}
                    >
                      Keeping Homes, Offices, Commercial Buildings, Hospitals, Hotels, and Industrial Facilities Running Efficiently.
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                  >
                    <Group gap="md" wrap="wrap" justify="center">
                      <Button
                        component={Link}
                        href="/contact"
                        size="md"
                        radius="xl"
                        id="hero-cta-consultation"
                        styles={{
                          root: {
                            backgroundColor: '#6D94C5',
                            color: '#ffffff',
                            fontWeight: 700,
                            paddingLeft: rem(28),
                            paddingRight: rem(28),
                            fontSize: rem(13),
                            textTransform: 'uppercase',
                            letterSpacing: rem(1),
                            boxShadow: '0 4px 15px rgba(109, 148, 197, 0.35)',
                            '&:hover': { backgroundColor: '#5a80b0' },
                          },
                        }}
                      >
                        Get Free Consultation
                      </Button>
                      <Button
                        component={Link}
                        href="/contact?service=Quote"
                        size="md"
                        radius="xl"
                        variant="outline"
                        id="hero-cta-quote"
                        styles={{
                          root: {
                            borderColor: '#ffffff',
                            color: '#ffffff',
                            fontWeight: 700,
                            paddingLeft: rem(28),
                            paddingRight: rem(28),
                            fontSize: rem(13),
                            textTransform: 'uppercase',
                            letterSpacing: rem(1),
                            '&:hover': { borderColor: '#CBDCEB', color: '#CBDCEB' },
                          },
                        }}
                      >
                        Request a Quote
                      </Button>
                    </Group>
                  </motion.div>
                </Stack>
              </Container>
            </Box>
          </Carousel.Slide>

          {/* Slide 2 */}
          <Carousel.Slide>
            <Box
              style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              pt={{ base: rem(70), md: rem(100) }}
              px={{ base: 'sm', md: 0 }}
            >
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(rgba(43, 58, 85, 0.72), rgba(43, 58, 85, 0.72)), url("/beach.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                }}
              />
              <Container size="md" style={{ position: 'relative', zIndex: 2 }}>
                <Stack align="center" gap="md" ta="center">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <Title
                      order={1}
                      fz={{ base: rem(30), sm: rem(42), md: rem(52) }}
                      fw={900}
                      c="#ffffff"
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: rem(1.5),
                        fontFamily: 'var(--font-open-sans), sans-serif',
                        lineHeight: 1.15,
                      }}
                    >
                      Your Property.{' '}
                      <Text component="span" inherit c="#CBDCEB">Our Responsibility.</Text>
                    </Title>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  >
                    <Text
                      fz={{ base: rem(15), md: rem(18) }}
                      ff="var(--font-pt-sans), sans-serif"
                      fs="italic"
                      c="#f8f9fa"
                      maw={760}
                      lh={1.6}
                    >
                      Professional Facility Management Solutions for Every Space. We provide dependable services tailored to your requirements.
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                  >
                    <Button
                      component={Link}
                      href="/services"
                      size="md"
                      radius="xl"
                      id="hero-cta-services"
                      styles={{
                        root: {
                          backgroundColor: '#ffc104',
                          color: '#2a2f35',
                          fontWeight: 700,
                          paddingLeft: rem(28),
                          paddingRight: rem(28),
                          fontSize: rem(13),
                          textTransform: 'uppercase',
                          letterSpacing: rem(1),
                          boxShadow: '0 4px 15px rgba(255, 193, 4, 0.3)',
                          '&:hover': { backgroundColor: '#e6ad00' },
                        },
                      }}
                    >
                      Explore Our Services
                    </Button>
                  </motion.div>
                </Stack>
              </Container>
            </Box>
          </Carousel.Slide>
        </Carousel>

        {/* Scroll Down Chevrons */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: rem(25),
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            cursor: 'pointer',
            color: '#ffffff',
            opacity: 0.8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 100,
              behavior: 'smooth'
            });
          }}
        >
          <IconChevronsDown size={28} style={{ color: '#CBDCEB' }} />
        </motion.div>
      </Box>

      {/* ═══════════════════════ 2. STATISTICS SECTION ═══════════════════════ */}
      <Box
        style={{
          backgroundColor: '#6D94C5',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(109, 148, 197, 0.3)',
          color: '#FFFFFF',
        }}
        py={{ base: 40, md: 50 }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <Stack gap={5} align="center">
              <Title order={3} fz={{ base: 'h2', md: 'h1' }} fw={900}>
                <Counter value={5200} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Happy Clients</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} fz={{ base: 'h2', md: 'h1' }} fw={900}>
                <Counter value={50} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Services Offered</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} fz={{ base: 'h2', md: 'h1' }} fw={900}>
                <Counter value={8900} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Projects Completed</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} fz={{ base: 'h2', md: 'h1' }} fw={900}>
                <Counter value={12} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Years Experience</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ═══════════════════════ 3. OUR SERVICES ═══════════════════════ */}
      <Container size="lg" py={{ base: 50, md: 80 }}>
        <SectionHeader
          subtitle="What We Offer"
          title="Our Professional Services"
          description="We provide professional facility management services including electrical maintenance, plumbing solutions, HVAC services, deep cleaning, and comprehensive property maintenance."
        />

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{ height: '100%' }}
            >
              <Card
                padding={0}
                radius="xl"
                className="hover-lift service-full-card"
                id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                style={{
                  height: rem(340),
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${service.accentHex}44`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.10)`,
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  cursor: 'default',
                }}
              >
                {/* Next.js Optimized Image background */}
                <Image
                  src={service.illustration}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                  style={{
                    objectFit: 'cover',
                    zIndex: 0,
                  }}
                  className="service-card-img"
                />

                {/* strong bottom gradient scrim for readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to bottom,
                    rgba(0,0,0,0.08) 0%,
                    rgba(0,0,0,0.18) 35%,
                    rgba(0,0,0,0.68) 70%,
                    rgba(0,0,0,0.88) 100%)`,
                  transition: 'background 0.3s ease',
                  zIndex: 1,
                }} className="service-card-scrim" />

                {/* subtle accent tint top-left */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at top left, ${service.accentHex}30 0%, transparent 60%)`,
                  pointerEvents: 'none',
                  zIndex: 2,
                }} />

                {/* all content pinned to bottom */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: rem(18),
                  gap: rem(10),
                  zIndex: 3,
                }}>
                  {/* badge chips */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: rem(6),
                  }}>
                    {service.items.map((item) => (
                      <Badge
                        key={item}
                        radius="xl"
                        size="xs"
                        styles={{
                          root: {
                            backgroundColor: 'rgba(255,255,255,0.13)',
                            color: '#ffffff',
                            border: `1px solid rgba(255,255,255,0.28)`,
                            backdropFilter: 'blur(6px)',
                            fontWeight: 500,
                            fontSize: rem(10.5),
                            textTransform: 'none',
                            letterSpacing: 0,
                            padding: `${rem(4)} ${rem(9)}`,
                            height: 'auto',
                            whiteSpace: 'normal',
                            lineHeight: 1.35,
                            cursor: 'default',
                          },
                        }}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>

                  {/* icon + title row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: rem(12),
                  }}>
                    <div style={{
                      width: rem(44),
                      height: rem(44),
                      borderRadius: rem(12),
                      backgroundColor: service.accentHex,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 16px ${service.accentHex}77`,
                    }}>
                      <service.icon size={22} color="#ffffff" stroke={1.8} />
                    </div>
                    <Text
                      fw={800}
                      size="md"
                      c="#ffffff"
                      style={{
                        fontFamily: 'var(--font-open-sans), sans-serif',
                        lineHeight: 1.2,
                        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        letterSpacing: rem(0.2),
                      }}
                    >
                      {service.title}
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>



        <Group justify="center" mt={40}>
          <Button
            component={Link}
            href="/services"
            variant="outline"
            color="brandBlue"
            size="md"
            id="services-explore-all"
            rightSection={<IconArrowRight size={16} />}
          >
            View All Services
          </Button>
        </Group>
      </Container>

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
