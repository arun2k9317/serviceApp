'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, Title, Text, TextInput, PasswordInput, Button, Stack, Alert, rem } from '@mantine/core';
import { IconLock, IconMail, IconAlertTriangle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { adminLogin } from '../../../lib/actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await adminLogin(null, formData);
      if (result.success) {
        notifications.show({
          title: 'Welcome Back',
          message: 'Logged in successfully as admin.',
          color: 'green',
        });
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" py={80}>
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Stack gap="xs" mb="lg" align="center">
          <Title order={2} fw={900}>
            Admin Panel Login
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            Sign in to access leads, testimonials, and gallery management tools.
          </Text>
        </Stack>

        <Alert
          icon={<IconAlertTriangle size={16} />}
          title="Demo Fallback Notice"
          color="orange"
          variant="light"
          mb="md"
        >
          If your Supabase database is not connected, use email{' '}
          <Text span fw={700}>
            admin@maintenance.com
          </Text>{' '}
          and any password to log in.
        </Alert>

        {error && (
          <Alert color="red" title="Login Failed" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email Address"
              name="email"
              placeholder="admin@maintenance.com"
              required
              leftSection={<IconMail size={16} />}
              disabled={loading}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Your password"
              required
              leftSection={<IconLock size={16} />}
              disabled={loading}
            />

            <Button
              type="submit"
              color="primaryBlue.5"
              size="md"
              fullWidth
              loading={loading}
              mt="md"
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
