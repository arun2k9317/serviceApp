
'use client';

import React, { Suspense } from 'react';
import { Container, Title, Text, Grid, Card, ThemeIcon, Stack, Group, Box, rem, Breadcrumbs, Anchor, SimpleGrid } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconBrandWhatsapp, IconClock } from '@tabler/icons-react';
import ContactFormWithParams from '../../components/forms/ContactFormWithParams';

export default function ContactPage() {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Contact Us', href: '/contact' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  const branchLocations = [
    { city: 'Headquarters', address: 'Edappally, Kochi, Ernakulam - 682024 (Coordinates: 10.011307, 76.277076)' },
    { city: 'Aluva Dispatch Hub', address: 'Aluva Town, Ernakulam - 683101' },
    { city: 'Tripunithura Office', address: 'Tripunithura, Ernakulam - 682301' },
    { city: 'Kakkanad Dispatch Center', address: 'Near Infopark, Kakkanad, Ernakulam - 682030' },
  ];

  return (
    <Box py={40}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
        
        <Box style={{ borderLeft: '4px solid #6D94C5', paddingLeft: rem(16) }} mb="xl">
          <Title
            order={1}
            fw={900}
            fz={{ base: rem(22), sm: rem(28), md: rem(32) }}
            style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}
          >
            Get in Touch
          </Title>
          <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} mt="xs" style={{ maxWidth: rem(650) }}>
            Need professional HVAC, plumbing, electrical maintenance, or deep cleaning? Contact us today to schedule your consultation and inspection.
          </Text>
        </Box>
      </Container>

      <Container size="lg">
        <Grid gap={40}>
          {/* Left Column: Coordinates and Map */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="lg">
              {/* Coordinates Card */}
              <Card withBorder padding="xl" radius="md" shadow="sm">
                <Stack gap="md">
                  <Text fw={800} size="lg" style={{ color: '#6D94C5', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                    Customer Support Hotlines
                  </Text>
                  
                  <Stack gap="sm">
                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandBlue" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconPhone size={18} style={{ color: '#6D94C5' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>Phone Support</Text>
                        <Text size="sm">+91 90481 99754</Text>
                        <Text size="xs" c="dimmed">Toll-free, active 24/7 for breakdowns</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandBlue" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconBrandWhatsapp size={18} style={{ color: '#6D94C5' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>WhatsApp Dispatcher</Text>
                        <Text size="sm">+91 90481 99754</Text>
                        <Text size="xs" c="dimmed">Tap the floating widget to text instantly</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandBlue" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconMail size={18} style={{ color: '#6D94C5' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>Support Email</Text>
                        <Text size="sm">info@maintex.com</Text>
                        <Text size="xs" c="dimmed">Email us for AMC tenders and commercial contracts</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandBlue" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconClock size={18} style={{ color: '#6D94C5' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>Working Hours</Text>
                        <Text size="sm">Office: 8:00 AM - 8:00 PM (Mon - Sat)</Text>
                        <Text size="xs" c="dimmed">Emergency technician dispatch runs 24/7/365</Text>
                      </div>
                    </Group>
                  </Stack>
                </Stack>
              </Card>

              {/* Branch Locations */}
              {/* <Card withBorder padding="xl" radius="md" shadow="sm">
                <Stack gap="sm">
                  <Text fw={800} size="lg" style={{ color: '#6D94C5', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                    Branch Dispatch Hubs
                  </Text>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    {branchLocations.map((branch, i) => (
                      <div key={i}>
                        <Text size="xs" fw={700} c="var(--mantine-color-text)">
                          📍 {branch.city}
                        </Text>
                        <Text size="xs" c="dimmed" mt={2} style={{ lineHeight: 1.4 }}>
                          {branch.address}
                        </Text>
                      </div>
                    ))}
                  </SimpleGrid>
                </Stack>
              </Card> */}

              {/* Interactive Iframe Map (Service Coverage Map) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: rem(250),
                  borderRadius: rem(8),
                  overflow: 'hidden',
                  boxShadow: 'var(--mantine-shadow-xs)',
                  border: '1px solid var(--mantine-color-default-border)',
                }}
              >
                <iframe
                  title="Service Coverage Area Map"
                  src="https://maps.google.com/maps?q=10.011307389206726,76.27707605122248&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Stack>
          </Grid.Col>

          {/* Right Column: Contact Inquiry Form */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactFormWithParams />
            </Suspense>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
