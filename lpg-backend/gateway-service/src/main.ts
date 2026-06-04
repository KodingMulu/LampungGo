import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const proxyOptions = (
    target: string,
    pathRewrite: Record<string, string>,
  ): Options => ({
    target,
    changeOrigin: true,
    pathRewrite,
    on: {
      proxyRes: (proxyRes: IncomingMessage) => {
        if (proxyRes.headers) {
          proxyRes.headers['x-gateway-processed'] = 'true';
        }
      },
      error: (err: Error, _req: IncomingMessage, res: ServerResponse) => {
        console.error(
          `[Gateway Error] Gagal menghubungi ${target}:`,
          err.message,
        );

        if (!res.headersSent) {
          res.writeHead(502, {
            'Content-Type': 'application/json',
          });
          res.end(
            JSON.stringify({
              statusCode: 502,
              message: 'Service sedang tidak tersedia',
              error: err.message,
            }),
          );
        }
      },
    },
  });

  app.use(
    '/api/auth',
    createProxyMiddleware(
      proxyOptions('http://127.0.0.1:8001', { '^/api/auth': '/auth' }),
    ),
  );

  app.use(
    '/api/users',
    createProxyMiddleware(
      proxyOptions('http://127.0.0.1:8002', { '^/api/users': '/users' }),
    ),
  );

  app.use(
    '/api/destinations',
    createProxyMiddleware(
      proxyOptions('http://127.0.0.1:8003', {
        '^/api/destinations': '/destinations',
      }),
    ),
  );

  app.use(
    '/api/mitra-services',
    createProxyMiddleware(
      proxyOptions('http://127.0.0.1:8003', {
        '^/api/mitra-services': '/mitra-services',
      }),
    ),
  );

  await app.listen(8000);
  console.log('🚀 API Gateway is running on http://localhost:8000');
}

bootstrap().catch((err: Error) => {
  console.error('Terjadi kesalahan saat memulai Gateway:', err);
  process.exit(1);
});
