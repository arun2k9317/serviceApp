import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brandYellow',
  fontFamily: 'var(--font-pt-sans), sans-serif',
  headings: {
    fontFamily: 'var(--font-open-sans), sans-serif',
    sizes: {
      h1: { fontSize: '2.25rem', fontWeight: '700' },
      h2: { fontSize: '1.75rem', fontWeight: '700' },
      h3: { fontSize: '1.375rem', fontWeight: '600' },
      h4: { fontSize: '1.15rem', fontWeight: '600' },
    },
  },
  colors: {
    brandYellow: [
      '#fffde6',
      '#fff9cc',
      '#fff299',
      '#ffeb66',
      '#ffe033',
      '#ffc104', // index 5
      '#e6ad00',
      '#cc9900',
      '#997300',
      '#664d00',
    ],
    brandDark: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#495057',
      '#343a40',
      '#2a2f35', // index 8
      '#212529',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl', // Bricks uses rounded pills or square. In index.html btn: border-radius: 25px (pills)
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});
