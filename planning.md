# Astra Roadmap

## Hackathon Execution Plan (48h target)
- **T-4h – Prep:** finalize scope, pre-stage demo data, and verify the C++/QUBIC library plus node access with smoke tests.
- **Day 1 (Hours 0-24) – Core + Chain:** deliver Milestones 1-6 sequentially so merchants can create, share, and complete payments while the temporary wallet + fee service runs live.
- **Day 2 (Hours 24-44) – Automation, Insights, UX:** implement Milestones 7-10 with enough polish to showcase automation, analytics, UI kits, and receipts.
- **Hours 44-48 – Demo Crunch:** capture screen recordings, cherry-pick metrics visualizations, rehearse pitch, and prepare contingency scripts.
- **Demo Assets:** maintain a shared folder with the latest pitch deck, CLI logs, and recorded walkthroughs for quick reference.

## Milestone 1: Payment Request Engine
### Issue Title: Milestone 1 – Payment Request Engine
- **Description:** Empower merchants to create QUBIC-denominated requests with rich metadata and lifecycle tracking that feeds downstream settlement.
- **Deliverables:**
  - API and dashboard forms for creating QUBIC-denominated payment requests with metadata.
  - Templates for merchant branding, amount presets, and expiry rules.
  - Persistence layer aligned with upcoming blockchain settlement events.
- **Guides:**
  - Advanced Guide: Walkthrough covering schema design, multi-tenant validation, and how to pre-compute settlement hints for large merchants.
  - Technical Guide: Step-by-step for scaffolding REST/GraphQL endpoints, defining DB migrations, and wiring request creation flows into the internal job queue.

## Milestone 2: Request & Send Payment Links
### Issue Title: Milestone 2 – Payment Link Distribution
- **Description:** Produce shareable payment links with delivery automation so merchants can collect funds through low-friction channels.
- **Deliverables:**
  - Shareable payment link generator with short URLs, QR code assets, and merchant branding.
  - Link delivery channels (email, SMS, copy-to-clipboard) plus status tracking for sent links.
  - Expiration, partial payment protection, and auto-refreshing QUBIC amounts tied to price feeds.
- **Guides:**
  - Advanced Guide: Deep-dive on branded link templates, delivery webhooks, and growth experiments (A/B testing reminder vs. QR flows).
  - Technical Guide: Instructions to implement short-link service, integrate transactional email/SMS providers, and expose admin tooling for manual resend.

## Milestone 3: Hosted Checkout Experience
### Issue Title: Milestone 3 – Hosted Checkout
- **Description:** Deliver a responsive checkout that renders QUBIC payment instructions, tracks state, and can be embedded anywhere.
- **Deliverables:**
  - Responsive hosted checkout pages that render payment QR codes and instructions.
  - Checkout session lifecycle states (initialized, awaiting payment, confirmed, expired).
  - Theme configuration and embeddable snippets for merchant sites.
- **Guides:**
  - Advanced Guide: Implementation guide for building multi-step checkouts, progressive disclosure for wallet instructions, and client instrumentation.
  - Technical Guide: React/Vue starter, environment configuration, and component-by-component breakdown for QR rendering, polling, and webhook confirmation handling.

## Milestone 4: QUBIC Chain Transaction Service
### Issue Title: Milestone 4 – Chain Service with Middleman Wallet
- **Description:** Stand up a transaction layer on top of the C++ QUBIC library that routes payments through temporary wallets to collect fees safely.
- **Deliverables:**
  - Service using the in-house C++/QUBIC library for submitting and observing transactions.
  - Secure key management flows for merchants (custodial or external).
  - Retry and reconciliation logic for chain confirmations.
  - Temporary wallet orchestration layer that spins up a per-transaction middleman wallet via the library, enforces fee thresholds, and sweeps revenue.
- **Guides:**
  - Advanced Guide: Reference architecture for node connectivity, fee-balancing policies for the temporary wallets, and chaos-testing playbook.
  - Technical Guide: Detailed steps for invoking the C++ bindings, creating ephemeral wallet records, enforcing fee thresholds (min/max), and scheduling sweeps to treasury accounts.

## Milestone 5: Send & Receive Automation
### Issue Title: Milestone 5 – Automated Transfers
- **Description:** Automate inbound and outbound QUBIC transfers with batching, scheduling, and health alerts.
- **Deliverables:**
  - Programmatic endpoints/UI actions for payouts and incoming transfers.
  - Scheduling and batching support for bulk disbursements.
  - Alerting for failed or delayed transfers.
- **Guides:**
  - Advanced Guide: Cookbook covering payout templates, ledger synchronization, and fallback routing for congested chain conditions.
  - Technical Guide: Cron/worker setup, payout ledger schema, and integration pattern for posting payouts through the middleman wallet service with fee tracking.

## Milestone 6: Real-Time Chain Monitoring
### Issue Title: Milestone 6 – Chain Monitoring & Alerts
- **Description:** Provide continuous visibility into QUBIC confirmations, tying events to checkout sessions and temporary wallet fees.
- **Deliverables:**
  - Block listener hooked into QUBIC nodes via the existing library, emitting internal events.
  - Persistence of transaction proofs and status transitions.
  - Dashboard widgets showing live confirmation progress.
- **Guides:**
  - Advanced Guide: Ops manual for scaling listeners, index partitioning tricks, and alert thresholds tied to the temporary wallet fee model.
  - Technical Guide: Instructions for deploying the listener service, defining protobuf/JSON events, wiring them into WebSocket streams, and instrumenting Prometheus/Grafana dashboards.

## Milestone 7: Webhook Infrastructure
### Issue Title: Milestone 7 – Merchant Webhooks
- **Description:** Notify merchants about payment lifecycle changes with secure, reliable webhook delivery.
- **Deliverables:**
  - Configurable webhook subscriptions per merchant/event type.
  - Signature verification utilities and retry/backoff pipeline.
  - Self-serve testing console plus delivery logs.
- **Guides:**
  - Advanced Guide: Security-focused walkthrough including key rotation, tenant isolation, and best practices for replay-resistant testing.
  - Technical Guide: API spec for subscription CRUD, sample HMAC verification snippets, queue-backed dispatcher implementation, and observability hooks.

## Milestone 8: Analytics & Reporting
### Issue Title: Milestone 8 – Analytics & Reporting
- **Description:** Give merchants insight into performance with aggregated metrics, filters, and exports.
- **Deliverables:**
  - Aggregated payment statistics (volume, conversion, settlement time).
  - Filters for merchant, checkout, and date range plus CSV export.
  - KPI dashboards aligned with merchant onboarding funnel.
- **Guides:**
  - Advanced Guide: Tutorial on building derived metrics, using feature flags to expose analytics gradually, and layering cohort analysis.
  - Technical Guide: Data warehouse schema, ETL/ELT jobs, dashboard queries, and CSV export implementation with pagination safeguards.

## Milestone 9: “Pay with Astra” Components
### Issue Title: Milestone 9 – Pay with Astra UI Kits
- **Description:** Ship drop-in UI components that embed Astra checkout flows into merchant products.
- **Deliverables:**
  - Copy/paste HTML/JS button kit and React/Vue snippets with prefilled payment flows.
  - SDK hooks to initialize checkout sessions and poll status.
  - Brand guidelines and asset bundle.
- **Guides:**
  - Advanced Guide: Component theming guide, framework-specific integration tips, and sample regression test harness for UI kits.
  - Technical Guide: Package scaffolding (npm), build tooling, storybook previews, and CI scripts to publish tagged releases.

## Milestone 10: Proof-of-Payment Receipts
### Issue Title: Milestone 10 – Proof-of-Payment Receipts
- **Description:** Generate verifiable receipts for customers and merchants tied to on-chain data.
- **Deliverables:**
  - Customer-facing receipt generation with decoded QUBIC transaction data.
  - Verifiable receipt links referencing on-chain proof.
  - Merchant archive plus search/export tooling.
- **Guides:**
  - Advanced Guide: Step-by-step on verifying proofs, caching decoded chain data, and automating archival exports for compliance teams.
  - Technical Guide: Template rendering flow (PDF/HTML), signed URL generator, and storage lifecycle policies for receipt retention.
