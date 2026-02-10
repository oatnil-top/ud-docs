---
sidebar_position: 11
---

# AI Assistant

## What is the AI Assistant?

UnderControl's AI Assistant helps you work faster by understanding images and text. Snap a photo of a receipt and AI extracts the expense details. Describe a task in plain English and AI creates it for you. It's like having a smart helper that handles the tedious data entry.

## Key AI Features

### Expense from Receipt (Vision)
Take a photo of any receipt and AI will extract:
- **Amount and currency**
- **Merchant name**
- **Date of purchase**
- **Category suggestion**
- **Description**

You can upload receipts by dragging and dropping, pasting from clipboard (Ctrl+V), or selecting files. Batch upload is supported for processing multiple receipts at once.

### Expense from Text
Type a natural description and AI creates a structured expense:
- "Lunch at Starbucks $15.50" becomes a properly categorized expense
- "Uber ride home 23 dollars" gets parsed into amount, vendor, and category

### Task from Image
Upload a screenshot or photo and AI creates a task with:
- Extracted title and description
- Suggested tags
- Relevant details from the image

### Task from Text
Describe what you need to do in plain language:
- "Buy groceries for the dinner party on Saturday" becomes a structured task
- AI extracts the title, description, and any relevant tags

### Text Refinement
Polish your writing with AI assistance. Works in task titles, descriptions, and notes - AI improves grammar, clarity, and tone while keeping your meaning.

### Natural Language Queries
Ask questions about your tasks in plain English:
- "Show me overdue tasks"
- "What tasks are due this week?"
- AI translates your question into a query and shows matching results

## Supported AI Providers

UnderControl works with a wide range of AI providers:

### Premium Providers
- **OpenAI** - GPT-4o and other OpenAI models
- **Anthropic** - Claude models (Sonnet, Opus, Haiku)

### OpenAI-Compatible Services
- Azure OpenAI, DeepSeek, Moonshot, Zhipu AI, Aliyun Qwen, Together AI, Fireworks AI

### Free Tier Providers
- GitHub Models, Google AI Studio, Groq

### Local Deployment
- Ollama, LM Studio, vLLM - Run AI models on your own hardware

## Setting Up AI

### Using Your Own API Key (Recommended)
1. Go to your **Profile** settings
2. Find the **AI Providers** section
3. Click **Add Provider**
4. Select your provider type (OpenAI, Anthropic, or compatible service)
5. Enter your API key and select a model
6. Toggle backend and/or frontend availability
7. Test the configuration to make sure it works

You can add multiple providers and reorder them by priority. UnderControl uses the first available provider.

### System-Level Providers
If your administrator has configured system-level AI providers, those are available to all users who haven't set up their own. Your personal providers always take priority over system providers.

## How AI Configuration Works

UnderControl uses a three-tier priority system:
1. **Your personal provider** (highest priority) - API key you configure yourself
2. **Admin provider** - System-wide provider set by your administrator
3. **Startup provider** (lowest priority) - Server-level default configuration

:::tip
Setting up your own AI provider gives you the most control and ensures AI features work even if system providers change.
:::

## Apple Shortcuts Integration

On iOS and macOS, you can use Apple Shortcuts for quick AI-powered capture:
- Snap a photo → AI creates an expense
- Share text → AI creates a task
- Download the shortcut from the Subscribe/Download page

## Tips for Success

1. **Good lighting for receipts** - Clear, well-lit receipt photos give the best AI extraction results

2. **Be specific with text input** - "Coffee at Blue Bottle $5.50 today" works better than "bought coffee"

3. **Review AI results** - Always check what AI extracted before saving, especially amounts and dates

4. **Set up your own provider** - Personal API keys give you reliable, consistent AI access

5. **Try natural language queries** - Ask questions about your tasks in everyday language

## How AI Works with Other Features

### With Expenses
AI vision turns receipt photos into structured expenses, automatically linked to the right budget. Text parsing handles quick expense entry from descriptions.

### With Tasks
Create tasks from images or text descriptions. AI summaries can be generated on a schedule to keep you informed about task progress.

### With Resources
Uploaded images are stored as resources and can be analyzed by AI. Receipt images are automatically linked to the expenses they create.

## Getting Started

1. **Configure a provider** - Add your AI provider in Profile settings
2. **Try receipt scanning** - Upload a receipt photo when creating an expense
3. **Create a task from text** - Describe a task in plain English and let AI structure it
4. **Explore natural language queries** - Ask questions about your tasks
