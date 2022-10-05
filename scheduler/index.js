const CronJob = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../database/models/User');
const Message = require('../database/models/Message');
const mailer = require('../mailer');

// Recursively get a random message ID
const getRandomMessageId = (user, MAX_VALUE) => {
  const messagesReceived = user.messagesReceived ? [...JSON.parse(user.messagesReceived)] : [];

  const randomNum = Math.floor(Math.random() * MAX_VALUE) + 1;
  if (messagesReceived.includes(randomNum)) {
    return getRandomMessageId(user, MAX_VALUE);
  }
  return randomNum;
};

const randomMessageJob = async () => {
  try {
    const users = await User.getAllUsersWhoShouldStillReceiveMessages();

    const TOTAL_MESSAGES = (await Message.getAll()).length;

    users.forEach(async (user) => {
      const idOfMessageToSend = getRandomMessageId(user, TOTAL_MESSAGES);
      const [message] = await Message.getMessageById(idOfMessageToSend);

      await mailer(user.email, message);

      User.updateReceivedMessages(user, idOfMessageToSend, TOTAL_MESSAGES);
    });
  } catch (error) {
    console.log('ERROR RUNNING JOB::', error.message);
  }
};

const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
    console.log('Starting Job...');
    randomMessageJob();
  });
  scheduledJobFunction.start();
  console.log('Task Scheduler running successfully');
};

initScheduledJobs();
