# Arcane Nexus - Mystical E-Commerce Platform
https://magicshop-omega.vercel.app/shop
![Arcane Nexus](public/magic-emblem.svg)

An immersive e-commerce experience for magical artifacts, grimoires, and potions. Built with Next.js, Prisma, and PostgreSQL.

## ✨ Features

- 🧙‍♂️ User authentication and authorization
- 🔮 Product browsing and filtering by category
- 🧪 Shopping cart functionality with persistent storage
- 📜 Order processing and management
- ⚡ Admin dashboard for managing products and orders
- 🌙 Responsive, mystical dark theme UI

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or use Neon DB as provided)
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"

# Authentication
JWT_SECRET="your_jwt_secret_here"

# Optional - Only needed for production
NEXT_PUBLIC_API_URL="https://your-production-domain.com"
```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/tahiru0/magicshop.git
   cd magicshop
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Initialize database (creates tables)
   npx prisma migrate dev --name init
   
   # Seed the database with initial data
   npx prisma db seed
   ```

   Alternatively, use the included batch script:
   ```bash
   # On Windows
   setup-db.bat
   ```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
