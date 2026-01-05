export const analyzeSensitivity = async (videoPath) => {
    // Simulating analysis delay
    await new Promise((res) => setTimeout(res, 3000));
  
    // Mock logic (Replace with AI / ML logic if required)
    const score = Math.floor(Math.random() * 100);
  
    return {
      score,
      classification: score > 60 ? "flagged" : "safe",
    };
  };
  