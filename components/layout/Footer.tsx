'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Grid, Stack, Text, Group, ActionIcon, Title, rem } from '@mantine/core';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from '@tabler/icons-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#2B3A55', // Dark navy — strong page anchor
        borderTop: '3px solid #6D94C5',
        paddingTop: rem(60),
        paddingBottom: rem(40),
        color: '#dee2e6',
      }}
      className="footer-section"
    >
      <Container size="lg">
        <Grid gap={{ base: 'xl', md: 'lg' }}>
          {/* Logo & Description */}
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap="md">
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: rem(20),
                    letterSpacing: rem(1),
                    color: '#ffffff',
                    fontFamily: 'var(--font-open-sans), sans-serif',
                    lineHeight: 1.1,
                  }}
                >
                  FULL MAINTENANCE<span style={{ color: '#6D94C5' }}>.</span>
                </span>
                <span
                  style={{
                    fontSize: rem(10),
                    fontWeight: 600,
                    color: '#CBDCEB',
                    letterSpacing: rem(1.5),
                    textTransform: 'uppercase',
                  }}
                >
                  Facility Services
                </span>
              </Link>
              <Text size="sm" style={{ color: '#adb5bd', maxWidth: rem(320), lineHeight: 1.6 }}>
                Complete facility management solutions for residential, commercial, and industrial properties. Electrical, plumbing, HVAC, cleaning, and comprehensive maintenance under one roof.
              </Text>
              <Group gap="xs">
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="gray"
                  aria-label="Facebook"
                  component="a"
                  href="#"
                  styles={{ root: { color: '#CBDCEB', '&:hover': { color: '#ffffff', backgroundColor: 'rgba(109, 148, 197, 0.2)' } } }}
                >
                  <IconBrandFacebook size={18} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="gray"
                  aria-label="Instagram"
                  component="a"
                  href="#"
                  styles={{ root: { color: '#CBDCEB', '&:hover': { color: '#ffffff', backgroundColor: 'rgba(109, 148, 197, 0.2)' } } }}
                >
                  <IconBrandInstagram size={18} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="gray"
                  aria-label="Linkedin"
                  component="a"
                  href="#"
                  styles={{ root: { color: '#CBDCEB', '&:hover': { color: '#ffffff', backgroundColor: 'rgba(109, 148, 197, 0.2)' } } }}
                >
                  <IconBrandLinkedin size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
            <Stack gap="md">
              <Title order={4} size="xs" style={{ letterSpacing: rem(1.5), color: '#CBDCEB', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                QUICK LINKS
              </Title>
              <Stack gap="xs">
                {['Home', 'About Us', 'Our Services', 'Industries', 'Contact Us'].map((label, idx) => {
                  const paths = ['/', '/about', '/services', '/clients', '/contact'];
                  return (
                    <Link
                      key={label}
                      href={paths[idx]}
                      style={{
                        fontSize: rem(14),
                        color: '#adb5bd',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#CBDCEB')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#adb5bd')}
                    >
                      {label}
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Services */}
          <Grid.Col span={{ base: 6, sm: 3, md: 3 }}>
            <Stack gap="md">
              <Title order={4} size="xs" style={{ letterSpacing: rem(1.5), color: '#CBDCEB', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                SERVICES
              </Title>
              <Stack gap="xs">
                {[
                  { label: 'Electrical Services', path: '/services#electrical' },
                  { label: 'Plumbing Services', path: '/services#plumbing' },
                  { label: 'HVAC & AC', path: '/services#hvac' },
                  { label: 'Deep Cleaning', path: '/services#deep-cleaning' },
                  { label: 'Painting & Renovation', path: '/services#painting' },
                  { label: 'Pest Control', path: '/services#pest-control' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    style={{
                      fontSize: rem(14),
                      color: '#adb5bd',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#CBDCEB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#adb5bd')}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contacts */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Title order={4} size="xs" style={{ letterSpacing: rem(1.5), color: '#CBDCEB', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                GET IN TOUCH
              </Title>
              <Stack gap="sm">
                <Group gap="xs" wrap="nowrap" align="flex-start">
                  <IconPhone size={18} style={{ color: '#CBDCEB', marginTop: rem(2), flexShrink: 0 }} />
                  <div>
                    <Text size="sm" fw={600} style={{ color: '#ffffff' }}>
                      +91 90000 00000
                    </Text>
                    <Text size="xs" style={{ color: '#adb5bd' }}>
                      Toll-Free support 24/7
                    </Text>
                  </div>
                </Group>

                <Group gap="xs" wrap="nowrap" align="flex-start">
                  <IconMail size={18} style={{ color: '#CBDCEB', marginTop: rem(2), flexShrink: 0 }} />
                  <div>
                    <Text size="sm" fw={600} style={{ color: '#ffffff' }}>
                      support@fullmaintenance.com
                    </Text>
                    <Text size="xs" style={{ color: '#adb5bd' }}>
                      Average response: 1 hour
                    </Text>
                  </div>
                </Group>

                <Group gap="xs" wrap="nowrap" align="flex-start">
                  <IconMapPin size={18} style={{ color: '#CBDCEB', marginTop: rem(2), flexShrink: 0 }} />
                  <div>
                    <Text size="sm" fw={600} style={{ color: '#ffffff' }}>
                      Metro City
                    </Text>
                    <Text size="xs" style={{ color: '#adb5bd' }}>
                      Serving all major areas & surrounding metropolitan regions
                    </Text>
                  </div>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: '1px solid rgba(203, 220, 235, 0.15)',
            marginTop: rem(40),
            marginBottom: rem(30),
          }}
        />

        {/* Copyright */}
        <Group justify="space-between" align="center" wrap="wrap">
          <Text size="xs" style={{ color: '#adb5bd' }}>
            © {currentYear} Full Maintenance & Deep Cleaning. All rights reserved.
          </Text>
          <Group gap="md">
            <Link
              href="/privacy"
              style={{
                fontSize: rem(12),
                color: '#adb5bd',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#CBDCEB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#adb5bd')}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: rem(12),
                color: '#adb5bd',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#CBDCEB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#adb5bd')}
            >
              Terms of Service
            </Link>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
