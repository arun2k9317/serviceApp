'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Stack,
  Group,
  Box,
  rem,
  Breadcrumbs,
  Anchor,
  List,
  Button,
  Badge,
} from '@mantine/core';
import {
  IconBolt,
  IconDroplet,
  IconSnowflake,
  IconSparkles,
  IconArmchair,
  IconPaint,
  IconHome,
  IconBug,
  IconTool,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// ─── SERVICE CATEGORIES DATA ─────────────────────────────────────────────────
const serviceCategories = [
  {
    icon: IconBolt,
    title: 'Electrical Services',
    color: 'yellow',
    slug: 'electrical',
    description: 'Complete electrical solutions from installation to emergency repairs. Our certified electricians ensure your property\'s electrical systems run safely and efficiently.',
    items: ['Electrical Installation & Wiring', 'Electrical Maintenance', 'Lighting Installation', 'Panel Board Maintenance', 'Generator Support', 'Emergency Electrical Repairs'],
  },
  {
    icon: IconDroplet,
    title: 'Plumbing Services',
    color: 'blue',
    slug: 'plumbing',
    description: 'Professional plumbing solutions for residential and commercial properties. From leak detection to full installations, we handle all your plumbing needs.',
    items: ['Pipe Installation & Repair', 'Leak Detection', 'Drain Cleaning', 'Water Tank Maintenance', 'Pump Installation & Maintenance', 'Bathroom & Kitchen Plumbing'],
  },
  {
    icon: IconSnowflake,
    title: 'HVAC & Air Conditioning',
    color: 'cyan',
    slug: 'hvac',
    description: 'Keep your spaces cool and comfortable. Our HVAC technicians provide installation, servicing, and preventive maintenance for all types of cooling systems.',
    items: ['AC Installation', 'AC Repair & Servicing', 'HVAC Maintenance', 'Duct Cleaning', 'Preventive Maintenance', 'Commercial HVAC Solutions'],
  },
  {
    icon: IconSparkles,
    title: 'Deep Cleaning Services',
    color: 'green',
    slug: 'deep-cleaning',
    description: 'Thorough cleaning solutions that leave every corner spotless. We use advanced equipment and eco-friendly products for a hygienic environment.',
    items: ['Residential Deep Cleaning', 'Commercial Deep Cleaning', 'Move-In / Move-Out Cleaning', 'Floor Cleaning & Polishing', 'Post-Construction Cleaning', 'Sanitization Services'],
  },
  {
    icon: IconArmchair,
    title: 'Sofa, Carpet & Upholstery Cleaning',
    color: 'grape',
    slug: 'upholstery',
    description: 'Restore your soft furnishings to their original glory with professional cleaning. Safe treatments for all fabric types and materials.',
    items: ['Sofa Shampooing', 'Fabric Cleaning', 'Leather Cleaning', 'Carpet Cleaning', 'Mattress Cleaning', 'Curtain Cleaning'],
  },
  {
    icon: IconPaint,
    title: 'Painting & Renovation',
    color: 'orange',
    slug: 'painting',
    description: 'Transform your space with professional painting and renovation services. From interior makeovers to exterior waterproofing, we handle it all.',
    items: ['Interior Painting', 'Exterior Painting', 'Wall Repairs', 'Waterproofing', 'Minor Renovation Works', 'Property Refurbishment'],
  },
  {
    icon: IconHome,
    title: 'Housekeeping Services',
    color: 'teal',
    slug: 'housekeeping',
    description: 'Reliable housekeeping and janitorial services to keep your property clean, organized, and welcoming at all times.',
    items: ['Office Housekeeping', 'Apartment Maintenance', 'Building Cleaning', 'Facility Support Staff', 'Janitorial Services'],
  },
  {
    icon: IconBug,
    title: 'Pest Control Services',
    color: 'red',
    slug: 'pest-control',
    description: 'Protect your property from pest infestations with our safe and effective pest management solutions for both residential and commercial spaces.',
    items: ['Residential Pest Control', 'Commercial Pest Management', 'Termite Control', 'Rodent Control', 'Mosquito Treatment'],
  },
  {
    icon: IconTool,
    title: 'General Maintenance',
    color: 'indigo',
    slug: 'general-maintenance',
    description: 'All-purpose maintenance support from handyman services to emergency breakdown resolution. We keep your facility running smoothly.',
    items: ['Handyman Services', 'Preventive Maintenance', 'Property Inspection', 'Building Maintenance', 'Emergency Breakdown Support'],
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Box py={{ base: 30, md: 40 }}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>

        <Box
          style={{
            borderLeft: '4px solid #6D94C5',
            paddingLeft: rem(16),
          }}
          mb="xl"
        >
          <Title
            order={1}
            fw={900}
            fz={{ base: rem(22), sm: rem(28), md: rem(32) }}
            ff="var(--font-open-sans), sans-serif"
          >
            Complete Facility Management Services
          </Title>
          <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} mt="xs" maw={700}>
            We provide professional facility management services including electrical maintenance, plumbing solutions, HVAC services, deep cleaning, housekeeping, painting, pest control, and comprehensive property maintenance.
          </Text>
        </Box>
      </Container>

      {/* Services Grid */}
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'md', md: 'xl' }}>
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              id={service.slug}
            >
              <Card
                p={{ base: 'md', md: 'xl' }}
                radius="md"
                withBorder
                style={{ height: '100%' }}
                className="hover-lift"
              >
                <Group gap="md" mb="md" wrap="nowrap">
                  <ThemeIcon radius="md" size={44} color={service.color} variant="light" style={{ flexShrink: 0 }}>
                    <service.icon size={26} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={800} fz={{ base: 'sm', md: 'lg' }} ff="var(--font-open-sans), sans-serif">
                      {service.title}
                    </Text>
                    <Badge size="xs" color={service.color} variant="light" mt={4}>
                      {service.items.length} Services
                    </Badge>
                  </Box>
                </Group>

                <Text c="dimmed" size="sm" mb="md" lh={1.6}>
                  {service.description}
                </Text>

                <List
                  spacing="xs"
                  size="sm"
                  icon={
                    <ThemeIcon color={service.color} size={18} radius="xl" variant="light" style={{ flexShrink: 0 }}>
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

                <Button
                  component={Link}
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  variant="light"
                  color={service.color}
                  size="sm"
                  mt="lg"
                  radius="xl"
                  rightSection={<IconArrowRight size={14} />}
                  fullWidth
                  id={`service-enquire-${service.slug}`}
                >
                  Enquire Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>

      {/* Bottom CTA */}
      <Box
        style={{
          backgroundColor: '#2B3A55',
          color: '#ffffff',
        }}
        mt={{ base: 50, md: 80 }}
        py={{ base: 40, md: 60 }}
      >
        <Container size="md">
          <Stack align="center" gap="md" ta="center">
            <Title
              order={2}
              fw={900}
              c="#ffffff"
              fz={{ base: rem(22), md: rem(28) }}
              ff="var(--font-open-sans), sans-serif"
            >
              Need a Custom Maintenance Plan?
            </Title>
            <Text c="#adb5bd" maw={500} lh={1.6} fz={{ base: 'sm', md: 'md' }}>
              Contact our team for a tailored facility management solution that fits your property's unique requirements.
            </Text>
            <Button
              component={Link}
              href="/contact"
              color="brandBlue"
              radius="xl"
              size="md"
              id="services-cta-contact"
              styles={{ root: { color: '#ffffff', fontWeight: 700 } }}
              rightSection={<IconArrowRight size={16} />}
            >
              Get Free Consultation
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
