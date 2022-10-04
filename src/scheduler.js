const CronJob = require('node-cron');

const {
  getAllUsersWhoShouldStillReceiveMessages,
  getMessageById,
  getAllMessages,
  updateUserRecord,
} = require('./database');
const mailer = require('./mailer');

// Recursively get a random message ID
const getRandomMessageId = (user, MAX_VALUE) => {
  const randomNum = Math.floor(Math.random() * MAX_VALUE) + 1;
  if (user.messagesReceived.includes(randomNum)) {
    return getRandomMessageId(user, MAX_VALUE);
  }
  return randomNum;
};

const randomMessageJob = async () => {
  try {
    const users = await getAllUsersWhoShouldStillReceiveMessages();
    const TOTAL_MESSAGES = (await getAllMessages()).length;
    users.forEach(async (user) => {
      const idOfMessageToSend = getRandomMessageId(user, TOTAL_MESSAGES);
      const [message] = await getMessageById(idOfMessageToSend);
      await mailer(user.email, message);

      updateUserRecord(user.email, idOfMessageToSend);
    });
  } catch (error) {
    console.log('ERROR RUNNING JOB::', error.message);
  }
};

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
    randomMessageJob();
  });

  scheduledJobFunction.start();
};
