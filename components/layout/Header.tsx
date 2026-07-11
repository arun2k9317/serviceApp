'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  ActionIcon,
  useMantineColorScheme,
  rem,
  Text,
  Button,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSun,
  IconMoon,
  IconPhone,
} from '@tabler/icons-react';

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'INDUSTRIES', path: '/clients' },
  { label: 'AMC PLANS', path: '/amc' },
  { label: 'CAREERS', path: '/contact?subject=careers' },
  { label: 'CONTACT US', path: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eaeaea',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : '0 2px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div style={{ height: rem(65), display: 'flex', alignItems: 'center' }}>
        <Container size="xl" style={{ width: '100%' }}>
          <Group justify="space-between" align="center" wrap="nowrap">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img
                src="/maintex_logo.jpeg"
                alt="maintex Logo"
                style={{
                  height: rem(48),
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <Group gap={rem(18)} visibleFrom="lg" wrap="nowrap">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    style={{
                      fontSize: rem(12.5),
                      fontWeight: 700,
                      color: isActive ? '#0b5edf' : '#2B3A55',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      padding: `${rem(8)} 0`,
                      textTransform: 'uppercase',
                      letterSpacing: rem(0.8),
                      position: 'relative',
                    }}
                    className="nav-link-item"
                  >
                    {link.label}
                    {/* Active Underline Effect */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '10%',
                          right: '10%',
                          height: rem(3),
                          backgroundColor: '#0b5edf',
                          borderRadius: rem(2),
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </Group>

            {/* Support Pill & Actions */}
            <Group gap="md" wrap="nowrap" style={{ flexShrink: 0 }}>
              {/* Color Scheme Toggle */}
              <ActionIcon
                onClick={toggleColorScheme}
                variant="subtle"
                size="lg"
                aria-label="Toggle theme color"
                radius="md"
                styles={{ root: { color: '#2B3A55', '&:hover': { color: '#0b5edf' } } }}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={20} stroke={1.5} style={{ color: '#ffc107' }} />
                ) : (
                  <IconMoon size={20} stroke={1.5} style={{ color: '#2B3A55' }} />
                )}
              </ActionIcon>

              {/* 24/7 Support Capsule Button */}
              <Box
                component="a"
                href="tel:+919048199754"
                visibleFrom="sm"
                style={{
                  backgroundColor: '#0A192F',
                  borderRadius: rem(30),
                  padding: `${rem(8)} ${rem(18)}`,
                  cursor: 'pointer',
                  color: '#ffffff',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(10, 25, 47, 0.15)',
                  transition: 'transform 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Group gap="sm" wrap="nowrap" style={{ height: '100%' }}>
                  <IconPhone size={18} style={{ color: '#00a8ff' }} stroke={2.5} />
                  <Stack gap={0}>
                    <Text size="8.5px" fw={700} style={{ letterSpacing: rem(1.2), color: '#8F9CAE', lineHeight: 1.1 }}>
                      24/7 SUPPORT
                    </Text>
                    <Text size="13px" fw={800} style={{ color: '#ffffff', lineHeight: 1.2 }}>
                      +91 90481 99754
                    </Text>
                  </Stack>
                </Group>
              </Box>

              {/* Burger Menu for Mobile */}
              <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" color="#2B3A55" aria-label="Toggle navigation drawer" />
            </Group>
          </Group>
        </Container>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        styles={{
          header: {
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #eaeaea',
          },
          body: {
            backgroundColor: '#ffffff',
          },
          close: {
            color: '#2B3A55',
          },
        }}
        title={
          <Group gap="xs">
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 80V25L45 55L75 25V80" stroke="#0b5edf" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 55L75 80" stroke="#00a8ff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: rem(20), color: '#0A192F' }}>
              maintex
            </span>
          </Group>
        }
        hiddenFrom="lg"
        zIndex={1100}
      >
        <Stack gap="md" mt="xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Button
                key={link.path}
                component={Link}
                href={link.path}
                onClick={close}
                variant={isActive ? 'filled' : 'subtle'}
                color={isActive ? 'blue' : 'gray'}
                fullWidth
                size="lg"
                styles={{
                  root: {
                    color: isActive ? '#ffffff' : '#2B3A55',
                    justifyContent: 'flex-start',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
          <Button
            component="a"
            href="tel:+919048199754"
            onClick={close}
            variant="filled"
            color="dark"
            fullWidth
            size="lg"
            mt="lg"
            leftSection={<IconPhone size={20} />}
            styles={{
              root: {
                backgroundColor: '#0A192F',
                color: '#ffffff',
                fontWeight: 700,
              },
            }}
          >
            Call Support 24/7
          </Button>
        </Stack>
      </Drawer>
    </header>
  );
}
