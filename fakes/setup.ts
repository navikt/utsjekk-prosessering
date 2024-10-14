import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from './msw/server'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
    cleanup()
})

afterAll(() => {
    server.close()
})

vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation')
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            push: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
            get: vi.fn(),
        })),
        usePathname: vi.fn(),
    }
})
