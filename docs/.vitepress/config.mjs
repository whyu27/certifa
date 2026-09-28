import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Certifa Docs',
  description: 'Official Documentation for Certifa - Blockchain-Based Certificate Verification Platform',
  lang: 'id-ID',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  themeConfig: {
    siteTitle: 'Certifa Docs',
    nav: [
      { text: 'Introduction', link: '/introduction/overview' },
      { text: 'User Guides', link: '/guides/issuing' },
      { text: 'Smart Contract', link: '/blockchain/contract-overview' },
      { text: 'Backend API', link: '/api/overview' },
      { text: 'Developer Guide', link: '/development/getting-started' },
    ],
    sidebar: {
      '/introduction/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/introduction/overview' },
            { text: 'Architecture & Workflow', link: '/introduction/architecture' },
            { text: 'Core Principles', link: '/introduction/core-principles' },
          ]
        }
      ],
      '/guides/': [
        {
          text: 'User Guides',
          items: [
            { text: 'How to Issue a Certificate', link: '/guides/issuing' },
            { text: 'How to Verify a Certificate', link: '/guides/verification' },
            { text: 'File Integrity Verification', link: '/guides/integrity-check' },
          ]
        }
      ],
      '/blockchain/': [
        {
          text: 'Smart Contract (Sepolia)',
          items: [
            { text: 'Contract Overview', link: '/blockchain/contract-overview' },
            { text: 'Contract Functions & Structs', link: '/blockchain/functions' },
            { text: 'Issuer Authorization & Roles', link: '/blockchain/issuer-management' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'Backend API Reference',
          items: [
            { text: 'API Overview & Security', link: '/api/overview' },
            { text: 'Endpoints Reference', link: '/api/endpoints' },
          ]
        }
      ],
      '/development/': [
        {
          text: 'Developer & Deployment',
          items: [
            { text: 'Getting Started Locally', link: '/development/getting-started' },
            { text: 'Environment Variables', link: '/development/environment' },
            { text: 'Deployment Guide', link: '/development/deployment' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/whyu27' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Certifa Platform.'
    },
    search: {
      provider: 'local'
    }
  }
});
