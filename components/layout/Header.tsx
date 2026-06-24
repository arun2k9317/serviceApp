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
          ? 'rgba(245, 239, 230, 0.97)' // cream when scrolled
          : 'rgba(43, 58, 85, 0.55)',    // dark navy overlay at top
        borderBottom: scrolled
          ? '1px solid rgba(109, 148, 197, 0.25)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: scrolled ? '0 4px 20px rgba(43, 58, 85, 0.12)' : 'none',
      }}
    >
      {/* 1. TOP HEADER STRIP */}
      <div
        style={{
          height: scrolled ? 0 : rem(40),
          opacity: scrolled ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: '#2B3A55',
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
                <IconPhone size={14} style={{ color: '#CBDCEB' }} />
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
                <IconMail size={14} style={{ color: '#CBDCEB' }} />
                <span>info@fullmaintenance.com</span>
              </a>
            </div>

            {/* Social profiles */}
            <Group gap="xs" style={{ paddingRight: rem(16) }}>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
                <IconBrandFacebook size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
                <IconBrandTwitter size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
                <IconBrandInstagram size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
                <IconWorld size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
                <IconBrandPinterest size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="gray" component="a" href="#" target="_blank" styles={{ root: { color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#CBDCEB' } } }}>
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
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: rem(20),
                  letterSpacing: rem(1),
                  color: scrolled ? '#2B3A55' : '#ffffff',
                  fontFamily: 'var(--font-open-sans), sans-serif',
                  lineHeight: 1.1,
                  transition: 'color 0.3s ease',
                }}
              >
                FULL MAINTENANCE<span style={{ color: '#6D94C5' }}>.</span>
              </span>
              <span
                style={{
                  fontSize: rem(10),
                  fontWeight: 600,
                  color: scrolled ? '#6D94C5' : '#CBDCEB',
                  letterSpacing: rem(1.5),
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                Facility Services
              </span>
            </Link>

            {/* Desktop Navigation Links */}
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
                      color: isActive ? '#6D94C5' : (scrolled ? '#2B3A55' : '#ffffff'),
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      padding: `${rem(6)} ${rem(10)}`,
                      textTransform: 'uppercase',
                      letterSpacing: rem(0.5),
                      border: isActive
                        ? '1px solid rgba(109, 148, 197, 0.4)'
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
                aria-label="Toggle theme color"
                radius="md"
                styles={{ root: { color: scrolled ? '#2B3A55' : '#ffffff', '&:hover': { color: '#6D94C5' } } }}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={20} stroke={1.5} style={{ color: '#6D94C5' }} />
                ) : (
                  <IconMoon size={20} stroke={1.5} style={{ color: scrolled ? '#2B3A55' : '#ffffff' }} />
                )}
              </ActionIcon>

              {/* Quick Consultation CTA */}
              <Button
                component={Link}
                href="/contact"
                variant="filled"
                color="brandBlue"
                size="sm"
                styles={{
                  root: {
                    backgroundColor: '#6D94C5',
                    color: '#ffffff',
                    fontWeight: 800,
                    borderRadius: rem(2),
                    textTransform: 'uppercase',
                    fontSize: rem(12),
                    letterSpacing: rem(0.5),
                    '&:hover': {
                      backgroundColor: '#5a80b0',
                    },
                  },
                }}
                visibleFrom="sm"
                id="header-cta-consultation"
              >
                Get Consultation
              </Button>

              {/* Burger Menu for Mobile */}
              <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" color={scrolled ? '#2B3A55' : '#ffffff'} aria-label="Toggle navigation drawer" />
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
            backgroundColor: '#F5EFE6',
            borderBottom: '1px solid #CBDCEB',
          },
          body: {
            backgroundColor: '#F5EFE6',
          },
          close: {
            color: '#2B3A55',
            '&:hover': {
              backgroundColor: '#E8DFCA',
            },
          },
        }}
        title={
          <Group gap="xs">
            <span style={{ fontWeight: 800, fontSize: rem(18), color: '#2B3A55' }}>
              FULL MAINTENANCE<span style={{ color: '#6D94C5' }}>.</span>
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
                color={isActive ? 'brandBlue' : 'gray'}
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
            component={Link}
            href="/contact"
            onClick={close}
            variant="filled"
            color="brandBlue"
            fullWidth
            size="lg"
            mt="lg"
            styles={{
              root: {
                color: '#ffffff',
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
