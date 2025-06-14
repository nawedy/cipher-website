# Site Architecture & User Flow

## Site Structure

### Public Pages
- **Home** - Showcase all four business pillars with interactive sections
- **Services** 
  - LLM Implementation
  - Strategic AI Consulting
  - Education & Training
- **Products** - Catalog of pre-built solutions
- **Blog** - Articles, guides, and thought leadership
- **Case Studies** - Successful implementations and results
- **About** - Team, mission, and values
- **Contact** - Contact form and information

### Authenticated User Pages
- **Dashboard** - Overview of purchased services/products
- **My Products** - Purchased products, usage, and analytics
- **My Services** - Active service engagements and status
- **Learning Portal** - Access to purchased educational content
- **Support** - Ticket system and messaging
- **Billing** - Subscription management and invoices
- **Account Settings** - Profile and preferences

### Admin Pages
- **Overview** - Key metrics and activity
- **Customers** - User management
- **Products** - Product/service management
- **Orders** - Transaction management
- **Content** - Blog, case studies, and page content
- **Support** - Ticket management system
- **Analytics** - Detailed performance reports
- **Settings** - System configuration

## User Flows

### 1. New Visitor Flow
```
Landing Page → Explore Services/Products → View Case Studies → Create Account → Request Demo/Consultation
```

### 2. Product Purchase Flow
```
Products Page → Product Detail → Add to Cart → Checkout → Payment → Account Creation → Product Dashboard
```

### 3. Service Engagement Flow
```
Services Page → Service Detail → Contact/Quote Request → Consultation Booking → Proposal → Contract → Project Dashboard
```

### 4. Support Flow
```
Dashboard → Support → Create Ticket → Messaging → Resolution → Feedback
```

### 5. Content Consumption Flow
```
Blog/Resource Listing → Article Detail → Related Resources → Newsletter Signup → Gated Content Access
```

### 6. Admin Content Management Flow
```
Admin Login → Content Dashboard → Create/Edit Content → Preview → Publish → Analytics Review
```

## Data Models

### Users
- id (PK)
- email
- password (hashed)
- first_name
- last_name
- role (admin, customer, staff)
- company
- phone
- created_at
- last_login

### Profiles
- id (PK)
- user_id (FK)
- avatar_url
- bio
- job_title
- industry
- preferences (JSON)

### Products
- id (PK)
- name
- slug
- description
- features (JSON)
- price
- subscription_type (one-time, monthly, annual)
- category
- status (active, draft, archived)
- created_at
- updated_at

### Orders
- id (PK)
- user_id (FK)
- status
- total
- payment_intent
- created_at
- updated_at

### Order_Items
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- price

### Services
- id (PK)
- name
- slug
- description
- service_type
- status (active, draft, archived)

### Service_Engagements
- id (PK)
- user_id (FK)
- service_id (FK)
- status
- start_date
- end_date
- notes

### Tickets
- id (PK)
- user_id (FK)
- subject
- description
- status
- priority
- created_at
- updated_at

### Messages
- id (PK)
- ticket_id (FK)
- user_id (FK)
- content
- attachment_urls (JSON)
- created_at

### Blog_Posts
- id (PK)
- title
- slug
- content
- excerpt
- featured_image
- author_id (FK)
- status (published, draft)
- categories (JSON)
- tags (JSON)
- published_at
- created_at
- updated_at

### Case_Studies
- id (PK)
- title
- slug
- client_name
- industry
- challenge
- solution
- results
- testimonial
- featured_image
- gallery (JSON)
- status (published, draft)
- published_at

## API Routes

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/reset-password
- GET /auth/user

### Products
- GET /products
- GET /products/:id
- POST /products (admin)
- PUT /products/:id (admin)
- DELETE /products/:id (admin)

### Orders
- GET /orders
- GET /orders/:id
- POST /orders
- PUT /orders/:id (admin)

### Services
- GET /services
- GET /services/:id
- POST /services (admin)
- PUT /services/:id (admin)

### Engagements
- GET /engagements
- GET /engagements/:id
- POST /engagements
- PUT /engagements/:id

### Support
- GET /tickets
- GET /tickets/:id
- POST /tickets
- PUT /tickets/:id
- GET /tickets/:id/messages
- POST /tickets/:id/messages

### Content
- GET /blog
- GET /blog/:slug
- GET /case-studies
- GET /case-studies/:slug
- POST /blog (admin)
- PUT /blog/:id (admin)
- POST /case-studies (admin)
- PUT /case-studies/:id (admin)

## Security Considerations

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Refresh token rotation
- Session management
- Password policy enforcement

### Data Security
- Row-level security in Supabase
- Content sanitization
- Input validation
- CSRF protection
- XSS prevention
- Rate limiting

### Payment Security
- Stripe for payment processing (no card data on servers)
- Webhook signature verification
- Secure payment intent confirmation
- Order validation