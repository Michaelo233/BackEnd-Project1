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
    const errors: string[] = []
    // Gets query string from postman assign them to currentValue and initialInvestment.
    const initialInvestment: number = Number(req.query.initialInvestment);
    const currentValue: number = Number(req.query.currentValue);
    // checks for when initialInvestment and currentValue has no value.
    if (req.query.initialInvestment === "") {
        errors.push("initialInvestment is required");
    };

    if (req.query.currentValue === "") {
        errors.push("currentValue is required");
    };

    // checks for when initialInvestment is invalid
    if (req.query.initialInvestment !== "" && Number.isNaN(initialInvestment)) {
        errors.push("initialInvestment should be numeric.");
    };

    // checks for when currentValue is invalid
    if (req.query.currentValue !== "" && Number.isNaN(currentValue)) {
        errors.push("currentValue should be numeric.");
    };

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Calls the function, and return result to the api as a json.
    const calculatedPerformance: PerformanceData = calculatePortfolioPerformance(currentValue, initialInvestment);
    res.json(calculatedPerformance);
});

export default app;