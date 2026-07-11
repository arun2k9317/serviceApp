'use client';

import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappNumber = '919048199754'; // Kerala number
  const message = encodeURIComponent('Hello, I would like to inquire about your facility maintenance & deep cleaning services.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Tooltip label="Chat on WhatsApp" position="left" withArrow offset={10}>
      <motion.div
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ActionIcon
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          size={56}
          radius="xl"
          style={{
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            border: 'none',
            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
          }}
          aria-label="Contact on WhatsApp"
        >
          <IconBrandWhatsapp size={32} stroke={1.5} />
        </ActionIcon>
      </motion.div>
    </Tooltip>
  );
}
