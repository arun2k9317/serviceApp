'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Text, SimpleGrid, Group, Badge, Modal, ActionIcon, Stack, Grid, Box, rem, AspectRatio } from '@mantine/core';
import { IconArrowsLeftRight, IconEye } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  before_image_url: string;
  after_image_url: string;
}

interface BeforeAfterSliderProps {
  items: GalleryItem[];
}

export default function BeforeAfterSlider({ items }: BeforeAfterSliderProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div>
      {/* Simple Grid / Masonry style gallery */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Card
              shadow="sm"
              padding="xs"
              radius="md"
              withBorder
              style={{ cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => {
                setSelectedItem(item);
                setSliderPosition(50); // Reset slider
              }}
            >
              {/* Image box showing "After" state with hover transition */}
              <div style={{ position: 'relative', height: rem(220), borderRadius: rem(6), overflow: 'hidden' }}>
                <Image
                  src={item.after_image_url}
                  alt={item.title || 'Cleaning gallery'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Overlay Hover button */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(11, 94, 215, 0.2)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s ease',
                  }}
                  className="hover-overlay"
                >
                  <ActionIcon size="xl" radius="xl" color="blue" variant="filled">
                    <IconEye size={24} />
                  </ActionIcon>
                </div>
                
                <Badge
                  color="green"
                  variant="filled"
                  style={{ position: 'absolute', top: rem(10), right: rem(10), zIndex: 1 }}
                >
                  Completed
                </Badge>
              </div>

              <style jsx>{`
                div:hover .hover-overlay {
                  opacity: 1 !important;
                }
              `}</style>

              <Group justify="space-between" mt="md" px="xs" pb="xs">
                <Text fw={700} size="sm">
                  {item.title || 'Deep Cleaning Project'}
                </Text>
                <Badge color="blue" variant="light">
                  {item.category.replace('-', ' ')}
                </Badge>
              </Group>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Lightbox / Comparison Modal */}
      <Modal
        opened={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || 'Interactive Comparison'}
        size="lg"
        radius="md"
        centered
        styles={{
          title: {
            fontWeight: 700,
            fontSize: rem(18),
          },
        }}
      >
        {selectedItem && (
          <Stack gap="md">
            {/* Interactive Before/After Compare Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: rem(400),
                borderRadius: rem(8),
                overflow: 'hidden',
                userSelect: 'none',
              }}
            >
              {/* After Image (Background) */}
              <Image
                src={selectedItem.after_image_url}
                alt="After cleaning"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: rem(12),
                  right: rem(12),
                  backgroundColor: 'rgba(25, 135, 84, 0.85)',
                  color: '#FFFFFF',
                  padding: `${rem(4)} ${rem(10)}`,
                  borderRadius: rem(4),
                  fontSize: rem(12),
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                AFTER
              </div>

              {/* Before Image (Curtain / Overlay) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${sliderPosition}%`,
                  overflow: 'hidden',
                  zIndex: 1,
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: rem(400) }}>
                  {/* Fixed width viewport to align correctly with container */}
                  <div style={{ position: 'relative', width: rem(800), height: rem(400) }}>
                    <Image
                      src={selectedItem.before_image_url}
                      alt="Before cleaning"
                      fill
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: rem(12),
                  left: rem(12),
                  backgroundColor: 'rgba(108, 117, 125, 0.85)',
                  color: '#FFFFFF',
                  padding: `${rem(4)} ${rem(10)}`,
                  borderRadius: rem(4),
                  fontSize: rem(12),
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                BEFORE
              </div>

              {/* Central Divider Bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  width: rem(2),
                  backgroundColor: '#FFFFFF',
                  zIndex: 3,
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
              >
                {/* Drag Handle button */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: rem(36),
                    height: rem(36),
                    borderRadius: '50%',
                    backgroundColor: '#0B5ED7',
                    border: '3px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  <IconArrowsLeftRight size={18} />
                </div>
              </div>

              {/* Invisible Slider Input Overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'ew-resize',
                  zIndex: 4,
                }}
              />
            </div>

            <Grid mt="xs">
              <Grid.Col span={8}>
                <Text size="sm" c="dimmed">
                  Drag the slider handle sideways to compare the before and after clean states.
                </Text>
              </Grid.Col>
              <Grid.Col span={4} style={{ textAlign: 'right' }}>
                <Badge color="blue">{selectedItem.category.replace('-', ' ')}</Badge>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>
    </div>
  );
}
