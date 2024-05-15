FROM node:lts-alpine
WORKDIR /app
ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_PUBLIC_HOSTNAME=http://localhost:3000 \
    NEXT_PUBLIC_ENVIRONMENT=prod-gcp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs node_modules ./node_modules
COPY --chown=nextjs:nodejs next.config.mjs ./
COPY --chown=nextjs:nodejs public ./public/
COPY --chown=nextjs:nodejs .next ./.next

USER nextjs
EXPOSE 3000

CMD ["./node_modules/next/dist/bin/next", "start"]