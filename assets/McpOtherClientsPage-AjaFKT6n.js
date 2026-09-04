import{D as i}from"./DocsCallout-Dr3AwuyK.js";import{D as n}from"./DocsCodeBlock-CTtKWQgH.js";import{D as p}from"./DocsNavFooter-CWioXFF1.js";import{D as u}from"./DocsPageHeader-BwAxOln0.js";import{u as c}from"./useDocHeadings-2E1-EMwL.js";import{d as b,k as h,c as m,e as a,a as e,j as o,w as d,b as v,i as f,o as g}from"./index-BbCjQtSM.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"docs-article"},C={class:"docs-content"},j="claude mcp add --transport http jeffrey http://localhost:8585/api/internal/mcp",T=`{
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
}`,N=b({__name:"McpOtherClientsPage",setup(O){const{setHeadings:r}=c(),s=[{id:"claude-code-without-the-plugin",text:"Claude Code, Without the Plugin",level:2},{id:"what-you-give-up",text:"What You Give Up",level:2},{id:"the-wire-protocol",text:"The Wire Protocol",level:2},{id:"a-session-by-hand",text:"A Session by Hand",level:2},{id:"errors",text:"Errors",level:2}];return h(()=>{r(s)}),(A,t)=>{const l=f("router-link");return g(),m("article",w,[a(u,{title:"Other Clients",icon:"bi bi-terminal-split"}),e("div",C,[e("p",null,[t[1]||(t[1]=o("The ",-1)),a(l,{to:"/docs/microscope-mcp/plugin"},{default:d(()=>[...t[0]||(t[0]=[o("plugin",-1)])]),_:1}),t[2]||(t[2]=o(" is a convenience over an ordinary MCP server. Anything that speaks MCP over Streamable HTTP can connect instead.",-1))]),t[14]||(t[14]=e("h2",{id:"claude-code-without-the-plugin"},"Claude Code, Without the Plugin",-1)),t[15]||(t[15]=e("p",null,"Register the server directly — useful when you want it in one project only, or when you would rather not add a marketplace:",-1)),a(n,{code:j,language:"bash"}),t[16]||(t[16]=e("p",null,[o("Or write it into a project’s "),e("code",null,".mcp.json"),o(":")],-1)),a(n,{code:T,language:"json"}),a(i,{type:"tip",title:"Both are offered ready-made"},{default:d(()=>[...t[3]||(t[3]=[e("strong",null,"Settings → Claude Code (MCP)",-1),o(" shows the command and the ",-1),e("code",null,".mcp.json",-1),o(" entry with the URL your browser actually reached Jeffrey on — correct behind a container, a proxy or a non-default port, where ",-1),e("code",null,"localhost:8585",-1),o(" is not. ",-1)])]),_:1}),t[17]||(t[17]=e("h2",{id:"what-you-give-up"},"What You Give Up",-1)),t[18]||(t[18]=e("p",null,[o("The same fifty-five tools, named "),e("code",null,"mcp__jeffrey__*"),o(" rather than "),e("code",null,"mcp__plugin_microscope_jeffrey__*"),o(" — a hand-registered server is not namespaced by a plugin. Adjust any "),e("code",null,"/permissions"),o(" rule accordingly.")],-1)),e("p",null,[t[5]||(t[5]=o("What does not come along is the ",-1)),a(l,{to:"/docs/microscope-mcp/skills"},{default:d(()=>[...t[4]||(t[4]=[o("skills",-1)])]),_:1}),t[6]||(t[6]=o(": the entry sequence and the two database schemas. The tools still work; the model just starts colder, and is more likely to guess a column name than to call ",-1)),t[7]||(t[7]=e("code",null,"jfr_describeTable",-1)),t[8]||(t[8]=o(" first.",-1))]),t[19]||(t[19]=v('<h2 id="the-wire-protocol" data-v-4acbd6b2>The Wire Protocol</h2><p data-v-4acbd6b2>For a client that is not Claude Code, the endpoint is plain <strong data-v-4acbd6b2>JSON-RPC 2.0 over HTTP POST</strong>. No SSE stream, no session header, no handshake beyond what the protocol requires.</p><table data-v-4acbd6b2><thead data-v-4acbd6b2><tr data-v-4acbd6b2><th data-v-4acbd6b2>Method</th><th data-v-4acbd6b2>Purpose</th></tr></thead><tbody data-v-4acbd6b2><tr data-v-4acbd6b2><td data-v-4acbd6b2><code data-v-4acbd6b2>initialize</code></td><td data-v-4acbd6b2>Negotiates the protocol version and returns <code data-v-4acbd6b2>serverInfo</code></td></tr><tr data-v-4acbd6b2><td data-v-4acbd6b2><code data-v-4acbd6b2>tools/list</code></td><td data-v-4acbd6b2>Every tool with its description and JSON-Schema input</td></tr><tr data-v-4acbd6b2><td data-v-4acbd6b2><code data-v-4acbd6b2>tools/call</code></td><td data-v-4acbd6b2>Runs one tool; the result is text content</td></tr><tr data-v-4acbd6b2><td data-v-4acbd6b2><code data-v-4acbd6b2>ping</code></td><td data-v-4acbd6b2>Liveness</td></tr><tr data-v-4acbd6b2><td data-v-4acbd6b2><code data-v-4acbd6b2>notifications/*</code></td><td data-v-4acbd6b2>Accepted and acknowledged with no body, per JSON-RPC</td></tr></tbody></table><p data-v-4acbd6b2>The default protocol version is <code data-v-4acbd6b2>2025-06-18</code>; a version the client asks for is echoed back.</p><h2 id="a-session-by-hand" data-v-4acbd6b2>A Session by Hand</h2><p data-v-4acbd6b2>Everything below works with <code data-v-4acbd6b2>curl</code>, which makes it a good way to check that the server is up before blaming a client.</p><p data-v-4acbd6b2><strong data-v-4acbd6b2>Initialize:</strong></p>',7)),a(n,{code:P,language:"bash"}),a(n,{code:k,language:"json"}),t[20]||(t[20]=e("p",null,[o("Then "),e("code",null,"tools/list"),o(" with the same envelope returns all fifty-five specs. To run one:")],-1)),a(n,{code:S,language:"bash"}),t[21]||(t[21]=e("p",null,"The result arrives as MCP text content — for the export tools, the same Markdown document the plugin would hand to Claude, preamble included.",-1)),t[22]||(t[22]=e("h2",{id:"errors"},"Errors",-1)),t[23]||(t[23]=e("p",null,[o("Everything answers HTTP "),e("code",null,"200"),o(". There are two distinct failure shapes, and a client has to read both.")],-1)),t[24]||(t[24]=e("p",null,[e("strong",null,"A tool that failed"),o(" is still a "),e("em",null,"successful"),o(" JSON-RPC call: the result carries "),e("code",null,"isError: true"),o(" and the message as text content. An unknown tool name, a bad argument, and a profile with no heap dump all land here.")],-1)),a(n,{code:x,language:"json"}),t[25]||(t[25]=e("p",null,"This is what MCP specifies, and it is deliberate — the message is written for a model to act on. A profile with no heap dump, for instance, names the families to use instead.",-1)),t[26]||(t[26]=e("p",null,[e("strong",null,"A protocol-level failure"),o(" is a real JSON-RPC error object:")],-1)),a(n,{code:E,language:"json"}),t[27]||(t[27]=e("ul",null,[e("li",null,[e("code",null,"-32601"),o(" — unknown method")]),e("li",null,[e("code",null,"-32602"),o(" — invalid params, rejected before the tool ran")]),e("li",null,[e("code",null,"-32603"),o(" — an internal failure outside the tool call")])],-1)),e("p",null,[t[10]||(t[10]=o("An HTTP ",-1)),t[11]||(t[11]=e("code",null,"404",-1)),t[12]||(t[12]=o(" on the endpoint itself is a third thing again: it means this installation switched the server off, not that the request was wrong. See ",-1)),a(l,{to:"/docs/microscope-mcp/enabling"},{default:d(()=>[...t[9]||(t[9]=[o("Enabling the Server",-1)])]),_:1}),t[13]||(t[13]=o(".",-1))])]),a(p)])}}}),z=y(N,[["__scopeId","data-v-4acbd6b2"]]);export{z as default};
