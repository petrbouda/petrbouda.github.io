### 0.6 - Simple Cloud Deployment
- [ ] &nbsp; Deployment to Kubernetes environment with shared filesystem
- [ ] &nbsp; Automatically load projects from the shared filesystem and display them in the UI
- [ ] &nbsp; Examples of the deployment using local kubernetes cluster (e.g. Minikube, ...)

### 0.x - Performance
- [ ] &nbsp; Performance improvements for bigger flamegraphs
- [ ] &nbsp; Faster loading of the flamegraphs
- [ ] &nbsp; PoC for other Databases to make loading of profiles faster (e.g. PostgreSQL, CockroachDB, ...)

### 0.x - Code Quality (Removing TechDebt)

We omitted tests to be focused on bringing features to the first major version of Jeffrey (to check whether community has any interest to this app)

Reasons for omitting tests:

- Limited time is invested to features
- A lot of unknowns (choosing proper plotting libraries requiring data in different formats)
- Plenty of internal refactorings would cause rewriting tests for the price of delaying features

- [ ] &nbsp; Test Coverage
- [ ] &nbsp; Documentation to interfaces and other building blocks
- [ ] &nbsp; Code Refactorings
- [ ] &nbsp; Error handling - meaningful error messages from backend to frontend
