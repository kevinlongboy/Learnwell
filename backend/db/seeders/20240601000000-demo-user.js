'use strict';

const bcrypt = require("bcryptjs");

// template
// {
//   // id: 1,
//   firstName: '',
//   lastName: '',
//   username: '',
//   hashedPassword: bcrypt.hashSync('password'),
//   email: '@email.com',
//   avatar: '',
// },

const demoUsers = [
  {
    // id: 1,
    firstName: 'Demo',
    lastName: 'User',
    username: 'Demo_User',
    hashedPassword: bcrypt.hashSync('demoPassword'),
    email: 'demo_user@email.com',
    avatar: "Demo",
  },
  {
    // id: 2,
    firstName: 'Serena',
    lastName: 'van der Woodsen',
    username: 'Serena',
    hashedPassword: bcrypt.hashSync('passwordA'),
    email: 'svanderwoodsen@columbia.edu',
    avatar: "Serena",
  },
  {
    // id: 3,
    firstName: 'Blair',
    lastName: 'Waldorf',
    username: 'Blair',
    hashedPassword: bcrypt.hashSync('passwordB'),
    email: 'bwaldorf@columbia.edu',
    avatar: "Blair",
  },
  {
    // id: 4,
    firstName: 'Dan',
    lastName: 'Humphrey',
    username: 'Dan',
    hashedPassword: bcrypt.hashSync('passwordC'),
    email: 'dhumphrey@nyu.edu',
    avatar: "Dan",
  },
  {
    // id: 5,
    firstName: 'Nate',
    lastName: 'Archibald',
    username: 'Nate',
    hashedPassword: bcrypt.hashSync('passwordD'),
    email: 'narchibald@columbia.edu',
    avatar: "Nate",
  },
  {
    // id: 6,
    firstName: 'Chuck',
    lastName: 'Bass',
    username: 'Chuck',
    hashedPassword: bcrypt.hashSync('passwordE'),
    email: 'chuck@bass.com',
    avatar: "Chuck",
  },
  {
    // id: 7,
    firstName: 'Jenny',
    lastName: 'Humphrey',
    username: 'Jenny',
    hashedPassword: bcrypt.hashSync('passwordF'),
    email: 'jhumphrey@constancebillard.edu',
    avatar: "Jenny",
  },
  {
    // id: 8,
    firstName: 'Eric',
    lastName: 'van der Woodsen',
    username: 'Eric',
    hashedPassword: bcrypt.hashSync('passwordG'),
    email: 'evanderwoodsen@stjohn.edu',
    avatar: "Eric",
  },
  {
    // id: 9,
    firstName: 'Vanessa',
    lastName: 'Abrams',
    username: 'Vanessa',
    hashedPassword: bcrypt.hashSync('passwordH'),
    email: 'vabrams@nyu.edu',
    avatar: "Vanessa",
  },
  {
    // id: 10,
    firstName: 'Georgina',
    lastName: 'Sparks',
    username: 'Georgina',
    hashedPassword: bcrypt.hashSync('passwordI'),
    email: 'gsparks@nyu.edu',
    avatar: "Georgina",
  },
  {
    // id: 11,
    firstName: 'Charlie',
    lastName: 'Rhodes',
    username: 'Lola',
    hashedPassword: bcrypt.hashSync('passwordJ'),
    email: 'crhodes@julliard.edu',
    avatar: "Lola",
  },
  {
    // id: 12,
    firstName: 'Ivy',
    lastName: 'Dickens',
    username: 'Ivy',
    hashedPassword: bcrypt.hashSync('passwordL'),
    email: 'idickens@gmail.com',
    avatar: "Ivy",
  },
  {
    // id: 13,
    firstName: 'Nelly',
    lastName: 'Yuki',
    username: 'Nelly',
    hashedPassword: bcrypt.hashSync('passwordM'),
    email: 'nyuki@yale.edu',
    avatar: "Nelly",
  },
  {
    // id: 14,
    firstName: 'Dorota',
    lastName: 'Kishlovsky',
    username: 'Dorota',
    hashedPassword: bcrypt.hashSync('passwordK'),
    email: 'dkishlovsky@gmail.pl',
    avatar: "Dorota",
  },
]

let usernames = [];
demoUsers.forEach(user => usernames.push(user.username))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      demoUsers,
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      { username: { [Op.in]: usernames } },
      {}
    )
  }
};
