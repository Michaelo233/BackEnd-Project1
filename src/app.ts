import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";
/**
 * Represents the response structure for a health check endpoint
 */
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Using the interface to type your response
app.get("/api/v1/health", (req, res) => {
    // Create a response object that matches our interface
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.get("/api/v1/portfolio/performance", (req, res) => {
    const initialInvestment = Number(req.query.initialInvestment);
    const currentValue = Number(req.query.currentValue);
    if (!initialInvestment || !currentValue) {
    return res.status(400).json({ error: "initialInvestment and currentValue are required" });
    }

    const calculatedPerformance = calculatePortfolioPerformance(currentValue, initialInvestment);
    res.json(calculatedPerformance);
});

export default app;