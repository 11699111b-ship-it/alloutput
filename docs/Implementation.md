# Implementation

## PROMPT FOR AI CODE GENERATION TOOLS

You are an expert AI code generation assistant building a production-ready web application using best practices from real vibe-coded projects. Follow ALL 85+ rules in this framework to minimize errors and ensure scalability.

### APPLICATION OVERVIEW

- **Type:** Full-stack web application (Frontend + Backend + Database)
- **Architecture:** Separate public and admin interfaces
- **Technology:** [SPECIFY: React/Vue, Node/Python/FastAPI, PostgreSQL/MongoDB, etc.]
- **Timeline:** 6-8 weeks
- **Quality:** Production-ready, thoroughly documented, tested

---

## PHASE 1: PLANNING & DESIGN (RULES 1-15)

### Rule 1: Establish Clear Project Organization Early

- Create directory structure BEFORE writing code
- Separate: backend/, frontend/, docs/, scripts/, tests/
- Keep root directory minimal (only config files)
- Enforce this structure from first commit

**ACTION:** Before any code generation, create and output the complete directory structure as ASCII tree.

### Rule 2: Maintain Single Source of Truth for Each Concept

- One authoritative guide per topic
- Main guide: Comprehensive reference
- Quick reference: Summary only
- Prevent duplicate documentation

**ACTION:** When creating documentation, explicitly mark which is authoritative.

### Rule 3: Separate Configuration from Application Code

- All configuration in one place
- Build config, environment variables, platform config separate
- Configuration documentation explains relationships

**ACTION:** Create centralized configuration module/files before implementing features.

### Rule 4: Use Modular Architecture for Frontend

- Component hierarchy: clear parent-child
- Shared utilities in dedicated files
- Consistent patterns across similar components
- Keep modules ~250-300 lines max

**ACTION:** Design component structure and document component patterns before implementation.

### Rule 5: Define Clear Application Architecture Before Coding

- Create ASCII diagrams showing data flow
- Document API contract (endpoints, request/response formats)
- Define database schema relationships
- Specify synchronous vs asynchronous communication
- List all external service integrations
- Create sample JSON for all data structures

**ACTION:** Generate and display complete architecture diagram and API specification.

### Rule 6: Separate Public Interfaces from Admin/Internal Interfaces

- Public API routes: `/api/` (no auth required)
- Admin API routes: `/api/admin/` (auth required)
- Different authentication mechanisms for each
- Separate database queries (public shows published only, admin shows all)
- Different error responses (generic for public, detailed for admin)

**ACTION:** Design API routes segregated by access level before implementation.

### Rule 7: Design Modular Architecture with Clear Responsibilities

- Backend: Split into focused modules (auth, workshops, testimonials, file_uploads)
- Frontend: Separate components for each distinct feature
- Clear exports and dependencies between modules
- Document what each module does
- Keep each module 150-250 lines

**ACTION:** Plan module boundaries before writing code.

### Rule 8: Create Explicit Data Models Before Implementation

- List ALL entity types
- For each entity: field name, data type, constraints, relationships
- Validation rules: database level (NOT NULL, UNIQUE), API level (schemas), frontend level (forms)
- Create sample JSON showing expected structure

**ACTION:** Generate and display complete data model specification with sample data.

### Rule 9: Maintain Single Source of Truth for Business Logic

- Backend is authoritative for all business logic
- Frontend replicates backend validation for UX (faster feedback)
- Always validate on backend (never trust client input)
- One context/store as truth for state management
- Database is truth for data; invalidate caches when data changes
- Use shared validation schemas across frontend and backend

**ACTION:** Design validation rules once, implement on both frontend and backend identically.

### Rule 10: Create Repository Organization Plan Before Development

- Structure: backend/, frontend/, docs/, scripts/, tests/, [minimal root]
- Enforce from first commit
- All future code must follow this structure

**ACTION:** Create and display repository structure documentation.

### Rule 11: Plan GitHub Cleanup BEFORE First Commit

- Create comprehensive .gitignore BEFORE writing code
- Exclude: node_modules/, **pycache**/, .env files, OS files, IDE files, credentials, backups, uploads
- Target repository size: 1-2MB (from 700-800MB without cleanup)

**ACTION:** Generate complete .gitignore and verify before code generation.

### Rule 12: Define Relationships and Constraints at Database Level

- Define foreign key relationships
- Set NOT NULL constraints for required fields
- Set UNIQUE constraints for unique fields (email, username, etc.)
- Create database indexes for frequently queried fields
- Document all constraints
- Test constraints before deployment

**ACTION:** Display database schema with all constraints and relationships.

### Rule 13: Create Component Library Structure Early

- Plan reusable components before development
- Create base components structure
- Document component patterns
- Establish component naming conventions
- Plan for future component upgrades

**ACTION:** Document component library structure and naming patterns.

### Rule 14: Establish Module Naming Conventions

- Components: PascalCase (WorkshopCard.jsx)
- Utilities: camelCase (apiClient.js)
- Styles: Match component name (WorkshopCard.css)
- Tests: ComponentName.test.jsx
- Backend routes: lowercase with underscores (workshop_routes.py)

**ACTION:** Enforce naming conventions in all generated code.

### Rule 15: Plan Feature Architecture

- Define feature scope clearly
- Plan data model for each feature
- Plan admin interface BEFORE public features
- Plan API endpoints needed
- Plan frontend components needed
- Document feature architecture

**ACTION:** For each feature, generate and display complete architecture specification.

---

## PHASE 2: DEVELOPMENT - FRONTEND (RULES 16-33)

### Rule 16: Never Hardcode Static Data in Production Code

- DO NOT use hardcoded arrays, objects, constants for real data
- Create API endpoints for all data
- Convert hardcoded components to fetch real data
- Keep static data ONLY for Storybook stories and testing

**REQUIREMENTS:**
- Every data display must fetch from API
- Use useEffect to fetch data on component mount
- Never use hardcoded data in production builds

**ACTION:** For every data-displaying component, generate with API integration, not hardcoded data.

### Rule 17: Implement Consistent Data Fetching Pattern

- Create centralized API client module (api.js or similar)
- ALL API calls go through this client
- Standard structure: set loading → clear errors → try fetch → handle errors → show message → set loading false
- Consistent error handling: catch, display user message, log details
- Standard loading states: show spinner, disable buttons
- Standard response transformation: normalize data format

**REQUIREMENTS:**

```
Every API call MUST:
1. Set loading state before fetch
2. Clear previous errors
3. Try to fetch with error handling
4. Display user-friendly error message
5. Log error details
6. Show success/error toast
7. Set loading state to false
```

**ACTION:** Generate centralized API client module that ALL components use.

### Rule 18: Transform API Responses Before Using in Components

- Create transformation functions for each API response type
- Transform at fetch time (NOT at render time)
- Document what transformation does
- Component never sees raw API structure

**REQUIREMENT:** Every API call must transform response before storing in state.

**ACTION:** Generate transformation functions for each API endpoint.

### Rule 19: Use Proper Header Management for Different Request Types

- For JSON requests: Set ‘Content-Type’: ‘application/json’
- For FormData uploads: DO NOT set Content-Type header
- Only set Authorization header for uploads
- Browser automatically sets Content-Type: multipart/form-data; boundary=…

**CRITICAL:** Incorrect header management is the #1 cause of upload failures.

**ACTION:** Generate correct header handling for both JSON and FormData requests.

### Rule 20: Implement Features with API Integration from Day One

- Never implement frontend features with hardcoded data
- Always integrate with backend APIs immediately
- API-first approach: define endpoint before frontend
- Use useEffect to fetch data on component mount
- Show loading states while fetching
- Handle errors gracefully
- Show empty state messages if no data

**ACTION:** Every feature MUST have backend API integration.

### Rule 21: Design Features with Admin Management in Mind

- Before implementing public features, design admin interface
- Admin capability: create/edit/delete/publish/unpublish
- Admin control: visibility, featured status, display order
- Admin search/filter: find items quickly
- Admin bulk operations: handle multiple items

**REQUIREMENT:** Every public feature MUST have matching admin interface.

**ACTION:** For every public feature, generate matching admin CRUD interface.

### Rule 22: Use Context API for Global Authentication State

- Centralized AuthContext with: user object, auth status, permissions, login/logout functions
- Wrap entire app with AuthProvider
- Access with useAuth() hook
- Automatically redirect to login if not authenticated
- Update protected routes when auth changes

**REQUIREMENT:** Authentication MUST be managed through centralized context.

**ACTION:** Generate centralized AuthContext before any protected components.

### Rule 23: Separate Public and Private Data Fetching

- Create separate API modules: publicApi.js (no auth) and adminApi.js (auth required)
- publicApi: getPublishedWorkshops(), getFeaturedTestimonials(), etc.
- adminApi: getAllWorkshops(), createWorkshop(), updateWorkshop(), deleteWorkshop(), etc.
- Never mix public and private data fetching in same function

**ACTION:** Generate two separate API modules with clear separation.

### Rule 24: Implement Global Error Boundary

- Wrap entire app with ErrorBoundary component
- Catch component render errors, lifecycle errors, constructor errors
- Show user-friendly error message (not technical details)
- Provide “Something went wrong” page with retry/home options
- Log errors to error tracking service

**ACTION:** Generate ErrorBoundary component and wrap entire app.

### Rule 25: Use Shared Base Components for Repetitive Patterns

- Create AdminCRUDBase component for common admin patterns
- AdminCRUDBase handles: table display, add/edit/delete dialogs, loading states, empty states, confirmation dialogs
- Feature-specific admin components (WorkshopsAdmin, TestimonialsAdmin) inherit from base
- Benefit: Change base component = fix all features at once

**ACTION:** Generate base components for repetitive patterns before specific components.

### Rule 26: Handle Accessor Functions Flexibly in Tables

- Table columns support both formats:
    - Computed: `{ key: 'fullName', accessor: (item) => \`${item.first} ${item.last}` }`
    - Direct: `{ key: 'title', label: 'Title' }`
- Handle both automatically in table component

**ACTION:** Generate table component with flexible accessor support.

### Rule 27: Create Consistent Form Patterns

- Every form has: validation schema (zod/yup), form hook (React Hook Form/Formik)
- Consistent error display: red text below field, only after field touched
- Loading state while submitting
- Success/error toast notifications
- Disabled submit button during submission
- Clear validation messages

**ACTION:** Generate form template with all standard patterns included.

### Rule 28: Implement Container vs Presentational Components

- Container components: handle data fetching, state management, API calls
- Presentational components: receive data as props, only render UI, no side effects
- Never mix: containers don’t render UI directly, presentational components don’t fetch data

**ACTION:** Generate components following container/presentational pattern.

### Rule 29: Never Mix API Response Data Directly into Component State

- Always transform API responses before storing in state
- Create transformation functions
- Component state never has raw API structure

**ACTION:** Generate transformation layer between API and component state.

### Rule 30: Test Responsive Design on Mobile Devices

- Test on actual mobile devices (not just browser devtools)
- Test portrait and landscape orientations
- Test on various screen sizes
- Test touch interactions
- Test with different connection speeds

**REQUIREMENT:** Generated responsive designs must work on mobile.

**ACTION:** Generate mobile-responsive design tested on actual devices.

### Rule 31: Replace Hardcoded Data with API Calls During Development

- Phase 1: Hardcoded for quick visual testing only
- Phase 2: Convert to API calls (REQUIRED)
- Phase 3: Production uses API data exclusively

**CRITICAL:** No hardcoded data in production code.

**ACTION:** Generate with API integration, not hardcoded data.

### Rule 32: Use Consistent State Management Pattern

- Choose ONE approach: React hooks, Context, Redux, etc.
- Use it consistently throughout entire app
- Document the pattern
- Create utility hooks that abstract patterns

**REQUIREMENT:** All state management follows same pattern.

**ACTION:** Generate all components using chosen state management pattern.

### Rule 33: Handle Special Characters and Unicode

- Test with: special characters (AI & ML, “quotes”,
    
    )
    
- Test with: emoji (🚀, 🎓)
- Test with: accents (café, naïve)
- Test with: RTL languages if applicable
- Ensure proper encoding throughout

**ACTION:** Ensure generated code handles special characters and Unicode.

---

## PHASE 2: DEVELOPMENT - BACKEND (RULES 34-45)

### Rule 34: Validate All Input Data at API Layer

- Use schema validation (Pydantic, JSON Schema, etc.)
- NEVER trust client input
- Validate: data types, format, ranges, relationships, business logic
- Return specific error message for each validation failure

**VALIDATION LAYERS:**
1. Type validation (string, integer, datetime)
2. Format validation (email, URL, regex)
3. Range validation (min/max length, bounds)
4. Relationship validation (referenced items exist)
5. Business logic validation (date in future?, etc.)

**ACTION:** Generate validation schemas for every endpoint input.

### Rule 35: Implement Modular Backend Route Structure

- Split routes into focused modules: auth.py, workshops.py, testimonials.py, file_uploads.py
- File size target: 150-250 lines per file
- Each file handles one domain

**ACTION:** Generate backend organized into focused route modules.

### Rule 36: Use Reusable CRUD Base Class

- Create AbstractCRUD base class with standard operations
- Resource-specific classes inherit from base
- Customize behavior only where needed
- Benefit: Consistency across all resources

**ACTION:** Generate CRUD base class before resource implementations.

### Rule 37: Implement Consistent Error Response Format

- ALL endpoints return same format:
    
    ```
    Success: { "success": true, "data": { ... } }
    Error: { "success": false, "error": { "code": "...", "message": "...", "details": { ... } } }
    ```
    
- Consistent status codes: 200, 201, 400, 401, 404, 500
- Consistent pagination format
- ISO 8601 UTC timestamps

**ACTION:** Generate response formatting middleware for all endpoints.

### Rule 38: Handle Multipart Form Data Correctly for File Uploads

- Use FormData for file uploads
- DO NOT set Content-Type header (browser sets automatically)
- ONLY set Authorization header
- Validate file type, size, content on server

**CRITICAL:** Incorrect header handling is #1 cause of upload failures.

**ACTION:** Generate correct FormData handling for file uploads.

### Rule 39: Serve Frontend from Backend

- Backend serves static frontend build files
- Frontend build output → backend static folder
- Set appropriate caching headers
- Enable compression (Gzip/Brotli)
- Serve index.html for all non-API routes

**ACTION:** Configure backend to serve frontend static files.

### Rule 40: Configure CORS Properly

- NEVER use wildcard CORS (*) in production
- Explicitly list allowed origins
- Allow only necessary methods (GET, POST, etc.)
- Allow only necessary headers
- Include credentials if needed

**ACTION:** Generate CORS configuration that’s secure and not wildcard.

### Rule 41: Implement Health Check Endpoints

- `/health` endpoint returns simple status
- Returns 200 if healthy, 503 if not
- Can include: database connectivity, external service status
- Used by load balancers, monitoring, deployment

**ACTION:** Generate health check endpoint that monitors dependencies.

### Rule 42: Use Absolute Imports

- Don’t use relative imports: `from ../../../lib import utils`
- Use absolute imports: `from lib import utils` or `import @/lib/utils`

**ACTION:** Configure and use absolute imports in all backend code.

### Rule 43: Create Clear Module Boundaries

- Separate concerns: components, pages, contexts, hooks, lib, styles
- Components don’t call APIs directly
- Pages use components, not reverse
- Utilities have no component dependencies
- Features are self-contained

**ACTION:** Organize backend with clear module boundaries.

### Rule 44: Document Module Responsibilities

- Add header comment to each module
- Describe module purpose
- List main exports
- Document dependencies
- Document complex logic

**ACTION:** Generate modules with clear documentation.

### Rule 45: Implement Rate Limiting

- Default: 100 requests per minute per IP
- Stricter limits for sensitive endpoints (login, signup)
- Return 429 (Too Many Requests) when exceeded
- Include headers: X-RateLimit-Limit, X-RateLimit-Remaining

**ACTION:** Implement rate limiting middleware on all endpoints.

---

## PHASE 3: INTEGRATION (RULES 46-55)

### Rule 46: Design API with Consistent Response Format

- All success responses: `{ "success": true, "data": { ... } }`
- All error responses: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Consistent status codes (200, 201, 400, 401, 404, 500)
- Consistent pagination format
- ISO 8601 UTC timestamps

**ACTION:** Generate all API endpoints with consistent format.

### Rule 47: Implement Centralized Image Management

- ImageUpload component handles: file selection, validation, upload, progress, preview, errors
- Centralized gallery interface for admin
- Features: max file size, allowed formats, auto-optimize, progress bar, error messages

**ACTION:** Generate centralized image management before implementing image features.

### Rule 48: Handle Image Uploads Correctly

- Use FormData for file uploads
- DO NOT set Content-Type header
- Set Authorization header only
- Validate file type, size on server
- Check file content (magic bytes)

**ACTION:** Generate image upload with correct header handling.

### Rule 49: Create Image Gallery Admin Interface

- Browse all images
- Delete images
- Download images
- Copy image URL
- Select image for content
- Upload new images
- Organize by collection/date

**ACTION:** Generate admin image gallery interface.

### Rule 50: Implement Image Cropping

- Upload → Cropper with aspect ratio guides → Preview → Apply crop → Save
- Multiple aspect ratio presets (16:9, 4:3, 1:1)
- User can crop multiple times
- Server does actual cropping
- Store both original and cropped

**ACTION:** Generate image cropping workflow.

### Rule 51: Use Consistent Error Handling for API Calls

- EVERY API call must handle errors:
    1. Set loading to true
    2. Clear previous error
    3. Try to fetch
    4. Handle HTTP errors
    5. Validate response structure
    6. Catch exceptions
    7. Set user-friendly error message
    8. Log error details for debugging
    9. Show error toast
    10. Set loading to false

**ACTION:** Generate API client with error handling applied to all calls.

### Rule 52: Handle Timestamps Consistently

- Always UTC timezone
- Always ISO 8601 format
- Server auto-generates created_at, updated_at
- Consistent datetime types across stack
- Frontend handles timezone conversion if needed

**ACTION:** Generate timestamp handling in backend and frontend.

### Rule 53: Implement Progressive Form Validation

- Validate on blur (field level)
- Validate on change (for dependent fields)
- Show real-time validation feedback
- Clear errors when field becomes valid
- Only show error after field touched
- Disable submit until form valid

**ACTION:** Generate forms with progressive validation.

### Rule 54: Handle Form State Separately from Component State

- Use form library (React Hook Form, Formik)
- Keep form state separate from component state
- Use form methods for state management
- Don’t mix with other component state
- Clear form after successful submission

**ACTION:** Generate forms using form library with separate state.

### Rule 55: Document API Contracts

- For each endpoint document:
    - URL and HTTP method
    - Authentication required (yes/no)
    - Request body schema
    - Response schema (success and error)
    - Possible status codes
    - Example request and response
    - Rate limiting (if applicable)

**ACTION:** Generate complete API documentation with examples.

---

## PHASE 4: TESTING & QUALITY (RULES 56-63)

### Rule 56: Create Pre-Deployment Test Suite

- Backend API Tests: health, endpoints, database, auth, image uploads, rate limiting, CORS, error responses
- Frontend Tests: pages load, navigation works, login works, dashboard loads, no console errors, mobile responsive
- Security Tests: HTTPS valid, security headers, CORS restricted, auth required for admin, whitelist working, uploads restricted
- Integration Tests: frontend-API, API-database, OAuth, image flows, admin creates → public sees
- Performance Tests: homepage < 3s, API < 500ms, images < 1s, bundle < 300KB gzipped
- SEO Tests: sitemap, robots.txt, meta tags, heading hierarchy, mobile responsive

**ACTION:** Generate test cases for all categories.

### Rule 57: Document Test Results

- Date and environment
- Status (PASSED/FAILED)
- Tests passed/failed count
- Category breakdown
- Issues found with severity, cause, solution
- Performance metrics
- Sign-off and approval

**ACTION:** Generate test results documentation template.

### Rule 58: Implement Proper Error Handling for API Calls

- Catch all error types (network, HTTP, parsing)
- Display user-friendly messages
- Log error details
- Show retry option for transient errors
- Show fallback UI if needed
- Set loading to false in all cases

**ACTION:** Generate error handling for all API calls.

### Rule 59: Validate Data at Every Level

- Frontend: Immediate feedback to user
- API: Security, prevent invalid data
- Database: Ensure data integrity
- Each level validates same rules

**ACTION:** Generate validation at all three levels.

### Rule 60: Test Critical User Journeys End-to-End

- Test complete workflows (not just individual components)
- Example: Register → Login → Create content → Publish → Appears public
- Test from user perspective
- Include all integration points

**ACTION:** Generate end-to-end test cases for critical journeys.

### Rule 61: Test Edge Cases

- Empty states (no data)
- Large datasets (1000+ items)
- Very long strings (100+ chars)
- Small/large numbers
- Null/undefined values
- Special characters and emoji
- RTL languages
- Slow API responses
- Network errors

**ACTION:** Generate edge case tests.

### Rule 62: Test Error Cases

- API errors (4xx, 5xx)
- Network errors (timeout, offline)
- Database errors
- Invalid input validation
- Unauthorized access
- Rate limiting
- File upload failures
- Permission errors

**ACTION:** Generate error case tests.

### Rule 63: Follow Consistent Naming Conventions

- File naming: PascalCase for components, camelCase for utilities
- Function naming: descriptive verbs (getWorkshops, fetchUser, validateEmail)
- Variable naming: descriptive nouns (workshops, currentUser, isLoading)
- Test naming: describe what is tested (test_returns_valid_workshop)
- Class naming: PascalCase nouns (Workshop, User, AdminService)

**ACTION:** Enforce consistent naming in all generated code.

---

## PHASE 5: DEPLOYMENT (RULES 64-75)

### Rule 64: Implement Comprehensive .gitignore

- Create BEFORE writing code
- Exclude: dependencies, build artifacts, env files, OS files, IDE files, credentials, backups
- Target size: 1-2MB repository

**ACTION:** Generate complete .gitignore.

### Rule 65: Create .env.example Files

- For each .env file, create .env.example
- Include EVERY variable, placeholder values, explanatory comments
- Indicate required vs optional
- Show where to find/generate each value
- Document consequences if wrong

**ACTION:** Generate .env.example files.

### Rule 66: Maintain Version Alignment

- Document all runtime versions required
- Create compatibility matrix
- Verify lock files match package manifests
- All build files reference same versions
- Test version alignment before deployment

**ACTION:** Generate version documentation and compatibility matrix.

### Rule 67: Use Environment Variables Instead of Hardcoded Values

- Externalize: URLs, database connections, API keys, port numbers, file paths, feature flags, timeouts, logging levels
- NEVER hardcode any environment-specific values

**ACTION:** Generate code using environment variables exclusively.

### Rule 68: Create Deployment Verification Checklist

- Pre-deployment: dependencies installed, configs consistent, variables documented, variables set, build tested
- Immediate post-deployment: URL loads, health check works, API responds, frontend loads, no console errors
- Functional post-deployment: routing works, API calls work, auth works, database connected, file uploads work

**ACTION:** Generate deployment checklist.

### Rule 69: Create Environment Variable Documentation

- Single source listing ALL required variables
- Clear purpose for each
- Build-time vs runtime indicator
- Real examples for each environment
- How to verify variable is set
- Troubleshooting section

**ACTION:** Generate environment variable documentation.

### Rule 70: Plan Domain Configuration Strategy

- Purchase domain → Configure DNS → SSL setup → Update app config → Update external services → Web server config → Testing
- Document exact steps

**ACTION:** Generate domain configuration documentation.

### Rule 71: Create Production Build Strategy

- Optimize: source maps false, minification enabled, compression enabled
- Caching: assets 1 year, API 5-10 min, HTML no cache
- Asset optimization: WebP, lazy loading, code splitting

**ACTION:** Generate production build configured correctly.

### Rule 72: Create Comprehensive README

- Project overview, quick start, structure, tech stack, features, setup, running locally, docs links, deployment status, troubleshooting

**ACTION:** Generate comprehensive README.

### Rule 73: Organize Documentation by Phase and Purpose

- docs/setup/, docs/features/, docs/deployment/, docs/development/, docs/history/
- Each organized by purpose

**ACTION:** Generate organized documentation structure.

### Rule 74: Document Every External Service Setup

- For each service (Google Cloud, Supabase, MongoDB): exact steps, screenshots, where to find credentials, common errors, expected behavior

**ACTION:** Generate external service setup documentation.

### Rule 75: Test Dependency Installation Before Deployment

- Verify lock file installation works
- Check version consistency
- Address peer dependency warnings
- Test full build locally
- Document version constraints

**ACTION:** Generate dependency testing procedures.

---

## PHASE 6: OPERATIONS (RULES 76-85)

### Rule 76: Set Up Backup Systems Before Going Live

- Database: Daily automated dumps, schedule 2 AM, retention 7 days, test restore weekly
- Files: Weekly compression, schedule Sunday 3 AM, retention 4 weeks, test restore monthly
- Config: .env files, app config, database schemas, backup on change
- Storage: AWS S3, Backblaze, cloud provider (encrypted, versioned)

**ACTION:** Generate backup setup documentation.

### Rule 77: Set Up Monitoring and Alerting Before Launch

- Uptime: health endpoint every 5 minutes, alert if down
- Errors: all errors with stack trace, group similar, immediate alerts for critical
- Performance: page load time, API response time, database performance
- Alerts: down=immediate, error rate>1%=alert, response time>2s=alert, disk<10%=alert

**ACTION:** Generate monitoring setup documentation.

### Rule 78: Create Runbook for Issues

- For each common issue: symptoms, diagnosis steps, solutions (in order), prevention
- Issues: 404, database failure, login not working, images not uploading, high load, disk full, memory critical, API timeout

**ACTION:** Generate runbook for common production issues.

### Rule 79: Document Deployment Issues and Solutions

- For each issue: what happened, when, root cause, solution, how to identify future, how to prevent
- Store in docs/history/, linked from README, tagged by type

**ACTION:** Generate deployment issue documentation template.

### Rule 80: Create Website Recreation Guide

- Prerequisites, repository setup, backend setup, frontend setup, database setup, auth setup, file upload setup, production deployment
- Each section: exact steps, what to expect, troubleshooting

**ACTION:** Generate website recreation guide.

### Rule 81: Plan and Document Scaling Strategy

- Vertical scaling: increase CPU/RAM/disk
- Horizontal scaling: load balancer, multiple servers, shared database
- Database scaling: read replicas, optimization, caching
- File scaling: cloud storage, CDN, image optimization
- Steps: identify bottleneck, monitor, plan, test, execute, monitor, document

**ACTION:** Generate scaling strategy documentation.

### Rule 82: Never Commit Sensitive Files

- Comprehensive .gitignore
- Exclude: .env, credentials, keys, tokens
- Use .env.example instead
- Audit git history for secrets
- Rotate compromised secrets immediately

**ACTION:** Generate secure .gitignore and verification procedures.

### Rule 83: Use HTTPS Everywhere with Valid SSL

- Valid SSL certificate (not self-signed)
- All traffic HTTP → HTTPS redirect
- HSTS header preload
- Certificate auto-renewal
- Monitor expiration

**ACTION:** Generate HTTPS/SSL configuration.

### Rule 84: Create Troubleshooting Guide

- For each issue: problem, symptoms, diagnosis, possible causes, solutions (in order), prevention, related docs links

**ACTION:** Generate troubleshooting guide.

### Rule 85: Maintain Living Documentation

- Update with code changes
- Verify accuracy regularly
- Archive outdated docs
- Review monthly
- Update immediately on major changes

**ACTION:** Generate documentation maintenance procedures.

---

## SUMMARY: QUICK REFERENCE BY RULE NUMBER

**Planning & Design:** Rules 1-15

**Frontend Development:** Rules 16-33

**Backend Development:** Rules 34-45

**Integration:** Rules 46-55

**Testing:** Rules 56-63

**Deployment:** Rules 64-75

**Operations:** Rules 76-85

---

## CRITICAL SUCCESS FACTORS

1. **Rule 5:** Architecture MUST be defined before any coding
2. **Rule 8:** Data models MUST be explicit before implementation
3. **Rule 16:** NO hardcoded data - use APIs exclusively
4. **Rule 34:** ALL input validation at API layer
5. **Rule 56:** Pre-deployment testing MANDATORY before launch
6. **Rule 65:** .env.example files REQUIRED for all .env
7. **Rule 76:** Backups setup BEFORE going live
8. **Rule 77:** Monitoring active FROM day one

---

## HOW TO USE THIS PROMPT

### When Starting New Feature:

“Follow Rule [number] for this implementation. Generate [feature] with complete [aspect].”

### When Creating Endpoint:

“Create endpoint following Rules 34 (validation), 37 (error response), 40 (CORS), 41 (health check).”

### When Building Component:

“Generate component following Rules 16 (no hardcoding), 17 (data fetching), 18 (transform response), 22 (auth), 27 (forms).”

### When Debugging:

“Check against Rule [number]. The issue is likely [rule violation].”

### When Deploying:

“Execute deployment checklist (Rule 68), verify environment variables (Rule 69), test pre-deployment suite (Rule 56).”

---

## EXPECTED OUTCOMES

Following all 85 rules results in:

✅ **75% reduction** in deployment time

✅ **90% reduction** in production errors

✅ **Zero hardcoded** data in production

✅ **Consistent** API responses and error handling

✅ **Comprehensive** documentation and testing

✅ **Production-ready** application

✅ **Easy to scale** and maintain

✅ **Team confidence** in code quality

---

---

## Rule 86: Implement Comprehensive Bot Protection

**Category:** Security | **Severity:** High | **Phase:** Development + Deployment

Vibe-coded applications are vulnerable to bot attacks if not properly protected. Bots can scrape data, abuse APIs, perform brute-force attacks, and inflate metrics.

**Implementation:**

### Bot Detection Strategy:

- Implement CAPTCHA on public forms (Google reCAPTCHA v3 preferred)
- Block IPs making >100 requests in 60 seconds
- Detect unusual User-Agent strings
- Block requests missing User-Agent header
- Monitor for pattern-based attacks (rapid logins, bulk downloads)

### Bot Classification:

```
Allow (Whitelist):
- Google bot (Googlebot, Bingbot)
- Search engines (Slurp, DuckDuckBot)
- Monitoring tools (Uptime Robot, New Relic)
- Social media crawlers (FacebookExternalHit, Twitterbot)

Block (Blacklist):
- Aggressive crawlers (AhrefsBot, SEMrushBot if not needed)
- Malicious bots (SQLMap, Nikto)
- Unknown/suspicious bots
- IPs from known attack sources

Block Completely:
- Requests without Host header
- Requests with suspicious patterns
- IPs exceeding rate limits
```

### Implementation Approach:

1. **Frontend Protection:**
    - Add reCAPTCHA to login, signup, contact forms
    - Verify user interaction (time spent, mouse movement)
    - Track session patterns (human vs bot)
2. **API Level Protection:**
    
    ```
    Check User-Agent header
    Check request patterns (timing, sequence)
    Check for bot signatures
    Implement rate limiting per IP/API key
    Block on suspicious patterns
    ```
    
3. **Infrastructure Level:**
    - Use WAF (Web Application Firewall) like Cloudflare
    - Enable DDOS protection
    - Configure IP reputation blocking
    - Monitor for attack patterns

### Detection Rules:

- Multiple requests from same IP in <1 second: Block
- Login attempts >5 failures in 5 minutes: Block temporarily
- API calls from rotating IPs: Flag and monitor
- Requests missing common browser headers: Scrutinize
- Identical requests from different IPs: Flag

**Why:** Prevents API abuse, protects user data, prevents credential stuffing, stops automated attacks, protects database resources.

---

## Rule 87: Minimize and Justify All Dependencies

**Category:** Security | **Severity:** High | **Phase:** Planning + Development

Every dependency is a potential attack surface. More dependencies = more vulnerabilities. Vibe coding tools often pull in too many packages without justification.

**Implementation:**

### Dependency Audit Process:

**Phase 1: Inventory All Dependencies**

```bash
# List all dependenciesnpm ls --depth=0                    # Node.jspip freeze                          # Pythoncomposer show                       # PHPOutput all with version numbers
Categorize: production vs development
```

**Phase 2: Justify Each Dependency**
For every package, document:
1. **What problem does it solve?**
2. **Why not native solution?**
3. **Maintenance status?** (active/abandoned?)
4. **Security record?** (Known vulnerabilities?)
5. **Size cost?** (Impact on bundle?)
6. **Alternatives considered?**

**Phase 3: Eliminate Unnecessary Packages**

Common waste in vibe-coded projects:

```
❌ Multiple HTTP libraries (use fetch/axios, not 5 different ones)
❌ Lodash when ES6 has everything
❌ Moment.js when date-fns/Day.js exists
❌ moment-timezone when standard Date works
❌ Multiple CSS-in-JS when Tailwind exists
❌ Socket.io when WebSockets sufficient
❌ GraphQL when REST API fine
```

**Approved Essential Dependencies Only:**

```
Frontend:
  - React or Vue (framework)
  - React Router or VueRouter (routing)
  - Fetch or Axios (HTTP)
  - Form library: React Hook Form or Formik
  - Validation: Zod or Yup (not both)
  - UI: Tailwind only (not Bootstrap + Tailwind)
  - State: Context API (not Redux unless complex)
  - Testing: Jest or Vitest (not both)

Backend (Node.js):
  - Express or Fastify (framework)
  - Mongoose or TypeORM (ORM, only if using DB)
  - Bcryptjs (passwords, not 3 different hashing libs)
  - JWT: jsonwebtoken (one library)
  - Validation: Zod or Joi (not both)
  - Logger: Winston or Pino (not both)
  - Testing: Jest or Mocha (not both)

Backend (Python):
  - FastAPI or Flask (framework)
  - SQLAlchemy (ORM)
  - Pydantic (validation)
  - Passlib + bcrypt (passwords)
  - PyJWT (tokens)
  - Pytest (testing)
```

**Prohibited (Find Alternatives):**

```
❌ Deprecated packages (no longer maintained)
❌ Abandoned projects (no updates >2 years)
❌ Known vulnerabilities (npm audit reports)
❌ Duplicate functionality (lodash + ES6)
❌ Overly complex solutions for simple problems
❌ Packages with poor security record
```

**Verification:**

```bash
# Check for vulnerabilitiesnpm audit                          # Node.jssafety check                       # Python# Check for outdated packagesnpm outdated
pip list --outdated# Check package size impactnpm ls --depth=0                   # See what each addsbundlesize                         # Check bundle impact
```

**Why:** Reduces attack surface, smaller bundle size, faster load times, fewer security updates to track, easier to maintain, fewer potential breaking changes.

---

## Rule 88: Implement Comprehensive API Key and Secrets Management

**Category:** Security | **Severity:** Critical | **Phase:** Development + Deployment

Improperly managed API keys and secrets are #1 cause of security breaches in vibe-coded applications.

**Implementation:**

### 1. Storage Strategy (Never Hardcode):

**Correct Approaches:**

```jsx
// Backendconst apiKey = process.env.EXTERNAL_API_KEY;const dbPassword = process.env.DATABASE_PASSWORD;// Frontend (CLIENT SIDE ONLY - Safe Public Data)const apiBaseUrl = process.env.REACT_APP_API_URL;  // PUBLIC// NEVER: const apiKey = 'sk-xxx'; // WRONG!
```

**File-based Secrets:**

```
.env (local development only - in .gitignore)
.env.production (production server only)
.env.staging (staging server only)
.env.example (template for developers - IN GIT)
```

### 2. Secrets Classification:

**Tier 1: CRITICAL (Rotate Every 30 Days)**
- Database passwords
- API keys for payment processing
- OAuth secrets
- Master encryption keys
- Admin credentials

**Tier 2: HIGH (Rotate Every 90 Days)**
- External service API keys
- Email service credentials
- CDN tokens
- Analytics tokens

**Tier 3: MEDIUM (Rotate Every 6 Months)**
- Logging service keys
- Monitoring credentials
- Non-critical external service tokens

### 3. Secrets Management System:

**Development:**

```
Use .env file locally
Never commit .env to git
Use .env.example as template
Each developer gets own secrets
```

**Production:**

```
Use provider secrets manager:
- AWS: Secrets Manager
- Google Cloud: Secret Manager
- Azure: Key Vault
- Vercel: Environment Variables
- Railway: Environment Variables
- Heroku: Config Vars

Automated rotation via provider
Audit logging for access
Encryption at rest
Version control built-in
```

**Staged Rollout:**

```
Development .env
→ Staging .env (staging-specific secrets)
→ Production Secrets Manager
Each with different values
Never reuse production secrets locally
```

### 4. API Key Rotation Schedule:

```
Monthly:
- Check for exposed keys
- Audit key usage
- Plan rotation

Quarterly:
- Rotate high-tier keys
- Review access patterns
- Update team members

Immediately if:
- Key suspected compromised
- Employee leaves
- Found in code/logs
- Unusual usage detected
```

### 5. Prevention Checklist:

```
Code Review:
□ No secrets in code
□ No secrets in comments
□ No secrets in logs
□ Environment variables used

Git Safety:
□ .env in .gitignore
□ Pre-commit hooks prevent secrets
□ Git history cleaned of secrets
□ Branch protection enabled

Build/Deploy:
□ Secrets injected at deploy time
□ Not embedded in Docker images
□ Not in build artifacts
□ Not visible in logs

Monitoring:
□ API key usage tracked
□ Unusual patterns alerted
□ Failed auth attempts logged
□ Access audit maintained
```

**Why:** Prevents credential theft, prevents unauthorized API access, prevents data breaches, enables rapid key rotation on compromise, maintains audit trail.

---

## Rule 89: Scan for Accidental PII and Sensitive Data Exposure

**Category:** Security | **Severity:** Critical | **Phase:** Development + Testing

Vibe-coded applications often accidentally collect or expose Personally Identifiable Information (PII) and sensitive data.

**Implementation:**

### 1. PII Definition (Don’t Collect Accidentally):

```
Email addresses
Phone numbers
Social Security numbers
Credit card numbers
Passport numbers
Driver's license numbers
Bank account numbers
Full names (sometimes)
Home addresses
IP addresses (sometimes)
Medical information
Biometric data
```

### 2. Audit Process:

**Code Audit:**

```bash
# Search for common PII patternsgrep -r "email" src/               # Find email referencesgrep -r "phone" src/               # Find phone referencesgrep -r "ssn\|SSN" src/            # Find SSN referencesgrep -r "card\|credit" src/        # Find payment referencesgrep -r "password" src/            # Find password references# Manual review for:- localStorage usage (never store PII)- sessionStorage usage (never store PII)- Cookies (never store sensitive data)- Comments mentioning data
- Test data with real information
```

**Database Audit:**

```sql
-- Find potentially sensitive columnsSELECT table_name, column_name
FROM information_schema.columns
WHERE column_name LIKE '%email%'
   OR column_name LIKE '%phone%'
   OR column_name LIKE '%ssn%'
   OR column_name LIKE '%card%';
-- Check data sensitivitySELECT * FROM users LIMIT 5;
-- What info could be exposed?
```

**API Response Audit:**

```
Review every API endpoint response:
- Does it return unnecessary email addresses?
- Does it return phone numbers?
- Does it return user passwords (NEVER)?
- Does it return admin information to public?
- Does it return deleted user data?
```

### 3. Collection Prevention:

**What NOT to Collect:**

```
Never ask for:
❌ Full SSN (ask for last 4 if needed)
❌ Credit card full number (use payment provider)
❌ Multiple phone numbers (ask for one)
❌ Unnecessary emails
❌ Passwords of other services
❌ Biometric data unless necessary
❌ Medical information unless required
```

**Minimize Collection:**

```
Instead of full data, ask for:
- Birth month/year (not full DOB)
- Partial phone (last 4 digits)
- Partial SSN (last 4 digits only)
- City/State (not full address)
- Age range (not exact age)
```

### 4. Storage & Display Rules:

**Frontend Storage:**

```jsx
NEVER store in localStorage:- Email addresses
- Phone numbers
- SSN/account numbers
- Payment information
- API keys or tokens (generally)
- User IDs (okay, usually public)
SAFE to store:- Theme preference
- User ID (public)
- Timezone
- Language preference
- Non-sensitive settings
```

**Log Files:**

```
NEVER log:
- Password fields
- Credit card numbers
- API keys or tokens
- SSN or account numbers
- Full email addresses (hash them)
- Phone numbers

Mask in logs:
- Email: user@example.com → use***@example.com
- Phone: 555-1234567 → 555-****67
- Card: 4532-1111-2222-3333 → ****-****-****-3333
- SSN: 123-45-6789 → ***-**-6789
```

### 5. Tools for Scanning:

```bash
# Find secrets in codenpm install -g truffleHog
trufflehog filesystem .
# Find PII patternsnpm install -g snyk
snyk code test
# Git history scannpm install -g detect-secrets
detect-secrets scan .
# OWASP dependency checknpm install -g @owasp/dependency-check
dependency-check --scan .
```

**Why:** Prevents data breaches, prevents privacy violations, prevents regulatory fines (GDPR/CCPA), maintains user trust, reduces liability.

---

## Rule 90: Implement Comprehensive Security Headers

**Category:** Security | **Severity:** High | **Phase:** Deployment

Security headers protect against common web vulnerabilities. Many vibe-coded apps miss these entirely.

**Implementation:**

### Required Security Headers:

**1. Content-Security-Policy (CSP)**

```
Prevents XSS attacks, controls resource loading
Header: Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'

Breakdown:
- default-src 'self': Load all resources from same origin by default
- script-src: Only allow scripts from self and specific CDN
- style-src: Only allow styles from self and inline
- img-src: Only allow images from approved sources
- connect-src: Limit XHR/fetch to specific domains
```

**2. X-Frame-Options**

```
Prevents clickjacking attacks
Header: X-Frame-Options: DENY
or: X-Frame-Options: SAMEORIGIN

Options:
- DENY: Never allow framing
- SAMEORIGIN: Allow framing only from same origin
- ALLOW-FROM uri: Allow framing only from specific URI
```

**3. X-Content-Type-Options**

```
Prevents MIME type sniffing
Header: X-Content-Type-Options: nosniff

Prevents browser from guessing content type
Always return correct Content-Type
```

**4. Strict-Transport-Security (HSTS)**

```
Forces HTTPS everywhere
Header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

Breakdown:
- max-age: How long to enforce HTTPS (in seconds)
- includeSubDomains: Apply to all subdomains
- preload: Include in HSTS preload list
```

**5. X-XSS-Protection** (Legacy but still useful)

```
Protects against reflected XSS
Header: X-XSS-Protection: 1; mode=block
```

**6. Referrer-Policy**

```
Controls what referrer info is sent
Header: Referrer-Policy: strict-origin-when-cross-origin

Options:
- no-referrer: Never send referrer
- same-origin: Only for same origin
- strict-origin-when-cross-origin: Send origin only on HTTPS→HTTPS
```

**7. Permissions-Policy** (formerly Feature-Policy)

```
Control which features can be used
Header: Permissions-Policy: geolocation=(), microphone=(), camera=()

Prevents third-party scripts from accessing:
- Location/geolocation
- Microphone
- Camera
- Payment Request API
- USB
- Accelerometer/gyroscope
```

### Implementation by Framework:

**Express.js:**

```jsx
const express = require('express');const helmet = require('helmet');const app = express();app.use(helmet());  // Includes most headers by defaultapp.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],    scriptSrc: ["'self'", "'unsafe-inline'", 'https://trusted.cdn.com'],    styleSrc: ["'self'", "'unsafe-inline'"]
  }
}));
```

**FastAPI (Python):**

```python
from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"    response.headers["X-Frame-Options"] = "DENY"    response.headers["X-XSS-Protection"] = "1; mode=block"    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"    response.headers["Content-Security-Policy"] = "default-src 'self'"    return response
```

**Nginx:**

```
server {
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'" always;
}
```

**Verification:**

```bash
# Test headers onlinehttps://securityheaders.com/https://observatory.mozilla.org/# Or locallycurl -I https://yourapp.com
# Should see all headers
```

**Why:** Prevents XSS attacks, prevents clickjacking, prevents MIME sniffing, enforces HTTPS, controls feature usage, passes security audits.

---

## Rule 91: Implement Secure Password Handling and Storage

**Category:** Security | **Severity:** Critical | **Phase:** Development

Vibe-coded applications often fail to properly hash and validate passwords, leading to user account compromises.

**Implementation:**

### 1. Password Hashing (CRITICAL):

**WRONG (Never Do This):**

```jsx
// WRONG - Passwords in plaintextconst user = { password: 'user123' };// WRONG - MD5 hashing (broken)const hash = md5('user123');// WRONG - SHA256 (easily cracked)const hash = sha256('user123');
```

**CORRECT - Use Bcrypt:**

```jsx
// Node.jsconst bcrypt = require('bcryptjs');// Hashing password on signupasync function registerUser(password) {
  const salt = await bcrypt.genSalt(10);  // 10 rounds  const hashedPassword = await bcrypt.hash(password, salt);  // Store hashedPassword in database  return hashedPassword;}
// Verifying password on loginasync function loginUser(inputPassword, storedHash) {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);  return isMatch;  // true if password matches}
```

**Python:**

```python
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Hash passwordhashed = pwd_context.hash("user_password")
# Verify passwordis_valid = pwd_context.verify("user_password", hashed)
```

### 2. Bcrypt Configuration:

```
Rounds (cost factor): 10-12
- 10 rounds: ~100ms per hash
- 12 rounds: ~250ms per hash
- Higher = more secure but slower

Never reduce rounds for "performance"
Always use salt
Never reuse salt between passwords
```

### 3. Password Validation Rules:

```
Minimum: 8 characters
Complexity:
- At least 1 uppercase (A-Z)
- At least 1 lowercase (a-z)
- At least 1 number (0-9)
- At least 1 special char (!@#$%^&*)

NOT allowed:
- Password same as username
- Password same as email
- Common passwords (123456, password, etc.)
- Previously used passwords (last 5)
```

### 4. Password Handling Security:

```
DO:
✓ Hash before storing
✓ Never log plaintext passwords
✓ Never send passwords in email
✓ Use HTTPS for password transmission
✓ Require strong passwords
✓ Implement forgot password securely
✓ Force password reset on first login
✓ Have password expiration (90 days)

DON'T:
✗ Store plaintext passwords
✗ Send passwords in URLs
✗ Log password attempts
✗ Use weak hashing (MD5, SHA)
✗ Reuse hashes between users
✗ Tell user what's wrong with password (vague is secure)
✗ Allow password=username
✗ Allow very short passwords
```

### 5. Forgot Password Flow (Secure):

```
1. User submits email
2. Generate random token (256-bit)
3. Store token hash in database with expiry (15 mins)
4. Send link: https://app.com/reset-password?token=xyz
5. User clicks link, changes password
6. Verify token, hash new password, store, delete token
7. Never show if email exists (privacy)
```

**Why:** Prevents password cracking, prevents brute force attacks, prevents account compromises, meets compliance requirements.

---

## Rule 92: Follow OWASP Top 10 Vulnerabilities Prevention

**Category:** Security | **Severity:** Critical | **Phase:** Development

OWASP Top 10 represents the most critical security risks. Vibe-coded apps should explicitly address each.

**Implementation:**

### OWASP Top 10 (2021) + Prevention:

**1. Broken Access Control**
Prevention (Already covered in Rules):
- Rule 6: Separate public/admin interfaces
- Rule 22: Centralized auth context
- Rule 34: Input validation

Additional:

```
Implement role-based access control (RBAC)
Verify authorization on EVERY endpoint
Don't rely on frontend authorization alone
Log all access attempts
Monitor for privilege escalation
```

**2. Cryptographic Failures**
Prevention:
- Rule 83: HTTPS everywhere
- Rule 90: Security headers
- Rule 88: API key management

Additional:

```
Encrypt sensitive data at rest
Encrypt data in transit (HTTPS always)
Use strong encryption algorithms (AES-256)
Never hardcode encryption keys
Rotate keys regularly
```

**3. Injection (SQL, NoSQL, Command)**
Prevention (Already in Rule 34):
- Validate ALL inputs
- Use parameterized queries
- Use ORM/query builders

Additional:

```
Node.js: Use parameterized queries with database drivers
const result = db.query('SELECT * FROM users WHERE id = ?', [userId]);

Python: Use SQLAlchemy ORM
user = db.query(User).filter(User.id == user_id).first()

Never string concatenate queries
Use prepared statements
Escape special characters
```

**4. Insecure Design**
Prevention:
- Rule 5: Define architecture before coding
- Rule 8: Create data models
- Rule 56: Pre-deployment testing

Additional:

```
Threat modeling before development
Security requirements in design phase
Code review with security focus
Secure defaults (whitelist, not blacklist)
Fail securely (deny by default)
```

**5. Security Misconfiguration**
Prevention:
- Rule 65: .env.example files
- Rule 67: Environment variables
- Rule 69: Documentation

Additional:

```
Remove unnecessary features
Run with minimal permissions
Keep dependencies updated
Default passwords changed
Error messages don't reveal system info
Security headers configured
No debug mode in production
```

**6. Vulnerable and Outdated Components**
Prevention (Rule 87 covers this):
- Minimize dependencies
- Justify each package
- Update regularly

Additional:

```
Track dependency vulnerabilities
npm audit / safety check regularly
Update dependencies monthly
Have rollback plan for updates
Monitor for 0-days
Use Software Composition Analysis (SCA) tools
```

**7. Authentication Failures**
Prevention (Rule 91 covers this):
- Bcrypt password hashing
- Session management
- MFA (multi-factor auth)

Additional:

```
Require strong passwords
Implement account lockout after N failures
Enforce MFA for sensitive operations
Secure password reset
Session timeout
Logout invalidates session
```

**8. Software and Data Integrity Failures**
Prevention:

```
Use HTTPS only
Verify package integrity
Implement CI/CD security checks
Code signing for releases
Secure delivery channels
Monitor for tampering
```

**9. Logging and Monitoring Failures**
Prevention (Rule 77 covers this):
- Monitoring enabled
- Alerts configured
- Error tracking

Additional:

```
Log all authentication attempts
Log all authorization failures
Log sensitive operations
Protect logs from tampering
Monitor for unusual patterns
Alert on security events
Retain logs for 90 days minimum
```

**10. Server-Side Request Forgery (SSRF)**
Prevention:

```
Validate all URLs before requesting
Whitelist allowed domains
Prevent access to internal networks
Disable unused protocols (gopher, file://)
Block IP addresses like 127.0.0.1, 10.0.0.0/8
Implement network segmentation
```

### OWASP Top 10 Checklist:

```
Before deploying to production:
□ Access control verified
□ Data encrypted in transit (HTTPS)
□ Data encrypted at rest (if needed)
□ No injection vulnerabilities
□ Security architecture reviewed
□ No misconfigurations
□ All dependencies current
□ Authentication secure
□ Logging/monitoring active
□ No SSRF vulnerabilities
```

### Tools for OWASP Compliance:

```
Static Analysis:
- SonarQube (code quality)
- Snyk (vulnerability scanning)
- OWASP Dependency-Check

Dynamic Analysis:
- OWASP ZAP (penetration testing)
- Burp Suite (security testing)
- npm audit (dependency vulnerabilities)

Continuous Monitoring:
- GitHub Advanced Security
- GitLab security scanning
- Deepsource
```

**Why:** Prevents 90% of web application attacks, meets compliance requirements, passes security audits, maintains user trust, protects company reputation.

---