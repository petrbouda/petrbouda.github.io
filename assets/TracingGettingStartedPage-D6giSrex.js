import{_ as u}from"./operations-C0BGx7Mo.js";import{D as d}from"./DocsCallout-COOM4RYV.js";import{D as s}from"./DocsCodeBlock-CLOZOmbh.js";import{D as f}from"./DocsNavFooter-jxcHoEqd.js";import{D as c}from"./DocsPageHeader-GEAWC1FX.js";import{u as g}from"./useDocHeadings-BVS0RVga.js";import{d as m,k as v,a as y,g as r,b as n,e as i,j as t,w as a,h as b,o as h}from"./index-4t-J1J04.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T={class:"docs-article"},S={class:"docs-content"},x=`<dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-events</artifactId>
    <version><!-- latest release on Maven Central --></version>
</dependency>`,j=`<dependency>
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
        });`,E=`# Plain JFR at startup
java -XX:StartFlightRecording=filename=app.jfr,settings=profile -jar app.jar

# On demand, against a running JVM
jcmd <pid> JFR.start name=jeffrey settings=profile
jcmd <pid> JFR.dump  name=jeffrey filename=app.jfr

# async-profiler: CPU samples + all JFR (and Jeffrey) events in one file
asprof -d 60 -e cpu --jfrsync default -f app.jfr <pid>`,C='jfr print --events "jeffrey.*" app.jfr | less',k=`jeffrey.HttpServerExchange {
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
}`,J=m({__name:"TracingGettingStartedPage",setup(R){const{setHeadings:l}=g(),p=[{id:"dependency",text:"1. Add the Dependency",level:2},{id:"spring-boot",text:"Spring Boot: One Dependency, No Code",level:2},{id:"sixty-seconds",text:"2. Sixty Seconds of Tracing",level:2},{id:"record",text:"3. Record",level:2},{id:"verify",text:"4. Verify with jfr print",level:2},{id:"upload",text:"5. Open It in Jeffrey",level:2},{id:"next",text:"Next Steps",level:2}];return v(()=>{l(p)}),(D,e)=>{const o=b("router-link");return h(),y("article",T,[r(c,{title:"Getting Started",icon:"bi bi-rocket-takeoff"}),n("div",S,[e[29]||(e[29]=n("p",null,"From zero to a first trace rendered in Jeffrey. The path is: add one dependency, emit a few spans (or let the framework glue emit them for you), run any JFR recording, and open the file in Jeffrey Microscope.",-1)),e[30]||(e[30]=n("h2",{id:"dependency"},"1. Add the Dependency",-1)),r(s,{code:x,language:"xml",filename:"pom.xml"}),e[31]||(e[31]=i('<ul data-v-b1537dc3><li data-v-b1537dc3><strong data-v-b1537dc3>Java 25 or newer</strong> is required for the <code data-v-b1537dc3>Tracer</code> API — it is built on <code data-v-b1537dc3>ScopedValue</code> (JEP 506) and <code data-v-b1537dc3>jdk.jfr.Contextual</code>, both finalized in Java 25.</li><li data-v-b1537dc3>The library has <strong data-v-b1537dc3>zero dependencies</strong> (only <code data-v-b1537dc3>jdk.jfr</code>) and is safe to leave in production code: with no recording running, every emit path checks <code data-v-b1537dc3>event.isEnabled()</code> and runs the body directly.</li><li data-v-b1537dc3>No registration step: JFR auto-registers each event type the first time an instance is created.</li></ul><h2 id="spring-boot" data-v-b1537dc3>Spring Boot: One Dependency, No Code</h2><p data-v-b1537dc3>On Spring Boot you can skip hand-written instrumentation entirely:</p>',3)),r(s,{code:j,language:"xml",filename:"pom.xml"}),n("p",null,[e[1]||(e[1]=t("Every inbound request becomes the root span of a trace, named by the matched handler pattern. Every ",-1)),e[2]||(e[2]=n("code",null,"DataSource",-1)),e[3]||(e[3]=t(" bean is wrapped, so the statements your ORM issues nest underneath the request without anyone writing JDBC instrumentation, and a HikariCP pool gets its acquire/borrow/create timings plus a periodic gauge. Tune it with ",-1)),e[4]||(e[4]=n("code",null,"jeffrey.tracing.*",-1)),e[5]||(e[5]=t(" — the property table is on the ",-1)),r(o,{to:"/docs/tracing/spring-support"},{default:a(()=>[...e[0]||(e[0]=[t("Spring Support",-1)])]),_:1}),e[6]||(e[6]=t(" page.",-1))]),n("p",null,[e[10]||(e[10]=t("gRPC and MyBatis are one line each — see ",-1)),r(o,{to:"/docs/tracing/grpc-events"},{default:a(()=>[...e[7]||(e[7]=[t("gRPC Events",-1)])]),_:1}),e[11]||(e[11]=t(" and ",-1)),r(o,{to:"/docs/tracing/jdbc-events"},{default:a(()=>[...e[8]||(e[8]=[t("JDBC Events",-1)])]),_:1}),e[12]||(e[12]=t(". And if you would rather annotate methods than write lambdas, the ",-1)),r(o,{to:"/docs/tracing/traced-annotation"},{default:a(()=>[...e[9]||(e[9]=[t("Jeffrey Agent weaves ",-1),n("code",null,"@Traced",-1),t(" methods",-1)])]),_:1}),e[13]||(e[13]=t(" into spans.",-1))]),e[32]||(e[32]=n("h2",{id:"sixty-seconds"},"2. Sixty Seconds of Tracing",-1)),e[33]||(e[33]=n("p",null,[t("The whole model in one listing: an inbound request becomes the root of a trace, hand-written spans describe the application logic inside it, and every statement or outbound call nests underneath — all through a "),n("code",null,"ScopedValue"),t(", so nothing is threaded through your signatures:")],-1)),r(s,{code:I,language:"java"}),e[34]||(e[34]=n("h2",{id:"record"},"3. Record",-1)),e[35]||(e[35]=n("p",null,"The events are recorded by whatever JFR recording is running — they are enabled by default in any recording, with no settings-file changes:",-1)),r(s,{code:E,language:"bash"}),r(d,{type:"tip"},{default:a(()=>[...e[14]||(e[14]=[t(" The async-profiler form with ",-1),n("code",null,"--jfrsync",-1),t(" is the one that unlocks the full experience: CPU samples and Jeffrey spans land in ",-1),n("strong",null,"one file on one clock",-1),t(", which is what makes per-span flamegraphs possible. ",-1)])]),_:1}),e[36]||(e[36]=n("h2",{id:"verify"},"4. Verify with jfr print",-1)),r(s,{code:C,language:"bash"}),e[37]||(e[37]=i("<p data-v-b1537dc3>For one request you exercised, check:</p><ol data-v-b1537dc3><li data-v-b1537dc3>The root event (e.g. <code data-v-b1537dc3>jeffrey.HttpServerExchange</code>) exists with non-zero <code data-v-b1537dc3>traceId</code>/<code data-v-b1537dc3>spanId</code> and <code data-v-b1537dc3>parentSpanId = 0</code>.</li><li data-v-b1537dc3>Every leaf event issued while serving it carries the <strong data-v-b1537dc3>same <code data-v-b1537dc3>traceId</code></strong> and a <code data-v-b1537dc3>parentSpanId</code> chaining up to the root.</li><li data-v-b1537dc3><code data-v-b1537dc3>jeffrey.TraceSpan</code> events show your operation names; <code data-v-b1537dc3>status = UNSET</code> on success, <code data-v-b1537dc3>ERROR</code> + <code data-v-b1537dc3>errorType</code> where you exercised a failure.</li><li data-v-b1537dc3>No high-cardinality names — no raw URIs, no ids, no literal-bearing SQL as a name.</li></ol>",2)),r(s,{code:k,language:"text"}),r(d,{type:"warning"},{default:a(()=>[...e[15]||(e[15]=[t(" An event with all-zero ids means a ",-1),n("code",null,"commit()",-1),t(" slipped in where ",-1),n("code",null,"commitSpan()",-1),t(" belonged, or work crossed an executor without ",-1),n("code",null,"fork",-1),t("/",-1),n("code",null,"continueIn",-1),t(". The event still appears in the dashboards — it is just not part of any trace. This is the single most common instrumentation mistake. ",-1)])]),_:1}),e[38]||(e[38]=n("h2",{id:"upload"},"5. Open It in Jeffrey",-1)),n("p",null,[e[17]||(e[17]=t("Upload ",-1)),e[18]||(e[18]=n("code",null,"app.jfr",-1)),e[19]||(e[19]=t(" to Jeffrey Microscope (create a project → upload recording → initialize profile). Jeffrey auto-detects the event types and activates the matching sections: the HTTP and Database dashboards, and — as soon as any event with trace identity is found — the ",-1)),e[20]||(e[20]=n("strong",null,"Traces",-1)),e[21]||(e[21]=t(" section, with ",-1)),r(o,{to:"/docs/tracing/analysis"},{default:a(()=>[...e[16]||(e[16]=[t("Traces by Operation, attribute search and the trace waterfall",-1)])]),_:1}),e[22]||(e[22]=t(".",-1))]),e[39]||(e[39]=n("figure",{class:"docs-figure"},[n("img",{src:u,alt:"Traces by Operation after the first upload"}),n("figcaption",null,"The Traces section after a first upload — every operation named from its root span, ranked with spans, total and P50/P95/P99/Max.")],-1)),e[40]||(e[40]=n("h2",{id:"next"},"Next Steps",-1)),n("ul",null,[n("li",null,[r(o,{to:"/docs/tracing/concepts"},{default:a(()=>[...e[23]||(e[23]=[t("Core Concepts",-1)])]),_:1}),e[24]||(e[24]=t(" — the data model and the five rules that make traces assemble correctly.",-1))]),n("li",null,[r(o,{to:"/docs/tracing/instrumentation"},{default:a(()=>[...e[25]||(e[25]=[t("Tracer API Reference",-1)])]),_:1}),e[26]||(e[26]=t(" — every method on its own page, with use-cases, examples and its output.",-1))]),n("li",null,[r(o,{to:"/docs/tracing/configuration"},{default:a(()=>[...e[27]||(e[27]=[t("Configuration & Testing",-1)])]),_:1}),e[28]||(e[28]=t(" — volume control, recording thresholds, and asserting on spans in your own tests.",-1))])])]),r(f)])}}}),U=w(J,[["__scopeId","data-v-b1537dc3"]]);export{U as default};
