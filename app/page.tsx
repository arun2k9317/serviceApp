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
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import {
  IconPhoneCall,
  IconShieldCheck,
  IconClock,
  IconUsers,
  IconCircleCheck,
  IconFileText,
  IconTimeline,
  IconArrowRight,
  IconRosetteFilled,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsDown,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Custom components
import Counter from '../components/ui/Counter';
import ServiceCard from '../components/ui/ServiceCard';
import TestimonialCarousel from '../components/ui/TestimonialCarousel';
import CallbackForm from '../components/forms/CallbackForm';
import JsonLd from '../components/SEO/JsonLd';

// Server Actions imports (client safe since they are marked 'use server')
import { getTestimonials, getOffers, getInquiries } from '../lib/actions';

// Structured seed services for visual consistency
const quickServices = [
  { title: 'AC Maintenance', slug: 'ac-maintenance', desc: 'Routine servicing & coil washing', color: 'blue' },
  { title: 'Deep Cleaning', slug: 'deep-cleaning', desc: 'Sanitizing, scrubbing & descaling', color: 'green' },
  { title: 'AMC Services', slug: 'amc-services', desc: 'Annual maintenance contracts', color: 'teal' },
  { title: 'Emergency Support', slug: 'emergency-support', desc: '24/7 breakdown callouts', color: 'red' },
];

const trustPoints = [
  { icon: IconClock, title: 'Fast Response Support', desc: 'Emergency dispatch within 2 hours across major Kerala towns.' },
  { icon: IconUsers, title: 'Experienced Technicians', desc: 'All staff are police-verified, certified, and fully insured.' },
  { icon: IconRosetteFilled, title: 'Transparent Pricing', desc: 'Detailed quotes prior to execution. Absolutely no hidden charges.' },
  { icon: IconShieldCheck, title: 'Preventive Approach', desc: 'Focused on stopping outages before they occur, protecting assets.' },
  { icon: IconFileText, title: 'Professional Reports', desc: 'Detailed snag-lists and work completion reports sent digitally.' },
  { icon: IconCircleCheck, title: 'Customer First Focus', desc: 'Over 98% customer satisfaction rating in residential & commercial sites.' },
];

const featuredServices = [
  {
    title: 'AC Maintenance & Servicing',
    slug: 'ac-maintenance',
    description: 'Complete split & ducted AC coil washing, pressure checks, descaling, gas charging, and structural filter sanitization.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    benefits: ['Lowers electricity bills', 'Improves airflow cooling', 'Prevents compressor failure'],
  },
  {
    title: 'Deep Cleaning Services',
    slug: 'deep-cleaning',
    description: 'Thorough villa, flat, and corporate office cleaning. Machine floor scrubbing, toilet descaling, window washing, and steam sanitization.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    benefits: ['Removes dust and molds', 'Hospital-grade sanitizers', 'Restores surface polish'],
  },
  {
    title: 'Annual Maintenance Contracts (AMC)',
    slug: 'amc-services',
    description: 'Total home protection package covering routine electrical audits, plumbing checkups, scheduled AC washes, and unlimited emergency callouts.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    benefits: ['Zero troubleshooting fees', 'Priority response roster', '4 comprehensive audits/year'],
  },
];

export default function HomePage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // Load testimonials asynchronously from actions
    getTestimonials().then((res) => {
      setTestimonials(res.filter(t => t.is_featured));
    });
  }, []);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Full Maintenance & Deep Cleaning Company",
    "image": "https://fullmaintenance.com/og-image.jpg",
    "@id": "https://fullmaintenance.com/#organization",
    "url": "https://fullmaintenance.com",
    "telephone": "+919000000000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH Bypass, Vyttila",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682019",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.975488,
      "longitude": 76.321689
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
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
        "name": "Do you provide emergency breakdown support in Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide 24/7 emergency support for electrical short-circuits, severe pipe leaks, and AC breakdowns across Kochi, Trivandrum, Calicut, and Thrissur."
        }
      },
      {
        "@type": "Question",
        "name": "Is the site inspection visual audit really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our mechanical & electrical visual snag checklist audit is 100% free with no obligation. We give you a digital copy of our findings."
        }
      }
    ]
  };

  return (
    <Box>
      <JsonLd schema={businessSchema} />
      <JsonLd schema={faqSchema} />
      {/* 1. HERO SECTION (Bricks Design Redesign) */}
      <Box
        style={{
          position: 'relative',
          marginTop: rem(-120), // pull up behind header
          height: rem(780), // tall hero block
          overflow: 'hidden',
        }}
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
                backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.55), rgba(42, 47, 53, 0.55)), url("/hero_female_engineer.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: rem(120), // offset for transparent header
              }}
            >
              <Container size="md">
                <Stack align="center" gap="md" ta="center">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Title
                      order={1}
                      style={{
                        fontSize: rem(52),
                        fontWeight: 900,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: rem(1.5),
                        fontFamily: 'var(--font-open-sans), sans-serif',
                        lineHeight: 1.15,
                      }}
                    >
                      CONSTRUCT YOUR FUTURE
                    </Title>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  >
                    <Text
                      style={{
                        fontSize: rem(18),
                        fontFamily: 'var(--font-pt-sans), sans-serif',
                        fontStyle: 'italic',
                        color: '#f8f9fa',
                        lineHeight: 1.6,
                        maxWidth: rem(760),
                      }}
                    >
                      As the general contractor, we first create the highest level of trust and integrity with our clients. We value our role in the success of your project.
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      radius="xl"
                      color="brandYellow"
                      styles={{
                        root: {
                          backgroundColor: '#ffc104',
                          color: '#2a2f35',
                          fontWeight: 700,
                          paddingLeft: rem(36),
                          paddingRight: rem(36),
                          height: rem(50),
                          fontSize: rem(14),
                          textTransform: 'uppercase',
                          letterSpacing: rem(1),
                          boxShadow: '0 4px 15px rgba(255, 193, 4, 0.3)',
                          '&:hover': {
                            backgroundColor: '#e6ad00',
                          },
                        },
                      }}
                    >
                      View More
                    </Button>
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
                backgroundImage: 'linear-gradient(rgba(42, 47, 53, 0.55), rgba(42, 47, 53, 0.55)), url("https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: rem(120), // offset for transparent header
              }}
            >
              <Container size="md">
                <Stack align="center" gap="md" ta="center">
                  <Title
                    order={1}
                    style={{
                      fontSize: rem(52),
                      fontWeight: 900,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: rem(1.5),
                      fontFamily: 'var(--font-open-sans), sans-serif',
                      lineHeight: 1.15,
                    }}
                  >
                    MAINTAIN YOUR FUTURE
                  </Title>
                  
                  <Text
                    style={{
                      fontSize: rem(18),
                      fontFamily: 'var(--font-pt-sans), sans-serif',
                      fontStyle: 'italic',
                      color: '#f8f9fa',
                      lineHeight: 1.6,
                      maxWidth: rem(760),
                    }}
                  >
                    Providing premium AC maintenance, plumbing, electrical, and deep cleaning services across Kerala. We value our role in the safety and comfort of your property.
                  </Text>

                  <Button
                    component={Link}
                    href="/services"
                    size="lg"
                    radius="xl"
                    color="brandYellow"
                    styles={{
                      root: {
                        backgroundColor: '#ffc104',
                        color: '#2a2f35',
                        fontWeight: 700,
                        paddingLeft: rem(36),
                        paddingRight: rem(36),
                        height: rem(50),
                        fontSize: rem(14),
                        textTransform: 'uppercase',
                        letterSpacing: rem(1),
                        boxShadow: '0 4px 15px rgba(255, 193, 4, 0.3)',
                        '&:hover': {
                          backgroundColor: '#e6ad00',
                        },
                      },
                    }}
                  >
                    Our Services
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Carousel.Slide>
        </Carousel>

        {/* Scroll Down Double Chevrons */}
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

      {/* 2. QUICK SERVICES GRID */}
      <Container size="lg" py={60}>
        <div className="section-header">
          <span className="subtitle">Need Quick Assistance?</span>
          <h2>Our Quick Portals</h2>
          <div className="bricks-divider"><i></i></div>
          <p>Select one of our popular categories below for direct booking or consultation routing.</p>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          {quickServices.map((service, idx) => (
            <motion.div
              key={service.slug}
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card
                component={Link}
                href={service.slug === 'deep-cleaning' ? '/deep-cleaning' : (service.slug === 'amc-services' ? '/amc' : `/services/${service.slug}`)}
                padding="md"
                radius="md"
                withBorder
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: rem(15),
                  cursor: 'pointer',
                  borderColor: `var(--mantine-color-${service.color}-2)`,
                  backgroundColor: `var(--mantine-color-${service.color}-0)`,
                }}
                className="hover-lift"
              >
                <ThemeIcon size="lg" radius="md" color={service.color}>
                  <IconPhoneCall size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={700} size="sm" c={`var(--mantine-color-${service.color}-9)`}>
                    {service.title}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={1}>
                    {service.desc}
                  </Text>
                </div>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>

      {/* 3. STATISTICS SECTION */}
      <Box
        style={{
          backgroundColor: '#2a2f35',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: '#FFFFFF',
          paddingTop: rem(50),
          paddingBottom: rem(50),
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <Stack gap={5} align="center">
              <Title order={3} size="h1" fw={900}>
                <Counter value={5200} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Happy Clients</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} size="h1" fw={900}>
                <Counter value={450} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>AMC Customers</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} size="h1" fw={900}>
                <Counter value={8900} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Projects Completed</Text>
            </Stack>
            <Stack gap={5} align="center">
              <Title order={3} size="h1" fw={900}>
                <Counter value={12} suffix="+" />
              </Title>
              <Text size="sm" style={{ opacity: 0.85, fontWeight: 600 }}>Years Experience</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 4. FEATURED SERVICES */}
      <Container size="lg" py={80}>
        <div className="section-header">
          <span className="subtitle">Our Expertise</span>
          <h2>Featured Maintenance Services</h2>
          <div className="bricks-divider"><i></i></div>
          <p>We deliver top-quality technical support and clean environments. Choose from our key services built for Kerala homes and companies.</p>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              slug={service.slug}
              description={service.description}
              imageUrl={service.imageUrl}
              benefits={service.benefits}
              index={index}
            />
          ))}
        </SimpleGrid>

        <Box style={{ display: 'flex', justifyContent: 'center' }} mt={40}>
          <Button component={Link} href="/services" variant="outline" color="brandYellow" size="md" rightSection={<IconArrowRight size={16} />}>
            Explore All Services
          </Button>
        </Box>
      </Container>

      {/* 5. WHY CLIENTS TRUST US */}
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)' }} py={80} className="why-us-bg">
        <Container size="lg">
          <div className="section-header">
            <span className="subtitle">Why Choose Us</span>
            <h2>Excellence in Facility Support</h2>
            <div className="bricks-divider"><i></i></div>
            <p>We set high standards in maintenance work by focusing on safety, transparency, and detailed reporting.</p>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {trustPoints.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card padding="lg" radius="md" withBorder style={{ height: '100%' }} className="hover-lift">
                  <ThemeIcon radius="md" size="xl" color="green" variant="light" mb="md">
                    <item.icon size={26} />
                  </ThemeIcon>
                  <Text fw={700} size="md" mb="xs">
                    {item.title}
                  </Text>
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
                    {item.desc}
                  </Text>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 6. TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <Box style={{ backgroundColor: '#2a2f35', paddingTop: rem(80), paddingBottom: rem(80) }}>
          <Container size="lg">
            <div className="section-header white">
              <span className="subtitle">Client Feedback</span>
              <h2>What Our Clients Say</h2>
              <div className="bricks-divider"><i></i></div>
              <p>Real reviews from real villa owners, apartment residents, and corporate facilities managers in Kerala.</p>
            </div>

            <TestimonialCarousel testimonials={testimonials} />
          </Container>
        </Box>
      )}

      {/* 7. CALL TO ACTION (CTA) WITH LEAD FORM */}
      <Box
        style={{
          background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)',
          paddingTop: rem(80),
          paddingBottom: rem(80),
          borderTop: '1px solid var(--mantine-color-default-border)',
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} style={{ alignItems: 'center' }}>
            {/* Left side: text CTA */}
            <Stack gap="md">
              <Badge color="brandYellow" size="lg" radius="sm" styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}>📅 Free Booking</Badge>
              <Title order={2} fw={900} style={{ fontSize: rem(34), lineHeight: 1.25, fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Schedule Your Free <br />
                Site Inspection Today
              </Title>
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                Our senior mechanical & electrical inspector will visit your villa or office building, carry out a visual auditing snag-check on AC cooling, wiring, and pressure plumbing, and hand you a detailed diagnostic report with no obligations!
              </Text>
              
              <Stack gap="xs" mt="xs">
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green">
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>100% Free visual inspection & checklist report</Text>
                </Group>
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green">
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>Available in Kochi, Trivandrum, Kozhikode, Thrissur</Text>
                </Group>
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon radius="xl" size="xs" color="green">
                    <IconShieldCheck size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>Zero obligation quote for repairs or annual contracts</Text>
                </Group>
              </Stack>
            </Stack>

            {/* Right side: quick callback form */}
            <div>
              <CallbackForm />
            </div>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
