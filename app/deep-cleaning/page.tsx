import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Stack, Group, Box, rem, Breadcrumbs, Anchor } from '@mantine/core';
import { IconCheck, IconHome, IconBuildingStore, IconBuilding, IconAdjustments, IconFlame, IconBath, IconRotate, IconSparkles } from '@tabler/icons-react';
import BeforeAfterSlider from '../../components/ui/BeforeAfterSlider';
import { getGalleryItems } from '../../lib/actions';

export const metadata = {
  title: 'Professional Deep Cleaning Services',
  description: 'Specialized deep cleaning solutions for villas, apartments, offices, post-construction sites, kitchen and bathroom descaling, and AC duct cleaning.',
};

const cleaningServices = [
  { icon: IconHome, title: 'Villa Deep Cleaning', desc: 'Thorough dusting, vacuuming, window polishing, floor scrubbing, and complete sanitation for independent houses.' },
  { icon: IconBuilding, title: 'Apartment Cleaning', desc: 'Detailed cleaning tailored for flats, including balconies, sliding glass windows, kitchen degreasing, and bathrooms.' },
  { icon: IconBuildingStore, title: 'Office Deep Cleaning', desc: 'Carpet vacuuming, office chair cleaning, desk sanitization, and lobby glass polishing with zero disruption.' },
  { icon: IconBuilding, title: 'Commercial Cleaning', desc: 'Heavy-duty maintenance for warehouses, retail outlets, showrooms, hotels, restaurants, and medical clinics.' },
  { icon: IconRotate, title: 'Post-Construction Cleaning', desc: 'Lifting micro-dust, cement stains, paint splatters, and sawdust after renovations or new building completions.' },
  { icon: IconAdjustments, title: 'AC Duct Cleaning', desc: 'Clearing mold, dust, and allergen build-up inside air vents to restore healthy breathing indoor environments.' },
  { icon: IconFlame, title: 'Kitchen Sanitization', desc: 'Heavy degreasing of cooker hoods, backsplash descaling, cabinet scrubbing, and countertop disinfecting.' },
  { icon: IconBath, title: 'Washroom Sanitization', desc: 'Acidic descaling of tiles, deep bowl sanitization, tap polish, and wall descaling to remove hard water deposits.' },
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

export default async function DeepCleaningPage() {
  // Query gallery items from Supabase or mock store
  const galleryItems = await getGalleryItems();
  const cleaningGallery = galleryItems.filter(item => item.category === 'deep-cleaning');

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
    { title: 'Deep Cleaning', href: '/deep-cleaning' },
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
        
        <Box style={{ borderLeft: '4px solid #6D94C5', paddingLeft: rem(16) }} mb="xl">
          <Title
            order={1}
            fw={900}
            fz={{ base: rem(22), sm: rem(28), md: rem(32) }}
            style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}
          >
            Deep Cleaning Services
          </Title>
          <Text c="dimmed" fz={{ base: 'sm', md: 'md' }} mt="xs" style={{ maxWidth: rem(650) }}>
            Hospital-grade sanitization and restoration scrubbing for residential and commercial spaces. Witness the visual difference with our professional execution.
          </Text>
        </Box>
      </Container>

      {/* Vertical Services simple grid */}
      <Container size="lg" mb={80}>
        <Title
          order={2}
          fz={{ base: rem(18), sm: rem(20), md: rem(22) }}
          fw={800}
          mb="xl"
          style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}
        >
          Our Deep Cleaning Verticals
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {cleaningServices.map((service) => (
            <Card key={service.title} padding="lg" radius="md" withBorder className="hover-lift">
              <ThemeIcon radius="md" size="lg" color="brandYellow" variant="light" mb="md">
                <service.icon size={22} style={{ color: '#e6ad00' }} />
              </ThemeIcon>
              <Text fw={700} size="sm" mb="xs">
                {service.title}
              </Text>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
                {service.desc}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Before / After Slider Grid Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)' }} py={60} className="gallery-section">
        <Container size="lg">
          <SectionHeader
            subtitle="Case Studies"
            title="Before / After Showcase"
            description="Click on any project to launch the interactive slider and verify our meticulous cleaning quality."
          />

          {cleaningGallery.length > 0 ? (
            <BeforeAfterSlider items={cleaningGallery} />
          ) : (
            <Box ta="center" py="xl">
              <Text c="dimmed">No comparison images uploaded yet.</Text>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
