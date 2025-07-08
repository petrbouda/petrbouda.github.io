My name is Jeffrey, and I'll be your guide today to show you some interesting features of my application. 
Let's go straight to the point, I don't want to waste your time. It's Profile-time!

I'm mainly focused on profiling Java application and JFR recordings. Therefore, I prepared a testing application  
and created a couple JFR profiles to start up quickly with some examples.

### Let's Get Started with Jeffrey

There are multiple ways to start Jeffrey. However, for this Quick Start, we will use Docker Image with pre-generated
recordings <a href="https://hub.docker.com/repository/docker/petrbouda/jeffrey-examples" style="color: blue">https://hub.docker.com/repository/docker/petrbouda/jeffrey-examples</a>

```
docker run -it --network host petrbouda/jeffrey-examples
```

- Open in a browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

#### Tested Application

- <a href="https://github.com/petrbouda/jeffrey-testapp" style="color: blue">https://github.com/petrbouda/jeffrey-testapp</a>
- simple multi-threaded web application for storing and fetching information about persons 
- the app is full of inefficiencies to have some interesting info in the recording
- database is started as a testcontainer (CockroachDB) directly from the app (to simulation waiting/parking)
- from time to time the application parks itself, stores and loads data from disk and copy it back to DB on a single thread
- there are two recordings:
  - `direct` - JSON is serialized/deserialized directly to/from Java Object
  - `dom` - JSON si serialized/deserialized to JSON DOM (Jackson's JsonNode), then from DOM to Java Object

#### Recording x Profile

- `recording` - a concrete generated JFR file
- `profile` - data under investigation generated from JFR file
  - currently, there is 1:1 relationship between Recording and Profile 

#### Primary & Secondary Profiles

- `primary` - the main profile selected at the very beginning (the blue one in the header)
- `secondary` - the profile that is used for differential flamegraphs/sub-second graphs (the grey one in the header)
