import { faker } from '@faker-js/faker'

export function GET() {
    return new Response(faker.hacker.phrase(), { status: 200 })
}
