# 🛠️ Random-Excuse-API

Welcome to **Random-Excuse-API**, a full-stack learning project built with [Spring Boot](https://spring.io/projects/spring-boot) (back-end), a lightweight front-end interface, and a simple embedded database. This project was crafted to help me deepen my understanding of Spring, REST design principles, and full-stack integration.

Hopefully, it'll make even a senior developer or recruiter say: *“Oh wow, what an interesting project with a solid README!”*

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Architecture](#architecture)  
   - [Database](#database)  
   - [Back-end (Spring Boot API)](#back-end-spring-boot-api)  
   - [Front-end](#front-end)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation & Run](#installation--run)  
   - [Configuration](#configuration)  
4. [API Endpoints & Usage](#api-endpoints--usage)  
   - [Get a Random Excuse](#get-a-random-excuse)  
   - [Get by ID](#get-by-id)  
   - [Get by Category](#get-by-category)  
   - [Retrieve Multiple Excuses](#retrieve-multiple-excuses)  
5. [Code Samples](#code-samples)  
   - [Spring Controller](#spring-controller)  
   - [Repository Handler](#repository-handler)  
   - [Front-end Fetch](#front-end-fetch)  
6. [Screenshots](#screenshots)  
7. [What I Learned](#what-i-learned)  
8. [License](#license)

---

## Project Overview

The Random-Excuse-API is a simple yet instructive full-stack application. It exposes RESTful endpoints where you can fetch excuses randomly, by specific category, or by ID. The front-end offers a UI to generate or filter excuses visually. Conceived explicitly as a sandbox for learning Spring Boot, I intentionally kept it lightweight and modular.

---

## Architecture

A three-tier structure:

### 🗄️ Database
- A simple file-based embedded H2 database containing an `excuses` table.
- Fields: `id`, `category`, `text`.
- Schema auto-created on app startup via Spring Data JPA.

### 🚀 Back-end (Spring Boot API)
- Exposes REST endpoints under `/api/excuses`.
- Built using Spring Boot with Spring MVC and Spring Data JPA.
- Exception handling with `@ControllerAdvice` for 404/400 cases.
- Unit/integration testing via JUnit and MockMVC.

### 💻 Front-end
- Vanilla JavaScript + minimal HTML/CSS.
- Fetches from API and displays results dynamically.
- Select input for category, buttons to fetch random or custom amount.

---

## Getting Started

### Prerequisites
- Java 11+  
- Maven 3.6+  
- Browser (Chrome/Firefox)

### Installation & Run
```bash
git clone https://github.com/PejperO/Random-Excuse-API.git
cd Random-Excuse-API
./mvnw spring-boot:run     # Or: mvn clean package && java -jar target/*.jar
```
- The API listens on `http://localhost:8080`.
- Front-end accessible via `http://localhost:8080/index.html`.

### Configuration
Database and server ports can be configured in `application.properties`:
```properties
server.port=8080
spring.datasource.url=jdbc:h2:file:~/random-excuse-db
spring.jpa.hibernate.ddl-auto=update
```

---

## API Endpoints & Usage

### Get a Random Excuse
```
GET /api/excuses/random
```
**Response:**
```json
{
  "id": 23,
  "category": "office",
  "text": "My coffee spilled on my keyboard and it started typing by itself."
}
```

### Get by ID
```
GET /api/excuses/{id}
```
Returns 404 if not found:
```json
{ "error": "Excuse not found for id 101" }
```

### Get by Category
```
GET /api/excuses/category/{categoryName}
```
E.g., `category/party`

### Retrieve Multiple Excuses
```
GET /api/excuses/random?n=5
```
Returns an array of `n` random excuses.

---

## Code Samples

### Spring Controller
```java
@RestController
@RequestMapping("/api/excuses")
public class ExcuseController {
  private final ExcuseService service;

  public ExcuseController(ExcuseService service) {
      this.service = service;
  }

  @GetMapping("/random")
  public List<Excuse> getRandom(@RequestParam(value="n", defaultValue="1") int n) {
      return service.random(n);
  }

  @GetMapping("/{id}")
  public Excuse getById(@PathVariable Long id) {
      return service.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Excuse not found"));
  }

  @GetMapping("/category/{cat}")
  public List<Excuse> getByCategory(@PathVariable String cat) {
      return service.findByCategory(cat);
  }
}
```

### Repository Handler
```java
public interface ExcuseRepository extends JpaRepository<Excuse, Long> {
  List<Excuse> findByCategory(String category);
}
```

### Front-end Fetch
```js
async function fetchRandom(n=1) {
  const resp = await fetch(`/api/excuses/random?n=${n}`);
  const data = await resp.json();
  displayExcuses(Array.isArray(data) ? data : [data]);
}
```

---

## Screenshots

<img width="1414" height="773" alt="generating" src="https://github.com/user-attachments/assets/0c7f7827-0974-4682-bb9c-faafe46c9532" />
<img width="1414" height="773" alt="excuse" src="https://github.com/user-attachments/assets/76398bb8-5516-490d-8e99-24269c740844" />



## What I Learned

- 📦 Spring Boot auto-configuration & dependency injection  
- 🗃️ Spring Data JPA and H2 database management  
- 🌐 Designing clean RESTful APIs with error handling  
- 💡 Asynchronous data fetching and UI updates with vanilla JS  
- 📈 End-to-end testing with JUnit & MockMVC  
- 🛡️ Deploying a full-stack sample with front & back properly integrated  

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
