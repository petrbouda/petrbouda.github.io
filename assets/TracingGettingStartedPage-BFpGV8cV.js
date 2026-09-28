import{_ as u}from"./operations-C0BGx7Mo.js";import{D as d}from"./DocsCallout-CxMl0flk.js";import{D as s}from"./DocsCodeBlock-BP5k14G1.js";import{D as f}from"./DocsNavFooter-BpRWCVJt.js";import{D as c}from"./DocsPageHeader-BmhmgFM9.js";import{u as g}from"./useDocHeadings-ZAbLw5SE.js";import{d as v,k as y,c as m,e as n,a,b as i,j as t,w as r,i as h,o as b}from"./index-CEwwdbAp.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T={class:"docs-article"},S={class:"docs-content"},j=`<dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-events</artifactId>
    <version><!-- latest release on Maven Central --></version>
</dependency>
<!-- where the Tracer keeps the span in progress: Java 25+ -->
<!-- (on Java 21-24: jeffrey-tracing-thread-local) -->
<dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-tracing-scoped-value</artifactId>
    <version><!-- same version --></version>
</dependency>`,x=`<dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-tracing-spring-boot-starter</artifactId>
    <version><!-- latest release on Maven Central --></version>
</dependency>`,I=`// 1. The request event IS the root span (in a servlet filter, first in the chain).
//    The spring-boot-starter registers exactly this filter for you.
HttpServerExchangeEvent event = new HttpServerExchangeEvent();
event.begin();
try {
    Tracer.inSpanOf(event, () -> {
        chain.doFilter(request, response);
        return null;
    });
} finally {
    event.end();
    if (event.shouldCommit()) {
        event.method = request.getMethod();
        event.uri = matchedTemplate(request);      // "/api/users/{id}", never the raw path
        event.statusCode = response.getStatus();
        event.commitSpan();
    }
}

// 2. Application logic becomes named spans (jeffrey.TraceSpan events)
Tracer.run("order.checkout", SpanKind.SERVER, () -> {
    Tracer.run("inventory.reserve", SpanKind.CLIENT, this::reserve);
    Tracer.run("payment.charge", SpanKind.CLIENT, this::charge);
});

// 3. A statement (or outbound call) is a leaf — TracedEvents.emit is the whole
//    lifecycle: guard, begin, end on success, failed(e) on a throw (the span
//    shows red), commitSpan() stamping it under the span in progress
JdbcQueryEvent query = new JdbcQueryEvent("UserMapper.selectById", "UserMapper");
List<User> users = TracedEvents.emit(query,
        () -> doQuery(),
        (e, result) -> {
            e.sql = sql;
            e.rows = result != null ? result.size() : 0;
        });`,J=`# Plain JFR at startup
java -XX:StartFlightRecording=filename=app.jfr,settings=profile -jar app.jar

# On demand, against a running JVM
jcmd <pid> JFR.start name=jeffrey settings=profile
jcmd <pid> JFR.dump  name=jeffrey filename=app.jfr

# async-profiler: CPU samples + all JFR (and Jeffrey) events in one file
asprof -d 60 -e cpu --jfrsync default -f app.jfr <pid>`,k='jfr print --events "jeffrey.*" app.jfr | less',E=`jeffrey.HttpServerExchange {
  startTime = 12:41:53.518
  duration = 128 ms
  traceId = 6872570733206835563
  spanId = 4444722480460712002
  parentSpanId = 0                      // 0 => this span is the trace root
  name = "GET /api/users/{id}"
  kind = "SERVER"
  status = "UNSET"
  method = "GET"
  uri = "/api/users/{id}"
  statusCode = 200
  ...
}

jeffrey.JdbcQuery {
  traceId = 6872570733206835563         // same trace as the request above
  spanId = 9032751172020347118
  parentSpanId = 4444722480460712002    // chained up to the root
  name = "UserMapper.selectById"
  kind = "CLIENT"
  sql = "select * from users where id = ?"
  rows = 1
  ...
}`,C=v({__name:"TracingGettingStartedPage",setup(R){const{setHeadings:l}=g(),p=[{id:"dependency",text:"1. Add the Dependency",level:2},{id:"spring-boot",text:"Spring Boot: One Dependency, No Code",level:2},{id:"sixty-seconds",text:"2. Sixty Seconds of Tracing",level:2},{id:"record",text:"3. Record",level:2},{id:"verify",text:"4. Verify with jfr print",level:2},{id:"upload",text:"5. Open It in Jeffrey",level:2},{id:"next",text:"Next Steps",level:2}];return y(()=>{l(p)}),(D,e)=>{const o=h("router-link");return b(),m("article",T,[n(c,{title:"Getting Started",icon:"bi bi-rocket-takeoff"}),a("div",S,[e[31]||(e[31]=a("p",null,"From zero to a first trace rendered in Jeffrey. The path is: add one dependency, emit a few spans (or let the framework glue emit them for you), run any JFR recording, and open the file in Jeffrey Microscope.",-1)),e[32]||(e[32]=a("h2",{id:"dependency"},"1. Add the Dependency",-1)),n(s,{code:j,language:"xml",filename:"pom.xml"}),e[33]||(e[33]=i('<ul data-v-4b0a220a><li data-v-4b0a220a><strong data-v-4b0a220a>Java 21 or newer.</strong> <code data-v-4b0a220a>jeffrey-events</code> brings the <code data-v-4b0a220a>Tracer</code> API; where it keeps the span in progress is a second artifact you add next to it — <code data-v-4b0a220a>jeffrey-tracing-scoped-value</code> (a <code data-v-4b0a220a>ScopedValue</code>, Java 25+) or <code data-v-4b0a220a>jeffrey-tracing-thread-local</code> (a <code data-v-4b0a220a>ThreadLocal</code>, Java 21+). Add exactly one — on Java 25 the <code data-v-4b0a220a>ScopedValue</code> one, otherwise the <code data-v-4b0a220a>ThreadLocal</code> one. With neither, the <code data-v-4b0a220a>Tracer</code> fails at startup with a message naming both. The Spring Boot starter brings the <code data-v-4b0a220a>ThreadLocal</code> one; on Java 25 add <code data-v-4b0a220a>jeffrey-tracing-scoped-value</code> next to it and the <code data-v-4b0a220a>ScopedValue</code> one takes over.</li><li data-v-4b0a220a>The library has <strong data-v-4b0a220a>no third-party dependencies</strong> (only <code data-v-4b0a220a>jdk.jfr</code> and Jeffrey&#39;s own <code data-v-4b0a220a>jeffrey-tracing-api</code>) and is safe to leave in production code: with no recording running, every emit path checks <code data-v-4b0a220a>event.isEnabled()</code> and runs the body directly.</li><li data-v-4b0a220a>No registration step: JFR auto-registers each event type the first time an instance is created.</li></ul><h2 id="spring-boot" data-v-4b0a220a>Spring Boot: One Dependency, No Code</h2><p data-v-4b0a220a>On Spring Boot you can skip hand-written instrumentation entirely:</p>',3)),n(s,{code:x,language:"xml",filename:"pom.xml"}),a("p",null,[e[1]||(e[1]=t("Every inbound request becomes the root span of a trace, named by the matched handler pattern. Every ",-1)),e[2]||(e[2]=a("code",null,"DataSource",-1)),e[3]||(e[3]=t(" bean is wrapped, so the statements your ORM issues nest underneath the request without anyone writing JDBC instrumentation, and a HikariCP pool gets its acquire/borrow/create timings plus a periodic gauge. Tune it with ",-1)),e[4]||(e[4]=a("code",null,"jeffrey.tracing.*",-1)),e[5]||(e[5]=t(" — the property table is on the ",-1)),n(o,{to:"/docs/tracing/spring-support"},{default:r(()=>[...e[0]||(e[0]=[t("Spring Support",-1)])]),_:1}),e[6]||(e[6]=t(" page.",-1))]),a("p",null,[e[10]||(e[10]=t("gRPC and MyBatis are one line each — see ",-1)),n(o,{to:"/docs/tracing/grpc-events"},{default:r(()=>[...e[7]||(e[7]=[t("gRPC Events",-1)])]),_:1}),e[11]||(e[11]=t(" and ",-1)),n(o,{to:"/docs/tracing/jdbc-events"},{default:r(()=>[...e[8]||(e[8]=[t("JDBC Events",-1)])]),_:1}),e[12]||(e[12]=t(". For methods you would rather not edit at all, ",-1)),n(o,{to:"/docs/tracing/method-tracing"},{default:r(()=>[...e[9]||(e[9]=[t("JFR Method Tracing",-1)])]),_:1}),e[13]||(e[13]=t(" records them from the recording configuration — no code and no agent.",-1))]),e[34]||(e[34]=a("h2",{id:"sixty-seconds"},"2. Sixty Seconds of Tracing",-1)),e[35]||(e[35]=a("p",null,"The whole model in one listing: an inbound request becomes the root of a trace, hand-written spans describe the application logic inside it, and every statement or outbound call nests underneath — the span in progress is bound on the thread, so nothing is threaded through your signatures:",-1)),n(s,{code:I,language:"java"}),e[36]||(e[36]=a("h2",{id:"record"},"3. Record",-1)),e[37]||(e[37]=a("p",null,"The events are recorded by whatever JFR recording is running — they are enabled by default in any recording, with no settings-file changes:",-1)),n(s,{code:J,language:"bash"}),n(d,{type:"tip"},{default:r(()=>[...e[14]||(e[14]=[t(" The async-profiler form with ",-1),a("code",null,"--jfrsync",-1),t(" is the one that unlocks the full experience: CPU samples and Jeffrey spans land in ",-1),a("strong",null,"one file on one clock",-1),t(", which is what makes per-span flamegraphs possible. ",-1)])]),_:1}),e[38]||(e[38]=a("h2",{id:"verify"},"4. Verify with jfr print",-1)),n(s,{code:k,language:"bash"}),e[39]||(e[39]=i("<p data-v-4b0a220a>For one request you exercised, check:</p><ol data-v-4b0a220a><li data-v-4b0a220a>The root event (e.g. <code data-v-4b0a220a>jeffrey.HttpServerExchange</code>) exists with non-zero <code data-v-4b0a220a>traceId</code>/<code data-v-4b0a220a>spanId</code> and <code data-v-4b0a220a>parentSpanId = 0</code>.</li><li data-v-4b0a220a>Every leaf event issued while serving it carries the <strong data-v-4b0a220a>same <code data-v-4b0a220a>traceId</code></strong> and a <code data-v-4b0a220a>parentSpanId</code> chaining up to the root.</li><li data-v-4b0a220a><code data-v-4b0a220a>jeffrey.TraceSpan</code> events show your operation names; <code data-v-4b0a220a>status = UNSET</code> on success, <code data-v-4b0a220a>ERROR</code> + <code data-v-4b0a220a>errorType</code> where you exercised a failure.</li><li data-v-4b0a220a>No high-cardinality names — no raw URIs, no ids, no literal-bearing SQL as a name.</li></ol>",2)),n(s,{code:E,language:"text"}),n(d,{type:"warning"},{default:r(()=>[...e[15]||(e[15]=[t(" An event with all-zero ids means a ",-1),a("code",null,"commit()",-1),t(" slipped in where ",-1),a("code",null,"commitSpan()",-1),t(" belonged, or work crossed an executor without ",-1),a("code",null,"fork",-1),t("/",-1),a("code",null,"continueIn",-1),t(". The event still appears in the dashboards — it is just not part of any trace. This is the single most common instrumentation mistake. ",-1)])]),_:1}),e[40]||(e[40]=a("h2",{id:"upload"},"5. Open It in Jeffrey",-1)),a("p",null,[e[17]||(e[17]=t("Upload ",-1)),e[18]||(e[18]=a("code",null,"app.jfr",-1)),e[19]||(e[19]=t(" to Jeffrey Microscope and click ",-1)),e[20]||(e[20]=a("strong",null,"Analyze",-1)),e[21]||(e[21]=t(" on the recording. Jeffrey auto-detects the event types and activates the matching sections: the HTTP and Database dashboards, and — as soon as any event with trace identity is found — the ",-1)),e[22]||(e[22]=a("strong",null,"Traces",-1)),e[23]||(e[23]=t(" section, with ",-1)),n(o,{to:"/docs/tracing/analysis"},{default:r(()=>[...e[16]||(e[16]=[t("Traces by Operation, attribute search and the trace waterfall",-1)])]),_:1}),e[24]||(e[24]=t(".",-1))]),e[41]||(e[41]=a("figure",{class:"docs-figure"},[a("img",{src:u,alt:"Traces by Operation after the first upload"}),a("figcaption",null,"The Traces section after a first upload — every operation named from its root span, ranked with spans, total and P50/P95/P99/Max.")],-1)),e[42]||(e[42]=a("h2",{id:"next"},"Next Steps",-1)),a("ul",null,[a("li",null,[n(o,{to:"/docs/tracing/concepts"},{default:r(()=>[...e[25]||(e[25]=[t("Core Concepts",-1)])]),_:1}),e[26]||(e[26]=t(" — the data model and the five rules that make traces assemble correctly.",-1))]),a("li",null,[n(o,{to:"/docs/tracing/instrumentation"},{default:r(()=>[...e[27]||(e[27]=[t("Tracer API Reference",-1)])]),_:1}),e[28]||(e[28]=t(" — every method on its own page, with use-cases, examples and its output.",-1))]),a("li",null,[n(o,{to:"/docs/tracing/configuration"},{default:r(()=>[...e[29]||(e[29]=[t("Configuration",-1)])]),_:1}),e[30]||(e[30]=t(" — volume control and recording thresholds.",-1))])])]),n(f)])}}}),U=w(C,[["__scopeId","data-v-4b0a220a"]]);export{U as default};
