import { Consumer, Kafka } from "kafkajs";
import { sendEmail } from "../nodemailer/config";

export class ConsumerFactory {
  private consumer: Consumer;

  constructor(private topics: string[]) {
    this.consumer = this.createConsumer();
  }

  private createConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "ms_mailer",
      brokers: [`kafka:29092`],
    });

    return kafka.consumer({
      groupId: "mailer",
      allowAutoTopicCreation: true,
    });
  }

  public async start(): Promise<void> {
    try {
      await this.consumer.connect();

      this.topics.forEach(async (topic) => {
        await this.consumer.subscribe({ topic, fromBeginning: false });
      });
    } catch (error) {
      console.log("Error connecting the consumer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect();
  }

  public async run(): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const { recipient, data } = JSON.parse(message.value.toString());

        try {
          await sendEmail({ recipient, data });
        } catch (error) {
          console.log("Error sending email: ", error);
        }
      },
    });
  }
}
