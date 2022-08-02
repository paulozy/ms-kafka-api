import { ConsumerFactory } from "./ConsumerFactory";

const mailerConsumer = new ConsumerFactory(["new_post"]);

export async function execConsumer(): Promise<void> {
  await mailerConsumer.start();
  await mailerConsumer.run();
}
