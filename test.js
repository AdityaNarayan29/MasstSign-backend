import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      email: 'firstuser@example.com',
      password: 'supersecret',
      role: 'UPLOADER',
    },
  });
  console.log('Inserted user:', user);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
