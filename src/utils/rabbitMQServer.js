const amqp = require("amqplib/callback_api");

class RabbitMqServer {
  async sender(data, queue) {
    try {
      const connection = await this.connect();
      const channel = await connection.createChannel();
      const tt = JSON.stringify(data);

      await channel.assertQueue(queue);
      await channel.sendToQueue(queue, Buffer.from(tt));
    } catch (error) {
      console.error('Error in sender:', error);
      throw error;
    }
  }

  async receiver(queue) {
    try {
      const connection = await this.connect();
      const channel = await connection.createChannel();

      await channel.assertQueue(queue);

      return new Promise((resolve, reject) => {
        channel.consume(queue, (msg) => {
          resolve(msg.content.toString());
        });
      });
    } catch (error) {
      console.error('Error in receiver:', error);
      throw error;
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      amqp.connect("amqp://localhost", (error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }
}

module.exports = new RabbitMqServer();
