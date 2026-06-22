'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Tabs,
  Table,
  Badge,
  Button,
  Group,
  Stack,
  Card,
  SimpleGrid,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Checkbox,
  Select,
  ActionIcon,
  Alert,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  IconLogout,
  IconInbox,
  IconClock,
  IconMessage,
  IconGift,
  IconPhoto,
  IconTrash,
  IconCheck,
  IconPlus,
  IconBolt,
  IconProgressCheck,
  IconFolder,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {
  adminLogout,
  updateInquiryStatus,
  updateCallbackStatus,
  addTestimonial,
  deleteTestimonial,
  addOffer,
  toggleOfferActive,
  deleteOffer,
  addGalleryItem,
  deleteGalleryItem,
} from '../../lib/actions';
import { createClientComponentClient, isSupabaseConfigured } from '../../lib/supabase';

// Props Interface
interface DashboardClientProps {
  stats: {
    totalLeads: number;
    todayLeads: number;
    openInquiries: number;
    activeAmc: number;
    mode: string;
  };
  inquiries: any[];
  callbacks: any[];
  testimonials: any[];
  offers: any[];
  gallery: any[];
}

export default function DashboardClient({
  stats,
  inquiries: initialInquiries,
  callbacks: initialCallbacks,
  testimonials: initialTestimonials,
  offers: initialOffers,
  gallery: initialGallery,
}: DashboardClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [callbacks, setCallbacks] = useState(initialCallbacks);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [offers, setOffers] = useState(initialOffers);
  const [gallery, setGallery] = useState(initialGallery);

  const [loading, setLoading] = useState(false);

  // Modals disclosure states
  const [testimonialOpened, testimonialHandlers] = useDisclosure(false);
  const [offerOpened, offerHandlers] = useDisclosure(false);
  const [galleryOpened, galleryHandlers] = useDisclosure(false);

  // Logout trigger
  const handleLogout = async () => {
    setLoading(true);
    await adminLogout();
    router.push('/admin/login');
    router.refresh();
  };

  // Status updaters
  const handleInquiryStatus = async (id: string, newStatus: string) => {
    const res = await updateInquiryStatus(id, newStatus);
    if (res.success) {
      setInquiries(
        inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      notifications.show({ title: 'Success', message: 'Inquiry status updated', color: 'green' });
    }
  };

  const handleCallbackStatus = async (id: string, newStatus: string) => {
    const res = await updateCallbackStatus(id, newStatus);
    if (res.success) {
      setCallbacks(
        callbacks.map((cb) => (cb.id === id ? { ...cb, status: newStatus } : cb))
      );
      notifications.show({ title: 'Success', message: 'Callback status updated', color: 'green' });
    }
  };

  // Testimonial submit
  const handleAddTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      customer_name: data.get('customer_name') as string,
      designation: data.get('designation') as string,
      review: data.get('review') as string,
      rating: Number(data.get('rating')),
      is_featured: data.get('is_featured') === 'on',
    };

    const res = await addTestimonial(item);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Testimonial added', color: 'green' });
      testimonialHandlers.close();
      router.refresh();
      // Reload state manually or let refresh handle it (for mock fallback, refresh re-renders props)
      setTestimonials([{ id: `t-${Date.now()}`, ...item, created_at: new Date().toISOString() }, ...testimonials]);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const res = await deleteTestimonial(id);
    if (res.success) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      notifications.show({ title: 'Success', message: 'Testimonial removed', color: 'green' });
    }
  };

  // Offer submit
  const handleAddOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      title: data.get('title') as string,
      description: data.get('description') as string,
      start_date: data.get('start_date') as string || undefined,
      end_date: data.get('end_date') as string || undefined,
      active: true,
    };

    const res = await addOffer(item);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Offer added successfully', color: 'green' });
      offerHandlers.close();
      setOffers([{ id: `o-${Date.now()}`, ...item, image_url: '' }, ...offers]);
    }
  };

  const handleToggleOffer = async (id: string, active: boolean) => {
    const res = await toggleOfferActive(id, active);
    if (res.success) {
      setOffers(offers.map((o) => (o.id === id ? { ...o, active } : o)));
      notifications.show({ title: 'Success', message: `Offer ${active ? 'activated' : 'deactivated'}`, color: 'green' });
    }
  };

  const handleDeleteOffer = async (id: string) => {
    const res = await deleteOffer(id);
    if (res.success) {
      setOffers(offers.filter((o) => o.id !== id));
      notifications.show({ title: 'Success', message: 'Offer deleted', color: 'green' });
    }
  };

  // Gallery before/after submit with file uploads
  const [uploading, setUploading] = useState(false);
  const handleAddGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData(e.currentTarget);
    const title = data.get('title') as string;
    const category = data.get('category') as string;
    const beforeFile = (e.currentTarget.elements.namedItem('before_file') as HTMLInputElement)?.files?.[0];
    const afterFile = (e.currentTarget.elements.namedItem('after_file') as HTMLInputElement)?.files?.[0];
    
    let beforeUrl = data.get('before_url_fallback') as string;
    let afterUrl = data.get('after_url_fallback') as string;

    // Handle Supabase Storage Upload if files are provided
    if (isSupabaseConfigured() && (beforeFile || afterFile)) {
      try {
        const supabase = createClientComponentClient();
        
        if (beforeFile) {
          const path = `before-${Date.now()}-${beforeFile.name}`;
          const { data: bData, error: bErr } = await supabase.storage.from('before-after-gallery').upload(path, beforeFile);
          if (bErr) throw bErr;
          beforeUrl = supabase.storage.from('before-after-gallery').getPublicUrl(path).data.publicUrl;
        }

        if (afterFile) {
          const path = `after-${Date.now()}-${afterFile.name}`;
          const { data: aData, error: aErr } = await supabase.storage.from('before-after-gallery').upload(path, afterFile);
          if (aErr) throw aErr;
          afterUrl = supabase.storage.from('before-after-gallery').getPublicUrl(path).data.publicUrl;
        }
      } catch (err: any) {
        notifications.show({ title: 'Upload Error', message: err.message || 'File upload failed', color: 'red' });
        setUploading(false);
        return;
      }
    }

    if (!beforeUrl || !afterUrl) {
      notifications.show({ title: 'Input Error', message: 'Please provide both before and after images (upload files or paste URLs)', color: 'red' });
      setUploading(false);
      return;
    }

    const item = {
      title,
      category,
      before_image_url: beforeUrl,
      after_image_url: afterUrl,
      is_featured: data.get('is_featured') === 'on',
    };

    const res = await addGalleryItem(item);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Before/After project added to gallery', color: 'green' });
      galleryHandlers.close();
      setGallery([{ id: `g-${Date.now()}`, ...item, created_at: new Date().toISOString() }, ...gallery]);
    }
    setUploading(false);
  };

  const handleDeleteGallery = async (id: string) => {
    const res = await deleteGalleryItem(id);
    if (res.success) {
      setGallery(gallery.filter((g) => g.id !== id));
      notifications.show({ title: 'Success', message: 'Gallery item removed', color: 'green' });
    }
  };

  return (
    <Container size="lg" py={40}>
      {/* Header bar */}
      <Group justify="space-between" align="center" mb="xl">
        <div>
          <Title order={1}>Admin Dashboard</Title>
          <Text c="dimmed" size="sm">
            Mode: <Badge color={stats.mode === 'production' ? 'green' : 'orange'}>{stats.mode.toUpperCase()}</Badge>
          </Text>
        </div>
        <Button
          onClick={handleLogout}
          color="red"
          variant="outline"
          leftSection={<IconLogout size={16} />}
          loading={loading}
        >
          Logout
        </Button>
      </Group>

      {/* Stats Widgets Grid */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="xl">
        <Card withBorder padding="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" fw={700}>TOTAL LEADS</Text>
            <IconInbox size={22} style={{ color: 'var(--mantine-color-blue-5)' }} />
          </Group>
          <Title order={3} mt="sm">{stats.totalLeads}</Title>
        </Card>
        
        <Card withBorder padding="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" fw={700}>TODAY'S LEADS</Text>
            <IconBolt size={22} style={{ color: 'var(--mantine-color-green-5)' }} />
          </Group>
          <Title order={3} mt="sm">{stats.todayLeads}</Title>
        </Card>

        <Card withBorder padding="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" fw={700}>OPEN INQUIRIES</Text>
            <IconClock size={22} style={{ color: 'var(--mantine-color-orange-5)' }} />
          </Group>
          <Title order={3} mt="sm">{stats.openInquiries}</Title>
        </Card>

        <Card withBorder padding="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" c="dimmed" fw={700}>PENDING AMC REQUESTS</Text>
            <IconProgressCheck size={22} style={{ color: 'var(--mantine-color-teal-5)' }} />
          </Group>
          <Title order={3} mt="sm">{stats.activeAmc}</Title>
        </Card>
      </SimpleGrid>

      {/* Tabs navigation */}
      <Tabs defaultValue="inquiries" radius="md" color="blue">
        <Tabs.List mb="lg">
          <Tabs.Tab value="inquiries" leftSection={<IconInbox size={16} />}>Inquiries ({inquiries.length})</Tabs.Tab>
          <Tabs.Tab value="callbacks" leftSection={<IconClock size={16} />}>Callbacks ({callbacks.length})</Tabs.Tab>
          <Tabs.Tab value="testimonials" leftSection={<IconMessage size={16} />}>Testimonials</Tabs.Tab>
          <Tabs.Tab value="offers" leftSection={<IconGift size={16} />}>Offers</Tabs.Tab>
          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={16} />}>Gallery Showcase</Tabs.Tab>
        </Tabs.List>

        {/* Tab 1: Inquiries List */}
        <Tabs.Panel value="inquiries">
          <Card withBorder radius="md" padding={0} style={{ overflow: 'x-scroll' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Service Type</Table.Th>
                  <Table.Th>Message Details</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {inquiries.map((inq) => (
                  <Table.Tr key={inq.id}>
                    <Table.Td fw={600}>{inq.name}</Table.Td>
                    <Table.Td>{inq.phone}</Table.Td>
                    <Table.Td>
                      <Badge color={inq.service_type.includes('AMC') ? 'teal' : 'blue'}>
                        {inq.service_type}
                      </Badge>
                    </Table.Td>
                    <Table.Td style={{ maxWidth: rem(250) }}>
                      <Text size="xs" lineClamp={2} title={inq.message}>{inq.message || '-'}</Text>
                    </Table.Td>
                    <Table.Td>{new Date(inq.created_at).toLocaleDateString('en-IN')}</Table.Td>
                    <Table.Td>
                      <Badge color={inq.status === 'pending' ? 'orange' : inq.status === 'contacted' ? 'blue' : 'green'}>
                        {inq.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        {inq.status === 'pending' && (
                          <Button size="xs" color="blue" onClick={() => handleInquiryStatus(inq.id, 'contacted')}>
                            Contact
                          </Button>
                        )}
                        {inq.status !== 'resolved' && (
                          <Button size="xs" color="green" onClick={() => handleInquiryStatus(inq.id, 'resolved')}>
                            Resolve
                          </Button>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        {/* Tab 2: Callbacks List */}
        <Tabs.Panel value="callbacks">
          <Card withBorder radius="md" padding={0}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Preferred Slot</Table.Th>
                  <Table.Th>Registered At</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {callbacks.map((cb) => (
                  <Table.Tr key={cb.id}>
                    <Table.Td fw={600}>{cb.name}</Table.Td>
                    <Table.Td>{cb.phone}</Table.Td>
                    <Table.Td>
                      <Badge color="orange">{cb.preferred_time}</Badge>
                    </Table.Td>
                    <Table.Td>{new Date(cb.created_at).toLocaleDateString('en-IN')}</Table.Td>
                    <Table.Td>
                      <Badge color={cb.status === 'pending' ? 'orange' : 'green'}>
                        {cb.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {cb.status === 'pending' && (
                        <Button
                          size="xs"
                          color="green"
                          leftSection={<IconCheck size={12} />}
                          onClick={() => handleCallbackStatus(cb.id, 'completed')}
                        >
                          Mark Done
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        {/* Tab 3: Testimonials Moderation */}
        <Tabs.Panel value="testimonials">
          <Group justify="space-between" mb="md">
            <Text size="sm" c="dimmed">Add new testimonials that show up in the carousel on the home page.</Text>
            <Button size="sm" leftSection={<IconPlus size={16} />} onClick={testimonialHandlers.open}>
              Add Testimonial
            </Button>
          </Group>

          <Card withBorder radius="md" padding={0}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Client Name</Table.Th>
                  <Table.Th>Designation / Place</Table.Th>
                  <Table.Th>Review Description</Table.Th>
                  <Table.Th>Rating</Table.Th>
                  <Table.Th>Featured</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {testimonials.map((t) => (
                  <Table.Tr key={t.id}>
                    <Table.Td fw={600}>{t.customer_name}</Table.Td>
                    <Table.Td>{t.designation || '-'}</Table.Td>
                    <Table.Td style={{ maxWidth: rem(300) }}>
                      <Text size="xs" lineClamp={2}>{t.review}</Text>
                    </Table.Td>
                    <Table.Td fw={700} c="orange">{t.rating} ⭐</Table.Td>
                    <Table.Td>
                      <Badge color={t.is_featured ? 'green' : 'gray'}>
                        {t.is_featured ? 'YES' : 'NO'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteTestimonial(t.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        {/* Tab 4: Offers Manager */}
        <Tabs.Panel value="offers">
          <Group justify="space-between" mb="md">
            <Text size="sm" c="dimmed">Manage active campaigns on the Special Offers Page.</Text>
            <Button size="sm" leftSection={<IconPlus size={16} />} onClick={offerHandlers.open}>
              Create Offer
            </Button>
          </Group>

          <Card withBorder radius="md" padding={0}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Campaign Title</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Active State</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {offers.map((o) => (
                  <Table.Tr key={o.id}>
                    <Table.Td fw={600}>{o.title}</Table.Td>
                    <Table.Td style={{ maxWidth: rem(350) }}>
                      <Text size="xs" lineClamp={2}>{o.description}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Checkbox
                        checked={o.active}
                        onChange={(e) => handleToggleOffer(o.id, e.currentTarget.checked)}
                        label={o.active ? 'Active' : 'Inactive'}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteOffer(o.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        {/* Tab 5: Gallery Manager */}
        <Tabs.Panel value="gallery">
          <Group justify="space-between" mb="md">
            <Text size="sm" c="dimmed">Upload Before & After photos. Images are uploaded to Supabase Storage bucket.</Text>
            <Button size="sm" leftSection={<IconPlus size={16} />} onClick={galleryHandlers.open}>
              Add Comparison Project
            </Button>
          </Group>

          <Card withBorder radius="md" padding={0}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Project Title</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Before Image</Table.Th>
                  <Table.Th>After Image</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {gallery.map((g) => (
                  <Table.Tr key={g.id}>
                    <Table.Td fw={600}>{g.title || 'Untitled'}</Table.Td>
                    <Table.Td>
                      <Badge color="blue">{g.category}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="blue" component="a" href={g.before_image_url} target="_blank" lineClamp={1} style={{ maxWidth: 180 }}>
                        View Before
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="green" component="a" href={g.after_image_url} target="_blank" lineClamp={1} style={{ maxWidth: 180 }}>
                        View After
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteGallery(g.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Testimonial Form Modal */}
      <Modal opened={testimonialOpened} onClose={testimonialHandlers.close} title="Add Testimonial" radius="md">
        <form onSubmit={handleAddTestimonial}>
          <Stack gap="md">
            <TextInput label="Customer Name" name="customer_name" required placeholder="e.g. Ramesh Kumar" />
            <TextInput label="Designation / Place" name="designation" placeholder="e.g. Villa Owner" />
            <Textarea label="Review" name="review" required minRows={3} placeholder="Write the customer quote here..." />
            <NumberInput label="Rating" name="rating" required min={1} max={5} defaultValue={5} />
            <Checkbox label="Feature on Home Page" name="is_featured" defaultChecked />
            <Button type="submit" mt="md" fullWidth color="blue">
              Publish Testimonial
            </Button>
          </Stack>
        </form>
      </Modal>

      {/* Offer Form Modal */}
      <Modal opened={offerOpened} onClose={offerHandlers.close} title="Create Special Offer Campaign" radius="md">
        <form onSubmit={handleAddOffer}>
          <Stack gap="md">
            <TextInput label="Campaign Title" name="title" required placeholder="e.g. 15% Off Monsoon Cleaning" />
            <Textarea label="Description" name="description" required minRows={3} placeholder="Provide details about the promotional deal..." />
            <TextInput label="Start Date" name="start_date" type="date" />
            <TextInput label="End Date" name="end_date" type="date" />
            <Button type="submit" mt="md" fullWidth color="blue">
              Launch Campaign
            </Button>
          </Stack>
        </form>
      </Modal>

      {/* Gallery Form Modal */}
      <Modal opened={galleryOpened} onClose={galleryHandlers.close} title="Add Before/After Project" radius="md">
        <form onSubmit={handleAddGallery}>
          <Stack gap="md">
            <TextInput label="Project Title" name="title" required placeholder="e.g. Kitchen descaling" />
            
            <Select
              label="Service Category"
              name="category"
              required
              data={[
                { value: 'deep-cleaning', label: 'Deep Cleaning' },
                { value: 'ac-maintenance', label: 'AC Maintenance' },
                { value: 'plumbing', label: 'Plumbing Service' },
                { value: 'electrical', label: 'Electrical Maintenance' },
              ]}
              defaultValue="deep-cleaning"
            />

            {/* If Supabase is configured: show file uploads */}
            {stats.mode === 'production' ? (
              <Stack gap="xs">
                <Text size="xs" fw={700}>Upload Before Image File</Text>
                <input type="file" name="before_file" accept="image/*" required />

                <Text size="xs" fw={700} mt="xs">Upload After Image File</Text>
                <input type="file" name="after_file" accept="image/*" required />
              </Stack>
            ) : (
              <Alert color="orange" title="Demo Mode File Upload">
                File upload requires Supabase config. Please paste public image URLs instead (Unsplash links provided as fallback).
              </Alert>
            )}

            <TextInput
              label="Before Image URL (Fallback)"
              name="before_url_fallback"
              placeholder="https://images.unsplash.com/photo-..."
              defaultValue="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
            />
            <TextInput
              label="After Image URL (Fallback)"
              name="after_url_fallback"
              placeholder="https://images.unsplash.com/photo-..."
              defaultValue="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80"
            />

            <Checkbox label="Mark as Featured" name="is_featured" />

            <Button type="submit" mt="md" fullWidth color="blue" loading={uploading}>
              Save Comparison
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
}
