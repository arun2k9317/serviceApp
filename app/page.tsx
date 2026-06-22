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
  List,
  Divider,
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
        c={white ? '#ffc104' : 'dimmed'}
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
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(255,255,255,0.2)' : 'linear-gradient(to right, transparent, #dbdbdb)' }} />
        <Box style={{ width: rem(7), height: rem(7), borderRadius: '50%', border: `1px solid ${white ? 'rgba(255,255,255,0.4)' : '#dbdbdb'}`, background: white ? 'transparent' : 'var(--mantine-color-body)' }} />
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(255,255,255,0.2)' : 'linear-gradient(to left, transparent, #dbdbdb)' }} />
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
    items: ['Electrical Installation & Wiring', 'Electrical Maintenance', 'Lighting Installation', 'Panel Board Maintenance', 'Generator Support', 'Emergency Electrical Repairs'],
  },
  {
    icon: IconDroplet,
    title: 'Plumbing Services',
    color: 'blue',
    items: ['Pipe Installation & Repair', 'Leak Detection', 'Drain Cleaning', 'Water Tank Maintenance', 'Pump Installation & Maintenance', 'Bathroom & Kitchen Plumbing'],
  },
  {
    icon: IconSnowflake,
    title: 'HVAC & Air Conditioning',
    color: 'cyan',
    items: ['AC Installation', 'AC Repair & Servicing', 'HVAC Maintenance', 'Duct Cleaning', 'Preventive Maintenance', 'Commercial HVAC Solutions'],
  },
  {
    icon: IconSparkles,
    title: 'Deep Cleaning Services',
    color: 'green',
    items: ['Residential Deep Cleaning', 'Commercial Deep Cleaning', 'Move-In / Move-Out Cleaning', 'Floor Cleaning & Polishing', 'Post-Construction Cleaning', 'Sanitization Services'],
  },
  {
    icon: IconArmchair,
    title: 'Sofa, Carpet & Upholstery',
    color: 'grape',
    items: ['Sofa Shampooing', 'Fabric Cleaning', 'Leather Cleaning', 'Carpet Cleaning', 'Mattress Cleaning', 'Curtain Cleaning'],
  },
  {
    icon: IconPaint,
    title: 'Painting & Renovation',
    color: 'orange',
    items: ['Interior Painting', 'Exterior Painting', 'Wall Repairs', 'Waterproofing', 'Minor Renovation Works', 'Property Refurbishment'],
  },
  {
    icon: IconHome,
    title: 'Housekeeping Services',
    color: 'teal',
    items: ['Office Housekeeping', 'Apartment Maintenance', 'Building Cleaning', 'Facility Support Staff', 'Janitorial Services'],
  },
  {
    icon: IconBug,
    title: 'Pest Control Services',
    color: 'red',
    items: ['Residential Pest Control', 'Commercial Pest Management', 'Termite Control', 'Rodent Control', 'Mosquito Treatment'],
  },
  {
    icon: IconTool,
    title: 'General Maintenance',
    color: 'indigo',
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

// ─── CORE VALUES DATA ────────────────────────────────────────────────────────
const coreValues = [
  { icon: IconStar, title: 'Excellence', desc: 'Delivering superior quality in every project.' },
  { icon: IconHeartHandshake, title: 'Integrity', desc: 'Operating with honesty, transparency, and accountability.' },
  { icon: IconShieldCheck, title: 'Reliability', desc: 'Providing dependable services that clients can trust.' },
  { icon: IconBulb, title: 'Innovation', desc: 'Adopting modern techniques and technologies.' },
  { icon: IconShieldCheck, title: 'Safety', desc: 'Protecting people, property, and the environment.' },
  { icon: IconTargetArrow, title: 'Commitment', desc: 'Dedicated to exceeding customer expectations.' },
];

// ─── INDUSTRY CARD HELPER COMPONENT (Zooms building asset on hover) ──────────
function IndustryCard({ title, imgLeft }: { title: string; imgLeft: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      padding={{ base: 'sm', md: 'md' }}
      radius="md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        height: '100%',
        cursor: 'default',
        transition: 'all 0.3s ease',
      }}
      className="hover-lift"
    >
      <Stack align="center" gap="sm">
        <div style={{ position: 'relative', width: rem(80), height: rem(80), display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: rem(4) }}>
          <Image
            src={imgLeft}
            alt={title}
            width={80}
            height={80}
            style={{
              objectFit: 'contain',
              transform: hovered ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </div>
        <Text fw={600} fz={{ base: 'xs', md: 'sm' }} c="#e9ecef" style={{ lineHeight: 1.3 }}>
          {title}
        </Text>
      </Stack>
    </Card>
  );
}

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
        h={{ base: rem(650), sm: rem(720), md: rem(780) }}
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
              pt={{ base: rem(80), md: rem(120) }}
              px={{ base: 'sm', md: 0 }}
            >
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.6), rgba(42, 47, 53, 0.6)), url("/homes.jpg")',
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
                      color="brandYellow"
                      size="lg"
                      radius="sm"
                      mb="sm"
                      styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}
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
                      <Text component="span" inherit c="#ffc104">Solutions</Text>{' '}
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
                            '&:hover': { borderColor: '#ffc104', color: '#ffc104' },
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
              pt={{ base: rem(80), md: rem(120) }}
              px={{ base: 'sm', md: 0 }}
            >
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.6), rgba(42, 47, 53, 0.6)), url("/beach.jpg")',
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
                      <Text component="span" inherit c="#ffc104">Our Responsibility.</Text>
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
          <IconChevronsDown size={28} style={{ color: '#ffc104' }} />
        </motion.div>
      </Box>

      {/* ═══════════════════════ 2. STATISTICS SECTION ═══════════════════════ */}
      <Box
        style={{
          backgroundColor: '#2a2f35',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
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

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                padding="lg"
                radius="md"
                withBorder
                style={{ height: '100%' }}
                className="hover-lift"
                id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <Group gap="sm" mb="md" wrap="nowrap">
                  <ThemeIcon radius="md" size="lg" color={service.color} variant="light" style={{ flexShrink: 0 }}>
                    <service.icon size={22} />
                  </ThemeIcon>
                  <Text fw={800} size="md" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
                    {service.title}
                  </Text>
                </Group>
                <List
                  spacing="xs"
                  size="sm"
                  icon={
                    <ThemeIcon color={service.color} size={16} radius="xl" variant="light">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  }
                  styles={{
                    itemWrapper: { alignItems: 'flex-start' },
                  }}
                >
                  {service.items.map((item) => (
                    <List.Item key={item}>
                      <Text size="sm" c="dimmed">{item}</Text>
                    </List.Item>
                  ))}
                </List>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

        <Group justify="center" mt={40}>
          <Button
            component={Link}
            href="/services"
            variant="outline"
            color="brandYellow"
            size="md"
            id="services-explore-all"
            rightSection={<IconArrowRight size={16} />}
          >
            View All Services
          </Button>
        </Group>
      </Container>

      {/* ═══════════════════════ 4. WHY CHOOSE US ═══════════════════════ */}
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)' }} py={{ base: 50, md: 80 }} className="why-us-bg">
        <Container size="lg">
          <SectionHeader
            subtitle="Why Choose Us"
            title="Your Trusted Facility Partner"
            description="We set high standards in facility management by focusing on quality, safety, and customer satisfaction."
          />

          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card padding="lg" radius="md" withBorder style={{ height: '100%', textAlign: 'center' }} className="hover-lift">
                  <Stack align="center" gap="sm">
                    <ThemeIcon radius="xl" size={56} color="brandYellow" variant="light">
                      <item.icon size={28} style={{ color: '#e6ad00' }} />
                    </ThemeIcon>
                    <Text fw={700} size="md">
                      {item.title}
                    </Text>
                    <Text size="sm" c="dimmed" lh={1.5}>
                      {item.desc}
                    </Text>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ═══════════════════════ 5. INDUSTRIES WE SERVE ═══════════════════════ */}
      <Box
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.92), rgba(42, 47, 53, 0.92)), url("/hero_female_engineer.png")',
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

          <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 5 }} spacing={{ base: 'sm', md: 'lg' }}>
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <IndustryCard
                  title={industry.title}
                  imgLeft={industry.imgLeft}
                  imgRight={industry.imgRight}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ═══════════════════════ 6. CORE VALUES ═══════════════════════ */}
      <Container size="lg" py={{ base: 50, md: 80 }}>
        <SectionHeader
          subtitle="What Drives Us"
          title="Our Core Values"
          description="Our work is guided by strong values that ensure every project meets the highest standards of professionalism."
        />

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card
                padding="xl"
                radius="md"
                withBorder
                style={{
                  height: '100%',
                  borderLeft: '4px solid #ffc104',
                }}
                className="hover-lift"
              >
                <Group gap="md" mb="xs" wrap="nowrap">
                  <ThemeIcon radius="md" size="lg" color="brandYellow" variant="light" style={{ flexShrink: 0 }}>
                    <value.icon size={22} style={{ color: '#e6ad00' }} />
                  </ThemeIcon>
                  <Text fw={800} size="md" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
                    {value.title}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed" lh={1.6}>
                  {value.desc}
                </Text>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>

      {/* ═══════════════════════ 7. TESTIMONIALS ═══════════════════════ */}
      {testimonials.length > 0 && (
        <Box
          style={{
            position: 'relative',
            backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.88), rgba(42, 47, 53, 0.88)), url("/hero_female_engineer.png")',
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

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={40}>
              {testimonials.slice(0, 6).map((t) => {
                const initials = t.customer_name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <Stack key={t.id} gap="sm" style={{ height: '100%' }}>
                    <Group gap="md" align="center" wrap="nowrap">
                      <Avatar
                        color="brandYellow"
                        radius="xl"
                        size={60}
                        style={{ border: '2px solid rgba(255, 193, 4, 0.4)', flexShrink: 0 }}
                        styles={{ placeholder: { color: '#2a2f35', fontWeight: 700 } }}
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
                            c="#ffc104"
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
                      pl={4}
                    >
                      « {t.review} »
                    </Text>
                  </Stack>
                );
              })}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* ═══════════════════════ 8. CTA WITH LEAD FORM ═══════════════════════ */}
      <Box
        style={{
          background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)',
          borderTop: '1px solid var(--mantine-color-default-border)',
        }}
        py={{ base: 50, md: 80 }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} style={{ alignItems: 'center' }}>
            {/* Left side: text CTA */}
            <Stack gap="md">
              <Badge color="brandYellow" size="lg" radius="sm" styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}>
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
                <Text component="span" inherit c="#ffc104">Our Responsibility.</Text>
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
