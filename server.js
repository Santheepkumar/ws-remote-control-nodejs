// server.js (Host Side)

const WebSocket = require('ws');
const robot = require('robotjs');

// Set up WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Parse the received message
    const event = JSON.parse(message);
    console.log('event', event);
    if (event.key === 'Meta') return;
    if (event.type === 'keydown') {
      robot.keyToggle(event.key, 'down'); // Simulate key press
    } else if (event.type === 'keyup') {
      robot.keyToggle(event.key, 'up'); // Simulate key release
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is listening on ws://localhost:8080');
