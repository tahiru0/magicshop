# Database Initialization Commands

Follow these steps to initialize the database for your Magic Shop:

## 1. Initialize Prisma

```bash
npx prisma init
```

## 2. Apply Database Migrations

After configuring your Prisma schema file, run these commands to create and apply the migrations:

```bash
# Generate a migration from your Prisma schema, apply it to the database, trigger generators
npx prisma migrate dev --name init

# If you're deploying to production
npx prisma migrate deploy
```

## 3. Seed the Database

After creating the migration, seed your database with initial data:

```bash
# Run the seed script defined in your package.json
npx prisma db seed
```

## 4. Visual Database Explorer

To visually explore your database:

```bash
npx prisma studio
```

## 5. Common Issues & Solutions

### Connection Issues
If you encounter connection issues, verify:
- Your `.env` file contains the correct DATABASE_URL
- Your database server is running and accessible
- Network permissions allow the connection

### Schema Changes
When you modify the schema:

```bash
# Generate a new migration
npx prisma migrate dev --name added_new_fields

# If you just want to update the client without creating migrations
npx prisma generate
```

### Reset Development Database
If you need to reset your development database:

```bash
# Warning: This deletes all data!
npx prisma migrate reset
```
