'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Container,
  Group,
  Button,
  Burger,
  Drawer,
  Stack,
  ActionIcon,
  useMantineColorScheme,
  rem,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSun,
  IconMoon,
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconWorld,
} from '@tabler/icons-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/clients' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
        backgroundColor: scrolled
          ? 'rgba(42, 47, 53, 0.96)' // Bricks solid dark charcoal when scrolled
          : 'rgba(0, 0, 0, 0.3)', // Transparent overlay at the top (scrollY === 0)
        borderBottom: scrolled
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
      }}
    >
      {/* 1. TOP HEADER STRIP */}
      <div
        style={{
          height: scrolled ? 0 : rem(40),
          opacity: scrolled ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: rem(13),
          color: '#adb5bd',
        }}
      >
        <Container size="xl" style={{ height: '100%', paddingLeft: rem(16), paddingRight: rem(16) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
            {/* Contact details */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <a
                href="tel:+919000000000"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(8),
                  color: '#ffffff',
                  textDecoration: 'none',
                  height: '100%',
                  padding: `0 ${rem(20)}`,
                  borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                }}
                className="top-header-link"
              >
                <IconPhone size={14} style={{ color: '#ffc104' }} />
                <span>+91 90000 00000</span>
              </a>
              <a
                href="mailto:info@fullmaintenance.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(8),
                  color: '#ffffff',
                  textDecoration: 'none',
                  height: '100%',
                  padding: `0 ${rem(20)}`,
                  borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                }}
                className="top-header-link"
              >
                <IconMail size={14} style={{ color: '#ffc104' }} />
                <span>info@fullmaintenance.com</span>
              </a>
            </div>

            {/* Social profiles */}
            <Group gap="xs" style={{ paddingRight: rem(16) }}>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconBrandFacebook size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconBrandTwitter size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconBrandInstagram size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconWorld size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconBrandPinterest size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#ffc104' } } }}>
                <IconBrandLinkedin size={16} />
              </ActionIcon>
            </Group>
          </div>
        </Container>
      </div>

      {/* 2. BOTTOM MAIN HEADER */}
      <div style={{ height: rem(80), display: 'flex', alignItems: 'center' }}>
        <Container size="xl" style={{ width: '100%' }}>
          <Group justify="space-between" align="center" wrap="nowrap">
            {/* Logo in Bricks style */}
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
                FULL MAINTENANCE<span style={{ color: '#ffc104' }}>.</span>
              </span>
              <span
                style={{
                  fontSize: rem(10),
                  fontWeight: 600,
                  color: '#adb5bd',
                  letterSpacing: rem(1.5),
                  textTransform: 'uppercase',
                }}
              >
                Facility Services
              </span>
            </Link>

            {/* Desktop Navigation Links (Uppercase, 13px, bold, white/gold, Bricks outline for active) */}
            <Group gap={rem(4)} visibleFrom="lg" wrap="nowrap">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    style={{
                      fontSize: rem(12),
                      fontWeight: 700,
                      color: isActive ? '#ffc104' : '#ffffff',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      padding: `${rem(6)} ${rem(10)}`,
                      textTransform: 'uppercase',
                      letterSpacing: rem(0.5),
                      border: isActive
                        ? '1px solid rgba(255, 193, 4, 0.35)'
                        : '1px solid transparent',
                      borderRadius: rem(2),
                    }}
                    className="nav-link-item"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </Group>

            {/* CTA & Actions */}
            <Group gap="lg" wrap="nowrap" style={{ flexShrink: 0 }}>

              {/* Color Scheme Toggle */}
              <ActionIcon
                onClick={toggleColorScheme}
                variant="subtle"
                size="lg"
                color={colorScheme === 'dark' ? 'yellow' : 'gray'}
                aria-label="Toggle theme color"
                radius="md"
                styles={{ root: { color: '#ffffff', '&:hover': { color: '#ffc104' } } }}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={20} stroke={1.5} style={{ color: '#ffc104' }} />
                ) : (
                  <IconMoon size={20} stroke={1.5} style={{ color: '#ffffff' }} />
                )}
              </ActionIcon>

              {/* Quick Consultation CTA */}
              <Button
                component={Link}
                href="/contact"
                variant="filled"
                color="brandYellow"
                size="sm"
                styles={{
                  root: {
                    backgroundColor: '#ffc104',
                    color: '#2a2f35',
                    fontWeight: 800,
                    borderRadius: rem(2), // match blocky Bricks theme
                    textTransform: 'uppercase',
                    fontSize: rem(12),
                    letterSpacing: rem(0.5),
                    '&:hover': {
                      backgroundColor: '#e6ad00',
                    },
                  },
                }}
                visibleFrom="sm"
                id="header-cta-consultation"
              >
                Get Consultation
              </Button>

              {/* Burger Menu for Mobile */}
              <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" color="#ffffff" aria-label="Toggle navigation drawer" />
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
            backgroundColor: '#2a2f35',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
          body: {
            backgroundColor: '#2a2f35',
          },
          close: {
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        }}
        title={
          <Group gap="xs">
            <span style={{ fontWeight: 800, fontSize: rem(18), color: '#ffffff' }}>
              FULL MAINTENANCE<span style={{ color: '#ffc104' }}>.</span>
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
                color={isActive ? 'brandYellow' : 'gray'}
                fullWidth
                size="lg"
                styles={{
                  root: {
                    color: isActive ? '#2a2f35' : '#ffffff',
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
            component={Link}
            href="/contact"
            onClick={close}
            variant="filled"
            color="brandYellow"
            fullWidth
            size="lg"
            mt="lg"
            styles={{
              root: {
                color: '#2a2f35',
                fontWeight: 700,
              },
            }}
          >
            Get Free Inspection
          </Button>
        </Stack>
      </Drawer>
    </header>
  );
}
