import { listen } from "./modules/Discord.js";
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to check bot connection status
app.get('/status', (req, res) => {
    const isConnected = Math.random() > 0.5; // Simulate connection status
    res.json({ connected: isConnected });
});

// Serve the connection status webpage directly
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bot Connection Status</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f4f4f9;
                }
                .status-container {
                    text-align: center;
                    padding: 20px 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .status {
                    font-size: 1.5em;
                    margin: 20px 0;
                }
                .status.success {
                    color: green;
                }
                .status.fail {
                    color: red;
                }
                button {
                    padding: 10px 20px;
                    font-size: 1em;
                    border: none;
                    border-radius: 4px;
                    background-color: #0078D7;
                    color: white;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #005ea3;
                }
            </style>
            <script>
                async function checkConnection() {
                    try {
                        const response = await fetch('/status');
                        const data = await response.json();
                        const statusElement = document.getElementById('status');
                        if (data.connected) {
                            statusElement.textContent = 'Bot Connection Successful';
                            statusElement.className = 'status success';
                        } else {
                            statusElement.textContent = 'Bot Connection Failed';
                            statusElement.className = 'status fail';
                        }
                    } catch (error) {
                        const statusElement = document.getElementById('status');
                        statusElement.textContent = 'Error: Unable to fetch status';
                        statusElement.className = 'status fail';
                    }
                }
                document.addEventListener('DOMContentLoaded', checkConnection);
            </script>
        </head>
        <body>
            <div class="status-container">
                <h1>Bot Connection Status</h1>
                <p id="status" class="status">Checking...</p>
                <button onclick="checkConnection()">Retry</button>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

listen();
