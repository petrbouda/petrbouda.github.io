import{D as r}from"./DocsCallout-BgraKXKH.js";import{D as o}from"./DocsCodeBlock-Bs1la4pd.js";import{D as p}from"./DocsNavFooter-dHH0W5A3.js";import{D as u}from"./DocsPageHeader-aAaGW42p.js";import{u as m}from"./useDocHeadings-0Jgg7ynY.js";import{d as v,k as f,c as h,e as n,a as t,j as a,w as i,b as s,i as b,o as g}from"./index-CmAwF21x.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"docs-article"},S={class:"docs-content"},k=`import cafe.jeffrey.jfr.events.trace.AbstractTracedEvent;
import cafe.jeffrey.jfr.events.trace.Span;
import jdk.jfr.Category;
import jdk.jfr.DataAmount;
import jdk.jfr.Label;
import jdk.jfr.Name;
import jdk.jfr.StackTrace;

@Name("com.acme.KafkaPublish")
@Label("Kafka Publish")
@Category({"Application", "Messaging"})
@StackTrace(false)                             // spans rarely need a stack; keep them cheap
@Span("PUBLISH {topic}")                       // the operation-name template (see below)
public class KafkaPublishEvent extends AbstractTracedEvent {   // what makes it a span

    @Label("Topic")
    public String topic;

    @Label("Partition")
    public int partition;

    @Label("Payload Size")
    @DataAmount
    public long payloadSize;
}`,E=`// Work NESTS INSIDE the publish (serialization, the broker ack):
// the event IS the span — inSpanOf stamps the ids, marks ERROR on a
// throw, and commits through commitSpan()
KafkaPublishEvent event = new KafkaPublishEvent();
event.topic = "orders";
Tracer.inSpanOf(event, () -> {
    byte[] payload = Tracer.call("order.serialize", () -> serialize(order));
    event.payloadSize = payload.length;
    send(payload);
});`,T=`// Nothing nests inside — the publish is a self-contained action.
// TracedEvents.emit writes the whole leaf lifecycle in one call:
// guard, begin, end on success, failed(e) on a throw, commitSpan().
KafkaPublishEvent event = new KafkaPublishEvent();
RecordMetadata metadata = TracedEvents.emit(event,
        () -> producer.send(record).get(),
        (e, result) -> {
            e.topic = record.topic();
            e.partition = result != null ? result.partition() : -1;
            e.payloadSize = record.value().length;
        });`,A=`// What TracedEvents.emit expands to, where the helper does not fit:
KafkaPublishEvent event = new KafkaPublishEvent();
if (!event.isEnabled()) {              // no recording -> zero-cost passthrough
    return doPublish();
}
event.begin();
try {
    RecordMetadata result = doPublish();
    event.end();                       // interval ends when the work ends
    return result;
} catch (Exception e) {
    event.failed(e);                   // status=ERROR + errorType; rethrow after
    throw e;
} finally {
    if (event.shouldCommit()) {        // respects per-recording thresholds
        event.topic = topic;           // fill fields only when committing
        event.commitSpan();            // stamps under the span in progress, then commits
    }
}`,I=`jfr print --events com.acme.KafkaPublish app.jfr

com.acme.KafkaPublish {
  duration = 12.7 ms
  traceId = 6872570733206835563        // nested under the request that published
  spanId = 5561200973317418716
  parentSpanId = 4444722480460712002
  name = ""                            // empty — the @Span template names it in Jeffrey
  kind = "INTERNAL"
  status = "UNSET"
  topic = "orders"
  partition = 3
  payloadSize = 2.4 kB
}

// In Jeffrey's waterfall and Traces by Operation the span is named
// "PUBLISH orders" — the @Span template applied to the event's own fields.`,x=`@Name("com.acme.BatchJobStep")
@Label("Batch Job Step")
@Category({"Application", "Batch"})
@StackTrace(false)
@Span("{jobName} step {stepName}")
public class BatchJobStepEvent extends AbstractTracedEvent {

    @Label("Job Name")
    public String jobName;

    @Label("Step Name")
    public String stepName;

    @Label("Items Failed")
    public long itemsFailed;

    @Override
    protected void describeSpan() {
        name = jobName + " step " + stepName;
        // Escalate-only: never overwrite an ERROR recorded by failed()
        if (!SpanStatus.ERROR.name().equals(status) && itemsFailed > 0) {
            status = SpanStatus.ERROR.name();
        }
    }
}`,N=`import cafe.jeffrey.jfr.events.trace.AbstractTracedInstant;

@Name("com.acme.CircuitBreakerOpened")
@Label("Circuit Breaker Opened")
@Category({"Application", "Resilience"})
@StackTrace(false)
public class CircuitBreakerOpenedEvent extends AbstractTracedInstant {

    @Label("Breaker")
    public String breaker;
}

// Emitting: emit() stamps the enclosing span's ids (traceId +
// enclosingSpanId) and commits. Ids already set by the caller are left alone.
CircuitBreakerOpenedEvent event = new CircuitBreakerOpenedEvent();
event.breaker = "payments";
event.attributes = EventAttributes.create().put("failureRate", 0.42).json();
event.emit();`,j=`// EventAttributes: a zero-dependency JSON-object builder with full escaping.
// Build it only inside the shouldCommit() block — an event under threshold
// pays nothing.
event.attributes = EventAttributes.create()
        .put("cache", "miss")            // strings are escaped (quotes, control chars)
        .put("retries", 2)               // integrals -> JSON numbers
        .put("hitRatio", 0.87)           // non-finite doubles -> null
        .put("fallback", true)
        .json();

// AttributeValues: shared value-rendering rules (used by @Traced arg capture
// and MyBatis parameter capture) — numbers stay numbers, everything else is
// text truncated at the given limit, toString() failures record "<unavailable>".
AttributeValues.put(builder, "orderId", orderId, 256);`,R=v({__name:"TracingCustomEventsPage",setup(C){const{setHeadings:l}=m(),c=[{id:"why",text:"Why a Custom Event",level:2},{id:"recipe",text:"The Recipe",level:2},{id:"example",text:"A Complete Example",level:2},{id:"emitting",text:"Emitting: Interior Span or Leaf",level:2},{id:"describe-span",text:"Deriving Name and Status: describeSpan()",level:2},{id:"span-annotation",text:"The @Span Naming Template",level:2},{id:"commit-vs-commitspan",text:"commitSpan() vs commit()",level:2},{id:"instants",text:"Custom Instants: AbstractTracedInstant",level:2},{id:"attribute-utils",text:"EventAttributes and AttributeValues",level:2},{id:"discovery",text:"How Jeffrey Discovers It",level:2}];return f(()=>{l(c)}),(P,e)=>{const d=b("router-link");return g(),h("article",w,[n(u,{title:"Custom Traced Events",icon:"bi bi-puzzle"}),t("div",S,[e[38]||(e[38]=t("p",null,[a("Any domain event can be a full span in Jeffrey's traces — a Kafka publish, a batch-job step, a cache rebuild, a rules-engine evaluation. Extend "),t("code",null,"AbstractTracedEvent"),a(", commit through "),t("code",null,"commitSpan()"),a(", and Jeffrey discovers, nests and names it with "),t("strong",null,"zero configuration on its side"),a(".")],-1)),e[39]||(e[39]=t("h2",{id:"why"},"Why a Custom Event",-1)),t("p",null,[e[1]||(e[1]=a("A ",-1)),e[2]||(e[2]=t("code",null,'Tracer.run("kafka.publish", …)',-1)),e[3]||(e[3]=a(" span answers ",-1)),e[4]||(e[4]=t("em",null,"how long",-1)),e[5]||(e[5]=a(". A custom event answers ",-1)),e[6]||(e[6]=t("em",null,"how long, on which topic, which partition, how many bytes",-1)),e[7]||(e[7]=a(" — its own typed fields ride on the span, show up in the span detail, and become searchable in ",-1)),n(d,{to:"/docs/tracing/analysis"},{default:i(()=>[...e[0]||(e[0]=[a("Traces by Attributes",-1)])]),_:1}),e[8]||(e[8]=a(" as declared event fields. Use a custom type when the operation has structure worth recording; stay with ",-1)),e[9]||(e[9]=t("code",null,"Tracer.run",-1)),e[10]||(e[10]=a(" when a name is enough.",-1))]),e[40]||(e[40]=s('<h2 id="recipe" data-v-71cca094>The Recipe</h2><ol data-v-71cca094><li data-v-71cca094><strong data-v-71cca094>Extend <code data-v-71cca094>AbstractTracedEvent</code></strong> — that is what makes it a span: the <code data-v-71cca094>spanId</code> field Jeffrey discovers structurally.</li><li data-v-71cca094>Add <code data-v-71cca094>@Name(&quot;com.acme.…&quot;)</code>, <code data-v-71cca094>@Label</code>, <code data-v-71cca094>@Category({&quot;Application&quot;, &quot;…&quot;})</code>, and usually <code data-v-71cca094>@StackTrace(false)</code>.</li><li data-v-71cca094>Declare your own fields, with <code data-v-71cca094>@Label</code> (and units like <code data-v-71cca094>@DataAmount</code>/<code data-v-71cca094>@Timespan</code> where they apply).</li><li data-v-71cca094>Optionally annotate the class with <code data-v-71cca094>@Span(&quot;{template}&quot;)</code> so every reader derives the span name from metadata.</li><li data-v-71cca094>Optionally override <code data-v-71cca094>describeSpan()</code> to derive <code data-v-71cca094>name</code>/<code data-v-71cca094>status</code> from your fields.</li><li data-v-71cca094>Commit through <code data-v-71cca094>commitSpan()</code> — or wrap the whole lifecycle in <code data-v-71cca094>TracedEvents.emit</code>.</li></ol><h2 id="example" data-v-71cca094>A Complete Example</h2>',3)),n(o,{code:k,language:"java"}),e[41]||(e[41]=t("h2",{id:"emitting"},"Emitting: Interior Span or Leaf",-1)),e[42]||(e[42]=t("p",null,[a("Pick by whether traced work nests "),t("em",null,"inside"),a(" the event's interval:")],-1)),n(o,{code:E,language:"java"}),n(o,{code:T,language:"java"}),e[43]||(e[43]=t("p",null,"Where the helper does not fit, write what it expands to — this is the canonical leaf lifecycle:",-1)),n(o,{code:A,language:"java"}),e[44]||(e[44]=t("p",null,"And this is what lands in the recording, and how Jeffrey names it:",-1)),n(o,{code:I,language:"text"}),e[45]||(e[45]=t("h2",{id:"describe-span"},[a("Deriving Name and Status: "),t("code",null,"describeSpan()")],-1)),e[46]||(e[46]=t("p",null,[t("code",null,"commitSpan()"),a(" calls "),t("code",null,"describeSpan()"),a(" just before committing — the hook where an event derives its span shape from its own fields, exactly as the HTTP event names itself "),t("code",null,"GET /api/users/{id}"),a(" and fails from status 400 upwards:")],-1)),n(o,{code:x,language:"java"}),n(r,{type:"warning"},{default:i(()=>[...e[11]||(e[11]=[t("strong",null,"Derivation only ever escalates.",-1),a(" A ",-1),t("code",null,"describeSpan()",-1),a(" override may promote ",-1),t("code",null,"UNSET",-1),a(" to ",-1),t("code",null,"ERROR",-1),a(", never the reverse — a failure recorded with ",-1),t("code",null,"failed(throwable)",-1),a(" knows something the derived verdict does not (the gRPC event's guard shows the pattern: check ",-1),t("code",null,"status",-1),a(" is not already ",-1),t("code",null,"ERROR",-1),a(" before deriving). ",-1)])]),_:1}),e[47]||(e[47]=t("h2",{id:"span-annotation"},"The @Span Naming Template",-1)),e[48]||(e[48]=t("p",null,[t("code",null,'@Span("PUBLISH {topic}")'),a(" is a metadata annotation ("),t("code",null,"@MetadataDefinition"),a("): the template is persisted "),t("em",null,"into every recording"),a(" that contains the event type, so any reader — Jeffrey included — derives the span name from the event's own fields without knowing the type. Rules:")],-1)),t("ul",null,[e[19]||(e[19]=s("<li data-v-71cca094>Tokens are <code data-v-71cca094>{fieldName}</code> over literal text; field names match <code data-v-71cca094>[A-Za-z0-9_]+</code> and name the event&#39;s own fields.</li><li data-v-71cca094>The annotation is <code data-v-71cca094>@Inherited</code> — declare it on an abstract base and every subtype carries it, the way <code data-v-71cca094>@Category</code> already behaves.</li><li data-v-71cca094>Template naming keeps working even for events committed with plain <code data-v-71cca094>commit()</code> — unlike the status verdict, which must be recorded.</li>",3)),t("li",null,[e[13]||(e[13]=a("Template fields must themselves be low-cardinality (",-1)),e[14]||(e[14]=t("code",null,"{topic}",-1)),e[15]||(e[15]=a(", not ",-1)),e[16]||(e[16]=t("code",null,"{messageKey}",-1)),e[17]||(e[17]=a(") — the rendered name is the operation's identity in ",-1)),n(d,{to:"/docs/tracing/analysis"},{default:i(()=>[...e[12]||(e[12]=[a("Traces by Operation",-1)])]),_:1}),e[18]||(e[18]=a(".",-1))])]),e[49]||(e[49]=s('<p data-v-71cca094>Where the naming comes from is layered, in this order: the <code data-v-71cca094>@Span</code> template carried in the recording&#39;s metadata; then Jeffrey&#39;s built-in conventions for its own event types (on recordings that predate the annotation); then the <code data-v-71cca094>name</code> the event recorded for itself; and only then the event type as a last resort.</p><h2 id="commit-vs-commitspan" data-v-71cca094>commitSpan() vs commit()</h2><table data-v-71cca094><thead data-v-71cca094><tr data-v-71cca094><th data-v-71cca094></th><th data-v-71cca094><code data-v-71cca094>commitSpan()</code></th><th data-v-71cca094><code data-v-71cca094>commit()</code></th></tr></thead><tbody data-v-71cca094><tr data-v-71cca094><td data-v-71cca094>Stamps trace identity under the span in progress</td><td data-v-71cca094>Yes (when not already stamped)</td><td data-v-71cca094>No — ids stay at 0</td></tr><tr data-v-71cca094><td data-v-71cca094>Runs <code data-v-71cca094>describeSpan()</code></td><td data-v-71cca094>Yes</td><td data-v-71cca094>No</td></tr><tr data-v-71cca094><td data-v-71cca094>Appears in dashboards / event views</td><td data-v-71cca094>Yes</td><td data-v-71cca094>Yes</td></tr><tr data-v-71cca094><td data-v-71cca094>Appears in traces</td><td data-v-71cca094>Yes</td><td data-v-71cca094><strong data-v-71cca094>No — silently untraced</strong></td></tr></tbody></table><p data-v-71cca094>A bare <code data-v-71cca094>commit()</code> is the deliberate opt-out, not the default — committing with <code data-v-71cca094>commit()</code> where <code data-v-71cca094>commitSpan()</code> belonged is the single most common instrumentation mistake. (<code data-v-71cca094>stampAndCommit()</code> is a deprecated alias of <code data-v-71cca094>commitSpan()</code> kept for older call sites.)</p><h2 id="instants" data-v-71cca094>Custom Instants: <code data-v-71cca094>AbstractTracedInstant</code></h2><p data-v-71cca094>Not everything is an interval. For a <em data-v-71cca094>moment</em> that should land in the right trace — a circuit breaker opening, a threshold crossing — extend <code data-v-71cca094>AbstractTracedInstant</code> instead: it carries <code data-v-71cca094>traceId</code>, <code data-v-71cca094>enclosingSpanId</code> and <code data-v-71cca094>attributes</code>, and commits through <code data-v-71cca094>emit()</code>:</p>',6)),n(o,{code:N,language:"java"}),t("p",null,[e[21]||(e[21]=a("The identity field is deliberately called ",-1)),e[22]||(e[22]=t("code",null,"enclosingSpanId",-1)),e[23]||(e[23]=a(", never ",-1)),e[24]||(e[24]=t("code",null,"spanId",-1)),e[25]||(e[25]=a(" — span discovery is structural, and an instant naming its field ",-1)),e[26]||(e[26]=t("code",null,"spanId",-1)),e[27]||(e[27]=a(" would be built into a nameless, durationless span. ",-1)),e[28]||(e[28]=t("code",null,"jeffrey.Notification",-1)),e[29]||(e[29]=a(" is the shipped instant; see ",-1)),n(d,{to:"/docs/tracing/notifications-exceptions"},{default:i(()=>[...e[20]||(e[20]=[a("Notifications & Exceptions",-1)])]),_:1}),e[30]||(e[30]=a(" for the cardinality contract that applies to instants of your own too.",-1))]),e[50]||(e[50]=t("h2",{id:"attribute-utils"},"EventAttributes and AttributeValues",-1)),n(o,{code:j,language:"java"}),e[51]||(e[51]=t("p",null,[t("code",null,"EventAttributes"),a(" is single-use and not thread-safe — create, fill, "),t("code",null,"json()"),a(", discard. Spans and instants use the same field name and encoding, so one reader renders both and one index searches both.")],-1)),e[52]||(e[52]=t("h2",{id:"discovery"},"How Jeffrey Discovers It",-1)),t("ul",null,[e[35]||(e[35]=s("<li data-v-71cca094><strong data-v-71cca094>Span participation</strong>: detected from the declared <code data-v-71cca094>spanId</code> field in the recording&#39;s metadata. Any event extending <code data-v-71cca094>AbstractTracedEvent</code> takes part — no registration, no Jeffrey release needed.</li><li data-v-71cca094><strong data-v-71cca094>Naming</strong>: the <code data-v-71cca094>@Span</code> template travels in the recording; Jeffrey applies it when deriving traces.</li><li data-v-71cca094><strong data-v-71cca094>Nesting</strong>: from <code data-v-71cca094>(traceId, spanId, parentSpanId)</code> alone.</li>",3)),t("li",null,[e[32]||(e[32]=t("strong",null,"Fields",-1)),e[33]||(e[33]=a(": every declared field lands in the profile database, is shown in the span's inline detail, and appears in ",-1)),n(d,{to:"/docs/tracing/analysis"},{default:i(()=>[...e[31]||(e[31]=[a("Traces by Attributes",-1)])]),_:1}),e[34]||(e[34]=a(" under your event type.",-1))]),e[36]||(e[36]=t("li",null,[t("strong",null,"Failure"),a(": the one thing that must be "),t("em",null,"recorded"),a(" — commit through "),t("code",null,"commitSpan()"),a(" (or call "),t("code",null,"failed()"),a(") if failures should count.")],-1))]),n(r,{type:"tip"},{default:i(()=>[...e[37]||(e[37]=[a(" On the module path, ",-1),t("code",null,"opens",-1),a(" your event packages to ",-1),t("code",null,"jdk.jfr",-1),a(" — JFR rewrites event-class bytecode via ",-1),t("code",null,"MethodHandles.privateLookupIn",-1),a(", and without the ",-1),t("code",null,"opens",-1),a(", ",-1),t("code",null,"commit()",-1),a(" throws ",-1),t("code",null,"IllegalAccessException",-1),a(". (",-1),t("code",null,"jeffrey-events",-1),a(" already does this for its own packages; on the classpath there is nothing to configure.) ",-1)])]),_:1})]),n(p)])}}}),q=y(R,[["__scopeId","data-v-71cca094"]]);export{q as default};
