import{D as s}from"./DocsCodeBlock-C5MeNcqt.js";import{D as p}from"./DocsNavFooter-Bt0ugVhp.js";import{D as u}from"./DocsPageHeader-DYolIm9t.js";import{D as f}from"./DocsSpanTree-DdsOVjrY.js";import{u as g}from"./useDocHeadings-BOeQBIaq.js";import{d as m,k as c,c as h,e as a,a as n,j as t,w as o,b as v,i as w,o as y}from"./index-CCJa2PDF.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},k={class:"docs-content"},x=`static void run(String name, Runnable body)                    // kind = INTERNAL
static void run(String name, SpanKind kind, Runnable body)`,S=`// Use-case 1: time a domain operation inside a request — the span nests
// under whatever span is in progress on this thread (the HTTP request,
// a job, a parent run), with nothing threaded through the call chain
Tracer.run("cart.validate", () -> validator.validate(cart));

// Use-case 2: an outbound wait that has no dedicated event type yet
Tracer.run("payment.charge", SpanKind.CLIENT, () -> paymentGateway.charge(order));

// Use-case 3: a pipeline — one bar per stage in the waterfall
Tracer.run("report.generate", () -> {
    Tracer.run("report.load-data", this::loadData);
    Tracer.run("report.render", this::render);
    Tracer.run("report.store", this::store);
});

// Use-case 4: catch INSIDE the body when a handled failure should NOT
// mark the operation as failed — a span only turns red for exceptions
// that escape it
Tracer.run("cache.warm", () -> {
    try {
        cache.preload();
    } catch (CacheUnavailableException e) {
        LOG.warn("Cache warmup skipped", e);   // span stays UNSET — this is fine
    }
});`,N=`jfr print --events jeffrey.TraceSpan app.jfr

jeffrey.TraceSpan {
  duration = 204 ms
  traceId = 8964370214175523801
  spanId = 2411087615529001143
  parentSpanId = 6105938220997569912   // nested under report.generate
  name = "report.render"
  kind = "INTERNAL"
  status = "UNSET"
}`,E=`Tracer.run("payment.charge", SpanKind.CLIENT, () -> {
    throw new IllegalStateException("card declined");
});

// The span is still recorded:
//   status    = ERROR
//   errorType = "java.lang.IllegalStateException"
// and the exception reaches the caller unchanged — same instance, no wrapping.`,I=m({__name:"TracerRunPage",setup(R){const{setHeadings:i}=g(),d=[{id:"when",text:"Use It When",level:2},{id:"signature",text:"Signatures",level:2},{id:"behavior",text:"Behavior",level:2},{id:"examples",text:"Examples",level:2},{id:"output",text:"Output",level:2},{id:"notes",text:"Notes & Pitfalls",level:2},{id:"related",text:"Related",level:2}];c(()=>{i(d)});const l=[{depth:0,name:"report.generate",kind:"INTERNAL",start:0,duration:412,event:"jeffrey.TraceSpan",note:"root"},{depth:1,name:"report.load-data",kind:"INTERNAL",start:3,duration:181,event:"jeffrey.TraceSpan"},{depth:1,name:"report.render",kind:"INTERNAL",start:185,duration:204,event:"jeffrey.TraceSpan"},{depth:1,name:"report.store",kind:"INTERNAL",start:390,duration:22,event:"jeffrey.TraceSpan"}];return(j,e)=>{const r=w("router-link");return y(),h("article",b,[a(u,{title:"Tracer.run",icon:"bi bi-play-circle"}),n("div",k,[e[30]||(e[30]=n("p",null,"Records a span around a side-effecting block of work. The workhorse of the API — if in doubt, start here.",-1)),e[31]||(e[31]=n("h2",{id:"when"},"Use It When",-1)),n("p",null,[e[1]||(e[1]=t("A block of in-process work is worth timing — a pipeline stage, a domain operation, a computation — and the body returns nothing. For a body that returns a value (or throws a checked exception you want to keep typed), use ",-1)),a(r,{to:"/docs/tracing/tracer-api/call"},{default:o(()=>[...e[0]||(e[0]=[t("call",-1)])]),_:1}),e[2]||(e[2]=t(", which is otherwise identical.",-1))]),e[32]||(e[32]=n("h2",{id:"signature"},"Signatures",-1)),a(s,{code:x,language:"java"}),e[33]||(e[33]=v('<h2 id="behavior" data-v-cfead230>Behavior</h2><ul data-v-cfead230><li data-v-cfead230>Opens a span whose parent is whatever span is bound on the current thread — or a <strong data-v-cfead230>fresh root</strong> when none is.</li><li data-v-cfead230>Runs the body with the new <code data-v-cfead230>SpanContext</code> bound through the <code data-v-cfead230>ScopedValue</code>, so anything traced inside nests under it.</li><li data-v-cfead230>Emits one <code data-v-cfead230>jeffrey.TraceSpan</code> when the body completes.</li><li data-v-cfead230>An exception escaping the body marks the span <code data-v-cfead230>ERROR</code> with the exception&#39;s class name and is <strong data-v-cfead230>rethrown unchanged</strong>.</li><li data-v-cfead230>With the event type disabled (nothing recording), the body runs directly — no binding, no event, no allocation that survives escape analysis.</li></ul><h2 id="examples" data-v-cfead230>Examples</h2>',3)),a(s,{code:S,language:"java"}),e[34]||(e[34]=n("p",null,"The failure path:",-1)),a(s,{code:E,language:"java"}),e[35]||(e[35]=n("h2",{id:"output"},"Output",-1)),a(f,{trace:"7c01ba58…",spans:l}),a(s,{code:N,language:"text"}),e[36]||(e[36]=n("h2",{id:"notes"},"Notes & Pitfalls",-1)),n("ul",null,[e[23]||(e[23]=n("li",null,[n("strong",null,"Instrument operations, not methods."),t(),n("code",null,"order.checkout"),t(", "),n("code",null,"inventory.reserve"),t(", "),n("code",null,"report.render"),t(" — a handful of meaningful spans per request beats hundreds of one-per-method spans.")],-1)),n("li",null,[e[4]||(e[4]=n("strong",null,"Names must be stable and low-cardinality",-1)),e[5]||(e[5]=t(": name the operation, never the instance (",-1)),e[6]||(e[6]=n("code",null,"order.checkout",-1)),e[7]||(e[7]=t(", not ",-1)),e[8]||(e[8]=n("code",null,"order.checkout.a3f9c1",-1)),e[9]||(e[9]=t("). Every distinct name enters the JFR per-chunk constant pool, and high-cardinality names shatter ",-1)),a(r,{to:"/docs/tracing/analysis"},{default:o(()=>[...e[3]||(e[3]=[t("Traces by Operation",-1)])]),_:1}),e[10]||(e[10]=t(".",-1))]),n("li",null,[e[12]||(e[12]=n("strong",null,[t("Do not wrap an inbound request with "),n("code",null,"run")],-1)),e[13]||(e[13]=t(" when a request event already describes the interval — that records the same interval twice. Root the request with ",-1)),a(r,{to:"/docs/tracing/tracer-api/in-span-of"},{default:o(()=>[...e[11]||(e[11]=[t("inSpanOf",-1)])]),_:1}),e[14]||(e[14]=t(" instead.",-1))]),n("li",null,[e[18]||(e[18]=n("strong",null,"The span does not cross a plain executor.",-1)),e[19]||(e[19]=t(" Work submitted from inside the body to a pool falls out of the trace unless handed over with ",-1)),a(r,{to:"/docs/tracing/tracer-api/fork"},{default:o(()=>[...e[15]||(e[15]=[t("fork",-1)])]),_:1}),e[20]||(e[20]=t(", ",-1)),a(r,{to:"/docs/tracing/tracer-api/continue-in"},{default:o(()=>[...e[16]||(e[16]=[t("continueIn",-1)])]),_:1}),e[21]||(e[21]=t(" or a ",-1)),a(r,{to:"/docs/tracing/tracer-api/propagating"},{default:o(()=>[...e[17]||(e[17]=[t("propagating",-1)])]),_:1}),e[22]||(e[22]=t(" executor.",-1))])]),e[37]||(e[37]=n("h2",{id:"related"},"Related",-1)),n("ul",null,[n("li",null,[a(r,{to:"/docs/tracing/tracer-api/call"},{default:o(()=>[...e[24]||(e[24]=[t("call",-1)])]),_:1}),e[25]||(e[25]=t(" — the value-returning twin, with typed checked exceptions.",-1))]),n("li",null,[a(r,{to:"/docs/tracing/tracer-api/in-span-of"},{default:o(()=>[...e[26]||(e[26]=[t("inSpanOf",-1)])]),_:1}),e[27]||(e[27]=t(" — when an event of your own already describes the interval.",-1))]),n("li",null,[a(r,{to:"/docs/tracing/instrumentation"},{default:o(()=>[...e[28]||(e[28]=[t("Instrumentation Overview",-1)])]),_:1}),e[29]||(e[29]=t(" — semantics table and the method-choosing guide.",-1))])])]),a(p)])}}}),q=T(I,[["__scopeId","data-v-cfead230"]]);export{q as default};
