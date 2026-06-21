import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, List, Button, Stack, Group, ThemeIcon, Box, rem, Breadcrumbs, Anchor } from '@mantine/core';
import { IconCheck, IconChevronRight, IconAlertCircle, IconAward } from '@tabler/icons-react';
import AMCRequestForm from '../../components/forms/AMCRequestForm';

export const metadata = {
  title: 'Annual Maintenance Contracts (AMC) Packages',
  description: 'Select from our Residential or Commercial Annual Maintenance Contracts (AMC) in Kerala for complete peace of mind with scheduled checks and 24/7 priority support.',
};

const amcPackages = [
  {
    title: 'Residential AMC',
    subtitle: 'Best for villas & independent houses',
    color: 'brandYellow',
    features: [
      '4 Scheduled Preventive Maintenance audits per year',
      'Routine AC washing & servicing (up to 4 units)',
      'Free electrical diagnostic & ELCB safety testing',
      'Free plumbing line cleaning & tap descaling',
      'Unlimited emergency breakdown calls with no visiting fees',
      'Guaranteed SLA response under 2 hours',
    ],
  },
  {
    title: 'Commercial AMC',
    subtitle: 'For offices, clinics, retail shops, & cafés',
    color: 'brandDark',
    features: [
      'Monthly structural and safety checkups',
      'Electrical load balancing & panel audits',
      'AC duct descaling & refrigeration gas checks',
      'Priority routing for plumbing blockages & leaks',
      'Dedicated facility coordinator',
      'Detailed digital maintenance logs & asset reporting',
    ],
  },
  {
    title: 'Quarterly Preventive checks',
    subtitle: 'Basic structural maintenance checks',
    color: 'gray',
    features: [
      '4 Scheduled seasonal audits per year',
      'AC filter clearing & drain line descaling',
      'Pre-monsoon terrace drain & gutter cleaning',
      'Visual snag assessment (dampproofing, tile cracks)',
      '1 Free emergency breakdown visit included',
      '10% Discount on parts & additional manual labor',
    ],
  },
];

export default function AMCPage() {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'AMC Packages', href: '/amc' },
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
            Annual Maintenance Contracts (AMC)
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            Protect your property investment, secure your appliances, and avoid sudden breakdown costs with our structured annual maintenance plans.
          </Text>
        </Box>
      </Container>

      {/* Package Comparison Simple Grid */}
      <Container size="lg" mb={80}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {amcPackages.map((pkg) => (
            <Card
              key={pkg.title}
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: pkg.color === 'brandYellow' ? 'rgba(255, 193, 4, 0.3)' : pkg.color === 'brandDark' ? 'rgba(42, 47, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                borderTop: `${rem(5)} solid ${pkg.color === 'brandYellow' ? '#ffc104' : pkg.color === 'brandDark' ? '#2a2f35' : '#868e96'}`,
              }}
            >
              <Stack gap="xs" mb="lg">
                <Text fw={800} size="xl" style={{ color: pkg.color === 'brandYellow' ? '#e6ad00' : pkg.color === 'brandDark' ? '#2a2f35' : '#495057', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                  {pkg.title}
                </Text>
                <Text size="xs" c="dimmed" fw={600}>
                  {pkg.subtitle}
                </Text>
                <hr style={{ border: 'none', borderTop: '1px solid var(--mantine-color-gray-2)', margin: `${rem(10)} 0` }} />
                
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color={pkg.color} size={18} radius="xl" styles={{ root: { color: pkg.color === 'brandYellow' ? '#2a2f35' : '#ffffff' } }}>
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {pkg.features.map((feature, i) => (
                    <List.Item key={i}>
                      <Text size="sm">{feature}</Text>
                    </List.Item>
                  ))}
                </List>
              </Stack>
              
              <Button
                component="a"
                href="#amc-quote-form"
                color={pkg.color}
                variant="light"
                fullWidth
                size="md"
                rightSection={<IconChevronRight size={14} />}
                styles={{
                  root: {
                    color: pkg.color === 'brandYellow' ? '#e6ad00' : pkg.color === 'brandDark' ? '#2a2f35' : '#495057',
                    fontWeight: 700,
                  }
                }}
              >
                Select Package
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Custom Plans details Banner */}
      <Container size="lg" mb={80}>
        <Card shadow="sm" radius="md" padding="lg" withBorder style={{ backgroundColor: 'rgba(255, 193, 4, 0.06)', borderColor: 'rgba(255, 193, 4, 0.3)' }} className="custom-amc-banner">
          <Group gap="md" align="flex-start" wrap="nowrap">
            <ThemeIcon color="brandYellow" size="lg" radius="md">
              <IconAward size={22} style={{ color: '#2a2f35' }} />
            </ThemeIcon>
            <div>
              <Text fw={700} size="md">Custom AMC Plans for Large Properties & Businesses</Text>
              <Text size="sm" c="dimmed" mt={4}>
                Own a restaurant chain, a boutique hotel, a high-rise apartment association, or a multi-floor showroom? We structure custom SLA-backed facility maintenance programs tailored specifically to your load testing, sanitizing schedules, and operational checklists. Tell us your requirements in the form below.
              </Text>
            </div>
          </Group>
        </Card>
      </Container>

      {/* Form Anchor and Quote Builder */}
      <div id="amc-quote-form">
        <Container size="md">
          <AMCRequestForm />
        </Container>
      </div>
    </Box>
  );
}
