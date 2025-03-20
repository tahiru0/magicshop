@echo off
echo Creating database tables...

:: Reset the database (this will delete all data!)
npx prisma migrate reset --force

:: Generate Prisma client
npx prisma generate

:: Seed the database with initial data
npx prisma db seed

echo Database setup complete!
