---
order: 3
title: Next Features and Development
#date: 2024-01-16 08:01:35 +0300
#label: Flamegraphs
image: '/images/featured/roadmap.jpg'
featured: true
---

### 0.2.0 - Simple Cloud Deployment

- [x]  DIR Config Configuration
- [x]  HTTP Config for Load App
- [ ]  Lambda Matcher for DiffGraph
- [x]  Recording Folder
- [ ]  Cloud Deployment Blog Post
- [ ]  Fix Secondary Info in cards

### 0.3.0 - Performance

- [ ]  Pregenerate all static Profile's content
- [ ]  Pregenerate configured flamegraphs
- [ ]  Shared iterating over JFR file
- [ ]  Profile Jeffrey with Jeffrey

### 0.4.0 - Thread View

- [ ]  Threads with timelines and given states
- [ ]  Context window - stacktrace/flamegraph for BLOCKED state 
- [ ]  Context window - generate a flamegraph for a thread RUNNABLE state for the given period (modal window)
- [ ]  Filtering/Grouping threads

### 0.5.0 - Manipulating with Recordings

- [ ]  Upload recordings to folders
- [ ]  Merge recordings
- [ ]  Split recordings into chunks
- [ ]  Generate a new recording with specific events from the old one
- [ ]  Generate a new recording by removing specific events from the old one
- [ ]  Generate a new recording from a specific time range of the old one

### 0.6.0 - Code Quality (Removing TechDebt)

Currently, we haven't any tests to be focused on bringing features to the first version of Jeffrey (to check whether community has any interest to this app)

Reasons for omitting tests:

- Limited time is invested to features
- A lot of unknowns (choosing proper plotting libraries requiring data in different formats)
- Plenty of internal refactorings would cause rewriting tests for the price of delaying features

- [ ]  Test Coverage
- [ ]  Documentation to interfaces and other building blocks
- [ ]  Code Refactorings
- [ ]  Error handling - meaningful error messages from backend to frontend
