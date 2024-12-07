---
title: 0.3 Release Announcement
description: Let's Get Started with Jeffrey 0.3 release
order: 6
---

## Let's Get Started with Jeffrey App

Today, I'm happy to announce the **0.3** release of Jeffrey App - <a href="https://github.com/petrbouda/jeffrey/releases/download/0.3/jeffrey.jar" style="color: blue">Jeffrey App</a>.
There are some new features and improvements, let's have a look at them!

Start the jar file using the following command:
```
java -jar jeffrey.jar
```

or you can spin up docker container with the following command, and check the features with predefined examples. 
```
docker run -it -p 8585:8585 petrbouda/jeffrey-examples
```

Open the browser: <a href="http://localhost:8585" style="color: blue">http://localhost:8585</a>

### New Features

#### Support for latest/greatest Async-Profiler - Wall-Clock Profiling

The latest version of Jeffrey App is now compatible with the latest version of Async-Profiler.
The newest version (not yet released) brings a lot of improvements especially in the area of **Wall-Clock** profiling.

Wall-Clock profiling is a very useful feature for profiling the startup of the application and looking for increased latency in the application.
Wall-Clock profiling suffered from the high overhead of the profiler itself, but the latest version brings a lot of improvements in this area.
It can optimize the sampling of threads that don't have any activity from the last sampling period, therefore, it can reduce the overhead of the profiler significantly.
Moreover, Wall-Clock gets a new type of event: **profiler.WallClockSample** and one event can represent multiple samples to reduce the size of the recording.

The Async-Profiler config below can be used for Wall-Clock profiling (just an example):

```
-agentpath:$ASPROF_HOME/lib/libasyncProfiler.so=start,event=ctimer,wall=10ms,loop=1h,jfrsync=default,chunksize=10m,file=/tmp/app-%t.jfr
```

- it samples **ctimer** as Execution Samples (useful for containerized environments)
- it samples **wall** as Wall-Clock Samples (useful for startup profiling)
- loops every hour - creates a new file every hour
- **jfrsync** - starts and synchronizes the recording with the JFR recording
- **chunksize** - is set to 10MB creates chunks of 10MB inside the binary files to improve parallel processing of Jeffrey
- _/tmp/app-%t.jfr_ - a pattern rolling binary JFR files every hour

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/flamegraph-sections.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/flamegraph-wallclock.png" loading="lazy" alt="Project">
  </div>
</div>

### Thread-View 

Jeffrey App now supports the Thread-View. It's a very useful feature for profiling the application in the context of threads.
Currently, it supports multiple events that can cause significant latency:

<h6>Event Types</h6>
<table>
<tr>
<td>Thread Park</td>
<td>Parking of the thread: <b>LockSupport#park()</b> (e.g. parking threads in Thread Pools)</td>
</tr>
<tr>
<td>Thread Sleep</td>
<td>Threads Sleep, emitted by <b>Thread#sleep()</b></td>
</tr>
<tr>
<td>Thread Wait</td>
<td>Thread Wait, emitted by <b>Thread#wait()</b></td>
</tr>
<tr>
<td>Monitor Enter</td>
<td>Blocked thread, caused by <b>MonitorEnter</b> (e.g. synchronized)</td>
</tr>
<tr>
<td>Socket Read/Write</td>
<td>Blocking reads/writes from a Socket (e.g. <b>SocketInputStream#read</b>, <b>SocketOutputStream#write</b>)</td>
</tr>
<tr>
<td>File Read/Write</td>
<td>Blocking reads from a File (e.g. <b>FileInputStream#read</b>, <b>FileOutputStream#write</b>)</td>
</tr>
</table>

Thread-View shows the lifespan of the threads and the events that occurred during the thread's lifetime.
We can get the detail of the event by pointing to thread's timeline. To investigate further, we can generate a flamegraph 
representing the particular type of the event, or Wall-Clock flamegraph to see the latency in the application in general.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/thread-view.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/thread-view-flamegraph.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/thread-view-wallclock.png" loading="lazy" alt="Project">
  </div>
</div>

### Guardian (Experimental)

Guardian is a new feature that can help you to monitor the application automatically and provide you the output causing the suspicious behavior.
It based on traversing the flamegraphs, looking for the concrete frames, and calculating the percentage of the observed frame pattern.
If the percentage is higher than the threshold, it will be reported, and it provides the possibility to generate the flamegraph with
the suspicious frames highlighted.

Currently, it supports hardcoded set of Guardian rules, but it's planned to be extended with the user-defined rules in the future and make it configurable.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/guardian.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/guardian-tooltip.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/guardian-flamegraph-1.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/guardian-flamegraph-2.png" loading="lazy" alt="Project">
  </div>
</div>

### Support for multiple Applications

Jeffrey is now separated by Applications. Every application has its own configuration, settings and space with recordings and profiles.
It's useful to automatically connect application with actively running JVMs and JFR recordings and generates profiles belonging to the given application.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/homepage.png" loading="lazy" alt="Project">
    <img src="/images/blog/03-announcement/project-page.png" loading="lazy" alt="Project">
  </div>
</div>

### Repository
 
Inside the application's space, there is a repository that contains current recordings of the single application. 
Currently, only Async-Profiler is supported, and we can generate recordings using the Async-Profiler configuration above.

In general, it's a place where we can store the recordings belonging to the application, just an application's folder.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/repository.png" loading="lazy" alt="Project">
  </div>
</div>

### Schedulers (Experimental)

Jeffrey contains a new feature called Schedulers. It can help you create jobs that can work with the repository
and automatically generates recordings every day at the same time, for the same period of time. 

One use-case can be to automatically configure multiple applications in Kubernetes, connect them together with shared volume,
and generate recordings every day at the same time. It can be useful for monitoring the applications in the long term.
We can very easily compare the workloads of the application two days ago, and today, and see the differences in Differential Flamegraphs 
(differences after the new deployments?)

There is a Cleaner job that can automatically delete old recordings to save the space on the disk.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blog/03-announcement/schedulers.png" loading="lazy" alt="Project">
  </div>
</div>

### The last few words

This release brings a lot of new features and improvements. Some of them are experimental and need to be tested in the real-world scenarios.
It would be great if you can try the new features and provide feedback on the GitHub repository. 

This release is huge, it was caused by plenty of refactorings and improvements in the codebase. Particularly, the moving to application-based
structure took a lot of time, but it was worth it. It's now easier to maintain the application and add new features in the future.

For the next time, I would like to iterate faster and provide more frequent smaller releases.

I hope you will enjoy the new features and improvements. If you have any questions, feel free to get in touch with me :)
