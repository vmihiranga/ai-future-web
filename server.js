import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: "Too many requests, please try again later."
    }
});

app.use(limiter);
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    try {
        const indexPath = path.join(__dirname, "public", "index.html");
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error("Error serving index.html:", err);
                res.status(404).json({
                    success: false,
                    error: "Index file not found",
                });
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

app.get("/api/chat", async (req, res) => {
    try {
        const { text } = req.query;

        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Text parameter is required and must be a non-empty string",
            });
        }

        if (text.length > 500) {
            return res.status(400).json({
                success: false,
                error: "Text parameter exceeds maximum length of 500 characters",
            });
        }

        const encodedText = encodeURIComponent(text.trim());

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
            `https://api.dreaded.site/api/chatgpt?text=${encodedText}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controller.signal
            },
        );

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(
                `External API error: ${response.status} ${response.statusText}`,
            );
        }

        const data = await response.json();

        if (!data.success || !data.result || !data.result.prompt) {
            throw new Error("Invalid API response format");
        }

        res.status(200).json({
            success: true,
            result: {
                prompt: data.result.prompt,
            },
        });
    } catch (error) {
        console.error("AI API Error:", {
            message: error.message,
            input: req.query.text,
            stack: error.stack,
        });

        res.status(500).json({
            success: false,
            error: error.name === 'AbortError' ? "Request timeout" : "Internal server error. Please try again later.",
        });
    }
});

app.get('/api/giftedchat', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || typeof q !== "string" || q.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Query parameter q is required and must be a non-empty string'
            });
        }

        if (q.length > 500) {
            return res.status(400).json({
                success: false,
                error: 'Query parameter exceeds maximum length of 500 characters'
            });
        }

        const encodedQuery = encodeURIComponent(q.trim());

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(
            `https://api.giftedtech.web.id/api/ai/letmegpt?apikey=gifted&q=${encodedQuery}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            }
        );
        
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`GiftedTech API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.result) {
            res.status(200).json({
                success: true,
                result: {
                    prompt: data.result
                },
                provider: 'giftedtech'
            });
        } else {
            throw new Error('Invalid GiftedTech API response format');
        }
    } catch (error) {
        console.error('GiftedTech API Error:', {
            message: error.message,
            input: req.query.q,
            stack: error.stack
        });
        
        res.status(500).json({
            success: false,
            error: error.name === 'AbortError' ? "Request timeout" : 'GiftedTech API unavailable. Please try again later.'
        });
    }
});

app.get('/api/ghibli', async (req, res) => {
    try {
        const { prompt } = req.query;
        
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Prompt parameter is required and must be a non-empty string'
            });
        }

        if (prompt.length > 200) {
            return res.status(400).json({
                success: false,
                error: 'Prompt parameter exceeds maximum length of 200 characters'
            });
        }

        const encodedPrompt = encodeURIComponent(prompt.trim());

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(
            `https://api.giftedtech.web.id/api/ai/text2ghibli?apikey=gifted&prompt=${encodedPrompt}`,
            {
                method: 'GET',
                signal: controller.signal
            }
        );
        
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`Ghibli API error: ${response.status} ${response.statusText}`);
        }
        
        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);
        
        res.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=3600'
        });
        
        res.send(buffer);
    } catch (error) {
        console.error('GiftedTech Ghibli API Error:', {
            message: error.message,
            input: req.query.prompt,
            stack: error.stack
        });
        
        res.status(500).json({
            success: false,
            error: error.name === 'AbortError' ? "Request timeout" : 'Ghibli image generation unavailable. Please try again later.'
        });
    }
});

app.get("/api/health", (req, res) => {
    const uptime = Date.now() - startTime;
    const uptimeSeconds = Math.floor(uptime / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);

    res.json({
        status: "OK",
        message: "AI Future Backend is running",
        timestamp: new Date().toISOString(),
        port: PORT,
        uptime: {
            milliseconds: uptime,
            seconds: uptimeSeconds,
            minutes: uptimeMinutes,
            hours: uptimeHours,
            days: uptimeDays,
            formatted: `${uptimeDays}d ${uptimeHours % 24}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s`
        },
        memory: {
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
            rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`
        },
        nodeVersion: process.version,
        platform: process.platform
    });
});

app.get("/api/docs", (req, res) => {
    res.json({
        name: "AI Future API",
        version: "1.0.0",
        description: "AI-powered chat and image generation API",
        rateLimit: {
            windowMs: "15 minutes",
            maxRequests: 100
        },
        endpoints: [
            {
                path: "/api/health",
                method: "GET",
                description: "Health check and uptime monitoring",
                parameters: [],
                response: {
                    status: "OK",
                    uptime: "object",
                    memory: "object"
                }
            },
            {
                path: "/api/chat",
                method: "GET",
                description: "Chat with AI using Dreaded API",
                timeout: "10 seconds",
                parameters: [
                    {
                        name: "text",
                        type: "string",
                        required: true,
                        maxLength: 500,
                        description: "The message to send to the AI"
                    }
                ],
                example: "/api/chat?text=Hello, how are you?",
                response: {
                    success: "boolean",
                    result: {
                        prompt: "string"
                    }
                }
            },
            {
                path: "/api/giftedchat",
                method: "GET",
                description: "Chat with AI using GiftedTech LetMeGPT API",
                timeout: "15 seconds",
                parameters: [
                    {
                        name: "q",
                        type: "string",
                        required: true,
                        maxLength: 500,
                        description: "The query to send to the AI"
                    }
                ],
                example: "/api/giftedchat?q=What is artificial intelligence?",
                response: {
                    success: "boolean",
                    result: {
                        prompt: "string"
                    },
                    provider: "giftedtech"
                }
            },
            {
                path: "/api/ghibli",
                method: "GET",
                description: "Generate Ghibli-style images from text",
                timeout: "30 seconds",
                parameters: [
                    {
                        name: "prompt",
                        type: "string",
                        required: true,
                        maxLength: 200,
                        description: "The text prompt for image generation"
                    }
                ],
                example: "/api/ghibli?prompt=A peaceful forest scene",
                response: "image/png"
            },
            {
                path: "/api/docs",
                method: "GET",
                description: "API documentation",
                parameters: [],
                response: "JSON documentation object"
            }
        ]
    });
});

app.use((err, req, res, next) => {
    console.error("Unexpected error:", {
        message: err.message,
        stack: err.stack,
    });
    res.status(500).json({
        success: false,
        error: "Unexpected server error",
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 A.I. Future server running on port ${PORT}`);
    console.log(`🌐 Server accessible at http://localhost:${PORT}`);
    console.log(`🤖 A.I. API CONNECTED`);
    console.log(`📚 API Docs available at http://localhost:${PORT}/api/docs`);
    console.log(`💚 Health check at http://localhost:${PORT}/api/health`);
    console.log(`🛡️  Rate limit: 100 requests per 15 minutes`);
});