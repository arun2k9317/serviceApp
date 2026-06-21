import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Stack, Group, Box, rem, Breadcrumbs, Anchor } from '@mantine/core';
import { IconCheck, IconHome, IconBuildingStore, IconBuilding, IconAdjustments, IconFlame, IconBath, IconRotate, IconSparkles } from '@tabler/icons-react';
import BeforeAfterSlider from '../../components/ui/BeforeAfterSlider';
import { getGalleryItems } from '../../lib/actions';

export const metadata = {
  title: 'Professional Deep Cleaning Services',
  description: 'Specialized deep cleaning solutions in Kerala for villas, apartments, offices, post-construction sites, kitchen and bathroom descaling, and AC duct cleaning.',
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
        
        <Box style={{ borderLeft: '4px solid #ffc104', paddingLeft: rem(16) }} mb="xl">
          <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
            Deep Cleaning Services
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            Hospital-grade sanitization and restoration scrubbing for residential and commercial spaces. Witness the visual difference with our professional execution.
          </Text>
        </Box>
      </Container>

      {/* Vertical Services simple grid */}
      <Container size="lg" mb={80}>
        <Title order={2} size="h3" fw={800} mb="xl" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
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
          <div className="section-header">
            <span className="subtitle">Case Studies</span>
            <h2>Before / After Showcase</h2>
            <div className="bricks-divider"><i></i></div>
            <p>Click on any project to launch the interactive slider and verify our meticulous cleaning quality.</p>
          </div>

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
