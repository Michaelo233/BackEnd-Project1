import request, { Response } from "supertest";
import app from "../src/app";
import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("GET /api/v1/health", () => {
    it("should return server health status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});

describe ("calculatePortfolioPerformance", () => {
    it("should return object with correct values", () => {
        expect(calculatePortfolioPerformance(16000, 10000)).toEqual({"initialInvestment": 10000,
    "currentValue": 16000,
    "profitOrLoss": 6000,
    "percentageChange": 60,
    "performanceSummary": "Excellent performance! Your investments are doing great."});
    });

    it("should return object with correct values", () => {
        expect(calculatePortfolioPerformance(10000, 10000)).toEqual({
            "initialInvestment": 10000,
            "currentValue": 10000,
            "profitOrLoss": 0,
            "percentageChange": 0,
            "performanceSummary": "No change. Your portfolio is holding steady."});
    });

    it("should return object with correct values", () => {
        expect(calculatePortfolioPerformance(6000, 10000)).toEqual({
            "initialInvestment": 10000,
            "currentValue": 6000,
            "profitOrLoss": -4000,
            "percentageChange": -40,
            "performanceSummary": "Significant loss. Review your portfilio strategy."});
        });
});
// describe("Get /api/v1/health" () => {})


describe("GET /api/v1/portfolio/performance", () => {
    it("should return response status 400", async () => {
        const response: Response = await request(app).get("/api/v1/portfolio/performance")
        expect(response.status).toBe(400)

    });

    it("should return response status 200", async () => {
        const response: Response = await request(app).get("/api/v1/portfolio/performance")
        .query({initialInvestment: 10000, currentValue: 16000});

        expect(response.status).toBe(200);
    });

    it("should return response status 400 when one param is a string", async () => {
        const response: Response = await request(app).get("/api/v1/portfolio/performance")
        .query({initialInvestment: "ddd", currentValue: 16000});

        expect(response.status).toBe(400);
    });

    it("should return response status 400 when one param is a string", async () => {
        const response: Response = await request(app).get("/api/v1/portfolio/performance")
        .query({initialInvestment: 2000, currentValue: "ddd"});

        expect(response.status).toBe(400);
    })
});