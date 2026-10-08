import{D as i}from"./DocsCallout-Cxjq1_9g.js";import{D as d}from"./DocsCodeBlock-Df5DFoqg.js";import{D as T}from"./DocsNavFooter-Bztq5wZ8.js";import{D as x}from"./DocsPageHeader-CLxlc9Sl.js";import{u as j}from"./useDocHeadings-CqNcTES0.js";import{d as M,k as P,c as I,e as a,a as o,j as t,w as s,b as n,i as q,o as S}from"./index-BX0bsctw.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const H={class:"docs-article"},E={class:"docs-content"},O=`git clone https://github.com/petrbouda/jeffrey
# the plugin directory is ./jeffrey/jeffrey-claude-plugin`,N=`{
  "servers": {
    "jeffrey": {
      "type": "http",
      "url": "http://localhost:8585/api/mcp"
    }
  }
}`,R=`# Claude Code on its v2 MCP runtime (MCP_SDK_GENERATION=v2 where that is not the default)
claude mcp add --transport http jeffrey http://localhost:8585/api/mcp

# Codex v0.147.0 or later, with the global feature flag [features] mcp_2026_07_28 = true
# (or codex --enable mcp_2026_07_28; applies to every HTTP server, under development in Codex)
codex mcp add jeffrey --url http://localhost:8585/api/mcp`,J=`{
  "mcpServers": {
    "jeffrey": {
      "type": "http",
      "url": "http://localhost:8585/api/mcp"
    }
  }
}`,l=`"_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {}
      }`,D=`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": { "listChanged": false },
      "prompts": { "listChanged": false },
      "resources": { "subscribe": false, "listChanged": false },
      "completions": {},
      "extensions": {
        "io.modelcontextprotocol/tasks": {},
        "io.modelcontextprotocol/skills": {}
      }
    },
    "instructions": "Jeffrey Microscope analyses JVM recordings ... Start here. Call profiles_list ...",
    "resultType": "complete",
    "ttlMs": 3600000,
    "cacheScope": "public",
    "_meta": {
      "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "<application-build-version>" }
    }
  }
}`,V=`{
  "jsonrpc": "2.0",
  "id": 8,
  "result": {
    "skills": [
      {
        "uri": "skill://report/SKILL.md",
        "frontmatter": { "name": "report", "description": "The shape and the evidence rules ..." },
        "resources": [
          { "uri": "skill://report/SKILL.md", "digest": "sha256:...", "size": 13646 },
          { "uri": "skill://report/references/tool-prefixes.md", "digest": "sha256:...", "size": 715 }
        ]
      }
    ],
    "resultType": "complete",
    "ttlMs": 3600000,
    "cacheScope": "public",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "<application-build-version>" } }
  }
}`,c=`"_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {
          "extensions": { "io.modelcontextprotocol/tasks": {} }
        }
      }`,L=`{
  "jsonrpc": "2.0",
  "id": 6,
  "result": {
    "taskId": "5f0c1d7e-...",
    "status": "working",
    "statusMessage": "analyzing",
    "createdAt": "2026-09-26T09:14:03.120Z",
    "lastUpdatedAt": "2026-09-26T09:14:03.120Z",
    "ttlMs": 3600000,
    "pollIntervalMs": 5000,
    "resultType": "task",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
  }
}`,U=`{
  "jsonrpc": "2.0",
  "id": 7,
  "result": {
    "taskId": "5f0c1d7e-...",
    "status": "completed",
    "createdAt": "2026-09-26T09:14:03.120Z",
    "lastUpdatedAt": "2026-09-26T09:15:41.806Z",
    "ttlMs": 3600000,
    "pollIntervalMs": 5000,
    "result": {
      "content": [ { "type": "text", "text": "{\\"status\\":\\"READY\\",\\"recordingId\\":\\"0195f0a1-...\\",\\"profileId\\":\\"0195f0a2-...\\", ...}" } ],
      "structuredContent": {
        "status": "READY",
        "recordingId": "0195f0a1-...",
        "profileId": "0195f0a2-...",
        "name": "app.jfr",
        "reused": false,
        ...
        "uiLink": "http://localhost:8585/profiles/0195f0a2-..."
      },
      "isError": false,
      "resultType": "complete",
      "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
    },
    "resultType": "complete",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
  }
}`,p=`"_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": { "form": {} }
        }
      }`,z=`{
  "jsonrpc": "2.0",
  "id": 10,
  "result": {
    "inputRequests": {
      "confirmDeletion": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Delete recording app.jfr (0195f0a1-...) and the profile 0195f0a2-... built from it, with everything analysed out of it? This cannot be undone here. A copy of the recording on a Jeffrey Hub is untouched, and hubs_download can pull it again.",
          "requestedSchema": {
            "type": "object",
            "properties": {
              "confirm": {
                "type": "boolean",
                "default": false,
                "title": "Delete this recording",
                "description": "Check to delete the recording and everything analysed out of it"
              }
            },
            "required": ["confirm"]
          }
        }
      }
    },
    "resultType": "input_required",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
  }
}`,W=`{
  "jsonrpc": "2.0",
  "id": 11,
  "result": {
    "content": [
      { "type": "text", "text": "{\\"status\\":\\"DELETED\\",\\"recordingId\\":\\"0195f0a1-...\\",\\"name\\":\\"app.jfr\\",\\"profileId\\":\\"0195f0a2-...\\",\\"reason\\":null,\\"uiLink\\":\\"http://localhost:8585/recordings\\"}" }
    ],
    "structuredContent": {
      "status": "DELETED",
      "recordingId": "0195f0a1-...",
      "name": "app.jfr",
      "profileId": "0195f0a2-...",
      "reason": null,
      "uiLink": "http://localhost:8585/recordings"
    },
    "isError": false,
    "resultType": "complete",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
  }
}`,G=`{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      { "type": "text", "text": "Error: Profile 0195f0a2-... has no heap dump. ..." }
    ],
    "isError": true,
    "resultType": "complete",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "..." } }
  }
}`,K=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{}}}'`,X=`HTTP/1.1 400
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "This server speaks MCP 2026-07-28 only; send per-request _meta (see server/discover)",
    "data": { "supported": ["2026-07-28"], "requested": null }
  }
}`,B="An MCP client sent a request this server cannot speak: code=-32602 message=This server speaks MCP 2026-07-28 only; send per-request _meta (see server/discover)",F=`HTTP/1.1 404
{
  "jsonrpc": "2.0",
  "id": 9,
  "error": { "code": -32601, "message": "Method not found: tools/nope" }
}`,$=M({__name:"McpOtherClientsPage",setup(Y){const{setHeadings:v}=j(),u=[{id:"agent-plugins-clients",text:"Agent Plugins Clients",level:2},{id:"cursor",text:"Cursor",level:3},{id:"vs-code-and-github-copilot",text:"VS Code and GitHub Copilot",level:3},{id:"kiro",text:"Kiro",level:3},{id:"any-mcp-client",text:"Any MCP Client",level:2},{id:"what-you-give-up",text:"What You Give Up",level:2},{id:"prompts-skills-and-resources",text:"Prompts, Skills and Resources",level:2},{id:"the-wire-protocol",text:"The Wire Protocol",level:2},{id:"tasks",text:"Tasks",level:3},{id:"input-requests",text:"Input Requests",level:3},{id:"what-an-older-client-sees",text:"What an Older Client Sees",level:3},{id:"instructions-and-completions",text:"Instructions and Completions",level:2},{id:"a-session-by-hand",text:"A Session by Hand",level:2},{id:"errors",text:"Errors",level:2}];P(()=>{v(u)});const b=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: server/discover' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "server/discover",
    "params": {
      ${l}
    }
  }'`,h=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: tools/call' \\
  -H 'Mcp-Name: flamegraph_export' \\
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
      },
      ${l}
    }
  }'`,m=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: prompts/get' \\
  -H 'Mcp-Name: analyze-jfr' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "prompts/get",
    "params": {
      "name": "analyze-jfr",
      ${l}
    }
  }'`,f=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: skills/list' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 8,
    "method": "skills/list",
    "params": {
      ${l}
    }
  }'`,g=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: resources/read' \\
  -H 'Mcp-Name: jeffrey://profiles' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "resources/read",
    "params": {
      "uri": "jeffrey://profiles",
      ${l}
    }
  }'`,y=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: tools/call' \\
  -H 'Mcp-Name: recordings_analyzeFile' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 6,
    "method": "tools/call",
    "params": {
      "name": "recordings_analyzeFile",
      "arguments": { "path": "/home/dev/project/target/app.jfr" },
      ${c}
    }
  }'`,w=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: tasks/get' \\
  -H 'Mcp-Name: 5f0c1d7e-...' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 7,
    "method": "tasks/get",
    "params": {
      "taskId": "5f0c1d7e-...",
      ${c}
    }
  }'`,k=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: tools/call' \\
  -H 'Mcp-Name: recordings_delete' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 10,
    "method": "tools/call",
    "params": {
      "name": "recordings_delete",
      "arguments": { "recordingId": "0195f0a1-..." },
      ${p}
    }
  }'`,C=`curl -s -X POST http://localhost:8585/api/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2026-07-28' \\
  -H 'Mcp-Method: tools/call' \\
  -H 'Mcp-Name: recordings_delete' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 11,
    "method": "tools/call",
    "params": {
      "name": "recordings_delete",
      "arguments": { "recordingId": "0195f0a1-..." },
      "inputResponses": {
        "confirmDeletion": { "action": "accept", "content": { "confirm": true } }
      },
      ${p}
    }
  }'`;return(Z,e)=>{const r=q("router-link");return S(),I("article",H,[a(x,{title:"Other Clients",icon:"bi bi-terminal-split"}),o("div",E,[o("p",null,[e[3]||(e[3]=t("The plugin — in ",-1)),a(r,{to:"/docs/microscope-mcp/claude-code"},{default:s(()=>[...e[0]||(e[0]=[t("Claude Code",-1)])]),_:1}),e[4]||(e[4]=t(", ",-1)),a(r,{to:"/docs/microscope-mcp/codex"},{default:s(()=>[...e[1]||(e[1]=[t("Codex",-1)])]),_:1}),e[5]||(e[5]=t(" or ",-1)),a(r,{to:"/docs/microscope-mcp/gemini"},{default:s(()=>[...e[2]||(e[2]=[t("Gemini CLI",-1)])]),_:1}),e[6]||(e[6]=t(" — is a convenience over an ordinary MCP server. Anything that speaks MCP ",-1)),e[7]||(e[7]=o("code",null,"2026-07-28",-1)),e[8]||(e[8]=t(" over Streamable HTTP can connect instead.",-1))]),a(i,{type:"warning",title:"MCP 2026-07-28 only"},{default:s(()=>[...e[9]||(e[9]=[t(" Jeffrey works with any client that speaks MCP ",-1),o("code",null,"2026-07-28",-1),t(" over Streamable HTTP. A client that opens with ",-1),o("code",null,"initialize",-1),t(" is refused with ",-1),o("code",null,"-32602",-1),t(" naming ",-1),o("code",null,"2026-07-28",-1),t(" — see ",-1),o("a",{href:"#what-an-older-client-sees"},"What an Older Client Sees",-1),t(". Everything below about Cursor, VS Code and Kiro applies once the client supports MCP ",-1),o("code",null,"2026-07-28",-1),t("; check your client’s release notes for that, since this page cannot track it. ",-1)])]),_:1}),e[124]||(e[124]=n('<h2 id="agent-plugins-clients" data-v-962898be>Agent Plugins Clients</h2><p data-v-962898be>The plugin carries an <a href="https://agent-plugins.org/" target="_blank" rel="noopener" data-v-962898be>Agent Plugins</a> manifest, the vendor-neutral format <strong data-v-962898be>Cursor</strong>, <strong data-v-962898be>GitHub Copilot</strong>, <strong data-v-962898be>VS Code</strong> and <strong data-v-962898be>Kiro</strong> read alongside Codex. Where a client installs a plugin from a directory, <code data-v-962898be>jeffrey-claude-plugin/</code> in a clone is that directory:</p>',2)),a(d,{code:O,language:"bash"}),o("p",null,[e[11]||(e[11]=t("What is standardised is the manifest, the ten skills and the ",-1)),e[12]||(e[12]=o("code",null,"streamable-http",-1)),e[13]||(e[13]=t(" server entry. Everything past that — how a plugin is browsed and installed, how skills are invoked, how tools are approved — is the client's own, and moves faster than this page can. The ",-1)),a(r,{to:"/docs/microscope-mcp/codex"},{default:s(()=>[...e[10]||(e[10]=[t("Codex",-1)])]),_:1}),e[14]||(e[14]=t(" page is the closest map, since it documents the same portable half in detail.",-1))]),e[125]||(e[125]=o("p",null,[t("None of them can carry the three agents, for the reason that page gives: Agent Plugins defines skills and MCP servers, and nothing else. And in all of them the endpoint is fixed at "),o("code",null,"localhost:8585"),t(", because the format forbids placeholder expansion in a server URL — a Jeffrey anywhere else is registered by hand, as below.")],-1)),a(i,{type:"info",title:"Gemini CLI is not one of them"},{default:s(()=>[e[16]||(e[16]=t(" It cannot connect to this Jeffrey until it supports MCP ",-1)),e[17]||(e[17]=o("code",null,"2026-07-28",-1)),e[18]||(e[18]=t(". It reads its own extension format rather than this manifest, and takes more from the package than these clients can — the skills, the session-start check, and an endpoint you can point elsewhere. It has a ",-1)),a(r,{to:"/docs/microscope-mcp/gemini"},{default:s(()=>[...e[15]||(e[15]=[t("page of its own",-1)])]),_:1}),e[19]||(e[19]=t(". Its ",-1)),e[20]||(e[20]=o("code",null,"mcpServers",-1)),e[21]||(e[21]=t(" entry also spells the endpoint its own way: ",-1)),e[22]||(e[22]=o("code",null,"httpUrl",-1)),e[23]||(e[23]=t(", or ",-1)),e[24]||(e[24]=o("code",null,"url",-1)),e[25]||(e[25]=t(" with ",-1)),e[26]||(e[26]=o("code",null,'"type": "http"',-1)),e[27]||(e[27]=t(" — which is what its own ",-1)),e[28]||(e[28]=o("code",null,"gemini mcp add --transport http",-1)),e[29]||(e[29]=t(" writes. ",-1))]),_:1}),e[126]||(e[126]=n('<h3 id="cursor" data-v-962898be>Cursor</h3><p data-v-962898be>Install the plugin from the cloned directory through Cursor&#39;s plugin browser. Without it, add the server to Cursor&#39;s MCP configuration — <code data-v-962898be>~/.cursor/mcp.json</code> for every project, <code data-v-962898be>.cursor/mcp.json</code> for one — using the <code data-v-962898be>mcpServers</code> entry from <a href="#any-mcp-client" data-v-962898be>Any MCP Client</a> below. The tools then appear as <code data-v-962898be>jeffrey</code> in Cursor&#39;s MCP settings, one toggle per tool.</p><h3 id="vs-code-and-github-copilot" data-v-962898be>VS Code and GitHub Copilot</h3><p data-v-962898be>Copilot&#39;s agent mode reads MCP servers from <code data-v-962898be>.vscode/mcp.json</code> in the workspace, or from your user settings for every workspace. The shape differs slightly from the one Claude Code uses — the key is <code data-v-962898be>servers</code>:</p>',4)),a(d,{code:N,language:"json"}),e[127]||(e[127]=n('<p data-v-962898be>Check it in and everyone working in that repository gets the same Jeffrey, assuming they run one. The command palette&#39;s <em data-v-962898be>MCP: List Servers</em> shows whether it connected.</p><h3 id="kiro" data-v-962898be>Kiro</h3><p data-v-962898be>Kiro reads MCP servers from <code data-v-962898be>.kiro/settings/mcp.json</code> in the workspace or <code data-v-962898be>~/.kiro/settings/mcp.json</code> for every workspace, in the same <code data-v-962898be>mcpServers</code> shape as <a href="#any-mcp-client" data-v-962898be>below</a>. Its autoApprove list is the equivalent of the approval rules the plugin pages describe: naming the read-only tools there stops it asking each time.</p><h2 id="any-mcp-client" data-v-962898be>Any MCP Client</h2><p data-v-962898be>Register the server directly — useful when you want it in one project only, or when you would rather not add a marketplace:</p>',5)),a(d,{code:R,language:"bash"}),e[128]||(e[128]=o("p",null,[t("Or write it into a project’s "),o("code",null,".mcp.json"),t(":")],-1)),a(d,{code:J,language:"json"}),a(i,{type:"tip",title:"Both are offered ready-made"},{default:s(()=>[...e[30]||(e[30]=[t(" Build each of them around the address you actually reach Jeffrey on — behind a container, a proxy or a non-default port, ",-1),o("code",null,"localhost:8585",-1),t(" is not it. ",-1)])]),_:1}),e[129]||(e[129]=o("h2",{id:"what-you-give-up"},"What You Give Up",-1)),e[130]||(e[130]=o("p",null,[t("The same hundred and eleven tools, named "),o("code",null,"mcp__jeffrey__*"),t(" rather than the "),o("code",null,"mcp__plugin_microscope_jeffrey__*"),t(" Claude Code gives a plugin's server — a hand-registered server is not namespaced by a plugin. Adjust any approval rule accordingly: "),o("code",null,"/permissions"),t(" in Claude Code, the "),o("code",null,"[mcp_servers.jeffrey]"),t(" block in Codex.")],-1)),o("p",null,[e[32]||(e[32]=t("What does not come along as ",-1)),e[33]||(e[33]=o("em",null,"plugin",-1)),e[34]||(e[34]=t(" skills is the guidance: the entry sequence and the two database schemas. But it is not lost. The server offers the same files over the protocol twice: as ",-1)),e[35]||(e[35]=o("strong",null,"skills",-1)),e[36]||(e[36]=t(", through the MCP skills extension, so a client that speaks ",-1)),e[37]||(e[37]=o("code",null,"2026-07-28",-1)),e[38]||(e[38]=t(" with that extension gets all ten from the server and loads them as it would a plugin’s; and as ",-1)),e[39]||(e[39]=o("strong",null,"prompts",-1)),e[40]||(e[40]=t(", so a client that only speaks ",-1)),e[41]||(e[41]=o("code",null,"prompts/list",-1)),e[42]||(e[42]=t(" can still load any of them — see below. What is genuinely missing is the ",-1)),a(r,{to:"/docs/microscope-mcp/agent"},{default:s(()=>[...e[31]||(e[31]=[t("agents",-1)])]),_:1}),e[43]||(e[43]=t(", which no MCP server can provide, and, over prompts, the automatic loading: somebody has to ask for the prompt.",-1))]),e[131]||(e[131]=n('<h2 id="prompts-skills-and-resources" data-v-962898be>Prompts, Skills and Resources</h2><p data-v-962898be>Three capabilities beyond the tools, and they exist for exactly this page’s readers.</p><p data-v-962898be>Every call on this page is a complete MCP <code data-v-962898be>2026-07-28</code> request: the version and the client’s capabilities in <code data-v-962898be>params._meta</code>, repeated in the <code data-v-962898be>MCP-Protocol-Version</code> and <code data-v-962898be>Mcp-Method</code> headers, plus <code data-v-962898be>Mcp-Name</code> for the methods that name something. <a href="#the-wire-protocol" data-v-962898be>The Wire Protocol</a> explains each.</p><p data-v-962898be><strong data-v-962898be>Prompts</strong> are the plugin’s skills, served over the protocol. <code data-v-962898be>prompts/list</code> names them — <code data-v-962898be>analyze-jfr</code>, <code data-v-962898be>analyze-heap</code>, <code data-v-962898be>analyze-hub</code>, <code data-v-962898be>compare-jfr</code>, <code data-v-962898be>advise-jfr</code>, <code data-v-962898be>profile-run</code>, <code data-v-962898be>regression-check</code>, <code data-v-962898be>jfr-sql</code>, <code data-v-962898be>heap-sql</code>, <code data-v-962898be>report</code> — and <code data-v-962898be>prompts/get</code> returns one as a message to insert. They are the same files the plugin ships, copied onto the server’s classpath when it is built, so they cannot drift from what a Claude Code or Codex user gets.</p>',4)),a(d,{code:m,language:"bash"}),e[132]||(e[132]=n("<p data-v-962898be><strong data-v-962898be>Skills</strong> are the same ten files as Agent Skills, over the <code data-v-962898be>io.modelcontextprotocol/skills</code> extension, which <code data-v-962898be>server/discover</code> lists under <code data-v-962898be>capabilities.extensions</code>. <code data-v-962898be>skills/list</code> returns every skill (the answer below is cut to one of the ten) with its front matter exactly as written and its complete manifest: each file’s <code data-v-962898be>skill://</code> URI, a <code data-v-962898be>sha256</code> digest over its bytes, and its size. <code data-v-962898be>skills/get</code> returns one, named by the URI of its <code data-v-962898be>SKILL.md</code>, and each file is read with the ordinary <code data-v-962898be>resources/read</code>. A client loads them the way it loads a plugin’s skills, from the descriptions, without anybody asking. Every skill is self-contained — nothing in one points into another — so a client that reads only what a manifest lists reads everything the skill uses. An unknown skill or file is <code data-v-962898be>-32602</code>.</p>",1)),a(d,{code:f,language:"bash"}),a(d,{code:V,language:"json"}),e[133]||(e[133]=n("<p data-v-962898be><strong data-v-962898be>Resources</strong> are the parts of a profile a client can attach rather than call for. <code data-v-962898be>jeffrey://profiles</code> is the catalogue; <code data-v-962898be>resources/templates/list</code> offers <code data-v-962898be>jeffrey://profile/{profileId}/summary</code>, <code data-v-962898be>jeffrey://profile/{profileId}/flamegraph/{eventType}</code>, <code data-v-962898be>…/evidence</code>, <code data-v-962898be>…/schema</code> and <code data-v-962898be>…/findings</code>, each while the tool or family that reads the same data is advertised. The distinction is worth the two extra methods: a tool result scrolls away, where a resource a client has attached stays in view and can be referred back to. Reading the summary, evidence or flamegraph template runs the tool that would have answered the same question, so the two never disagree; <code data-v-962898be>…/schema</code> and <code data-v-962898be>…/findings</code> are documents no single tool returns, described below.</p><p data-v-962898be><code data-v-962898be>jeffrey://diagnostics</code> reports profile readiness, bounded Hub connectivity checks and aggregate tool metrics without connection addresses or tool arguments. The <code data-v-962898be>jeffrey://profile/{profileId}/evidence</code> template exposes the same bounded evidence snapshot as <code data-v-962898be>profiles_evidence</code>. <code data-v-962898be>…/schema</code> is the profile database as one JSON document — every table and view, the <code data-v-962898be>events</code> view included, with its columns, the note on the JSON <code data-v-962898be>fields</code> column and each event type with its count — served with the <code data-v-962898be>jfr_</code> family. <code data-v-962898be>…/findings</code> merges every finding the profile already holds — the cached Auto Analysis, the container verdict, the capability gaps — with a <code data-v-962898be>status</code> of <code data-v-962898be>COMPUTED</code>, <code data-v-962898be>NOT_COMPUTED</code> (and a <code data-v-962898be>followUp</code> offering <code data-v-962898be>jvm_autoAnalysis</code> with <code data-v-962898be>compute</code>) or <code data-v-962898be>CANNOT_COMPUTE</code>; it is read from the cache, so reading it never starts the analysis. Each read reflects the current state; attach or save a response when you need a fixed snapshot.</p>",2)),a(d,{code:g,language:"bash"}),e[134]||(e[134]=o("p",null,[o("code",null,"jeffrey://profiles"),t(" returns the first catalogue page and provides a continuation URI when more profiles match. The "),o("code",null,"jeffrey://profiles{?cursor,limit}"),t(" template continues it. "),o("code",null,"jeffrey://server"),t(" reports the build version, effective tool families and count, and supported protocol capabilities. It contains no raw configuration, local paths or Hub addresses.")],-1)),o("p",null,[e[46]||(e[46]=n("Every tool but <code data-v-962898be>ide_source</code> declares an <code data-v-962898be>outputSchema</code> — 110 of the 111 — and <code data-v-962898be>tools/call</code> always returns <code data-v-962898be>structuredContent</code> valid against it, beside the text: the same record as JSON, or Markdown ending in a footer (<code data-v-962898be>Open in Microscope: …</code> and a <code data-v-962898be>Next:</code> list, each call ending in its weight) for the documents written to be read. There is no text-only variant for older clients, because there are no older clients. Each tool’s <code data-v-962898be>_meta</code> also carries <code data-v-962898be>jeffrey/cost</code> and, where it applies, <code data-v-962898be>jeffrey/requires</code>; the ",19)),a(r,{to:"/docs/microscope-mcp/tools#answers"},{default:s(()=>[...e[44]||(e[44]=[t("Tool Reference",-1)])]),_:1}),e[47]||(e[47]=t(" explains both and the conventions every answer follows — epoch-millisecond time, upper-case enums, ",-1)),e[48]||(e[48]=o("code",null,"status",-1)),e[49]||(e[49]=t(" instead of an error for a question with no data, cursor paging, ",-1)),e[50]||(e[50]=o("code",null,"followUp",-1)),e[51]||(e[51]=t(" and ",-1)),e[52]||(e[52]=o("code",null,"uiLink",-1)),e[53]||(e[53]=t(". Every next call an answer offers carries a ",-1)),a(r,{to:"/docs/microscope-mcp/tools#weight"},{default:s(()=>[...e[45]||(e[45]=[o("code",null,"weight",-1)])]),_:1}),e[54]||(e[54]=t(" — ",-1)),e[55]||(e[55]=o("code",null,"LIGHT",-1)),e[56]||(e[56]=t(", ",-1)),e[57]||(e[57]=o("code",null,"MEDIUM",-1)),e[58]||(e[58]=t(" or ",-1)),e[59]||(e[59]=o("code",null,"HEAVY",-1)),e[60]||(e[60]=t(", what its answer puts into the conversation — derived from those hints rather than declared as a key of its own.",-1))]),e[135]||(e[135]=n('<p id="trace-context" data-v-962898be>A request may carry the caller’s W3C trace context as <code data-v-962898be>traceparent</code> and <code data-v-962898be>tracestate</code> in <code data-v-962898be>params._meta</code>; Jeffrey records both verbatim as attributes of the span it keeps for that tool call, beside its own ids, and drops a malformed one without an error.</p><h2 id="the-wire-protocol" data-v-962898be>The Wire Protocol</h2><p data-v-962898be>Whatever the client, the endpoint is plain <strong data-v-962898be>JSON-RPC 2.0 over HTTP POST</strong>, and it speaks exactly one MCP revision: <strong data-v-962898be><code data-v-962898be>2026-07-28</code></strong>, the stateless one. There is no handshake and no session. Every request says for itself which revision it speaks and what the client can do, in <code data-v-962898be>params._meta</code>:</p><ul data-v-962898be><li data-v-962898be><code data-v-962898be>io.modelcontextprotocol/protocolVersion</code> — <code data-v-962898be>&quot;2026-07-28&quot;</code>, required</li><li data-v-962898be><code data-v-962898be>io.modelcontextprotocol/clientCapabilities</code> — an object, required; <code data-v-962898be>{}</code> when the client declares nothing</li><li data-v-962898be><code data-v-962898be>io.modelcontextprotocol/clientInfo</code> — the client’s name and version, optional</li></ul><p data-v-962898be>And three headers repeat what the body says, so a proxy or a server can route and refuse a request without parsing it:</p><ul data-v-962898be><li data-v-962898be><code data-v-962898be>MCP-Protocol-Version: 2026-07-28</code> — on every request, equal to the version in <code data-v-962898be>_meta</code></li><li data-v-962898be><code data-v-962898be>Mcp-Method</code> — on every request, equal to <code data-v-962898be>method</code></li><li data-v-962898be><code data-v-962898be>Mcp-Name</code> — on <code data-v-962898be>tools/call</code> and <code data-v-962898be>prompts/get</code> equal to <code data-v-962898be>params.name</code>, on <code data-v-962898be>resources/read</code> equal to <code data-v-962898be>params.uri</code>, on <code data-v-962898be>tasks/get</code>, <code data-v-962898be>tasks/update</code> and <code data-v-962898be>tasks/cancel</code> equal to <code data-v-962898be>params.taskId</code>. A value that is not plain ASCII is sent as <code data-v-962898be>=?base64?…?=</code></li></ul><p data-v-962898be>Every result says what kind it is in <code data-v-962898be>resultType</code> (<code data-v-962898be>complete</code>; <code data-v-962898be>task</code> when a <code data-v-962898be>tools/call</code> hands back a <a href="#tasks" data-v-962898be>task</a>; <code data-v-962898be>input_required</code> when it <a href="#input-requests" data-v-962898be>asks the user</a> something first) and which server answered in <code data-v-962898be>_meta[&quot;io.modelcontextprotocol/serverInfo&quot;]</code>. The results a client may cache — <code data-v-962898be>server/discover</code>, the list methods, <code data-v-962898be>skills/get</code> and <code data-v-962898be>resources/read</code> — carry <code data-v-962898be>ttlMs</code> and <code data-v-962898be>cacheScope</code>: an hour and <code data-v-962898be>public</code> for the discover, list and skill answers and for reading a skill’s file, which change only with a new Jeffrey build, and <code data-v-962898be>0</code> and <code data-v-962898be>private</code> for reading a <code data-v-962898be>jeffrey://</code> resource, which reflects the catalogue as it is now.</p><p data-v-962898be>A <code data-v-962898be>GET</code> or <code data-v-962898be>DELETE</code> on the endpoint answers <code data-v-962898be>405</code>: there is no server-to-client stream to open and no session to end.</p><table data-v-962898be><thead data-v-962898be><tr data-v-962898be><th data-v-962898be>Method</th><th data-v-962898be>Purpose</th></tr></thead><tbody data-v-962898be><tr data-v-962898be><td data-v-962898be><code data-v-962898be>server/discover</code></td><td data-v-962898be>What the server speaks and offers: <code data-v-962898be>supportedVersions</code>, <code data-v-962898be>capabilities</code> (including <code data-v-962898be>extensions</code>), the <code data-v-962898be>instructions</code>, and <code data-v-962898be>serverInfo</code>. Never assembles the toolset, so it answers even when a tool family cannot be built — which makes it the probe to use for “is Jeffrey up”</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>tools/list</code></td><td data-v-962898be>Every tool with its description, its JSON-Schema input (including <code data-v-962898be>required</code> and <code data-v-962898be>enum</code>), its <code data-v-962898be>outputSchema</code> where it has one, and its <code data-v-962898be>annotations</code></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>tools/call</code></td><td data-v-962898be>Runs one tool; the result is text content, plus <code data-v-962898be>structuredContent</code> for the tools that declare an <code data-v-962898be>outputSchema</code></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>prompts/list</code>, <code data-v-962898be>prompts/get</code></td><td data-v-962898be>The plugin’s skills as prompts — see <a href="#prompts-skills-and-resources" data-v-962898be>above</a></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>skills/list</code>, <code data-v-962898be>skills/get</code></td><td data-v-962898be>The same skills over the skills extension, each with its front matter and manifest; their files are read with <code data-v-962898be>resources/read</code> — see <a href="#prompts-skills-and-resources" data-v-962898be>above</a></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>resources/list</code>, <code data-v-962898be>resources/templates/list</code>, <code data-v-962898be>resources/read</code></td><td data-v-962898be>The catalogue, the per-profile templates, and the content behind a <code data-v-962898be>jeffrey://</code> URI</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>tasks/get</code>, <code data-v-962898be>tasks/update</code>, <code data-v-962898be>tasks/cancel</code></td><td data-v-962898be>Follow and stop a task a <code data-v-962898be>tools/call</code> handed back — only for a client that declared the tasks extension; see <a href="#tasks" data-v-962898be>Tasks</a></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>completion/complete</code></td><td data-v-962898be>Completes <code data-v-962898be>profileId</code> and <code data-v-962898be>baselineProfileId</code> for a prompt argument or a per-profile template, from the live catalogue — see <a href="#completions" data-v-962898be>below</a></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>notifications/*</code></td><td data-v-962898be>Accepted and acknowledged with <code data-v-962898be>202</code> and no body, per JSON-RPC. They still carry <code data-v-962898be>_meta</code> and the headers</td></tr></tbody></table><p data-v-962898be>Nothing else is served. <code data-v-962898be>initialize</code>, <code data-v-962898be>ping</code> and <code data-v-962898be>logging/setLevel</code> do not exist in <code data-v-962898be>2026-07-28</code>, and JSON-RPC batching does not either: a JSON array is refused whole with <code data-v-962898be>-32600</code>.</p><h3 id="tasks" data-v-962898be>Tasks</h3><p data-v-962898be>Jeffrey serves the MCP tasks extension, <code data-v-962898be>io.modelcontextprotocol/tasks</code>, and <code data-v-962898be>server/discover</code> lists it under <code data-v-962898be>capabilities.extensions</code> whenever a family that starts long work is advertised. A client that declares it too — in the <code data-v-962898be>clientCapabilities</code> of each request — is not held for forty-five seconds by a long call. The seven tools that can take a while (<code data-v-962898be>recordings_analyzeFile</code>, <code data-v-962898be>recordings_analyzeRecording</code>, <code data-v-962898be>hubs_download</code>, <code data-v-962898be>hubs_fetchFile</code>, <code data-v-962898be>heap_prepare</code>, <code data-v-962898be>heap_oql</code> with <code data-v-962898be>includeRetainedSize</code> and <code data-v-962898be>jvm_autoAnalysis</code> with <code data-v-962898be>compute</code>) wait about <strong data-v-962898be>five seconds</strong> for it: work that finishes answers directly, and work that does not comes back as a task. <code data-v-962898be>heap_prepare</code> does not wait at all: such a client gets its task at once. A client that did not declare the extension gets what it always got — the forty-five-second wait and an <code data-v-962898be>operationId</code> for <code data-v-962898be>operations_status</code>. Only <code data-v-962898be>tools/call</code> ever answers with a task; Jeffrey decides when, so <code data-v-962898be>tools/list</code> does not change.</p>',12)),a(d,{code:y,language:"bash"}),a(d,{code:L,language:"json"}),e[136]||(e[136]=n("<p data-v-962898be><code data-v-962898be>tasks/get</code> reports where the task stands — <code data-v-962898be>working</code>, <code data-v-962898be>completed</code>, <code data-v-962898be>failed</code> or <code data-v-962898be>cancelled</code> — and, once it has finished, carries the full <code data-v-962898be>tools/call</code> result in <code data-v-962898be>result</code>. <code data-v-962898be>tasks/cancel</code> asks the work to stop and answers straight away; <code data-v-962898be>tasks/get</code> says <code data-v-962898be>cancelled</code> once it has. <code data-v-962898be>tasks/update</code> only confirms the task exists: no tool asks for input in the middle of its work. Each carries the <code data-v-962898be>taskId</code> in <code data-v-962898be>params</code> and in <code data-v-962898be>Mcp-Name</code>.</p>",1)),a(d,{code:w,language:"bash"}),a(d,{code:U,language:"json"}),e[137]||(e[137]=n('<ul data-v-962898be><li data-v-962898be><strong data-v-962898be>The <code data-v-962898be>taskId</code> is the <code data-v-962898be>operationId</code>.</strong> Both name the same attempt in one in-memory store, so <code data-v-962898be>operations_status</code> reads a task as well, and a task is reachable only while the family that started it is advertised. An unknown, expired or withheld id is <code data-v-962898be>-32602</code>, and a restart forgets every task.</li><li data-v-962898be><strong data-v-962898be>Two calls that join one operation share one <code data-v-962898be>taskId</code></strong> — a second import of the same file while the first is copying it, a second analysis of the same recording, a second download of the same session. A <code data-v-962898be>tasks/cancel</code> from either caller cancels the work both are following.</li><li data-v-962898be><strong data-v-962898be><code data-v-962898be>ttlMs</code> is retention, not a cache hint and not a deadline.</strong> It says the task stays readable for an hour once it has finished. A task still <code data-v-962898be>working</code> outlives its advertised <code data-v-962898be>ttlMs</code> for as long as the work runs. <code data-v-962898be>pollIntervalMs</code> asks for a poll every five seconds.</li><li data-v-962898be><strong data-v-962898be>The result is what a waiting caller would have read</strong> — with one exception. An analysis that failed is a task <code data-v-962898be>completed</code> with <code data-v-962898be>isError: true</code> in its <code data-v-962898be>result</code>, where a client that waited on <code data-v-962898be>recordings_analyzeRecording</code> is answered with a status document that reports the failure without being an error. A tool that could not produce an answer at all makes the task <code data-v-962898be>failed</code>.</li></ul><h3 id="input-requests" data-v-962898be>Input Requests</h3><p data-v-962898be>Two tools can ask the user something before they act, as the <code data-v-962898be>2026-07-28</code> input-request flow (an <code data-v-962898be>input_required</code> result carrying a form <code data-v-962898be>elicitation/create</code>) allows. They ask <strong data-v-962898be>only a client that declared form elicitation</strong> — <code data-v-962898be>&quot;elicitation&quot;: {&quot;form&quot;: {}}</code> in its <code data-v-962898be>clientCapabilities</code>, or an empty <code data-v-962898be>&quot;elicitation&quot;: {}</code>, the older shape that meant form; <code data-v-962898be>url</code> alone is not form. Every other client behaves exactly as before, and answers it sends anyway are ignored.</p>',3)),o("ul",null,[o("li",null,[e[62]||(e[62]=o("code",null,"recordings_delete",-1)),e[63]||(e[63]=t(" asks the user to ",-1)),a(r,{to:"/docs/microscope-mcp/tools#delete-confirmation"},{default:s(()=>[...e[61]||(e[61]=[t("confirm the deletion",-1)])]),_:1}),e[64]||(e[64]=t(". A host that asks before a tool with ",-1)),e[65]||(e[65]=o("code",null,"destructiveHint",-1)),e[66]||(e[66]=t(" still does; this question comes from Jeffrey and names what goes.",-1))]),o("li",null,[e[68]||(e[68]=o("code",null,"hubs_download",-1)),e[69]||(e[69]=t(" asks ",-1)),a(r,{to:"/docs/microscope-mcp/tools#window-question"},{default:s(()=>[...e[67]||(e[67]=[t("which part of a large session",-1)])]),_:1}),e[70]||(e[70]=t(" to bring — one longer than an hour or bigger than 1 GB by default — when the call names the whole session. The question comes before anything crosses the network, and before any ",-1)),e[71]||(e[71]=o("a",{href:"#tasks"},"task",-1)),e[72]||(e[72]=t(": the transfer that follows the answer takes the usual five-second path to a task.",-1))])]),e[138]||(e[138]=n("<p data-v-962898be>The question is a result, not a request from the server: the call answers with <code data-v-962898be>resultType: &quot;input_required&quot;</code> and an <code data-v-962898be>inputRequests</code> map, one entry per question under a key the tool chooses, each an <code data-v-962898be>elicitation/create</code> in <code data-v-962898be>form</code> mode with a <code data-v-962898be>message</code> and a flat <code data-v-962898be>requestedSchema</code>. Like every result it carries <code data-v-962898be>serverInfo</code>, and like no cacheable one it carries no <code data-v-962898be>ttlMs</code> or <code data-v-962898be>cacheScope</code> — the answer belongs to the user.</p>",1)),a(d,{code:k,language:"bash"}),a(d,{code:z,language:"json"}),e[139]||(e[139]=n("<p data-v-962898be>The client shows the form, then sends the <strong data-v-962898be>same call again</strong> — a new <code data-v-962898be>id</code>, the same <code data-v-962898be>name</code> and <code data-v-962898be>arguments</code> — with <code data-v-962898be>inputResponses</code> under the same keys: <code data-v-962898be>action</code> is <code data-v-962898be>accept</code>, <code data-v-962898be>decline</code> or <code data-v-962898be>cancel</code>, and <code data-v-962898be>content</code> holds the form’s fields on an accept. Jeffrey sends no <code data-v-962898be>requestState</code>: the arguments already name everything, and the retry is judged afresh, so a recording that became undeletable in the meantime is still refused.</p>",1)),a(d,{code:C,language:"bash"}),a(d,{code:W,language:"json"}),e[140]||(e[140]=n('<ul data-v-962898be><li data-v-962898be><strong data-v-962898be>No is an answer, not an error.</strong> A decline or a dismissal — or the box left unchecked — completes the call without <code data-v-962898be>isError</code>: <code data-v-962898be>{&quot;status&quot;: &quot;NOT_CONFIRMED&quot;, …}</code> from <code data-v-962898be>recordings_delete</code>, <code data-v-962898be>{&quot;status&quot;: &quot;NOT_DOWNLOADED&quot;, …}</code> from <code data-v-962898be>hubs_download</code>, with nothing deleted or transferred.</li><li data-v-962898be><strong data-v-962898be>A malformed answer asks again.</strong> Content missing a field, a value of the wrong type or out of range, an end before a start — each is answered with a new <code data-v-962898be>input_required</code> result whose message states the problem first. It never ends in an error.</li><li data-v-962898be><strong data-v-962898be>A task never waits on input.</strong> Questions are asked only before work starts; <code data-v-962898be>tasks/update</code> ignores <code data-v-962898be>inputResponses</code>.</li></ul><h3 id="what-an-older-client-sees" data-v-962898be>What an Older Client Sees</h3><p data-v-962898be>A client built for the handshake revisions (<code data-v-962898be>2024-11-05</code> to <code data-v-962898be>2025-11-25</code>) opens with <code data-v-962898be>initialize</code> and sends no <code data-v-962898be>_meta</code>. Jeffrey no longer speaks those revisions, and says so rather than failing vaguely. A request without <code data-v-962898be>_meta</code>, or without the version in it, is malformed under <code data-v-962898be>2026-07-28</code>, so the answer is <code data-v-962898be>400</code> with <code data-v-962898be>-32602</code> — but its message and <code data-v-962898be>data.supported</code> name <code data-v-962898be>2026-07-28</code>, since a handshake-era client has nowhere else to learn what to speak. A client that does send <code data-v-962898be>_meta</code>, with the header and <code data-v-962898be>_meta</code> agreeing on a version Jeffrey does not speak, gets <code data-v-962898be>-32022</code> instead, with that version echoed in <code data-v-962898be>data.requested</code>.</p>',3)),a(d,{code:K,language:"bash"}),a(d,{code:X,language:"json"}),e[141]||(e[141]=o("p",null,[t("How the client shows that is up to the client — usually as a server that failed to start. Jeffrey’s log records each refusal at "),o("code",null,"INFO"),t(", which is the quickest way to tell “wrong revision” from “not running”:")],-1)),a(d,{code:B,language:"text"}),o("p",null,[e[75]||(e[75]=t("The fix is on the client side: a version that supports MCP ",-1)),e[76]||(e[76]=o("code",null,"2026-07-28",-1)),e[77]||(e[77]=t(", or the setting that turns it on — the ",-1)),a(r,{to:"/docs/microscope-mcp/claude-code#before-you-start"},{default:s(()=>[...e[73]||(e[73]=[t("Claude Code",-1)])]),_:1}),e[78]||(e[78]=t(" and ",-1)),a(r,{to:"/docs/microscope-mcp/codex#before-you-start"},{default:s(()=>[...e[74]||(e[74]=[t("Codex",-1)])]),_:1}),e[79]||(e[79]=t(" pages say which.",-1))]),a(i,{type:"info",title:"Every tool says whether it writes"},{default:s(()=>[e[81]||(e[81]=t(" Each spec in ",-1)),e[82]||(e[82]=o("code",null,"tools/list",-1)),e[83]||(e[83]=t(" carries MCP ",-1)),e[84]||(e[84]=o("code",null,"annotations",-1)),e[85]||(e[85]=t(": ",-1)),e[86]||(e[86]=o("code",null,"readOnlyHint",-1)),e[87]||(e[87]=t(", ",-1)),e[88]||(e[88]=o("code",null,"destructiveHint",-1)),e[89]||(e[89]=t(", ",-1)),e[90]||(e[90]=o("code",null,"idempotentHint",-1)),e[91]||(e[91]=t(" and ",-1)),e[92]||(e[92]=o("code",null,"openWorldHint",-1)),e[93]||(e[93]=t(". Almost everything Jeffrey exposes only reads a profile, and declares it; the ",-1)),a(r,{to:"/docs/microscope-mcp/clients#what-writes"},{default:s(()=>[...e[80]||(e[80]=[t("eleven that write",-1)])]),_:1}),e[94]||(e[94]=t(" declare that too, each for itself rather than for its family, so ",-1)),e[95]||(e[95]=o("code",null,"recordings_list",-1)),e[96]||(e[96]=t(", ",-1)),e[97]||(e[97]=o("code",null,"recordings_status",-1)),e[98]||(e[98]=t(" and ",-1)),e[99]||(e[99]=o("code",null,"heap_status",-1)),e[100]||(e[100]=t(" read as read-only although they sit beside writers. ",-1)),e[101]||(e[101]=o("code",null,"destructiveHint",-1)),e[102]||(e[102]=t(" is true on ",-1)),e[103]||(e[103]=o("code",null,"recordings_delete",-1)),e[104]||(e[104]=t(" alone — nothing else deletes a profile, a recording or a dump — and ",-1)),e[105]||(e[105]=o("code",null,"openWorldHint",-1)),e[106]||(e[106]=t(" marks the ",-1)),e[107]||(e[107]=o("code",null,"hubs_",-1)),e[108]||(e[108]=t(" and ",-1)),e[109]||(e[109]=o("code",null,"ide_",-1)),e[110]||(e[110]=t(" families, and the ",-1)),e[111]||(e[111]=o("code",null,"operations_",-1)),e[112]||(e[112]=t(" pair, which can poll or cancel a remote Hub transfer. A client that gates approval on those hints does not need a hand-written deny-list. ",-1))]),_:1}),e[142]||(e[142]=o("h2",{id:"instructions-and-completions"},"Instructions and Completions",-1)),e[143]||(e[143]=o("p",null,"Two things the server hands a client that has no plugin behind it.",-1)),o("p",null,[e[114]||(e[114]=n("<strong data-v-962898be><code data-v-962898be>server/discover</code> returns an <code data-v-962898be>instructions</code> field.</strong> A hundred-odd tools in nineteen families is a lot to meet with nothing but a tool list, so discovery carries the short version: start at <code data-v-962898be>profiles_list</code>, then <code data-v-962898be>profiles_summary</code> and read <code data-v-962898be>topFindings</code> and <code data-v-962898be>capabilityGaps</code> before choosing a family, and for an open question put its ",10)),a(r,{to:"/docs/microscope-mcp/tools#investigation-areas"},{default:s(()=>[...e[113]||(e[113]=[o("code",null,"investigationAreas",-1)])]),_:1}),e[115]||(e[115]=n(" to the user as the menu — each area the profile can answer, its weight and what suggests it — so the user picks what is worth running; that each next call in <code data-v-962898be>followUp.nextTools</code> carries its weight; every tool outside <code data-v-962898be>profiles_list</code> and the <code data-v-962898be>recordings_</code>, <code data-v-962898be>hubs_</code> and <code data-v-962898be>operations_</code> families needs a <code data-v-962898be>profileId</code>; what each family is for; the call order that matters inside each advertised family — <code data-v-962898be>flamegraph_list</code> before <code data-v-962898be>flamegraph_export</code>, <code data-v-962898be>compare_list</code> before the other <code data-v-962898be>compare_</code> tools, <code data-v-962898be>jvm_sections</code> before the other <code data-v-962898be>jvm_</code> tools, <code data-v-962898be>ide_resolve</code> before a finding names a file, and the like; that the eleven writers are named and the long ones return an <code data-v-962898be>operationId</code> to poll, or a task after about five seconds to a client that declared the tasks extension; and that output is capped and always says when it cut. Most clients put it in front of the model automatically. The longer guidance stays where it was — one prompt per workflow.",29))]),e[144]||(e[144]=n('<p id="completions" data-v-962898be><strong data-v-962898be><code data-v-962898be>completion/complete</code> completes <code data-v-962898be>profileId</code> and <code data-v-962898be>baselineProfileId</code>.</strong> A profile id is a UUIDv7, and there is no way to produce one except by reading it out of the catalogue first, which is exactly what this method exists for; <code data-v-962898be>baselineProfileId</code> is the same kind of value, filled from the same catalogue, for the one prompt and handful of tools that compare two profiles. It answers for both reference types — a <code data-v-962898be>ref/prompt</code>, for whichever of the two arguments the prompt declares, and a <code data-v-962898be>ref/resource</code> naming one of the per-profile templates — matching on what has been typed so far, case-insensitively, and capping the response at the hundred values the protocol allows while reporting the true <code data-v-962898be>total</code>. No other argument is completed: an event type is <code data-v-962898be>jdk.ExecutionSample</code>, a name a model already knows. The capability is declared only when the <code data-v-962898be>profiles</code> family is advertised, so a narrowed server does not offer a picker it cannot fill.</p><p data-v-962898be><strong data-v-962898be>Tool results can carry resource links.</strong> Where a tool has an exact resource counterpart — <code data-v-962898be>profiles_summary</code>, <code data-v-962898be>profiles_evidence</code>, and an unnarrowed <code data-v-962898be>flamegraph_export</code> — the result carries a <code data-v-962898be>resource_link</code> block after its text, so a client can attach the answer instead of letting it scroll away. <code data-v-962898be>profiles_summary</code> and <code data-v-962898be>profiles_evidence</code> also link the profile’s <code data-v-962898be>…/findings</code>, and <code data-v-962898be>jfr_listTables</code> and <code data-v-962898be>jfr_describeTable</code> its <code data-v-962898be>…/schema</code>, the whole document their answer is part of. The text block is always there; a link is an extra, never a replacement. A filtered flamegraph gets no link to the template, because the template takes an event type and nothing else and would return a different call tree under the same name.</p>',2)),a(i,{type:"info",title:"POST-only, and stateless on purpose"},{default:s(()=>[...e[116]||(e[116]=[t(" The endpoint answers ",-1),o("code",null,"POST",-1),t(" and nothing else. ",-1),o("code",null,"GET",-1),t(" and ",-1),o("code",null,"DELETE",-1),t(" return ",-1),o("code",null,"405",-1),t(": there is no server-to-client SSE stream, no ",-1),o("code",null,"Mcp-Session-Id",-1),t(", and therefore no server-initiated notifications — no ",-1),o("code",null,"notifications/progress",-1),t(", and no ",-1),o("code",null,"listChanged",-1),t(" or ",-1),o("code",null,"resources/updated",-1),t(", each of which ",-1),o("code",null,"server/discover",-1),t(" declares as absent rather than leaving a client to discover. Long-running work is polled instead: a long call hands back an ",-1),o("code",null,"operationId",-1),t(" that ",-1),o("code",null,"operations_status",-1),t(" reports on or, to a client that declared the tasks extension, a ",-1),o("a",{href:"#tasks"},"task",-1),t(" that ",-1),o("code",null,"tasks/get",-1),t(" reports on. That survives a dropped connection, which a progress stream does not, and it keeps the server a plain request-response service that any HTTP client can drive. ",-1)])]),_:1}),e[145]||(e[145]=o("h2",{id:"a-session-by-hand"},"A Session by Hand",-1)),e[146]||(e[146]=o("p",null,[t("Everything below works with "),o("code",null,"curl"),t(", which makes it a good way to check that the server is up before blaming a client.")],-1)),e[147]||(e[147]=o("p",null,[o("strong",null,"Discover"),t(" — the same request the plugin’s startup check sends:")],-1)),a(d,{code:b,language:"bash"}),a(d,{code:D,language:"json"}),e[148]||(e[148]=o("p",null,[t("Then "),o("code",null,"tools/list"),t(" with the same envelope — "),o("code",null,"Mcp-Method: tools/list"),t(" and "),o("code",null,'"method": "tools/list"'),t(" — returns all hundred and eleven specs. To run one, name the tool in "),o("code",null,"Mcp-Name"),t(" as well:")],-1)),a(d,{code:h,language:"bash"}),e[149]||(e[149]=o("p",null,"The result arrives as MCP text content — for the export tools, the same Markdown document the plugin would hand to Claude, preamble included.",-1)),e[150]||(e[150]=o("h2",{id:"errors"},"Errors",-1)),e[151]||(e[151]=o("p",null,"There are two distinct failure shapes, and a client has to read both.",-1)),e[152]||(e[152]=o("p",null,[o("strong",null,"A tool that ran and failed"),t(" is still a "),o("em",null,"successful"),t(" JSON-RPC call, answered with HTTP "),o("code",null,"200"),t(": the result carries "),o("code",null,"isError: true"),t(" and the message as text content. A profile with no heap dump, a query that matched nothing, a hub that stopped answering — anything the model is meant to read and try differently — lands here.")],-1)),a(d,{code:G,language:"json"}),e[153]||(e[153]=n("<p data-v-962898be>This is what MCP specifies, and it is deliberate — the message is written for a model to act on. A profile with no heap dump, for instance, names the families to use instead.</p><p data-v-962898be>A mistake in the arguments is this too. A missing required argument, an argument the tool does not take, or a value of the wrong type comes back as a tool result with <code data-v-962898be>isError: true</code> and a message naming the fix, so the model can correct the call and try again. The schema’s bounds are advice rather than a gate: an out-of-range <code data-v-962898be>limit</code> or <code data-v-962898be>top</code> is clamped silently — a non-positive one takes the default, one above the maximum takes the maximum — and only a value no answer can be built from, such as a <code data-v-962898be>thresholdPct</code> outside 0–100 or a <code data-v-962898be>bucketMs</code> below its floor, is refused with <code data-v-962898be>isError: true</code>. Only a call that could never reach a tool is a protocol error: an unknown tool name, or <code data-v-962898be>arguments</code> that are not a JSON object — so a client can still tell “that tool does not exist” from “the analysis found nothing”.</p><p data-v-962898be><strong data-v-962898be>A protocol-level failure</strong> is a real JSON-RPC error object, and the HTTP status says which kind:</p>",3)),a(d,{code:F,language:"json"}),e[154]||(e[154]=n('<table data-v-962898be><thead data-v-962898be><tr data-v-962898be><th data-v-962898be>Code</th><th data-v-962898be>HTTP</th><th data-v-962898be>Meaning</th></tr></thead><tbody data-v-962898be><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32602</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>Invalid <code data-v-962898be>_meta</code>: no <code data-v-962898be>_meta</code> or no <code data-v-962898be>protocolVersion</code> in it — every <code data-v-962898be>initialize</code> from a handshake-era client — with a message and <code data-v-962898be>data.supported</code> naming <code data-v-962898be>2026-07-28</code> (see <a href="#what-an-older-client-sees" data-v-962898be>above</a>); also <code data-v-962898be>params</code> that are not an object, or <code data-v-962898be>clientCapabilities</code> missing</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32022</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>Unsupported protocol version: <code data-v-962898be>MCP-Protocol-Version</code> and <code data-v-962898be>_meta</code> agree on a version other than <code data-v-962898be>2026-07-28</code>. <code data-v-962898be>data.supported</code> is <code data-v-962898be>[&quot;2026-07-28&quot;]</code>; <code data-v-962898be>data.requested</code> echoes what was asked for</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32020</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>Header mismatch: <code data-v-962898be>MCP-Protocol-Version</code>, <code data-v-962898be>Mcp-Method</code> or <code data-v-962898be>Mcp-Name</code> is missing, disagrees with the body, or is a malformed <code data-v-962898be>=?base64?…?=</code> value. The message names the header and both values. The version header is compared with <code data-v-962898be>_meta</code> before the version itself is judged, so a header that does not repeat <code data-v-962898be>_meta</code> is <code data-v-962898be>-32020</code> even when one of the two names an unsupported version</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32021</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>Missing client capability: the method belongs to an extension the client did not declare in <code data-v-962898be>clientCapabilities</code>; <code data-v-962898be>data.requiredCapabilities</code> says which. That is <code data-v-962898be>tasks/get</code>, <code data-v-962898be>tasks/update</code> and <code data-v-962898be>tasks/cancel</code> from a client that did not declare <code data-v-962898be>io.modelcontextprotocol/tasks</code></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32601</code></td><td data-v-962898be><code data-v-962898be>404</code></td><td data-v-962898be>Unknown method — including <code data-v-962898be>initialize</code>, <code data-v-962898be>ping</code> and <code data-v-962898be>logging/setLevel</code> sent with a valid <code data-v-962898be>_meta</code>, <code data-v-962898be>tasks/list</code> and <code data-v-962898be>tasks/result</code>, which the tasks extension no longer has, and a <code data-v-962898be>notifications/*</code> method sent with an <code data-v-962898be>id</code></td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32600</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>Not a JSON-RPC request: not an object, a JSON array (batching does not exist), no <code data-v-962898be>method</code>, or an <code data-v-962898be>id</code> that is neither a string nor an integer</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32700</code></td><td data-v-962898be><code data-v-962898be>400</code></td><td data-v-962898be>The body is not JSON</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32602</code></td><td data-v-962898be><code data-v-962898be>200</code></td><td data-v-962898be>Invalid params, rejected before any tool was chosen: an unknown tool name, <code data-v-962898be>arguments</code> that are not an object, a pagination <code data-v-962898be>cursor</code> on a list method (this server never issues one), a malformed completion request, and a <code data-v-962898be>resources/read</code> whose subject is not there — a <code data-v-962898be>jeffrey://</code> URI this server does not serve, or a profile that does not exist — and a <code data-v-962898be>taskId</code> that is unknown, expired, or belongs to a family this installation does not advertise. A missing, unknown or mistyped argument is a tool result with <code data-v-962898be>isError: true</code> instead, as is a refused <code data-v-962898be>thresholdPct</code> or <code data-v-962898be>bucketMs</code>; an out-of-range <code data-v-962898be>limit</code> or <code data-v-962898be>top</code> is clamped, not refused</td></tr><tr data-v-962898be><td data-v-962898be><code data-v-962898be>-32603</code></td><td data-v-962898be><code data-v-962898be>200</code></td><td data-v-962898be>An internal failure outside the tool call</td></tr></tbody></table>',1)),o("p",null,[e[118]||(e[118]=t("An HTTP ",-1)),e[119]||(e[119]=o("code",null,"404",-1)),e[120]||(e[120]=t()),e[121]||(e[121]=o("em",null,"without",-1)),e[122]||(e[122]=t(" a JSON-RPC body is a different thing again: it means this installation switched the server off, not that the method was wrong. See ",-1)),a(r,{to:"/docs/microscope-mcp/enabling"},{default:s(()=>[...e[117]||(e[117]=[t("Enabling the Server",-1)])]),_:1}),e[123]||(e[123]=t(".",-1))])]),a(T)])}}}),se=A($,[["__scopeId","data-v-962898be"]]);export{se as default};
