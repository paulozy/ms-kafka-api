import { Kafka, Message, Producer } from "kafkajs";

interface CustomMessage {
  key?: string;
  value: {
    recipient: string;
    data?: Object;
  };
}

export class ProducerFactory {
  private producer: Producer;

  constructor(private topic: string) {
    this.producer = this.createProducer();
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "main_api",
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    });

    return kafka.producer({
      allowAutoTopicCreation: true,
    });
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async send(messages: CustomMessage[]): Promise<void> {
    const kafkaMessages: Message[] = messages.map((message) => ({
      key: message.key,
      value: JSON.stringify(message.value),
    }));

    await this.producer.send({
      topic: this.topic,
      messages: kafkaMessages,
    });
  }
}
