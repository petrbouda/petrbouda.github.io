## <a href="?native-memory-tracking">Native Memory Tracking in detail</a>

From time to time, we run into a memory problem that is not related to Java Heap but Native Memory. 
Let's imagine the situation where we have a running container that is restarted once per day. 
We look at Prometheus/Grafana to check the reason behind this issue. However, we don't spot 
any problem with Java Heap size (exported via JMX) and start blaming our container scheduler 
to do any inconvenient operations with our containers :). The real problem can be hidden 
a bit deeper — in Native Memory.

## <a href="?memory-in-jvm-process">What takes memory inside a JVM Process?</a>

The JVM process contains several parts where the memory can be consumed. It even contains
multiple custom allocators that take care of some allocated chunk of memory and these
allocators are dedicated to one specific reason in the JVM Process. Let's write them down
and briefly talk about them.