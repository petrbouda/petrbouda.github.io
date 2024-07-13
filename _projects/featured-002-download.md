---
order: 2
title: Download and Startup
#date: 2024-01-16 08:01:35 +0300
#label: Flamegraphs
image: '/images/featured/download.jpg'
featured: true
---

Jeffrey is currently distributed in two artifacts standalone JAR File, or Container Image.

### Standalone JAR and Prepared Build

- Java 21 is required to run standalone JAR file

<a href="https://github.com/petrbouda/jeffrey/releases/latest/download/jeffrey.jar" style="color: blue">https://github.com/petrbouda/jeffrey/releases/latest/download/jeffrey.jar</a>

```
java -jar jeffrey.jar
```

- Open in the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

#### Using Container Images

Start an empty container (JFR Profiles for testing purposes - https://github.com/petrbouda/jeffrey-recordings):

- Newly added profiles will be stored in ~/.jeffrey/recordings

```
docker run -it --network host -v $HOME:/root petrbouda/jeffrey
```

- Open in the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

#### Using Container Images with recordings (for testing purposes) 

Start a container with testing JFR Profiles:

- There is no volume, newly added profiles will be lost after removing the container

```
docker run -it --network host petrbouda/jeffrey-examples
```

- Open in the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

#### Build from sources

- It requires having Java 21 and Node.js 22 installed (Maven plugin uses `npm` and run `vite build`)

```
git clone https://github.com/petrbouda/jeffrey.git && cd jeffrey
mvn clean package
cd build/target
```

```
java -jar jeffrey.jar
```

- Open in the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

### Build using a Docker Container

Container Image for building is available on DockerHub, or you can build your own 
<a href="https://github.com/petrbouda/jeffrey/blob/master/docker/Dockerfile-builder" style="color: blue">https://github.com/petrbouda/jeffrey/blob/master/docker/Dockerfile-builder</a>

```
git clone https://github.com/petrbouda/jeffrey.git && cd jeffrey
docker run -it -v "$PWD":/app petrbouda/jeffrey-builder mvn clean package -f /app/pom.xml
cd build/target
```

```
java -jar jeffrey.jar
```

### Running for development

- It requires having Java 21 and Node.js 22 installed
- Start the Backend in IDE: `service/core/src/main/java/pbouda/jeffrey/Application.java`
- Start UI

```
cd pages
npm run dev
```

- Open in the browser: <a href="http://localhost:5173" style="color: blue">http://localhost:5173</a>
