import{D as c}from"./DocsCallout-Dr3AwuyK.js";import{D as o}from"./DocsCodeBlock-CTtKWQgH.js";import{D as p}from"./DocsLinkCard-B55Yyuk3.js";import{D as h}from"./DocsNavFooter-CWioXFF1.js";import{D as v}from"./DocsPageHeader-BwAxOln0.js";import{D as f}from"./DocsSpanTree-D_j8JDVN.js";import{u}from"./useDocHeadings-2E1-EMwL.js";import{d as m,k as g,c as y,e as n,a as t,b as d,w as r,j as a,i as w,o as E}from"./index-BbCjQtSM.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={class:"docs-article"},x={class:"docs-content"},q=`// jeffrey-tracing-servlet depends on jakarta.servlet and nothing else
HttpExchangeFilter filter = new HttpExchangeFilter(
        HttpRequestNaming.servletMapping(),          // or your own routing-aware naming
        HttpExchangeSettings.defaults());
// register it FIRST in the chain, for /*`,C=`public class JeffreyJfrHttpEventFilter implements Filter {

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
}`,H=`jeffrey.HttpServerExchange {
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
}`,R=`// The JDK's own client — no dependency beyond java.net.http. Any other client
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
}`,k=m({__name:"TracingHttpEventsPage",setup(N){const{setHeadings:i}=u(),l=[{id:"events",text:"The Two Events",level:2},{id:"fields",text:"Fields and Derived Span Shape",level:2},{id:"servlet",text:"Any Servlet Container",level:2},{id:"naming",text:"Naming: What a Container Cannot Answer",level:2},{id:"manual-server",text:"Writing the Filter Yourself",level:2},{id:"client",text:"Outbound Calls: the Client Event",level:2},{id:"async-clients",text:"Async Clients",level:2},{id:"spring-support",text:"Using Spring Boot?",level:2},{id:"pitfalls",text:"Pitfalls",level:2}];g(()=>{i(l)});const b=[{depth:0,name:"GET /api/orders/{id}",kind:"SERVER",start:0,duration:128,event:"HttpServerExchangeEvent",note:"the inbound request"},{depth:1,name:"order.load",kind:"INTERNAL",start:6,duration:41,event:"jeffrey.TraceSpan"},{depth:1,name:"payments.example.com/api/charges",kind:"CLIENT",start:52,duration:62,event:"HttpClientExchangeEvent",note:"leaf"}];return(O,e)=>{const s=w("router-link");return E(),y("article",S,[n(v,{title:"HTTP Events",icon:"bi bi-globe2"}),t("div",x,[e[14]||(e[14]=d('<p data-v-ba861f9b>Two event types cover HTTP: <code data-v-ba861f9b>jeffrey.HttpServerExchange</code> — one per inbound request, opened as the <strong data-v-ba861f9b>root span</strong> of that request&#39;s trace — and <code data-v-ba861f9b>jeffrey.HttpClientExchange</code> — one per outbound call, committed as a <strong data-v-ba861f9b>leaf</strong> under whatever span made it. Your controllers need zero changes: the inbound half is a servlet filter you register once, and the outbound half is recorded where each client call is made.</p><h2 id="events" data-v-ba861f9b>The Two Events</h2><table data-v-ba861f9b><thead data-v-ba861f9b><tr data-v-ba861f9b><th data-v-ba861f9b>Event</th><th data-v-ba861f9b>Kind</th><th data-v-ba861f9b>Role</th><th data-v-ba861f9b>Opened with</th></tr></thead><tbody data-v-ba861f9b><tr data-v-ba861f9b><td data-v-ba861f9b><code data-v-ba861f9b>jeffrey.HttpServerExchange</code></td><td data-v-ba861f9b><code data-v-ba861f9b>SERVER</code></td><td data-v-ba861f9b>Root span of the inbound request; everything traced while serving it nests underneath</td><td data-v-ba861f9b><code data-v-ba861f9b>Tracer.inSpanOf</code> in a filter registered <strong data-v-ba861f9b>first</strong> in the chain</td></tr><tr data-v-ba861f9b><td data-v-ba861f9b><code data-v-ba861f9b>jeffrey.HttpClientExchange</code></td><td data-v-ba861f9b><code data-v-ba861f9b>CLIENT</code></td><td data-v-ba861f9b>Leaf: the downstream work happens in another process this recording cannot see</td><td data-v-ba861f9b><code data-v-ba861f9b>TracedEvents.emit</code> / <code data-v-ba861f9b>commitSpan()</code> in a client interceptor</td></tr></tbody></table><h2 id="fields" data-v-ba861f9b>Fields and Derived Span Shape</h2><p data-v-ba861f9b>Both extend <code data-v-ba861f9b>AbstractHttpExchangeEvent</code> (which extends <code data-v-ba861f9b>AbstractTracedEvent</code>) and carry: <code data-v-ba861f9b>method</code>, <code data-v-ba861f9b>uri</code>, <code data-v-ba861f9b>statusCode</code>, <code data-v-ba861f9b>remoteHost</code>, <code data-v-ba861f9b>remotePort</code>, <code data-v-ba861f9b>mediaType</code>, <code data-v-ba861f9b>queryParams</code> (JSON), <code data-v-ba861f9b>pathParams</code> (JSON), <code data-v-ba861f9b>requestLength</code> and <code data-v-ba861f9b>responseLength</code>.</p><p data-v-ba861f9b>The span shape is derived for you in <code data-v-ba861f9b>describeSpan()</code>, invoked by <code data-v-ba861f9b>commitSpan()</code>: the name is <code data-v-ba861f9b>&quot;{method} {uri}&quot;</code> (that template is also declared on the class with <code data-v-ba861f9b>@Span</code>, so it travels in the recording&#39;s metadata), and the status turns <code data-v-ba861f9b>ERROR</code> from <code data-v-ba861f9b>statusCode ≥ 400</code>. <strong data-v-ba861f9b>Never set <code data-v-ba861f9b>name</code> or <code data-v-ba861f9b>status</code> yourself</strong> — a transport failure that produced no status code is recorded with <code data-v-ba861f9b>event.failed(throwable)</code>, and the derived verdict never paints over it.</p>',6)),n(o,{code:H,language:"text"}),n(c,{type:"warning"},{default:r(()=>[...e[0]||(e[0]=[t("strong",null,[t("code",null,"uri"),a(" must be the matched template")],-1),a(" — ",-1),t("code",null,"/api/users/{id}",-1),a(', never the raw path. The HTTP dashboard aggregates per endpoint on it and the span name derives from it; a raw path produces one "operation" per entity id, per static asset and per mistyped URL. A request that matched no handler is named ',-1),t("code",null,"<unmatched>",-1),a(". ",-1)])]),_:1}),e[15]||(e[15]=t("h2",{id:"servlet"},"Any Servlet Container",-1)),n(o,{code:q,language:"java"}),e[16]||(e[16]=d('<p data-v-ba861f9b>That is the whole integration on any servlet stack. The module depends on <code data-v-ba861f9b>jakarta.servlet</code> and nothing else, so it fits Tomcat, Jetty, Undertow or an embedded container the same way. Register the filter <strong data-v-ba861f9b>first in the chain</strong>, so security, routing and data access all happen inside the request&#39;s span.</p><p data-v-ba861f9b>Asynchronous requests are handled for you: when the handler starts async processing the filter completes the event from an <code data-v-ba861f9b>AsyncListener</code> instead of when the container thread returns, so the recorded interval covers the whole exchange. The ids were stamped when the span opened, so the deferred commit still lands in the right trace.</p><h2 id="naming" data-v-ba861f9b>Naming: What a Container Cannot Answer</h2><p data-v-ba861f9b>The one thing a container cannot answer is what a request should be <em data-v-ba861f9b>called</em>, so the filter asks a <code data-v-ba861f9b>HttpRequestNaming</code>. The span name is derived from the recorded <code data-v-ba861f9b>uri</code> and every distinct name enters the JFR constant pool, so the answer has to be the routing framework&#39;s matched <strong data-v-ba861f9b>template</strong> — knowledge only that framework has. That is why this is an interface rather than a lookup: the filter asks for a name, and whoever knows the routing supplies one.</p><p data-v-ba861f9b>The built-in strategy, <code data-v-ba861f9b>HttpRequestNaming.servletMapping()</code>, names requests by the pattern their servlet was mapped with (<code data-v-ba861f9b>/api/*</code>) — the best a container can do alone, and already low-cardinality because a mapping is declared rather than derived from the request. Supply your own to use a router&#39;s matched template. A request that matched nothing is named <code data-v-ba861f9b>&lt;unmatched&gt;</code>: still recorded, simply named together, because one operation per mistyped URL is worth nothing to anyone.</p><h2 id="manual-server" data-v-ba861f9b>Writing the Filter Yourself</h2><p data-v-ba861f9b>For stacks the modules don&#39;t cover — or to see precisely what they do — this is the whole filter:</p>',7)),n(o,{code:C,language:"java"}),e[17]||(e[17]=t("p",null,[a("Note what this simple version does "),t("em",null,"not"),a(" handle: an asynchronous request is measured only until the container thread returns, so it appears to take microseconds. "),t("code",null,"HttpExchangeFilter"),a(" completes such requests from an "),t("code",null,"AsyncListener"),a(" instead, and guards against being applied twice when the filter is mapped more than once.")],-1)),e[18]||(e[18]=t("h2",{id:"client"},"Outbound Calls: the Client Event",-1)),e[19]||(e[19]=t("p",null,"There is no client module to add: applications build clients in too many ways for one to guess, so an outbound call is instrumented where the call is made. The shape is the same everywhere — record host and path with the query string dropped, since that is where ids and tokens live:",-1)),n(o,{code:R,language:"java"}),n(f,{trace:"8c1d33f0…",spans:b,caption:"The downstream work happens in another process this recording cannot see, so the client exchange is a leaf."}),e[20]||(e[20]=t("h2",{id:"async-clients"},"Async Clients",-1)),t("p",null,[e[3]||(e[3]=a("A blocking interceptor shape does not fit a client whose response arrives via callbacks on threads you don't control (WebClient, async HttpClient). Use the callback pattern (",-1)),n(s,{to:"/docs/tracing/tracer-api/open-span-of"},{default:r(()=>[...e[1]||(e[1]=[a("openSpanOf",-1)])]),_:1}),e[4]||(e[4]=a(" + ",-1)),n(s,{to:"/docs/tracing/tracer-api/reenter"},{default:r(()=>[...e[2]||(e[2]=[a("reenter",-1)])]),_:1}),e[5]||(e[5]=a("): ",-1)),e[6]||(e[6]=t("code",null,"Tracer.openSpanOf(event)",-1)),e[7]||(e[7]=a(" when the call starts (on the thread whose span it belongs to), ",-1)),e[8]||(e[8]=t("code",null,"Tracer.reenter(ctx, ...)",-1)),e[9]||(e[9]=a(" around each callback, and ",-1)),e[10]||(e[10]=t("code",null,"event.commitSpan()",-1)),e[11]||(e[11]=a(" at completion. ",-1)),e[12]||(e[12]=t("code",null,"openSpanOf",-1)),e[13]||(e[13]=a(" stamps the ids eagerly, so a completion running after the enclosing binding is gone still carries the right identity.",-1))]),e[21]||(e[21]=t("h2",{id:"spring-support"},"Using Spring Boot?",-1)),e[22]||(e[22]=t("p",null,[a("One dependency registers the filter for you, names requests by the matched Spring MVC handler pattern, and binds the capture flags to "),t("code",null,"jeffrey.tracing.*"),a(". For the outbound half it contributes a "),t("code",null,"RestTemplate"),a(" interceptor as a bean — which you still attach to the clients you build, since nothing can guess where those are.")],-1)),n(p,{to:"/docs/tracing/spring-support",icon:"bi bi-flower1",title:"Spring Support",description:"The starter, the jeffrey.tracing.* property table, Spring MVC request naming and the RestTemplate interceptor."}),e[23]||(e[23]=d('<h2 id="pitfalls" data-v-ba861f9b>Pitfalls</h2><table data-v-ba861f9b><thead data-v-ba861f9b><tr data-v-ba861f9b><th data-v-ba861f9b>Symptom</th><th data-v-ba861f9b>Cause</th><th data-v-ba861f9b>Fix</th></tr></thead><tbody data-v-ba861f9b><tr data-v-ba861f9b><td data-v-ba861f9b>One &quot;endpoint&quot; per user/entity in the HTTP dashboard</td><td data-v-ba861f9b>Raw URI recorded instead of the template</td><td data-v-ba861f9b>Supply a routing-aware <code data-v-ba861f9b>HttpRequestNaming</code> instead of the servlet-mapping default</td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>SQL spans not nested under requests</td><td data-v-ba861f9b>Filter registered after work-dispatching filters, or missing entirely</td><td data-v-ba861f9b>Register the filter first in the chain, mapped at <code data-v-ba861f9b>/*</code></td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>Request span missing, children promoted to roots</td><td data-v-ba861f9b>The root event was re-stamped by hand</td><td data-v-ba861f9b>Never call <code data-v-ba861f9b>Tracer.stamp</code> on an <code data-v-ba861f9b>inSpanOf</code> event; commit with <code data-v-ba861f9b>commitSpan()</code></td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>5xx/4xx not red in Traces</td><td data-v-ba861f9b><code data-v-ba861f9b>statusCode</code> not set before commit</td><td data-v-ba861f9b><code data-v-ba861f9b>HttpExchangeFilter</code> sets it; by hand, set it in the <code data-v-ba861f9b>finally</code></td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>Async requests measured as ~0 ms</td><td data-v-ba861f9b>Event completed when the container thread returned</td><td data-v-ba861f9b>Use <code data-v-ba861f9b>HttpExchangeFilter</code>, which completes from an <code data-v-ba861f9b>AsyncListener</code></td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>Calls in the HTTP Client dashboard but not in Traces</td><td data-v-ba861f9b>Committed with <code data-v-ba861f9b>commit()</code></td><td data-v-ba861f9b><code data-v-ba861f9b>TracedEvents.emit</code>, or <code data-v-ba861f9b>commitSpan()</code> in the <code data-v-ba861f9b>finally</code></td></tr><tr data-v-ba861f9b><td data-v-ba861f9b>Client calls are roots of their own one-span traces</td><td data-v-ba861f9b>Call ran outside a bound span (no server filter, <code data-v-ba861f9b>@Async</code>, scheduled job)</td><td data-v-ba861f9b>Register the root filter; wrap background work with <code data-v-ba861f9b>Tracer.fork</code>/<code data-v-ba861f9b>continueIn</code></td></tr></tbody></table>',2))]),n(h)])}}}),B=T(k,[["__scopeId","data-v-ba861f9b"]]);export{B as default};
