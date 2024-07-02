'use strict';

/******************************* OPTIONS FOR GENERATING SEED COMMENTS *******************************/
const demoComments = []

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1); // add 1 to exclude 0 as result
}

// Option 1: generate random number of comments to be assigned to any random video
// function generateComments(num) {
//   for (let i = 0; i < num; i++) {
//     let comment = {}
//     comment.videoId = getRandomInt(30);
//     comment.userId = getRandomInt(14);
//     comment.comment = ""
//     demoComments.push(comment);
//   };
// }
// generateComments(270);


// Option 2: ensure each video is given at least 1 random of comment
function generateComment(vidId, numUsers){
  let comment = {}
  comment.videoId = vidId;
  comment.userId = getRandomInt(numUsers);
  comment.comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh nisl condimentum id venenatis a. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Fermentum et sollicitudin ac orci phasellus egestas tellus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla at volutpat diam ut venenatis. Leo duis ut diam quam nulla porttitor massa id."
  return comment
};

function generateSeeds(numVideos, numUsers, maxVidComments) { // params: total number of videos, total number of users, max num of comments per video
  for (let vidId = 1; vidId <= numVideos; vidId++) { // for each video
    let numComments = getRandomInt(maxVidComments); // generate max num of comments for curr video

    for (let j = 0; j < numComments; j++) { // for each comment in max comments
      demoComments.push(generateComment(vidId, numUsers)) // generate a comment for curr video using random user as commenter
    }
  }
};

generateSeeds(120, 14, 7);


// Option 3: Manual comment generation using the following template
// {
//   videoId: ,
//   userId: , // Name
//   comment: '',
// },


/******************************* SEED DATABASE *******************************/
let videoIds = [];
demoComments.forEach(comment => videoIds.push(comment.videoId))

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      demoComments,
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'Comments',
      { videoId: { [Op.in]: videoIds } },
      {},
    )
  }
};


