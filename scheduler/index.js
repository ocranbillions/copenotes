const CronJob = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../database/models/User');
const Message = require('../database/models/Message');
const sendEmail = require('../mailer');
const { getRandomMessageId } = require('./randomIdGenerator');

const EMAIL_SUCCESS_CODE = '250';

const randomMessageJob = async () => {
  try {
    const users = await User.getAllUsersWhoShouldStillReceiveMessages();

    const TOTAL_MESSAGES = (await Message.getAll()).length;

    users.forEach(async (user) => {
      const randomMessageId = getRandomMessageId(user, TOTAL_MESSAGES);
      const [message] = await Message.getMessageById(randomMessageId);

      const response = await sendEmail(user.email, message);

      const messageSent = response.slice(0, 3) === EMAIL_SUCCESS_CODE;
      if (messageSent) {
        console.log(`Message sent to ${user.email}`);
        User.addToReceivedMessages(user, randomMessageId, TOTAL_MESSAGES);
      }
    });
  } catch (error) {
    console.log('ERROR RUNNING JOB::', error.message);
  }
};

const initJobScheduler = () => {
  const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
    console.log('Starting Job...');
    randomMessageJob();
  });
  scheduledJobFunction.start();
  console.log('Scheduler is running successfully');
};

initJobScheduler();
