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

  const proxyOptions = (pathFilter: string, target: string): Options => ({
    pathFilter,
    target,
    changeOrigin: true,
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
    createProxyMiddleware(proxyOptions('/api/auth', 'http://127.0.0.1:8001')),
  );
  app.use(
    createProxyMiddleware(proxyOptions('/api/users', 'http://127.0.0.1:8002')),
  );
  app.use(
    createProxyMiddleware(
      proxyOptions('/api/destinations', 'http://127.0.0.1:8003'),
    ),
  );
  app.use(
    createProxyMiddleware(
      proxyOptions('/api/mitra-services', 'http://127.0.0.1:8003'),
    ),
  );

  await app.listen(8000);
  console.log('🚀 API Gateway is running on http://localhost:8000');
}

bootstrap().catch((err: Error) => {
  console.error('Terjadi kesalahan saat memulai Gateway:', err);
  process.exit(1);
});
