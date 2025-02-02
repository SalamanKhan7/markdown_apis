
import axios from "axios";
// Check grammar for Markdown content
export const checkGrammar = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  

  try {
  
    const response = await axios.post("https://api.languagetool.org/v2/check", 
      new URLSearchParams({ language: "en-US", text: content }).toString(), 
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  let errors = [];
  const matches = response.data.matches;
  if (matches.length === 0) {
    res.status(200).json({ message: "No error found"});
  } else {
      console.log("Grammar Issues:");
      matches.forEach((match, index) => {

          errors.push(`${index + 1}. ${match.message}`);
          errors.push(`   Suggestion: ${match.replacements.map(rep => rep.value).join(", ")}`);
          errors.push(`   Offset: ${match.offset}, Length: ${match.length}`);
      });
  }
  
    
    
    res.status(200).json({ message: "error found", errors: errors });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to check grammar" , error: error});
  }
};