// Represents the structure of the performance data for an investment portfolio.
export interface PerformanceData {
    currentValue: number,
    initialInvestment: number,
    profitOrLoss: number,
    percentageChange: number,
    performanceSummary: string
};

/** 
 * Calculates the performance of a portfolio based on the initial investment and currentValue
 * @param currentValue - The current value of the calculatePortfolioPerformance
 * @param initialInvestment - The original amount invested
 * @returns An object containing currentValue, initialInvestment, profitOrLoss, percentageChange, performanceSummary
*/
export function calculatePortfolioPerformance(currentValue: number, initialInvestment: number): PerformanceData {

    // The profit or Loss from the portfolio.
    const profitOrLoss: number = currentValue - initialInvestment;

    // The percentage profit or loss from the portfolio
    const percentageChange: number = (profitOrLoss / initialInvestment) * 100;

    // The performance summary depending on the percentage 
    // profit or loss the investment made.
    const performanceSummary: string =
        percentageChange >= 30
        ? "Excellent performance! Your investments are doing great."
        : percentageChange >= 10
        ? "Solid gain. Keep monitoring your investments."
        : percentageChange > 0
        ? "Modest gain. Your portfolio is growing slowly."
        : percentageChange === 0
        ? "No change. Your portfolio is holding steady."
        : percentageChange >= -10
        ? "Minor loss. Stay calm and review your options."
        : "Significant loss. Review your portfilio strategy.";


    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
};