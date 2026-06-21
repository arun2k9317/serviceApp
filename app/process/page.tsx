'use client';

import React from 'react';
import { Container, Title, Text, Timeline, Card, ThemeIcon, Stack, Box, rem, Breadcrumbs, Anchor, Group } from '@mantine/core';
import { IconMapPin, IconReportSearch, IconCircleCheck, IconSettings, IconShieldCheck, IconTools } from '@tabler/icons-react';

export default function ProcessPage() {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Our Work Process', href: '/process' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Box py={40}>
      {/* Page Header */}
      <Container size="lg" mb="xl">
        <Breadcrumbs mb="md">{breadcrumbs}</Breadcrumbs>
        
        <Box style={{ borderLeft: '4px solid #ffc104', paddingLeft: rem(16) }} mb="xl">
          <Title order={1} fw={900} style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
            Our Structured Work Process
          </Title>
          <Text c="dimmed" size="md" mt="xs" style={{ maxWidth: rem(650) }}>
            We follow a rigorous, quality-focused timeline to ensure transparency, safe engineering practices, and thorough cleaning results.
          </Text>
        </Box>
      </Container>

      {/* Timeline Section */}
      <Container size="md" mt={60}>
        <Timeline active={4} bulletSize={38} lineWidth={3} color="brandYellow">
          {/* Step 1 */}
          <Timeline.Item
            bullet={
              <ThemeIcon size={38} radius="xl" color="brandYellow">
                <IconMapPin size={20} style={{ color: '#2a2f35' }} />
              </ThemeIcon>
            }
            title={
              <Text fw={800} size="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Step 1: Free Site Inspection
              </Text>
            }
          >
            <Card withBorder padding="md" radius="md" mt="xs" mb="lg">
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Our senior mechanical or electrical service engineer schedules a visit to your villa, apartment, or commercial office. They carry out a thorough visual audit checking AC current draws, leakage pressure in plumbing, distribution board safety, and floor/wall tile snags.
              </Text>
            </Card>
          </Timeline.Item>

          {/* Step 2 */}
          <Timeline.Item
            bullet={
              <ThemeIcon size={38} radius="xl" color="brandYellow">
                <IconReportSearch size={20} style={{ color: '#2a2f35' }} />
              </ThemeIcon>
            }
            title={
              <Text fw={800} size="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Step 2: Snag List Preparation
              </Text>
            }
          >
            <Card withBorder padding="md" radius="md" mt="xs" mb="lg">
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Based on our inspector’s observations, we compile a detailed digital checklist of all outstanding snags, faults, and preventive cleaning recommendations. The snags are categorized by priority (High, Medium, Low) so you know what requires immediate action.
              </Text>
            </Card>
          </Timeline.Item>

          {/* Step 3 */}
          <Timeline.Item
            bullet={
              <ThemeIcon size={38} radius="xl" color="brandYellow">
                <IconCircleCheck size={20} style={{ color: '#2a2f35' }} />
              </ThemeIcon>
            }
            title={
              <Text fw={800} size="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Step 3: Quotation & Proposal Approval
              </Text>
            }
          >
            <Card withBorder padding="md" radius="md" mt="xs" mb="lg">
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                We provide a fully transparent, line-item price quotation for resolving the snags or onboarding you to an Annual Maintenance Contract (AMC). There are no hidden fees or visiting charges. We begin only after you review and approve the proposal.
              </Text>
            </Card>
          </Timeline.Item>

          {/* Step 4 */}
          <Timeline.Item
            bullet={
              <ThemeIcon size={38} radius="xl" color="brandYellow">
                <IconTools size={20} style={{ color: '#2a2f35' }} />
              </ThemeIcon>
            }
            title={
              <Text fw={800} size="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Step 4: Maintenance Execution
              </Text>
            }
          >
            <Card withBorder padding="md" radius="md" mt="xs" mb="lg">
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Our certified technician teams arrive on-site with advanced industrial equipment (pressure washing pumps, rotary scrubbing machines, descaling agents). They complete the requested AC washing, wiring fixes, leak repairs, or deep sanitization with absolute care.
              </Text>
            </Card>
          </Timeline.Item>

          {/* Step 5 */}
          <Timeline.Item
            bullet={
              <ThemeIcon size={38} radius="xl" color="brandYellow">
                <IconShieldCheck size={20} style={{ color: '#2a2f35' }} />
              </ThemeIcon>
            }
            title={
              <Text fw={800} size="md" style={{ color: '#e6ad00', fontFamily: 'var(--font-open-sans), sans-serif' }}>
                Step 5: Final Inspection & Reporting
              </Text>
            }
          >
            <Card withBorder padding="md" radius="md" mt="xs" mb="lg">
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                A senior supervisor inspects the completed work to verify our strict quality parameters. Once checked, we hand you a digital job completion report and update your property maintenance history logs for future reference.
              </Text>
            </Card>
          </Timeline.Item>
        </Timeline>
      </Container>
    </Box>
  );
}
