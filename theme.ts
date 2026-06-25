import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brandBlue',
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
    // Steel blue — primary accent #6D94C5 is index 5
    brandBlue: [
      '#eef3f9', // 0 — lightest
      '#CBDCEB', // 1 — sky blue (user palette)
      '#adc8e3', // 2
      '#8db4d9', // 3
      '#7da4ce', // 4
      '#6D94C5', // 5 — primary (user palette)
      '#5a80b0', // 6 — hover
      '#4a6e9a', // 7
      '#3a5a84', // 8
      '#2B3A55', // 9 — dark navy (user-derived)
    ],
    primaryBlue: [
      '#eef3f9', // 0 — lightest
      '#CBDCEB', // 1 — sky blue (user palette)
      '#adc8e3', // 2
      '#8db4d9', // 3
      '#7da4ce', // 4
      '#6D94C5', // 5 — primary (user palette)
      '#5a80b0', // 6 — hover
      '#4a6e9a', // 7
      '#3a5a84', // 8
      '#2B3A55', // 9 — dark navy (user-derived)
    ],
    // Warm cream palette — body/backgrounds
    brandCream: [
      '#ffffff', // 0
      '#F5EFE6', // 1 — main background (user palette)
      '#EDE4D5', // 2
      '#E8DFCA', // 3 — sand (user palette)
      '#ddd2b5', // 4
      '#cfc2a0', // 5
      '#b8a880', // 6
      '#9e8e65', // 7
      '#7a6e4e', // 8
      '#504738', // 9
    ],
    // Dark navy — replaces old brandDark charcoal
    brandDark: [
      '#f0f3f8', // 0
      '#dde4ef', // 1
      '#b8c6de', // 2
      '#8fa8cc', // 3
      '#6d8fbd', // 4
      '#5077ab', // 5
      '#3D4F6A', // 6 — secondary navy
      '#2B3A55', // 7 — primary dark (user-derived)
      '#1e2b40', // 8
      '#111825', // 9
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
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
