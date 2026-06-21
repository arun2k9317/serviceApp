import React from 'react';
import { Container, Title, Text, SimpleGrid, Box, rem, Breadcrumbs, Anchor } from '@mantine/core';
import ServiceCard from '../../components/ui/ServiceCard';
import { getServices } from '../../lib/actions';

export const metadata = {
  title: 'Our Services',
  description: 'Explore our range of professional maintenance and deep cleaning services available across Kerala, including AC maintenance, electrical, plumbing, and AMC plans.',
};

export default async function ServicesPage() {
  const services = await getServices();

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
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
        
        <Box
          style={{
            borderLeft: '4px solid #ffc104',
            paddingLeft: rem(16),
          }}
          mb="xl"
        >
          <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
            Our Professional Services
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            We provide a wide array of premium residential and commercial maintenance solutions. Our teams are certified, insured, and ready to assist you.
          </Text>
        </Box>
      </Container>

      {/* Services Grid */}
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              slug={service.slug}
              description={service.description}
              imageUrl={service.imageUrl || service.image_url}
              benefits={service.benefits}
              index={index}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
