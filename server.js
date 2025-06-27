import dotenv from "dotenv";
import express from "express";
// import { WebSocketServer } from "ws";
import cors from "cors";
import morgan from "morgan";
// import fs from "fs";
// import path from "path";
// // import axios from 'axios';
// import ffmpeg from "fluent-ffmpeg";
// import { fileURLToPath } from "url";

const app = express();
dotenv.config();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Echo--Watch API is running...");
});

app.post("/v1/whatsapp", (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) {
    return res.status(400).json({ error: "Phone and message are required" });
  }

  // Here you would typically handle the WhatsApp message sending logic
  // For now, we'll just return a success response
  res.status(200).json({ success: true, phone, message: `Message sent to ${phone}: ${message}` });
});

//Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// const wss = new WebSocketServer({ server });
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// const clients = new Set();

//this is demo alert just demo

// app.post("/api/demo-alert", (req, res) => {
//   const alert = {
//     type: "ALERT",
//     data: {
//       title: "Test Alert",
//       message: "This is a sending alers from backend",
//       timestamp: new Date().toISOString(),
//     },
//   };

//   for (const client of clients) {
//     if (client.readyState === 1) {
//       client.send(JSON.stringify(alert));
//     }
//   }

//   res.json({
//     success: true,
//     sentTo: clients.size,
//     message: "Alert sent to all connected clients",
//     data: alert.data,
//   });
// });

//node -e "require('http').request({method: 'POST', hostname: 'localhost', port: 5000, path: '/api/demo-alert'}, res => res.on('data', d => process.stdout.write(d))).end()"

//Above is the node script to run the alerrt using node on demo

// const threatCooldown = new Map(); // Maps threat to timestamp
// const COOLDOWN_TIME = 30 * 1000; // 30 seconds

// function shouldSendAlert({ threats }) {
//   const now = Date.now();
//   const newThreats = [];

//   for (const threat of threats) {
//     const lastSeen = threatCooldown.get(threat) || 0;
//     if (now - lastSeen > COOLDOWN_TIME) {
//       newThreats.push(threat);
//       threatCooldown.set(threat, now);
//     }
//   }

//   return newThreats.length > 0 ? newThreats : null;
// }

// wss.on("connection", (ws) => {
//   console.log("Client connected");
//   clients.add(ws);

//   let videoBuffer = Buffer.alloc(0);

//   ws.on("message", async (data) => {
//     if (!isBinary || !Buffer.isBuffer(data)) {
//       console.warn(
//         "Invalid data type received, expecting binary video buffer."
//       );
//       return;
//     }
//     videoBuffer = Buffer.concat([videoBuffer, data]);

//     const webmPath = path.join(uploadsDir, `chunk.webm`);
//     fs.writeFileSync(webmPath, videoBuffer);

//     const framePath = path.join(uploadsDir, `frame.jpg`);
//     ffmpeg(webmPath)
//       .screenshots({
//         count: 1,
//         folder: uploadsDir,
//         filename: "frame.jpg",
//       })
//       .on("end", async () => {
//         console.log("Frame extracted:", framePath);

//         try {
//           const res = await axios.post(
//             "http://localhost:8000/detect",
//             fs.createReadStream(framePath),
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );

//           const detectedThreats = res.data?.threats || [];
//           const threatsToAlert = shouldSendAlert(detectedThreats);

//           if (threatsToAlert) {
//             console.log("Threat Detected:", threatsToAlert.join(", "));

//             const alert = {
//               type: "ALERT",
//               data: {
//                 title: "Suspicious Activity Detected",
//                 message: `Threats: ${threatsToAlert.join(", ")}`,
//                 timestamp: new Date().toISOString(),
//               },
//             };

//             for (const client of clients) {
//               if (client.readyState === 1) {
//                 client.send(JSON.stringify(alert));
//               }
//             }
//           } else {
//             console.log("Threat detected, but already alerted recently.");
//           }
//         } catch (err) {
//           console.error("Detection error:", err.message);
//         }
//         fs.unlink(webmPath, (err) => {
//           if (err) {
//             console.error("Failed to delete chunk.webm:", err);
//           } else {
//             console.log("Temporary video chunk removed:", webmPath);
//           }
//         });
//       });

//     videoBuffer = Buffer.alloc(0);
//   });

//   ws.on("close", () => {
//     clients.delete(ws);
//     console.log("Client disconnected");
//   });
// });
