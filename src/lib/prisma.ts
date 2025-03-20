import { PrismaClient } from '@prisma/client';

// PrismaClient được khai báo như global để tránh khởi tạo quá nhiều connection
// trong quá trình development với hot-reload
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Tạo một singleton instance của PrismaClient
export const prisma = global.prisma || new PrismaClient();

// Trong môi trường development, lưu prisma vào global object để giữ connection qua hot-reload
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
