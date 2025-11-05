# AllOutputs Planning Document
**Complete Blueprint Following Planning.md Format**

**Clone of:** Emily AI (meetemily.ai)  
**Brand Name:** AllOutputs  
**Domain:** AllOutputs.com  
**Focus:** Web Application Only

---

# Define the Core Domain

Start with what you're actually building and why it matters.

### The Vision

- **Advice:** "I want to create an app that lets **[target users]** do **[primary action]** using **[method]**"

```
I want to create a web app that lets professionals, content creators, 
and knowledge workers access and compare multiple premium AI models 
(GPT-4o, Claude 3.7, Gemini 2.5, DeepSeek) through a unified interface 
using intelligent chat, specialized AI agents (Nova, Harper, Remy, 
Lennon, Emmerson), and content processing tools, enabling them to get 
optimal AI responses for any task while saving $80/month vs. separate 
subscriptions.
```

### Target User & Problem Space

- **Advice:** "The type of customer who would benefit from this is **[demographic/psychographic]** who struggle with **[specific problem]** and we're solving it because **[reason]**"

```
The target customer is professionals aged 25-55 (product managers, 
content creators, marketers, consultants, researchers, students) 
earning $50K-$200K annually, who struggle with:
1. Paying $60-100/month for multiple AI subscriptions
2. Context switching between ChatGPT, Claude, Gemini platforms
3. Uncertainty about which AI model performs best for each task
4. Generic AI responses lacking domain expertise
5. Time wasted comparing outputs manually

We're solving this because no single AI model excels at everything, 
professionals need comparative intelligence for informed decisions, 
current solutions enforce vendor lock-in, and cost barriers prevent 
multi-model access. A unified workspace with specialized AI personalities 
can increase productivity by 40%+ while reducing costs by 81%.
```

### App Name

- **Advice:** "This app is called **[name]**"

```
This app is called "AllOutputs"

Tagline: "Every AI Model. One Platform. Infinite Outputs"
```

---

## Model the Primary Feature Flow

Describe the user journey step-by-step. Be pedantic about the sequence.

### Core User Journey

- **Advice:** "This should work by the user doing **[action 1]**, going through **[steps 2-n]**, to get **[outcome]**"

```
This should work by the user first signing up with email/password or 
Google OAuth, landing on a dashboard with 8 quick-action icons 
(Compare Models, Summarize Video, Chat with Webpage, Generate Post, etc.). 

Then they either:
A) Select an AI model from dropdown (AllOutputs 2.0, GPT-4o Mini, 
   Claude 3.7, etc.) and type a query in chat input
B) Click "Compare Model" button to select 2-3 models for side-by-side 
   comparison of the same query
C) Navigate to AI Specialists section and choose Nova (Product Manager), 
   Harper (Brand Counselor), Remy (Content Writer), Lennon (Social Media), 
   or Emmerson (Data Analyst) for specialized assistance
D) Use content tools: Summarize (URL/file), Generate Post (LinkedIn/
   Twitter/Instagram), Extract Data, Create Chapters (video), or Translate
E) Browse Prompts Library (200+ curated prompts in 7 categories) and 
   apply one to chat

The query processes with real-time streaming response (character-by-character). 
For comparisons, responses appear side-by-side in 3 columns with voting 
mechanism ("Which response was best?").

User receives formatted output with Markdown rendering, code syntax 
highlighting, copy/share/export buttons, and regenerate option. 
Conversation history is saved automatically with search/filter capabilities.

Free users hit 50 queries/day limit, triggering upgrade prompt: 
"Upgrade to Pro for unlimited queries and advanced models. 
Start 1-month free trial."

Pro users get unlimited queries, all advanced models (Claude 3.7, 
GPT-4o, reasoning models), priority speed, and multi-model comparison.

Outcome: User discovers optimal AI model for each task type, saves 
80% on costs, eliminates context switching, and develops efficient 
workflows using specialized agents.
```

### Data Model

- **Advice:** "Model the data like this: **[specific schema]**"

```
MongoDB Collections:
```

- **users**: id, email, password (hashed), name, profile_picture, subscription_tier ['free'|'pro'], subscription_status, trial_end_date, preferences {default_model, theme, language, response_length, tone}, usage_stats {total_queries, queries_this_month, favorite_model}, created_at, updated_at

- **conversations**: id, user_id, title (auto-generated), messages [{id, role ['user'|'assistant'], content, model, timestamp, tokens_used}], ai_specialist ['nova'|'harper'|'remy'|'lennon'|'emmerson'|null], tags[], is_favorite, folder, created_at, last_message_at

- **prompts**: id, title, description, category ['marketing'|'content_writing'|'business'|'career'|'creative'|'tech'|'data'], prompt_text, variables ["{topic}", "{audience}"], icon, color, is_premium, usage_count, created_at

- **model_comparisons**: id, user_id, query, models[], responses [{model, response, response_time, tokens_used, quality_score}], winner (user-selected), created_at

- **subscriptions**: user_id, plan_type ['free'|'pro'], status ['active'|'trial'|'cancelled'|'expired'], stripe_customer_id, stripe_subscription_id, current_period_start, current_period_end, trial_start, trial_end, billing_history[], created_at

```
Use Zustand for state management:
- authStore: {user, isAuthenticated, login(), signup(), logout()}
- chatStore: {currentConversation, conversations, selectedModel, isStreaming, 
  sendMessage(), compareModels(), loadConversations()}
- specialistStore: {specialists, activeSpecialist, selectSpecialist(), 
  chatWithSpecialist()}
- promptsStore: {prompts, selectedCategory, searchQuery, favorites, 
  loadPrompts(), applyPrompt()}
- uiStore: {theme, sidebarOpen, modalOpen, toastMessage, toggleTheme()}
```

---

## Define User Experience & Interface

Now describe what the user actually sees and interacts with.

### Landing Page Structure

- **Advice:** "I want to create a landing page that includes **[sections]**"

```
I want a landing page with:
```

**1. Hero Section**
- Headline: "Every AI Model. One Platform. Infinite Outputs"
- Subheadline: "The only platform where Claude, GPT, Gemini compete for your answer"
- AI model logos floating (ChatGPT, Claude, Gemini, DeepSeek)
- Primary CTA: "Start Free Trial" (prominent, indigo button)
- Secondary CTA: "See Pricing"
- Background: Dark (#0f0f10) with purple-blue gradient, particle effects

**2. Problem Section**
- Headline: "Your browser should be your superpower. Instead, it's become digital quicksand"
- 3 pain points in cards:
  * Multiple tabs chaos (with visual)
  * Ideas trapped between platforms
  * Hours lost searching
- Emotional, relatable copy

**3. Solution Section ("We built something better")**
- 4 value propositions with icons:
  * Unified AI workspace
  * Compare models side-by-side
  * Specialized AI experts
  * Work in any language
- Tagline: "From digital friction to frictionless flow"

**4. Cost Comparison Section**
- Visual comparison cards:
  * Left: "Without AllOutputs" - ChatGPT $20 + Claude $40 + Gemini $40 = $100/month
  * Right: "With AllOutputs" - All three ✓ $19/month
  * Big green button: "Save $80/Month"

**5. Features Showcase (Tabbed Interface)**
- Tabs: Chat, Summarize, Generate Post, Extract Data, Create Chapters, Translate
- Each tab shows:
  * Feature headline
  * Benefit description
  * Full-size screenshot/mockup
  * "Try it now" CTA

**6. AI Specialists Section**
- Headline: "Delegate Tasks to Your AI Specialists"
- 5 character cards (2-column grid):
  * Nova (Product Manager) - Orange gradient, thumbs up avatar
  * Harper (Brand Counselor) - Pink gradient, boxing stance
  * Remy (Content Writer) - Blue gradient, books
  * Lennon (Social Media) - Purple gradient, phone
  * Emmerson (Data Analyst) - Deep blue gradient, chart

**7. How It Works (3 Steps)**
- Step 1: Sign Up (screenshot of signup form)
- Step 2: Choose Your Tool (dashboard screenshot)
- Step 3: Get Results (comparison view screenshot)

**8. Pricing Section**
- 2-column comparison table:
  * Free Plan: $0, basic models, 50 queries/day
  * Pro Plan: $19/month, all models, unlimited, 1-month free trial
- Detailed feature matrix below

**9. FAQ Accordion**
- 6-8 common questions with answers

**10. Final CTA**
- Headline: "Ready to supercharge your productivity?"
- Large "Start Free Trial" button
- Trust signals: "Join 10,000+ professionals"

**11. Footer**
- Logo, navigation links, social media, legal (Privacy, Terms), copyright

### Look & Feel

- **Advice:** "I want my app to look and feel like **[references]** with **[specific characteristics]**"

```
I want AllOutputs to look and feel like Linear meets Stripe's design 
system — clean, modern, sophisticated, with subtle personality. Think 
premium productivity tool, not flashy SaaS. 

Key characteristics:
- Dark mode by default (#0f0f10 background)
- Generous whitespace (never cramped)
- Muted color palette with vibrant accent colors (indigo #4f46e5 primary)
- Glass-morphism effects (backdrop-filter: blur(12px))
- Subtle shadows for depth, no harsh borders
- Modern sans-serif fonts (Manrope for headings, Inter for body)
- Smooth micro-animations (200ms transitions)
- Professional but approachable tone

Reference: Stripe for polish and attention to detail, Linear for clean 
information hierarchy, Notion for friendly professionalism, but warmer 
and more human than all three.

AVOID: Typical blue-red-green colors, dark gradients covering >20% 
viewport, centered text-heavy layouts, AI emoji characters (🤖🧠).
```

### Primary App Interface

- **Advice:** "The main interface should have **[layout/sections]**"

```
The main app interface should have:
```

**Left Sidebar (256px fixed width, dark background):**
- AllOutputs logo at top
- Navigation menu:
  * Chat (icon + label, default active)
  * Prompts (icon + label)
  * AI Specialists (icon + label)
  * Download Extension (icon + label, grayed out/future)
- Bottom section:
  * Subscribe (for free users)
  * Settings
  * User profile (avatar, name, email)

**Top Bar (64px height):**
- Hamburger menu (mobile only)
- "New Chat" button (always visible, right side)

**Main Content Area (flexible, fills remaining space):**

**For Chat Dashboard:**
- Personalized greeting: "Hi [Name], How Can I Help You Today?"
- 8 Quick action icons in grid (4x2):
  * Compare Models
  * Summarize Video
  * Summarize Webpage
  * Summarize Document
  * Chat with Webpage
  * LinkedIn Post
  * X Post
  * View All Agents
- Model selector section:
  * Dropdown: "AllOutputs 2.0 ▾" (currently selected)
  * "Compare Model" button next to it
  * "History" button below
- Chat input area (bottom):
  * Large text area: "Tell me something about this page..."
  * File attachment icon (📎)
  * Audio input icon (▶)
  * Send button (implicit on Enter)
- "🚀 Upgrade to Pro" banner (for free users, subtle, bottom)

**For Active Chat:**
- Message list (scrollable):
  * User messages: right-aligned, dark gray bubble
  * AI messages: left-aligned, with model icon, formatted with Markdown
  * Loading: Typing indicator with dots
- Chat input always visible at bottom

**For AI Specialists:**
- "← Back to Chat" link at top
- Specialist card grid (2 columns, responsive)
- Each card: gradient background, avatar, name, role, description

**For Prompts Library:**
- "← Back to Chat" link
- Category filter bar (horizontal scroll): All Prompts, Marketing, Business, Career, Content Writing, Creative, Data, Email
- Search input (right side)
- Prompt card grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Pagination at bottom: Previous [1] [2] [3] ... [13] Next

**No header bloat** — just essential elements. Focus on content.

---

## Specify Secondary Features

Limit these. Focus on functional necessities, not feature creep.

### User Authentication & Onboarding

- **Advice:** "The user should be able to start using the app by doing **[action]**"

```
User signs up with email + password or Google OAuth (single button). 
After signup, they land directly on the chat dashboard with 8 quick 
action icons visible.

No tedious multi-step onboarding. Instead:
1. Contextual tooltips on first use only:
   - Model selector: "Choose from 10+ AI models"
   - Compare button: "Compare 3 models side-by-side"
   - AI Specialists: "Get specialized help for your domain"

2. Optional "Take a 60-second tour" modal (can skip)

3. First query triggers celebration: "Great! You've sent your first 
   query. Try comparing models next."

For login: Standard email + password with "Remember me" checkbox. 
Forgot password link sends reset email with magic link (expires in 1 hour).

Session persists for 7 days, then requires re-authentication.
```

### Multi-Model Comparison

- **Advice:** "Users can compare models by **[actions]**"

```
Users can compare AI models by:

1. Clicking "Compare Model" button on chat dashboard
2. Modal appears: "Select 2-3 Models to Compare"
   - Checkboxes for each model (grouped by tier):
     * Basic (free): AllOutputs 2.0, GPT-4o Mini, Gemma 3, Llama 3.2
     * Advanced (pro, locked for free users): Claude 3.7, GPT-4o, DeepSeek v3
     * Reasoning (pro, locked): DeepSeek R1, Claude Reasoning, Gemini 2.5 Pro, GPT o1
3. User selects 2-3 models, clicks "Compare"
4. Single query input appears: "Enter your question..."
5. User types query and hits Enter
6. Three columns appear side-by-side, each streaming response from 
   its model in real-time
7. After completion, user sees:
   - Response time per model
   - Token count per model
   - Copy button per response
   - Vote: "Which response was most helpful?" (radio buttons)
8. User selects best response, data saved for analytics
9. Can continue conversation with winning model or start new comparison

If free user tries to select advanced model, show: "🔒 Claude 3.7 
Sonnet (Pro Only). Upgrade to Pro for access to advanced models. 
Try Free for 1 Month."
```

### AI Specialists System

- **Advice:** "The AI Specialists feature should work like this: **[behaviour]**"

```
The AI Specialists feature should work like this:

SPECIALIST DEFINITIONS:
- Nova (Product Manager): Orange avatar, writes PRDs, user stories, 
  roadmaps, feature specs. Personality: methodical, asks clarifying 
  questions, structured outputs.
  
- Harper (Brand Counselor): Pink avatar, optimizes resumes, cover 
  letters, LinkedIn profiles, personal brands. Personality: direct, 
  challenging, pushes for authenticity.
  
- Remy (Content Writer): Blue avatar, writes blogs, emails, newsletters, 
  long-form content. Personality: creative, flowing, offers style 
  variations.
  
- Lennon (Social Media Manager): Purple avatar, creates Instagram 
  posts, social strategies, hashtags, content calendars. Personality: 
  energetic, trendy, platform-savvy.
  
- Emmerson (Data Analyst): Deep blue avatar, analyzes data, generates 
  insights, creates reports, identifies trends. Personality: analytical, 
  precise, results-driven.

USER FLOW:
1. User clicks "AI Specialists" in sidebar
2. Sees gallery of 5 specialist cards (2-column grid, unique gradients)
3. Clicks on specialist card (e.g., Nova)
4. Transitions to specialized chat interface:
   - Header shows Nova's avatar, name, role
   - "← Back to AI Specialists" link
   - Welcome message: "Hi! I'm Nova, your Product Manager specialist. 
     I can help you with PRDs, user stories, roadmaps, and feature 
     prioritization. What would you like to work on?"
   - 3-4 suggested prompts specific to Nova:
     * "Help me write a PRD for [feature]"
     * "Create user stories for [project]"
     * "Analyze this market research data"
5. User types query or clicks suggested prompt
6. Nova responds in her personality (methodical, structured, with 
   clarifying questions)
7. Conversation continues with specialist context preserved
8. User can switch specialists or return to general chat anytime

All specialist conversations are tagged and searchable by specialist name.
```

### Content Tools (Summarize, Generate Post, etc.)

- **Advice:** "Content tools should behave like this: **[specific behaviour]**"

```
Content tools should behave like this:

SUMMARIZE:
- User clicks "Summarize" icon or goes to Tools → Summarize
- Input options (tabs):
  * URL: Text input for article/webpage URL
  * Video: YouTube URL input
  * File: Drag-drop zone for PDF/DOCX/TXT
  * Text: Large textarea for direct paste
- Output format selector: Key Points | Detailed | Executive Summary
- Length slider: Short (50 words) → Long (500 words)
- Click "Summarize" button
- Processing shows: "Extracting content..." → "Analyzing..." → "Generating summary..."
- Output displays in formatted card:
  * **Key Points:** Bullet list
  * **Summary:** 2-4 paragraphs
  * **Takeaways:** Action items
  * For videos: Timestamped chapters
- Copy, Export (PDF/TXT), or "Chat about this" buttons

GENERATE POST:
- User selects platform: LinkedIn | Twitter | Instagram | Email
- Inputs:
  * Topic/theme (text input)
  * Tone dropdown: Professional | Casual | Humorous | Inspirational
  * Length: Short | Medium | Long
- Click "Generate" button
- AI produces 3 variants displayed in cards
- Each card shows:
  * Generated content
  * Character/word count
  * "Select" button
- User selects preferred variant
- Opens in editor with inline editing
- Additional options:
  * Regenerate
  * Copy
  * Generate hashtags (for social)
  * Schedule (future feature, grayed out)

EXTRACT DATA:
- Input source: URL | File upload
- Extraction type: Tables | Statistics | Contacts | Dates | All
- Click "Extract"
- Output shows structured table with extracted data
- Export as CSV or JSON
- "Generate insights" button analyzes extracted data

CREATE CHAPTERS (Video):
- Input: YouTube URL
- Click "Create Chapters"
- Processing: "Extracting transcript..." → "Identifying key moments..."
- Output: Timestamped list
  * [00:45] Introduction and overview
  * [05:30] Main concept explanation
  * [12:15] Example demonstration
  * etc.
- Copy formatted for YouTube description

TRANSLATE:
- Input: Text, URL, or file
- Source language: Auto-detect | Manual select
- Target language: Dropdown (50+ languages)
- Click "Translate"
- Output shows translation with original formatting preserved
- Copy or download button
```

### Prompts Library

- **Advice:** "Users can manage the prompt library by **[actions]**"

```
Users can manage the prompt library by:

DISCOVERY:
1. Click "Prompts" in sidebar
2. See category filter bar at top: All Prompts | Analyzing market trends | 
   Business | Career | Content Writing | Creative | Data | Email
3. Click category to filter (e.g., "Marketing")
4. See grid of prompt cards (3 cols desktop, 2 tablet, 1 mobile)
5. Each card shows:
   - Icon (thematic)
   - Title: "Writing Video Descriptions"
   - Description: 2-3 lines about what it does
   - Category tag: [Marketing] (colored pill)
   - Gradient background (category-specific color)
6. Search bar (top right) for keyword search: "LinkedIn", "email", etc.
7. Pagination at bottom if >24 prompts

APPLICATION:
1. User clicks prompt card
2. If prompt has variables (e.g., "{topic}", "{audience}"):
   - Modal appears: "Fill in details"
   - Input fields for each variable
   - "Apply Prompt" button
3. If no variables:
   - Navigates directly to chat with prompt pre-filled
4. User can edit prompt text before sending

FAVORITES (Pro feature):
1. Heart icon on each prompt card
2. Click to add to favorites
3. "Favorites" filter shows saved prompts
4. Max 50 favorites

CUSTOM PROMPTS (Pro feature):
1. "Create Custom Prompt" button (top right)
2. Modal with fields:
   - Title
   - Description
   - Category
   - Prompt text (with variable syntax help: use {variableName})
   - Icon picker
3. Save to "My Prompts" (private by default)
4. Edit/delete custom prompts anytime
5. Free users see "Create Custom Prompts (Pro)" with lock icon

200+ pre-built prompts seeded at launch across 7 categories.
```

### Subscription & Billing

- **Advice:** "Users should be able to **[account actions]**"

```
Users should be able to:

SUBSCRIPTION MANAGEMENT:
1. Click "Settings" → "Subscription" tab
2. See current plan display:
   - "Current Plan: Pro (Monthly)"
   - "Status: Active"
   - "Next billing date: April 5, 2025"
   - "Amount: $19.00"
3. Actions:
   - "Change Plan" button (Monthly ↔ Annual)
   - "Update Payment Method" (redirects to Stripe portal)
   - "Cancel Plan" button (red, bottom)

UPGRADE FLOW (Free → Pro):
1. Click "Upgrade to Pro" banner or any Pro-locked feature
2. Lands on pricing comparison page
3. Selects plan: Monthly ($19) or Annual ($190, save $38)
4. Clicks "Start 1-Month Free Trial"
5. Stripe Checkout modal:
   - Email (pre-filled)
   - Card details (Stripe hosted)
   - Billing address
6. Submits, returns to dashboard
7. Sees confirmation: "Welcome to Pro! Your trial ends on [date]. 
   Enjoy unlimited access."
8. Reminder emails: 7 days, 3 days, 1 day before trial ends

CANCELLATION FLOW:
1. Click "Cancel Plan" in settings
2. Confirmation modal:
   - "Are you sure? You'll lose access to:"
   - List of Pro features
   - "Cancel at period end" checkbox (checked by default)
   - Reason dropdown: Too expensive | Not using enough | Found alternative | Other
3. Click "Confirm Cancellation"
4. Message: "Your subscription will remain active until [date]. 
   You won't be charged again."
5. Can reactivate anytime before period end

BILLING HISTORY:
1. Settings → "Subscription" → "Billing History" section
2. Table:
   - Date | Amount | Status | Invoice
3. Click invoice link → downloads PDF
4. Shows last 12 months, pagination for older

PAYMENT METHOD UPDATE:
1. Click "Update Payment Method"
2. Redirects to Stripe Customer Portal
3. User updates card, returns to AllOutputs
4. Confirmation: "Payment method updated successfully"
```

---

## Design System & Component Library

Now the details that separate "AI-generated slop" from "professional product".

### Component Library

- **Advice:** "Use **[library]** with **[specific customisations]**"

```
Use Shadcn/UI components with Radix UI primitives, following a dark 
color palette with indigo-600 as primary. Use the New York style variant.

Customizations:
- Override button padding: px-4 py-2 for medium (not px-6 py-3)
- Card hover: translateY(-2px) + shadow-md transition
- Input focus: ring-2 ring-indigo-500 ring-offset-2 ring-offset-background
- Modal backdrop: backdrop-filter blur(8px) + rgba(0,0,0,0.7)
- Toast position: top-right, max-width 400px

Specific components to use:
- Button (primary, secondary, ghost, destructive variants)
- Input (with icon support)
- Card (with hover effects)
- Dialog/Modal
- Dropdown Menu
- Tabs
- Accordion
- Toast (using Sonner library)
- Avatar
- Badge
- Skeleton (for loading states)
```

### Typography

- **Advice:** "For typography, use **[fonts]** with **[sizing system]**"

```
Use Manrope for headings, Inter for body text, JetBrains Mono for code.

Type scale (responsive with clamp):
- H1: clamp(2.5rem, 5vw, 3.75rem) - font-semibold (600)
- H2: clamp(2rem, 4vw, 3rem) - font-semibold (600)
- H3: clamp(1.5rem, 3vw, 2.25rem) - font-medium (500)
- H4: clamp(1.25rem, 2.5vw, 1.875rem) - font-medium (500)
- Body: 1rem (16px) - font-regular (400)
- Small: 0.875rem (14px) - font-regular (400)
- Tiny: 0.75rem (12px) - font-regular (400)

Line heights:
- Headings: 1.25 (tight)
- Body: 1.5 (normal)
- Large blocks: 1.75 (relaxed)

Letter spacing:
- Headings: -0.025em (tight, for visual polish)
- Body: 0 (normal)
- Uppercase labels: 0.05em (wide, for readability)

No italics anywhere. Use bold for emphasis.
```

### Colour Palette

- **Advice:** "Use these specific colours: **[exact values]**"

```
PRIMARY COLORS:
- Background: #0f0f10 (near black)
- Surface: #1a1a1b (dark gray cards/panels)
- Surface elevated: #2d2d2f (hover states, elevated cards)
- Primary: #4f46e5 (indigo-600 for buttons, links, accents)
- Primary hover: #4338ca (indigo-700)
- Primary light: #818cf8 (indigo-400 for subtle accents)

TEXT COLORS:
- Primary: #e5e7eb (gray-200, main text)
- Secondary: #9ca3af (gray-400, labels, secondary text)
- Muted: #6b7280 (gray-500, placeholders, disabled text)

FUNCTIONAL COLORS:
- Success: #10b981 (emerald-500)
- Error: #ef4444 (red-500)
- Warning: #f59e0b (amber-500)
- Info: #3b82f6 (blue-500)

AI SPECIALIST COLORS:
- Nova: #f97316 (orange-500)
- Harper: #ec4899 (pink-500)
- Remy: #3b82f6 (blue-500)
- Lennon: #a855f7 (purple-500)
- Emmerson: #1e40af (blue-800)

BORDERS:
- Default: #2d2d2f (subtle)
- Elevated: #404040 (more visible)

Never use arbitrary hex codes. Stick to Tailwind's semantic scale 
(gray-50 through gray-900, indigo-50 through indigo-900, etc.).

GRADIENT RESTRICTIONS:
- ⚠️ NEVER cover more than 20% of viewport with gradients
- ⚠️ NEVER use on text-heavy content
- ✅ USE ONLY for: Hero backgrounds, specialist cards, accent visuals
```

### Spacing & Layout

- **Advice:** "Use this specific layout system: **[constraints]**"

```
All spacing on 4px grid. Use only these values:
- p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), 
  p-8 (32px), p-10 (40px), p-12 (48px), p-16 (64px), p-20 (80px)

Container constraints:
- Max width: 1440px (max-w-7xl)
- Centered with mx-auto px-4 (mobile) or px-6 (desktop)

Section padding:
- Mobile: py-12 (48px vertical)
- Desktop: py-20 (80px vertical)

Component spacing:
- Card padding: p-6 (24px)
- Modal padding: p-6 to p-8
- Form elements: space-y-4 (16px between fields)
- Button groups: space-x-2 (8px horizontal)

Layout:
- Sidebar: 256px fixed width
- Header: 64px fixed height
- Main content: calc(100vh - 64px) height, overflow-y-auto
```

### Rounded Corners & Shadows

- **Advice:** "All rounded corners use **[values]** and shadows use **[scale]**"

```
Border radius:
- Buttons, inputs: rounded-md (6px)
- Cards: rounded-lg (8px)
- Modals: rounded-xl (12px)
- Avatars: rounded-full (circular)
- Never use arbitrary values like rounded-[13px]

Shadows:
- Cards: shadow-sm (subtle)
- Modals: shadow-xl (prominent)
- Dropdowns: shadow-lg (medium)
- Hover states: shadow-md (slightly more than default)

Glow effects (for accents):
- Primary glow: 0 0 20px rgba(79, 70, 229, 0.4)
- Success glow: 0 0 20px rgba(16, 185, 129, 0.4)

Glass-morphism (for overlays):
- backdrop-filter: blur(12px)
- background: rgba(26, 26, 27, 0.8)
- border: 1px solid rgba(255, 255, 255, 0.1)
```

---

## Interaction Design & Micro-interactions

The polish that makes it feel responsive and alive.

### Animations

- **Advice:** "Use **[library]** for these specific animations: **[list]**"

```
Use Framer Motion for animations:

PAGE TRANSITIONS:
- Opacity + y: 20px transform
- Duration: 200ms
- Easing: ease-out

CARD ANIMATIONS:
- Stagger children with 0.1s delay between each
- Hover: translateY(-2px) + shadow increase (200ms)
- Click: scale(0.98) for 100ms

MODAL ENTRANCE:
- Backdrop: opacity 0 → 1 (200ms)
- Content: opacity 0 + scale(0.95) → opacity 1 + scale(1) (200ms)

LOADING STATES:
- Skeleton screens: pulse animation (2s infinite)
- Spinners: rotate 360deg (1s linear infinite)
- Streaming text: no animation (just append characters)

TOAST NOTIFICATIONS:
- Enter: slide in from top-right + opacity (300ms ease-out)
- Exit: slide out to top-right + opacity (200ms ease-in)
- Auto-dismiss: 3 seconds after display

MESSAGE ANIMATIONS:
- User message: slide from bottom-right (200ms)
- AI message: slide from bottom-left (200ms)
- No animation for streaming (performance)
```

### Button States

- **Advice:** "Buttons should behave like this: **[specific behaviour]**"

```
PRIMARY BUTTONS:
- Default: bg-primary, shadow-sm
- Hover: bg-primary-hover, scale(1.02), shadow-md (200ms ease)
- Active (click): scale(0.98) (100ms)
- Focus: ring-2 ring-primary ring-offset-2
- Disabled: opacity-50, cursor-not-allowed, no hover
- Loading: 
  * Show inline spinner (16px, left of text)
  * Change text to context-specific: "Generating...", "Saving...", 
    "Processing..." (never generic "Loading...")
  * Disable button
  * Keep same size (no layout shift)

SECONDARY BUTTONS:
- Default: border border-surface-elevated, bg-transparent
- Hover: bg-surface-elevated (200ms)
- Same active, focus, disabled as primary

GHOST BUTTONS:
- Default: transparent background
- Hover: bg-surface (200ms)
- Same active, focus, disabled as primary

ICON BUTTONS:
- 40x40px minimum (touch target)
- Hover: bg-surface + scale(1.05)
- Active: scale(0.95)
```

### Form Behaviour

- **Advice:** "For forms, implement: **[validation patterns]**"

```
INPUT VALIDATION:
- Validate on blur, not on every keystroke (reduces annoyance)
- Show success state: border-success + green checkmark icon (right side)
- Show error state: border-error + red X icon + error message below
  * Error messages specific: "Email should look like name@example.com" 
    NOT "Invalid email"
- Required fields: Red asterisk (*) next to label

SUBMIT BUTTON:
- Disabled until form is valid (opacity-50)
- Show which fields are blocking: red dot on invalid field labels
- On submit:
  * Change to loading state
  * Text: "Creating account..." (context-specific)
  * Disable all inputs
- On success:
  * Toast notification: "Account created successfully!"
  * Redirect or show next step
- On error:
  * Toast notification: "Failed to create account. [reason]"
  * Re-enable form
  * Focus on first error field

SPECIAL INPUTS:
- Password: Show/hide toggle (eye icon)
- File upload: Drag-drop zone with "Click to browse" fallback
  * Show preview for images
  * Show progress bar for large files (>1MB)
  * File size/type validation before upload
```

### Empty States

- **Advice:** "Handle empty states with: **[specific designs]**"

```
NO CONVERSATIONS:
- Centered card (max-w-md)
- Icon: Chat bubble illustration (simple, geometric)
- Headline: "No conversations yet"
- Description: "Start by asking a question or exploring AI Specialists"
- CTA: "Start New Chat" button (primary)

NO PROMPTS FOUND (search result):
- Same centered layout
- Icon: Magnifying glass
- Headline: "No prompts match your search"
- Description: "Try different keywords or browse by category"
- CTA: "Clear Search" button

NO FAVORITES:
- Icon: Heart outline
- Headline: "No favorite prompts yet"
- Description: "Click the heart icon on any prompt to save it here"
- No CTA needed

FAILED API CALL:
- Icon: Warning triangle (amber)
- Headline: "Something went wrong"
- Description: Clear error message
- CTA: "Try Again" button + "Contact Support" link

USAGE LIMIT REACHED:
- Icon: Lock
- Headline: "Daily limit reached"
- Description: "You've used all 50 queries today. Upgrade to Pro 
  for unlimited queries."
- CTA: "Upgrade to Pro" button (primary)
```

---

## Technical Architecture

Now the implementation details that matter for maintainability.

### Tech Stack

- **Advice:** "Build this using: **[specific technologies]**"

```
FRONTEND:
- React 19.0.0 with functional components and hooks
- TypeScript: NO (use JavaScript for faster development)
- Tailwind CSS 3.4+ with custom design tokens
- Shadcn/UI + Radix UI primitives
- Zustand for state management
- React Router DOM 7.5+ for routing
- Axios for API calls (with interceptors)
- Framer Motion for animations
- Lucide React for icons
- React Hook Form + Zod for form validation
- Sonner for toast notifications
- React Markdown for message rendering
- Prism.js for code syntax highlighting

BACKEND:
- FastAPI (Python 3.11+)
- Motor (async MongoDB driver)
- Pydantic for data validation
- JWT for authentication (python-jose)
- Bcrypt for password hashing
- Python-dotenv for environment variables
- Stripe Python SDK for payments
- Requests for external API calls
- AsyncIO for concurrent AI API calls

DATABASE:
- MongoDB 6.0+ (hosted or local)

AI INTEGRATIONS:
- OpenAI Python SDK (GPT-4o, GPT-4o Mini, GPT o1, o3 Mini)
- Anthropic Python SDK (Claude 3.5/3.7 Sonnet)
- Google Generative AI (Gemini models)
- DeepSeek API (direct HTTP requests)
- Fallback: Retry failed requests with exponential backoff

HOSTING:
- Frontend: Vercel or current Kubernetes setup
- Backend: Current Kubernetes (FastAPI on port 8001)
- Database: MongoDB Atlas or current local instance

PAYMENT:
- Stripe for subscription billing
- Stripe Checkout for payment flow
- Webhooks for subscription events
```

### Code Organisation

- **Advice:** "Structure the codebase using: **[patterns]**"

```
FRONTEND STRUCTURE:
/frontend/src/
├── components/
│   ├── ui/              (Shadcn components: button, input, card, etc.)
│   ├── layout/          (Header, Sidebar, Footer, MainLayout)
│   └── features/        (Domain components: ChatInput, MessageList, 
│                         SpecialistCard, PromptCard, etc.)
├── pages/
│   ├── LandingPage.js
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── DashboardPage.js
│   ├── ChatPage.js
│   ├── SpecialistsPage.js
│   ├── PromptsPage.js
│   ├── SettingsPage.js
│   └── PricingPage.js
├── stores/              (Zustand stores: authStore, chatStore, etc.)
├── hooks/               (Custom hooks: useAuth, useChat, useToast)
├── utils/               (Helpers: api.js, formatters.js, validators.js)
├── styles/              (Global CSS, Tailwind config)
└── App.js               (Root component with routes)

BACKEND STRUCTURE:
/backend/
├── server.py            (Main FastAPI app with all routes)
├── models/              (Pydantic models for request/response)
│   ├── user.py
│   ├── conversation.py
│   ├── prompt.py
│   └── subscription.py
├── services/            (Business logic)
│   ├── ai_service.py    (AI API integrations)
│   ├── auth_service.py  (JWT, bcrypt)
│   └── stripe_service.py
├── utils/               (Helpers, middleware)
└── requirements.txt

SHARED PRINCIPLES:
- Keep files under 300 lines (split if larger)
- Single responsibility per module
- No prop drilling (use Zustand for global state)
- Consistent naming: camelCase for JS, snake_case for Python
- Comments only for complex logic, not obvious code
```

### API Integration

- **Advice:** "For AI generation, use: **[specific approach]**"

```
For AI generation, use a unified AIService class:

STRUCTURE:
class AIService:
    async def chat(model: str, messages: list, stream: bool = False):
        # Route to appropriate AI provider
        # OpenAI, Anthropic, Google, DeepSeek
        
    async def compare_models(models: list, message: str):
        # Send same message to multiple models in parallel
        # Return all responses
        
    def get_available_models(user_tier: str):
        # Return models based on free vs pro
        
PROMPT ENGINEERING:
- Keep system prompts concise (under 200 words)
- Include output format instructions
- For specialists, define personality clearly
- Example (Nova):
  "You are Nova, an experienced Product Manager. You help write PRDs, 
  user stories, and roadmaps. You ask clarifying questions. Format 
  outputs with clear sections and bullet points. Be methodical and 
  structured."

ERROR HANDLING:
- Retry failed requests 3 times with exponential backoff (1s, 2s, 4s)
- If all retries fail, return error message to user
- Log errors for monitoring
- Fallback: Suggest trying different model

RATE LIMITING:
- Free users: 50 queries/day (tracked in MongoDB)
- Pro users: Unlimited (but respect API provider limits)
- If exceeded: Show upgrade prompt

STREAMING:
- Use Server-Sent Events (SSE) for real-time streaming
- Chunk size: 1-5 characters per event
- Close stream properly on completion or error
```

### Performance

- **Advice:** "Optimise for these metrics: **[targets]**"

```
PERFORMANCE TARGETS:
- Initial page load: <2 seconds (with caching)
- API response time: <1 second (excluding AI processing)
- AI response start (TTFB): <500ms
- Chat input lag: <50ms
- Navigation transitions: <200ms

OPTIMIZATION STRATEGIES:

FRONTEND:
1. Code splitting:
   - React.lazy() for pages: LandingPage, SpecialistsPage, PromptsPage
   - Dynamic imports for heavy components
   
2. Image optimization:
   - Use WebP format
   - Lazy load images below fold
   - Blur placeholder for avatars
   
3. Bundle optimization:
   - Tree-shaking (automatic with Create React App)
   - Minimize lodash imports (import specific functions)
   - No moment.js (use date-fns for smaller bundle)
   
4. Caching:
   - Cache API responses with React Query (stale-while-revalidate)
   - Cache conversations list (5 min TTL)
   - Cache prompts library (30 min TTL)

BACKEND:
1. Database optimization:
   - Index on: user_id, email, conversation.user_id
   - Limit conversation list to 100 most recent
   - Paginate prompts (24 per page)
   
2. Async everything:
   - Use async/await for all I/O operations
   - Parallel AI API calls for comparisons (asyncio.gather)
   
3. Caching:
   - Redis for session storage (if scaling needed)
   - Cache prompt library (rarely changes)

MONITORING:
- Track response times with middleware
- Log slow queries (>1s)
- Monitor AI API latency by provider
```

---

## Responsive Design & Mobile

Don't treat mobile as an afterthought.

### Breakpoints & Behaviour

- **Advice:** "Implement these specific responsive behaviours: **[mobile specs]**"

```
BREAKPOINTS (Tailwind):
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

MOBILE (<768px):
- Sidebar hidden by default
  * Hamburger menu in header (top-left)
  * Clicking opens sidebar as overlay (backdrop blur)
  * Close button inside sidebar
- Chat input: Full width, slightly larger (py-3)
- Quick action icons: 2 columns instead of 4
- Model comparison: Stacked vertically (not side-by-side)
- Specialist cards: 1 column
- Prompt cards: 1 column
- Messages: Slightly reduced padding

TABLET (768px - 1024px):
- Sidebar visible but narrower (200px)
- Chat input: Normal size
- Quick action icons: 3 columns
- Model comparison: 2 columns (third wraps below)
- Specialist cards: 2 columns
- Prompt cards: 2 columns

DESKTOP (>1024px):
- Sidebar full width (256px)
- All features at full capacity
- 3-column layouts where applicable
```

### Touch Targets

- **Advice:** "All interactive elements must: **[size requirements]**"

```
MINIMUM SIZES:
- Buttons: 44x44px (Apple HIG standard)
- Mobile buttons: 48x48px (extra padding)
- Icon buttons: 40x40px minimum
- Input fields: min-height 44px
- Checkboxes/radio: 24x24px (but clickable area 44x44px)

SPACING:
- Minimum 8px between touch targets
- Form fields: 16px vertical spacing on mobile (space-y-4)
- Button groups: 12px horizontal spacing on mobile

GESTURES:
- Swipe left on conversation to delete (future)
- Pull to refresh on conversation list (future)
- No complex gestures (keep it simple)
```

---

## Accessibility

Build this properly or don't build it at all.

### Keyboard Navigation

All interactive elements accessible via Tab. Modal: trap focus, Escape to close. Dropdowns: Arrow keys to navigate, Enter to select. Command palette: Cmd+K to open (future feature).

### Screen Reader Support

Every image has descriptive alt text: "Nova, Product Manager AI Specialist" not "avatar". All form inputs have associated `<label>` elements (not placeholder-only). Use semantic HTML: `<nav>`, `<main>`, `<article>`, not div soup. ARIA labels where needed: "Open chat with Nova", "Delete conversation".

### Visual Accessibility

Color contrast meets WCAG AA: 4.5:1 for normal text (test with tools). Focus states on all interactive elements: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`. Don't rely on color alone: use icons + text for status (not just green/red). Font size minimum 14px, line height minimum 1.5. Zoom support up to 200%.

### Heading Hierarchy

H1 once per page (page title). H2 for main sections. H3 for subsections. Never skip levels. Example: Dashboard H1 "Welcome back, [Name]", H2 "Quick Actions", H2 "Recent Conversations".

---

## Error Handling & Edge Cases

Handle the unhappy paths like a professional.

### Specific Error Scenarios

- **Advice:** "Handle these edge cases: **[list]**"

```
AI API FAILURES:
- Show: "Hmm, [Model] is taking a break. Try again or switch to 
  another model."
- Retry button (max 2 retries)
- Suggest alternative model
- Log error for monitoring

USAGE LIMIT REACHED (Free users):
- Modal: "Daily limit reached (50/50 queries used)"
- Message: "Come back tomorrow or upgrade to Pro for unlimited queries"
- CTA: "Upgrade to Pro" button
- Show reset time: "Resets in 8 hours"

AUTHENTICATION EXPIRED:
- Detect 401 response from API
- Show toast: "Your session expired. Please log in again."
- Redirect to login page
- Preserve current page URL for redirect after login

PAYMENT FAILURE:
- Email notification: "Your payment failed. Update your payment method."
- In-app banner: "Payment issue. Update payment method to keep Pro access."
- Grace period: 3 days before downgrade to free

FILE UPLOAD ERRORS:
- Too large (>10MB): "File too large. Max size: 10MB"
- Wrong format: "Only PDF, DOCX, TXT supported"
- Upload failed: "Upload failed. Check your connection and try again."

NETWORK TIMEOUT:
- Show: "Connection lost. Check your internet?"
- Auto-retry after 5s (exponential backoff: 5s, 10s, 20s)
- Max 3 retries, then show error

EMPTY SEARCH RESULTS:
- Show: "No prompts match '[query]'"
- Suggestions: "Try 'marketing', 'email', or 'content'"
- "Clear search" button

CONVERSATION LOAD FAILURE:
- Show: "Couldn't load conversations. Try refreshing."
- Refresh button
- If persists: "Contact support" link
```

### Loading States

- **Advice:** "Loading indicators should: **[specific design]**"

```
USE SKELETON SCREENS (not spinners) for:
- Conversation list: 5 gray rectangles with pulse
- Prompt cards: Grid of gray cards with pulse
- Message loading: Gray bubble with pulse
- Dashboard: Skeleton for quick actions, stats

USE SPINNERS for:
- Button loading states (inline, 16px)
- Full-page loading (centered, 32px)

CONTEXT-SPECIFIC MESSAGES:
- File upload: "Uploading... 45%"
- AI processing: "Thinking..." (with animated dots)
- Summarize: "Extracting content..." → "Analyzing..." → "Generating..."
- Model comparison: "Querying [model1], [model2], [model3]..."

Never generic "Loading..." — always show what's happening.

STREAMING RESPONSES:
- No loading indicator
- Just show characters appearing (typewriter effect implicit)
- Blinking cursor at end of current text
```

---

## Copy & Messaging Voice

UI copy sets the tone. Be human, not robotic.

### Tone & Examples

- **Advice:** "Use this specific voice for UI copy: **[examples]**"

```
VOICE: Friendly but professional, like a capable colleague. Clear, 
direct, helpful. Never patronizing or overly casual.

ERRORS:
- ❌ "ERROR: Request failed with status code 500"
- ✅ "Hmm, that didn't work. Give it another go?"

SUCCESS:
- ❌ "Operation completed successfully"
- ✅ "All set! Your conversation is saved."

EMPTY STATES:
- ❌ "No data available"
- ✅ "Nothing here yet. Let's fix that." + CTA

BUTTONS:
- ❌ "Submit", "OK", "Cancel"
- ✅ "Create account", "Got it", "Never mind"
- Context-specific: "Send message" not "Submit", 
  "Start comparison" not "Compare"

HELP TEXT:
- ❌ "Enter valid email address"
- ✅ "We'll send you a confirmation email"
- ❌ "Password must be 8+ characters"
- ✅ "Use at least 8 characters (the longer, the better)"

UPGRADE PROMPTS:
- ❌ "Upgrade required to access this feature"
- ✅ "This feature is Pro-only. Want to try it? Start your free trial."

LIMITS:
- ❌ "Limit exceeded"
- ✅ "You've used all 50 queries today. Upgrade for unlimited access?"

TONE GUIDELINES:
- Use contractions (we'll, you're, it's)
- Address user as "you" not "user"
- Be encouraging, not demanding
- Explain the "why" briefly
- Add personality without being annoying
- No emojis in error messages
- OK to use emojis in success messages: "All set! 🎉"
```

---

## Implementation Microsteps (250-300 Total Credits)

### Phase 1: Foundation (45-54 credits, 2-3 days)

**Microstep 1.1: Environment Setup (6-7 credits, 2 hours)**
- Initialize Git repository
- Set up project structure (backend/, frontend/, docs/)
- Configure .env files (backend and frontend)
- Install core dependencies (FastAPI, React, MongoDB, Tailwind)
- Create README.md
- First commit

**Microstep 1.2: Backend Foundation (8-9 credits, 3-4 hours)**
- Set up FastAPI with CORS middleware
- Configure MongoDB connection with Motor
- Create base Pydantic models (User, Conversation, Message)
- Implement /api route prefix
- Create health check endpoint: GET /api/health
- Test: curl http://localhost:8001/api/health

**Microstep 1.3: Frontend Foundation (8-9 credits, 3-4 hours)**
- Initialize React app with Tailwind CSS
- Install Shadcn/UI components
- Configure React Router
- Set up Zustand stores structure
- Configure Axios with base URL
- Create initial layout components (Header, Sidebar)

**Microstep 1.4: Authentication Backend (7-8 credits, 3 hours)**
- Create User model with password hashing (bcrypt)
- Implement JWT token generation
- Build auth endpoints: POST /api/auth/signup, POST /api/auth/login
- Add authentication middleware
- Test with curl

**Microstep 1.5: Authentication Frontend (7-8 credits, 3 hours)**
- Create authStore (Zustand)
- Build Login page and Signup page
- Implement token storage (localStorage)
- Create ProtectedRoute component
- Set up Axios interceptor for JWT
- Test: Sign up → Login → Access protected page

**Microstep 1.6: UI Foundation (8-9 credits, 3-4 hours)**
- Build layout: Header, Sidebar, MainLayout, Footer
- Create reusable components: Button, Input, Card, Modal, Toast
- Implement dark theme styling
- Add loading skeletons
- Test responsive design

### Phase 2: Core Chat (48-63 credits, 3-4 days)

**Microstep 2.1: AI API Setup (7-8 credits, 3-4 hours)**
- Obtain API keys (OpenAI, Anthropic, Google, DeepSeek)
- Create AIService class in backend
- Implement unified chat() method
- Add error handling and fallbacks
- Test with all 4 providers

**Microstep 2.2: Chat Backend API (8-9 credits, 4 hours)**
- Create Conversation and Message models
- Build endpoints: POST /api/chat, GET /api/conversations, 
  POST /api/conversations, DELETE /api/conversations/:id
- Implement usage tracking (queries/day)
- Add conversation title auto-generation
- Test with Postman

**Microstep 2.3: Chat UI Main Interface (9 credits, 4-5 hours)**
- Create chatStore (Zustand)
- Build ChatDashboard with greeting, 8 quick action icons
- Create ModelSelector dropdown with grouped models
- Build ChatInput component (textarea + file button + send)
- Create MessageList component with Markdown rendering
- Test: Send query → Receive response → Display in chat

**Microstep 2.4: Conversation Management UI (7-8 credits, 3 hours)**
- Build ConversationSidebar with list
- Create ConversationCard component
- Implement conversation selection
- Add "New Chat" button
- Add delete with confirmation
- Test: Create → Select → Delete conversation

**Microstep 2.5: Streaming Responses (8-9 credits, 3-4 hours)**
- Implement SSE endpoint: POST /api/chat/stream
- Create EventSource handler in frontend
- Build StreamingMessage component
- Add stop generation button
- Test: Send query → See streaming response

**Microstep 2.6: Multi-Model Comparison (9 credits, 4 hours)**
- Build comparison endpoint: POST /api/chat/compare
- Create ModelComparison component (3-column layout)
- Implement parallel API calls (asyncio.gather)
- Add voting mechanism
- Test: Compare GPT vs Claude vs Gemini

### Phase 3: AI Specialists (36-45 credits, 2-3 days)

**Microstep 3.1: Specialists Backend (7-8 credits, 3 hours)**
- Define specialist system prompts (Nova, Harper, Remy, Lennon, Emmerson)
- Create endpoints: GET /api/specialists, POST /api/specialists/:name/chat
- Implement specialist-specific chat handling
- Test: Chat with Nova → Verify personality in response

**Microstep 3.2: Specialists Gallery UI (7-8 credits, 3-4 hours)**
- Create SpecialistsPage with grid layout
- Build SpecialistCard with gradient backgrounds
- Design/implement avatar illustrations (5 specialists)
- Add hover effects
- Test: Navigate to specialists → See gallery

**Microstep 3.3: Specialist Chat Interface (7-8 credits, 3 hours)**
- Create SpecialistChat component
- Add specialist header with avatar
- Build suggested prompts section
- Integrate with chat API
- Test: Select Nova → Chat → See personality

**Microstep 3.4: Specialist Prompts (6-7 credits, 2-3 hours)**
- Write comprehensive system prompts for each specialist
- Define 5-7 suggested prompts per specialist
- Implement prompt templates with variables
- Test: Use suggested prompt → Verify output

**Microstep 3.5: Specialist Analytics (6-7 credits, 2-3 hours)**
- Track specialist usage in database
- Add rating mechanism
- Build SpecialistStats component
- Test: Use specialists → View analytics

### Phase 4: Content Tools (42-54 credits, 3-4 days)

**Microstep 4.1: Summarize Backend (7-8 credits, 3-4 hours)**
- Create endpoint: POST /api/summarize
- Implement URL content extraction (BeautifulSoup)
- Add file processing (PDF, DOCX, TXT)
- Integrate YouTube transcript API
- Test: Summarize article, video, PDF

**Microstep 4.2: Summarize Frontend (7-8 credits, 3 hours)**
- Create SummarizeTool component
- Build input type selector (URL, File, Text)
- Add file upload dropzone
- Create SummaryResult display
- Test: Upload file → Get summary

**Microstep 4.3: Generate Post Backend (7-8 credits, 3-4 hours)**
- Create endpoint: POST /api/generate-post
- Define platform-specific prompts (LinkedIn, Twitter, Instagram)
- Implement tone variations
- Generate 3 variants per request
- Test: Generate LinkedIn post → Verify 3 variants

**Microstep 4.4: Generate Post Frontend (7-8 credits, 3 hours)**
- Create GeneratePostTool component
- Build platform selector
- Create PostVariants display
- Add PostEditor for inline editing
- Test: Generate → Select variant → Edit → Copy

**Microstep 4.5: Extract Data Tool (7-8 credits, 3-4 hours)**
- Create backend endpoint: POST /api/extract-data
- Implement structured extraction (tables, stats, contacts)
- Build frontend component
- Add CSV export
- Test: Extract table from webpage

**Microstep 4.6: Create Chapters & Translate (6-7 credits, 2-3 hours)**
- Create Chapters: Backend + Frontend
- Translate: Backend + Frontend
- Test both tools

### Phase 5: Prompts Library (28-36 credits, 2 days)

**Microstep 5.1: Prompts Backend (8-9 credits, 4 hours)**
- Create Prompt model
- Seed database with 200+ prompts across 7 categories
- Build endpoints: GET /api/prompts (with filters, search, pagination)
- Track usage
- Test: Fetch prompts by category

**Microstep 5.2: Prompts Library UI (9 credits, 4 hours)**
- Create PromptsPage with grid layout
- Build PromptCard component
- Implement CategoryFilter
- Add SearchBar with debounce
- Create Pagination
- Test: Browse, search, filter prompts

**Microstep 5.3: Prompt Application (6-7 credits, 2-3 hours)**
- Implement prompt click → navigate to chat with pre-filled text
- Create PromptVariablesModal for variable handling
- Add favorites functionality
- Test: Click prompt → Fill variables → Apply to chat

**Microstep 5.4: Custom Prompts (5-6 credits, 2 hours)**
- Create CustomPromptModal (Pro feature)
- Implement CRUD for custom prompts
- Add "My Prompts" filter
- Test: Create custom prompt → Use it

### Phase 6: Subscription (36-45 credits, 2-3 days)

**Microstep 6.1: Stripe Setup (8-9 credits, 4 hours)**
- Create Stripe account, get API keys
- Install Stripe SDK
- Create plans in Stripe dashboard
- Implement webhook endpoint
- Test webhooks locally with Stripe CLI

**Microstep 6.2: Subscription Backend (7-8 credits, 3 hours)**
- Create subscription endpoints (checkout, cancel, reactivate, invoices)
- Implement trial logic (1-month free)
- Add usage enforcement (free: 50/day, pro: unlimited)
- Test: Create subscription → Check status

**Microstep 6.3: Pricing Page (7-8 credits, 3-4 hours)**
- Create PricingPage with comparison table
- Build CostComparison visual
- Add FAQ accordion
- Test: View pricing → Compare plans

**Microstep 6.4: Checkout Flow (7-8 credits, 3 hours)**
- Create CheckoutPage
- Integrate Stripe Checkout (redirect)
- Build SubscriptionSuccess page
- Test: Upgrade → Pay → See success

**Microstep 6.5: Subscription Management UI (6-7 credits, 2-3 hours)**
- Create SubscriptionSettings page
- Build BillingHistory component
- Implement cancellation flow
- Add upgrade banner for free users
- Test: View subscription → Cancel → Reactivate

### Phase 7: Landing Page (36-45 credits, 2-3 days)

**Microstep 7.1: Hero Section (8-9 credits, 4 hours)**
- Create LandingPage component
- Build HeroSection with gradient background
- Add floating AI model icons
- Implement CTAs
- Test: View landing → Click CTA

**Microstep 7.2: Problem/Solution (7-8 credits, 3 hours)**
- Create ProblemSection
- Build SolutionSection
- Add scroll animations
- Test: Scroll through sections

**Microstep 7.3: Features Showcase (9 credits, 4-5 hours)**
- Create FeaturesShowcase with tabs
- Add screenshots for each feature
- Build AI Specialists section
- Test: Navigate tabs

**Microstep 7.4: Pricing & CTA (7-8 credits, 3 hours)**
- Integrate pricing section
- Create FinalCTA
- Build Footer
- Test: Complete landing page flow

**Microstep 7.5: SEO & Performance (5-6 credits, 2-3 hours)**
- Add meta tags, Open Graph
- Optimize images (WebP, lazy load)
- Code splitting
- Add Google Analytics
- Test: Lighthouse score >90

### Phase 8: Polish (30-36 credits, 2 days)

**Microstep 8.1: User Dashboard (7-8 credits, 3-4 hours)**
- Create DashboardPage with stats
- Build UsageStats charts
- Add RecentConversations
- Test: View dashboard

**Microstep 8.2: User Settings (6-7 credits, 2-3 hours)**
- Create SettingsPage (Profile, Preferences, Security tabs)
- Implement all settings
- Test: Update profile, change preferences

**Microstep 8.3: Error Handling (6-7 credits, 3 hours)**
- Create error boundaries
- Build error pages (404, 500)
- Implement specific error scenarios
- Add loading states everywhere
- Test: Trigger errors → Verify messages

**Microstep 8.4: Onboarding (6-7 credits, 2-3 hours)**
- Create OnboardingWizard
- Add first-time tooltips
- Build WelcomeModal
- Test: New user flow

**Microstep 8.5: Testing & Fixes (5-6 credits, 3-4 hours)**
- Manual testing all flows
- Browser compatibility testing
- Responsive design testing
- Fix all bugs
- Performance optimization
- Final checks

---

## Launch Checklist

Before going live, ensure:

✅ All auth flows work (signup, login, logout, password reset)  
✅ All AI models respond correctly  
✅ Multi-model comparison functional  
✅ All 5 AI specialists working  
✅ All content tools functional (summarize, generate, extract, chapters, translate)  
✅ Prompts library searchable and categorized  
✅ Stripe integration working (test mode)  
✅ Usage limits enforced (free: 50/day)  
✅ All pages mobile-responsive  
✅ Loading states and error handling everywhere  
✅ SEO meta tags on all pages  
✅ Analytics tracking setup  
✅ Privacy Policy and Terms of Service written  
✅ 404 and 500 error pages  
✅ Performance: Lighthouse score >85  
✅ Accessibility: WCAG AA compliance  

---

## Post-Launch Growth Strategy

### Month 1: Launch & Validation
- ProductHunt launch (Day 1)
- Post on Twitter, LinkedIn, relevant subreddits
- Email beta users for testimonials
- Monitor for bugs and fix immediately
- Goal: 1,000 signups, 100 paid users

### Month 2-3: Content & SEO
- Publish 2 blog posts/week (comparison guides, how-tos)
- Start YouTube channel (tutorials, comparisons)
- Build backlinks through guest posting
- Submit to AI tool directories
- Goal: 5,000 signups, 500 paid users

### Month 4-6: Scale & Optimize
- Launch referral program
- Create affiliate program
- Paid advertising (Google, LinkedIn)
- Partnerships with productivity influencers
- Add team plans
- Goal: 15,000 signups, 2,000 paid users

### Key Metrics to Track
- Signup conversion rate (visitor → signup)
- Free → Pro conversion rate
- Trial → Paid conversion rate
- Churn rate (<5% target)
- MRR growth (15-20% month-over-month)
- DAU/MAU ratio (>30%)

---

**Document Complete**

This planning document provides the complete blueprint for building AllOutputs, structured exactly like the Planning.md format with clear advice sections, examples, and actionable implementation steps. Total estimated effort: 250-300 credits across 8 phases over 3-4 weeks of focused development.
