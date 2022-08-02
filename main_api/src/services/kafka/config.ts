import { ProducerFactory } from "./ProducerFactory";

export async function initKafka(producers: ProducerFactory[]): Promise<void> {
  producers.forEach(async (producer) => {
    try {
      await producer.start();
    } catch (error) {
      console.log(error);
    }
  });
}
