'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Text, Button, Badge, Group, Stack, rem } from '@mantine/core';
import { IconCheck, IconChevronRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  index: number;
}

export default function ServiceCard({ title, slug, description, imageUrl, benefits, index }: ServiceCardProps) {
  // Staggered fade-up animation configurations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.8, 0.25, 1] as any,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      style={{ height: '100%' }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'box-shadow 0.3s ease',
          overflow: 'hidden',
        }}
        className="hover-lift"
      >
        <Stack gap="sm">
          {/* Card Image Area with fallback */}
          <div style={{ position: 'relative', height: rem(180), width: '100%', borderRadius: rem(8), overflow: 'hidden' }}>
            <Image
              src={imageUrl || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80'}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
            {slug === 'emergency-support' && (
              <Badge
                color="red"
                variant="filled"
                style={{ position: 'absolute', top: rem(12), right: rem(12), zIndex: 1 }}
              >
                24/7 Response
              </Badge>
            )}
            {slug === 'deep-cleaning' && (
              <Badge
                color="green"
                variant="filled"
                style={{ position: 'absolute', top: rem(12), right: rem(12), zIndex: 1 }}
              >
                Premium Service
              </Badge>
            )}
          </div>

          <Text fw={700} size="lg" mt="xs" c="primaryBlue.7">
            {title}
          </Text>

          <Text size="sm" c="dimmed" lineClamp={3}>
            {description}
          </Text>

          {/* Key Benefits List */}
          <Stack gap={6} my="xs">
            {benefits.slice(0, 3).map((benefit, i) => (
              <Group key={i} gap={8} wrap="nowrap" align="flex-start">
                <IconCheck size={16} style={{ color: 'var(--mantine-color-green-6)', flexShrink: 0, marginTop: rem(2) }} />
                <Text size="xs" c="var(--mantine-color-text)">
                  {benefit}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>

        <Button
          component={Link}
          href={slug === 'deep-cleaning' ? '/deep-cleaning' : `/services/${slug}`}
          variant="light"
          color="primaryBlue"
          fullWidth
          mt="md"
          rightSection={<IconChevronRight size={14} />}
        >
          View Details
        </Button>
      </Card>
    </motion.div>
  );
}
