export async function fetchQuizData() {
    try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.jsonserve.com/Uw5CrX"));
        
        if (!response.ok) {
            throw new Error("Failed to fetch quiz data");
        }

        const data = await response.json();
        console.log("API Data:", data); 

        const jsonData = JSON.parse(data.contents);
        console.log("Parsed Quiz Data:", jsonData);  
        
        if (jsonData && jsonData.questions) {
            console.log("Questions:", jsonData.questions);
        } else {
            console.error("Quiz data does not contain expected 'questions' field.");
        }

        return jsonData;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return null;
    }
}
