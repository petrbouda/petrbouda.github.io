import{D as d}from"./DocsCallout-Tx1sS9Rj.js";import{D as s}from"./DocsCodeBlock-DtRB4iqe.js";import{D as u}from"./DocsNavFooter-C0b6Waqh.js";import{D as p}from"./DocsPageHeader-CeHbfJX5.js";import{u as m}from"./useDocHeadings-Dz62a91W.js";import{i as g,o as h,e as f,h as r,a as t,g as n,B as o,t as x,m as c}from"./index-DXJLcJC9.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},w={class:"docs-content"},y=`static Optional<SpanContext> current()

// SpanContext is the immutable value the ScopedValue carries:
public record SpanContext(long traceId, long spanId, long parentSpanId) { … }`,I=`// Use-case 1: correlation ids in logs — print the trace id beside a log line,
// so a log entry can be matched to the trace it belongs to
Tracer.current().ifPresent(ctx ->
        MDC.put("traceId", Long.toHexString(ctx.traceId())));

// Use-case 2: hand the context somewhere the wrapping site cannot reach —
// stored on a request object, picked up later by continueIn
SpanContext parent = Tracer.current().orElse(null);
request.attachTraceContext(parent);
// … elsewhere, later, on another thread:
Tracer.continueIn(request.traceContext(), "request.finalize", () -> {
    finalize(request);
    return null;
});

// Use-case 3: pin an instant to the span that owns the work, before
// handing the work to a pool thread (ids already set are never overwritten
// by emit())
SpanContext owner = Tracer.current().orElse(null);
pool.submit(() -> {
    NotificationEvent n = new NotificationEvent();
    if (owner != null) {
        n.traceId = owner.traceId();
        n.enclosingSpanId = owner.spanId();
    }
    n.type = "RETRY_SCHEDULED";
    n.emit();
});`,k=`// current() emits nothing — it only reads. Inside a span:
Tracer.run("order.checkout", () ->
        System.out.println(Tracer.current()));
// Optional[SpanContext[traceId=6872570733206835563,
//                      spanId=4444722480460712002, parentSpanId=0]]

// Outside any span:
System.out.println(Tracer.current());
// Optional.empty`,C=g({__name:"TracerCurrentPage",setup(S){const{setHeadings:i}=m(),l=[{id:"when",text:"Use It When",level:2},{id:"signature",text:"Signature",level:2},{id:"behavior",text:"Behavior",level:2},{id:"examples",text:"Examples",level:2},{id:"output",text:"Output",level:2},{id:"notes",text:"Notes & Pitfalls",level:2},{id:"related",text:"Related",level:2}];return h(()=>{i(l)}),(T,e)=>{const a=x("router-link");return c(),f("article",b,[r(p,{title:"Tracer.current",icon:"bi bi-crosshair"}),t("div",w,[e[22]||(e[22]=t("p",null,"Reads the span in progress on this thread — the one method that observes the trace without touching it.",-1)),e[23]||(e[23]=t("h2",{id:"when"},"Use It When",-1)),t("p",null,[e[2]||(e[2]=n("Something outside the tracing tree needs the identity of the span in progress: a correlation id in logs, a context stored for a later ",-1)),r(a,{to:"/docs/tracing/tracer-api/continue-in"},{default:o(()=>[...e[0]||(e[0]=[n("continueIn",-1)])]),_:1}),e[3]||(e[3]=n(", or an instant that must be pinned to the owning span before the work moves to a foreign thread. For the common executor hand-off, prefer ",-1)),r(a,{to:"/docs/tracing/tracer-api/fork"},{default:o(()=>[...e[1]||(e[1]=[n("fork",-1)])]),_:1}),e[4]||(e[4]=n(", which does the capture itself.",-1))]),e[24]||(e[24]=t("h2",{id:"signature"},"Signature",-1)),r(s,{code:y,language:"java"}),e[25]||(e[25]=t("h2",{id:"behavior"},"Behavior",-1)),e[26]||(e[26]=t("ul",null,[t("li",null,[n("Returns the "),t("code",null,"SpanContext"),n(" bound on this thread, or "),t("code",null,"Optional.empty()"),n(" when none is.")]),t("li",null,"Never binds, never emits — purely a read."),t("li",null,"The returned record is immutable and safe to store or carry across threads; deriving children from it never mutates it.")],-1)),e[27]||(e[27]=t("h2",{id:"examples"},"Examples",-1)),r(s,{code:I,language:"java"}),e[28]||(e[28]=t("h2",{id:"output"},"Output",-1)),r(s,{code:k,language:"java"}),e[29]||(e[29]=t("h2",{id:"notes"},"Notes & Pitfalls",-1)),t("ul",null,[e[13]||(e[13]=t("li",null,[t("strong",null,"Empty is normal, not an error"),n(' — code paths run traced and untraced alike. Treat the empty case as "no correlation available", never as something to throw on.')],-1)),e[14]||(e[14]=t("li",null,[t("strong",null,"A stored context does not keep the span alive."),n(" The context is just three ids; the span event commits when its own lifecycle says so. Nesting under a context whose span has already ended is legal and renders correctly — the parent's bar simply ends earlier.")],-1)),t("li",null,[e[6]||(e[6]=t("strong",null,"Capture on the right thread.",-1)),e[7]||(e[7]=n()),e[8]||(e[8]=t("code",null,"current()",-1)),e[9]||(e[9]=n(" reads ",-1)),e[10]||(e[10]=t("em",null,"this",-1)),e[11]||(e[11]=n(" thread's binding — calling it inside the submitted task (on the pool thread) reads the pool thread's binding, which is exactly the mistake ",-1)),r(a,{to:"/docs/tracing/tracer-api/fork"},{default:o(()=>[...e[5]||(e[5]=[n("fork",-1)])]),_:1}),e[12]||(e[12]=n(" exists to prevent.",-1))])]),r(d,{type:"tip"},{default:o(()=>[...e[15]||(e[15]=[n(" Ids are 64-bit longs; render them as hex (",-1),t("code",null,"Long.toHexString",-1),n(") when logging — that matches how Jeffrey's UI displays them, so a log line and a waterfall can be eyeballed against each other. ",-1)])]),_:1}),e[30]||(e[30]=t("h2",{id:"related"},"Related",-1)),t("ul",null,[t("li",null,[r(a,{to:"/docs/tracing/tracer-api/continue-in"},{default:o(()=>[...e[16]||(e[16]=[n("continueIn",-1)])]),_:1}),e[17]||(e[17]=n(" — consumes a captured context to mint a child on another thread.",-1))]),t("li",null,[r(a,{to:"/docs/tracing/tracer-api/fork"},{default:o(()=>[...e[18]||(e[18]=[n("fork",-1)])]),_:1}),e[19]||(e[19]=n(" — packages capture-then-continueIn for the common submit-site case.",-1))]),t("li",null,[r(a,{to:"/docs/tracing/instrumentation"},{default:o(()=>[...e[20]||(e[20]=[n("Instrumentation Overview",-1)])]),_:1}),e[21]||(e[21]=n(" — semantics table and the method-choosing guide.",-1))])])]),r(u)])}}}),P=v(C,[["__scopeId","data-v-6687f6ad"]]);export{P as default};
