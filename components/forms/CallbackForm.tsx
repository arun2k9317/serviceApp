'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, Select, Button, Stack, Text, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconClock, IconPhone, IconUser } from '@tabler/icons-react';
import { requestCallback } from '../../lib/actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\s-]+$/, 'Invalid characters in phone'),
  preferred_time: z.string().min(1, 'Please select a time slot'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CallbackForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      preferred_time: '',
    },
  });

  const preferredTimeValue = watch('preferred_time');

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('preferred_time', values.preferred_time);

      const result = await requestCallback(null, formData);
      
      if (result.success) {
        notifications.show({
          title: 'Success!',
          message: result.message,
          color: 'green',
        });
        reset();
      } else {
        notifications.show({
          title: 'Error',
          message: result.message || 'Something went wrong',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Could not send callback request. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 450, margin: '0 auto' }}>
      <Stack gap="xs" mb="lg">
        <Text fw={700} size="xl" ta="center" c="primaryBlue.7">
          Schedule a Callback
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Enter your details and our customer support team will call you back shortly.
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Your Name"
            placeholder="Enter your full name"
            required
            leftSection={<IconUser size={16} />}
            {...register('name')}
            error={errors.name?.message}
            disabled={loading}
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter 10-digit number"
            required
            leftSection={<IconPhone size={16} />}
            {...register('phone')}
            error={errors.phone?.message}
            disabled={loading}
          />

          <Select
            label="Preferred Calling Time"
            placeholder="Select a time slot"
            required
            leftSection={<IconClock size={16} />}
            data={[
              { value: 'Morning (9 AM - 12 PM)', label: 'Morning (9 AM - 12 PM)' },
              { value: 'Afternoon (12 PM - 4 PM)', label: 'Afternoon (12 PM - 4 PM)' },
              { value: 'Evening (4 PM - 7 PM)', label: 'Evening (4 PM - 7 PM)' },
            ]}
            value={preferredTimeValue || null}
            onChange={(value) => setValue('preferred_time', value || '')}
            error={errors.preferred_time?.message}
            disabled={loading}
          />

          <Button
            type="submit"
            color="primaryBlue.5"
            fullWidth
            size="md"
            loading={loading}
            mt="md"
          >
            Call Me Back
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
