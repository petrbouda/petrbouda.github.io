import{D as i}from"./DocsCallout-BlTzcfeb.js";import{D as r}from"./DocsCodeBlock-BzO_BrUB.js";import{D as p}from"./DocsLinkCard-wwtxwaG_.js";import{D as u}from"./DocsNavFooter-C1JeBAjv.js";import{D as v}from"./DocsPageHeader-DrWGsWXf.js";import{D as b}from"./DocsSpanTree-DUKPB3vl.js";import{u as m}from"./useDocHeadings-KwKB2laG.js";import{i as g,o as f,e as y,h as n,a as t,f as s,B as o,g as a,t as w,m as x}from"./index-Cc65Ia53.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T={class:"docs-article"},S={class:"docs-content"},q=`// jeffrey-tracing-servlet depends on jakarta.servlet and nothing else
HttpExchangeFilter filter = new HttpExchangeFilter(
        HttpRequestNaming.servletMapping(),          // or your own routing-aware naming
        HttpExchangeSettings.defaults());
// register it FIRST in the chain, for /*`,H=`# Empty by default. An allow-list, never a deny-list: a header is recorded
# because somebody named it.
jeffrey.tracing.http.capture-request-headers=x-tenant-id,x-api-version`,C=`// Anything a header cannot express. Every bean of this type is collected and
// applied in @Order order, so this one ADDS to the built-in header capture
// rather than replacing it.
@Bean
HttpExchangeAttributesCustomizer planAttributes() {
    return (attributes, request, response) -> {
        attributes.put("tenant.plan", request.getAttribute("tenant.plan"));
        attributes.put("cache.hit", request.getAttribute("cache.hit"));
        // A response header, if you want one - no property needed.
        attributes.put("x-served-by", response.getHeader("x-served-by"));
    };
}

// Wiring it by hand, outside Spring:
new HttpExchangeFilter(
        naming,
        HttpExchangeSettings.defaults(),
        List.of(HttpExchangeAttributesCustomizer.requestHeaders(List.of("x-tenant-id"))));`,R=`jeffrey.HttpServerExchange {
  name = "GET /api/orders/{id}"
  ...
  attributes = {"x-tenant-id":"acme","tenant.plan":"enterprise"}
}

// In Jeffrey: Traces -> Attributes, one row per key, filterable and rankable.
//   x-tenant-id   ATTRIBUTE   3 values
//   tenant.plan   ATTRIBUTE   2 values`,k=`public class JeffreyJfrHttpEventFilter implements Filter {

    // The one thing the container cannot answer — see "Naming" above.
    private final HttpRequestNaming naming;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        HttpServerExchangeEvent event = new HttpServerExchangeEvent();
        if (!event.isEnabled()) {
            chain.doFilter(request, response);
            return;
        }
        event.begin();
        try {
            // The exchange event IS the root span: inSpanOf stamps it and binds the context.
            try {
                Tracer.inSpanOf(event, () -> {
                    chain.doFilter(request, response);
                    return null;
                });
            } catch (IOException | ServletException | RuntimeException e) {
                // Tracer infers one thrown type, which widens to Exception for a body
                // throwing both IOException and ServletException. Narrow it back to
                // what a filter may declare.
                throw e;
            } catch (Exception e) {
                throw new ServletException(e);
            }
        } finally {
            event.end();
            if (event.shouldCommit()) {
                event.uri = naming.uri(httpRequest);        // the template, never the raw path
                event.method = httpRequest.getMethod();
                event.statusCode = httpResponse.getStatus();
                event.commitSpan();                          // inSpanOf already stamped the ids
            }
        }
    }
}`,A=`jeffrey.HttpServerExchange {
  duration = 128 ms
  traceId = 6872570733206835563
  spanId = 4444722480460712002
  parentSpanId = 0                     // the trace root
  name = "GET /api/users/{id}"         // derived in describeSpan(): "{method} {uri}"
  kind = "SERVER"
  status = "UNSET"                     // would be ERROR from statusCode >= 400
  method = "GET"
  uri = "/api/users/{id}"              // the TEMPLATE — never the raw path
  statusCode = 200
  remoteHost = "10.0.4.17"
  remotePort = 55712
  requestLength = -1                   // no Content-Length header on the request
  responseLength = 1834
}`,O=`// The JDK's own client — no dependency beyond java.net.http. Any other client
// wraps the same way: the shape is the event, not the library.
public <T> HttpResponse<T> send(HttpRequest request, BodyHandler<T> handler)
        throws IOException, InterruptedException {

    // TracedEvents.emit is the whole leaf lifecycle: guard, begin, end on
    // success, failed(e) on the exception path (a transport failure that
    // never produced a status code shows red), commitSpan() stamping the
    // event under the span in progress — usually the server exchange of
    // the request being served. The IOException propagates through typed.
    HttpClientExchangeEvent event = new HttpClientExchangeEvent();
    return TracedEvents.emit(event,
            () -> client.send(request, handler),
            (e, response) -> {
                e.method = request.method();
                // Low-cardinality: host + path with variable segments
                // collapsed, ideally the URI template you expanded.
                e.uri = request.uri().getHost() + normalizePath(request.uri().getPath());
                e.remoteHost = request.uri().getHost();
                e.remotePort = request.uri().getPort();
                // response is null when the call threw before answering.
                e.statusCode = response != null ? response.statusCode() : 0;
            });
}`,F=g({__name:"TracingHttpEventsPage",setup(N){const{setHeadings:l}=m(),h=[{id:"events",text:"The Two Events",level:2},{id:"fields",text:"Fields and Derived Span Shape",level:2},{id:"servlet",text:"Any Servlet Container",level:2},{id:"naming",text:"Naming: What a Container Cannot Answer",level:2},{id:"attributes",text:"Attributes: What Makes a Request Searchable",level:2},{id:"manual-server",text:"Writing the Filter Yourself",level:2},{id:"client",text:"Outbound Calls: the Client Event",level:2},{id:"async-clients",text:"Async Clients",level:2},{id:"spring-support",text:"Using Spring Boot?",level:2},{id:"pitfalls",text:"Pitfalls",level:2}];f(()=>{l(h)});const c=[{depth:0,name:"GET /api/orders/{id}",kind:"SERVER",start:0,duration:128,event:"HttpServerExchangeEvent",note:"the inbound request"},{depth:1,name:"order.load",kind:"INTERNAL",start:6,duration:41,event:"jeffrey.TraceSpan"},{depth:1,name:"payments.example.com/api/charges",kind:"CLIENT",start:52,duration:62,event:"HttpClientExchangeEvent",note:"leaf"}];return(I,e)=>{const d=w("router-link");return x(),y("article",T,[n(v,{title:"HTTP Events",icon:"bi bi-globe2"}),t("div",S,[e[15]||(e[15]=s('<p data-v-b40892a5>Two event types cover HTTP: <code data-v-b40892a5>jeffrey.HttpServerExchange</code> — one per inbound request, opened as the <strong data-v-b40892a5>root span</strong> of that request&#39;s trace — and <code data-v-b40892a5>jeffrey.HttpClientExchange</code> — one per outbound call, committed as a <strong data-v-b40892a5>leaf</strong> under whatever span made it. Your controllers need zero changes: the inbound half is a servlet filter you register once, and the outbound half is recorded where each client call is made.</p><h2 id="events" data-v-b40892a5>The Two Events</h2><table data-v-b40892a5><thead data-v-b40892a5><tr data-v-b40892a5><th data-v-b40892a5>Event</th><th data-v-b40892a5>Kind</th><th data-v-b40892a5>Role</th><th data-v-b40892a5>Opened with</th></tr></thead><tbody data-v-b40892a5><tr data-v-b40892a5><td data-v-b40892a5><code data-v-b40892a5>jeffrey.HttpServerExchange</code></td><td data-v-b40892a5><code data-v-b40892a5>SERVER</code></td><td data-v-b40892a5>Root span of the inbound request; everything traced while serving it nests underneath</td><td data-v-b40892a5><code data-v-b40892a5>Tracer.inSpanOf</code> in a filter registered <strong data-v-b40892a5>first</strong> in the chain</td></tr><tr data-v-b40892a5><td data-v-b40892a5><code data-v-b40892a5>jeffrey.HttpClientExchange</code></td><td data-v-b40892a5><code data-v-b40892a5>CLIENT</code></td><td data-v-b40892a5>Leaf: the downstream work happens in another process this recording cannot see</td><td data-v-b40892a5><code data-v-b40892a5>TracedEvents.emit</code> / <code data-v-b40892a5>commitSpan()</code> in a client interceptor</td></tr></tbody></table><h2 id="fields" data-v-b40892a5>Fields and Derived Span Shape</h2><p data-v-b40892a5>Both extend <code data-v-b40892a5>AbstractHttpExchangeEvent</code> (which extends <code data-v-b40892a5>AbstractTracedEvent</code>) and carry: <code data-v-b40892a5>method</code>, <code data-v-b40892a5>uri</code>, <code data-v-b40892a5>statusCode</code>, <code data-v-b40892a5>remoteHost</code>, <code data-v-b40892a5>remotePort</code>, <code data-v-b40892a5>mediaType</code>, <code data-v-b40892a5>queryParams</code> (JSON), <code data-v-b40892a5>pathParams</code> (JSON), <code data-v-b40892a5>requestLength</code> and <code data-v-b40892a5>responseLength</code>. Both also inherit <code data-v-b40892a5>attributes</code> from every traced event; on the <em data-v-b40892a5>server</em> event it is what the customizers below fill, and on the client event nothing fills it.</p><p data-v-b40892a5>The span shape is derived for you in <code data-v-b40892a5>describeSpan()</code>, invoked by <code data-v-b40892a5>commitSpan()</code>: the name is <code data-v-b40892a5>&quot;{method} {uri}&quot;</code> (that template is also declared on the class with <code data-v-b40892a5>@Span</code>, so it travels in the recording&#39;s metadata), and the status turns <code data-v-b40892a5>ERROR</code> from <code data-v-b40892a5>statusCode ≥ 400</code>. <strong data-v-b40892a5>Never set <code data-v-b40892a5>name</code> or <code data-v-b40892a5>status</code> yourself</strong> — a transport failure that produced no status code is recorded with <code data-v-b40892a5>event.failed(throwable)</code>, and the derived verdict never paints over it.</p>',6)),n(r,{code:A,language:"text"}),n(i,{type:"warning"},{default:o(()=>[...e[0]||(e[0]=[t("strong",null,[t("code",null,"uri"),a(" must be the matched template")],-1),a(" — ",-1),t("code",null,"/api/users/{id}",-1),a(', never the raw path. The HTTP dashboard aggregates per endpoint on it and the span name derives from it; a raw path produces one "operation" per entity id, per static asset and per mistyped URL. A request that matched no handler is named ',-1),t("code",null,"<unmatched>",-1),a(". ",-1)])]),_:1}),e[16]||(e[16]=t("h2",{id:"servlet"},"Any Servlet Container",-1)),n(r,{code:q,language:"java"}),e[17]||(e[17]=s('<p data-v-b40892a5>That is the whole integration on any servlet stack. The module depends on <code data-v-b40892a5>jakarta.servlet</code> and nothing else, so it fits Tomcat, Jetty, Undertow or an embedded container the same way. Register the filter <strong data-v-b40892a5>first in the chain</strong>, so security, routing and data access all happen inside the request&#39;s span.</p><p data-v-b40892a5>Asynchronous requests are handled for you: when the handler starts async processing the filter completes the event from an <code data-v-b40892a5>AsyncListener</code> instead of when the container thread returns, so the recorded interval covers the whole exchange. The ids were stamped when the span opened, so the deferred commit still lands in the right trace.</p><h2 id="naming" data-v-b40892a5>Naming: What a Container Cannot Answer</h2><p data-v-b40892a5>The one thing a container cannot answer is what a request should be <em data-v-b40892a5>called</em>, so the filter asks a <code data-v-b40892a5>HttpRequestNaming</code>. The span name is derived from the recorded <code data-v-b40892a5>uri</code> and every distinct name enters the JFR constant pool, so the answer has to be the routing framework&#39;s matched <strong data-v-b40892a5>template</strong> — knowledge only that framework has. That is why this is an interface rather than a lookup: the filter asks for a name, and whoever knows the routing supplies one.</p><p data-v-b40892a5>The built-in strategy, <code data-v-b40892a5>HttpRequestNaming.servletMapping()</code>, names requests by the pattern their servlet was mapped with (<code data-v-b40892a5>/api/*</code>) — the best a container can do alone, and already low-cardinality because a mapping is declared rather than derived from the request. Supply your own to use a router&#39;s matched template. A request that matched nothing is named <code data-v-b40892a5>&lt;unmatched&gt;</code>: still recorded, simply named together, because one operation per mistyped URL is worth nothing to anyone.</p><h2 id="attributes" data-v-b40892a5>Attributes: What Makes a Request Searchable</h2><p data-v-b40892a5>The fields above are what HTTP itself can say. <em data-v-b40892a5>Which tenant was this</em>, <em data-v-b40892a5>which API version</em>, <em data-v-b40892a5>which client</em> is domain knowledge the servlet layer has no way to name — so it is asked for in the same way naming is, from a <code data-v-b40892a5>HttpExchangeAttributesCustomizer</code>. The built-in answer records an allow-list of headers:</p>',7)),n(r,{code:H,language:"properties"}),e[18]||(e[18]=t("p",null,[a("A header is recorded under its own name, lower-cased — "),t("code",null,"x-tenant-id"),a(" is what you configure, what the client sends and what you search for.")],-1)),e[19]||(e[19]=t("p",null,"Only request headers have a property, and deliberately so: a response header is one your own server set, so the lambda below reads it off the response it is handed in two lines. An inbound header is the case nothing else covers — it arrives from outside, and your code may never touch it.",-1)),e[20]||(e[20]=t("p",null,"Anything else is a lambda:",-1)),n(r,{code:C,language:"java"}),e[21]||(e[21]=t("p",null,[a("What a customizer contributes goes into the span's open "),t("code",null,"attributes"),a(" map, and that is the whole point of the feature rather than an implementation detail. Jeffrey indexes that map "),t("strong",null,"one key at a time"),a(", so every key becomes something the Traces attribute search can filter by, facet and rank, and something "),t("code",null,"traces_attributeSearch"),a(" can hand an agent. A declared event field would instead be one opaque value — which is exactly what "),t("code",null,"queryParams"),a(' is, and why it answers "what did this request carry" but never "show me the slow requests for this tenant".')],-1)),n(r,{code:R,language:"text"}),e[22]||(e[22]=t("p",null,"A customizer that throws is logged once and skipped: it can neither fail the request nor lose the span, and the customizers after it still run. A request nothing contributed to leaves the field absent rather than recording an empty object.",-1)),n(i,{type:"warning"},{default:o(()=>[...e[1]||(e[1]=[t("strong",null,"Three rules, all of them about what the index will accept.",-1),a(" Values must be ",-1),t("strong",null,"flat scalars",-1),a(" — text, a number or a boolean. Hand a customizer a map or a list and it is recorded as that object's ",-1),t("em",null,"text",-1),a(" (",-1),t("code",null,"{a=1, b=2}",-1),a("), which is searchable only as that exact string and is never what you wanted; the built-in header capture avoids the question by recording the first value of a header sent more than once, rather than a list. Values must be ",-1),t("strong",null,"low-cardinality",-1),a(" for the same reason span names are: past a couple of hundred distinct values a key stops being a browsable facet and becomes search-only, and every distinct value enters the recording's constant pool — so capture what you ",-1),t("em",null,"group by",-1),a(", never an identifier unique to each request. And ",-1),t("strong",null,"never capture a credential",-1),a(": ",-1),t("code",null,"Authorization",-1),a(" and ",-1),t("code",null,"Cookie",-1),a(" do not belong in a file that gets uploaded, shared and kept. ",-1)])]),_:1}),e[23]||(e[23]=t("h2",{id:"manual-server"},"Writing the Filter Yourself",-1)),e[24]||(e[24]=t("p",null,"For stacks the modules don't cover — or to see precisely what they do — this is the whole filter:",-1)),n(r,{code:k,language:"java"}),e[25]||(e[25]=t("p",null,[a("Note what this simple version does "),t("em",null,"not"),a(" handle: an asynchronous request is measured only until the container thread returns, so it appears to take microseconds. "),t("code",null,"HttpExchangeFilter"),a(" completes such requests from an "),t("code",null,"AsyncListener"),a(" instead, and guards against being applied twice when the filter is mapped more than once.")],-1)),e[26]||(e[26]=t("h2",{id:"client"},"Outbound Calls: the Client Event",-1)),e[27]||(e[27]=t("p",null,"There is no client module to add: applications build clients in too many ways for one to guess, so an outbound call is instrumented where the call is made. The shape is the same everywhere — record host and path with the query string dropped, since that is where ids and tokens live:",-1)),n(r,{code:O,language:"java"}),n(b,{trace:"8c1d33f0…",spans:c,caption:"The downstream work happens in another process this recording cannot see, so the client exchange is a leaf."}),e[28]||(e[28]=t("h2",{id:"async-clients"},"Async Clients",-1)),t("p",null,[e[4]||(e[4]=a("A blocking interceptor shape does not fit a client whose response arrives via callbacks on threads you don't control (WebClient, async HttpClient). Use the callback pattern (",-1)),n(d,{to:"/docs/tracing/tracer-api/open-span-of"},{default:o(()=>[...e[2]||(e[2]=[a("openSpanOf",-1)])]),_:1}),e[5]||(e[5]=a(" + ",-1)),n(d,{to:"/docs/tracing/tracer-api/reenter"},{default:o(()=>[...e[3]||(e[3]=[a("reenter",-1)])]),_:1}),e[6]||(e[6]=a("): ",-1)),e[7]||(e[7]=t("code",null,"Tracer.openSpanOf(event)",-1)),e[8]||(e[8]=a(" when the call starts (on the thread whose span it belongs to), ",-1)),e[9]||(e[9]=t("code",null,"Tracer.reenter(ctx, ...)",-1)),e[10]||(e[10]=a(" around each callback, and ",-1)),e[11]||(e[11]=t("code",null,"event.commitSpan()",-1)),e[12]||(e[12]=a(" at completion. ",-1)),e[13]||(e[13]=t("code",null,"openSpanOf",-1)),e[14]||(e[14]=a(" stamps the ids eagerly, so a completion running after the enclosing binding is gone still carries the right identity.",-1))]),e[29]||(e[29]=t("h2",{id:"spring-support"},"Using Spring Boot?",-1)),e[30]||(e[30]=t("p",null,[a("One dependency registers the filter for you, names requests by the matched Spring MVC handler pattern, and binds the capture flags to "),t("code",null,"jeffrey.tracing.*"),a(". For the outbound half it contributes a "),t("code",null,"RestTemplate"),a(" interceptor as a bean — which you still attach to the clients you build, since nothing can guess where those are.")],-1)),n(p,{to:"/docs/tracing/spring-support",icon:"bi bi-flower1",title:"Spring Support",description:"The starter, the jeffrey.tracing.* property table, Spring MVC request naming and the RestTemplate interceptor."}),e[31]||(e[31]=s('<h2 id="pitfalls" data-v-b40892a5>Pitfalls</h2><table data-v-b40892a5><thead data-v-b40892a5><tr data-v-b40892a5><th data-v-b40892a5>Symptom</th><th data-v-b40892a5>Cause</th><th data-v-b40892a5>Fix</th></tr></thead><tbody data-v-b40892a5><tr data-v-b40892a5><td data-v-b40892a5>One &quot;endpoint&quot; per user/entity in the HTTP dashboard</td><td data-v-b40892a5>Raw URI recorded instead of the template</td><td data-v-b40892a5>Supply a routing-aware <code data-v-b40892a5>HttpRequestNaming</code> instead of the servlet-mapping default</td></tr><tr data-v-b40892a5><td data-v-b40892a5>SQL spans not nested under requests</td><td data-v-b40892a5>Filter registered after work-dispatching filters, or missing entirely</td><td data-v-b40892a5>Register the filter first in the chain, mapped at <code data-v-b40892a5>/*</code></td></tr><tr data-v-b40892a5><td data-v-b40892a5>Request span missing, children promoted to roots</td><td data-v-b40892a5>The root event was re-stamped by hand</td><td data-v-b40892a5>Never call <code data-v-b40892a5>Tracer.stamp</code> on an <code data-v-b40892a5>inSpanOf</code> event; commit with <code data-v-b40892a5>commitSpan()</code></td></tr><tr data-v-b40892a5><td data-v-b40892a5>5xx/4xx not red in Traces</td><td data-v-b40892a5><code data-v-b40892a5>statusCode</code> not set before commit</td><td data-v-b40892a5><code data-v-b40892a5>HttpExchangeFilter</code> sets it; by hand, set it in the <code data-v-b40892a5>finally</code></td></tr><tr data-v-b40892a5><td data-v-b40892a5>Async requests measured as ~0 ms</td><td data-v-b40892a5>Event completed when the container thread returned</td><td data-v-b40892a5>Use <code data-v-b40892a5>HttpExchangeFilter</code>, which completes from an <code data-v-b40892a5>AsyncListener</code></td></tr><tr data-v-b40892a5><td data-v-b40892a5>Calls in the HTTP Client dashboard but not in Traces</td><td data-v-b40892a5>Committed with <code data-v-b40892a5>commit()</code></td><td data-v-b40892a5><code data-v-b40892a5>TracedEvents.emit</code>, or <code data-v-b40892a5>commitSpan()</code> in the <code data-v-b40892a5>finally</code></td></tr><tr data-v-b40892a5><td data-v-b40892a5>Client calls are roots of their own one-span traces</td><td data-v-b40892a5>Call ran outside a bound span (no server filter, <code data-v-b40892a5>@Async</code>, scheduled job)</td><td data-v-b40892a5>Register the root filter; wrap background work with <code data-v-b40892a5>Tracer.fork</code>/<code data-v-b40892a5>continueIn</code></td></tr></tbody></table>',2))]),n(u)])}}}),J=E(F,[["__scopeId","data-v-b40892a5"]]);export{J as default};
