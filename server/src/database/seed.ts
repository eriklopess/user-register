import prisma from './prisma';

export const usersData = [
  {
    photoUrl: 'https://picsum.photos/500',
    name: 'Rafaela Costa',
    email: 'rafaela@example.com',
    password: 'senha222',
    birthDate: new Date('1994-06-18'),
  },
  {
    photoUrl: 'https://picsum.photos/500',
    name: 'Thiago Santos',
    email: 'thiago@example.com',
    password: 'senha333',
    birthDate: new Date('1996-08-12'),
  },
  {
    photoUrl: 'https://picsum.photos/500',
    name: 'Juliana Lima',
    email: 'juliana@example.com',
    password: 'senha444',
    birthDate: new Date('1989-11-05'),
  },
  {
    photoUrl: 'https://picsum.photos/500',
    name: 'Eduardo Souza',
    email: 'eduardo@example.com',
    password: 'senha555',
    birthDate: new Date('1998-02-22'),
  },
  {
    photoUrl: 'https://picsum.photos/500',
    name: 'Fernanda Rodrigues',
    email: 'fernanda@example.com',
    password: 'senha666',
    birthDate: new Date('1993-09-08'),
  },
];

export const seed = async () => {
  try {
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
