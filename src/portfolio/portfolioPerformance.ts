interface PerformanceData {
    currentValue: number,
    initialInvestment: number,
    profitOrLoss: number,
    percentageChange: number,
    performanceSummary: string};

export function calculatePortfolioPerformance(currentValue: number, initialInvestment: number): PerformanceData {

    const profitOrLoss = currentValue - initialInvestment;

    const percentageChange = (profitOrLoss / initialInvestment) * 100;

    let performanceSummary =
        percentageChange >= 30
        ? "Excellent performance! Your investments are doing great."
        : percentageChange >= 10
        ? "Solid gain. Keep monitoring your investments."
        : percentageChange > 0
        ? "Modest gain. Your portfolio is growing slowly."
        : percentageChange === 0
        ?"No change. Your portfolio is holding steady."
        : "The portfolio has performed poorly.";


    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
}