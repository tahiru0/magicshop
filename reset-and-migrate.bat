@echo off
echo Starting database reset and migration...

echo Generating Prisma client...
npx prisma generate

echo Creating migration...
npx prisma migrate dev --name init_fresh_schema

echo Resetting the database...
npx prisma migrate reset --force

echo Done! Your database should now be properly set up.
pause
