import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  /**
   * Routing to Auth Service
   * Port: 8001
   */
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8001',
      changeOrigin: true,
      pathRewrite: {
        '^/api/auth': '/auth',
      },
    }),
  );

  /**
   * Routing to Users Service
   * Port: 8002
   */
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8001',
      changeOrigin: true,
      pathRewrite: {
        '^/api/users': '/users',
      },
    }),
  );

  /**
   * Routing to Destinations Service
   * Port: 8003
   */
  app.use(
    '/api/destinations',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8003',
      changeOrigin: true,
      pathRewrite: { '^/api/destinations': '/destinations' },
    }),
  );

  /**
   * Routing to Mitra Services Service
   * Port: 8003
   */
  app.use(
    '/api/mitra-services',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8003',
      changeOrigin: true,
      pathRewrite: { '^/api/mitra-services': '/mitra-services' },
    }),
  );

  await app.listen(8000);
  console.log('🚀 API Gateway is running on http://localhost:8000');
}
bootstrap();
