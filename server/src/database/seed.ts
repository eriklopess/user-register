import prisma from './prisma';

export const usersData = [
  {
    name: 'Oren Castillo',
    email: 'nonummy@protonmail.org',
    birthDate: new Date('Dec 29, 1995'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Michelle Crawford',
    email: 'etiam.gravida@aol.ca',
    birthDate: new Date('Apr 6, 2002'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Hammett Stewart',
    email: 'nullam.suscipit@aol.net',
    birthDate: new Date('Oct 22, 1980'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Asher Kirk',
    email: 'mi.duis.risus@google.edu',
    birthDate: new Date('Feb 27, 1991'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthDate: new Date('Jun 15, 1987'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    birthDate: new Date('Mar 20, 1994'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    birthDate: new Date('Sep 5, 1982'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Emily Williams',
    email: 'emily.williams@example.com',
    birthDate: new Date('Jan 10, 1999'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    birthDate: new Date('Nov 25, 1989'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Sophia Jones',
    email: 'sophia.jones@example.com',
    birthDate: new Date('Aug 8, 1992'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'William Wilson',
    email: 'william.wilson@example.com',
    birthDate: new Date('Feb 18, 1985'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Olivia Lee',
    email: 'olivia.lee@example.com',
    birthDate: new Date('Dec 5, 2000'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    birthDate: new Date('Jul 12, 1984'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
  {
    name: 'Emma Anderson',
    email: 'emma.anderson@example.com',
    birthDate: new Date('Apr 30, 1996'),
    password: '123456',
    photoUrl: 'https://picsum.photos/500',
  },
];

export const seed = async () => {
  try {
    await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
    await prisma.user.createMany({
      data: usersData,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
