import React from 'react';
export const dynamic = 'force-dynamic';
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
} from '@mantine/core';
import {
  IconHome,
  IconBuilding,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconTools,
  IconCup,
  IconActivity,
  IconBriefcase,
  IconDiscountCheck,
} from '@tabler/icons-react';
import TestimonialCarousel from '../../components/ui/TestimonialCarousel';
import { getTestimonials } from '../../lib/actions';

export const metadata = {
  title: 'Industries & Sectors We Serve',
  description: 'Learn about the industries and sectors we serve, including residential properties, commercial buildings, hospitals, hotels, retail stores, and industrial facilities.',
};

const clientSectors = [
  { icon: IconHome, title: 'Villas & Homes', desc: 'Scheduled maintenance, plumbing checks, deep kitchen sanitization, and comprehensive property care for private homeowners.' },
  { icon: IconBuilding, title: 'Apartments & Flats', desc: 'Regular maintenance audits, shared property deep cleaning, and tenant onboarding checklist services.' },
  { icon: IconBriefcase, title: 'Offices & Corporates', desc: 'HVAC maintenance, electrical load balancing, carpet cleaning, and facility management contracts.' },
  { icon: IconBuildingStore, title: 'Shops & Showrooms', desc: 'Lighting checkups, glass cleaning, pest control, and priority breakdown support for retail outlets.' },
  { icon: IconCup, title: 'Cafes & Restaurants', desc: 'Kitchen exhaust degreasing, dining area deep sanitation, and cooling system maintenance.' },
  { icon: IconActivity, title: 'Hospitals & Clinics', desc: 'Sanitary plumbing audits, sterile environment maintenance, and backup electrical circuit checks.' },
  { icon: IconBuildingSkyscraper, title: 'Commercial Complexes', desc: 'Common area maintenance, lobby cleaning, electrical panel testing, and parking lot upkeep.' },
  { icon: IconTools, title: 'Property Managers', desc: 'On-demand property inspections, painting touchups, and deep cleaning for vacant rental properties.' },
];

const mockLogos = [
  { name: 'Metro Tech Park' },
  { name: 'Skyline Villas' },
  { name: 'Greenwood Estates' },
  { name: 'City Healthcare' },
  { name: 'Centre Point Retail' },
  { name: 'Grand Hotels Group' },
];

// ─── SECTION HEADER (Mantine-based, server-compatible) ──────────────────────
function SectionHeader({ subtitle, title, description, white }: {
  subtitle: string;
  title: string;
  description?: string;
  white?: boolean;
}) {
  return (
    <Stack align="center" gap={4} ta="center" mb={40} pt={40}>
      <Text fz="md" fs="italic" c={white ? '#CBDCEB' : 'dimmed'}>
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
      <Group gap={10} align="center" my="sm" style={{ width: rem(180) }}>
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(203,220,235,0.3)' : 'linear-gradient(to right, transparent, #CBDCEB)' }} />
        <Box style={{ width: rem(7), height: rem(7), borderRadius: '50%', border: `1px solid ${white ? 'rgba(203,220,235,0.5)' : '#CBDCEB'}`, background: white ? 'transparent' : 'var(--mantine-color-body)' }} />
        <Box style={{ flex: 1, height: rem(1), background: white ? 'rgba(203,220,235,0.3)' : 'linear-gradient(to left, transparent, #CBDCEB)' }} />
      </Group>
      {description && (
        <Text fz="sm" c={white ? '#e9ecef' : 'dimmed'} maw={600} lh={1.6}>
          {description}
        </Text>
      )}
    </Stack>
  );
}

export default async function ClientsPage() {
  const testimonials = await getTestimonials();

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Industries', href: '/clients' },
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

        <Box style={{ borderLeft: '4px solid #6D94C5', paddingLeft: rem(16) }} mb="xl">
          <Title
            order={1}
            fw={900}
            fz={{ base: rem(22), sm: rem(28), md: rem(32) }}
            ff="var(--font-open-sans), sans-serif"
          >
            Industries & Sectors We Serve
          </Title>
          <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} mt="xs" maw={650}>
            We deliver facility management across diverse properties. From private homes to commercial complexes, we keep your spaces running efficiently.
          </Text>
        </Box>
      </Container>

      {/* Sectors Grid */}
      <Container size="lg" mb={{ base: 50, md: 80 }}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
          {clientSectors.map((sector) => (
            <Card key={sector.title} padding="lg" radius="md" withBorder className="hover-lift" style={{ height: '100%' }}>
              <ThemeIcon radius="md" size="lg" color="brandBlue" variant="light" mb="md">
                <sector.icon size={22} style={{ color: '#6D94C5' }} />
              </ThemeIcon>
              <Text fw={700} size="sm" mb="xs">
                {sector.title}
              </Text>
              <Text size="xs" c="dimmed" lh={1.5}>
                {sector.desc}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Corporate Partners / Logos Grid */}
      <Box style={{ backgroundColor: '#E8DFCA' }} py={{ base: 40, md: 60 }} className="partners-section">
        <Container size="lg" mb={40}>
          <SectionHeader
            subtitle="Corporate Network"
            title="Trusted by Leading Organizations"
            description="We manage maintenance and facility operations for residential and corporate clients."
          />

          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="lg">
            {mockLogos.map((logo, index) => (
              <Card
                key={index}
                withBorder
                padding="md"
                radius="md"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--mantine-color-body)',
                  height: rem(80),
                  borderStyle: 'dashed',
                }}
              >
                <Group gap={6} wrap="nowrap">
                  <IconDiscountCheck size={16} style={{ color: '#6D94C5', flexShrink: 0 }} />
                  <Text fw={700} size="xs" c="dimmed" ta="center">
                    {logo.name}
                  </Text>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box style={{ backgroundColor: '#2B3A55' }} py={{ base: 50, md: 80 }}>
        <Container size="lg">
          <SectionHeader
            subtitle="Testimonials"
            title="What Clients Say About Our Service"
            white
          />

          <TestimonialCarousel testimonials={testimonials} />
        </Container>
      </Box>
    </Box>
  );
}
