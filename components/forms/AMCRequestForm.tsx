'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, Select, Textarea, Button, Stack, Text, Card, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconUser, IconPhone, IconMail, IconHome, IconChevronRight } from '@tabler/icons-react';
import { submitInquiry } from '../../lib/actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\s-]+$/, 'Invalid characters in phone'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  property_type: z.string().min(1, 'Please select property type'),
  property_size: z.string().min(1, 'Please select property size range'),
  ac_units: z.string().min(1, 'Please select number of ACs'),
  package_type: z.string().min(1, 'Please select a package type'),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function AMCRequestForm() {
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
      property_type: '',
      property_size: '',
      ac_units: '',
      package_type: '',
      notes: '',
    },
  });

  const propertyTypeValue = watch('property_type');
  const propertySizeValue = watch('property_size');
  const acUnitsValue = watch('ac_units');
  const packageTypeValue = watch('package_type');

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const detailedMessage = `
--- AMC Quote Request ---
Property Type: ${values.property_type}
Property Size: ${values.property_size}
Number of AC Units: ${values.ac_units}
Package Choice: ${values.package_type}
Additional Notes: ${values.notes || 'None'}
      `.trim();

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      if (values.email) formData.append('email', values.email);
      formData.append('service_type', 'Annual Maintenance Contracts (AMC)');
      formData.append('message', detailedMessage);

      const result = await submitInquiry(null, formData);

      if (result.success) {
        notifications.show({
          title: 'AMC Quote Requested',
          message: 'Your AMC configuration has been saved. A relationship manager will call you with a pricing quote.',
          color: 'green',
        });
        reset();
      } else {
        notifications.show({
          title: 'Submission Error',
          message: result.message || 'Validation failed.',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Network issue. Could not submit request.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="md" padding="xl" radius="md" withBorder>
      <Stack gap="xs" mb="lg">
        <Text fw={800} size="xl" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
          Get a Custom AMC Quote
        </Text>
        <Text size="sm" c="dimmed">
          Provide your property details below to configure your custom annual maintenance package. We will calculate a price quote and contact you.
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Grid gap="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Full Name"
                placeholder="Enter your name"
                required
                leftSection={<IconUser size={16} />}
                {...register('name')}
                error={errors.name?.message}
                disabled={loading}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                required
                leftSection={<IconPhone size={16} />}
                {...register('phone')}
                error={errors.phone?.message}
                disabled={loading}
              />
            </Grid.Col>
          </Grid>

          <TextInput
            label="Email Address"
            placeholder="Enter your email address (optional)"
            leftSection={<IconMail size={16} />}
            {...register('email')}
            error={errors.email?.message}
            disabled={loading}
          />

          <Grid gap="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Property Type"
                placeholder="Select type"
                required
                leftSection={<IconHome size={16} />}
                data={[
                  { value: 'Villa', label: 'Villa / Independent House' },
                  { value: 'Apartment', label: 'Apartment / Flat' },
                  { value: 'Commercial Office', label: 'Commercial Office' },
                  { value: 'Retail Shop / Showroom', label: 'Retail Shop / Showroom' },
                ]}
                value={propertyTypeValue || null}
                onChange={(value) => setValue('property_type', value || '')}
                error={errors.property_type?.message}
                disabled={loading}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Property Size"
                placeholder="Select size bracket"
                required
                data={[
                  { value: 'Under 1500 sq ft', label: 'Under 1500 sq ft' },
                  { value: '1500 - 2500 sq ft', label: '1500 - 2500 sq ft' },
                  { value: '2501 - 4000 sq ft', label: '2501 - 4000 sq ft' },
                  { value: 'Above 4000 sq ft', label: 'Above 4000 sq ft' },
                ]}
                value={propertySizeValue || null}
                onChange={(value) => setValue('property_size', value || '')}
                error={errors.property_size?.message}
                disabled={loading}
              />
            </Grid.Col>
          </Grid>

          <Grid gap="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Number of AC Units"
                placeholder="Select AC count"
                required
                data={[
                  { value: 'None', label: 'None' },
                  { value: '1 - 3 Units', label: '1 - 3 Units' },
                  { value: '4 - 6 Units', label: '4 - 6 Units' },
                  { value: '7+ Units', label: '7+ Units' },
                ]}
                value={acUnitsValue || null}
                onChange={(value) => setValue('ac_units', value || '')}
                error={errors.ac_units?.message}
                disabled={loading}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Target AMC Package"
                placeholder="Select package choice"
                required
                data={[
                  { value: 'Residential AMC', label: 'Residential Comprehensive AMC' },
                  { value: 'Commercial AMC', label: 'Commercial Corporate AMC' },
                  { value: 'Quarterly Preventive Maintenance', label: 'Quarterly Preventive Checkups' },
                  { value: 'Custom Plan', label: 'Tailored Custom Plan' },
                ]}
                value={packageTypeValue || null}
                onChange={(value) => setValue('package_type', value || '')}
                error={errors.package_type?.message}
                disabled={loading}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Additional Notes / Inquiries"
            placeholder="Please specify any specific equipment (e.g. brand, water tank capacity, special cleaning needs)"
            minRows={2}
            {...register('notes')}
            error={errors.notes?.message}
            disabled={loading}
          />

          <Button
            type="submit"
            color="brandYellow"
            size="md"
            fullWidth
            loading={loading}
            mt="md"
            rightSection={<IconChevronRight size={16} />}
            styles={{
              root: {
                color: '#2a2f35',
                fontWeight: 700,
              }
            }}
          >
            Calculate Quote & Request Contract
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
