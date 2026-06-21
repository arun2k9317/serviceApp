import React from 'react';
import Link from 'next/link';
import { Container, Title, Text, SimpleGrid, Card, Button, Badge, Group, Stack, Box, rem, Breadcrumbs, Anchor, ThemeIcon } from '@mantine/core';
import { IconGift, IconCalendar, IconChevronRight, IconConfetti } from '@tabler/icons-react';
import { getOffers } from '../../lib/actions';

export const metadata = {
  title: 'Special Offers & Promotions',
  description: 'View active service discounts, zero visiting charge promotions, and introductory Annual Maintenance Contract (AMC) rates.',
};

export default async function OffersPage() {
  // Fetch active promotional offers
  const offers = await getOffers();
  const activeOffers = offers.filter(o => o.active);

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Special Offers', href: '/offers' },
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
            Special Offers & Deals
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            Save on home deep cleaning, electrical troubleshooting, plumbing audits, and yearly maintenance subscription programs. Claim active vouchers below.
          </Text>
        </Box>
      </Container>

      {/* Offers Cards Simple Grid */}
      <Container size="lg">
        {activeOffers.length > 0 ? (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {activeOffers.map((offer) => {
              // Construct claim link with custom message query parameter
              const claimMsg = encodeURIComponent(`Hi, I would like to claim the promotional offer: "${offer.title}".`);
              const claimUrl = `/contact?message=${claimMsg}`;

              return (
                <Card
                  key={offer.id}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  className="hover-lift"
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <ThemeIcon color="brandYellow" variant="light" size="lg" radius="md">
                        <IconGift size={22} style={{ color: '#e6ad00' }} />
                      </ThemeIcon>
                      <Badge color="brandYellow" variant="filled" styles={{ root: { color: '#2a2f35', fontWeight: 700 } }}>Active Offer</Badge>
                    </Group>
                    
                    <Text fw={800} size="lg" mt="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                      {offer.title}
                    </Text>
                    
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.5, minHeight: rem(60) }}>
                      {offer.description}
                    </Text>

                    {(offer.start_date || offer.end_date) && (
                      <Group gap={6} mt="xs">
                        <IconCalendar size={14} style={{ color: 'var(--mantine-color-gray-5)' }} />
                        <Text size="xs" c="dimmed">
                          Validity: {offer.start_date || 'Current'} to {offer.end_date || 'Until further notice'}
                        </Text>
                      </Group>
                    )}
                  </Stack>

                  <Button
                    component={Link}
                    href={claimUrl}
                    color="brandYellow"
                    variant="light"
                    fullWidth
                    size="md"
                    mt="lg"
                    rightSection={<IconChevronRight size={14} />}
                    styles={{
                      root: {
                        color: '#e6ad00',
                        fontWeight: 700,
                      }
                    }}
                  >
                    Claim Voucher
                  </Button>
                </Card>
              );
            })}
          </SimpleGrid>
        ) : (
          <Box ta="center" py={60}>
            <ThemeIcon color="gray" size="xl" radius="xl" mb="md">
              <IconConfetti size={24} />
            </ThemeIcon>
            <Text c="dimmed" size="lg" fw={700}>All vouchers claimed!</Text>
            <Text c="dimmed" size="sm" mt={4}>Please check back soon for our next promotional deals campaign.</Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}
