const amqp = require('amqplib');

class MessageBroker {

    constructor() {
        this.connection = null;
        this.channel = null;
        this.handlers = {};
        process.on('SIGINT', async () => {
            await messageBroker.disconnect();
        });
    }

    async connect() {
        this.connection = await amqp.connect(`amqp://${process.env.MESSAGE_BROKER_USERNAME}:${process.env.MESSAGE_BROKER_PASSWORD}@${process.env.MESSAGE_BROKER_HOST}:${process.env.MESSAGE_BROKER_PORT}`);
        this.channel = await this.connection.createChannel();
    }

    registerHandler(commandName, handler) {
        this.handlers[commandName] = handler;
    }

    async execute(command) {
        const commandName = command.constructor.name;
        const handler = this.handlers[commandName];
        if (!handler) {
            throw new Error(`No handler registered for command: ${commandName}`);
        }
        return handler(command);
    }

    async publish(exchange, routingKey, message) {
        await this.channel.assertExchange(exchange, 'direct', {durable: false});
        return await this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    }

    async subscribe(exchange, queue, routingKey, handler) {
        await this.channel.assertExchange(exchange, 'direct', {durable: false});
        const assertedQueue = await this.channel.assertQueue(queue, {exclusive: false});
        await this.channel.bindQueue(assertedQueue.queue, exchange, routingKey);

        this.channel.consume(assertedQueue.queue, async (message) => {
            const parsedMessage = JSON.parse(message.content.toString());
            try {
                await handler(parsedMessage);
                this.channel.ack(message);
            } catch (e) {
                this.channel.nack(message);
            }
        });
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.close();
        }
    }
}

module.exports = MessageBroker;