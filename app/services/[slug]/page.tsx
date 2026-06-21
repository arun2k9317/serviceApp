import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Grid,
  Stack,
  Group,
  ThemeIcon,
  Breadcrumbs,
  Anchor,
  Box,
  rem,
  Card,
  SimpleGrid,
} from '@mantine/core';
import { IconCheck, IconCircleNumber1, IconCircleNumber2, IconCircleNumber3, IconCircleNumber4, IconSettings } from '@tabler/icons-react';
import ContactForm from '../../../components/forms/ContactForm';
import { getServiceBySlug } from '../../../lib/actions';

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
    { title: service.title, href: `/services/${slug}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  const stepIcons = [IconCircleNumber1, IconCircleNumber2, IconCircleNumber3, IconCircleNumber4];

  return (
    <Box py={40}>
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
      </Container>

      <Container size="lg">
        <Grid gap={40}>
          {/* Left Column: Details, Benefits, Process */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="lg">
              {/* Hero Image */}
              <div
                style={{
                  position: 'relative',
                  height: rem(350),
                  width: '100%',
                  borderRadius: rem(12),
                  overflow: 'hidden',
                  boxShadow: 'var(--mantine-shadow-sm)',
                }}
              >
                <Image
                  src={service.imageUrl || service.image_url}
                  alt={service.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
                {service.title}
              </Title>

              {/* Description */}
              <Text size="md" style={{ lineHeight: 1.7 }} c="var(--mantine-color-text)">
                {service.description}
              </Text>

              {/* Benefits */}
              <Box mt="md">
                <Title order={3} size="h3" fw={700} mb="sm" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
                  Key Benefits & Advantages
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {service.benefits.map((benefit: string, index: number) => (
                    <Group key={index} gap="xs" wrap="nowrap" align="flex-start">
                      <ThemeIcon color="brandYellow" radius="xl" size="sm" variant="light">
                        <IconCheck size={14} style={{ color: '#e6ad00' }} />
                      </ThemeIcon>
                      <Text size="sm">{benefit}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Service Process */}
              <Box mt="lg">
                <Title order={3} size="h3" fw={700} mb="md" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
                  Our Execution Process
                </Title>
                
                <Stack gap="md">
                  {(service.process as any[]).map((step: any, index: number) => {
                    const StepIcon = stepIcons[index] || IconSettings;
                    return (
                      <Card key={index} withBorder padding="md" radius="md">
                        <Group gap="md" wrap="nowrap" align="flex-start">
                          <ThemeIcon size="xl" radius="md" color="brandYellow" variant="light" style={{ flexShrink: 0 }}>
                            <StepIcon size={24} style={{ color: '#e6ad00' }} />
                          </ThemeIcon>
                          <div>
                            <Text fw={700} size="sm" mb={4}>
                              Step {step.step}: {step.title}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {step.desc}
                            </Text>
                          </div>
                        </Group>
                      </Card>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right Column: Sticky Lead Capture Form */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <div style={{ position: 'sticky', top: rem(90) }}>
              <ContactForm initialService={service.title} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
