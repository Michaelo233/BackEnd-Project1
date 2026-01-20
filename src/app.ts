import express, { Express } from "express";
import { PerformanceData } from "./portfolio/portfolioPerformance";

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

    // Gets query string from postman assign them to currentValue and initialInvestment.
    const initialInvestment: number = Number(req.query.initialInvestment);
    const currentValue: number = Number(req.query.currentValue);

    // checks for when initialInvestment and currentValue has no value.
    if (!initialInvestment || !currentValue) {
        return res.status(400).json({ error: "initialInvestment and currentValue are required" });
    };

    // checks for when initialInvestment is invalid
    if (typeof initialInvestment !== "number") {
        return res.status(400).json({ error: "initialInvestment are invalid" });
    };

    // checks for when currentValue is invalid
    if (typeof currentValue !== "number") {
        return res.status(400).json({ error: "currentValue are invalid" });
    };

    // Calls the function, and return result to the api as a json.
    const calculatedPerformance: PerformanceData = calculatePortfolioPerformance(currentValue, initialInvestment);
    res.json(calculatedPerformance);
});

export default app;