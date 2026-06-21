'use client';

import React from 'react';
import { Button, Grid } from '@mantine/core';
import { IconPhone, IconBrandWhatsapp } from '@tabler/icons-react';

export default function QuickCallButton() {
  const phoneNumber = '+919000000000'; // Placeholder Kerala number
  const whatsappNumber = '919000000000';
  const whatsappMsg = encodeURIComponent('Hello, I want to book a maintenance inspection.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="mobile-sticky-bar">
      <Grid gap="xs">
        <Grid.Col span={6}>
          <Button
            component="a"
            href={`tel:${phoneNumber}`}
            fullWidth
            leftSection={<IconPhone size={18} />}
            color="primaryBlue.5"
            size="md"
            radius="md"
            styles={{
              root: {
                boxShadow: '0 4px 10px rgba(11, 94, 215, 0.2)',
              }
            }}
          >
            Call Hotline
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            component="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            leftSection={<IconBrandWhatsapp size={18} />}
            color="green"
            variant="outline"
            size="md"
            radius="md"
            styles={{
              root: {
                borderColor: '#25D366',
                color: '#25D366',
                '&:hover': {
                  backgroundColor: 'rgba(37, 211, 102, 0.05)',
                }
              }
            }}
          >
            WhatsApp
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
