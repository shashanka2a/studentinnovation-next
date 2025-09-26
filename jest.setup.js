import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  signInWithGoogle: jest.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
  signInWithApple: jest.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
  handleOAuthCallback: jest.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } }, error: null })),
  createOrUpdateUserProfile: jest.fn(() => Promise.resolve({ data: {}, error: null })),
  signOut: jest.fn(() => Promise.resolve({ error: null })),
}))

// Mock Framer Motion
jest.mock('motion/react', () => ({
  motion: {
    div: 'div',
    button: 'button',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    section: 'section',
    article: 'article',
    header: 'header',
    footer: 'footer',
    nav: 'nav',
    main: 'main',
    aside: 'aside',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    option: 'option',
    label: 'label',
    img: 'img',
    a: 'a',
    ul: 'ul',
    ol: 'ol',
    li: 'li',
    table: 'table',
    thead: 'thead',
    tbody: 'tbody',
    tr: 'tr',
    th: 'th',
    td: 'td',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  },
  writable: true,
})

// Mock setTimeout and clearTimeout
global.setTimeout = jest.fn((fn) => fn())
global.clearTimeout = jest.fn()
