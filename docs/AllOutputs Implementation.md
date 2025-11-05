# AllOutputs Implementation Plan
## Ultra-Detailed Development Guide for Multi-AI Aggregator Platform

**Version:** 1.0  
**Date:** January 2025  
**Original Inspiration:** meetemily.ai  
**Brand Name:** AllOutputs  
**Domain:** alloutputs.com  
**Focus:** Web Application (Browser-based, no extension initially)

---

## DOCUMENT STRUCTURE

This implementation plan follows a **phased, vertical-slice approach** prioritizing frontend-first development while ensuring complete feature coverage. Each phase includes:

1. **Research & Ideation** → Deep understanding of requirements
2. **Requirements Analysis** → Clear specification of what to build
3. **System Design & Architecture** → Technical blueprint
4. **UI/UX Design & Mockups** → Visual and interaction design
5. **Vertical Slice Implementation** → Iterative feature development
6. **Integration Testing** → Automated validation
7. **Deployment & Monitoring** → Production readiness
8. **Maintenance & Continuous Iteration** → Ongoing improvements

**Vertical Slice Process (Repeated for Each Feature):**
```
1. Frontend UI Components (with mock data)
2. Backend API Operations (with mock responses)
3. Database Schema (real implementation)
4. Wire frontend → backend → database
5. Testing (automated with testing agent)
6. Move to next slice
```

**Microstep Credit Allocation:** Each microstep = 6-9 credits (~2-4 hours work)

---

## PHASE 1: RESEARCH & IDEATION

### Objective
Deep understanding of AllOutputs platform requirements, competitive landscape, and technical feasibility.

---

### Microstep 1.1: Competitive Analysis & Feature Audit (7 credits, 3 hours)

**Tasks:**
1. **Analyze meetemily.ai thoroughly:**
   - Document all user flows (signup → chat → specialists → prompts)
   - Screenshot every interface state
   - Test all features and interactions
   - Note micro-interactions and animations
   - Identify pain points in UX

2. **Research competitor platforms:**
   - Poe.com (multi-model chat)
   - Perplexity.ai (research-focused)
   - ChatGPT Plus (single model)
   - Claude Pro (single model)
   - Document pricing, features, UX patterns

3. **Create feature comparison matrix:**
   ```
   | Feature                  | Emily | Poe | Perplexity | AllOutputs Plan |
   |--------------------------|-------|-----|------------|-----------------|
   | Multi-model access       | ✓     | ✓   | ✗          | ✓               |
   | Model comparison         | ✓     | ✗   | ✗          | ✓               |
   | AI specialists           | ✓     | ✗   | ✗          | ✓               |
   | Content tools            | ✓     | ✗   | Limited    | ✓               |
   | Prompt library           | ✓     | ✓   | ✗          | ✓               |
   ```

4. **Document unique differentiators:**
   - Side-by-side model comparison (key feature)
   - Named AI specialists with personalities
   - Cost savings positioning ($19 vs $100)
   - All-in-one workspace concept

**Deliverables:**
- Competitive analysis document (PDF/MD)
- Feature gap analysis
- Opportunity identification

---

### Microstep 1.2: Technical Stack Research (7 credits, 3 hours)

**Tasks:**
1. **Frontend Technology Evaluation:**
   - **React 19** capabilities and benefits
   - **Tailwind CSS 3.4+** advanced patterns
   - **Zustand** vs Redux for state management
   - **Shadcn/UI** component library review
   - **Framer Motion** animation capabilities

2. **Backend Technology Assessment:**
   - **FastAPI** (Python 3.11+) performance characteristics
   - **Motor** (async MongoDB driver) capabilities
   - **JWT authentication** best practices
   - **Streaming response** implementation patterns

3. **AI Integration Research:**
   - **Emergent LLM Key** capabilities (OpenAI, Gemini support)
   - **OpenAI API** (GPT-4o Mini, GPT-4o) integration patterns
   - **Google Gemini API** integration
   - **Open-source models** (Llama 3.2, Gemma 3) via APIs
   - Streaming response implementation
   - Error handling and fallback strategies

4. **Database Selection:**
   - **MongoDB Atlas** vs local MongoDB
   - Document structure design
   - Index strategy
   - Scalability considerations

**Deliverables:**
- Technology stack justification document
- Integration feasibility report
- Risk assessment matrix

---

### Microstep 1.3: User Persona Deep Dive (6 credits, 2.5 hours)

**Tasks:**
1. **Refine target personas from planning doc:**
   - Content Creator (Sarah, 28-35)
   - Knowledge Worker (David, 32-42)
   - Researcher/Student (Emily, 22-30)
   - Business Professional (Michael, 35-50)
   - Entrepreneur (Lisa, 30-45)

2. **Create detailed user journey maps:**
   - Entry points (Google search, social media, referral)
   - First-time experience (signup → onboarding → first query)
   - Daily usage patterns
   - Feature discovery paths
   - Upgrade triggers

3. **Identify pain points & solutions:**
   ```
   Pain Point: "I pay $60/month for ChatGPT + Claude"
   Solution: AllOutputs @ $19/month with both models
   
   Pain Point: "I don't know which AI is best for my task"
   Solution: Side-by-side comparison feature
   
   Pain Point: "Writing PRDs takes 4 hours"
   Solution: Nova AI Specialist (Product Manager)
   ```

**Deliverables:**
- 5 detailed user persona sheets
- User journey maps (visual)
- Pain point → solution mapping

---

### Microstep 1.4: Information Architecture Design (8 credits, 3.5 hours)

**Tasks:**
1. **Create complete site map:**
   ```
   AllOutputs
   ├── Landing Page (/)
   │   ├── Hero Section
   │   ├── Problem/Solution
   │   ├── Cost Comparison
   │   ├── Features Showcase
   │   ├── AI Specialists Preview
   │   ├── Pricing (future)
   │   └── FAQ
   │
   ├── Authentication (/auth)
   │   ├── Signup (/signup)
   │   ├── Login (/login)
   │   └── Password Reset (/reset-password)
   │
   ├── Application (/app)
   │   ├── Dashboard (/app/dashboard)
   │   ├── Chat (/app/chat)
   │   │   ├── New Chat
   │   │   ├── Conversation History
   │   │   └── Model Comparison
   │   ├── AI Specialists (/app/specialists)
   │   │   ├── Specialist Gallery
   │   │   └── Specialist Chat (/app/specialists/:name)
   │   ├── Prompts Library (/app/prompts)
   │   ├── Content Tools (/app/tools)
   │   │   ├── Summarize (/app/tools/summarize)
   │   │   └── Generate Post (/app/tools/generate-post)
   │   └── Settings (/app/settings)
   │       ├── Profile
   │       ├── Preferences
   │       └── Privacy
   ```

2. **Design navigation hierarchy:**
   - **Primary:** Sidebar navigation (always visible)
   - **Secondary:** Top bar actions (New Chat, User menu)
   - **Tertiary:** Contextual actions (within features)

3. **Plan content categorization:**
   - Prompt categories (7 types)
   - Conversation organization (folders/tags)
   - AI Specialist grouping (by function)
   - Model grouping (Basic, Advanced, Reasoning)

**Deliverables:**
- Complete site map (visual diagram)
- Navigation structure document
- Content taxonomy

---

## PHASE 2: REQUIREMENTS ANALYSIS

### Objective
Create detailed, unambiguous specifications for every feature, following Rule 5 (Define Clear Application Architecture Before Coding).

---

### Microstep 2.1: Functional Requirements Specification (9 credits, 4 hours)

**Tasks:**
1. **Core Chat Functionality:**
   ```
   FR-001: User can select AI model from dropdown
   FR-002: User can type query and submit
   FR-003: System streams response character-by-character
   FR-004: User can copy, share, or regenerate response
   FR-005: Conversation auto-saves to history
   FR-006: User can create new conversation
   FR-007: User can delete conversation with confirmation
   FR-008: User can search conversation history
   ```

2. **Multi-Model Comparison:**
   ```
   FR-010: User can click "Compare Models" button
   FR-011: User selects 2-3 models from checklist
   FR-012: User enters single query
   FR-013: System sends query to all selected models in parallel
   FR-014: Responses display side-by-side in columns
   FR-015: User can vote for best response
   FR-016: System tracks model performance
   ```

3. **AI Specialists:**
   ```
   FR-020: User sees specialist gallery (3 initial: Nova, Remy, Lennon)
   FR-021: User clicks specialist card to open specialized chat
   FR-022: System loads specialist-specific system prompt
   FR-023: Chat displays specialist avatar and context
   FR-024: User can return to general chat anytime
   ```

4. **Content Tools:**
   ```
   FR-030: [Summarize] User inputs URL, text, or file
   FR-031: [Summarize] System extracts content and generates summary
   FR-032: [Summarize] Output shows key points, detailed summary, takeaways
   FR-033: [Generate Post] User selects platform (LinkedIn, Twitter)
   FR-034: [Generate Post] User inputs topic and tone
   FR-035: [Generate Post] System generates 3 variants
   FR-036: [Generate Post] User can edit and copy
   ```

5. **Prompts Library:**
   ```
   FR-040: User browses prompt cards in grid
   FR-041: User filters by category (7 categories)
   FR-042: User searches prompts by keyword
   FR-043: User clicks prompt to load in chat
   FR-044: System pre-fills chat with prompt template
   ```

**Deliverables:**
- Complete functional requirements document (50+ requirements)
- Requirement traceability matrix

---

### Microstep 2.2: Non-Functional Requirements (7 credits, 3 hours)

**Tasks:**
1. **Performance Requirements:**
   ```
   NFR-001: Page load time < 2 seconds (with caching)
   NFR-002: API response time < 1 second (excluding AI processing)
   NFR-003: AI response TTFB < 500ms
   NFR-004: Chat input lag < 50ms
   NFR-005: Conversation list loads < 800ms
   ```

2. **Scalability Requirements:**
   ```
   NFR-010: Support 10,000 concurrent users
   NFR-011: Handle 1M+ conversations in database
   NFR-012: Process 50 API requests/second
   NFR-013: Auto-scale backend on demand
   ```

3. **Security Requirements:**
   ```
   NFR-020: All data transmitted via HTTPS (TLS 1.3)
   NFR-021: Passwords hashed with bcrypt (10 rounds)
   NFR-022: JWT tokens expire after 7 days
   NFR-023: Rate limiting: 100 requests/minute per IP
   NFR-024: Input validation on all endpoints
   NFR-025: XSS and CSRF protection
   ```

4. **Accessibility Requirements:**
   ```
   NFR-030: WCAG 2.1 AA compliance
   NFR-031: Keyboard navigation for all features
   NFR-032: Screen reader support
   NFR-033: Color contrast ratio ≥ 4.5:1
   NFR-034: Minimum touch target 44x44px
   ```

5. **Browser Compatibility:**
   ```
   NFR-040: Chrome 120+ (primary)
   NFR-041: Firefox 120+
   NFR-042: Safari 17+
   NFR-043: Edge 120+
   NFR-044: Mobile Chrome/Safari
   ```

**Deliverables:**
- Non-functional requirements document
- Performance benchmarks

---

### Microstep 2.3: Data Model Specification (8 credits, 3.5 hours)

**Tasks (Following Rule 8: Create Explicit Data Models Before Implementation):**

1. **User Collection:**
   ```json
   {
     "_id": "uuid",
     "email": "user@example.com",
     "password_hash": "bcrypt_hash",
     "name": "John Doe",
     "profile_picture": "url_or_null",
     "subscription_tier": "free|pro",
     "subscription_status": "active|trial|cancelled|expired",
     "trial_end_date": "2025-02-05T00:00:00Z",
     "preferences": {
       "default_model": "gpt-4o-mini",
       "theme": "dark|light|system",
       "language": "en",
       "response_length": "concise|balanced|detailed",
       "tone": "professional|casual|technical"
     },
     "usage_stats": {
       "total_queries": 1245,
       "queries_this_month": 87,
       "favorite_model": "claude-3-7-sonnet"
     },
     "created_at": "2025-01-01T10:30:00Z",
     "updated_at": "2025-01-15T14:22:00Z"
   }
   ```

2. **Conversation Collection:**
   ```json
   {
     "_id": "uuid",
     "user_id": "uuid",
     "title": "Product Roadmap Q2 2025",
     "messages": [
       {
         "id": "msg_uuid",
         "role": "user|assistant",
         "content": "Message text...",
         "model": "gpt-4o-mini",
         "timestamp": "2025-01-15T14:30:00Z",
         "tokens_used": 450
       }
     ],
     "ai_specialist": "nova|remy|lennon|null",
     "tags": ["product", "planning"],
     "is_favorite": false,
     "folder": "Work",
     "created_at": "2025-01-15T14:30:00Z",
     "last_message_at": "2025-01-15T15:45:00Z"
   }
   ```

3. **Prompt Collection:**
   ```json
   {
     "_id": "uuid",
     "title": "Writing Video Descriptions",
     "description": "Crafts compelling content tailored to target audience...",
     "category": "marketing|content_writing|business|career|creative|tech|data",
     "prompt_text": "Write a compelling video description for {topic}...",
     "variables": ["{topic}", "{audience}"],
     "icon": "video-icon",
     "color": "#a855f7",
     "is_premium": false,
     "usage_count": 1234,
     "created_at": "2025-01-01T00:00:00Z"
   }
   ```

4. **Model Comparison Collection:**
   ```json
   {
     "_id": "uuid",
     "user_id": "uuid",
     "query": "Explain quantum computing in simple terms",
     "models": ["gpt-4o", "claude-3-7-sonnet", "gemini-2-5-pro"],
     "responses": [
       {
         "model": "gpt-4o",
         "response": "Quantum computing is...",
         "response_time": 2.3,
         "tokens_used": 380,
         "quality_score": 4.5
       }
     ],
     "winner": "claude-3-7-sonnet",
     "created_at": "2025-01-15T16:00:00Z"
   }
   ```

5. **Database Indexes:**
   ```
   users:
     - email (unique)
     - subscription_tier
   
   conversations:
     - user_id
     - created_at (descending)
     - ai_specialist
     - tags
   
   prompts:
     - category
     - usage_count (descending)
     - title (text index for search)
   
   model_comparisons:
     - user_id
     - created_at (descending)
   ```

**Deliverables:**
- Complete data model document with sample data
- Database schema diagram
- Index strategy document

---

### Microstep 2.4: API Contract Definition (9 credits, 4 hours)

**Tasks (Following Rule 5: Define API Contract Before Implementation):**

1. **Authentication Endpoints:**
   ```
   POST /api/auth/signup
   Request:
   {
     "email": "user@example.com",
     "password": "SecurePass123!",
     "name": "John Doe"
   }
   Response (201):
   {
     "success": true,
     "data": {
       "user": {
         "id": "uuid",
         "email": "user@example.com",
         "name": "John Doe"
       },
       "token": "jwt_token"
     }
   }
   
   POST /api/auth/login
   Request:
   {
     "email": "user@example.com",
     "password": "SecurePass123!"
   }
   Response (200):
   {
     "success": true,
     "data": {
       "user": {...},
       "token": "jwt_token"
     }
   }
   ```

2. **Chat Endpoints:**
   ```
   POST /api/chat
   Headers: { Authorization: "Bearer jwt_token" }
   Request:
   {
     "conversation_id": "uuid_or_null",
     "model": "gpt-4o-mini",
     "message": "Explain quantum computing",
     "stream": false
   }
   Response (200):
   {
     "success": true,
     "data": {
       "message_id": "uuid",
       "conversation_id": "uuid",
       "response": "Quantum computing is...",
       "tokens_used": 450,
       "model": "gpt-4o-mini"
     }
   }
   
   GET /api/conversations
   Headers: { Authorization: "Bearer jwt_token" }
   Response (200):
   {
     "success": true,
     "data": {
       "conversations": [
         {
           "id": "uuid",
           "title": "Product Roadmap Q2 2025",
           "last_message_at": "2025-01-15T15:45:00Z",
           "message_count": 12
         }
       ]
     }
   }
   ```

3. **AI Specialist Endpoints:**
   ```
   GET /api/specialists
   Response (200):
   {
     "success": true,
     "data": {
       "specialists": [
         {
           "id": "nova",
           "name": "Nova",
           "role": "Product Manager",
           "description": "Helps with PRDs and feature specs",
           "avatar_url": "/avatars/nova.png",
           "color": "#f97316"
         }
       ]
     }
   }
   
   POST /api/specialists/:name/chat
   Request:
   {
     "conversation_id": "uuid_or_null",
     "message": "Write a PRD for user authentication"
   }
   Response: Same as /api/chat but with specialist context
   ```

4. **Content Tools Endpoints:**
   ```
   POST /api/tools/summarize
   Request:
   {
     "type": "url|text|file",
     "content": "https://example.com/article or text content",
     "length": "short|medium|long"
   }
   Response (200):
   {
     "success": true,
     "data": {
       "summary": {
         "key_points": ["Point 1", "Point 2"],
         "detailed_summary": "Full summary text...",
         "takeaways": ["Action 1", "Action 2"]
       }
     }
   }
   
   POST /api/tools/generate-post
   Request:
   {
     "platform": "linkedin|twitter",
     "topic": "AI productivity tips",
     "tone": "professional|casual",
     "length": "short|medium|long"
   }
   Response (200):
   {
     "success": true,
     "data": {
       "variants": [
         {
           "id": 1,
           "content": "Post content...",
           "character_count": 285,
           "hashtags": ["#AI", "#Productivity"]
         }
       ]
     }
   }
   ```

5. **Prompts Endpoints:**
   ```
   GET /api/prompts?category=marketing&search=email&page=1&limit=24
   Response (200):
   {
     "success": true,
     "data": {
       "prompts": [...],
       "total": 87,
       "page": 1,
       "pages": 4
     }
   }
   ```

6. **Error Response Format (Consistent across all endpoints):**
   ```
   Response (400/401/404/500):
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid email format",
       "details": {
         "field": "email",
         "constraint": "format"
       }
     }
   }
   ```

**Deliverables:**
- Complete API documentation (OpenAPI/Swagger format)
- Request/response examples for all endpoints
- Error code reference

---

## PHASE 3: SYSTEM DESIGN & ARCHITECTURE

### Objective
Create comprehensive technical architecture following Rule 5 (Define Clear Application Architecture Before Coding).

---

### Microstep 3.1: Architecture Diagram & Data Flow (8 credits, 3.5 hours)

**Tasks:**

1. **High-Level System Architecture:**
   ```
   ┌─────────────────────────────────────────────────────────┐
   │                        Browser                          │
   │  ┌──────────────────────────────────────────────────┐  │
   │  │         React Frontend (Port 3000)               │  │
   │  │  - Components, Pages, Zustand Stores             │  │
   │  │  - Axios API Client, React Router                │  │
   │  └──────────────────┬───────────────────────────────┘  │
   └─────────────────────┼───────────────────────────────────┘
                         │ HTTPS
                         │
   ┌─────────────────────▼───────────────────────────────────┐
   │           Kubernetes Ingress Controller                 │
   │  - Routes /api/* → Backend (8001)                       │
   │  - Routes /* → Frontend (3000)                          │
   └─────────────────────┬───────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
   ┌────────▼────────┐      ┌────────▼────────┐
   │  FastAPI Backend│      │   Frontend      │
   │   (Port 8001)   │      │ Static Server   │
   │  - JWT Auth     │      │  (Port 3000)    │
   │  - API Routes   │      └─────────────────┘
   │  - AI Service   │
   └────────┬────────┘
            │
            ├─────────────────────┬──────────────────┬──────────────────┐
            │                     │                  │                  │
   ┌────────▼────────┐   ┌───────▼────────┐ ┌──────▼─────────┐ ┌─────▼──────┐
   │    MongoDB      │   │  OpenAI API    │ │  Google Gemini │ │ Open Source│
   │  (Port 27017)   │   │  (via Emergent │ │   API (via     │ │  Models    │
   │  - Users        │   │   LLM Key)     │ │   Emergent)    │ │  (Llama,   │
   │  - Conversations│   │  - GPT-4o Mini │ │  - Gemini Pro  │ │   Gemma)   │
   │  - Prompts      │   │  - GPT-4o      │ │  - Gemini Flash│ │            │
   └─────────────────┘   └────────────────┘ └────────────────┘ └────────────┘
   ```

2. **User Authentication Flow:**
   ```
   User → Frontend (Login Form)
        → POST /api/auth/login
        → Backend validates credentials
        → Bcrypt verifies password hash
        → Generate JWT token (7-day expiry)
        → Return token to Frontend
        → Frontend stores in localStorage
        → All subsequent requests include: Authorization: Bearer {token}
        → Backend middleware validates JWT on protected routes
   ```

3. **Chat Interaction Flow:**
   ```
   User Types Message → Frontend
        → POST /api/chat
        → Backend AIService routes to appropriate model
        → If OpenAI: Use Emergent LLM Key → OpenAI API
        → If Gemini: Use Emergent LLM Key → Google API
        → If Llama/Gemma: Direct API call
        → Stream response back to Frontend (SSE)
        → Frontend displays character-by-character
        → Save to MongoDB conversations collection
        → Update usage stats
   ```

4. **Model Comparison Flow:**
   ```
   User Selects 3 Models → POST /api/chat/compare
        → Backend creates 3 parallel async tasks
        → Task 1: Call Model A
        → Task 2: Call Model B
        → Task 3: Call Model C
        → asyncio.gather() waits for all
        → Return all 3 responses
        → Frontend displays side-by-side
        → User votes on best response
        → Update model performance stats
   ```

5. **Content Tool (Summarize) Flow:**
   ```
   User Inputs URL → POST /api/tools/summarize
        → Backend extracts content (BeautifulSoup/requests)
        → Send to GPT-4o Mini with summarization prompt
        → Receive structured summary
        → Parse into key_points, detailed_summary, takeaways
        → Return formatted response
        → Frontend displays in summary card
   ```

**Deliverables:**
- Architecture diagram (draw.io or Mermaid)
- Data flow diagrams for all major features
- Component interaction diagram

---

### Microstep 3.2: Component Architecture Design (9 credits, 4 hours)

**Tasks (Following Rule 4: Use Modular Architecture for Frontend):**

1. **Frontend Component Hierarchy:**
   ```
   src/
   ├── components/
   │   ├── ui/                          # Shadcn/UI components
   │   │   ├── Button.jsx
   │   │   ├── Input.jsx
   │   │   ├── Card.jsx
   │   │   ├── Modal.jsx
   │   │   ├── Dropdown.jsx
   │   │   ├── Toast.jsx
   │   │   └── Skeleton.jsx
   │   │
   │   ├── layout/                      # Layout components
   │   │   ├── Header.jsx               # Top bar with logo, New Chat
   │   │   ├── Sidebar.jsx              # Navigation menu
   │   │   ├── MainLayout.jsx           # Wrapper with sidebar + content
   │   │   └── Footer.jsx               # Footer (for landing page)
   │   │
   │   └── features/                    # Domain-specific components
   │       ├── chat/
   │       │   ├── ChatDashboard.jsx    # Greeting + quick actions
   │       │   ├── ChatInput.jsx        # Text area + send button
   │       │   ├── MessageList.jsx      # Scrollable messages
   │       │   ├── Message.jsx          # Single message bubble
   │       │   ├── ModelSelector.jsx    # Dropdown for model selection
   │       │   ├── ConversationList.jsx # Sidebar conversation history
   │       │   └── ComparisonView.jsx   # 3-column comparison
   │       │
   │       ├── specialists/
   │       │   ├── SpecialistGallery.jsx # Grid of specialist cards
   │       │   ├── SpecialistCard.jsx    # Individual specialist
   │       │   └── SpecialistChat.jsx    # Specialized chat interface
   │       │
   │       ├── prompts/
   │       │   ├── PromptLibrary.jsx     # Main prompts page
   │       │   ├── PromptCard.jsx        # Single prompt card
   │       │   ├── CategoryFilter.jsx    # Category tabs
   │       │   └── SearchBar.jsx         # Search input
   │       │
   │       └── tools/
   │           ├── SummarizeTool.jsx     # Summarization interface
   │           ├── GeneratePostTool.jsx  # Post generation
   │           └── ToolResult.jsx        # Display tool output
   │
   ├── pages/
   │   ├── LandingPage.jsx              # Public homepage
   │   ├── LoginPage.jsx                # Login form
   │   ├── SignupPage.jsx               # Signup form
   │   ├── DashboardPage.jsx            # Main app dashboard
   │   ├── ChatPage.jsx                 # Chat interface
   │   ├── SpecialistsPage.jsx          # AI specialists
   │   ├── PromptsPage.jsx              # Prompts library
   │   ├── ToolsPage.jsx                # Content tools
   │   └── SettingsPage.jsx             # User settings
   │
   ├── stores/                          # Zustand state management
   │   ├── authStore.js                 # User auth state
   │   ├── chatStore.js                 # Chat state
   │   ├── specialistStore.js           # Specialist state
   │   ├── promptStore.js               # Prompts state
   │   └── uiStore.js                   # UI state (theme, modals)
   │
   ├── hooks/                           # Custom React hooks
   │   ├── useAuth.js                   # Auth operations
   │   ├── useChat.js                   # Chat operations
   │   ├── useToast.js                  # Toast notifications
   │   └── useDebounce.js               # Debounce utility
   │
   ├── utils/                           # Utility functions
   │   ├── api.js                       # Axios API client
   │   ├── formatters.js                # Date, text formatters
   │   └── validators.js                # Input validation
   │
   ├── styles/
   │   ├── globals.css                  # Global styles
   │   └── tailwind.css                 # Tailwind imports
   │
   ├── App.jsx                          # Root component
   └── main.jsx                         # Entry point
   ```

2. **Backend Module Structure:**
   ```
   backend/
   ├── server.py                        # Main FastAPI app
   │   ├── CORS configuration
   │   ├── All route definitions
   │   ├── MongoDB connection
   │   └── Middleware
   │
   ├── models/                          # Pydantic models
   │   ├── user.py                      # User schemas
   │   ├── conversation.py              # Conversation schemas
   │   ├── prompt.py                    # Prompt schemas
   │   └── response.py                  # API response schemas
   │
   ├── services/                        # Business logic
   │   ├── ai_service.py                # AI model integrations
   │   │   ├── chat(model, messages)
   │   │   ├── compare_models()
   │   │   ├── stream_response()
   │   │   └── get_available_models()
   │   │
   │   ├── auth_service.py              # Authentication
   │   │   ├── hash_password()
   │   │   ├── verify_password()
   │   │   ├── create_jwt()
   │   │   └── verify_jwt()
   │   │
   │   └── content_service.py           # Content tools
   │       ├── summarize_content()
   │       ├── generate_post()
   │       └── extract_url_content()
   │
   ├── utils/                           # Helper functions
   │   ├── database.py                  # MongoDB connection
   │   ├── middleware.py                # Auth middleware
   │   └── validators.py                # Input validation
   │
   ├── requirements.txt                 # Python dependencies
   └── .env                             # Environment variables
   ```

3. **State Management Architecture (Zustand):**
   ```javascript
   // authStore.js
   {
     user: null,
     token: null,
     isAuthenticated: false,
     login: async (email, password) => { ... },
     signup: async (email, password, name) => { ... },
     logout: () => { ... },
     loadUser: async () => { ... }
   }
   
   // chatStore.js
   {
     conversations: [],
     currentConversation: null,
     messages: [],
     selectedModel: 'gpt-4o-mini',
     isLoading: false,
     sendMessage: async (message) => { ... },
     compareModels: async (models, message) => { ... },
     loadConversations: async () => { ... },
     deleteConversation: async (id) => { ... }
   }
   ```

**Deliverables:**
- Complete component hierarchy diagram
- State management flow diagram
- Module responsibility documentation

---

### Microstep 3.3: Security Architecture (7 credits, 3 hours)

**Tasks (Following Rules 86-92: Security Best Practices):**

1. **Authentication Security:**
   ```python
   # Password Hashing (Rule 91)
   from passlib.context import CryptContext
   pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
   
   # Hashing
   hashed = pwd_context.hash(password)  # 10 rounds bcrypt
   
   # Verification
   is_valid = pwd_context.verify(password, hashed)
   
   # JWT Token Generation
   from jose import jwt
   import datetime
   
   token_data = {
       "user_id": str(user.id),
       "email": user.email,
       "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
   }
   token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
   ```

2. **Input Validation (Rule 34):**
   ```python
   from pydantic import BaseModel, EmailStr, validator
   
   class SignupRequest(BaseModel):
       email: EmailStr
       password: str
       name: str
       
       @validator('password')
       def validate_password(cls, v):
           if len(v) < 8:
               raise ValueError('Password must be at least 8 characters')
           if not any(c.isupper() for c in v):
               raise ValueError('Password must contain uppercase letter')
           if not any(c.isdigit() for c in v):
               raise ValueError('Password must contain number')
           return v
   ```

3. **API Security Headers (Rule 90):**
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   
   @app.middleware("http")
   async def add_security_headers(request, call_next):
       response = await call_next(request)
       response.headers["X-Content-Type-Options"] = "nosniff"
       response.headers["X-Frame-Options"] = "DENY"
       response.headers["X-XSS-Protection"] = "1; mode=block"
       response.headers["Strict-Transport-Security"] = \
           "max-age=31536000; includeSubDomains"
       response.headers["Content-Security-Policy"] = "default-src 'self'"
       return response
   ```

4. **Rate Limiting (Rule 45):**
   ```python
   from slowapi import Limiter
   from slowapi.util import get_remote_address
   
   limiter = Limiter(key_func=get_remote_address)
   
   @app.post("/api/auth/login")
   @limiter.limit("5 per minute")  # Prevent brute force
   async def login(request: Request):
       ...
   
   @app.post("/api/chat")
   @limiter.limit("100 per minute")  # General rate limit
   async def chat(request: Request):
       ...
   ```

5. **CORS Configuration (Rule 40):**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "https://alloutputs.com",
           "http://localhost:3000"  # Development only
       ],
       allow_credentials=True,
       allow_methods=["GET", "POST", "PUT", "DELETE"],
       allow_headers=["Authorization", "Content-Type"],
       max_age=3600
   )
   ```

**Deliverables:**
- Security implementation guide
- Threat model document
- Security checklist

---

### Microstep 3.4: Database Design & Indexing (8 credits, 3.5 hours)

**Tasks (Following Rule 12: Define Relationships and Constraints at Database Level):**

1. **MongoDB Collections Design:**
   ```javascript
   // users collection
   {
     _id: ObjectId,  // Auto-generated
     email: String,  // UNIQUE index
     password_hash: String,
     name: String,
     profile_picture: String,
     subscription_tier: String,  // "free" | "pro"
     preferences: Object,
     usage_stats: Object,
     created_at: ISODate,
     updated_at: ISODate
   }
   
   // conversations collection
   {
     _id: ObjectId,
     user_id: String,  // Index for queries
     title: String,
     messages: Array,  // Embedded messages
     ai_specialist: String,
     tags: Array,
     is_favorite: Boolean,
     folder: String,
     created_at: ISODate,
     last_message_at: ISODate  // Index for sorting
   }
   ```

2. **Index Strategy:**
   ```python
   # In database.py
   async def create_indexes():
       # Users
       await users_collection.create_index("email", unique=True)
       await users_collection.create_index("subscription_tier")
       
       # Conversations
       await conversations_collection.create_index("user_id")
       await conversations_collection.create_index(
           [("last_message_at", -1)]  # Descending for recent first
       )
       await conversations_collection.create_index("ai_specialist")
       await conversations_collection.create_index("tags")
       
       # Prompts
       await prompts_collection.create_index("category")
       await prompts_collection.create_index(
           [("usage_count", -1)]
       )
       await prompts_collection.create_index(
           [("title", "text"), ("description", "text")]  # Full-text search
       )
   ```

3. **Database Connection Management:**
   ```python
   from motor.motor_asyncio import AsyncIOMotorClient
   import os
   
   MONGO_URL = os.environ.get("MONGO_URL")
   client = AsyncIOMotorClient(MONGO_URL)
   db = client["alloutputs"]
   
   # Collections
   users_collection = db["users"]
   conversations_collection = db["conversations"]
   prompts_collection = db["prompts"]
   model_comparisons_collection = db["model_comparisons"]
   ```

4. **Data Validation Rules:**
   ```python
   # MongoDB Schema Validation (optional but recommended)
   users_validator = {
       "$jsonSchema": {
           "bsonType": "object",
           "required": ["email", "password_hash", "name"],
           "properties": {
               "email": {
                   "bsonType": "string",
                   "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
               },
               "subscription_tier": {
                   "enum": ["free", "pro"]
               }
           }
       }
   }
   ```

**Deliverables:**
- Database schema document
- Index strategy document
- Query optimization guide

---

## PHASE 4: UI/UX DESIGN & MOCKUPS

### Objective
Create detailed visual designs and interaction patterns before implementation (Rule 4: Design Component Structure Before Implementation).

---

### Microstep 4.1: Design System Definition (9 credits, 4 hours)

**Tasks:**

1. **Color Palette (Exact Values):**
   ```css
   /* Primary Colors */
   --background: #0f0f10;          /* Near black */
   --surface: #1a1a1b;             /* Dark gray cards */
   --surface-elevated: #2d2d2f;    /* Hover states */
   --primary: #4f46e5;             /* Indigo-600 for CTAs */
   --primary-hover: #4338ca;       /* Indigo-700 */
   --primary-light: #818cf8;       /* Indigo-400 for accents */
   
   /* Text Colors */
   --text-primary: #e5e7eb;        /* Gray-200 main text */
   --text-secondary: #9ca3af;      /* Gray-400 labels */
   --text-muted: #6b7280;          /* Gray-500 placeholders */
   
   /* Functional Colors */
   --success: #10b981;             /* Emerald-500 */
   --error: #ef4444;               /* Red-500 */
   --warning: #f59e0b;             /* Amber-500 */
   --info: #3b82f6;                /* Blue-500 */
   
   /* AI Specialist Colors */
   --nova: #f97316;                /* Orange-500 */
   --remy: #3b82f6;                /* Blue-500 */
   --lennon: #a855f7;              /* Purple-500 */
   
   /* Borders */
   --border-default: #2d2d2f;
   --border-elevated: #404040;
   ```

2. **Typography System:**
   ```css
   /* Font Families */
   --font-heading: 'Manrope', sans-serif;
   --font-body: 'Inter', sans-serif;
   --font-mono: 'JetBrains Mono', monospace;
   
   /* Font Sizes (Responsive with clamp) */
   --text-h1: clamp(2.5rem, 5vw, 3.75rem);     /* 40-60px */
   --text-h2: clamp(2rem, 4vw, 3rem);          /* 32-48px */
   --text-h3: clamp(1.5rem, 3vw, 2.25rem);     /* 24-36px */
   --text-h4: clamp(1.25rem, 2.5vw, 1.875rem); /* 20-30px */
   --text-body: 1rem;                           /* 16px */
   --text-small: 0.875rem;                      /* 14px */
   --text-tiny: 0.75rem;                        /* 12px */
   
   /* Font Weights */
   --weight-regular: 400;
   --weight-medium: 500;
   --weight-semibold: 600;
   --weight-bold: 700;
   
   /* Line Heights */
   --leading-tight: 1.25;
   --leading-normal: 1.5;
   --leading-relaxed: 1.75;
   
   /* Letter Spacing */
   --tracking-tight: -0.025em;     /* Headings */
   --tracking-normal: 0;           /* Body */
   --tracking-wide: 0.05em;        /* Uppercase labels */
   ```

3. **Spacing System (4px Grid):**
   ```
   p-1  = 4px
   p-2  = 8px
   p-3  = 12px
   p-4  = 16px
   p-6  = 24px
   p-8  = 32px
   p-10 = 40px
   p-12 = 48px
   p-16 = 64px
   p-20 = 80px
   ```

4. **Component Styles:**
   ```css
   /* Buttons */
   .btn-primary {
     background: var(--primary);
     color: white;
     padding: 0.5rem 1rem;      /* py-2 px-4 */
     border-radius: 0.375rem;   /* rounded-md */
     font-weight: 500;
     transition: all 200ms ease-out;
   }
   .btn-primary:hover {
     background: var(--primary-hover);
     transform: scale(1.02);
     box-shadow: 0 4px 6px rgba(0,0,0,0.1);
   }
   
   /* Cards */
   .card {
     background: var(--surface);
     border-radius: 0.5rem;     /* rounded-lg */
     padding: 1.5rem;           /* p-6 */
     box-shadow: 0 1px 3px rgba(0,0,0,0.1);
   }
   .card:hover {
     transform: translateY(-2px);
     box-shadow: 0 4px 6px rgba(0,0,0,0.1);
   }
   
   /* Inputs */
   .input {
     background: var(--surface);
     border: 1px solid var(--border-default);
     border-radius: 0.375rem;
     padding: 0.5rem 0.75rem;
     color: var(--text-primary);
   }
   .input:focus {
     outline: none;
     border-color: var(--primary);
     box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
   }
   ```

5. **Animation Presets:**
   ```javascript
   // Framer Motion variants
   export const pageTransition = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: -20 },
     transition: { duration: 0.2, ease: 'easeOut' }
   };
   
   export const cardStagger = {
     container: {
       animate: { transition: { staggerChildren: 0.1 } }
     },
     item: {
       initial: { opacity: 0, y: 20 },
       animate: { opacity: 1, y: 0 }
     }
   };
   
   export const modalAnimation = {
     backdrop: {
       initial: { opacity: 0 },
       animate: { opacity: 1 },
       exit: { opacity: 0 }
     },
     content: {
       initial: { opacity: 0, scale: 0.95 },
       animate: { opacity: 1, scale: 1 },
       exit: { opacity: 0, scale: 0.95 }
     }
   };
   ```

**Deliverables:**
- Complete design system document (PDF)
- Tailwind config file
- CSS variables file
- Framer Motion animation library

---

### Microstep 4.2: Landing Page Mockup (8 credits, 3.5 hours)

**Tasks:**

1. **Hero Section Design:**
   ```
   ┌────────────────────────────────────────────────────────────┐
   │  [AllOutputs Logo]           [Sign Up] [Pricing]           │
   ├────────────────────────────────────────────────────────────┤
   │                                                            │
   │          Every AI Model. One Platform. Infinite Outputs   │
   │                                                            │
   │      The only platform where Claude, GPT, Gemini          │
   │              compete for your answer                       │
   │                                                            │
   │     [Start Free Trial]    [See Pricing]                   │
   │                                                            │
   │     [GPT Logo] [Claude Logo] [Gemini Logo] [DeepSeek]     │
   │              (floating with subtle glow)                   │
   │                                                            │
   │  Background: Dark (#0f0f10) with purple-blue gradient     │
   │  Particle effects (subtle stars)                           │
   └────────────────────────────────────────────────────────────┘
   ```

2. **Problem Statement Section:**
   ```
   ┌────────────────────────────────────────────────────────────┐
   │  Your browser should be your superpower.                   │
   │  Instead, it's become digital quicksand.                   │
   │                                                            │
   │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
   │  │ Multiple │  │  Ideas   │  │  Hours   │               │
   │  │   Tabs   │  │ Trapped  │  │  Lost    │               │
   │  │   Chaos  │  │ Between  │  │Searching │               │
   │  │          │  │Platforms │  │          │               │
   │  └──────────┘  └──────────┘  └──────────┘               │
   └────────────────────────────────────────────────────────────┘
   ```

3. **Cost Comparison Section:**
   ```
   ┌───────────────────────┐      ┌───────────────────────┐
   │  Without AllOutputs   │      │   With AllOutputs     │
   ├───────────────────────┤      ├───────────────────────┤
   │  ChatGPT: $20/month   │      │  All three: ✓         │
   │  Claude:  $40/month   │      │                       │
   │  Gemini:  $40/month   │      │  Only $19/month       │
   ├───────────────────────┤      ├───────────────────────┤
   │  Total: $100/month    │      │  Save $80/month! 💰   │
   └───────────────────────┘      └───────────────────────┘
   ```

4. **Features Showcase (Tabbed):**
   ```
   [Chat] [Summarize] [Generate Post] [AI Specialists]
   
   ┌────────────────────────────────────────────────────────────┐
   │                                                            │
   │  [Large Browser Mockup showing feature in action]         │
   │   - Realistic UI                                           │
   │   - Actual interface elements                              │
   │   - Example content                                        │
   │                                                            │
   │  Feature headline with benefit                             │
   │  2-3 sentences describing feature                          │
   │                                                            │
   └────────────────────────────────────────────────────────────┘
   ```

**Deliverables:**
- Landing page wireframes (Figma/Sketch)
- High-fidelity mockups
- Interaction annotations

---

### Microstep 4.3: Application UI Mockups (9 credits, 4 hours)

**Tasks:**

1. **Chat Dashboard Mockup:**
   ```
   ┌──────────────────────────────────────────────────────────────┐
   │ ☰ AllOutputs                              [≡ New Chat]       │
   ├─────────┬────────────────────────────────────────────────────┤
   │         │                                                    │
   │  Chat   │     Hi [Name], How Can I Help You Today?         │
   │         │                                                    │
   │ Prompts │   ┌──────────┐ ┌──────────┐ ┌──────────┐        │
   │         │   │ Compare  │ │Summarize │ │Summarize │        │
   │   AI    │   │  Models  │ │  Video   │ │ Webpage  │        │
   │Speciali │   └──────────┘ └──────────┘ └──────────┘        │
   │  sts    │                                                    │
   │         │   ┌──────────┐ ┌──────────┐ ┌──────────┐        │
   │ Tools   │   │Chat with │ │ LinkedIn │ │ X Post   │        │
   │         │   │ Webpage  │ │   Post   │ │          │        │
   │Settings │   └──────────┘ └──────────┘ └──────────┘        │
   │         │                                                    │
   │─────────│   ┌─────────────────────────────────────────┐   │
   │ [User]  │   │ [GPT-4o Mini ▾]  [Compare Model]       │   │
   │ Name    │   └─────────────────────────────────────────┘   │
   │ email@  │   [History]                                      │
   │         │                                                    │
   │         │   ┌─────────────────────────────────────────┐   │
   │         │   │ Tell me something about this page       │   │
   │         │   │                         [📎]  [▶] [→]  │   │
   │         │   └─────────────────────────────────────────┘   │
   └─────────┴────────────────────────────────────────────────────┘
   ```

2. **Active Chat Mockup:**
   ```
   ┌──────────────────────────────────────────────────────────────┐
   │                        [≡ New Chat]                          │
   ├──────────────────────────────────────────────────────────────┤
   │                                                              │
   │  User: Explain quantum computing in simple terms            │
   │                                          [5:30 PM] ────────┐│
   │                                                             ││
   │  ┌─────────────────────────────────────────────────────────┐│
   │  │ [GPT Icon] GPT-4o Mini                                  ││
   │  │                                                          ││
   │  │ Quantum computing is a revolutionary approach to        ││
   │  │ computation that leverages quantum mechanics...         ││
   │  │                                                          ││
   │  │ **Key Concepts:**                                        ││
   │  │ • Qubits (quantum bits)                                 ││
   │  │ • Superposition                                         ││
   │  │ • Entanglement                                          ││
   │  │                                                          ││
   │  │ [Copy] [Share] [Regenerate]                             ││
   │  └─────────────────────────────────────────────────────────┘│
   │                                                              │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │ Type your message...                  [📎]  [▶] [→]│   │
   │  └─────────────────────────────────────────────────────┘   │
   └──────────────────────────────────────────────────────────────┘
   ```

3. **AI Specialists Gallery Mockup:**
   ```
   ┌──────────────────────────────────────────────────────────────┐
   │  ← Back to Chat                      AI Specialists          │
   ├──────────────────────────────────────────────────────────────┤
   │                                                              │
   │  ┌──────────────────────┐    ┌──────────────────────┐      │
   │  │ [Nova Avatar]        │    │ [Remy Avatar]        │      │
   │  │  Orange gradient     │    │  Blue gradient       │      │
   │  │                      │    │                      │      │
   │  │ Nova                 │    │ Remy                 │      │
   │  │ Product Manager      │    │ Content Writer       │      │
   │  │                      │    │                      │      │
   │  │ He can help you with │    │ He can help you with │      │
   │  │ writing PRDs and     │    │ writing Emails, Blog │      │
   │  │ New Product Features │    │ Posts & Newsletters  │      │
   │  └──────────────────────┘    └──────────────────────┘      │
   │                                                              │
   │  ┌──────────────────────┐                                   │
   │  │ [Lennon Avatar]      │                                   │
   │  │  Purple gradient     │                                   │
   │  │                      │                                   │
   │  │ Lennon               │                                   │
   │  │ Social Media Manager │                                   │
   │  │                      │                                   │
   │  │ He can help you with │                                   │
   │  │ Instagram posts &    │                                   │
   │  │ Social Strategies    │                                   │
   │  └──────────────────────┘                                   │
   └──────────────────────────────────────────────────────────────┘
   ```

4. **Prompts Library Mockup:**
   ```
   ┌──────────────────────────────────────────────────────────────┐
   │  ← Back to Chat                        Prompts               │
   ├──────────────────────────────────────────────────────────────┤
   │                                                              │
   │  [All] [Marketing] [Business] [Career] [Content]  [Search🔍]│
   │                                                              │
   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
   │  │ 📊       │  │ ✍️       │  │ 🎯       │  │ 📧       │   │
   │  │          │  │          │  │          │  │          │   │
   │  │ Writing  │  │  Email   │  │   SEO    │  │ Customer │   │
   │  │  Video   │  │Newsletr  │  │ Strategy │  │  Email   │   │
   │  │Descript  │  │   ers    │  │  Guide   │  │Response  │   │
   │  │          │  │          │  │          │  │          │   │
   │  │ Crafts   │  │ Provides │  │ Helps    │  │ Develops │   │
   │  │compell..│  │ target..  │  │enhance..│  │  high-..  │   │
   │  │          │  │          │  │          │  │          │   │
   │  │[Market.] │  │[Market.] │  │[Content] │  │[Business]│   │
   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
   │                                                              │
   │  [← Previous]  [1] [2] [3] ... [8]  [Next →]               │
   └──────────────────────────────────────────────────────────────┘
   ```

5. **Content Tool (Summarize) Mockup:**
   ```
   ┌──────────────────────────────────────────────────────────────┐
   │  ← Back to Tools                       Summarize             │
   ├──────────────────────────────────────────────────────────────┤
   │                                                              │
   │  [URL] [Text] [File]                                         │
   │                                                              │
   │  ┌────────────────────────────────────────────────────────┐ │
   │  │ Enter URL or paste text to summarize                   │ │
   │  │                                                         │ │
   │  └────────────────────────────────────────────────────────┘ │
   │                                                              │
   │  Length: [Short] [Medium] [Long]                             │
   │                                                              │
   │  [Summarize]                                                 │
   │                                                              │
   │  ── Result ──                                                │
   │                                                              │
   │  📄 Summary of: [Article Title]                             │
   │  ┌────────────────────────────────────────────────────────┐ │
   │  │ **Key Points:**                                         │ │
   │  │ 1. Main point one...                                   │ │
   │  │ 2. Main point two...                                   │ │
   │  │                                                         │ │
   │  │ **Detailed Summary:**                                   │ │
   │  │ [Summary text...]                                       │ │
   │  │                                                         │ │
   │  │ [Copy] [Export PDF] [Chat About This]                  │ │
   │  └────────────────────────────────────────────────────────┘ │
   └──────────────────────────────────────────────────────────────┘
   ```

**Deliverables:**
- Complete app UI mockups (Figma)
- Interaction flows
- Responsive breakpoint mockups

---

### Microstep 4.4: Interaction Design Specification (7 credits, 3 hours)

**Tasks:**

1. **Button Interaction States:**
   ```
   PRIMARY BUTTON:
   - Default: bg-primary, shadow-sm
   - Hover: bg-primary-hover, scale(1.02), shadow-md (200ms)
   - Active: scale(0.98) (100ms)
   - Focus: ring-2 ring-primary ring-offset-2
   - Disabled: opacity-50, cursor-not-allowed
   - Loading: inline spinner + "Processing..." text
   
   SECONDARY BUTTON:
   - Default: border border-surface-elevated, bg-transparent
   - Hover: bg-surface-elevated (200ms)
   - Rest same as primary
   
   ICON BUTTON:
   - Size: 40x40px minimum
   - Hover: bg-surface, scale(1.05)
   - Active: scale(0.95)
   ```

2. **Form Interaction Patterns:**
   ```
   INPUT FIELDS:
   - Validate on blur (not on every keystroke)
   - Success: border-success + green checkmark (right)
   - Error: border-error + red X + message below
   - Focus: ring-2 ring-primary ring-offset-2
   
   ERROR MESSAGES:
   - Specific: "Email should look like name@example.com"
   - NOT generic: "Invalid email"
   - Show only after field touched
   
   SUBMIT BUTTON:
   - Disabled until form valid
   - Show blocking fields (red dot on labels)
   - Loading: "Creating account..." (context-specific)
   - Success: Toast + redirect
   - Error: Toast + re-enable form
   ```

3. **Modal Interactions:**
   ```
   OPEN:
   - Backdrop: opacity 0 → 1 (200ms)
   - Content: scale(0.95) → scale(1) (200ms)
   - Trap focus inside modal
   
   CLOSE:
   - ESC key
   - Click backdrop
   - Close button (X)
   - Cancel button
   
   EXIT:
   - Reverse animation
   - Release focus trap
   ```

4. **Scroll & Loading Behaviors:**
   ```
   INFINITE SCROLL (Conversation list):
   - Load more when 100px from bottom
   - Show loading skeleton
   - Append new items smoothly
   
   SKELETON SCREENS:
   - Use instead of spinners
   - Match actual content layout
   - Pulse animation (2s infinite)
   
   STREAMING TEXT:
   - Character-by-character append
   - No animation (performance)
   - Blinking cursor at end
   ```

5. **Toast Notifications:**
   ```
   SUCCESS: Green background, checkmark icon
   ERROR: Red background, X icon
   WARNING: Amber background, exclamation icon
   INFO: Blue background, info icon
   
   Animation: Slide in from top-right (300ms)
   Duration: 3 seconds auto-dismiss
   Position: Fixed top-right, max-width 400px
   Stack: Multiple toasts stack vertically
   ```

**Deliverables:**
- Interaction specification document
- Micro-interaction video demos
- State diagram for complex interactions

---

## PHASE 5: VERTICAL SLICE IMPLEMENTATION

### Objective
Build features iteratively using vertical slices. Each slice follows:
1. Frontend UI with mock data
2. Backend API with mock responses
3. Database schema implementation
4. Wire frontend ↔ backend ↔ database
5. Automated testing
6. Move to next slice

---

## VERTICAL SLICE 1: AUTHENTICATION & FOUNDATION

### Microstep 5.1.1: Frontend Foundation Setup (8 credits, 3.5 hours)

**Tasks:**

1. **Initialize React Project:**
   ```bash
   cd /app/frontend
   
   # Install core dependencies
   yarn add react@19.0.0 react-dom@19.0.0
   yarn add react-router-dom@7.5.0
   yarn add zustand@4.5.0
   yarn add axios@1.6.0
   yarn add framer-motion@11.0.0
   yarn add lucide-react@0.300.0
   
   # Install Tailwind CSS
   yarn add -D tailwindcss@3.4.0 postcss autoprefixer
   npx tailwindcss init -p
   
   # Install Shadcn/UI
   npx shadcn-ui@latest init
   # Select: New York, Dark theme, CSS variables
   
   # Install form handling
   yarn add react-hook-form@7.49.0 zod@3.22.0
   yarn add @hookform/resolvers@3.3.0
   
   # Install toast notifications
   yarn add sonner@1.3.0
   
   # Install Markdown rendering
   yarn add react-markdown@9.0.0
   yarn add prismjs@1.29.0
   ```

2. **Configure Tailwind (tailwind.config.js):**
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     darkMode: ["class"],
     content: [
       './pages/**/*.{js,jsx}',
       './components/**/*.{js,jsx}',
       './app/**/*.{js,jsx}',
       './src/**/*.{js,jsx}',
     ],
     theme: {
       container: {
         center: true,
         padding: "2rem",
         screens: {
           "2xl": "1400px",
         },
       },
       extend: {
         colors: {
           border: "hsl(var(--border))",
           background: "hsl(var(--background))",
           surface: "hsl(var(--surface))",
           primary: {
             DEFAULT: "#4f46e5",
             hover: "#4338ca",
             light: "#818cf8",
           },
           success: "#10b981",
           error: "#ef4444",
           warning: "#f59e0b",
         },
         fontFamily: {
           heading: ['Manrope', 'sans-serif'],
           body: ['Inter', 'sans-serif'],
           mono: ['JetBrains Mono', 'monospace'],
         },
       },
     },
     plugins: [require("tailwindcss-animate")],
   }
   ```

3. **Create Directory Structure:**
   ```bash
   mkdir -p src/components/ui
   mkdir -p src/components/layout
   mkdir -p src/components/features/chat
   mkdir -p src/components/features/specialists
   mkdir -p src/components/features/prompts
   mkdir -p src/components/features/tools
   mkdir -p src/pages
   mkdir -p src/stores
   mkdir -p src/hooks
   mkdir -p src/utils
   mkdir -p src/styles
   ```

4. **Set up Environment Variables (.env):**
   ```bash
   # Frontend Environment Variables
   REACT_APP_BACKEND_URL=http://localhost:8001
   REACT_APP_APP_NAME=AllOutputs
   ```

5. **Create Global Styles (src/styles/globals.css):**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     :root {
       --background: 15 15 16;        /* #0f0f10 */
       --surface: 26 26 27;           /* #1a1a1b */
       --border: 45 45 47;            /* #2d2d2f */
     }
     
     * {
       @apply border-border;
     }
     
     body {
       @apply bg-background text-text-primary font-body;
     }
   }
   ```

6. **Install Shadcn/UI Components:**
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add dialog
   npx shadcn-ui@latest add dropdown-menu
   npx shadcn-ui@latest add avatar
   npx shadcn-ui@latest add skeleton
   npx shadcn-ui@latest add toast
   ```

**Test:**
```bash
# Start frontend dev server
cd /app/frontend
yarn start

# Should see blank React app at http://localhost:3000
```

**Deliverables:**
- Configured React project
- Tailwind CSS set up
- Shadcn/UI components installed
- Project structure created

---

### Microstep 5.1.2: Backend Foundation Setup (8 credits, 3.5 hours)

**Tasks:**

1. **Set Up Virtual Environment & Install Dependencies:**
   ```bash
   cd /app/backend
   
   # Install dependencies
   pip install fastapi==0.109.0
   pip install uvicorn[standard]==0.27.0
   pip install motor==3.3.0
   pip install pydantic==2.5.0
   pip install python-jose[cryptography]==3.3.0
   pip install passlib[bcrypt]==1.7.4
   pip install python-dotenv==1.0.0
   pip install python-multipart==0.0.6
   pip install requests==2.31.0
   pip install beautifulsoup4==4.12.0
   pip install openai==1.10.0
   pip install anthropic==0.10.0
   pip install google-generativeai==0.3.0
   
   # Update requirements.txt
   pip freeze > requirements.txt
   ```

2. **Create Environment Variables (.env):**
   ```bash
   # Backend Environment Variables
   MONGO_URL=mongodb://localhost:27017/alloutputs
   SECRET_KEY=your-secret-key-here-change-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_DAYS=7
   
   # AI API Keys (will be added later)
   OPENAI_API_KEY=
   ANTHROPIC_API_KEY=
   GOOGLE_API_KEY=
   ```

3. **Create Database Connection (utils/database.py):**
   ```python
   from motor.motor_asyncio import AsyncIOMotorClient
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   
   MONGO_URL = os.environ.get("MONGO_URL")
   client = AsyncIOMotorClient(MONGO_URL)
   db = client["alloutputs"]
   
   # Collections
   users_collection = db["users"]
   conversations_collection = db["conversations"]
   prompts_collection = db["prompts"]
   model_comparisons_collection = db["model_comparisons"]
   
   async def create_indexes():
       """Create database indexes for performance"""
       # Users
       await users_collection.create_index("email", unique=True)
       await users_collection.create_index("subscription_tier")
       
       # Conversations
       await conversations_collection.create_index("user_id")
       await conversations_collection.create_index([("last_message_at", -1)])
       await conversations_collection.create_index("ai_specialist")
       
       # Prompts
       await prompts_collection.create_index("category")
       await prompts_collection.create_index([("usage_count", -1)])
       await prompts_collection.create_index([
           ("title", "text"),
           ("description", "text")
       ])
   ```

4. **Create Auth Service (services/auth_service.py):**
   ```python
   from passlib.context import CryptContext
   from jose import JWTError, jwt
   from datetime import datetime, timedelta
   import os
   
   pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
   
   SECRET_KEY = os.environ.get("SECRET_KEY")
   ALGORITHM = os.environ.get("ALGORITHM", "HS256")
   ACCESS_TOKEN_EXPIRE_DAYS = int(os.environ.get("ACCESS_TOKEN_EXPIRE_DAYS", 7))
   
   def hash_password(password: str) -> str:
       """Hash password using bcrypt"""
       return pwd_context.hash(password)
   
   def verify_password(plain_password: str, hashed_password: str) -> bool:
       """Verify password against hash"""
       return pwd_context.verify(plain_password, hashed_password)
   
   def create_access_token(data: dict) -> str:
       """Create JWT access token"""
       to_encode = data.copy()
       expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
       to_encode.update({"exp": expire})
       encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
       return encoded_jwt
   
   def verify_token(token: str) -> dict:
       """Verify JWT token and return payload"""
       try:
           payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
           return payload
       except JWTError:
           return None
   ```

5. **Create Base FastAPI App (server.py):**
   ```python
   from fastapi import FastAPI, HTTPException, Depends, Header
   from fastapi.middleware.cors import CORSMiddleware
   from pydantic import BaseModel, EmailStr
   from utils.database import (
       users_collection, 
       create_indexes
   )
   from services.auth_service import (
       hash_password,
       verify_password,
       create_access_token,
       verify_token
   )
   import uvicorn
   from datetime import datetime
   
   app = FastAPI(title="AllOutputs API", version="1.0.0")
   
   # CORS Configuration
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "http://localhost:3000",
           "https://alloutputs.com"
       ],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   
   # Security Headers Middleware
   @app.middleware("http")
   async def add_security_headers(request, call_next):
       response = await call_next(request)
       response.headers["X-Content-Type-Options"] = "nosniff"
       response.headers["X-Frame-Options"] = "DENY"
       response.headers["X-XSS-Protection"] = "1; mode=block"
       return response
   
   # Startup event
   @app.on_event("startup")
   async def startup_event():
       await create_indexes()
       print("✅ Database indexes created")
   
   # Health check endpoint
   @app.get("/api/health")
   async def health_check():
       return {
           "success": True,
           "data": {
               "status": "healthy",
               "timestamp": datetime.utcnow().isoformat()
           }
       }
   
   # Auth dependency
   async def get_current_user(authorization: str = Header(None)):
       if not authorization or not authorization.startswith("Bearer "):
           raise HTTPException(status_code=401, detail="Not authenticated")
       
       token = authorization.replace("Bearer ", "")
       payload = verify_token(token)
       
       if not payload:
           raise HTTPException(status_code=401, detail="Invalid token")
       
       user_id = payload.get("user_id")
       user = await users_collection.find_one({"_id": user_id})
       
       if not user:
           raise HTTPException(status_code=401, detail="User not found")
       
       return user
   
   if __name__ == "__main__":
       uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
   ```

6. **Test Backend Setup:**
   ```bash
   # Start MongoDB (if not running)
   sudo systemctl start mongod
   
   # Test health endpoint
   curl http://localhost:8001/api/health
   
   # Expected response:
   # {"success":true,"data":{"status":"healthy","timestamp":"..."}}
   ```

**Deliverables:**
- FastAPI application configured
- MongoDB connection established
- Auth service implemented
- Health check endpoint working

---

### Microstep 5.1.3: Authentication UI (Frontend with Mock Data) (9 credits, 4 hours)

**Tasks:**

1. **Create Auth Store (src/stores/authStore.js):**
   ```javascript
   import { create } from 'zustand';
   
   const useAuthStore = create((set) => ({
     user: null,
     token: localStorage.getItem('token') || null,
     isAuthenticated: !!localStorage.getItem('token'),
     isLoading: false,
     error: null,
     
     // Mock login (will connect to backend later)
     login: async (email, password) => {
       set({ isLoading: true, error: null });
       
       // Mock delay
       await new Promise(resolve => setTimeout(resolve, 1000));
       
       // Mock success
       const mockUser = {
         id: '123',
         email: email,
         name: 'Demo User',
         subscription_tier: 'free'
       };
       
       const mockToken = 'mock-jwt-token-123';
       
       localStorage.setItem('token', mockToken);
       set({
         user: mockUser,
         token: mockToken,
         isAuthenticated: true,
         isLoading: false
       });
       
       return { success: true };
     },
     
     signup: async (email, password, name) => {
       set({ isLoading: true, error: null });
       await new Promise(resolve => setTimeout(resolve, 1000));
       
       const mockUser = {
         id: '124',
         email: email,
         name: name,
         subscription_tier: 'free'
       };
       
       const mockToken = 'mock-jwt-token-124';
       
       localStorage.setItem('token', mockToken);
       set({
         user: mockUser,
         token: mockToken,
         isAuthenticated: true,
         isLoading: false
       });
       
       return { success: true };
     },
     
     logout: () => {
       localStorage.removeItem('token');
       set({
         user: null,
         token: null,
         isAuthenticated: false
       });
     }
   }));
   
   export default useAuthStore;
   ```

2. **Create Login Page (src/pages/LoginPage.jsx):**
   ```jsx
   import React, { useState } from 'react';
   import { useNavigate, Link } from 'react-router-dom';
   import { motion } from 'framer-motion';
   import useAuthStore from '../stores/authStore';
   import { Button } from '../components/ui/button';
   import { Input } from '../components/ui/input';
   import { Card } from '../components/ui/card';
   import { toast } from 'sonner';
   
   export default function LoginPage() {
     const navigate = useNavigate();
     const { login, isLoading } = useAuthStore();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [errors, setErrors] = useState({});
     
     const validateForm = () => {
       const newErrors = {};
       
       if (!email) {
         newErrors.email = 'Email is required';
       } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = 'Email should look like name@example.com';
       }
       
       if (!password) {
         newErrors.password = 'Password is required';
       } else if (password.length < 8) {
         newErrors.password = 'Password must be at least 8 characters';
       }
       
       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };
     
     const handleSubmit = async (e) => {
       e.preventDefault();
       
       if (!validateForm()) return;
       
       const result = await login(email, password);
       
       if (result.success) {
         toast.success('Welcome back!');
         navigate('/app/dashboard');
       } else {
         toast.error('Login failed. Please check your credentials.');
       }
     };
     
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="w-full max-w-md"
         >
           <div className="text-center mb-8">
             <h1 className="text-3xl font-bold text-text-primary mb-2">
               Welcome back
             </h1>
             <p className="text-text-secondary">
               Sign in to your AllOutputs account
             </p>
           </div>
           
           <Card className="p-8">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <label htmlFor="email" className="block text-sm font-medium mb-2">
                   Email
                 </label>
                 <Input
                   id="email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="you@example.com"
                   className={errors.email ? 'border-error' : ''}
                 />
                 {errors.email && (
                   <p className="text-error text-sm mt-1">{errors.email}</p>
                 )}
               </div>
               
               <div>
                 <label htmlFor="password" className="block text-sm font-medium mb-2">
                   Password
                 </label>
                 <Input
                   id="password"
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className={errors.password ? 'border-error' : ''}
                 />
                 {errors.password && (
                   <p className="text-error text-sm mt-1">{errors.password}</p>
                 )}
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="flex items-center">
                   <input type="checkbox" className="mr-2" />
                   <span className="text-sm">Remember me</span>
                 </label>
                 <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                   Forgot password?
                 </Link>
               </div>
               
               <Button
                 type="submit"
                 className="w-full"
                 disabled={isLoading}
               >
                 {isLoading ? 'Signing in...' : 'Sign In'}
               </Button>
             </form>
             
             <div className="mt-6 text-center">
               <p className="text-sm text-text-secondary">
                 Don't have an account?{' '}
                 <Link to="/signup" className="text-primary hover:underline">
                   Sign up
                 </Link>
               </p>
             </div>
           </Card>
         </motion.div>
       </div>
     );
   }
   ```

3. **Create Signup Page (src/pages/SignupPage.jsx):**
   ```jsx
   import React, { useState } from 'react';
   import { useNavigate, Link } from 'react-router-dom';
   import { motion } from 'framer-motion';
   import useAuthStore from '../stores/authStore';
   import { Button } from '../components/ui/button';
   import { Input } from '../components/ui/input';
   import { Card } from '../components/ui/card';
   import { toast } from 'sonner';
   
   export default function SignupPage() {
     const navigate = useNavigate();
     const { signup, isLoading } = useAuthStore();
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       password: '',
       confirmPassword: ''
     });
     const [errors, setErrors] = useState({});
     
     const validateForm = () => {
       const newErrors = {};
       
       if (!formData.name) {
         newErrors.name = 'Name is required';
       }
       
       if (!formData.email) {
         newErrors.email = 'Email is required';
       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'Email should look like name@example.com';
       }
       
       if (!formData.password) {
         newErrors.password = 'Password is required';
       } else if (formData.password.length < 8) {
         newErrors.password = 'Use at least 8 characters (the longer, the better)';
       }
       
       if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = 'Passwords do not match';
       }
       
       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };
     
     const handleChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value
       });
       // Clear error for this field
       if (errors[e.target.name]) {
         setErrors({ ...errors, [e.target.name]: null });
       }
     };
     
     const handleSubmit = async (e) => {
       e.preventDefault();
       
       if (!validateForm()) return;
       
       const result = await signup(
         formData.email,
         formData.password,
         formData.name
       );
       
       if (result.success) {
         toast.success('Account created successfully!');
         navigate('/app/dashboard');
       } else {
         toast.error('Signup failed. Please try again.');
       }
     };
     
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="w-full max-w-md"
         >
           <div className="text-center mb-8">
             <h1 className="text-3xl font-bold text-text-primary mb-2">
               Create your account
             </h1>
             <p className="text-text-secondary">
               Get started with AllOutputs
             </p>
           </div>
           
           <Card className="p-8">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <label htmlFor="name" className="block text-sm font-medium mb-2">
                   Full Name
                 </label>
                 <Input
                   id="name"
                   name="name"
                   type="text"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="John Doe"
                   className={errors.name ? 'border-error' : ''}
                 />
                 {errors.name && (
                   <p className="text-error text-sm mt-1">{errors.name}</p>
                 )}
               </div>
               
               <div>
                 <label htmlFor="email" className="block text-sm font-medium mb-2">
                   Email
                 </label>
                 <Input
                   id="email"
                   name="email"
                   type="email"
                   value={formData.email}
                   onChange={handleChange}
                   placeholder="you@example.com"
                   className={errors.email ? 'border-error' : ''}
                 />
                 {errors.email && (
                   <p className="text-error text-sm mt-1">{errors.email}</p>
                 )}
               </div>
               
               <div>
                 <label htmlFor="password" className="block text-sm font-medium mb-2">
                   Password
                 </label>
                 <Input
                   id="password"
                   name="password"
                   type="password"
                   value={formData.password}
                   onChange={handleChange}
                   placeholder="••••••••"
                   className={errors.password ? 'border-error' : ''}
                 />
                 {errors.password && (
                   <p className="text-error text-sm mt-1">{errors.password}</p>
                 )}
               </div>
               
               <div>
                 <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                   Confirm Password
                 </label>
                 <Input
                   id="confirmPassword"
                   name="confirmPassword"
                   type="password"
                   value={formData.confirmPassword}
                   onChange={handleChange}
                   placeholder="••••••••"
                   className={errors.confirmPassword ? 'border-error' : ''}
                 />
                 {errors.confirmPassword && (
                   <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
                 )}
               </div>
               
               <Button
                 type="submit"
                 className="w-full"
                 disabled={isLoading}
               >
                 {isLoading ? 'Creating account...' : 'Create Account'}
               </Button>
             </form>
             
             <div className="mt-6 text-center">
               <p className="text-sm text-text-secondary">
                 Already have an account?{' '}
                 <Link to="/login" className="text-primary hover:underline">
                   Sign in
                 </Link>
               </p>
             </div>
           </Card>
         </motion.div>
       </div>
     );
   }
   ```

4. **Set Up Routing (src/App.jsx):**
   ```jsx
   import React from 'react';
   import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
   import { Toaster } from 'sonner';
   import useAuthStore from './stores/authStore';
   import LoginPage from './pages/LoginPage';
   import SignupPage from './pages/SignupPage';
   import DashboardPage from './pages/DashboardPage';
   
   // Protected Route wrapper
   function ProtectedRoute({ children }) {
     const { isAuthenticated } = useAuthStore();
     
     if (!isAuthenticated) {
       return <Navigate to="/login" replace />;
     }
     
     return children;
   }
   
   function App() {
     return (
       <BrowserRouter>
         <div className="min-h-screen bg-background text-text-primary">
           <Routes>
             <Route path="/login" element={<LoginPage />} />
             <Route path="/signup" element={<SignupPage />} />
             
             <Route
               path="/app/dashboard"
               element={
                 <ProtectedRoute>
                   <DashboardPage />
                 </ProtectedRoute>
               }
             />
             
             <Route path="/" element={<Navigate to="/login" replace />} />
           </Routes>
           
           <Toaster position="top-right" />
         </div>
       </BrowserRouter>
     );
   }
   
   export default App;
   ```

5. **Create Placeholder Dashboard (src/pages/DashboardPage.jsx):**
   ```jsx
   import React from 'react';
   import useAuthStore from '../stores/authStore';
   import { Button } from '../components/ui/button';
   
   export default function DashboardPage() {
     const { user, logout } = useAuthStore();
     
     return (
       <div className="p-8">
         <div className="max-w-4xl mx-auto">
           <h1 className="text-3xl font-bold mb-4">
             Welcome, {user?.name}!
           </h1>
           <p className="text-text-secondary mb-6">
             Email: {user?.email}
           </p>
           <Button onClick={logout}>Logout</Button>
         </div>
       </div>
     );
   }
   ```

**Test:**
1. Navigate to http://localhost:3000
2. Should redirect to /login
3. Fill out signup form → Should create account and redirect to dashboard
4. Logout → Login with same credentials → Should work
5. Check localStorage for token

**Deliverables:**
- Login page with validation
- Signup page with validation
- Auth store with mock data
- Protected routes
- Working authentication flow (frontend only, mock data)

---

## VERTICAL SLICE 2: CHAT FUNCTIONALITY

### Objective
Build complete chat interface with AI integration, conversation management, and multi-model comparison.

---

### Microstep 5.2.1: Chat UI Components with Mock Data (8 credits, 3.5 hours)

**Tasks:**

1. **Create Chat Store (src/stores/chatStore.js):**
   ```javascript
   import { create } from 'zustand';
   
   const useChatStore = create((set, get) => ({
     conversations: [],
     currentConversation: null,
     messages: [],
     selectedModel: 'gpt-4o-mini',
     availableModels: [
       { id: 'gpt-4o-mini', name: 'GPT-4o Mini', tier: 'free' },
       { id: 'gemini-pro', name: 'Gemini Pro', tier: 'free' },
       { id: 'gpt-4o', name: 'GPT-4o', tier: 'pro' },
       { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', tier: 'pro' },
     ],
     isLoading: false,
     
     // Mock data
     loadConversations: () => {
       set({
         conversations: [
           {
             id: '1',
             title: 'Product Roadmap Q2 2025',
             last_message_at: new Date().toISOString(),
             message_count: 5
           },
           {
             id: '2',
             title: 'Marketing Strategy Ideas',
             last_message_at: new Date(Date.now() - 86400000).toISOString(),
             message_count: 12
           }
         ]
       });
     },
     
     sendMessage: async (message) => {
       set({ isLoading: true });
       
       // Mock response
       setTimeout(() => {
         const newMessage = {
           id: Date.now().toString(),
           role: 'assistant',
           content: 'This is a mock response. AI integration will be added in the next step.',
           model: get().selectedModel,
           timestamp: new Date().toISOString()
         };
         
         set({
           messages: [...get().messages, 
             { id: Date.now().toString(), role: 'user', content: message },
             newMessage
           ],
           isLoading: false
         });
       }, 1000);
     },
     
     selectModel: (modelId) => set({ selectedModel: modelId }),
     
     newConversation: () => set({ 
       currentConversation: null, 
       messages: [] 
     }),
   }));
   
   export default useChatStore;
   ```

2. **Create ChatDashboard Component (src/components/features/chat/ChatDashboard.jsx):**
   ```jsx
   import React from 'react';
   import { Button } from '../../ui/button';
   import { 
     MessageSquare, Video, Globe, FileText, 
     Send, Sparkles 
   } from 'lucide-react';
   import useAuthStore from '../../../stores/authStore';
   
   export default function ChatDashboard() {
     const { user } = useAuthStore();
     
     const quickActions = [
       { id: 1, icon: MessageSquare, label: 'Compare Models', color: 'indigo' },
       { id: 2, icon: Video, label: 'Summarize Video', color: 'blue' },
       { id: 3, icon: Globe, label: 'Summarize Webpage', color: 'green' },
       { id: 4, icon: FileText, label: 'Summarize Document', color: 'purple' },
       { id: 5, icon: MessageSquare, label: 'Chat with Webpage', color: 'pink' },
       { id: 6, icon: Send, label: 'LinkedIn Post', color: 'cyan' },
       { id: 7, icon: Send, label: 'X Post', color: 'orange' },
       { id: 8, icon: Sparkles, label: 'View All Agents', color: 'yellow' },
     ];
     
     return (
       <div className="flex flex-col items-center justify-center h-full p-8">
         <h1 className="text-3xl font-semibold mb-2">
           Hi {user?.name}, How Can I Help You Today?
         </h1>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12 w-full max-w-4xl">
           {quickActions.map((action) => {
             const Icon = action.icon;
             return (
               <button
                 key={action.id}
                 className="flex flex-col items-center justify-center p-6 rounded-lg bg-surface hover:bg-surface-elevated transition-all hover:scale-105"
               >
                 <Icon className={`w-8 h-8 mb-2 text-${action.color}-500`} />
                 <span className="text-sm text-center">{action.label}</span>
               </button>
             );
           })}
         </div>
       </div>
     );
   }
   ```

3. **Create ChatInput Component (src/components/features/chat/ChatInput.jsx):**
   ```jsx
   import React, { useState } from 'react';
   import { Button } from '../../ui/button';
   import { Paperclip, Mic, ArrowRight } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   
   export default function ChatInput() {
     const [message, setMessage] = useState('');
     const { sendMessage, isLoading } = useChatStore();
     
     const handleSubmit = (e) => {
       e.preventDefault();
       if (message.trim() && !isLoading) {
         sendMessage(message);
         setMessage('');
       }
     };
     
     return (
       <form onSubmit={handleSubmit} className="p-4 border-t border-border">
         <div className="flex items-end gap-2 max-w-4xl mx-auto">
           <div className="flex-1 relative">
             <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Tell me something about this page..."
               className="w-full p-3 pr-24 bg-surface border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
               rows={3}
               disabled={isLoading}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleSubmit(e);
                 }
               }}
             />
             <div className="absolute bottom-3 right-3 flex gap-2">
               <button type="button" className="p-2 hover:bg-surface-elevated rounded">
                 <Paperclip className="w-5 h-5 text-text-secondary" />
               </button>
               <button type="button" className="p-2 hover:bg-surface-elevated rounded">
                 <Mic className="w-5 h-5 text-text-secondary" />
               </button>
             </div>
           </div>
           <Button 
             type="submit" 
             disabled={!message.trim() || isLoading}
             className="h-12"
           >
             <ArrowRight className="w-5 h-5" />
           </Button>
         </div>
       </form>
     );
   }
   ```

4. **Create MessageList Component (src/components/features/chat/MessageList.jsx):**
   ```jsx
   import React from 'react';
   import { Button } from '../../ui/button';
   import { Copy, Share2, RefreshCw } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   import ReactMarkdown from 'react-markdown';
   
   export default function MessageList() {
     const { messages } = useChatStore();
     
     if (messages.length === 0) {
       return null;
     }
     
     return (
       <div className="flex-1 overflow-y-auto p-6">
         <div className="max-w-4xl mx-auto space-y-6">
           {messages.map((message) => (
             <div
               key={message.id}
               className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               {message.role === 'user' ? (
                 <div className="bg-primary text-white rounded-lg px-4 py-3 max-w-xl">
                   {message.content}
                 </div>
               ) : (
                 <div className="bg-surface rounded-lg p-4 max-w-3xl">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-6 h-6 rounded-full bg-primary" />
                     <span className="text-sm text-text-secondary">{message.model}</span>
                   </div>
                   <div className="prose prose-invert max-w-none">
                     <ReactMarkdown>{message.content}</ReactMarkdown>
                   </div>
                   <div className="flex gap-2 mt-4">
                     <Button variant="ghost" size="sm">
                       <Copy className="w-4 h-4 mr-2" />
                       Copy
                     </Button>
                     <Button variant="ghost" size="sm">
                       <Share2 className="w-4 h-4 mr-2" />
                       Share
                     </Button>
                     <Button variant="ghost" size="sm">
                       <RefreshCw className="w-4 h-4 mr-2" />
                       Regenerate
                     </Button>
                   </div>
                 </div>
               )}
             </div>
           ))}
         </div>
       </div>
     );
   }
   ```

5. **Create ModelSelector Component (src/components/features/chat/ModelSelector.jsx):**
   ```jsx
   import React from 'react';
   import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
   } from '../../ui/dropdown-menu';
   import { Button } from '../../ui/button';
   import { ChevronDown, Lock } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   import useAuthStore from '../../../stores/authStore';
   
   export default function ModelSelector() {
     const { selectedModel, availableModels, selectModel } = useChatStore();
     const { user } = useAuthStore();
     
     const currentModel = availableModels.find(m => m.id === selectedModel);
     const freeModels = availableModels.filter(m => m.tier === 'free');
     const proModels = availableModels.filter(m => m.tier === 'pro');
     
     const isPro = user?.subscription_tier === 'pro';
     
     return (
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="outline" className="w-64">
             {currentModel?.name}
             <ChevronDown className="ml-2 w-4 h-4" />
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-64">
           <DropdownMenuLabel>Basic Models</DropdownMenuLabel>
           {freeModels.map((model) => (
             <DropdownMenuItem
               key={model.id}
               onClick={() => selectModel(model.id)}
             >
               {model.name}
             </DropdownMenuItem>
           ))}
           
           <DropdownMenuSeparator />
           
           <DropdownMenuLabel>
             Advanced Models {!isPro && <Lock className="inline w-3 h-3 ml-1" />}
           </DropdownMenuLabel>
           {proModels.map((model) => (
             <DropdownMenuItem
               key={model.id}
               onClick={() => isPro && selectModel(model.id)}
               disabled={!isPro}
               className={!isPro ? 'opacity-50 cursor-not-allowed' : ''}
             >
               {model.name}
               {!isPro && <Lock className="ml-auto w-3 h-3" />}
             </DropdownMenuItem>
           ))}
         </DropdownMenuContent>
       </DropdownMenu>
     );
   }
   ```

6. **Create ChatPage (src/pages/ChatPage.jsx):**
   ```jsx
   import React, { useEffect } from 'react';
   import ChatDashboard from '../components/features/chat/ChatDashboard';
   import MessageList from '../components/features/chat/MessageList';
   import ChatInput from '../components/features/chat/ChatInput';
   import ModelSelector from '../components/features/chat/ModelSelector';
   import { Button } from '../components/ui/button';
   import useChatStore from '../stores/chatStore';
   
   export default function ChatPage() {
     const { messages } = useChatStore();
     
     const hasMessages = messages.length > 0;
     
     return (
       <div className="flex flex-col h-full">
         {/* Model Selector Bar */}
         <div className="p-4 border-b border-border">
           <div className="max-w-4xl mx-auto flex items-center gap-4">
             <ModelSelector />
             <Button variant="outline">Compare Models</Button>
             <Button variant="ghost">History</Button>
           </div>
         </div>
         
         {/* Main Content */}
         {hasMessages ? <MessageList /> : <ChatDashboard />}
         
         {/* Chat Input */}
         <ChatInput />
       </div>
     );
   }
   ```

7. **Update App.jsx to include Chat route:**
   ```jsx
   import { Route, Routes, Navigate } from 'react-router-dom';
   import ChatPage from './pages/ChatPage';
   // ... other imports
   
   <Routes>
     {/* ... auth routes */}
     <Route path="/app" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
       <Route index element={<Navigate to="/app/chat" replace />} />
       <Route path="chat" element={<ChatPage />} />
       <Route path="dashboard" element={<DashboardPage />} />
     </Route>
   </Routes>
   ```

**Test:**
1. Login and navigate to /app/chat
2. Should see greeting and quick action icons
3. Type a message and submit
4. Should see user message + mock AI response after 1 second
5. Try selecting different models from dropdown
6. Test Copy, Share, Regenerate buttons (console logs for now)

**Deliverables:**
- Complete chat UI with mock responses
- Model selector with free/pro distinction
- Chat input with file/audio buttons
- Message display with Markdown support
- Quick action dashboard

---

### Microstep 5.2.2: Backend AI Service Integration (9 credits, 4 hours)

**Tasks:**

1. **Get Emergent LLM Key:**
   ```bash
   # Use the emergent_integrations_manager tool to get the universal key
   # This key works with OpenAI and Google Gemini APIs
   ```

2. **Create AI Service (services/ai_service.py):**
   ```python
   import os
   import asyncio
   from openai import AsyncOpenAI
   import google.generativeai as genai
   from typing import List, Dict, AsyncGenerator
   
   # Initialize clients with Emergent LLM Key
   EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")
   
   openai_client = AsyncOpenAI(api_key=EMERGENT_LLM_KEY)
   genai.configure(api_key=EMERGENT_LLM_KEY)
   
   class AIService:
       """Unified AI service for all model interactions"""
       
       @staticmethod
       async def chat(model: str, messages: List[Dict[str, str]], stream: bool = False):
           """
           Send chat request to appropriate AI model
           
           Args:
               model: Model identifier (gpt-4o-mini, gemini-pro, etc.)
               messages: List of message dicts with 'role' and 'content'
               stream: Whether to stream the response
           
           Returns:
               Response text or async generator for streaming
           """
           try:
               if model.startswith('gpt-'):
                   return await AIService._chat_openai(model, messages, stream)
               elif model.startswith('gemini-'):
                   return await AIService._chat_gemini(model, messages, stream)
               elif model.startswith('claude-'):
                   return await AIService._chat_claude(model, messages, stream)
               else:
                   raise ValueError(f"Unknown model: {model}")
           except Exception as e:
               print(f"Error in AI chat: {str(e)}")
               raise
       
       @staticmethod
       async def _chat_openai(model: str, messages: List[Dict], stream: bool):
           """OpenAI API integration"""
           if stream:
               return AIService._stream_openai(model, messages)
           
           response = await openai_client.chat.completions.create(
               model=model,
               messages=messages,
               temperature=0.7,
               max_tokens=2000
           )
           return response.choices[0].message.content
       
       @staticmethod
       async def _stream_openai(model: str, messages: List[Dict]) -> AsyncGenerator:
           """Stream responses from OpenAI"""
           stream = await openai_client.chat.completions.create(
               model=model,
               messages=messages,
               temperature=0.7,
               max_tokens=2000,
               stream=True
           )
           
           async for chunk in stream:
               if chunk.choices[0].delta.content:
                   yield chunk.choices[0].delta.content
       
       @staticmethod
       async def _chat_gemini(model: str, messages: List[Dict], stream: bool):
           """Google Gemini API integration"""
           # Convert messages to Gemini format
           gemini_model = genai.GenerativeModel('gemini-pro')
           
           # Combine messages into single prompt for Gemini
           prompt = "\n".join([f"{msg['role']}: {msg['content']}" for msg in messages])
           
           if stream:
               response = gemini_model.generate_content(prompt, stream=True)
               async def stream_generator():
                   for chunk in response:
                       if chunk.text:
                           yield chunk.text
               return stream_generator()
           
           response = gemini_model.generate_content(prompt)
           return response.text
       
       @staticmethod
       async def _chat_claude(model: str, messages: List[Dict], stream: bool):
           """Anthropic Claude API integration (placeholder)"""
           # Note: Emergent LLM Key only supports OpenAI and Gemini
           # For Claude, user needs separate API key
           raise NotImplementedError("Claude requires separate API key")
       
       @staticmethod
       async def compare_models(models: List[str], message: str) -> List[Dict]:
           """
           Send same message to multiple models and return all responses
           
           Args:
               models: List of model identifiers
               message: User message to send
           
           Returns:
               List of response dicts with model, response, response_time
           """
           import time
           
           messages = [{"role": "user", "content": message}]
           
           tasks = []
           for model in models:
               tasks.append(AIService._compare_single_model(model, messages))
           
           results = await asyncio.gather(*tasks, return_exceptions=True)
           
           return results
       
       @staticmethod
       async def _compare_single_model(model: str, messages: List[Dict]) -> Dict:
           """Helper for model comparison"""
           import time
           
           start_time = time.time()
           try:
               response = await AIService.chat(model, messages, stream=False)
               response_time = time.time() - start_time
               
               return {
                   "model": model,
                   "response": response,
                   "response_time": round(response_time, 2),
                   "error": None
               }
           except Exception as e:
               response_time = time.time() - start_time
               return {
                   "model": model,
                   "response": None,
                   "response_time": round(response_time, 2),
                   "error": str(e)
               }
       
       @staticmethod
       def get_available_models(subscription_tier: str) -> List[Dict]:
           """Get list of available models based on subscription"""
           base_models = [
               {"id": "gpt-4o-mini", "name": "GPT-4o Mini", "tier": "free", "provider": "openai"},
               {"id": "gemini-pro", "name": "Gemini Pro", "tier": "free", "provider": "google"},
           ]
           
           pro_models = [
               {"id": "gpt-4o", "name": "GPT-4o", "tier": "pro", "provider": "openai"},
               {"id": "claude-3-7-sonnet", "name": "Claude 3.7 Sonnet", "tier": "pro", "provider": "anthropic"},
           ]
           
           if subscription_tier == "pro":
               return base_models + pro_models
           return base_models
   ```

3. **Create Chat Endpoints in server.py:**
   ```python
   from fastapi import FastAPI, HTTPException, Depends
   from fastapi.responses import StreamingResponse
   from pydantic import BaseModel
   from typing import List, Optional
   from services.ai_service import AIService
   from utils.database import conversations_collection
   from datetime import datetime
   import uuid
   
   # Pydantic models
   class ChatMessage(BaseModel):
       role: str
       content: str
   
   class ChatRequest(BaseModel):
       conversation_id: Optional[str] = None
       model: str
       message: str
       stream: bool = False
   
   class CompareRequest(BaseModel):
       models: List[str]
       message: str
   
   # Chat endpoint
   @app.post("/api/chat")
   async def chat(
       request: ChatRequest,
       current_user: dict = Depends(get_current_user)
   ):
       try:
           user_id = str(current_user["_id"])
           
           # Build message history
           messages = [{"role": "user", "content": request.message}]
           
           # If conversation exists, load history (limit to last 10 messages)
           if request.conversation_id:
               conversation = await conversations_collection.find_one({
                   "_id": request.conversation_id,
                   "user_id": user_id
               })
               if conversation:
                   recent_messages = conversation.get("messages", [])[-10:]
                   messages = [
                       {"role": msg["role"], "content": msg["content"]}
                       for msg in recent_messages
                   ] + messages
           
           # Get AI response
           if request.stream:
               async def generate():
                   async for chunk in await AIService.chat(request.model, messages, stream=True):
                       yield chunk
               
               return StreamingResponse(generate(), media_type="text/plain")
           
           response_text = await AIService.chat(request.model, messages, stream=False)
           
           # Save conversation
           conversation_id = request.conversation_id or str(uuid.uuid4())
           message_id = str(uuid.uuid4())
           
           user_message = {
               "id": str(uuid.uuid4()),
               "role": "user",
               "content": request.message,
               "model": None,
               "timestamp": datetime.utcnow().isoformat(),
               "tokens_used": 0
           }
           
           assistant_message = {
               "id": message_id,
               "role": "assistant",
               "content": response_text,
               "model": request.model,
               "timestamp": datetime.utcnow().isoformat(),
               "tokens_used": len(response_text.split())  # Rough estimate
           }
           
           if request.conversation_id:
               # Update existing conversation
               await conversations_collection.update_one(
                   {"_id": conversation_id, "user_id": user_id},
                   {
                       "$push": {
                           "messages": {
                               "$each": [user_message, assistant_message]
                           }
                       },
                       "$set": {
                           "last_message_at": datetime.utcnow(),
                           "updated_at": datetime.utcnow()
                       }
                   }
               )
           else:
               # Create new conversation
               await conversations_collection.insert_one({
                   "_id": conversation_id,
                   "user_id": user_id,
                   "title": request.message[:50] + "..." if len(request.message) > 50 else request.message,
                   "messages": [user_message, assistant_message],
                   "ai_specialist": None,
                   "tags": [],
                   "is_favorite": False,
                   "folder": None,
                   "created_at": datetime.utcnow(),
                   "last_message_at": datetime.utcnow()
               })
           
           # Update user usage stats
           await users_collection.update_one(
               {"_id": current_user["_id"]},
               {
                   "$inc": {
                       "usage_stats.total_queries": 1,
                       "usage_stats.queries_this_month": 1
                   }
               }
           )
           
           return {
               "success": True,
               "data": {
                   "message_id": message_id,
                   "conversation_id": conversation_id,
                   "response": response_text,
                   "tokens_used": assistant_message["tokens_used"],
                   "model": request.model
               }
           }
       
       except Exception as e:
           print(f"Chat error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   
   # Compare models endpoint
   @app.post("/api/chat/compare")
   async def compare_models(
       request: CompareRequest,
       current_user: dict = Depends(get_current_user)
   ):
       try:
           # Check if user can access all requested models
           user_tier = current_user.get("subscription_tier", "free")
           available = AIService.get_available_models(user_tier)
           available_ids = [m["id"] for m in available]
           
           for model in request.models:
               if model not in available_ids:
                   raise HTTPException(
                       status_code=403,
                       detail=f"Model {model} requires Pro subscription"
                   )
           
           # Get responses from all models
           results = await AIService.compare_models(request.models, request.message)
           
           # Save comparison
           comparison_id = str(uuid.uuid4())
           await model_comparisons_collection.insert_one({
               "_id": comparison_id,
               "user_id": str(current_user["_id"]),
               "query": request.message,
               "models": request.models,
               "responses": results,
               "winner": None,  # User can vote later
               "created_at": datetime.utcnow()
           })
           
           return {
               "success": True,
               "data": {
                   "comparison_id": comparison_id,
                   "results": results
               }
           }
       
       except HTTPException:
           raise
       except Exception as e:
           print(f"Compare error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   
   # Get conversations
   @app.get("/api/conversations")
   async def get_conversations(
       current_user: dict = Depends(get_current_user)
   ):
       try:
           user_id = str(current_user["_id"])
           
           conversations = await conversations_collection.find(
               {"user_id": user_id}
           ).sort("last_message_at", -1).limit(100).to_list(100)
           
           # Transform for frontend
           result = []
           for conv in conversations:
               result.append({
                   "id": conv["_id"],
                   "title": conv["title"],
                   "last_message_at": conv["last_message_at"].isoformat(),
                   "message_count": len(conv.get("messages", [])),
                   "ai_specialist": conv.get("ai_specialist")
               })
           
           return {
               "success": True,
               "data": {
                   "conversations": result
               }
           }
       
       except Exception as e:
           print(f"Get conversations error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   ```

4. **Update .env with Emergent LLM Key:**
   ```bash
   # Add to backend/.env
   EMERGENT_LLM_KEY=<key_from_emergent_integrations_manager>
   ```

5. **Test API with curl:**
   ```bash
   # Get JWT token from login
   TOKEN="your_jwt_token_here"
   
   # Test chat endpoint
   curl -X POST http://localhost:8001/api/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{
       "model": "gpt-4o-mini",
       "message": "Explain quantum computing in simple terms",
       "stream": false
     }'
   
   # Test compare endpoint
   curl -X POST http://localhost:8001/api/chat/compare \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{
       "models": ["gpt-4o-mini", "gemini-pro"],
       "message": "What is the capital of France?"
     }'
   
   # Test get conversations
   curl -X GET http://localhost:8001/api/conversations \
     -H "Authorization: Bearer $TOKEN"
   ```

**Deliverables:**
- AI Service with OpenAI and Gemini integration
- Chat API endpoint with conversation management
- Model comparison endpoint
- Conversations list endpoint
- Working AI responses via Emergent LLM Key

---

### Microstep 5.2.3: Wire Frontend to Backend Chat API (8 credits, 3.5 hours)

**Tasks:**

1. **Update Chat Store with Real API Calls (src/stores/chatStore.js):**
   ```javascript
   import { create } from 'zustand';
   import api from '../utils/api';
   
   const useChatStore = create((set, get) => ({
     conversations: [],
     currentConversation: null,
     messages: [],
     selectedModel: 'gpt-4o-mini',
     availableModels: [],
     isLoading: false,
     error: null,
     
     // Load available models
     loadAvailableModels: async () => {
       try {
         const response = await api.get('/api/models');
         set({ availableModels: response.data.data.models });
       } catch (error) {
         console.error('Failed to load models:', error);
       }
     },
     
     // Load conversations
     loadConversations: async () => {
       try {
         const response = await api.get('/api/conversations');
         set({ conversations: response.data.data.conversations });
       } catch (error) {
         console.error('Failed to load conversations:', error);
         set({ error: error.message });
       }
     },
     
     // Send message
     sendMessage: async (message) => {
       set({ isLoading: true, error: null });
       
       // Optimistic update
       const userMessage = {
         id: Date.now().toString(),
         role: 'user',
         content: message,
         timestamp: new Date().toISOString()
       };
       set({ messages: [...get().messages, userMessage] });
       
       try {
         const response = await api.post('/api/chat', {
           conversation_id: get().currentConversation,
           model: get().selectedModel,
           message: message,
           stream: false
         });
         
         const { conversation_id, response: aiResponse, message_id } = response.data.data;
         
         const assistantMessage = {
           id: message_id,
           role: 'assistant',
           content: aiResponse,
           model: get().selectedModel,
           timestamp: new Date().toISOString()
         };
         
         set({
           messages: [...get().messages, assistantMessage],
           currentConversation: conversation_id,
           isLoading: false
         });
         
         // Reload conversations list
         get().loadConversations();
       } catch (error) {
         console.error('Failed to send message:', error);
         set({
           error: error.response?.data?.detail || error.message,
           isLoading: false
         });
         // Remove optimistic message on error
         set({
           messages: get().messages.filter(m => m.id !== userMessage.id)
         });
       }
     },
     
     // Compare models
     compareModels: async (models, message) => {
       set({ isLoading: true, error: null });
       
       try {
         const response = await api.post('/api/chat/compare', {
           models: models,
           message: message
         });
         
         return response.data.data.results;
       } catch (error) {
         console.error('Failed to compare models:', error);
         set({ error: error.response?.data?.detail || error.message });
         throw error;
       } finally {
         set({ isLoading: false });
       }
     },
     
     // Select conversation
     selectConversation: async (conversationId) => {
       try {
         const response = await api.get(`/api/conversations/${conversationId}`);
         const conversation = response.data.data.conversation;
         
         set({
           currentConversation: conversationId,
           messages: conversation.messages
         });
       } catch (error) {
         console.error('Failed to load conversation:', error);
         set({ error: error.message });
       }
     },
     
     // New conversation
     newConversation: () => {
       set({
         currentConversation: null,
         messages: []
       });
     },
     
     // Select model
     selectModel: (modelId) => set({ selectedModel: modelId }),
     
     // Clear error
     clearError: () => set({ error: null }),
   }));
   
   export default useChatStore;
   ```

2. **Create API Client Utility (src/utils/api.js):**
   ```javascript
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   
   // Request interceptor to add auth token
   api.interceptors.request.use(
     (config) => {
       const token = localStorage.getItem('token');
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
       return config;
     },
     (error) => {
       return Promise.reject(error);
     }
   );
   
   // Response interceptor to handle errors
   api.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         // Token expired or invalid
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         window.location.href = '/login';
       }
       return Promise.reject(error);
     }
   );
   
   export default api;
   ```

3. **Update ChatPage to Load Conversations on Mount:**
   ```jsx
   import React, { useEffect } from 'react';
   import useChatStore from '../stores/chatStore';
   // ... other imports
   
   export default function ChatPage() {
     const { messages, loadConversations, loadAvailableModels } = useChatStore();
     
     useEffect(() => {
       loadConversations();
       loadAvailableModels();
     }, [loadConversations, loadAvailableModels]);
     
     // ... rest of component
   }
   ```

4. **Add Error Display Component (src/components/features/chat/ErrorBanner.jsx):**
   ```jsx
   import React from 'react';
   import { AlertCircle, X } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   
   export default function ErrorBanner() {
     const { error, clearError } = useChatStore();
     
     if (!error) return null;
     
     return (
       <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg flex items-center justify-between">
         <div className="flex items-center gap-2">
           <AlertCircle className="w-5 h-5" />
           <span>{error}</span>
         </div>
         <button onClick={clearError} className="hover:bg-error/20 rounded p-1">
           <X className="w-4 h-4" />
         </button>
       </div>
     );
   }
   ```

5. **Add Conversation Sidebar (src/components/features/chat/ConversationSidebar.jsx):**
   ```jsx
   import React from 'react';
   import { MessageSquare, Trash2 } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   import { formatDistanceToNow } from 'date-fns';
   
   export default function ConversationSidebar() {
     const {
       conversations,
       currentConversation,
       selectConversation,
       newConversation
     } = useChatStore();
     
     return (
       <div className="w-64 border-r border-border bg-surface p-4">
         <button
           onClick={newConversation}
           className="w-full mb-4 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center gap-2"
         >
           <MessageSquare className="w-4 h-4" />
           New Chat
         </button>
         
         <div className="space-y-2">
           <h3 className="text-xs font-semibold text-text-secondary uppercase mb-2">
             Recent Conversations
           </h3>
           
           {conversations.map((conv) => (
             <button
               key={conv.id}
               onClick={() => selectConversation(conv.id)}
               className={`w-full text-left p-3 rounded-lg hover:bg-surface-elevated transition ${
                 currentConversation === conv.id ? 'bg-surface-elevated' : ''
               }`}
             >
               <div className="flex items-start justify-between">
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-medium truncate">{conv.title}</p>
                   <p className="text-xs text-text-secondary mt-1">
                     {formatDistanceToNow(new Date(conv.last_message_at), {
                       addSuffix: true
                     })}
                   </p>
                 </div>
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     // Handle delete
                   }}
                   className="ml-2 p-1 hover:bg-surface rounded"
                 >
                   <Trash2 className="w-3 h-3 text-text-muted" />
                 </button>
               </div>
             </button>
           ))}
         </div>
       </div>
     );
   }
   ```

6. **Update ChatPage with Sidebar:**
   ```jsx
   import ConversationSidebar from '../components/features/chat/ConversationSidebar';
   import ErrorBanner from '../components/features/chat/ErrorBanner';
   
   export default function ChatPage() {
     // ... existing code
     
     return (
       <div className="flex h-full">
         <ConversationSidebar />
         
         <div className="flex-1 flex flex-col">
           {/* Model Selector Bar */}
           <div className="p-4 border-b border-border">
             <div className="max-w-4xl mx-auto">
               <ErrorBanner />
               <div className="flex items-center gap-4 mt-2">
                 <ModelSelector />
                 <Button variant="outline">Compare Models</Button>
                 <Button variant="ghost">History</Button>
               </div>
             </div>
           </div>
           
           {/* Main Content */}
           {hasMessages ? <MessageList /> : <ChatDashboard />}
           
           {/* Chat Input */}
           <ChatInput />
         </div>
       </div>
     );
   }
   ```

**Test:**
1. Start backend: `cd /app/backend && sudo supervisorctl restart backend`
2. Start frontend: `cd /app/frontend && yarn start`
3. Login and navigate to chat
4. Send a real message → Should get AI response
5. Check browser Network tab → Should see POST to /api/chat
6. Verify conversation saved in MongoDB
7. Refresh page → Conversation should persist
8. Start new chat → Should work
9. Test error handling by stopping backend

**Deliverables:**
- Frontend fully integrated with backend API
- Real AI responses via Emergent LLM Key
- Conversation persistence
- Error handling and display
- Conversation sidebar with history

---

### Microstep 5.2.4: Implement Streaming Responses (7 credits, 3 hours)

**Tasks:**

1. **Update ChatInput to Toggle Streaming:**
   ```jsx
   const { sendMessage, sendStreamingMessage, isLoading } = useChatStore();
   const [useStreaming, setUseStreaming] = useState(true);
   
   const handleSubmit = (e) => {
     e.preventDefault();
     if (message.trim() && !isLoading) {
       if (useStreaming) {
         sendStreamingMessage(message);
       } else {
         sendMessage(message);
       }
       setMessage('');
     }
   };
   ```

2. **Add Streaming Support to Chat Store:**
   ```javascript
   sendStreamingMessage: async (message) => {
     set({ isLoading: true, error: null });
     
     // Add user message
     const userMessage = {
       id: Date.now().toString(),
       role: 'user',
       content: message,
       timestamp: new Date().toISOString()
     };
     set({ messages: [...get().messages, userMessage] });
     
     // Create placeholder for assistant message
     const assistantMessageId = (Date.now() + 1).toString();
     const assistantMessage = {
       id: assistantMessageId,
       role: 'assistant',
       content: '',
       model: get().selectedModel,
       timestamp: new Date().toISOString(),
       isStreaming: true
     };
     set({ messages: [...get().messages, assistantMessage] });
     
     try {
       const token = localStorage.getItem('token');
       const response = await fetch(
         `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
         {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify({
             conversation_id: get().currentConversation,
             model: get().selectedModel,
             message: message,
             stream: true
           })
         }
       );
       
       if (!response.ok) {
         throw new Error('Streaming failed');
       }
       
       const reader = response.body.getReader();
       const decoder = new TextDecoder();
       let fullContent = '';
       
       while (true) {
         const { done, value } = await reader.read();
         
         if (done) break;
         
         const chunk = decoder.decode(value);
         fullContent += chunk;
         
         // Update message content in real-time
         set({
           messages: get().messages.map(m =>
             m.id === assistantMessageId
               ? { ...m, content: fullContent }
               : m
           )
         });
       }
       
       // Mark streaming as complete
       set({
         messages: get().messages.map(m =>
           m.id === assistantMessageId
               ? { ...m, isStreaming: false }
               : m
         ),
         isLoading: false
       });
       
       // Reload conversations
       get().loadConversations();
       
     } catch (error) {
       console.error('Streaming error:', error);
       set({
         error: error.message,
         isLoading: false,
         messages: get().messages.filter(m => m.id !== assistantMessageId)
       });
     }
   },
   ```

3. **Update Message Component to Show Streaming Indicator:**
   ```jsx
   export default function Message({ message }) {
     const isStreaming = message.isStreaming;
     
     return (
       <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
         {message.role === 'assistant' ? (
           <div className="bg-surface rounded-lg p-4 max-w-3xl">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-6 rounded-full bg-primary" />
               <span className="text-sm text-text-secondary">{message.model}</span>
             </div>
             
             <div className="prose prose-invert max-w-none">
               <ReactMarkdown>{message.content}</ReactMarkdown>
               {isStreaming && (
                 <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
               )}
             </div>
             
             {!isStreaming && (
               <div className="flex gap-2 mt-4">
                 <Button variant="ghost" size="sm">
                   <Copy className="w-4 h-4 mr-2" />
                   Copy
                 </Button>
                 <Button variant="ghost" size="sm">
                   <Share2 className="w-4 h-4 mr-2" />
                   Share
                 </Button>
                 <Button variant="ghost" size="sm">
                   <RefreshCw className="w-4 h-4 mr-2" />
                   Regenerate
                 </Button>
               </div>
             )}
           </div>
         ) : (
           <div className="bg-primary text-white rounded-lg px-4 py-3 max-w-xl">
             {message.content}
           </div>
         )}
       </div>
     );
   }
   ```

4. **Add Auto-Scroll to Bottom:**
   ```jsx
   import { useEffect, useRef } from 'react';
   
   export default function MessageList() {
     const { messages } = useChatStore();
     const messagesEndRef = useRef(null);
     
     const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     };
     
     useEffect(() => {
       scrollToBottom();
     }, [messages]);
     
     return (
       <div className="flex-1 overflow-y-auto p-6">
         <div className="max-w-4xl mx-auto space-y-6">
           {messages.map((message) => (
             <Message key={message.id} message={message} />
           ))}
           <div ref={messagesEndRef} />
         </div>
       </div>
     );
   }
   ```

**Test:**
1. Send a message with streaming enabled
2. Should see response appear character-by-character
3. Should see blinking cursor while streaming
4. Should auto-scroll to bottom as content appears
5. After streaming completes, action buttons should appear

**Deliverables:**
- Streaming response support
- Real-time message updates
- Streaming indicator (blinking cursor)
- Auto-scroll functionality

---

### Microstep 5.2.5: Model Comparison UI (8 credits, 3.5 hours)

**Tasks:**

1. **Create ComparisonModal Component (src/components/features/chat/ComparisonModal.jsx):**
   ```jsx
   import React, { useState } from 'react';
   import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
   } from '../../ui/dialog';
   import { Button } from '../../ui/button';
   import { Checkbox } from '../../ui/checkbox';
   import { Lock } from 'lucide-react';
   import useChatStore from '../../../stores/chatStore';
   import useAuthStore from '../../../stores/authStore';
   
   export default function ComparisonModal({ isOpen, onClose }) {
     const { availableModels } = useChatStore();
     const { user } = useAuthStore();
     const [selectedModels, setSelectedModels] = useState([]);
     const [message, setMessage] = useState('');
     const [isComparing, setIsComparing] = useState(false);
     const [results, setResults] = useState(null);
     
     const isPro = user?.subscription_tier === 'pro';
     
     const handleModelToggle = (modelId) => {
       if (selectedModels.includes(modelId)) {
         setSelectedModels(selectedModels.filter(id => id !== modelId));
       } else if (selectedModels.length < 3) {
         setSelectedModels([...selectedModels, modelId]);
       }
     };
     
     const handleCompare = async () => {
       if (selectedModels.length < 2 || !message.trim()) return;
       
       setIsComparing(true);
       try {
         const compareResults = await useChatStore.getState().compareModels(
           selectedModels,
           message
         );
         setResults(compareResults);
       } catch (error) {
         console.error('Comparison failed:', error);
       } finally {
         setIsComparing(false);
       }
     };
     
     const freeModels = availableModels.filter(m => m.tier === 'free');
     const proModels = availableModels.filter(m => m.tier === 'pro');
     
     return (
       <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle>Compare AI Models</DialogTitle>
             <DialogDescription>
               Select 2-3 models and ask the same question to compare responses
             </DialogDescription>
           </DialogHeader>
           
           {!results ? (
             <div className="space-y-6">
               {/* Model Selection */}
               <div>
                 <h3 className="font-medium mb-3">Basic Models (Free)</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {freeModels.map((model) => (
                     <label
                       key={model.id}
                       className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                         selectedModels.includes(model.id)
                           ? 'border-primary bg-primary/10'
                           : 'border-border hover:border-primary/50'
                       }`}
                     >
                       <Checkbox
                         checked={selectedModels.includes(model.id)}
                         onCheckedChange={() => handleModelToggle(model.id)}
                         disabled={
                           selectedModels.length >= 3 &&
                           !selectedModels.includes(model.id)
                         }
                       />
                       <div>
                         <p className="font-medium">{model.name}</p>
                         <p className="text-xs text-text-secondary">
                           {model.provider}
                         </p>
                       </div>
                     </label>
                   ))}
                 </div>
               </div>
               
               <div>
                 <h3 className="font-medium mb-3">
                   Advanced Models {!isPro && <Lock className="inline w-4 h-4 ml-1" />}
                 </h3>
                 <div className="grid grid-cols-2 gap-3">
                   {proModels.map((model) => (
                     <label
                       key={model.id}
                       className={`flex items-center gap-3 p-4 rounded-lg border transition ${
                         !isPro
                           ? 'opacity-50 cursor-not-allowed'
                           : selectedModels.includes(model.id)
                           ? 'border-primary bg-primary/10 cursor-pointer'
                           : 'border-border hover:border-primary/50 cursor-pointer'
                       }`}
                     >
                       <Checkbox
                         checked={selectedModels.includes(model.id)}
                         onCheckedChange={() => isPro && handleModelToggle(model.id)}
                         disabled={
                           !isPro ||
                           (selectedModels.length >= 3 &&
                             !selectedModels.includes(model.id))
                         }
                       />
                       <div>
                         <p className="font-medium">{model.name}</p>
                         <p className="text-xs text-text-secondary">
                           {model.provider}
                         </p>
                       </div>
                       {!isPro && <Lock className="ml-auto w-4 h-4" />}
                     </label>
                   ))}
                 </div>
               </div>
               
               {/* Query Input */}
               <div>
                 <h3 className="font-medium mb-3">Your Question</h3>
                 <textarea
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   placeholder="Enter your question..."
                   className="w-full p-3 bg-surface border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                   rows={4}
                 />
               </div>
               
               {/* Compare Button */}
               <div className="flex justify-between items-center">
                 <p className="text-sm text-text-secondary">
                   {selectedModels.length}/3 models selected
                 </p>
                 <div className="flex gap-2">
                   <Button variant="outline" onClick={onClose}>
                     Cancel
                   </Button>
                   <Button
                     onClick={handleCompare}
                     disabled={
                       selectedModels.length < 2 ||
                       !message.trim() ||
                       isComparing
                     }
                   >
                     {isComparing ? 'Comparing...' : 'Compare Models'}
                   </Button>
                 </div>
               </div>
             </div>
           ) : (
             <ComparisonResults
               results={results}
               message={message}
               onClose={() => {
                 setResults(null);
                 setSelectedModels([]);
                 setMessage('');
                 onClose();
               }}
             />
           )}
         </DialogContent>
       </Dialog>
     );
   }
   ```

2. **Create ComparisonResults Component:**
   ```jsx
   function ComparisonResults({ results, message, onClose }) {
     const [selectedWinner, setSelectedWinner] = useState(null);
     
     return (
       <div className="space-y-6">
         <div>
           <h3 className="font-medium mb-2">Question:</h3>
           <p className="text-text-secondary">{message}</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {results.map((result, index) => (
             <div
               key={index}
               className={`p-4 rounded-lg border ${
                 result.error
                   ? 'border-error bg-error/10'
                   : selectedWinner === result.model
                   ? 'border-success bg-success/10'
                   : 'border-border bg-surface'
               }`}
             >
               <div className="flex items-center justify-between mb-3">
                 <h4 className="font-medium">{result.model}</h4>
                 <span className="text-xs text-text-secondary">
                   {result.response_time}s
                 </span>
               </div>
               
               {result.error ? (
                 <p className="text-error text-sm">{result.error}</p>
               ) : (
                 <>
                   <div className="prose prose-sm prose-invert max-w-none mb-3">
                     <ReactMarkdown>{result.response}</ReactMarkdown>
                   </div>
                   
                   <Button
                     size="sm"
                     variant={selectedWinner === result.model ? 'default' : 'outline'}
                     onClick={() => setSelectedWinner(result.model)}
                     className="w-full"
                   >
                     {selectedWinner === result.model ? '✓ Best Response' : 'Vote Best'}
                   </Button>
                 </>
               )}
             </div>
           ))}
         </div>
         
         <div className="flex justify-end gap-2">
           <Button onClick={onClose}>Close</Button>
         </div>
       </div>
     );
   }
   ```

3. **Update ChatPage to Include Comparison Modal:**
   ```jsx
   import { useState } from 'react';
   import ComparisonModal from '../components/features/chat/ComparisonModal';
   
   export default function ChatPage() {
     const [showComparison, setShowComparison] = useState(false);
     
     return (
       <div className="flex h-full">
         {/* ... existing code */}
         
         <div className="p-4 border-b border-border">
           <div className="max-w-4xl mx-auto">
             <div className="flex items-center gap-4">
               <ModelSelector />
               <Button
                 variant="outline"
                 onClick={() => setShowComparison(true)}
               >
                 Compare Models
               </Button>
             </div>
           </div>
         </div>
         
         {/* ... rest of code */}
         
         <ComparisonModal
           isOpen={showComparison}
           onClose={() => setShowComparison(false)}
         />
       </div>
     );
   }
   ```

**Test:**
1. Click "Compare Models" button
2. Select 2-3 models (mix of free and pro)
3. Enter a question
4. Click "Compare Models"
5. Should see 3 columns with responses
6. Response times should be displayed
7. Vote for best response
8. Error handling for failed model requests

**Deliverables:**
- Model comparison modal
- Side-by-side response display
- Voting mechanism
- Response time tracking
- Pro model locking for free users

---

## VERTICAL SLICE 3: AI SPECIALISTS

### Objective
Implement AI Specialists (Nova, Remy, Lennon) with specialized system prompts and dedicated chat interfaces.

---

### Microstep 5.3.1: Specialists Gallery UI (7 credits, 3 hours)

**Tasks:**

1. **Create Specialist Store (src/stores/specialistStore.js):**
   ```javascript
   import { create } from 'zustand';
   import api from '../utils/api';
   
   const useSpecialistStore = create((set, get) => ({
     specialists: [],
     activeSpecialist: null,
     isLoading: false,
     
     loadSpecialists: async () => {
       try {
         const response = await api.get('/api/specialists');
         set({ specialists: response.data.data.specialists });
       } catch (error) {
         console.error('Failed to load specialists:', error);
       }
     },
     
     selectSpecialist: (specialistId) => {
       const specialist = get().specialists.find(s => s.id === specialistId);
       set({ activeSpecialist: specialist });
     },
     
     clearSpecialist: () => {
       set({ activeSpecialist: null });
     },
   }));
   
   export default useSpecialistStore;
   ```

2. **Create SpecialistCard Component (src/components/features/specialists/SpecialistCard.jsx):**
   ```jsx
   import React from 'react';
   import { useNavigate } from 'react-router-dom';
   import { motion } from 'framer-motion';
   
   export default function SpecialistCard({ specialist }) {
     const navigate = useNavigate();
     
     const gradientColors = {
       nova: 'from-orange-500 to-orange-600',
       remy: 'from-blue-500 to-blue-600',
       lennon: 'from-purple-500 to-purple-600',
     };
     
     return (
       <motion.button
         onClick={() => navigate(`/app/specialists/${specialist.id}`)}
         className={`relative overflow-hidden rounded-xl p-6 text-left transition-transform hover:scale-105 bg-gradient-to-br ${
           gradientColors[specialist.id] || 'from-gray-500 to-gray-600'
         }`}
         whileHover={{ y: -4 }}
         whileTap={{ scale: 0.98 }}
       >
         {/* Starry background effect */}
         <div className="absolute inset-0 opacity-20">
           <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full animate-pulse" />
           <div className="absolute top-8 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-100" />
           <div className="absolute top-12 right-6 w-1 h-1 bg-white rounded-full animate-pulse delay-200" />
         </div>
         
         {/* Avatar */}
         <div className="relative z-10 mb-4">
           <img
             src={specialist.avatar_url}
             alt={specialist.name}
             className="w-24 h-24 rounded-full border-4 border-white/20"
           />
         </div>
         
         {/* Content */}
         <div className="relative z-10">
           <h3 className="text-2xl font-bold text-white mb-1">
             {specialist.name}
           </h3>
           <p className="text-white/90 font-medium mb-3">
             {specialist.role}
           </p>
           <p className="text-white/80 text-sm leading-relaxed">
             {specialist.description}
           </p>
         </div>
       </motion.button>
     );
   }
   ```

3. **Create SpecialistsPage (src/pages/SpecialistsPage.jsx):**
   ```jsx
   import React, { useEffect } from 'react';
   import { ChevronLeft } from 'lucide-react';
   import { useNavigate } from 'react-router-dom';
   import { Button } from '../components/ui/button';
   import SpecialistCard from '../components/features/specialists/SpecialistCard';
   import useSpecialistStore from '../stores/specialistStore';
   import { motion } from 'framer-motion';
   
   export default function SpecialistsPage() {
     const navigate = useNavigate();
     const { specialists, loadSpecialists } = useSpecialistStore();
     
     useEffect(() => {
       loadSpecialists();
     }, [loadSpecialists]);
     
     return (
       <div className="h-full overflow-y-auto p-8">
         <div className="max-w-6xl mx-auto">
           {/* Header */}
           <div className="mb-8">
             <Button
               variant="ghost"
               onClick={() => navigate('/app/chat')}
               className="mb-4"
             >
               <ChevronLeft className="w-4 h-4 mr-2" />
               Back to Chat
             </Button>
             
             <h1 className="text-4xl font-bold mb-2">AI Specialists</h1>
             <p className="text-text-secondary text-lg">
               Delegate tasks to AI experts trained for specific roles
             </p>
           </div>
           
           {/* Specialists Grid */}
           <motion.div
             className="grid grid-cols-1 md:grid-cols-2 gap-6"
             initial="hidden"
             animate="visible"
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: {
                   staggerChildren: 0.1
                 }
               }
             }}
           >
             {specialists.map((specialist) => (
               <motion.div
                 key={specialist.id}
                 variants={{
                   hidden: { opacity: 0, y: 20 },
                   visible: { opacity: 1, y: 0 }
                 }}
               >
                 <SpecialistCard specialist={specialist} />
               </motion.div>
             ))}
           </motion.div>
         </div>
       </div>
     );
   }
   ```

4. **Add Route in App.jsx:**
   ```jsx
   import SpecialistsPage from './pages/SpecialistsPage';
   
   <Route path="specialists" element={<SpecialistsPage />} />
   ```

**Test:**
1. Navigate to /app/specialists
2. Should see 3 specialist cards (Nova, Remy, Lennon)
3. Cards should have gradient backgrounds
4. Hover effects should work
5. Click specialist → Should navigate to specialist chat

**Deliverables:**
- Specialists gallery with cards
- Gradient backgrounds per specialist
- Hover animations
- Navigation to specialist chat

---

### Microstep 5.3.2: Backend Specialist System Prompts (8 credits, 3.5 hours)

**Tasks:**

1. **Create Specialists Service (services/specialists_service.py):**
   ```python
   from typing import Dict, List
   
   class SpecialistsService:
       """Manage AI Specialists with specialized system prompts"""
       
       SPECIALISTS = {
           "nova": {
               "id": "nova",
               "name": "Nova",
               "role": "Product Manager",
               "description": "Helps with writing PRDs, user stories, and product features",
               "avatar_url": "/avatars/nova.png",
               "color": "#f97316",
               "system_prompt": """You are Nova, an experienced Product Manager AI assistant.
   
   Your expertise includes:
   - Writing comprehensive Product Requirements Documents (PRDs)
   - Creating user stories with clear acceptance criteria
   - Defining product features and specifications
   - Planning product roadmaps
   - Prioritizing features based on business value
   - Conducting competitive analysis
   
   Your communication style:
   - Professional and structured
   - Ask clarifying questions before diving into details
   - Use frameworks like RICE, MoSCoW for prioritization
   - Include specific examples and metrics where appropriate
   - Format outputs with clear sections and bullet points
   
   When writing a PRD, always include:
   1. Problem Statement
   2. Target Users
   3. Goals & Success Metrics
   4. Functional Requirements
   5. Non-Functional Requirements
   6. User Stories
   7. Design Considerations
   8. Technical Considerations
   9. Launch Plan
   
   Be methodical and thorough in your responses.""",
               "suggested_prompts": [
                   "Help me write a PRD for a new authentication feature",
                   "Create user stories for a dashboard redesign",
                   "Analyze this market research data and suggest features",
                   "Prioritize these 10 features using RICE scoring"
               ]
           },
           
           "remy": {
               "id": "remy",
               "name": "Remy",
               "role": "Content Writer",
               "description": "Helps with writing emails, blog posts, and newsletters",
               "avatar_url": "/avatars/remy.png",
               "color": "#3b82f6",
               "system_prompt": """You are Remy, a skilled Content Writer AI assistant.
   
   Your expertise includes:
   - Writing engaging blog posts and articles
   - Crafting professional emails
   - Creating compelling newsletters
   - Developing long-form content
   - SEO-optimized writing
   - Editing and refining existing content
   
   Your writing style:
   - Clear, engaging, and conversational
   - Adapts tone based on audience and purpose
   - Uses storytelling techniques
   - Includes hooks and strong calls-to-action
   - Varies sentence structure for readability
   
   For different content types:
   
   **Blog Posts:**
   - Start with attention-grabbing hook
   - Use subheadings for scannability
   - Include examples and data
   - End with actionable takeaways
   
   **Emails:**
   - Clear subject line suggestion
   - Professional yet friendly tone
   - Concise and purposeful
   - Single clear call-to-action
   
   **Newsletters:**
   - Engaging intro that connects with readers
   - Mix of value-adding content
   - Personal touches
   - Multiple sections with variety
   
   Always offer style variations when appropriate.""",
               "suggested_prompts": [
                   "Write a blog post about AI productivity tips",
                   "Draft a professional email to introduce our new product",
                   "Create a weekly newsletter about tech trends",
                   "Help me improve this article draft [paste text]"
               ]
           },
           
           "lennon": {
               "id": "lennon",
               "name": "Lennon",
               "role": "Social Media Manager",
               "description": "Helps with Instagram posts, social strategies, and content calendars",
               "avatar_url": "/avatars/lennon.png",
               "color": "#a855f7",
               "system_prompt": """You are Lennon, a creative Social Media Manager AI assistant.
   
   Your expertise includes:
   - Creating engaging Instagram posts and captions
   - Developing social media strategies
   - Planning content calendars
   - Writing platform-specific content (Instagram, Twitter, LinkedIn, TikTok)
   - Hashtag research and optimization
   - Analyzing social media trends
   
   Your approach:
   - Energetic and trend-aware
   - Platform-specific best practices
   - Authentic and relatable voice
   - Visual storytelling mindset
   - Data-driven recommendations
   
   For Instagram posts:
   - Catchy first line (hook)
   - Story-driven captions
   - 3-5 relevant hashtags
   - Clear call-to-action
   - Emoji usage for visual appeal
   
   For Twitter/X:
   - Concise and punchy
   - Thread structure when needed
   - 280-character optimization
   - Trending topic awareness
   
   For LinkedIn:
   - Professional yet personable
   - Value-first content
   - Industry insights
   - Engagement-driving questions
   
   Content Calendar Strategy:
   - Mix of content types (educational, entertaining, promotional)
   - Posting frequency by platform
   - Best times to post
   - Theme days/pillars
   
   Always stay current with platform algorithm changes and trends.""",
               "suggested_prompts": [
                   "Create an Instagram caption for our new product launch",
                   "Develop a 30-day content calendar for LinkedIn",
                   "Write a viral Twitter thread about [topic]",
                   "Suggest trending hashtags for [industry/niche]"
               ]
           }
       }
       
       @classmethod
       def get_all_specialists(cls) -> List[Dict]:
           """Get list of all specialists without system prompts"""
           return [
               {
                   "id": spec["id"],
                   "name": spec["name"],
                   "role": spec["role"],
                   "description": spec["description"],
                   "avatar_url": spec["avatar_url"],
                   "color": spec["color"]
               }
               for spec in cls.SPECIALISTS.values()
           ]
       
       @classmethod
       def get_specialist(cls, specialist_id: str) -> Dict:
           """Get specialist details including system prompt"""
           if specialist_id not in cls.SPECIALISTS:
               raise ValueError(f"Unknown specialist: {specialist_id}")
           return cls.SPECIALISTS[specialist_id]
       
       @classmethod
       def get_system_prompt(cls, specialist_id: str) -> str:
           """Get system prompt for specialist"""
           specialist = cls.get_specialist(specialist_id)
           return specialist["system_prompt"]
       
       @classmethod
       def get_suggested_prompts(cls, specialist_id: str) -> List[str]:
           """Get suggested prompts for specialist"""
           specialist = cls.get_specialist(specialist_id)
           return specialist["suggested_prompts"]
   ```

2. **Add Specialists Endpoints to server.py:**
   ```python
   from services.specialists_service import SpecialistsService
   
   @app.get("/api/specialists")
   async def get_specialists():
       """Get list of all AI specialists"""
       try:
           specialists = SpecialistsService.get_all_specialists()
           return {
               "success": True,
               "data": {
                   "specialists": specialists
               }
           }
       except Exception as e:
           print(f"Get specialists error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   
   @app.get("/api/specialists/{specialist_id}")
   async def get_specialist(specialist_id: str):
       """Get specialist details with suggested prompts"""
       try:
           specialist = SpecialistsService.get_specialist(specialist_id)
           return {
               "success": True,
               "data": {
                   "specialist": {
                       "id": specialist["id"],
                       "name": specialist["name"],
                       "role": specialist["role"],
                       "description": specialist["description"],
                       "avatar_url": specialist["avatar_url"],
                       "color": specialist["color"],
                       "suggested_prompts": specialist["suggested_prompts"]
                   }
               }
           }
       except ValueError as e:
           raise HTTPException(status_code=404, detail=str(e))
       except Exception as e:
           print(f"Get specialist error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   
   @app.post("/api/specialists/{specialist_id}/chat")
   async def chat_with_specialist(
       specialist_id: str,
       request: ChatRequest,
       current_user: dict = Depends(get_current_user)
   ):
       """Chat with a specific AI specialist"""
       try:
           user_id = str(current_user["_id"])
           
           # Get specialist system prompt
           system_prompt = SpecialistsService.get_system_prompt(specialist_id)
           
           # Build messages with system prompt
           messages = [{"role": "system", "content": system_prompt}]
           
           # Load conversation history if exists
           if request.conversation_id:
               conversation = await conversations_collection.find_one({
                   "_id": request.conversation_id,
                   "user_id": user_id
               })
               if conversation:
                   recent_messages = conversation.get("messages", [])[-10:]
                   messages.extend([
                       {"role": msg["role"], "content": msg["content"]}
                       for msg in recent_messages
                   ])
           
           # Add current message
           messages.append({"role": "user", "content": request.message})
           
           # Get AI response
           response_text = await AIService.chat(request.model, messages, stream=False)
           
           # Save conversation with specialist tag
           conversation_id = request.conversation_id or str(uuid.uuid4())
           
           user_message = {
               "id": str(uuid.uuid4()),
               "role": "user",
               "content": request.message,
               "timestamp": datetime.utcnow().isoformat()
           }
           
           assistant_message = {
               "id": str(uuid.uuid4()),
               "role": "assistant",
               "content": response_text,
               "model": request.model,
               "timestamp": datetime.utcnow().isoformat()
           }
           
           if request.conversation_id:
               await conversations_collection.update_one(
                   {"_id": conversation_id, "user_id": user_id},
                   {
                       "$push": {
                           "messages": {"$each": [user_message, assistant_message]}
                       },
                       "$set": {
                           "last_message_at": datetime.utcnow(),
                           "updated_at": datetime.utcnow()
                       }
                   }
               )
           else:
               await conversations_collection.insert_one({
                   "_id": conversation_id,
                   "user_id": user_id,
                   "title": request.message[:50] + "...",
                   "messages": [user_message, assistant_message],
                   "ai_specialist": specialist_id,
                   "tags": [specialist_id],
                   "created_at": datetime.utcnow(),
                   "last_message_at": datetime.utcnow()
               })
           
           return {
               "success": True,
               "data": {
                   "conversation_id": conversation_id,
                   "response": response_text,
                   "specialist": specialist_id
               }
           }
       
       except ValueError as e:
           raise HTTPException(status_code=404, detail=str(e))
       except Exception as e:
           print(f"Specialist chat error: {str(e)}")
           raise HTTPException(status_code=500, detail=str(e))
   ```

**Test with curl:**
```bash
TOKEN="your_jwt_token"

# Get all specialists
curl http://localhost:8001/api/specialists

# Get specialist details
curl http://localhost:8001/api/specialists/nova

# Chat with specialist
curl -X POST http://localhost:8001/api/specialists/nova/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "model": "gpt-4o-mini",
    "message": "Write a PRD for a new user authentication feature"
  }'
```

**Deliverables:**
- Specialist service with system prompts
- Endpoints for specialists
- Chat endpoint with specialist context
- 3 specialists fully defined (Nova, Remy, Lennon)

---

### Microstep 5.3.3: Specialist Chat Interface (7 credits, 3 hours)

**Tasks:**

1. **Create SpecialistChatPage (src/pages/SpecialistChatPage.jsx):**
   ```jsx
   import React, { useEffect, useState } from 'react';
   import { useParams, useNavigate } from 'react-router-dom';
   import { ChevronLeft } from 'lucide-react';
   import { Button } from '../components/ui/button';
   import MessageList from '../components/features/chat/MessageList';
   import ChatInput from '../components/features/chat/ChatInput';
   import useSpecialistStore from '../stores/specialistStore';
   import useChatStore from '../stores/chatStore';
   import api from '../utils/api';
   
   export default function SpecialistChatPage() {
     const { specialistId } = useParams();
     const navigate = useNavigate();
     const { activeSpecialist, selectSpecialist } = useSpecialistStore();
     const { messages, newConversation } = useChatStore();
     const [suggestedPrompts, setSuggestedPrompts] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     
     useEffect(() => {
       const loadSpecialist = async () => {
         try {
           const response = await api.get(`/api/specialists/${specialistId}`);
           const specialist = response.data.data.specialist;
           selectSpecialist(specialistId);
           setSuggestedPrompts(specialist.suggested_prompts || []);
         } catch (error) {
           console.error('Failed to load specialist:', error);
         } finally {
           setIsLoading(false);
         }
       };
       
       loadSpecialist();
       newConversation();
     }, [specialistId, selectSpecialist, newConversation]);
     
     const handleSuggestedPrompt = (prompt) => {
       // Trigger chat input with suggested prompt
       document.querySelector('textarea').value = prompt;
       document.querySelector('textarea').focus();
     };
     
     if (isLoading || !activeSpecialist) {
       return <div>Loading...</div>;
     }
     
     const hasMessages = messages.length > 0;
     
     return (
       <div className="flex flex-col h-full">
         {/* Header */}
         <div className="p-4 border-b border-border bg-surface">
           <div className="max-w-4xl mx-auto">
             <Button
               variant="ghost"
               onClick={() => navigate('/app/specialists')}
               className="mb-3"
             >
               <ChevronLeft className="w-4 h-4 mr-2" />
               Back to AI Specialists
             </Button>
             
             <div className="flex items-center gap-4">
               <img
                 src={activeSpecialist.avatar_url}
                 alt={activeSpecialist.name}
                 className="w-16 h-16 rounded-full"
                 style={{
                   border: `3px solid ${activeSpecialist.color}`,
                   boxShadow: `0 0 20px ${activeSpecialist.color}40`
                 }}
               />
               <div>
                 <h1 className="text-2xl font-bold">{activeSpecialist.name}</h1>
                 <p className="text-text-secondary">{activeSpecialist.role}</p>
               </div>
             </div>
           </div>
         </div>
         
         {/* Main Content */}
         {hasMessages ? (
           <MessageList />
         ) : (
           <div className="flex-1 flex items-center justify-center p-8">
             <div className="max-w-2xl w-full">
               <div
                 className="p-6 rounded-xl mb-6 text-center"
                 style={{
                   background: `linear-gradient(135deg, ${activeSpecialist.color}20, ${activeSpecialist.color}10)`
                 }}
               >
                 <p className="text-lg">
                   Hi! I'm {activeSpecialist.name}, your {activeSpecialist.role} specialist.
                 </p>
                 <p className="text-text-secondary mt-2">
                   {activeSpecialist.description}
                 </p>
               </div>
               
               {suggestedPrompts.length > 0 && (
                 <div>
                   <h3 className="text-sm font-medium text-text-secondary mb-3">
                     Suggested Prompts:
                   </h3>
                   <div className="space-y-2">
                     {suggestedPrompts.map((prompt, index) => (
                       <button
                         key={index}
                         onClick={() => handleSuggestedPrompt(prompt)}
                         className="w-full text-left p-4 rounded-lg bg-surface hover:bg-surface-elevated transition border border-border"
                       >
                         {prompt}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         )}
         
         {/* Chat Input */}
         <ChatInput specialistId={specialistId} />
       </div>
     );
   }
   ```

2. **Update ChatInput to Support Specialist Mode:**
   ```jsx
   export default function ChatInput({ specialistId }) {
     const [message, setMessage] = useState('');
     const { sendMessage, sendSpecialistMessage, isLoading } = useChatStore();
     
     const handleSubmit = (e) => {
       e.preventDefault();
       if (message.trim() && !isLoading) {
         if (specialistId) {
           sendSpecialistMessage(specialistId, message);
         } else {
           sendMessage(message);
         }
         setMessage('');
       }
     };
     
     // ... rest of component
   }
   ```

3. **Update Chat Store with Specialist Methods:**
   ```javascript
   sendSpecialistMessage: async (specialistId, message) => {
     set({ isLoading: true, error: null });
     
     const userMessage = {
       id: Date.now().toString(),
       role: 'user',
       content: message,
       timestamp: new Date().toISOString()
     };
     set({ messages: [...get().messages, userMessage] });
     
     try {
       const response = await api.post(`/api/specialists/${specialistId}/chat`, {
         conversation_id: get().currentConversation,
         model: get().selectedModel,
         message: message
       });
       
       const { conversation_id, response: aiResponse } = response.data.data;
       
       const assistantMessage = {
         id: Date.now().toString(),
         role: 'assistant',
         content: aiResponse,
         model: get().selectedModel,
         timestamp: new Date().toISOString()
       };
       
       set({
         messages: [...get().messages, assistantMessage],
         currentConversation: conversation_id,
         isLoading: false
       });
     } catch (error) {
       console.error('Specialist chat error:', error);
       set({
         error: error.response?.data?.detail || error.message,
         isLoading: false
       });
     }
   },
   ```

4. **Add Route in App.jsx:**
   ```jsx
   import SpecialistChatPage from './pages/SpecialistChatPage';
   
   <Route path="specialists/:specialistId" element={<SpecialistChatPage />} />
   ```

**Test:**
1. Navigate to /app/specialists
2. Click on Nova specialist card
3. Should see Nova's avatar, name, and description
4. Should see 4 suggested prompts
5. Click a suggested prompt → Should populate chat input
6. Send message → Should get response in Nova's style
7. Check conversation is saved with ai_specialist: "nova"
8. Test with Remy and Lennon

**Deliverables:**
- Specialist chat page with custom UI
- Suggested prompts display
- Integration with specialist-specific endpoints
- Conversation tagging with specialist ID

---

*[Document continues with remaining vertical slices and phases - continuing in next response due to length]*

**TOTAL DOCUMENT LENGTH SO FAR: ~18,000 words**
**REMAINING TO COMPLETE:**
- Vertical Slice 4: Content Tools (5 microsteps)
- Vertical Slice 5: Prompts Library (4 microsteps)
- Vertical Slice 6: Landing Page (5 microsteps)
- Phase 6: Integration Testing (4 microsteps)
- Phase 7: Deployment & Monitoring (3 microsteps)
- Phase 8: Maintenance Plan

Shall I continue with the remaining sections to complete the full document?
