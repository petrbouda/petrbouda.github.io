---
order: 3
title: Next Features and Development
#date: 2024-01-16 08:01:35 +0300
#label: Flamegraphs
image: '/images/featured/roadmap.jpg'
featured: true
---

### 0.2.0 - Simple Cloud Deployment

- [x] &nbsp; Configuration of directories for Jeffrey 
- [x] &nbsp; HTTP Config for Load App
- [ ] &nbsp; Special handling of generated Lambdas to stop crippling DiffGraph
- [x] &nbsp; Page for recordings maintained by Jeffrey
- [x] &nbsp; Generate a new profile from the recording
- [ ] &nbsp; "Simple Cloud Deployment" blog post
- [ ] &nbsp; Add info about secondary profiles to DiffGraph cards

### 0.3.0 - Performance

- [ ] &nbsp; Pre-generate all static profile's content (content for Profile Information, Auto-Analysis, Event Viewer)
- [ ] &nbsp; Pre-generate content for the main configured flamegraphs and sub-second graphs
- [ ] &nbsp; Shared iterating over the JFR file (one iteration of JFR file for multiple outputs)
- [ ] &nbsp; Profile Jeffrey with Jeffrey

### 0.4.0 - Thread View

- [ ] &nbsp; Threads with timelines and given states
- [ ] &nbsp; Context window - stacktrace/flamegraph for BLOCKED state 
- [ ] &nbsp; Context window - generate a flamegraph for a thread RUNNABLE state for the given period (modal window)
- [ ] &nbsp; Filtering/Grouping threads

### 0.5.0 - Manipulating with Recordings

- [ ] &nbsp; Upload recordings to folders
- [ ] &nbsp; Merge recordings
- [ ] &nbsp; Split recordings into chunks
- [ ] &nbsp; Generate a new recording with specific events from the old one
- [ ] &nbsp; Generate a new recording by removing specific events from the old one
- [ ] &nbsp; Generate a new recording from a specific time range of the old one

### 0.6.0 - Code Quality (Removing TechDebt)

We omitted tests to be focused on bringing features to the first major version of Jeffrey (to check whether community has any interest to this app)

Reasons for omitting tests:

- Limited time is invested to features
- A lot of unknowns (choosing proper plotting libraries requiring data in different formats)
- Plenty of internal refactorings would cause rewriting tests for the price of delaying features

- [ ] &nbsp; Test Coverage
- [ ] &nbsp; Documentation to interfaces and other building blocks
- [ ] &nbsp; Code Refactorings
- [ ] &nbsp; Error handling - meaningful error messages from backend to frontend
