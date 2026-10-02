const fs = require('fs');
const path = require('path');

// Make sure to install the package first:
// npm install @google/genai
// And set your API key:
// $env:GEMINI_API_KEY="your_api_key_here"

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DIRECTORY_TO_SCAN = path.join(__dirname, '..', 'IQ_Notes', 'Chapter_Notes', '29');
const WORKSPACE_ROOT = path.join(__dirname, '..');

const SYSTEM_PROMPT = `You are an expert Playwright and TypeScript instructor. 
Your task is to explain a provided code snippet.
You MUST format your response EXACTLY like this:

### Code Breakdown: \`[filename]\`

**Line-by-line Explanation:**
*   \`Line X\`: [Explanation]
*   \`Line Y-Z\`: [Explanation]

**Why this approach was chosen:**
[Explanation of why the coder chose this approach]

**Alternative Effective Way:**
[Explanation of an alternative effective way to implement this]
`;

async function processFile(mdFilePath) {
    console.log(`Processing: ${path.basename(mdFilePath)}`);
    const mdContent = fs.readFileSync(mdFilePath, 'utf-8');

    // Skip if already processed
    if (mdContent.includes('### Code Breakdown:')) {
        console.log(`  -> Already processed. Skipping.`);
        return;
    }

    // Extract file path from "**File:** `path/to/file`"
    const fileMatch = mdContent.match(/\*\*File:\*\*\s*`([^`]+)`/);
    if (!fileMatch) {
        console.log(`  -> No file reference found. Skipping.`);
        return;
    }

    const codeFilePath = path.join(WORKSPACE_ROOT, fileMatch[1]);
    
    if (!fs.existsSync(codeFilePath)) {
        console.log(`  -> Referenced code file not found: ${codeFilePath}`);
        return;
    }

    const codeContent = fs.readFileSync(codeFilePath, 'utf-8');
    const codeFileName = path.basename(codeFilePath);

    console.log(`  -> Found code file: ${codeFileName}. Generating explanation...`);

    try {
        const prompt = `Analyze this code file named ${codeFileName}:\n\n\`\`\`typescript\n${codeContent}\n\`\`\``;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.2
            }
        });

        let explanation = response.text;
        
        // Ensure the explanation has a newline before it
        if (!explanation.startsWith('\n')) {
            explanation = '\n\n' + explanation;
        }

        // Insert before "### Key Points" if it exists, otherwise append to end
        let updatedContent;
        if (mdContent.includes('### Key Points')) {
            updatedContent = mdContent.replace('### Key Points', explanation + '\n\n### Key Points');
        } else {
            updatedContent = mdContent + explanation + '\n';
        }

        fs.writeFileSync(mdFilePath, updatedContent, 'utf-8');
        console.log(`  -> Successfully updated ${path.basename(mdFilePath)}!`);
    } catch (error) {
        console.error(`  -> Failed to process ${codeFileName}:`, error.message);
    }
}

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY environment variable is not set.");
        console.log("Run this first: $env:GEMINI_API_KEY='your-key-here'");
        process.exit(1);
    }

    const files = fs.readdirSync(DIRECTORY_TO_SCAN);
    
    for (const file of files) {
        if (file.endsWith('.md')) {
            const fullPath = path.join(DIRECTORY_TO_SCAN, file);
            await processFile(fullPath);
            
            // Add a small delay to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    console.log("All done!");
}

main();
