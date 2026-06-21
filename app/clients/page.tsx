import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Stack, Group, Box, rem, Breadcrumbs, Anchor } from '@mantine/core';
import { IconHome, IconBuilding, IconBuildingSkyscraper, IconBuildingStore, IconTools, IconCup, IconActivity, IconBriefcase, IconDiscountCheck } from '@tabler/icons-react';
import TestimonialCarousel from '../../components/ui/TestimonialCarousel';
import { getTestimonials } from '../../lib/actions';

export const metadata = {
  title: 'Our Clients & Sectors served',
  description: 'Learn about the sectors we serve across Kerala, including residential villas, apartments, retail shops, clinics, offices, and property management companies.',
};

const clientSectors = [
  { icon: IconHome, title: 'Villas & Homes', desc: 'Providing scheduled AC filter cleans, plumbing descaling, structural snag checks, and deep kitchen sanitization for private homeowners.' },
  { icon: IconBuilding, title: 'Apartments & Flats', desc: 'Offering regular maintenance audits and shared property deep cleaning, and tenant onboarding checklist services.' },
  { icon: IconBriefcase, title: 'Offices & Corporates', desc: 'AMC cooling audits, electrical load balancing, data center checkups, and carpet descaling during weekends.' },
  { icon: IconBuildingStore, title: 'Shops & Showrooms', desc: 'Providing retail outlets with lighting checkups, showcase glass descaling, and priority AC breakdown SLAs.' },
  { icon: IconCup, title: 'Cafes & Restaurants', desc: 'Kitchen exhaust degreasing, grease trap descaling, dining area deep sanitation, and cooling system maintenance.' },
  { icon: IconActivity, title: 'Medical Clinics', desc: 'Sanitary plumbing audits, sterile environment descaling, and UPS/backup electrical circuit checks.' },
  { icon: IconBuildingSkyscraper, title: 'Commercial Complexes', desc: 'Common area pressure washing, lift lobby maintenance, main DB panel testing, and parking lot scrubbing.' },
  { icon: IconTools, title: 'Property Managers', desc: 'On-demand snag audits, visual checkups, painting touchups, and deep cleaning for vacant rental properties.' },
];

const mockLogos = [
  { name: 'Kochi Tech Park Inc.' },
  { name: 'Skyline Villa Assc.' },
  { name: 'Greenwood Estates' },
  { name: 'Kerala Clinic Group' },
  { name: 'City Center Retail' },
  { name: 'Malabar Cafes Co.' },
];

export default async function ClientsPage() {
  const testimonials = await getTestimonials();

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Clients', href: '/clients' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Box py={40}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
        
        <Box style={{ borderLeft: '4px solid #ffc104', paddingLeft: rem(16) }} mb="xl">
          <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
            Clients & Sectors We Serve
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            We deliver facility support across different properties. From private villas to busy offices, we protect what matters.
          </Text>
        </Box>
      </Container>

      {/* Sectors Grid */}
      <Container size="lg" mb={80}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {clientSectors.map((sector) => (
            <Card key={sector.title} padding="lg" radius="md" withBorder className="hover-lift">
              <ThemeIcon radius="md" size="lg" color="brandYellow" variant="light" mb="md">
                <sector.icon size={22} style={{ color: '#e6ad00' }} />
              </ThemeIcon>
              <Text fw={700} size="sm" mb="xs">
                {sector.title}
              </Text>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
                {sector.desc}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Corporate Partners / Logos Grid */}
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)' }} py={60} className="partners-section">
        <Container size="lg" mb={40}>
          <div className="section-header">
            <span className="subtitle">Corporate Network</span>
            <h2>Trusted by Leading Organizations</h2>
            <div className="bricks-divider"><i></i></div>
            <p>We manage maintenance rosters and deep cleaning operations for local and corporate brands.</p>
          </div>

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
                  <IconDiscountCheck size={16} style={{ color: '#ffc104' }} />
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
      <Box style={{ backgroundColor: '#2a2f35', paddingTop: rem(80), paddingBottom: rem(80) }}>
        <Container size="lg">
          <div className="section-header white">
            <span className="subtitle">Testimonials</span>
            <h2>What Clients Say About Our Service</h2>
            <div className="bricks-divider"><i></i></div>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </Container>
      </Box>
    </Box>
  );
}
