'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Title, Text, Grid, Card, ThemeIcon, Stack, Group, Box, rem, Breadcrumbs, Anchor, SimpleGrid } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconBrandWhatsapp, IconClock } from '@tabler/icons-react';
import ContactForm from '../../components/forms/ContactForm';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialMessage = searchParams.get('message') || '';

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Contact Us', href: '/contact' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  const branchLocations = [
    { city: 'Headquarters', address: '100 Main Street, Suite 400, Metro City - 10001' },
    { city: 'North Dispatch Hub', address: '500 Industrial Boulevard, Industrial Area - 10020' },
    { city: 'South Regional Office', address: '200 Commercial Way, Suite 10, South Zone - 10030' },
    { city: 'West Dispatch Center', address: '350 Logistics Road, West District - 10040' },
  ];

  return (
    <Box py={40}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
        
        <Box style={{ borderLeft: '4px solid #ffc104', paddingLeft: rem(16) }} mb="xl">
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
                  <Text fw={800} size="lg" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                    Customer Support Hotlines
                  </Text>
                  
                  <Stack gap="sm">
                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandYellow" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconPhone size={18} style={{ color: '#2a2f35' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>Phone Support</Text>
                        <Text size="sm">+91 90000 00000</Text>
                        <Text size="xs" c="dimmed">Toll-free, active 24/7 for breakdowns</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandYellow" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconBrandWhatsapp size={18} style={{ color: '#e6ad00' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>WhatsApp Dispatcher</Text>
                        <Text size="sm">+91 90000 00000</Text>
                        <Text size="xs" c="dimmed">Tap the floating widget to text instantly</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandYellow" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconMail size={18} style={{ color: '#2a2f35' }} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={700}>Support Email</Text>
                        <Text size="sm">support@fullmaintenance.com</Text>
                        <Text size="xs" c="dimmed">Email us for AMC tenders and commercial contracts</Text>
                      </div>
                    </Group>

                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandYellow" size="md" radius="md" variant="light" style={{ flexShrink: 0 }}>
                        <IconClock size={18} style={{ color: '#2a2f35' }} />
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
              <Card withBorder padding="xl" radius="md" shadow="sm">
                <Stack gap="sm">
                  <Text fw={800} size="lg" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
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
              </Card>

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528082184!2d-74.11976373099967!3d40.69767006346215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1655458000000!5m2!1sen!2sus"
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
            {/* contact form gets the initial preloaded service if available in query */}
            <ContactForm initialService={initialService} />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
