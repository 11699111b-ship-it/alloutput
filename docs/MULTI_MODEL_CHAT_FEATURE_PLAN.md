# Multi-Model Chat Feature Implementation Plan
**Date:** January 2025  
**Status:** Planning Complete - Ready for Implementation

---

## Overview

Integrate multi-model selection and side-by-side response display directly into the main chat interface, eliminating the need for a separate compare models modal.

---

## Goals

1. ✅ Allow users to select 1-3 AI models in main chat interface
2. ✅ Display responses side-by-side when multiple models selected
3. ✅ Default to single model view (current behavior)
4. ✅ Easy toggle to add/remove models
5. ✅ Maintain clean, minimalistic dark theme
6. ✅ Improve overall chat UX

---

## User Flow

### Single Model Mode (Default)
```
1. User sees model selector (e.g., "GPT-4o Mini ▾")
2. User types query in input: "ask anything"
3. Single response appears in chat
```

### Multi-Model Mode
```
1. User clicks "+" button next to model selector
2. Dropdown shows: "Add another model (1/3 selected)"
3. User selects 2nd model (e.g., "Claude 3.7 Sonnet")
4. Model selector now shows: "GPT-4o Mini + 1 ▾" with "+" still available
5. User can add 3rd model or proceed with 2
6. User types query
7. Responses appear side-by-side in 2-3 columns
8. User can remove models using "×" on each model chip
```

---

## UI Components to Modify/Create

### 1. Enhanced Model Selector Component
**File:** `/app/frontend/src/components/features/chat/ModelSelector.jsx`

**Current State:**
- Dropdown showing single selected model
- Click to change model

**New State:**
- Shows selected model(s) as chips
- "+" button to add more models (up to 3)
- "×" on each chip to remove
- Dropdown for selecting additional models

**Visual Design:**
```
┌─────────────────────────────────────────────────┐
│ [GPT-4o Mini ×] [+ Add Model (1/3)]             │
└─────────────────────────────────────────────────┘

When 2 models selected:
┌─────────────────────────────────────────────────┐
│ [GPT-4o Mini ×] [Claude 3.7 ×] [+ Add (2/3)]    │
└─────────────────────────────────────────────────┘

When 3 models selected:
┌─────────────────────────────────────────────────┐
│ [GPT-4o Mini ×] [Claude 3.7 ×] [Gemini 2.5 ×]   │
└─────────────────────────────────────────────────┘
```

**Props:**
```javascript
{
  selectedModels: string[],        // Array of model IDs
  onModelsChange: (models) => {},  // Callback when models change
  maxModels: 3,                     // Maximum models allowed
  userTier: 'free' | 'pro'         // For pro model locking
}
```

---

### 2. Multi-Response Message Component
**File:** `/app/frontend/src/components/features/chat/MultiResponseMessage.jsx` (NEW)

**Purpose:** Display side-by-side responses from multiple models

**Visual Design:**
```
┌─────────────────────────────────────────────────────────────┐
│ User: Explain quantum computing in simple terms            │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────┬──────────────────────┐
│ GPT-4o Mini      │ Claude 3.7       │ Gemini 2.5 Pro      │
│ 2.3s • 380 tokens│ 2.8s • 420 tokens│ 2.1s • 350 tokens   │
├──────────────────┼──────────────────┼──────────────────────┤
│                  │                  │                      │
│ Quantum computing│ Think of quantum │ In simple terms,     │
│ is a revolution- │ computing as...  │ quantum computing... │
│ ary approach...  │                  │                      │
│                  │ [streaming...]   │                      │
│                  │                  │                      │
│ [Copy] [Regen]   │ [Copy] [Regen]   │ [Copy] [Regen]      │
└──────────────────┴──────────────────┴──────────────────────┘

Vote: Which response was most helpful?
[○ GPT-4o Mini] [○ Claude 3.7] [○ Gemini 2.5 Pro]
```

**Features:**
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Real-time streaming for each model
- Individual copy/regenerate buttons
- Response time and token count display
- Optional voting mechanism
- Markdown rendering with syntax highlighting

---

### 3. Enhanced Chat Input
**File:** `/app/frontend/src/components/features/chat/ChatInput.jsx`

**Changes:**
- Update placeholder text: "ask anything" (lowercase, simple)
- Show indicator when multiple models selected:
  ```
  Asking 2 models: GPT-4o Mini, Claude 3.7
  ```
- Handle multi-model submission

---

### 4. Updated Message List
**File:** `/app/frontend/src/components/features/chat/MessageList.jsx`

**Changes:**
- Detect multi-model messages
- Render `<MultiResponseMessage>` for multi-model responses
- Render standard `<Message>` for single-model responses
- Maintain conversation flow

---

## State Management (Zustand)

### Update chatStore.js

```javascript
{
  // Existing
  messages: [],
  currentConversation: null,
  selectedModel: 'gpt-4o-mini',
  isLoading: false,
  
  // NEW
  selectedModels: ['gpt-4o-mini'],  // Array of model IDs
  multiModelMode: false,             // True when 2+ models selected
  
  // NEW ACTIONS
  addModel: (modelId) => {
    // Add model to selectedModels (max 3)
    // Set multiModelMode = true if length >= 2
  },
  
  removeModel: (modelId) => {
    // Remove model from selectedModels
    // Set multiModelMode = false if length < 2
    // Ensure at least 1 model always selected
  },
  
  setModels: (modelIds) => {
    // Replace selectedModels array
    // Update multiModelMode accordingly
  },
  
  // UPDATED ACTION
  sendMessage: async (message) => {
    if (multiModelMode) {
      // Send to multiple models in parallel
      // Store responses in single message object
    } else {
      // Existing single-model logic
    }
  }
}
```

---

## Backend API Updates

### Update `/api/chat` endpoint

**Current Request:**
```json
{
  "conversation_id": "uuid_or_null",
  "model": "gpt-4o-mini",
  "message": "Explain quantum computing",
  "stream": false
}
```

**New Request (Multi-Model):**
```json
{
  "conversation_id": "uuid_or_null",
  "models": ["gpt-4o-mini", "claude-3-7-sonnet"],  // NEW: array
  "message": "Explain quantum computing",
  "stream": false,
  "multi_model": true  // NEW: flag
}
```

**New Response (Multi-Model):**
```json
{
  "success": true,
  "data": {
    "message_id": "uuid",
    "conversation_id": "uuid",
    "responses": [  // NEW: array instead of single response
      {
        "model": "gpt-4o-mini",
        "response": "Quantum computing is...",
        "tokens_used": 380,
        "response_time": 2.3
      },
      {
        "model": "claude-3-7-sonnet",
        "response": "Think of quantum computing...",
        "tokens_used": 420,
        "response_time": 2.8
      }
    ]
  }
}
```

### Backend Implementation
**File:** `/app/backend/server.py`

```python
@app.post("/api/chat")
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    if request.multi_model and request.models:
        # Multi-model mode
        tasks = [
            ai_service.chat(model, [{"role": "user", "content": request.message}])
            for model in request.models
        ]
        
        # Execute in parallel
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Format responses
        formatted_responses = []
        for model_id, response in zip(request.models, responses):
            if isinstance(response, Exception):
                formatted_responses.append({
                    "model": model_id,
                    "response": f"Error: {str(response)}",
                    "tokens_used": 0,
                    "response_time": 0
                })
            else:
                formatted_responses.append({
                    "model": model_id,
                    "response": response["content"],
                    "tokens_used": response.get("tokens_used", 0),
                    "response_time": response.get("response_time", 0)
                })
        
        # Save to conversation
        # Return formatted responses
        
    else:
        # Existing single-model logic
        ...
```

---

## Database Schema Updates

### Conversations Collection - Messages Array

**Current Message Structure:**
```json
{
  "id": "msg_uuid",
  "role": "user|assistant",
  "content": "Single response text",
  "model": "gpt-4o-mini",
  "timestamp": "2025-01-15T14:30:00Z",
  "tokens_used": 450
}
```

**New Multi-Model Message Structure:**
```json
{
  "id": "msg_uuid",
  "role": "assistant",
  "multi_model": true,  // NEW
  "responses": [  // NEW: array of responses
    {
      "model": "gpt-4o-mini",
      "content": "Response text...",
      "tokens_used": 380,
      "response_time": 2.3
    },
    {
      "model": "claude-3-7-sonnet",
      "content": "Response text...",
      "tokens_used": 420,
      "response_time": 2.8
    }
  ],
  "timestamp": "2025-01-15T14:30:00Z"
}
```

---

## Implementation Steps (Microsteps)

### Microstep 1: Enhanced Model Selector (3 credits)
**Files to modify:**
- `/app/frontend/src/components/features/chat/ModelSelector.jsx`
- `/app/frontend/src/stores/chatStore.js`

**Tasks:**
1. Update chatStore to support `selectedModels` array
2. Add `addModel()`, `removeModel()`, `setModels()` actions
3. Create multi-model selector UI with chips and + button
4. Add model removal functionality (× on chips)
5. Implement max 3 models validation
6. Add visual feedback for model selection

**Testing:**
- Select single model (default behavior)
- Add 2nd model, verify chip appears
- Add 3rd model, verify + button disabled
- Remove models, verify at least 1 remains

---

### Microstep 2: Multi-Response Message Component (3 credits)
**Files to create:**
- `/app/frontend/src/components/features/chat/MultiResponseMessage.jsx`

**Tasks:**
1. Create new component for side-by-side responses
2. Implement responsive grid (1-3 columns)
3. Add model name and metadata display
4. Add individual copy buttons
5. Add optional voting mechanism UI
6. Style with dark theme, matching Message.jsx

**Testing:**
- Display 2 mock responses side-by-side
- Display 3 mock responses
- Test responsive behavior (mobile, tablet, desktop)
- Test copy functionality

---

### Microstep 3: Update Chat Input & Placeholder (1 credit)
**Files to modify:**
- `/app/frontend/src/components/features/chat/ChatInput.jsx`
- `/app/frontend/src/components/features/chat/ChatDashboard.jsx`

**Tasks:**
1. Change placeholder text to "ask anything"
2. Add indicator when multiple models selected
3. Update submit logic to handle multi-model

**Testing:**
- Verify placeholder text changed
- Verify multi-model indicator appears
- Test single model submission
- Test multi-model submission (with mock)

---

### Microstep 4: Backend Multi-Model Support (4 credits)
**Files to modify:**
- `/app/backend/server.py`
- `/app/backend/services/ai_service.py`

**Tasks:**
1. Update Pydantic models for multi-model requests
2. Add parallel AI model calling with asyncio.gather()
3. Handle errors gracefully (if one model fails)
4. Format multi-model responses correctly
5. Update conversation saving logic
6. Test with mock AI responses

**Testing:**
- Test single model request (existing behavior)
- Test multi-model request with 2 models
- Test multi-model request with 3 models
- Test error handling (one model fails)

---

### Microstep 5: Wire Frontend to Backend (2 credits)
**Files to modify:**
- `/app/frontend/src/stores/chatStore.js`
- `/app/frontend/src/components/features/chat/MessageList.jsx`

**Tasks:**
1. Update `sendMessage()` to detect multi-model mode
2. Send correct API request format
3. Handle multi-model API response
4. Render `<MultiResponseMessage>` when appropriate
5. Maintain conversation history

**Testing:**
- Send single-model message, verify normal flow
- Send multi-model message, verify side-by-side display
- Check conversation history saved correctly
- Verify token counts and timing displayed

---

### Microstep 6: UI Polish & Dark Theme Consistency (2 credits)
**Files to modify:**
- `/app/frontend/src/components/features/chat/ChatDashboard.jsx`
- `/app/frontend/src/components/features/chat/ComparisonModal.jsx` (hide/remove)
- Various styling files

**Tasks:**
1. Remove "Compare Model" button from ChatDashboard
2. Ensure consistent dark theme colors throughout
3. Polish model selector chip styling
4. Polish multi-response card styling
5. Add smooth transitions and animations
6. Ensure all text has proper contrast

**Testing:**
- Visual inspection of all components
- Test in light/dark environments
- Verify accessibility (color contrast)
- Test animations and transitions

---

## Visual Design Specifications

### Colors (Dark Theme)
```css
--background: #0f0f10           /* Main background */
--surface: #1a1a1b              /* Cards, elevated surfaces */
--surface-elevated: #2d2d2f     /* Hover states */
--border: #404040               /* Borders */
--text-primary: #e5e7eb         /* Main text */
--text-secondary: #9ca3af       /* Labels, metadata */
--text-muted: #6b7280           /* Placeholders */
--primary: #4f46e5              /* Accent color */
```

### Model Chips
```css
.model-chip {
  background: #2d2d2f;
  border: 1px solid #404040;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  color: #e5e7eb;
}

.model-chip:hover {
  background: #3d3d3f;
}

.model-chip-remove {
  color: #9ca3af;
  cursor: pointer;
}

.model-chip-remove:hover {
  color: #ef4444; /* Red on hover */
}
```

### Multi-Response Grid
```css
.multi-response-grid {
  display: grid;
  gap: 16px;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
  
  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop: 3 columns (if 3 models) */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(var(--cols), 1fr);
  }
}
```

---

## Error Handling

### Scenarios to Handle

1. **User selects Pro model without Pro subscription**
   - Show upgrade prompt
   - Prevent selection
   - Display lock icon

2. **One model fails during multi-model request**
   - Display error in that model's column
   - Show other successful responses
   - Log error for debugging

3. **All models fail**
   - Show error message
   - Offer to retry
   - Suggest checking connection

4. **Rate limiting hit**
   - Show specific message
   - Offer to upgrade or wait

---

## Success Criteria

- ✅ Users can select 1-3 models easily
- ✅ Responses display side-by-side clearly
- ✅ Single model mode works as before
- ✅ Multi-model mode is intuitive
- ✅ Dark theme is consistent
- ✅ Performance is acceptable (no lag)
- ✅ Mobile responsive
- ✅ Accessible (WCAG AA)

---

## Future Enhancements (Out of Scope)

- Save preferred model combinations
- Model performance analytics
- Auto-suggest best models for query type
- Streaming responses in multi-model mode
- Model-specific system prompts

---

## Estimated Total: ~15 credits (6 microsteps)

**Next Action:** Begin Microstep 1 - Enhanced Model Selector
