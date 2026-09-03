import{D as n}from"./DocsCallout-V2HG29fL.js";import{D as r}from"./DocsCodeBlock-D32S3jxA.js";import{D as c}from"./DocsNavFooter-C3d_nAy5.js";import{D as p}from"./DocsPageHeader-C7-rF4wf.js";import{u as v}from"./useDocHeadings-DKC-AESA.js";import{d as h,k as u,c as g,e as d,a,j as t,w as o,b as i,i as m,o as y}from"./index-Cwq9Qej-.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},k={class:"docs-content"},S=`# Plain JFR at startup
java -XX:StartFlightRecording=filename=app.jfr,settings=profile -jar app.jar

# On demand
jcmd <pid> JFR.start name=jeffrey settings=profile
jcmd <pid> JFR.dump  name=jeffrey filename=app.jfr

# async-profiler: CPU samples + all JFR (and Jeffrey) events in one file —
# the form that unlocks per-span flamegraphs
asprof -d 60 -e cpu --jfrsync default -f app.jfr <pid>`,T=`# Drop hand-written spans shorter than 1 ms
-XX:StartFlightRecording=...,cafe.jeffrey.jfr.events.trace.TraceSpanEvent#threshold=1ms

# Cap the emission rate instead of truncating by duration
-XX:StartFlightRecording=...,cafe.jeffrey.jfr.events.trace.TraceSpanEvent#throttle=500/s

# Keep re-entry nesting but stop recording where re-entered spans ran
-XX:StartFlightRecording=...,cafe.jeffrey.jfr.events.trace.TraceScopeEvent#enabled=false`,w=`# Recording by hand? The JDK events a trace is drawn from need three
# overrides each: a threshold, the rate limit lifted on the I/O ones, and
# enabled= beside them so a threshold is not ignored for a disabled event.
-XX:StartFlightRecording=filename=app.jfr,settings=profile,jdk.SocketRead#enabled=true,jdk.SocketRead#threshold=0ms,jdk.SocketRead#throttle=1000000/s,jdk.SocketWrite#enabled=true,jdk.SocketWrite#threshold=0ms,jdk.SocketWrite#throttle=1000000/s,jdk.FileRead#enabled=true,jdk.FileRead#threshold=0ms,jdk.FileRead#throttle=1000000/s,jdk.FileWrite#enabled=true,jdk.FileWrite#threshold=0ms,jdk.FileWrite#throttle=1000000/s,jdk.JavaMonitorEnter#enabled=true,jdk.JavaMonitorEnter#threshold=1ms,jdk.ThreadPark#enabled=true,jdk.ThreadPark#threshold=1ms`,R=`import cafe.jeffrey.jfr.events.test.JfrRecordings;
import cafe.jeffrey.jfr.events.test.SpansAssert;

@Test
void checkoutTracesAssembleCorrectly() throws IOException {
    // JfrRecordings starts an in-process recording, runs the body, and
    // returns the recorded events — no files, no fixtures.
    List<RecordedEvent> events = JfrRecordings.all(
            List.of("jeffrey.TraceSpan", "jeffrey.JdbcQuery"),
            () -> service.checkout("a-1"));

    SpansAssert.assertThat(events)
            .hasNoUntracedSpans()                     // nothing committed with commit()
            .hasNoOrphanedSpans()                     // every parent id resolves
            .hasSpanCount(4)
            .hasSpan("order.checkout").isRoot()
                    .hasKind("SERVER")
                    .hasNoError()
            .and()
            .hasSpan("UserMapper.selectById")
                    .nestedUnder("order.checkout")
                    .hasEventType("jeffrey.JdbcQuery")
            .and()
            .hasSpanNameCardinalityAtMost(10);        // catches ids leaking into names
}

@Test
void failedChargeMarksTheSpan() throws IOException {
    List<RecordedEvent> events = JfrRecordings.all("jeffrey.TraceSpan", () -> {
        assertThrows(CardDeclinedException.class, () -> service.charge("a-1"));
    });

    SpansAssert.assertThat(events)
            .hasSpan("order.charge")
            .hasStatus("ERROR")
            .hasErrorType(CardDeclinedException.class);
}`,J=`<dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-events-test</artifactId>
    <version><!-- latest release --></version>
    <scope>test</scope>
</dependency>`,C=h({__name:"TracingConfigurationPage",setup(E){const{setHeadings:l}=v(),f=[{id:"recording",text:"Recording Setup",level:2},{id:"volume",text:"Volume Control",level:2},{id:"jdk-thresholds",text:"JDK Event Thresholds",level:2},{id:"jmc",text:"JMC and jfr print Interop",level:2},{id:"testing",text:"Testing Your Instrumentation",level:2}];return u(()=>{l(f)}),(x,e)=>{const s=m("router-link");return y(),g("article",j,[d(p,{title:"Configuration & Testing",icon:"bi bi-gear"}),a("div",k,[a("p",null,[e[1]||(e[1]=t(`The events are recorded by whatever JFR recording is running, and they are enabled by default in any recording — so "configuration" means three things: how you record, how you control volume, and how the JDK's own events get thresholds fine enough for traces. This page is the hand-rolled path; for Provisioner-managed deployments see `,-1)),d(s,{to:"/docs/tracing/provisioner-hub"},{default:o(()=>[...e[0]||(e[0]=[t("Provisioner & Hub",-1)])]),_:1}),e[2]||(e[2]=t(". Plus: asserting on spans in your own tests, so instrumentation regressions fail CI instead of blank dashboards.",-1))]),e[23]||(e[23]=a("h2",{id:"recording"},"Recording Setup",-1)),d(r,{code:S,language:"bash"}),e[24]||(e[24]=a("p",null,[t("No settings-file changes are needed for the "),a("code",null,"jeffrey.*"),t(" events, and no registration step: JFR auto-registers each event type the first time an instance of its class is created.")],-1)),e[25]||(e[25]=a("h2",{id:"volume"},"Volume Control",-1)),e[26]||(e[26]=a("p",null,[t("A busy application can emit a lot of spans, and every one lands in the JFR chunk. "),a("code",null,"jeffrey.TraceSpan"),t(" sets no threshold by default — every span is recorded, however short — because acceptable volume is a property of the application, not of the event. Both levers are per recording:")],-1)),d(r,{code:T,language:"bash"}),e[27]||(e[27]=i("<table data-v-e7def46a><thead data-v-e7def46a><tr data-v-e7def46a><th data-v-e7def46a>Setting</th><th data-v-e7def46a>Effect</th></tr></thead><tbody data-v-e7def46a><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>threshold</code></td><td data-v-e7def46a>Drops spans shorter than the given duration — <code data-v-e7def46a>threshold=1ms</code> is a reasonable starting point. It costs more than it appears to: dropping a parent leaves its children as orphans (promoted to roots), and dropping a child moves its samples into the parent&#39;s <strong data-v-e7def46a>self</strong> time, since a window that was never recorded cannot be subtracted.</td></tr><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>throttle</code></td><td data-v-e7def46a>Caps the emission rate (<code data-v-e7def46a>N/s</code>), sampling rather than truncating. Use it when spans are individually meaningful but too numerous.</td></tr></tbody></table>",1)),d(n,{type:"warning"},{default:o(()=>[...e[3]||(e[3]=[a("strong",null,"Never bake thresholds into instrumentation",-1),t(" — a span dropped in code orphans its children in every recording, forever. Thresholds are a per-recording decision, made where the recording is started. ",-1)])]),_:1}),e[28]||(e[28]=a("h2",{id:"jdk-thresholds"},"JDK Event Thresholds",-1)),a("p",null,[e[5]||(e[5]=t("The ",-1)),d(s,{to:"/docs/tracing/jdk-events"},{default:o(()=>[...e[4]||(e[4]=[t("promoted blocking spans",-1)])]),_:1}),e[6]||(e[6]=t(" can only be as fine as the recording, and the stock configuration is far coarser than a trace needs — I/O wants ",-1)),e[7]||(e[7]=a("code",null,"0ms",-1)),e[8]||(e[8]=t(" with its rate limit lifted, blocking events ",-1)),e[9]||(e[9]=a("code",null,"1ms",-1)),e[10]||(e[10]=t(":",-1))]),d(r,{code:w,language:"bash"}),d(n,{type:"tip"},{default:o(()=>[e[13]||(e[13]=a("strong",null,"Provisioner-managed sessions get all of this from one switch.",-1)),e[14]||(e[14]=t(" If your applications are started by the ",-1)),d(s,{to:"/docs/provisioner"},{default:o(()=>[...e[11]||(e[11]=[t("Jeffrey Provisioner",-1)])]),_:1}),e[15]||(e[15]=t(", it generates these settings for you — see ",-1)),d(s,{to:"/docs/tracing/provisioner-hub"},{default:o(()=>[...e[12]||(e[12]=[t("Provisioner & Hub",-1)])]),_:1}),e[16]||(e[16]=t(", which also covers how the recording reaches Microscope. ",-1))]),_:1}),e[29]||(e[29]=a("h2",{id:"jmc"},"JMC and jfr print Interop",-1)),e[30]||(e[30]=a("p",null,[t("The trace fields are declared "),a("code",null,"@Contextual"),t(" (Java 25), which does nothing for Jeffrey's own analysis — but it makes "),a("code",null,"jfr print"),t(" and JDK Mission Control display the trace and span ids "),a("em",null,"beside every event that occurred inside the span"),t(": lock events, I/O, exceptions. A recording instrumented for Jeffrey is therefore more readable in plain JDK tooling too:")],-1)),d(r,{code:'jfr print --events "jeffrey.*" app.jfr | less',language:"bash"}),e[31]||(e[31]=a("h2",{id:"testing"},"Testing Your Instrumentation",-1)),a("p",null,[e[18]||(e[18]=a("code",null,"jeffrey-events-test",-1)),e[19]||(e[19]=t(" is the executable form of the ",-1)),d(s,{to:"/docs/tracing/getting-started"},{default:o(()=>[...e[17]||(e[17]=[t("verification checklist",-1)])]),_:1}),e[20]||(e[20]=t(" — assertions over the spans in a recording, dependency-free (plain ",-1)),e[21]||(e[21]=a("code",null,"AssertionError",-1)),e[22]||(e[22]=t(", works under JUnit, TestNG or neither):",-1))]),d(r,{code:J,language:"xml"}),d(r,{code:R,language:"java"}),e[32]||(e[32]=i("<p data-v-e7def46a>The toolkit:</p><table data-v-e7def46a><thead data-v-e7def46a><tr data-v-e7def46a><th data-v-e7def46a>Class</th><th data-v-e7def46a>What it does</th></tr></thead><tbody data-v-e7def46a><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>JfrRecordings</code></td><td data-v-e7def46a><code data-v-e7def46a>all(eventType(s), body)</code> / <code data-v-e7def46a>single(eventType, body)</code> — records an in-process JFR recording around the body and returns the events</td></tr><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>RecordedSpan</code></td><td data-v-e7def46a>The span view over a <code data-v-e7def46a>RecordedEvent</code>: <code data-v-e7def46a>isSpan</code> (structural — any event with a <code data-v-e7def46a>spanId</code> field), <code data-v-e7def46a>from(events)</code>, <code data-v-e7def46a>isRoot()</code>, <code data-v-e7def46a>isTraced()</code></td></tr><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>SpansAssert</code></td><td data-v-e7def46a><code data-v-e7def46a>assertThat(events)</code> — <code data-v-e7def46a>hasSpan</code>, <code data-v-e7def46a>hasNoSpan</code>, <code data-v-e7def46a>hasSpanCount</code>, <code data-v-e7def46a>hasNoUntracedSpans</code>, <code data-v-e7def46a>hasNoOrphanedSpans</code>, <code data-v-e7def46a>hasSpanNameCardinalityAtMost</code></td></tr><tr data-v-e7def46a><td data-v-e7def46a><code data-v-e7def46a>SpanAssert</code></td><td data-v-e7def46a>Per-span: <code data-v-e7def46a>isRoot</code>, <code data-v-e7def46a>nestedUnder</code>, <code data-v-e7def46a>inSameTraceAs</code>, <code data-v-e7def46a>isTraced</code>, <code data-v-e7def46a>hasKind</code>, <code data-v-e7def46a>hasStatus</code>, <code data-v-e7def46a>hasErrorType</code>, <code data-v-e7def46a>hasNoError</code>, <code data-v-e7def46a>hasEventType</code>, chained with <code data-v-e7def46a>and()</code></td></tr></tbody></table><p data-v-e7def46a>Every failure names what was actually recorded — the useful question when instrumentation is wrong is never &quot;did it fail&quot; but &quot;what did it emit instead&quot;. The three assertions worth having in every service&#39;s test suite: <code data-v-e7def46a>hasNoUntracedSpans()</code> (catches <code data-v-e7def46a>commit()</code>-instead-of-<code data-v-e7def46a>commitSpan()</code>), <code data-v-e7def46a>hasNoOrphanedSpans()</code> (catches executor boundaries crossed without <code data-v-e7def46a>fork</code>), and <code data-v-e7def46a>hasSpanNameCardinalityAtMost(n)</code> (catches ids leaking into span names).</p>",3))]),d(c)])}}}),O=b(C,[["__scopeId","data-v-e7def46a"]]);export{O as default};
