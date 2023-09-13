const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')
const KafkaConfig = require("./config.js");
// const { KafkaStreams } = require("kafka-streams")

app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', async (message) => {
        try {
            const kafkaConfig = new KafkaConfig();
            const messages = [
                {
                    key: 'key-1',
                    value: message,
                }];
            kafkaConfig.produce("my-topic", messages);
            // const kafkaStreams = new KafkaStreams(kafkaConfig);
            // kafkaStreams.on("error", (error) => console.error(error));
            // const stream = kafkaStreams.getKStream("my-topic");
            // stream.forEach(message => console.log(message.value));
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

})

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (message) => {
    console.log(message);
    io.emit('messageInfo', message.partition, message.offset, message.value)
});


server.listen(8080, () => {
    console.log("port 8080")
})