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
    { city: 'Kochi Hub (HQ)', address: 'NH Bypass, Vyttila, Kochi, Ernakulam - 682019' },
    { city: 'Trivandrum Office', address: 'Kazhakkoottam, Trivandrum, Kerala - 695582' },
    { city: 'Kozhikode Branch', address: 'Mavoor Road, Kozhikode, Kerala - 673004' },
    { city: 'Thrissur Dispatch', address: 'East Fort, Thrissur, Kerala - 680005' },
  ];

  return (
    <Box py={40}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
        
        <Box style={{ borderLeft: '4px solid #ffc104', paddingLeft: rem(16) }} mb="xl">
          <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
            Get in Touch
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            Need AC servicing, plumbing help, deep cleaning, or AMC pricing? Contact us today to book your free inspection visual audit!
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

              {/* Interactive Iframe Map (Kerala, Kochi Center) */}
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
                  title="Kerala Service Coverage Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5602419080517!2d76.32168921479483!3d9.975487792868213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080cd330d07cc7%3A0xe10cd212bc292415!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1655458000000!5m2!1sen!2sin"
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
