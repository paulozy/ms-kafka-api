import { Consumer, Kafka } from "kafkajs";

export class ConsumerFactory {
  private consumer: Consumer;

  constructor(private topics: string[]) {
    this.consumer = this.createConsumer();
  }

  private createConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "ms_mailer",
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
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
        if (message.value) {
          const { recipient, data } = JSON.parse(message.value.toString());
          console.log(recipient, data);
        }

        console.log("no has value on data message");
      },
    });

    // try {
    // } catch (error) {}
  }
}
