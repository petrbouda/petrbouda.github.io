---
title: 0.7 Release Announcement
description: Let's Get Started with Jeffrey 0.4 release
order: 7
---

## Let's Get Started with Jeffrey App

Today, I'm happy to announce the **0.4** release of Jeffrey App - <a href="https://github.com/petrbouda/jeffrey/releases/download/0.4/jeffrey.jar" style="color: blue">Jeffrey App</a>.
There is a new cool feature, let's have a look at it!

Start the jar file using the following command:
```
java -jar jeffrey.jar
```

or you can spin up docker container with the following command, and check predefined examples. 
```
docker run -it -p 8585:8585 petrbouda/jeffrey-examples:0.4
```

Open the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

### New Features

#### Support for the latest Async-Profiler - Native Memory Leaks Profiling

The latest versions of Async-Profiler (Nightly builds) bring a support for the Native Memory Leaks profiling.
In a nutshell, it records Malloc and Free (+ their addresses) events and then Jeffrey is able to find 
which Malloc events have no corresponding Free events.

<a href="https://github.com/async-profiler/async-profiler/blob/master/docs/ProfilingModes.md#native-memory-leaks">https://github.com/async-profiler/async-profiler/blob/master/docs/ProfilingModes.md#native-memory-leaks</a>

- use Jeffrey-examples docker image above to try the new feature
- enter to **jeffrey-persons-native-allocation-samples** profile and navigate to predefined flamegraphs: **Flamegraphs -> Primary**

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/04-announcement/flamegraph-sections.png" loading="lazy" alt="Project">
    <img src="/images/blog/04-announcement/flamegraph-malloc.png" loading="lazy" alt="Project">
  </div>
</div>

- there is a new option: **Only Allocations with Unsafe**, it takes into account only samples that are allocated using **Unsafe**
- opt out the option if you want to see all Malloc allocations, or all **Malloc** allocations without corresponding **Free** events

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/04-announcement/native-leaks-1.png" loading="lazy" alt="Project">
    <img src="/images/blog/04-announcement/native-leaks-2.png" loading="lazy" alt="Project">
  </div>
</div>

#### Multi-platform release of Docker Images

We finally support ARM-based platform for docker images as well, you can enjoy Jeffrey on your Mac Silicon. 

### The last few words

I hope you will enjoy the new features and improvements. If you have any questions, feel free to get in touch with me :)
