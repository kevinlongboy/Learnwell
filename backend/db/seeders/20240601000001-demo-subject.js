'use strict';

const subject = require("../models/subject");

// /** @type {import('sequelize-cli').Migration} */

const demoSubjects = [
  {
    id: 1,
    name: "Fine Arts 🎨",
    avatar: "ˌfīn ˈärts | creative art, especially visual art whose products are to be appreciated primarily or solely for their imaginative, aesthetic, or intellectual content",
  },
  {
    id: 2,
    name: "Health & Wellness 🏃",
    avatar: "helTH (ə)n(d) ˈwelnəs | the state of being in good health, especially as an actively pursued goal",
  },
  {
    id: 3,
    name: "History 🦖",
    avatar: "ˈhist(ə)rē | the study of past events, particularly in human affairs",
  },
  {
    id: 4,
    name: "Literature 📖",
    avatar: "ˈlidər(ə)CHər, | written works, especially those considered of superior or lasting artistic merit",
  },
  {
    id: 5,
    name: "Linguistics 👅",
    avatar: "liNGˈɡwistiks | the scientific study of language and its structure",
  },
  {
    id: 6,
    name: "Mathematics 🧮",
    avatar: "ˌmaTH(ə)ˈmadiks | the abstract science of number, quantity, and space.",
  },
  {
    id: 7,
    name: "Music 🎼",
    avatar: "ˈmyo͞ozik | vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion",
  },
  {
    id: 8,
    name: "Science 🔬",
    avatar: "ˈsīəns | the systematic study of the structure and behavior of the physical and natural world",
  },
  {
    id: 9,
    name: "Social Sciences 🌎",
    avatar: "ˌsōSHəl ˈsīəns | the scientific study of human society and social relationships.",
  },
  {
    id: 10,
    name: "Technology 💻",
    avatar: "tekˈnäləjē | the application of scientific knowledge for practical purposes, especially in industry",
  },
]

let names = [];
demoSubjects.forEach(subject => names.push(subject.name))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Subjects',
      demoSubjects,
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Subjects',
      { name: { [Op.in]: names } },
      {}
    )
  }
};
