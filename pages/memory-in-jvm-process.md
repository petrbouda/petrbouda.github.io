# What takes memory inside a JVM Process

The JVM process contains several parts where the memory can be consumed. It even contains
multiple custom allocators that take care of some allocated chunk of memory and these
allocators are dedicated to one specific reason in the JVM Process. Let's write them down
and briefly talk about them.

JVM is a pretty complicated piece of software, and it's sometimes very hard to predict its
behavior because of a lot of ergonomics inside - in other words, some parts "lives its own life".
That means that the decisions about allocating memory is very often based not only on workload, 
but it's affected by available memory on the host, defaults or provided options.

This short article is mainly focused on discovering of the allocated memory, more than how
the JVM Options or Garbage Collector works. Let's start with some basics, and we will probably 
go deeper in some upcoming articles :).

In general, the memory in process handled by JVM is divided into:

- **Java Heap**
  - a space where you application allocates the objects
  - the objects can be allocated even by JNI (a library written in C/C++ and called from the app)
  - however, it also contains non-application allocations caused by JVM internal stuff 
  such as Stacks of [VirtualThreads](https://openjdk.org/jeps/425)

- **Native Memory (Off-Heap)**
  - in general, everything what is outside the Heap is called as a native allocation
  - the native application can be triggered by `malloc`, and then the memory is placed a managed 
  by the C-Heap, very likely using some arenas where a chunk of memory is allocated and when the 
  chunk is freed, then it can be reused for another allocation (the behavior can differ depending on
  the implementation of `malloc` allocator - default 
  [GNU Allocator](https://www.gnu.org/software/libc/manual/html_node/The-GNU-Allocator.html), 
  alternative - [jemalloc](http://jemalloc.net/))
  - or mapping a bigger chunk of memory using [mmap](https://man7.org/linux/man-pages/man2/mmap.2.html)
  - JVM in some cases maps a bigger part of Virtual memory and implements its own specialized allocator, 
  e.g. [Metaspace](https://blogs.sap.com/2021/07/16/jep-387-elastic-metaspace-a-new-classroom-for-the-java-virtual-machine/?s=03)
  
## What part eats up my memory!

Very often, developers watch out for the part which is dedicated to Heap memory. It's very likely 
the biggest part but also the other parts can take up some significant portion. Especially 
in Container Environment, we can end up in some situations where the consumed native memory differs
a lot depending on the activated GC algorithm, or a number of classes load by JVM (Metaspace) and 
optimized later by JIT Compiler (CodeCache). Let's go deeper into JVM Memory and Containers in 
a specialized article because the topic is huge (and very interesting)!

JVM offers a simple way to look into memory internals. The functionality is called 
[Native Memory Tracking](https://docs.oracle.com/en/java/javase/19/troubleshoot/troubleshooting-memory-leaks.html#GUID-79F26B47-9240-4F32-A817-1DD77A361F31).
There are two modes, if you are not a developer of OpenJDK, you will be OK with the `summary` mode.
We need to enable it before we start the app using a special option:

```
-XX:NativeMemoryTracking=summary
```

then we are free to call JCMD console to get the statistics

```shell
$ jcmd <pid> VM.native_memory
```

and we get something like this:

```text
$ jcmd <pid> VM.native_memory summary                                                                
Native Memory Tracking:

(Omitting categories weighting less than 1KB)

Total: reserved=6703878KB, committed=426422KB
       malloc: 22530KB #64479
       mmap:   reserved=6681348KB, committed=403892KB

-                 Java Heap (reserved=5062656KB, committed=327680KB)
                            (mmap: reserved=5062656KB, committed=327680KB) 
 
-                     Class (reserved=1048824KB, committed=1464KB)
                            (classes #2683)
                            (  instance classes #2412, array classes #271)
                            (malloc=248KB #4423) 
                            (mmap: reserved=1048576KB, committed=1216KB) 
                            (  Metadata:   )
                            (    reserved=65536KB, committed=8640KB)
                            (    used=8510KB)
                            (    waste=130KB =1,50%)
                            (  Class space:)
                            (    reserved=1048576KB, committed=1216KB)
                            (    used=1092KB)
                            (    waste=124KB =10,19%)
 
-                    Thread (reserved=19556KB, committed=968KB)
                            (thread #19)
                            (stack: reserved=19504KB, committed=916KB)
                            (malloc=31KB #118) 
                            (arena=20KB #36)
 
-                      Code (reserved=247963KB, committed=7823KB)
                            (malloc=275KB #2077) 
                            (mmap: reserved=247688KB, committed=7548KB) 
 
-                        GC (reserved=238187KB, committed=62475KB)
                            (malloc=17227KB #1190) 
                            (mmap: reserved=220960KB, committed=45248KB) 
 
-                 GCCardSet (reserved=18KB, committed=18KB)
                            (malloc=18KB #243) 
 
-                  Compiler (reserved=188KB, committed=188KB)
                            (malloc=23KB #120) 
                            (arena=165KB #5)
 
-                  Internal (reserved=219KB, committed=219KB)
                            (malloc=183KB #2563) 
                            (mmap: reserved=36KB, committed=36KB) 
 
-                     Other (reserved=10KB, committed=10KB)
                            (malloc=10KB #2) 
 
-                    Symbol (reserved=2861KB, committed=2861KB)
                            (malloc=2501KB #51738) 
                            (arena=360KB #1)
 
-    Native Memory Tracking (reserved=1013KB, committed=1013KB)
                            (malloc=5KB #77) 
                            (tracking overhead=1008KB)
 
-        Shared class space (reserved=16384KB, committed=12600KB)
                            (mmap: reserved=16384KB, committed=12600KB) 
 
-               Arena Chunk (reserved=195KB, committed=195KB)
                            (malloc=195KB) 
 
-                    Module (reserved=157KB, committed=157KB)
                            (malloc=157KB #1221) 
 
-                 Safepoint (reserved=8KB, committed=8KB)
                            (mmap: reserved=8KB, committed=8KB) 
 
-           Synchronization (reserved=48KB, committed=48KB)
                            (malloc=48KB #601) 
 
-            Serviceability (reserved=17KB, committed=17KB)
                            (malloc=17KB #9) 
 
-                 Metaspace (reserved=65575KB, committed=8679KB)
                            (malloc=39KB #15) 
                            (mmap: reserved=65536KB, committed=8640KB) 
 
-      String Deduplication (reserved=1KB, committed=1KB)
                            (malloc=1KB #8)
```

Aleksey Shipilëv did a great job to describe the particular parts in his 
[article](https://shipilev.net/jvm/anatomy-quarks/12-native-memory-tracking/).

## More popular digging into JVM memory allocations

Sometimes you don't want to manipulate with JVM options (or you don't have any way to set up the option),
but still you would like to se if it's everything kinda OK. In this chapter, we'll focus on getting the 
information directly from Java, and using Springboot framework and implementing some graphs.

The most used way to get some information is using `Platform MXBeans` (this is also the way used by the 
majority of frameworks, those I have checked at least) 

```java
public class Memory {

    public static void main(String[] args) {
        ManagementFactory.getMemoryPoolMXBeans()
                .forEach(memoryPool -> printMemoryUsage(memoryPool.getUsage(), memoryPool.getName()));
    }

    private static void printMemoryUsage(MemoryUsage memory, String memoryName) {
        String line = "INIT: %s, USED: %s, COMMITTED: %s, MAX: %s".formatted(
                toMB(memory.getInit()),
                toMB(memory.getUsed()),
                toMB(memory.getCommitted()),
                toMB(memory.getMax()));

        out.println(memoryName);
        out.println(line);
        out.println();
    }

    private static String toMB(long bytes) {
        return (bytes >> 20) + " MB";
    }
}
```

The output shows at least the most significant memory pools used by our application:

- `CodeHeap 'non-nmethods'`, `CodeHeap 'non-profiled nmethods'`, `CodeHeap 'profiled nmethods'` pools that belong
to [Segmented Code Cache](https://openjdk.org/jeps/197)
(area used by JIT Compiler - generated native methods, interpreter, stubs, or the space used to keep the collected profile
later used by JIT to decide whether to compile method or not). If the JVM runs out of memory in `CodeCache`, then
we can end up with stopping JIT Compiler to produce more compiled methods and keep them being interpreted.
- [Metaspace](https://blogs.sap.com/2021/07/16/jep-387-elastic-metaspace-a-new-classroom-for-the-java-virtual-machine) 
as a place to keep classes, itable, vtable, constant pool, methods metadata, annotations, bytecode in general
- [Compressed Class Space](https://stuefe.de/posts/metaspace/what-is-compressed-class-space/) 
using 32bit references even on a 64bit platform
- Pools dedicated to `G1 Garbage Collector`

```text
CodeHeap 'non-nmethods'
INIT: 2 MB, USED: 1 MB, COMMITTED: 2 MB, MAX: 5 MB

CodeHeap 'non-profiled nmethods'
INIT: 2 MB, USED: 0 MB, COMMITTED: 2 MB, MAX: 117 MB

CodeHeap 'profiled nmethods'
INIT: 2 MB, USED: 0 MB, COMMITTED: 2 MB, MAX: 117 MB

Metaspace
INIT: 0 MB, USED: 1 MB, COMMITTED: 1 MB, MAX: -1 MB

Compressed Class Space
INIT: 0 MB, USED: 0 MB, COMMITTED: 0 MB, MAX: 1024 MB

G1 Eden Space
INIT: 24 MB, USED: 4 MB, COMMITTED: 24 MB, MAX: -1 MB

G1 Old Gen
INIT: 288 MB, USED: 3 MB, COMMITTED: 296 MB, MAX: 4944 MB

G1 Survivor Space
INIT: 0 MB, USED: 0 MB, COMMITTED: 0 MB, MAX: -1 MB
```

