'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, Select, Textarea, Button, Stack, Text, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconUser, IconPhone, IconMail, IconSettings, IconMessage } from '@tabler/icons-react';
import { submitInquiry } from '../../lib/actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\s-]+$/, 'Invalid characters in phone'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  service_type: z.string().min(1, 'Please select a service type'),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const serviceOptions = [
  { value: 'AC Maintenance & Servicing', label: 'AC Maintenance & Servicing' },
  { value: 'Deep Cleaning Services', label: 'Deep Cleaning Services' },
  { value: 'Electrical Maintenance', label: 'Electrical Maintenance' },
  { value: 'Plumbing Maintenance', label: 'Plumbing Maintenance' },
  { value: 'Preventive Maintenance', label: 'Preventive Maintenance' },
  { value: 'Annual Maintenance Contracts (AMC)', label: 'Annual Maintenance Contracts (AMC)' },
  { value: 'Emergency Breakdown Support', label: 'Emergency Breakdown Support' },
  { value: 'Mobile Car Wash Services', label: 'Mobile Car Wash Services' },
];

interface ContactFormProps {
  initialService?: string;
}

export default function ContactForm({ initialService = '' }: ContactFormProps) {
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
      email: '',
      service_type: initialService,
      message: '',
    },
  });

  const serviceTypeValue = watch('service_type');

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      if (values.email) formData.append('email', values.email);
      formData.append('service_type', values.service_type);
      if (values.message) formData.append('message', values.message);

      const result = await submitInquiry(null, formData);

      if (result.success) {
        notifications.show({
          title: 'Inquiry Submitted',
          message: result.message,
          color: 'green',
        });
        reset();
      } else {
        notifications.show({
          title: 'Error',
          message: result.message || 'Validation failed. Please correct form fields.',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Network Error',
        message: 'Could not submit your inquiry. Please check your connection and try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="md" padding="xl" radius="md" withBorder>
      <Stack gap="xs" mb="lg">
        <Text fw={800} size="xl" c="primaryBlue.7">
          Request a Free Quote / Inspection
        </Text>
        <Text size="sm" c="dimmed">
          Fill out the form below. Our scheduling coordinator will get back to you within 2 hours to confirm your free inspection booking.
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="Enter your name"
            required
            leftSection={<IconUser size={16} />}
            {...register('name')}
            error={errors.name?.message}
            disabled={loading}
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            required
            leftSection={<IconPhone size={16} />}
            {...register('phone')}
            error={errors.phone?.message}
            disabled={loading}
          />

          <TextInput
            label="Email Address"
            placeholder="Enter your email address (optional)"
            leftSection={<IconMail size={16} />}
            {...register('email')}
            error={errors.email?.message}
            disabled={loading}
          />

          <Select
            label="Required Service"
            placeholder="Select a service category"
            required
            leftSection={<IconSettings size={16} />}
            data={serviceOptions}
            value={serviceTypeValue || null}
            onChange={(value) => setValue('service_type', value || '')}
            error={errors.service_type?.message}
            disabled={loading}
          />

          <Textarea
            label="Inquiry / Message"
            placeholder="Tell us details about the service required (e.g. villa size, specific faults, address)"
            minRows={3}
            leftSection={<IconMessage size={16} style={{ transform: 'translateY(-24px)' }} />}
            {...register('message')}
            error={errors.message?.message}
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
            Submit Request
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
