'use client';

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Group, Avatar, Rating, rem } from '@mantine/core';

interface Testimonial {
  id: string;
  customer_name: string;
  designation?: string;
  review: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <Carousel
      withIndicators
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 1 }}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap="md"
      styles={{
        control: {
          backgroundColor: '#2a2f35',
          boxShadow: 'var(--mantine-shadow-md)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#ffc104',
            color: '#2a2f35',
          },
        },
        indicator: {
          width: rem(8),
          height: rem(8),
          transition: 'width 250ms ease',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&[data-active]': {
            width: rem(24),
            backgroundColor: '#ffc104',
          },
        },
      }}
    >
      {testimonials.map((testimonial) => {
        // Initials for avatar fallback
        const initials = testimonial.customer_name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2);

        return (
          <Carousel.Slide key={testimonial.id} style={{ padding: `${rem(10)} 0` }}>
            <Card
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: '#2a2f35', // Match Bricks dark testimonial style
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              <Group gap="md" align="center" mb="md">
                <Avatar color="brandYellow" radius="xl" size={60} styles={{ placeholder: { color: '#2a2f35', fontWeight: 700 } }}>
                  {initials}
                </Avatar>
                <div>
                  <Text size="sm" fw={700} style={{ color: '#ffffff', textTransform: 'uppercase', letterSpacing: rem(0.5) }}>
                    {testimonial.customer_name}
                  </Text>
                  {testimonial.designation && (
                    <Text size="xs" style={{ color: '#ffc104', fontStyle: 'italic' }}>
                      {testimonial.designation}
                    </Text>
                  )}
                  <Rating value={testimonial.rating} readOnly color="yellow" size="xs" mt={4} />
                </div>
              </Group>

              <Text
                size="sm"
                style={{
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: '#dee2e6',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: rem(15),
                }}
              >
                « {testimonial.review} »
              </Text>
            </Card>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
