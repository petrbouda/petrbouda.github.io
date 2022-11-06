# What takes memory inside a JVM Process

The JVM process contains several parts where the memory can be consumed. It even contains
multiple custom allocators that take care of some allocated chunk of memory and these
allocators are dedicated to one specific reason in the JVM Process. Let's write them down
and briefly talk about them.

