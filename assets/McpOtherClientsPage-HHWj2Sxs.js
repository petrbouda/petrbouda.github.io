import{D as i}from"./DocsCallout-DZX_RDnR.js";import{D as n}from"./DocsCodeBlock-Cab6jhXf.js";import{D as p}from"./DocsNavFooter-CNTWrPWV.js";import{D as u}from"./DocsPageHeader-YI1UcWA8.js";import{u as h}from"./useDocHeadings-BCBRq-VY.js";import{d as c,k as m,c as v,e as a,a as t,j as o,w as d,b as f,i as g,o as y}from"./index-D2OHg_Vw.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},C={class:"docs-content"},j="claude mcp add --transport http jeffrey http://localhost:8585/api/internal/mcp",T=`{
  "mcpServers": {
    "jeffrey": {
      "type": "http",
      "url": "http://localhost:8585/api/internal/mcp"
    }
  }
}`,P=`curl -s -X POST http://localhost:8585/api/internal/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": { "protocolVersion": "2025-06-18" }
  }'`,k=`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2025-06-18",
    "capabilities": { "tools": { "listChanged": false } },
    "serverInfo": { "name": "jeffrey", "version": "1.0.0" }
  }
}`,S=`curl -s -X POST http://localhost:8585/api/internal/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "flamegraph_export",
      "arguments": {
        "profileId": "0195f0a2-...",
        "eventType": "jdk.ExecutionSample",
        "thresholdPct": 1.0
      }
    }
  }'`,x=`{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      { "type": "text", "text": "Error: Profile 0195f0a2-... has no heap dump. ..." }
    ],
    "isError": true
  }
}`,E=`{
  "jsonrpc": "2.0",
  "id": 9,
  "error": { "code": -32601, "message": "Method not found: tools/nope" }
}`,N=c({__name:"McpOtherClientsPage",setup(O){const{setHeadings:r}=h(),s=[{id:"claude-code-without-the-plugin",text:"Claude Code, Without the Plugin",level:2},{id:"what-you-give-up",text:"What You Give Up",level:2},{id:"the-wire-protocol",text:"The Wire Protocol",level:2},{id:"a-session-by-hand",text:"A Session by Hand",level:2},{id:"errors",text:"Errors",level:2}];return m(()=>{r(s)}),(A,e)=>{const l=g("router-link");return y(),v("article",b,[a(u,{title:"Other Clients",icon:"bi bi-terminal-split"}),t("div",C,[t("p",null,[e[1]||(e[1]=o("The ",-1)),a(l,{to:"/docs/microscope-mcp/plugin"},{default:d(()=>[...e[0]||(e[0]=[o("plugin",-1)])]),_:1}),e[2]||(e[2]=o(" is a convenience over an ordinary MCP server. Anything that speaks MCP over Streamable HTTP can connect instead.",-1))]),e[14]||(e[14]=t("h2",{id:"claude-code-without-the-plugin"},"Claude Code, Without the Plugin",-1)),e[15]||(e[15]=t("p",null,"Register the server directly — useful when you want it in one project only, or when you would rather not add a marketplace:",-1)),a(n,{code:j,language:"bash"}),e[16]||(e[16]=t("p",null,[o("Or write it into a project’s "),t("code",null,".mcp.json"),o(":")],-1)),a(n,{code:T,language:"json"}),a(i,{type:"tip",title:"Both are offered ready-made"},{default:d(()=>[...e[3]||(e[3]=[t("strong",null,"Settings → Claude Code (MCP)",-1),o(" shows the command and the ",-1),t("code",null,".mcp.json",-1),o(" entry with the URL your browser actually reached Jeffrey on — correct behind a container, a proxy or a non-default port, where ",-1),t("code",null,"localhost:8585",-1),o(" is not. ",-1)])]),_:1}),e[17]||(e[17]=t("h2",{id:"what-you-give-up"},"What You Give Up",-1)),e[18]||(e[18]=t("p",null,[o("The same forty-three tools, named "),t("code",null,"mcp__jeffrey__*"),o(" rather than "),t("code",null,"mcp__plugin_microscope_jeffrey__*"),o(" — a hand-registered server is not namespaced by a plugin. Adjust any "),t("code",null,"/permissions"),o(" rule accordingly.")],-1)),t("p",null,[e[5]||(e[5]=o("What does not come along is the ",-1)),a(l,{to:"/docs/microscope-mcp/skills"},{default:d(()=>[...e[4]||(e[4]=[o("skills",-1)])]),_:1}),e[6]||(e[6]=o(": the entry sequence and the two database schemas. The tools still work; the model just starts colder, and is more likely to guess a column name than to call ",-1)),e[7]||(e[7]=t("code",null,"jfr_describeTable",-1)),e[8]||(e[8]=o(" first.",-1))]),e[19]||(e[19]=f('<h2 id="the-wire-protocol" data-v-12e74d0a>The Wire Protocol</h2><p data-v-12e74d0a>For a client that is not Claude Code, the endpoint is plain <strong data-v-12e74d0a>JSON-RPC 2.0 over HTTP POST</strong>. No SSE stream, no session header, no handshake beyond what the protocol requires.</p><table data-v-12e74d0a><thead data-v-12e74d0a><tr data-v-12e74d0a><th data-v-12e74d0a>Method</th><th data-v-12e74d0a>Purpose</th></tr></thead><tbody data-v-12e74d0a><tr data-v-12e74d0a><td data-v-12e74d0a><code data-v-12e74d0a>initialize</code></td><td data-v-12e74d0a>Negotiates the protocol version and returns <code data-v-12e74d0a>serverInfo</code></td></tr><tr data-v-12e74d0a><td data-v-12e74d0a><code data-v-12e74d0a>tools/list</code></td><td data-v-12e74d0a>Every tool with its description and JSON-Schema input</td></tr><tr data-v-12e74d0a><td data-v-12e74d0a><code data-v-12e74d0a>tools/call</code></td><td data-v-12e74d0a>Runs one tool; the result is text content</td></tr><tr data-v-12e74d0a><td data-v-12e74d0a><code data-v-12e74d0a>ping</code></td><td data-v-12e74d0a>Liveness</td></tr><tr data-v-12e74d0a><td data-v-12e74d0a><code data-v-12e74d0a>notifications/*</code></td><td data-v-12e74d0a>Accepted and acknowledged with no body, per JSON-RPC</td></tr></tbody></table><p data-v-12e74d0a>The default protocol version is <code data-v-12e74d0a>2025-06-18</code>; a version the client asks for is echoed back.</p><h2 id="a-session-by-hand" data-v-12e74d0a>A Session by Hand</h2><p data-v-12e74d0a>Everything below works with <code data-v-12e74d0a>curl</code>, which makes it a good way to check that the server is up before blaming a client.</p><p data-v-12e74d0a><strong data-v-12e74d0a>Initialize:</strong></p>',7)),a(n,{code:P,language:"bash"}),a(n,{code:k,language:"json"}),e[20]||(e[20]=t("p",null,[o("Then "),t("code",null,"tools/list"),o(" with the same envelope returns all forty-three specs. To run one:")],-1)),a(n,{code:S,language:"bash"}),e[21]||(e[21]=t("p",null,"The result arrives as MCP text content — for the export tools, the same Markdown document the plugin would hand to Claude, preamble included.",-1)),e[22]||(e[22]=t("h2",{id:"errors"},"Errors",-1)),e[23]||(e[23]=t("p",null,[o("Everything answers HTTP "),t("code",null,"200"),o(". There are two distinct failure shapes, and a client has to read both.")],-1)),e[24]||(e[24]=t("p",null,[t("strong",null,"A tool that failed"),o(" is still a "),t("em",null,"successful"),o(" JSON-RPC call: the result carries "),t("code",null,"isError: true"),o(" and the message as text content. An unknown tool name, a bad argument, and a profile with no heap dump all land here.")],-1)),a(n,{code:x,language:"json"}),e[25]||(e[25]=t("p",null,"This is what MCP specifies, and it is deliberate — the message is written for a model to act on. A profile with no heap dump, for instance, names the families to use instead.",-1)),e[26]||(e[26]=t("p",null,[t("strong",null,"A protocol-level failure"),o(" is a real JSON-RPC error object:")],-1)),a(n,{code:E,language:"json"}),e[27]||(e[27]=t("ul",null,[t("li",null,[t("code",null,"-32601"),o(" — unknown method")]),t("li",null,[t("code",null,"-32602"),o(" — invalid params, rejected before the tool ran")]),t("li",null,[t("code",null,"-32603"),o(" — an internal failure outside the tool call")])],-1)),t("p",null,[e[10]||(e[10]=o("An HTTP ",-1)),e[11]||(e[11]=t("code",null,"404",-1)),e[12]||(e[12]=o(" on the endpoint itself is a third thing again: it means this installation switched the server off, not that the request was wrong. See ",-1)),a(l,{to:"/docs/microscope-mcp/enabling"},{default:d(()=>[...e[9]||(e[9]=[o("Enabling the Server",-1)])]),_:1}),e[13]||(e[13]=o(".",-1))])]),a(p)])}}}),z=w(N,[["__scopeId","data-v-12e74d0a"]]);export{z as default};
