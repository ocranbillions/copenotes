const CronJob = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../database/models/User');
const Message = require('../database/models/Message');
const sendEmail = require('../mailer');
const { getRandomMessageId } = require('./randomIdGenerator');

const randomMessageJob = async () => {
  try {
    const users = await User.getAllUsersWhoShouldStillReceiveMessages();
    const NUM_OF_MESSAGES = (await Message.getAll()).length;
    const EMAIL_SUCCESS_CODE = '250';

    users.forEach(async (user) => {
      const messageIds = user.messagesReceived ? [...JSON.parse(user.messagesReceived)] : [];
      const randomMessageId = getRandomMessageId(messageIds, NUM_OF_MESSAGES);
      const [message] = await Message.getMessageById(randomMessageId);

      const response = await sendEmail(user.email, message);

      const messageSent = response.slice(0, 3) === EMAIL_SUCCESS_CODE;
      if (messageSent) {
        console.log(`Message sent to ${user.email}\n\n`);

        const updatedMessageIds = [...messageIds, message.id];
        const hasReceivedAllMessages = updatedMessageIds.length === NUM_OF_MESSAGES ? 1 : 0;
        User.updateReceivedMessages(user.id, updatedMessageIds, hasReceivedAllMessages);
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
