'use client';

import React from 'react';
import Image from 'next/image';
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
  Button,
  Box,
  rem,
  Grid,
  List,
} from '@mantine/core';
import {
  IconCheck,
  IconTarget,
  IconEye,
  IconAward,
  IconShieldCheck,
  IconHeartHandshake,
  IconBulb,
  IconStar,
  IconTargetArrow,
  IconArrowRight,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// ─── REUSABLE SECTION HEADER (Mantine) ──────────────────────────────────────
function SectionHeader({ subtitle, title, description }: {
  subtitle: string;
  title: string;
  description?: string;
}) {
  return (
    <Stack align="center" gap={4} ta="center" mb={40} pt={40}>
      <Text fz="md" fs="italic" c="dimmed">
        {subtitle}
      </Text>
      <Title
        order={2}
        fz={{ base: rem(24), sm: rem(28), md: rem(32) }}
        fw={700}
        style={{ fontFamily: 'var(--font-open-sans), sans-serif', textTransform: 'uppercase', letterSpacing: rem(1) }}
      >
        {title}
      </Title>
      <Group gap={10} align="center" my="sm" style={{ width: rem(180) }}>
        <Box style={{ flex: 1, height: rem(1), background: 'linear-gradient(to right, transparent, #dbdbdb)' }} />
        <Box style={{ width: rem(7), height: rem(7), borderRadius: '50%', border: '1px solid #dbdbdb', background: 'var(--mantine-color-body)' }} />
        <Box style={{ flex: 1, height: rem(1), background: 'linear-gradient(to left, transparent, #dbdbdb)' }} />
      </Group>
      {description && (
        <Text fz="sm" c="dimmed" maw={600} lh={1.6}>
          {description}
        </Text>
      )}
    </Stack>
  );
}

// ─── MISSION ITEMS ──────────────────────────────────────────────────────────
const missionItems = [
  'Deliver world-class facility management services.',
  'Provide cost-effective and reliable maintenance solutions.',
  'Ensure maximum customer satisfaction through quality service.',
  'Maintain the highest standards of safety and professionalism.',
  'Build long-term partnerships through trust, transparency, and excellence.',
];

// ─── CORE VALUES ────────────────────────────────────────────────────────────
const coreValues = [
  { icon: IconStar, title: 'Excellence', desc: 'Delivering superior quality in every project.' },
  { icon: IconHeartHandshake, title: 'Integrity', desc: 'Operating with honesty, transparency, and accountability.' },
  { icon: IconShieldCheck, title: 'Reliability', desc: 'Providing dependable services that clients can trust.' },
  { icon: IconBulb, title: 'Innovation', desc: 'Adopting modern techniques and technologies.' },
  { icon: IconShieldCheck, title: 'Safety', desc: 'Protecting people, property, and the environment.' },
  { icon: IconTargetArrow, title: 'Commitment', desc: 'Dedicated to exceeding customer expectations.' },
];

export default function AboutPage() {
  return (
    <Box py={{ base: 30, md: 50 }}>
      {/* 1. HERO HEADER */}
      <Box
        style={{ background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)' }}
        py={{ base: 40, md: 60 }}
        mb={{ base: 40, md: 60 }}
      >
        <Container size="lg">
          <Stack align="center" gap="xs">
            <Title
              order={1}
              fw={900}
              ta="center"
              fz={{ base: rem(26), sm: rem(32), md: rem(36) }}
              ff="var(--font-open-sans), sans-serif"
            >
              About Our Company
            </Title>
            <Text c="dimmed" ta="center" fz={{ base: 'md', md: 'lg' }} maw={700}>
              Building Better Spaces Through Professional Facility Management
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="lg">
        {/* 2. ABOUT US OVERVIEW */}
        <Grid gutter={{ base: 'xl', md: 40 }} align="center" mb={{ base: 50, md: 80 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box style={{ position: 'relative', borderRadius: rem(12), overflow: 'hidden' }} h={{ base: rem(260), md: rem(360) }} w="100%">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="Professional facility management team"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Group gap="xs" wrap="nowrap">
                <ThemeIcon color="brandYellow" variant="light" size="md" style={{ flexShrink: 0 }}>
                  <IconAward size={18} style={{ color: '#e6ad00' }} />
                </ThemeIcon>
                <Text fw={700} c="var(--mantine-color-brandYellow-6)" size="sm">Who We Are</Text>
              </Group>

              <Title order={2} fw={900} fz={{ base: rem(22), md: rem(28) }} lh={1.3}>
                Building Better Spaces Through Professional Facility Management
              </Title>

              <Text c="dimmed" lh={1.7}>
                We are a dedicated facility management company committed to delivering exceptional maintenance, cleaning, and technical support services for residential, commercial, and industrial properties.
              </Text>
              <Text c="dimmed" lh={1.7}>
                Our expertise covers a wide range of facility services designed to enhance operational efficiency, maintain safety standards, and preserve the value of your property. Through skilled professionals, advanced equipment, and customer-focused solutions, we ensure every facility operates at its best.
              </Text>
              <Text c="dimmed" lh={1.7} visibleFrom="sm">
                Whether it's preventive maintenance, emergency repairs, deep cleaning, or ongoing facility support, we provide dependable services tailored to your requirements.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* 3. OUR VISION */}
        <Box mb={{ base: 50, md: 80 }}>
          <Grid gutter={{ base: 'xl', md: 40 }} align="center">
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
              <Stack gap="md">
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon color="blue" variant="light" size="md" style={{ flexShrink: 0 }}>
                    <IconEye size={18} />
                  </ThemeIcon>
                  <Text fw={700} c="blue" size="sm">Our Vision</Text>
                </Group>

                <Title order={2} fw={900} fz={{ base: rem(22), md: rem(28) }} lh={1.3}>
                  Creating Safer, Cleaner, and More Efficient Environments
                </Title>

                <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} lh={1.7}>
                  To become the most trusted and preferred facility management partner, recognized for delivering innovative, reliable, and sustainable solutions that create safer, cleaner, and more efficient environments.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
              <Box
                h={{ base: rem(200), md: rem(280) }}
                style={{
                  borderRadius: rem(12),
                  background: 'linear-gradient(135deg, #2a2f35 0%, #343a40 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 30% 50%, rgba(255, 193, 4, 0.15), transparent 70%)',
                  }}
                />
                <Stack align="center" gap="xs" style={{ position: 'relative', zIndex: 1 }}>
                  <IconEye size={64} style={{ color: '#ffc104', opacity: 0.9 }} />
                  <Text fw={800} fz="xl" c="#ffffff" lts={rem(2)} ff="var(--font-open-sans), sans-serif">
                    VISION
                  </Text>
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* 4. OUR MISSION */}
        <Box mb={{ base: 50, md: 80 }}>
          <Grid gutter={{ base: 'xl', md: 40 }} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box
                h={{ base: rem(220), md: rem(320) }}
                style={{
                  borderRadius: rem(12),
                  background: 'linear-gradient(135deg, #2a2f35 0%, #343a40 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 70% 50%, rgba(255, 193, 4, 0.15), transparent 70%)',
                  }}
                />
                <Stack align="center" gap="xs" style={{ position: 'relative', zIndex: 1 }}>
                  <IconTarget size={64} style={{ color: '#ffc104', opacity: 0.9 }} />
                  <Text fw={800} fz="xl" c="#ffffff" lts={rem(2)} ff="var(--font-open-sans), sans-serif">
                    MISSION
                  </Text>
                </Stack>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Group gap="xs" wrap="nowrap">
                  <ThemeIcon color="green" variant="light" size="md" style={{ flexShrink: 0 }}>
                    <IconTarget size={18} />
                  </ThemeIcon>
                  <Text fw={700} c="green" size="sm">Our Mission</Text>
                </Group>

                <Title order={2} fw={900} fz={{ base: rem(22), md: rem(28) }} lh={1.3}>
                  World-Class Facility Management With Purpose
                </Title>

                <List
                  spacing="sm"
                  size="md"
                  icon={
                    <ThemeIcon color="green" size={20} radius="xl" style={{ flexShrink: 0 }}>
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                  styles={{
                    itemWrapper: { alignItems: 'flex-start' },
                  }}
                >
                  {missionItems.map((item) => (
                    <List.Item key={item}>
                      <Text c="dimmed" lh={1.6} fz={{ base: 'sm', md: 'md' }}>{item}</Text>
                    </List.Item>
                  ))}
                </List>
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>

        {/* 5. CORE VALUES */}
        <Box mb={{ base: 50, md: 80 }}>
          <SectionHeader
            subtitle="What Guides Us"
            title="Our Core Values"
            description="Our operations are built on professionalism, integrity, and complete dedication to every client."
          />

          <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="lg">
            {coreValues.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ height: '100%', borderLeft: '4px solid #ffc104' }}
                  className="hover-lift"
                >
                  <Group gap="md" mb="xs" wrap="nowrap">
                    <ThemeIcon radius="md" size="lg" color="brandYellow" variant="light" style={{ flexShrink: 0 }}>
                      <item.icon size={20} style={{ color: '#e6ad00' }} />
                    </ThemeIcon>
                    <Text fw={700} size="md" ff="var(--font-open-sans), sans-serif">
                      {item.title}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    {item.desc}
                  </Text>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>

        {/* 6. CTA */}
        <Card
          shadow="md"
          radius="lg"
          padding={{ base: 'lg', md: 'xl' }}
          withBorder
          style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)',
          }}
        >
          <Stack align="center" gap="md">
            <Title order={2} fw={900} fz={{ base: rem(22), md: rem(28) }} ff="var(--font-open-sans), sans-serif">
              Ready to Partner With Us?
            </Title>
            <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} maw={550}>
              Let us manage your facility so you can focus on what matters most. Contact us today for a free consultation.
            </Text>
            <Group gap="md" wrap="wrap" justify="center">
              <Button
                component={Link}
                href="/contact"
                color="brandYellow"
                radius="xl"
                size="md"
                id="about-cta-contact"
                rightSection={<IconArrowRight size={16} />}
                styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}
              >
                Get Free Consultation
              </Button>
              <Button
                component={Link}
                href="/services"
                variant="outline"
                color="brandYellow"
                radius="xl"
                size="md"
                id="about-cta-services"
              >
                View Our Services
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
