// Setting up connection to db with prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Faker package
const { faker } = require('@faker-js/faker');

// Creating User table
const createUser = async() => {
  for(let i = 0; i < 3; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    })
  }
}

// Creating Post table
const createPost = async() => {
  for(let i = 0; i < 9; i++) {
    await prisma.post.create({
      data: {
        title: faker.word.words(1),
        content: faker.lorem.lines(1),
        userId: (i % 3) + 1
      }
    })
  }
}

const main = async () => {
  await createUser();
  await createPost();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// module.exports = prisma;