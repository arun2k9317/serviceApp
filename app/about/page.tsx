'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Stack, Group, Button, Box, rem, Grid } from '@mantine/core';
import { IconCheck, IconTarget, IconAward, IconMapPin, IconCar } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const strengths = [
  { title: 'Certified Technicians', desc: 'All technicians undergo rigorous background checking, training, and hold relevant industrial certifications.' },
  { title: 'Structured Process', desc: 'From reporting snags to final inspections, every action is logged, structured, and double-checked.' },
  { title: 'Preventive Focus', desc: 'We inspect early to save replacement costs, extending the lifetime of home and office equipment.' },
  { title: 'Professional Reporting', desc: 'Receive digital inspection snag-checklists and job completion reports directly on your phone.' },
];

export default function AboutPage() {
  return (
    <Box py={50}>
      {/* 1. HERO HEADER */}
      <Box style={{ background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)' }} py={60} mb={60}>
        <Container size="lg">
          <Stack align="center" gap="xs">
            <Title order={1} fw={900} ta="center" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
              About Our Company
            </Title>
            <Text c="dimmed" ta="center" size="lg" style={{ maxWidth: rem(600) }}>
              Professional Property Maintenance & Deep Cleaning solutions engineered to protect residential and commercial properties across Kerala.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="lg">
        {/* 2. OVERVIEW & MISSION */}
        <Grid gap={40} align="center" mb={80}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div style={{ position: 'relative', height: rem(360), width: '100%', borderRadius: rem(12), overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="Professional team cleaning villa"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon color="blue" variant="light" size="md">
                  <IconTarget size={18} />
                </ThemeIcon>
                <Text fw={700} c="blue" size="sm">Our Mission</Text>
              </Group>
              
              <Title order={2} fw={900}>
                Building long-term client trust through quality service and professional support.
              </Title>
              
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                Full Maintenance & Deep Cleaning Company was founded with a single mission: to lift the burden of property upkeep from home owners and office managers. We bring structural audits, engineering discipline, and hospitality-grade cleaning together.
              </Text>
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                Whether it is troubleshooting an AC gas leak, descaling a shower drainage, scrubbing marble floors, or onboarding a corporate building for complete AMC protection, we deliver on time with guaranteed service warranties.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* 3. COMPANY STRENGTHS */}
        <Box mb={80}>
          <div className="section-header">
            <span className="subtitle">Our Strengths</span>
            <h2>What Sets Us Apart</h2>
            <div className="bricks-divider"><i></i></div>
            <p>Our operations are built on professionalism, trained labor, and complete transparency.</p>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card padding="lg" radius="md" withBorder style={{ height: '100%' }} className="hover-lift">
                  <ThemeIcon radius="md" size="lg" color="brandYellow" variant="light" mb="md">
                    <IconCheck size={20} style={{ color: '#e6ad00' }} />
                  </ThemeIcon>
                  <Text fw={700} size="md" mb="xs">
                    {item.title}
                  </Text>
                  <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
                    {item.desc}
                  </Text>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>

        {/* 4. COVERAGE AREA */}
        <Card shadow="sm" radius="lg" padding="xl" withBorder mb={80} style={{ overflow: 'hidden' }}>
          <Grid align="center" gap="xl">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                <Group gap="xs">
                  <ThemeIcon color="blue" variant="light">
                    <IconMapPin size={18} />
                  </ThemeIcon>
                  <Text fw={700} size="sm">Service Reach</Text>
                </Group>
                <Title order={2} fw={900}>
                  Kerala-wide Service Coverage
                </Title>
                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                  Our network of mobile technician vans and cleaning teams is stationed strategically to serve key cities and surrounding districts. We provide residential checkups and commercial contracts with rapid dispatch times.
                </Text>
                <SimpleGrid cols={2} spacing="xs" mt="xs">
                  <Group gap={6}>
                    <IconCheck size={16} style={{ color: 'var(--mantine-color-green-6)' }} />
                    <Text size="sm" fw={600}>Kochi & Ernakulam Dist.</Text>
                  </Group>
                  <Group gap={6}>
                    <IconCheck size={16} style={{ color: 'var(--mantine-color-green-6)' }} />
                    <Text size="sm" fw={600}>Trivandrum & suburbs</Text>
                  </Group>
                  <Group gap={6}>
                    <IconCheck size={16} style={{ color: 'var(--mantine-color-green-6)' }} />
                    <Text size="sm" fw={600}>Kozhikode City</Text>
                  </Group>
                  <Group gap={6}>
                    <IconCheck size={16} style={{ color: 'var(--mantine-color-green-6)' }} />
                    <Text size="sm" fw={600}>Thrissur Corporation</Text>
                  </Group>
                </SimpleGrid>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              {/* Map Illustration Placeholder */}
              <Box
                style={{
                  height: rem(250),
                  borderRadius: rem(8),
                  background: 'linear-gradient(135deg, rgba(255, 193, 4, 0.08) 0%, rgba(42, 47, 53, 0.04) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '2px dashed #ffc104',
                }}
              >
                <IconMapPin size={48} style={{ color: '#ffc104', marginBottom: rem(8) }} />
                <Text fw={700} size="sm">Kerala Coverage Grid</Text>
                <Text size="xs" c="dimmed" mt={4} ta="center" px="md">
                  Active Dispatch Hubs in Kochi, Trivandrum, Kozhikode & Thrissur
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Card>

        {/* 5. MOBILE CAR WASH HIGHLIGHT */}
        <Grid gap={40} align="center">
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon color="green" variant="light" size="md">
                  <IconCar size={18} />
                </ThemeIcon>
                <Text fw={700} c="green" size="sm">Premium Feature</Text>
              </Group>
              
              <Title order={2} fw={900}>
                Convenient Doorstep Mobile Car Wash
              </Title>
              
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                Why drive to a busy service station and waste hours in queues? Our mobile car wash teams arrive at your home or office parking with pressurized water machines, waterless polymer wash solutions, heavy vacuum systems, and premium detailing waxes.
              </Text>
              <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                We clean your hatchback, SUV, or premium sedan inside and out while you work or relax. From dashboard polishing to scratch-free micro-fiber body wash, we restore your car to pristine visual health.
              </Text>
              
              <Group gap="md" mt="xs">
                <Button component={Link} href="/contact?service=Mobile Car Wash Services" color="brandYellow" radius="xl" styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}>
                  Book Car Wash Now
                </Button>
                <Button component={Link} href="/services/mobile-car-wash" variant="subtle" color="gray">
                  Read Services details
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
            <div style={{ position: 'relative', height: rem(360), width: '100%', borderRadius: rem(12), overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=800&q=80"
                alt="Mobile car wash technician drying a sedan"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
