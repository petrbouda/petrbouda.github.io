## <a href="?how-java-heap-is-represented">How Java Heap is represented by JVM (TBD)</a>
_2022-11-09_

A short article that digs into JVM internals to uncover how the _Java Heap_ is
created/handled/represented. It can help to understand of how the heap and OS memory behave
in some specific cases.

## <a href="?tracking-rss-in-jvm-process">Tracking RSS down in a JVM Process (IN PROGRESS)</a>
_2022-11-08_

Very quick intro into how RSS in Linux OS works along with JVM. There are multiple places to read
information about the consumed memory by the process and a developer needs to exactly know
what these numbers mean to be able to predict the behavior in some constrained environments,
e.g. Containers. It's a mandatory introduction to following articles dealing with _JVM and Containers_.

## <a href="?native-memory-tracking">Native Memory Tracking in detail</a>
_2022-11-07_

From time to time, we run into a memory problem that is not related to Java Heap but Native Memory. 
Let's imagine the situation where we have a running container that is restarted once per day. 
We look at Prometheus/Grafana to check the reason behind this issue. However, we don't spot 
any problem with Java Heap size (exported via JMX) and start blaming our container scheduler 
to do any inconvenient operations with our containers :). The real problem can be hidden 
a bit deeper — in Native Memory.

## <a href="?memory-in-jvm-process">What takes memory inside a JVM Process?</a>
_2022-11-05_

The JVM process contains several parts where the memory can be consumed. It even contains
multiple custom allocators that take care of some allocated chunk of memory and these
allocators are dedicated to one specific reason in the JVM Process. Let's write them down
and briefly talk about them.