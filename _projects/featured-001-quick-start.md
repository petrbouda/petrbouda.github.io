---
order: 1
title: Quick Start with Examples
#date: 2024-01-16 08:01:35 +0300
#label: Flamegraphs
image: '/images/featured/start.jpg'
featured: true
---
**Greetings, Java Developer!**

My name is Jeffrey, and I'll be your guide today to show you some interesting features of my application. 
Let's go straight to the point, I don't want to waste your time. It's Profile-time!

I'm mainly focused on profiling Java application and JFR recordings. Therefore, I prepared a testing application  
and created a couple JFR profiles to start up quickly with some examples.

## Initial Information

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
  - in the future, the profile can be just a part of the recording, or merged from several recordings 

#### Primary & Secondary Profiles 

- `primary` - the main profile selected at the very beginning (the blue one in the header)
- `secondary` - the profile that is used for differential flamegraphs/sub-second graphs (the grey one in the header)

## Let's Get Started

There are multiple ways to start Jeffrey. However, for this Quick Start, we will use Docker Image with pre-generated 
recordings <a href="https://hub.docker.com/repository/docker/petrbouda/jeffrey-examples" style="color: blue">https://hub.docker.com/repository/docker/petrbouda/jeffrey-examples</a>

```
docker run -it --network host petrbouda/jeffrey-examples
```

- Open in a browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

![frontpage](/images/blog/start/frontpage.png)

- For the purpose of this article, we created 2 profiles:
  - **jeffery-persons-full-direct-serde** - jeffrey-testapp with serde directly from bytes to entity
  - **jeffery-persons-full-dom-serde** - jeffrey-testapp with serde using JSON DOM
  - both profiles were created using AsyncProfile (CPU + Alloc) with all other events from JFR settings=profile

- the picture above contains predefined profiles and a drag-and-drop form to load a new recording (it automatically creates a new profile from the recording at this time)
- choose **jeffery-persons-full-direct-serde** profile 

## Profile Information

After the profile selection, the very first page contains basic information about the application and the profile.
Since we have JFR's `settings=profile`, the application emitted all available configuration events.

If your profile does see any of the events above you probably have JFR's `settings=default` or use AsyncProfile without `jfrSync` argument (more information about options for generating recordings will be available in the follow-up blog post)

![profile-information](/images/blog/start/profile-info.png)

## Auto Analysis

Follow with the second item on the menu: **Auto Analysis**. There are some predefined rules and thresholds
that automatically generate recommendations with detailed explanations directly from emitted events.

Be focused on the warnings and always consider whether the warning is relevant for you and can help you to run your application efficiently.

![auto-analysis](/images/blog/start/auto-analysis.png)

## Event Viewer

The next item is **Event Viewer**.

![auto-analysis](/images/blog/start/event-viewer.png)


<div class="gallery-box">
  <div class="gallery">
    <img src="/images/project-example-2.jpg" loading="lazy" alt="Project">
    <img src="/images/project-example-3.jpg" loading="lazy" alt="Project">
    <img src="/images/project-example-4.jpg" loading="lazy" alt="Project">
  </div>
  <em>Gallery / <a href="https://unsplash.com/" target="_blank">Unsplash</a></em>
</div>

At the heart of successful UX/UI design is empathy. We explore how putting ourselves in users’ shoes allows us to create designs that truly resonate with their desires and aspirations.

![iPad](/images/project-example-1.jpg)
*Photo by [Balázs Kétyi](https://unsplash.com/@balazsketyi) on [Unsplash](https://unsplash.com/)*

Understanding user behavioral patterns and preferences plays a crucial role in developing design concepts. In this blog, we will explore methods and tools that will help you gather valuable data and transform it into unique design solutions.

In a multi-device world, consistency is key. We discuss the challenges and opportunities that arise when designing experiences that seamlessly transition between devices.

> Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs

We invite you to join us on this creative expedition as we explore the diverse facets of design and user experiences. Design and user experience are critical factors in creating successful interactions with the target audience. Unique and intuitive interfaces, designed with user needs in mind, can leave a positive impression and satisfy their expectations.

As designers, our task is not only to convey brand values and emotions through visual elements but also to create a unique personality that stands out among competitors. We will discuss creating a strong brand identity and managing its perception through design.
