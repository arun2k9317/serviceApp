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
  useMantineColorScheme,
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
  IconBuildingStore,
  IconUsersGroup,
  IconTool,
  IconUser,
  IconSun,
  IconMoon,
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
  createWebProperty,
  createWebStaff,
  webAssignTechnician,
  webUpdateTicketStatus,
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
  properties: any[];
  technicians: any[];
  requests: any[];
  services: any[];
  workLogs: any[];
}

export default function DashboardClient({
  stats,
  inquiries: initialInquiries,
  callbacks: initialCallbacks,
  testimonials: initialTestimonials,
  offers: initialOffers,
  gallery: initialGallery,
  properties: initialProperties,
  technicians: initialTechnicians,
  requests: initialRequests,
  services: initialServices,
  workLogs: initialWorkLogs,
}: DashboardClientProps) {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [callbacks, setCallbacks] = useState(initialCallbacks);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [offers, setOffers] = useState(initialOffers);
  const [gallery, setGallery] = useState(initialGallery);
  const [properties, setProperties] = useState(initialProperties);
  const [technicians, setTechnicians] = useState(initialTechnicians);
  const [requests, setRequests] = useState(initialRequests);
  const [services, setServices] = useState(initialServices);
  const [workLogs, setWorkLogs] = useState(initialWorkLogs);

  const [loading, setLoading] = useState(false);

  // Modals disclosure states
  const [testimonialOpened, testimonialHandlers] = useDisclosure(false);
  const [offerOpened, offerHandlers] = useDisclosure(false);
  const [galleryOpened, galleryHandlers] = useDisclosure(false);
  const [propertyOpened, propertyHandlers] = useDisclosure(false);
  const [staffOpened, staffHandlers] = useDisclosure(false);
  const [assignOpened, assignHandlers] = useDisclosure(false);
  const [completedOpened, completedHandlers] = useDisclosure(false);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedWorkLog, setSelectedWorkLog] = useState<any | null>(null);

  // Logout trigger
  const handleLogout = async () => {
    setLoading(true);
    await adminLogout();
    router.push('/admin/login');
    router.refresh();
  };

  // Property submit
  const handleAddProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const property_type = data.get('property_type') as string;
    const address = data.get('address') as string;
    const city = data.get('city') as string;
    const total_units = Number(data.get('total_units'));
    const amcPlan = data.get('amc_plan') as string;

    const res = await createWebProperty({
      name,
      property_type,
      amc_plan: amcPlan,
      address,
      city,
      total_units,
      amc_contract: {
        plumbingChecksPerFlat: Number(data.get('plumbingChecksPerFlat')) || 0,
        electricalChecksPerFlat: Number(data.get('electricalChecksPerFlat')) || 0,
        hvacChecksPerFlat: Number(data.get('hvacChecksPerFlat')) || 0,
        deepCleaningsPerFlat: Number(data.get('deepCleaningsPerFlat')) || 0,
        pestControlsPerFlat: Number(data.get('pestControlsPerFlat')) || 0,
        emergencyCallsPerFlat: Number(data.get('emergencyCallsPerFlat')) || 0,
        commonDeepCleanings: Number(data.get('commonDeepCleanings')) || 0,
        commonPestControls: Number(data.get('commonPestControls')) || 0,
      }
    });

    setLoading(false);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Property created successfully', color: 'green' });
      propertyHandlers.close();
      setProperties([...properties, res.data]);
      router.refresh();
    } else {
      notifications.show({ title: 'Error', message: res.error || 'Failed to create property', color: 'red' });
    }
  };

  // Staff submit
  const handleAddStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const role = data.get('role') as 'technician' | 'caretaker';
    const skillsString = data.get('skills') as string;
    const skills = skillsString ? skillsString.split(',').map(s => s.trim()) : [];
    const password = data.get('password') as string;
    const property_id = data.get('property_id') as string || null;

    const res = await createWebStaff({
      name,
      email,
      phone,
      role,
      skills,
      password,
      property_id,
    });

    setLoading(false);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Staff member added successfully', color: 'green' });
      staffHandlers.close();
      setTechnicians([...technicians, res.data]);
      router.refresh();
    } else {
      notifications.show({ title: 'Error', message: res.error || 'Failed to add staff', color: 'red' });
    }
  };

  // Assign Technician submit
  const handleAssignTechSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTicketId) return;
    const data = new FormData(e.currentTarget);
    const technicianId = data.get('technician_id') as string;
    const techName = technicians.find(t => t.id === technicianId)?.name || 'this technician';
    if (!window.confirm(`Are you sure you want to assign ${techName} to this request?`)) return;

    setLoading(true);
    const res = await webAssignTechnician(selectedTicketId, technicianId);
    setLoading(false);
    if (res.success) {
      notifications.show({ title: 'Success', message: 'Technician assigned successfully', color: 'green' });
      assignHandlers.close();
      setRequests(requests.map(r => r.id === selectedTicketId ? { ...r, assigned_technician_id: technicianId, status: 'assigned' } : r));
      router.refresh();
    } else {
      notifications.show({ title: 'Error', message: res.error || 'Failed to assign technician', color: 'red' });
    }
  };

  // Ticket Status update
  const handleUpdateTicketStatus = async (ticketId: string, status: string) => {
    if (status === 'completed') {
      if (!window.confirm("Are you sure you want to mark this request as completed?")) return;
    }
    setLoading(true);
    const res = await webUpdateTicketStatus(ticketId, status);
    setLoading(false);
    if (res.success) {
      notifications.show({ title: 'Success', message: `Ticket status updated to ${status}`, color: 'green' });
      setRequests(requests.map(r => r.id === ticketId ? { ...r, status } : r));
      router.refresh();
    } else {
      notifications.show({ title: 'Error', message: res.error || 'Failed to update status', color: 'red' });
    }
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
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
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
    if (!window.confirm("Are you sure you want to delete this special offer campaign?")) return;
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
    if (!window.confirm("Are you sure you want to delete this gallery project item?")) return;
    const res = await deleteGalleryItem(id);
    if (res.success) {
      setGallery(gallery.filter((g) => g.id !== id));
      notifications.show({ title: 'Success', message: 'Gallery item removed', color: 'green' });
    }
  };

  return (
    <>
      {/* Fixed Header bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: rem(70),
          zIndex: 1000,
          backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#ffffff',
          borderBottom: `1px solid ${colorScheme === 'dark' ? '#25262B' : '#eaeaea'}`,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container size="xl" style={{ width: '100%' }}>
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap="md">
              <img
                src="/maintex_logo.jpeg"
                alt="Maintex Logo"
                style={{
                  height: 45,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Badge color={stats.mode === 'production' ? 'green' : 'orange'}>
                ADMIN CONSOLE ({stats.mode.toUpperCase()})
              </Badge>
            </Group>
            
            <Group gap="sm" wrap="nowrap">
              {/* Color Scheme Toggle */}
              <ActionIcon
                onClick={toggleColorScheme}
                variant="subtle"
                size="lg"
                aria-label="Toggle theme color"
                radius="md"
                styles={{ root: { color: colorScheme === 'dark' ? '#ffffff' : '#2B3A55' } }}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={20} stroke={1.5} style={{ color: '#ffc107' }} />
                ) : (
                  <IconMoon size={20} stroke={1.5} style={{ color: '#2B3A55' }} />
                )}
              </ActionIcon>

              <Button
                component="a"
                href="/"
                variant="subtle"
                color="gray"
              >
                Back to Website
              </Button>
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
          </Group>
        </Container>
      </div>

      <Container size="xl" py={30} style={{ marginTop: rem(75) }}>

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
          <Tabs.Tab value="requests" leftSection={<IconTool size={16} />}>Service Requests ({requests.length})</Tabs.Tab>
          <Tabs.Tab value="properties" leftSection={<IconBuildingStore size={16} />}>Properties ({properties.length})</Tabs.Tab>
          <Tabs.Tab value="staff" leftSection={<IconUsersGroup size={16} />}>Staff Directory ({technicians.length})</Tabs.Tab>
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
                      <Badge variant="light" color={inq.service_type.includes('AMC') ? 'teal' : 'indigo'}>
                        {inq.service_type}
                      </Badge>
                    </Table.Td>
                    <Table.Td style={{ maxWidth: rem(250) }}>
                      <Text size="xs" lineClamp={2} title={inq.message}>{inq.message || '-'}</Text>
                    </Table.Td>
                    <Table.Td>{new Date(inq.created_at).toLocaleDateString('en-IN')}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={inq.status === 'pending' ? 'orange' : inq.status === 'contacted' ? 'indigo' : 'green'}>
                        {inq.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        {inq.status === 'pending' && (
                          <Button size="xs" color="indigo" variant="light" onClick={() => handleInquiryStatus(inq.id, 'contacted')}>
                            Contact
                          </Button>
                        )}
                        {inq.status !== 'resolved' && (
                          <Button size="xs" color="green" variant="light" onClick={() => handleInquiryStatus(inq.id, 'resolved')}>
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
                      <Badge variant="light" color="orange">{cb.preferred_time}</Badge>
                    </Table.Td>
                    <Table.Td>{new Date(cb.created_at).toLocaleDateString('en-IN')}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={cb.status === 'pending' ? 'orange' : 'green'}>
                        {cb.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {cb.status === 'pending' && (
                        <Button
                          size="xs"
                          color="green"
                          variant="light"
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

      {/* Tab 6: Service Requests Panel */}
      <Tabs.Panel value="requests">
        <Card withBorder radius="md" padding={0} style={{ overflowX: 'auto' }} mt="md">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Ticket #</Table.Th>
                <Table.Th>Service Category</Table.Th>
                <Table.Th>Location / Unit</Table.Th>
                <Table.Th>Priority</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Assigned Technician</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {requests.map((req) => {
                const techUser = technicians.find(t => t.id === req.assigned_technician_id);
                const prop = properties.find(p => p.id === req.property_id);
                const serv = services.find(s => s.id === req.service_id);
                return (
                  <Table.Tr key={req.id}>
                    <Table.Td fw={600}>{req.ticket_no}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color="blue">
                        {serv?.name || req.service_id}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {prop?.name || 'Public'}{' '}
                      {req.unit_number ? `· Unit ${req.unit_number}` : ''}
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={req.priority === 'high' ? 'red' : req.priority === 'medium' ? 'orange' : 'gray'}>
                        {req.priority.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={req.status === 'pending' ? 'orange' : req.status === 'assigned' ? 'indigo' : req.status === 'in_progress' ? 'cyan' : req.status === 'completed' ? 'green' : 'red'}>
                        {req.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{techUser ? techUser.name : 'Unassigned'}</Table.Td>
                    <Table.Td>
                      <Group gap={6}>
                        {req.status === 'pending' && (
                          <Button
                            size="xs"
                            color="indigo"
                            variant="light"
                            onClick={() => {
                              setSelectedTicketId(req.id);
                              assignHandlers.open();
                            }}
                          >
                            Assign Tech
                          </Button>
                        )}
                        {req.status !== 'completed' && req.status !== 'cancelled' && (
                          <Button 
                            size="xs" 
                            color="green" 
                            variant="light"
                            onClick={() => handleUpdateTicketStatus(req.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                        {req.status === 'completed' && (
                          <Button
                            size="xs"
                            color="teal"
                            variant="subtle"
                            onClick={() => {
                              const wl = workLogs.find(w => w.request_id === req.id);
                              setSelectedRequest(req);
                              setSelectedWorkLog(wl || null);
                              completedHandlers.open();
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Card>
      </Tabs.Panel>

      {/* Tab 7: Properties Panel */}
      <Tabs.Panel value="properties">
        <Stack gap="md" mt="md">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Manage property locations and AMC quotas</Text>
            <Button size="sm" leftSection={<IconPlus size={16} />} onClick={propertyHandlers.open}>
              Add Property
            </Button>
          </Group>
          <Card withBorder radius="md" padding={0} style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Property Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>City</Table.Th>
                  <Table.Th>Total Units</Table.Th>
                  <Table.Th>AMC Plan</Table.Th>
                  <Table.Th>Address</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {properties.map((p) => (
                  <Table.Tr key={p.id}>
                    <Table.Td fw={600}>{p.name}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color="indigo">{p.property_type}</Badge>
                    </Table.Td>
                    <Table.Td>{p.city}</Table.Td>
                    <Table.Td>{p.total_units}</Table.Td>
                    <Table.Td>
                      <Badge color="orange">{p.amc_plan.toUpperCase()}</Badge>
                    </Table.Td>
                    <Table.Td>{p.address || '-'}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Stack>
      </Tabs.Panel>

      {/* Tab 8: Staff Panel */}
      <Tabs.Panel value="staff">
        <Stack gap="md" mt="md">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">View all registered technicians and caretakers</Text>
            <Button size="sm" leftSection={<IconPlus size={16} />} onClick={staffHandlers.open}>
              Add Staff Member
            </Button>
          </Group>
          <Card withBorder radius="md" padding={0} style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Skills</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {technicians.map((t) => (
                  <Table.Tr key={t.id}>
                    <Table.Td fw={600}>{t.name}</Table.Td>
                    <Table.Td>
                      <Badge color={t.role === 'technician' ? 'blue' : 'teal'}>
                        {t.role.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{t.email}</Table.Td>
                    <Table.Td>{t.phone}</Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {(t.skills || []).map((s: string) => (
                          <Badge key={s} size="xs" variant="outline" color="gray">{s}</Badge>
                        ))}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Stack>
      </Tabs.Panel>
    </Tabs>

    {/* Modal: Add Property */}
    <Modal opened={propertyOpened} onClose={propertyHandlers.close} title="Add New Property" centered>
      <form onSubmit={handleAddProperty}>
        <Stack gap="sm">
          <TextInput label="Property Name" name="name" required placeholder="e.g. Green Meadows" />
          <Select
            label="Property Type"
            name="property_type"
            required
            data={[
              { value: 'residential', label: 'Residential (Community)' },
              { value: 'commercial', label: 'Commercial (Office Building)' },
              { value: 'retail', label: 'Retail (Mall)' },
              { value: 'educational', label: 'Educational (School/Uni)' },
              { value: 'hospitality', label: 'Hospitality (Hotel)' },
            ]}
            defaultValue="residential"
          />
          <TextInput label="City" name="city" required placeholder="e.g. Pune" />
          <NumberInput label="Total Units" name="total_units" required defaultValue={10} min={1} />
          <TextInput label="Address" name="address" required placeholder="Detailed address" />
          
          <Text fw={600} size="sm" mt="xs">Annual Maintenance Quotas (Per Unit)</Text>
          <SimpleGrid cols={2} spacing="xs">
            <NumberInput label="Plumbing Checks" name="plumbingChecksPerFlat" min={0} defaultValue={2} />
            <NumberInput label="Electrical Checks" name="electricalChecksPerFlat" min={0} defaultValue={2} />
            <NumberInput label="HVAC/AC Checks" name="hvacChecksPerFlat" min={0} defaultValue={2} />
            <NumberInput label="Deep Cleanings" name="deepCleaningsPerFlat" min={0} defaultValue={1} />
            <NumberInput label="Pest Controls" name="pestControlsPerFlat" min={0} defaultValue={2} />
            <NumberInput label="Emergency Calls" name="emergencyCallsPerFlat" min={0} defaultValue={3} />
          </SimpleGrid>
          
          <Text fw={600} size="sm" mt="xs">Common Area Quotas</Text>
          <SimpleGrid cols={2} spacing="xs">
            <NumberInput label="Common Deep Clean" name="commonDeepCleanings" min={0} defaultValue={4} />
            <NumberInput label="Common Pest Control" name="commonPestControls" min={0} defaultValue={4} />
          </SimpleGrid>

          <Button type="submit" color="blue" mt="md" fullWidth loading={loading}>
            Create Property
          </Button>
        </Stack>
      </form>
    </Modal>

    {/* Modal: Add Staff Member */}
    <Modal opened={staffOpened} onClose={staffHandlers.close} title="Add Staff Member" centered>
      <form onSubmit={handleAddStaff}>
        <Stack gap="sm">
          <TextInput label="Name" name="name" required placeholder="Full Name" />
          <TextInput label="Email Address" name="email" required placeholder="email@maintex.com" />
          <TextInput label="Phone Number" name="phone" required placeholder="10-digit number" />
          <Select
            label="Staff Role"
            name="role"
            required
            data={[
              { value: 'technician', label: 'Technician' },
              { value: 'caretaker', label: 'Caretaker' },
            ]}
            defaultValue="technician"
          />
          <TextInput label="Skills (Comma separated list)" name="skills" placeholder="Plumbing, Electrical, AC" />
          <TextInput label="Login Password" name="password" required defaultValue="maintex123" placeholder="Enter password" />
          
          <Select
            label="Assigned Property (Caretaker only)"
            name="property_id"
            placeholder="Unassigned"
            data={properties.map(p => ({ value: p.id, label: p.name }))}
          />

          <Button type="submit" color="blue" mt="md" fullWidth loading={loading}>
            Add Staff Member
          </Button>
        </Stack>
      </form>
    </Modal>

    {/* Modal: Assign Technician */}
    <Modal opened={assignOpened} onClose={assignHandlers.close} title="Assign Technician" centered>
      <form onSubmit={handleAssignTechSubmit}>
        <Stack gap="sm">
          <Select
            label="Select Available Technician"
            name="technician_id"
            required
            data={technicians
              .filter(t => t.role === 'technician')
              .map(tech => ({ value: tech.id, label: `${tech.name} (${tech.skills.join(', ') || 'General'})` }))
            }
            placeholder="Pick a technician"
          />
          <Button type="submit" color="blue" mt="md" fullWidth loading={loading}>
            Confirm Assignment
          </Button>
        </Stack>
      </form>
    </Modal>
    {/* Modal: View Completed Service Details */}
    <Modal opened={completedOpened} onClose={completedHandlers.close} title="Completed Request Details" size="lg" centered>
      {selectedRequest && (
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={700} size="lg">Ticket: {selectedRequest.ticket_no}</Text>
            <Badge color="green">COMPLETED</Badge>
          </Group>

          <Card withBorder padding="sm" radius="md">
            <Text fw={600} size="sm" mb="xs">Request Overview</Text>
            <SimpleGrid cols={2} spacing="sm">
              <Text size="xs"><strong>Service:</strong> {services.find(s => s.id === selectedRequest.service_id)?.name || selectedRequest.service_id}</Text>
              <Text size="xs"><strong>Priority:</strong> {selectedRequest.priority.toUpperCase()}</Text>
              <Text size="xs"><strong>Property:</strong> {properties.find(p => p.id === selectedRequest.property_id)?.name || 'Public'}</Text>
              <Text size="xs"><strong>Unit/Location:</strong> {selectedRequest.unit_number || selectedRequest.address || 'N/A'}</Text>
              <Text size="xs"><strong>Created At:</strong> {new Date(selectedRequest.created_at).toLocaleString('en-IN')}</Text>
              <Text size="xs"><strong>Completed At:</strong> {selectedRequest.updated_at ? new Date(selectedRequest.updated_at).toLocaleString('en-IN') : 'N/A'}</Text>
            </SimpleGrid>
            <Text size="xs" mt="sm"><strong>Description:</strong> {selectedRequest.description}</Text>
          </Card>

          {/* Technician Info */}
          {(() => {
            const tech = technicians.find(t => t.id === selectedRequest.assigned_technician_id);
            return tech ? (
              <Card withBorder padding="sm" radius="md">
                <Text fw={600} size="sm" mb="xs">Technician Information</Text>
                <SimpleGrid cols={2} spacing="xs">
                  <Text size="xs"><strong>Name:</strong> {tech.name}</Text>
                  <Text size="xs"><strong>Email:</strong> {tech.email}</Text>
                  <Text size="xs"><strong>Phone:</strong> {tech.phone}</Text>
                  <Text size="xs"><strong>Skills:</strong> {(tech.skills || []).join(', ')}</Text>
                </SimpleGrid>
              </Card>
            ) : null;
          })()}

          {/* Completion Log Details */}
          {selectedWorkLog ? (
            <Stack gap="sm">
              <Card withBorder padding="sm" radius="md">
                <Text fw={600} size="sm" mb="xs">Completion Summary</Text>
                <Text size="xs" style={{ whiteSpace: 'pre-line' }}><strong>Technician Notes/Comments:</strong> {selectedWorkLog.remarks || 'No comments provided.'}</Text>
              </Card>

              {/* Photos */}
              <SimpleGrid cols={2} spacing="sm">
                {selectedWorkLog.photo_uris && selectedWorkLog.photo_uris.length > 0 ? (
                  <Card withBorder padding="xs" radius="md">
                    <Text fw={600} size="xs" mb="xs">Work Completion Photo</Text>
                    <img
                      src={selectedWorkLog.photo_uris[0]}
                      alt="Completion Image"
                      style={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                  </Card>
                ) : (
                  <Card withBorder padding="xs" radius="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 210 }}>
                    <Text size="xs" c="dimmed">No completion photo uploaded</Text>
                  </Card>
                )}

                {selectedWorkLog.signature_uri ? (
                  <Card withBorder padding="xs" radius="md">
                    <Text fw={600} size="xs" mb="xs">Resident Signature</Text>
                    <div style={{ backgroundColor: '#ffffff', border: '1px solid #eee', borderRadius: 8, padding: 4 }}>
                      <img
                        src={selectedWorkLog.signature_uri}
                        alt="Resident Signature"
                        style={{
                          width: '100%',
                          height: 170,
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  </Card>
                ) : (
                  <Card withBorder padding="xs" radius="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 210 }}>
                    <Text size="xs" c="dimmed">No resident signature collected</Text>
                  </Card>
                )}
              </SimpleGrid>
            </Stack>
          ) : (
            <Alert color="orange" title="Log Details Missing">
              Completion details log could not be loaded for this ticket.
            </Alert>
          )}

          <Button color="blue" onClick={completedHandlers.close} fullWidth mt="sm">
            Close Details
          </Button>
        </Stack>
      )}
    </Modal>
  </Container>
    </>
  );
}
