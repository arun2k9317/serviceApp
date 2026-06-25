const mantine = require('@mantine/core');
const notifications = require('@mantine/notifications');
const tabler = require('@tabler/icons-react');

console.log('Mantine core keys:', Object.keys(mantine).slice(0, 10));
console.log('Mantine Grid:', !!mantine.Grid);
console.log('Mantine Grid.Col:', !!(mantine.Grid && mantine.Grid.Col));
console.log('Mantine notifications:', !!notifications.notifications);
console.log('IconUser:', !!tabler.IconUser);
console.log('IconPhone:', !!tabler.IconPhone);
console.log('IconMail:', !!tabler.IconMail);
console.log('IconHome:', !!tabler.IconHome);
console.log('IconChevronRight:', !!tabler.IconChevronRight);
