# hse-25-winter

## 02.10.25 - Cloud Introduction

<img width="2402" height="918" alt="image" src="https://github.com/user-attachments/assets/f6b12701-8ddc-4724-bb61-ba5a43c9dd00" />
<img width="2108" height="1071" alt="image" src="https://github.com/user-attachments/assets/6afeb619-eb69-4536-9cf3-c6ffe194dd76" />

1. **Distributed Systems**
   - Difference distributed and non-distributed systems
   - Reasons to use/implement distributed-systems
   - The fallacies of distributed computing

2. Cloud Service Models
   - IaaS, PaaS, SaaS revisited, with modern examples.

### Review Questions
- What are the five essential characteristics of cloud computing according to NIST, and how do they apply to modern cloud services?
- Identify 3 main cloud providers and list their most important services
- What are the differences between IaaS, PaaS, and SaaS? Give examples of each in today's cloud ecosystem.
- What is the CNCF, and why is it important in the context of cloud-native technologies?
- Describe 3 of the fallacies of distributed computing

---

## 09.10.25 Cloud Native Software Development

- ***12 Factor Apps***
  1. One Codebase
  2. Explicit Dependencies
  3. Environment Config
  4. Backing Services
  5. Build, Release, run
  6. Stateless Processes
  7. Port Binding
  8. Concurrency
  9. Disposability
  10. Dev/Prod Parity
  11. Logging
  12. Admin Processes

- ***Staging***

---

## 23.10.25 Spring Boot and Cloud IDEs

- ***Spring Boot Introduction***
- ***Implementation Showcase using Cloud IDEs***
---

## 30.10.25 REST APIs

- HTTP Basics: Core concepts of HTTP for APIs, including request/response structure.
- Introduction to REST: Understanding the foundational ideas of REST as defined by Roy Fielding and how RESTful APIs communicate.
- Nouns and Verbs: Structuring REST APIs around resources (nouns) and actions (verbs).
- Representation: Data formats in REST (e.g., JSON, XML) and the role of content negotiation.
- HTTP Return Codes: Standard HTTP status codes, their meanings, and when to use each in API responses.
- Idempotency: Ensuring repeatable requests yield the same results to prevent unintended side effects.
- Richardson's Maturity Model: Levels of RESTful maturity, from Level 0 (HTTP as a tunnel) to Level 3 (HATEOAS), to understand API design progression.

---

## 06.11.25 Containers and Docker

Development in distributed teams withouth containers and the potential problems:
- Polyglot application landscapes are challenging as all work environments need to match all runtime requirements for all languages
- Transporting application from environment A to environment B introduces challenges and problems with mismatching runtimes

Containers
- Isolate Applications from each other
- Package Applications along with all Runtime requirements for easy execution and transportation between working environments
- Simplify configuration of working environments -> only container engine needed
- andling of all application containers through same mechanisms: docker build, docker run

---

## 13.11.25 Docker Deep Dive

Docker
- Docker ecosystem consists of the Docker Daemon, Docker CLI and Docker Hub
- Creation of Dockerfiles
- Building Images - Understanding the layer concept in container images
- Running Containers
