const moduleContent = {
"hedging-introduction": {
title: "What is Hedging? (Basic for Farmers)",
videos: [
{
id: 1,
title: "Hedging Explained Simply for Farmers",
url: "/videos/v1.mp4",
thumbnail: "/thumbnails/hedging-intro-1.jpg",
duration: "07:45",
readUrl: "/docs/hedging-intro.pdf",
},
{
id: 2,
title: "Why Farmers Need Hedging?",
url: "/videos/v2.mp4",
thumbnail: "/thumbnails/hedging-intro-2.jpg",
duration: "06:20",
readUrl: "/docs/hedging-why.pdf",
},
],
quizzes: [
{
id: 1,
question: "What is the main purpose of hedging for farmers?",
options: [
"To maximize profit",
"To protect against price fluctuations",
"To predict market trends",
"To avoid harvesting crops"
],
answer: 1
},
{
id: 2,
question: "Hedging primarily provides farmers with:",
options: ["Price protection", "Faster growth", "Higher yield", "Guaranteed profit"],
answer: 0
},
{
id: 3,
question: "Selling a futures contract helps the farmer:",
options: ["Lock a price", "Increase crop size", "Reduce taxes", "Increase storage time"],
answer: 0
},
{
id: 4,
question: "If spot prices fall, hedged farmers:",
options: ["Lose money", "Earn stable income", "Always make extra profit", "Cannot sell crops"],
answer: 1
},
{
id: 5,
question: "Hedging is a tool used in:",
options: ["Commodity markets", "Sports betting", "Weather forecasting", "Agricultural loans"],
answer: 0
}
]
},

"basis-fundamentals": {
title: "Understanding Basis (Farmers)",
videos: [
{
id: 1,
title: "What is Basis? (Easy Example)",
url: "/videos/v1.mp4",
thumbnail: "/thumbnails/basis-1.jpg",
duration: "08:12",
readUrl: "Begin with the concept introduction: 'Sometimes the futures market and spot market do not move equally. The difference between them is called the basis...'"
},
{
id: 2,
title: "Why Basis Changes? (Local Market Logic)",
url: "/videos/v2.mp4",
thumbnail: "/thumbnails/basis-2.jpg",
duration: "10:42",
readUrl: "Start with a clean definition on screen: 'Hedging is a risk-management strategy used to protect farmers and traders from price fluctuations...'"
}
],
quizzes: [
{
id: 1,
question: "What does 'basis' represent in commodity markets?",
options: ["Price difference between spot and futures", "Crop quality", "Interest rate", "Government subsidy"],
answer: 0
},
{
id: 2,
question: "If the basis moves favorably, the farmer can:",
options: ["Lose money", "Earn additional profit", "Predict weather", "Increase yield"],
answer: 1
},
{
id: 3,
question: "Basis is calculated as:",
options: ["Futures Price – Spot Price", "Spot Price × Futures Price", "Futures Price + Spot Price", "Spot Price / Futures Price"],
answer: 0
},
{
id: 4,
question: "Favorable basis movement can create:",
options: ["Extra profit beyond hedging", "Crop disease", "Price volatility", "Storage problems"],
answer: 0
},
{
id: 5,
question: "Basis does not always move equally with:",
options: ["Spot and futures markets", "Weather patterns", "Government policies", "Crop yield"],
answer: 0
}
]
},

// Add other modules similarly...
};
export default moduleContent;
