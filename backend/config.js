const { Kafka } = require("kafkajs");

class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            clientId: "nodejs-kafka",
            brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: "test-group" });
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages,
            });
        } catch (error) {
            console.error(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const messageInfo = {
                        partition,
                        offset: message.offset,
                        value: message.value.toString()
                    }
                    callback(messageInfo);
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = KafkaConfig;