import{D as i}from"./DocsCallout-BltRt_8Z.js";import{D as d}from"./DocsCodeBlock-DnfYAY5_.js";import{D as T}from"./DocsNavFooter-oSwQMDKv.js";import{D as x}from"./DocsPageHeader-DkhkJ7Y9.js";import{u as j}from"./useDocHeadings-rKgOLpco.js";import{d as M,k as P,c as I,e as o,a as t,j as a,w as s,b as n,i as q,o as S}from"./index-CmHL1g0a.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const H={class:"docs-article"},E={class:"docs-content"},O=`git clone https://github.com/petrbouda/jeffrey
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
}`,z=`{
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
}`,f=`"_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": { "form": {} }
        }
      }`,U=`{
  "jsonrpc": "2.0",
  "id": 10,
  "result": {
    "inputRequests": {
      "confirmDeletion": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Delete recording app.jfr (0195f0a1-...) and the profile 0195f0a2-... built from it, with everything analysed out of it? This cannot be undone here. A copy of the recording on the remote is untouched, and remote_download can pull it again.",
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
      { "type": "text", "text": "{\\"status\\":\\"DELETED\\",\\"recordingId\\":\\"0195f0a1-...\\",\\"name\\":\\"app.jfr\\",\\"profileId\\":\\"0195f0a2-...\\",\\"reason\\":null,\\"bundleId\\":null,\\"uiLink\\":\\"http://localhost:8585/recordings\\"}" }
    ],
    "structuredContent": {
      "status": "DELETED",
      "recordingId": "0195f0a1-...",
      "name": "app.jfr",
      "profileId": "0195f0a2-...",
      "reason": null,
      "bundleId": null,
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
      { "type": "text", "text": "Error: Profile 0195f0a2-... is not a heap dump, and the heap_ tools read only heap dump profiles. ..." }
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
}`,$=M({__name:"McpOtherClientsPage",setup(Y){const{setHeadings:p}=j(),v=[{id:"agent-plugins-clients",text:"Agent Plugins Clients",level:2},{id:"cursor",text:"Cursor",level:3},{id:"vs-code-and-github-copilot",text:"VS Code and GitHub Copilot",level:3},{id:"kiro",text:"Kiro",level:3},{id:"any-mcp-client",text:"Any MCP Client",level:2},{id:"what-you-give-up",text:"What You Give Up",level:2},{id:"prompts-skills-and-resources",text:"Prompts, Skills and Resources",level:2},{id:"the-wire-protocol",text:"The Wire Protocol",level:2},{id:"tasks",text:"Tasks",level:3},{id:"input-requests",text:"Input Requests",level:3},{id:"what-an-older-client-sees",text:"What an Older Client Sees",level:3},{id:"instructions-and-completions",text:"Instructions and Completions",level:2},{id:"a-session-by-hand",text:"A Session by Hand",level:2},{id:"errors",text:"Errors",level:2}];P(()=>{p(v)});const u=`curl -s -X POST http://localhost:8585/api/mcp \\
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
  }'`,b=`curl -s -X POST http://localhost:8585/api/mcp \\
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
  }'`,m=`curl -s -X POST http://localhost:8585/api/mcp \\
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
      ${f}
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
      ${f}
    }
  }'`;return(Z,e)=>{const r=q("router-link");return S(),I("article",H,[o(x,{title:"Other Clients",icon:"bi bi-terminal-split"}),t("div",E,[t("p",null,[e[3]||(e[3]=a("The plugin — in ",-1)),o(r,{to:"/docs/microscope-mcp/claude-code"},{default:s(()=>[...e[0]||(e[0]=[a("Claude Code",-1)])]),_:1}),e[4]||(e[4]=a(", ",-1)),o(r,{to:"/docs/microscope-mcp/codex"},{default:s(()=>[...e[1]||(e[1]=[a("Codex",-1)])]),_:1}),e[5]||(e[5]=a(" or ",-1)),o(r,{to:"/docs/microscope-mcp/gemini"},{default:s(()=>[...e[2]||(e[2]=[a("Gemini CLI",-1)])]),_:1}),e[6]||(e[6]=a(" — is a convenience over an ordinary MCP server. Anything that speaks MCP ",-1)),e[7]||(e[7]=t("code",null,"2026-07-28",-1)),e[8]||(e[8]=a(" over Streamable HTTP can connect instead.",-1))]),o(i,{type:"warning",title:"MCP 2026-07-28 only"},{default:s(()=>[...e[9]||(e[9]=[a(" Jeffrey works with any client that speaks MCP ",-1),t("code",null,"2026-07-28",-1),a(" over Streamable HTTP. A client that opens with ",-1),t("code",null,"initialize",-1),a(" is refused with ",-1),t("code",null,"-32602",-1),a(" naming ",-1),t("code",null,"2026-07-28",-1),a(" — see ",-1),t("a",{href:"#what-an-older-client-sees"},"What an Older Client Sees",-1),a(". Everything below about Cursor, VS Code and Kiro applies once the client supports MCP ",-1),t("code",null,"2026-07-28",-1),a("; check your client’s release notes for that, since this page cannot track it. ",-1)])]),_:1}),e[124]||(e[124]=n('<h2 id="agent-plugins-clients" data-v-b5af1a16>Agent Plugins Clients</h2><p data-v-b5af1a16>The plugin carries an <a href="https://agent-plugins.org/" target="_blank" rel="noopener" data-v-b5af1a16>Agent Plugins</a> manifest, the vendor-neutral format <strong data-v-b5af1a16>Cursor</strong>, <strong data-v-b5af1a16>GitHub Copilot</strong>, <strong data-v-b5af1a16>VS Code</strong> and <strong data-v-b5af1a16>Kiro</strong> read alongside Codex. Where a client installs a plugin from a directory, <code data-v-b5af1a16>jeffrey-claude-plugin/</code> in a clone is that directory:</p>',2)),o(d,{code:O,language:"bash"}),t("p",null,[e[11]||(e[11]=a("What is standardised is the manifest, the eleven skills and the ",-1)),e[12]||(e[12]=t("code",null,"streamable-http",-1)),e[13]||(e[13]=a(" server entry. Everything past that — how a plugin is browsed and installed, how skills are invoked, how tools are approved — is the client's own, and moves faster than this page can. The ",-1)),o(r,{to:"/docs/microscope-mcp/codex"},{default:s(()=>[...e[10]||(e[10]=[a("Codex",-1)])]),_:1}),e[14]||(e[14]=a(" page is the closest map, since it documents the same portable half in detail.",-1))]),e[125]||(e[125]=t("p",null,[a("None of them can carry the three agents, for the reason that page gives: Agent Plugins defines skills and MCP servers, and nothing else. And in all of them the endpoint is fixed at "),t("code",null,"localhost:8585"),a(", because the format forbids placeholder expansion in a server URL — a Jeffrey anywhere else is registered by hand, as below.")],-1)),o(i,{type:"info",title:"Gemini CLI is not one of them"},{default:s(()=>[e[16]||(e[16]=a(" It cannot connect to this Jeffrey until it supports MCP ",-1)),e[17]||(e[17]=t("code",null,"2026-07-28",-1)),e[18]||(e[18]=a(". It reads its own extension format rather than this manifest, and takes more from the package than these clients can — the skills, the session-start check, and an endpoint you can point elsewhere. It has a ",-1)),o(r,{to:"/docs/microscope-mcp/gemini"},{default:s(()=>[...e[15]||(e[15]=[a("page of its own",-1)])]),_:1}),e[19]||(e[19]=a(". Its ",-1)),e[20]||(e[20]=t("code",null,"mcpServers",-1)),e[21]||(e[21]=a(" entry also spells the endpoint its own way: ",-1)),e[22]||(e[22]=t("code",null,"httpUrl",-1)),e[23]||(e[23]=a(", or ",-1)),e[24]||(e[24]=t("code",null,"url",-1)),e[25]||(e[25]=a(" with ",-1)),e[26]||(e[26]=t("code",null,'"type": "http"',-1)),e[27]||(e[27]=a(" — which is what its own ",-1)),e[28]||(e[28]=t("code",null,"gemini mcp add --transport http",-1)),e[29]||(e[29]=a(" writes. ",-1))]),_:1}),e[126]||(e[126]=n('<h3 id="cursor" data-v-b5af1a16>Cursor</h3><p data-v-b5af1a16>Install the plugin from the cloned directory through Cursor&#39;s plugin browser. Without it, add the server to Cursor&#39;s MCP configuration — <code data-v-b5af1a16>~/.cursor/mcp.json</code> for every project, <code data-v-b5af1a16>.cursor/mcp.json</code> for one — using the <code data-v-b5af1a16>mcpServers</code> entry from <a href="#any-mcp-client" data-v-b5af1a16>Any MCP Client</a> below. The tools then appear as <code data-v-b5af1a16>jeffrey</code> in Cursor&#39;s MCP settings, one toggle per tool.</p><h3 id="vs-code-and-github-copilot" data-v-b5af1a16>VS Code and GitHub Copilot</h3><p data-v-b5af1a16>Copilot&#39;s agent mode reads MCP servers from <code data-v-b5af1a16>.vscode/mcp.json</code> in the workspace, or from your user settings for every workspace. The shape differs slightly from the one Claude Code uses — the key is <code data-v-b5af1a16>servers</code>:</p>',4)),o(d,{code:N,language:"json"}),e[127]||(e[127]=n('<p data-v-b5af1a16>Check it in and everyone working in that repository gets the same Jeffrey, assuming they run one. The command palette&#39;s <em data-v-b5af1a16>MCP: List Servers</em> shows whether it connected.</p><h3 id="kiro" data-v-b5af1a16>Kiro</h3><p data-v-b5af1a16>Kiro reads MCP servers from <code data-v-b5af1a16>.kiro/settings/mcp.json</code> in the workspace or <code data-v-b5af1a16>~/.kiro/settings/mcp.json</code> for every workspace, in the same <code data-v-b5af1a16>mcpServers</code> shape as <a href="#any-mcp-client" data-v-b5af1a16>below</a>. Its autoApprove list is the equivalent of the approval rules the plugin pages describe: naming the read-only tools there stops it asking each time.</p><h2 id="any-mcp-client" data-v-b5af1a16>Any MCP Client</h2><p data-v-b5af1a16>Register the server directly — useful when you want it in one project only, or when you would rather not add a marketplace:</p>',5)),o(d,{code:R,language:"bash"}),e[128]||(e[128]=t("p",null,[a("Or write it into a project’s "),t("code",null,".mcp.json"),a(":")],-1)),o(d,{code:J,language:"json"}),o(i,{type:"tip",title:"Both are offered ready-made"},{default:s(()=>[...e[30]||(e[30]=[a(" Build each of them around the address you actually reach Jeffrey on — behind a container, a proxy or a non-default port, ",-1),t("code",null,"localhost:8585",-1),a(" is not it. ",-1)])]),_:1}),e[129]||(e[129]=t("h2",{id:"what-you-give-up"},"What You Give Up",-1)),e[130]||(e[130]=t("p",null,[a("The same hundred and twelve tools, named "),t("code",null,"mcp__jeffrey__*"),a(" rather than the "),t("code",null,"mcp__plugin_microscope_jeffrey__*"),a(" Claude Code gives a plugin's server — a hand-registered server is not namespaced by a plugin. Adjust any approval rule accordingly: "),t("code",null,"/permissions"),a(" in Claude Code, the "),t("code",null,"[mcp_servers.jeffrey]"),a(" block in Codex.")],-1)),t("p",null,[e[32]||(e[32]=a("What does not come along as ",-1)),e[33]||(e[33]=t("em",null,"plugin",-1)),e[34]||(e[34]=a(" skills is the guidance: the entry sequence and the two database schemas. But it is not lost. The server offers the same files over the protocol twice: as ",-1)),e[35]||(e[35]=t("strong",null,"skills",-1)),e[36]||(e[36]=a(", through the MCP skills extension, so a client that speaks ",-1)),e[37]||(e[37]=t("code",null,"2026-07-28",-1)),e[38]||(e[38]=a(" with that extension gets all eleven from the server and loads them as it would a plugin’s; and as ",-1)),e[39]||(e[39]=t("strong",null,"prompts",-1)),e[40]||(e[40]=a(", so a client that only speaks ",-1)),e[41]||(e[41]=t("code",null,"prompts/list",-1)),e[42]||(e[42]=a(" can still load any of them — see below. What is genuinely missing is the ",-1)),o(r,{to:"/docs/microscope-mcp/agent"},{default:s(()=>[...e[31]||(e[31]=[a("agents",-1)])]),_:1}),e[43]||(e[43]=a(", which no MCP server can provide, and, over prompts, the automatic loading: somebody has to ask for the prompt.",-1))]),e[131]||(e[131]=n('<h2 id="prompts-skills-and-resources" data-v-b5af1a16>Prompts, Skills and Resources</h2><p data-v-b5af1a16>Three capabilities beyond the tools, and they exist for exactly this page’s readers.</p><p data-v-b5af1a16>Every call on this page is a complete MCP <code data-v-b5af1a16>2026-07-28</code> request: the version and the client’s capabilities in <code data-v-b5af1a16>params._meta</code>, repeated in the <code data-v-b5af1a16>MCP-Protocol-Version</code> and <code data-v-b5af1a16>Mcp-Method</code> headers, plus <code data-v-b5af1a16>Mcp-Name</code> for the methods that name something. <a href="#the-wire-protocol" data-v-b5af1a16>The Wire Protocol</a> explains each.</p><p data-v-b5af1a16><strong data-v-b5af1a16>Prompts</strong> are the plugin’s skills, served over the protocol. <code data-v-b5af1a16>prompts/list</code> names them — <code data-v-b5af1a16>analyze-jfr</code>, <code data-v-b5af1a16>analyze-heap</code>, <code data-v-b5af1a16>analyze-remote</code>, <code data-v-b5af1a16>compare-jfr</code>, <code data-v-b5af1a16>advise-jfr</code>, <code data-v-b5af1a16>analyze-exceptions</code>, <code data-v-b5af1a16>profile-run</code>, <code data-v-b5af1a16>regression-check</code>, <code data-v-b5af1a16>jfr-sql</code>, <code data-v-b5af1a16>heap-sql</code>, <code data-v-b5af1a16>report</code> — and <code data-v-b5af1a16>prompts/get</code> returns one as a message to insert. They are the same files the plugin ships, copied onto the server’s classpath when it is built, so they cannot drift from what a Claude Code or Codex user gets.</p>',4)),o(d,{code:b,language:"bash"}),e[132]||(e[132]=n("<p data-v-b5af1a16><strong data-v-b5af1a16>Skills</strong> are the same eleven files as Agent Skills, over the <code data-v-b5af1a16>io.modelcontextprotocol/skills</code> extension, which <code data-v-b5af1a16>server/discover</code> lists under <code data-v-b5af1a16>capabilities.extensions</code>. <code data-v-b5af1a16>skills/list</code> returns every skill (the answer below is cut to one of the ten) with its front matter exactly as written and its complete manifest: each file’s <code data-v-b5af1a16>skill://</code> URI, a <code data-v-b5af1a16>sha256</code> digest over its bytes, and its size. <code data-v-b5af1a16>skills/get</code> returns one, named by the URI of its <code data-v-b5af1a16>SKILL.md</code>, and each file is read with the ordinary <code data-v-b5af1a16>resources/read</code>. A client loads them the way it loads a plugin’s skills, from the descriptions, without anybody asking. Every skill is self-contained — nothing in one points into another — so a client that reads only what a manifest lists reads everything the skill uses. An unknown skill or file is <code data-v-b5af1a16>-32602</code>.</p>",1)),o(d,{code:m,language:"bash"}),o(d,{code:V,language:"json"}),e[133]||(e[133]=n("<p data-v-b5af1a16><strong data-v-b5af1a16>Resources</strong> are the parts of a profile a client can attach rather than call for. <code data-v-b5af1a16>jeffrey://profiles</code> is the catalogue; <code data-v-b5af1a16>resources/templates/list</code> offers <code data-v-b5af1a16>jeffrey://profile/{profileId}/summary</code>, <code data-v-b5af1a16>jeffrey://profile/{profileId}/flamegraph/{eventType}</code>, <code data-v-b5af1a16>…/evidence</code>, <code data-v-b5af1a16>…/schema</code> and <code data-v-b5af1a16>…/findings</code>, each while the tool or family that reads the same data is advertised. The distinction is worth the two extra methods: a tool result scrolls away, where a resource a client has attached stays in view and can be referred back to. Reading the summary, evidence or flamegraph template runs the tool that would have answered the same question, so the two never disagree; <code data-v-b5af1a16>…/schema</code> and <code data-v-b5af1a16>…/findings</code> are documents no single tool returns, described below.</p><p data-v-b5af1a16><code data-v-b5af1a16>jeffrey://diagnostics</code> reports profile readiness, bounded remote connectivity checks and aggregate tool metrics without connection addresses or tool arguments. The <code data-v-b5af1a16>jeffrey://profile/{profileId}/evidence</code> template exposes the same bounded evidence snapshot as <code data-v-b5af1a16>profiles_evidence</code>. <code data-v-b5af1a16>…/schema</code> is the profile database as one JSON document — every table and view, the <code data-v-b5af1a16>events</code> view included, with its columns, the note on the JSON <code data-v-b5af1a16>fields</code> column and each event type with its count — served with the <code data-v-b5af1a16>jfr_</code> family. <code data-v-b5af1a16>…/findings</code> merges every finding the profile already holds — the cached Auto Analysis, the container verdict, the capability gaps — with a <code data-v-b5af1a16>status</code> of <code data-v-b5af1a16>COMPUTED</code>, <code data-v-b5af1a16>NOT_COMPUTED</code> (and a <code data-v-b5af1a16>followUp</code> offering <code data-v-b5af1a16>jvm_autoAnalysis</code> with <code data-v-b5af1a16>compute</code>) or <code data-v-b5af1a16>CANNOT_COMPUTE</code>; it is read from the cache, so reading it never starts the analysis. Each read reflects the current state; attach or save a response when you need a fixed snapshot.</p>",2)),o(d,{code:g,language:"bash"}),e[134]||(e[134]=t("p",null,[t("code",null,"jeffrey://profiles"),a(" returns the first catalogue page and provides a continuation URI when more profiles match. The "),t("code",null,"jeffrey://profiles{?cursor,limit}"),a(" template continues it. "),t("code",null,"jeffrey://server"),a(" reports the build version, effective tool families and count, and supported protocol capabilities. It contains no raw configuration, local paths or remote addresses.")],-1)),t("p",null,[e[46]||(e[46]=n("Every tool but <code data-v-b5af1a16>ide_source</code> declares an <code data-v-b5af1a16>outputSchema</code> — 111 of the 112 — and <code data-v-b5af1a16>tools/call</code> always returns <code data-v-b5af1a16>structuredContent</code> valid against it, beside the text: the same record as JSON, or Markdown ending in a footer (<code data-v-b5af1a16>Open in Microscope: …</code> and a <code data-v-b5af1a16>Next:</code> list, each call ending in its weight) for the documents written to be read. There is no text-only variant for older clients, because there are no older clients. Each tool’s <code data-v-b5af1a16>_meta</code> also carries <code data-v-b5af1a16>jeffrey/cost</code> and, where it applies, <code data-v-b5af1a16>jeffrey/requires</code>; the ",19)),o(r,{to:"/docs/microscope-mcp/tools#answers"},{default:s(()=>[...e[44]||(e[44]=[a("Tool Reference",-1)])]),_:1}),e[47]||(e[47]=a(" explains both and the conventions every answer follows — epoch-millisecond time, upper-case enums, ",-1)),e[48]||(e[48]=t("code",null,"status",-1)),e[49]||(e[49]=a(" instead of an error for a question with no data, cursor paging, ",-1)),e[50]||(e[50]=t("code",null,"followUp",-1)),e[51]||(e[51]=a(" and ",-1)),e[52]||(e[52]=t("code",null,"uiLink",-1)),e[53]||(e[53]=a(". Every next call an answer offers carries a ",-1)),o(r,{to:"/docs/microscope-mcp/tools#weight"},{default:s(()=>[...e[45]||(e[45]=[t("code",null,"weight",-1)])]),_:1}),e[54]||(e[54]=a(" — ",-1)),e[55]||(e[55]=t("code",null,"LIGHT",-1)),e[56]||(e[56]=a(", ",-1)),e[57]||(e[57]=t("code",null,"MEDIUM",-1)),e[58]||(e[58]=a(" or ",-1)),e[59]||(e[59]=t("code",null,"HEAVY",-1)),e[60]||(e[60]=a(", what its answer puts into the conversation — derived from those hints rather than declared as a key of its own.",-1))]),e[135]||(e[135]=n('<p id="trace-context" data-v-b5af1a16>A request may carry the caller’s W3C trace context as <code data-v-b5af1a16>traceparent</code> and <code data-v-b5af1a16>tracestate</code> in <code data-v-b5af1a16>params._meta</code>; Jeffrey records both verbatim as attributes of the span it keeps for that tool call, beside its own ids, and drops a malformed one without an error.</p><h2 id="the-wire-protocol" data-v-b5af1a16>The Wire Protocol</h2><p data-v-b5af1a16>Whatever the client, the endpoint is plain <strong data-v-b5af1a16>JSON-RPC 2.0 over HTTP POST</strong>, and it speaks exactly one MCP revision: <strong data-v-b5af1a16><code data-v-b5af1a16>2026-07-28</code></strong>, the stateless one. There is no handshake and no session. Every request says for itself which revision it speaks and what the client can do, in <code data-v-b5af1a16>params._meta</code>:</p><ul data-v-b5af1a16><li data-v-b5af1a16><code data-v-b5af1a16>io.modelcontextprotocol/protocolVersion</code> — <code data-v-b5af1a16>&quot;2026-07-28&quot;</code>, required</li><li data-v-b5af1a16><code data-v-b5af1a16>io.modelcontextprotocol/clientCapabilities</code> — an object, required; <code data-v-b5af1a16>{}</code> when the client declares nothing</li><li data-v-b5af1a16><code data-v-b5af1a16>io.modelcontextprotocol/clientInfo</code> — the client’s name and version, optional</li></ul><p data-v-b5af1a16>And three headers repeat what the body says, so a proxy or a server can route and refuse a request without parsing it:</p><ul data-v-b5af1a16><li data-v-b5af1a16><code data-v-b5af1a16>MCP-Protocol-Version: 2026-07-28</code> — on every request, equal to the version in <code data-v-b5af1a16>_meta</code></li><li data-v-b5af1a16><code data-v-b5af1a16>Mcp-Method</code> — on every request, equal to <code data-v-b5af1a16>method</code></li><li data-v-b5af1a16><code data-v-b5af1a16>Mcp-Name</code> — on <code data-v-b5af1a16>tools/call</code> and <code data-v-b5af1a16>prompts/get</code> equal to <code data-v-b5af1a16>params.name</code>, on <code data-v-b5af1a16>resources/read</code> equal to <code data-v-b5af1a16>params.uri</code>, on <code data-v-b5af1a16>tasks/get</code>, <code data-v-b5af1a16>tasks/update</code> and <code data-v-b5af1a16>tasks/cancel</code> equal to <code data-v-b5af1a16>params.taskId</code>. A value that is not plain ASCII is sent as <code data-v-b5af1a16>=?base64?…?=</code></li></ul><p data-v-b5af1a16>Every result says what kind it is in <code data-v-b5af1a16>resultType</code> (<code data-v-b5af1a16>complete</code>; <code data-v-b5af1a16>task</code> when a <code data-v-b5af1a16>tools/call</code> hands back a <a href="#tasks" data-v-b5af1a16>task</a>; <code data-v-b5af1a16>input_required</code> when it <a href="#input-requests" data-v-b5af1a16>asks the user</a> something first) and which server answered in <code data-v-b5af1a16>_meta[&quot;io.modelcontextprotocol/serverInfo&quot;]</code>. The results a client may cache — <code data-v-b5af1a16>server/discover</code>, the list methods, <code data-v-b5af1a16>skills/get</code> and <code data-v-b5af1a16>resources/read</code> — carry <code data-v-b5af1a16>ttlMs</code> and <code data-v-b5af1a16>cacheScope</code>: an hour and <code data-v-b5af1a16>public</code> for the discover, list and skill answers and for reading a skill’s file, which change only with a new Jeffrey build, and <code data-v-b5af1a16>0</code> and <code data-v-b5af1a16>private</code> for reading a <code data-v-b5af1a16>jeffrey://</code> resource, which reflects the catalogue as it is now.</p><p data-v-b5af1a16>A <code data-v-b5af1a16>GET</code> or <code data-v-b5af1a16>DELETE</code> on the endpoint answers <code data-v-b5af1a16>405</code>: there is no server-to-client stream to open and no session to end.</p><table data-v-b5af1a16><thead data-v-b5af1a16><tr data-v-b5af1a16><th data-v-b5af1a16>Method</th><th data-v-b5af1a16>Purpose</th></tr></thead><tbody data-v-b5af1a16><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>server/discover</code></td><td data-v-b5af1a16>What the server speaks and offers: <code data-v-b5af1a16>supportedVersions</code>, <code data-v-b5af1a16>capabilities</code> (including <code data-v-b5af1a16>extensions</code>), the <code data-v-b5af1a16>instructions</code>, and <code data-v-b5af1a16>serverInfo</code>. Never assembles the toolset, so it answers even when a tool family cannot be built — which makes it the probe to use for “is Jeffrey up”</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>tools/list</code></td><td data-v-b5af1a16>Every tool with its description, its JSON-Schema input (including <code data-v-b5af1a16>required</code> and <code data-v-b5af1a16>enum</code>), its <code data-v-b5af1a16>outputSchema</code> where it has one, and its <code data-v-b5af1a16>annotations</code></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>tools/call</code></td><td data-v-b5af1a16>Runs one tool; the result is text content, plus <code data-v-b5af1a16>structuredContent</code> for the tools that declare an <code data-v-b5af1a16>outputSchema</code></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>prompts/list</code>, <code data-v-b5af1a16>prompts/get</code></td><td data-v-b5af1a16>The plugin’s skills as prompts — see <a href="#prompts-skills-and-resources" data-v-b5af1a16>above</a></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>skills/list</code>, <code data-v-b5af1a16>skills/get</code></td><td data-v-b5af1a16>The same skills over the skills extension, each with its front matter and manifest; their files are read with <code data-v-b5af1a16>resources/read</code> — see <a href="#prompts-skills-and-resources" data-v-b5af1a16>above</a></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>resources/list</code>, <code data-v-b5af1a16>resources/templates/list</code>, <code data-v-b5af1a16>resources/read</code></td><td data-v-b5af1a16>The catalogue, the per-profile templates, and the content behind a <code data-v-b5af1a16>jeffrey://</code> URI</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>tasks/get</code>, <code data-v-b5af1a16>tasks/update</code>, <code data-v-b5af1a16>tasks/cancel</code></td><td data-v-b5af1a16>Follow and stop a task a <code data-v-b5af1a16>tools/call</code> handed back — only for a client that declared the tasks extension; see <a href="#tasks" data-v-b5af1a16>Tasks</a></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>completion/complete</code></td><td data-v-b5af1a16>Completes <code data-v-b5af1a16>profileId</code> and <code data-v-b5af1a16>baselineProfileId</code> for a prompt argument or a per-profile template, from the live catalogue — see <a href="#completions" data-v-b5af1a16>below</a></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>notifications/*</code></td><td data-v-b5af1a16>Accepted and acknowledged with <code data-v-b5af1a16>202</code> and no body, per JSON-RPC. They still carry <code data-v-b5af1a16>_meta</code> and the headers</td></tr></tbody></table><p data-v-b5af1a16>Nothing else is served. <code data-v-b5af1a16>initialize</code>, <code data-v-b5af1a16>ping</code> and <code data-v-b5af1a16>logging/setLevel</code> do not exist in <code data-v-b5af1a16>2026-07-28</code>, and JSON-RPC batching does not either: a JSON array is refused whole with <code data-v-b5af1a16>-32600</code>.</p><h3 id="tasks" data-v-b5af1a16>Tasks</h3><p data-v-b5af1a16>Jeffrey serves the MCP tasks extension, <code data-v-b5af1a16>io.modelcontextprotocol/tasks</code>, and <code data-v-b5af1a16>server/discover</code> lists it under <code data-v-b5af1a16>capabilities.extensions</code> whenever a family that starts long work is advertised. A client that declares it too — in the <code data-v-b5af1a16>clientCapabilities</code> of each request — is not held for forty-five seconds by a long call. The seven tools that can take a while (<code data-v-b5af1a16>recordings_analyzeFile</code>, <code data-v-b5af1a16>recordings_analyzeRecording</code>, <code data-v-b5af1a16>remote_download</code>, <code data-v-b5af1a16>remote_fetchFile</code>, <code data-v-b5af1a16>heap_prepare</code>, <code data-v-b5af1a16>heap_oql</code> with <code data-v-b5af1a16>includeRetainedSize</code> and <code data-v-b5af1a16>jvm_autoAnalysis</code> with <code data-v-b5af1a16>compute</code>) wait about <strong data-v-b5af1a16>five seconds</strong> for it: work that finishes answers directly, and work that does not comes back as a task. <code data-v-b5af1a16>heap_prepare</code> does not wait at all: such a client gets its task at once. A client that did not declare the extension gets what it always got — the forty-five-second wait and an <code data-v-b5af1a16>operationId</code> for <code data-v-b5af1a16>operations_status</code>. Only <code data-v-b5af1a16>tools/call</code> ever answers with a task; Jeffrey decides when, so <code data-v-b5af1a16>tools/list</code> does not change.</p>',12)),o(d,{code:y,language:"bash"}),o(d,{code:L,language:"json"}),e[136]||(e[136]=n("<p data-v-b5af1a16><code data-v-b5af1a16>tasks/get</code> reports where the task stands — <code data-v-b5af1a16>working</code>, <code data-v-b5af1a16>completed</code>, <code data-v-b5af1a16>failed</code> or <code data-v-b5af1a16>cancelled</code> — and, once it has finished, carries the full <code data-v-b5af1a16>tools/call</code> result in <code data-v-b5af1a16>result</code>. <code data-v-b5af1a16>tasks/cancel</code> asks the work to stop and answers straight away; <code data-v-b5af1a16>tasks/get</code> says <code data-v-b5af1a16>cancelled</code> once it has. <code data-v-b5af1a16>tasks/update</code> only confirms the task exists: no tool asks for input in the middle of its work. Each carries the <code data-v-b5af1a16>taskId</code> in <code data-v-b5af1a16>params</code> and in <code data-v-b5af1a16>Mcp-Name</code>.</p>",1)),o(d,{code:w,language:"bash"}),o(d,{code:z,language:"json"}),e[137]||(e[137]=n('<ul data-v-b5af1a16><li data-v-b5af1a16><strong data-v-b5af1a16>The <code data-v-b5af1a16>taskId</code> is the <code data-v-b5af1a16>operationId</code>.</strong> Both name the same attempt in one in-memory store, so <code data-v-b5af1a16>operations_status</code> reads a task as well, and a task is reachable only while the family that started it is advertised. An unknown, expired or withheld id is <code data-v-b5af1a16>-32602</code>, and a restart forgets every task.</li><li data-v-b5af1a16><strong data-v-b5af1a16>Two calls that join one operation share one <code data-v-b5af1a16>taskId</code></strong> — a second import of the same file while the first is copying it, a second analysis of the same recording, a second download of the same session. A <code data-v-b5af1a16>tasks/cancel</code> from either caller cancels the work both are following.</li><li data-v-b5af1a16><strong data-v-b5af1a16><code data-v-b5af1a16>ttlMs</code> is retention, not a cache hint and not a deadline.</strong> It says the task stays readable for an hour once it has finished. A task still <code data-v-b5af1a16>working</code> outlives its advertised <code data-v-b5af1a16>ttlMs</code> for as long as the work runs. <code data-v-b5af1a16>pollIntervalMs</code> asks for a poll every five seconds.</li><li data-v-b5af1a16><strong data-v-b5af1a16>The result is what a waiting caller would have read</strong> — with one exception. An analysis that failed is a task <code data-v-b5af1a16>completed</code> with <code data-v-b5af1a16>isError: true</code> in its <code data-v-b5af1a16>result</code>, where a client that waited on <code data-v-b5af1a16>recordings_analyzeRecording</code> is answered with a status document that reports the failure without being an error. A tool that could not produce an answer at all makes the task <code data-v-b5af1a16>failed</code>.</li></ul><h3 id="input-requests" data-v-b5af1a16>Input Requests</h3><p data-v-b5af1a16>Two tools can ask the user something before they act, as the <code data-v-b5af1a16>2026-07-28</code> input-request flow (an <code data-v-b5af1a16>input_required</code> result carrying a form <code data-v-b5af1a16>elicitation/create</code>) allows. They ask <strong data-v-b5af1a16>only a client that declared form elicitation</strong> — <code data-v-b5af1a16>&quot;elicitation&quot;: {&quot;form&quot;: {}}</code> in its <code data-v-b5af1a16>clientCapabilities</code>, or an empty <code data-v-b5af1a16>&quot;elicitation&quot;: {}</code>, the older shape that meant form; <code data-v-b5af1a16>url</code> alone is not form. Every other client behaves exactly as before, and answers it sends anyway are ignored.</p>',3)),t("ul",null,[t("li",null,[e[62]||(e[62]=t("code",null,"recordings_delete",-1)),e[63]||(e[63]=a(" asks the user to ",-1)),o(r,{to:"/docs/microscope-mcp/tools#delete-confirmation"},{default:s(()=>[...e[61]||(e[61]=[a("confirm the deletion",-1)])]),_:1}),e[64]||(e[64]=a(". A host that asks before a tool with ",-1)),e[65]||(e[65]=t("code",null,"destructiveHint",-1)),e[66]||(e[66]=a(" still does; this question comes from Jeffrey and names what goes.",-1))]),t("li",null,[e[68]||(e[68]=t("code",null,"remote_download",-1)),e[69]||(e[69]=a(" asks ",-1)),o(r,{to:"/docs/microscope-mcp/tools#window-question"},{default:s(()=>[...e[67]||(e[67]=[a("which part of a large session",-1)])]),_:1}),e[70]||(e[70]=a(" to bring — one longer than an hour or bigger than 1 GB by default — when the call names the whole session. The question comes before anything crosses the network, and before any ",-1)),e[71]||(e[71]=t("a",{href:"#tasks"},"task",-1)),e[72]||(e[72]=a(": the transfer that follows the answer takes the usual five-second path to a task.",-1))])]),e[138]||(e[138]=n("<p data-v-b5af1a16>The question is a result, not a request from the server: the call answers with <code data-v-b5af1a16>resultType: &quot;input_required&quot;</code> and an <code data-v-b5af1a16>inputRequests</code> map, one entry per question under a key the tool chooses, each an <code data-v-b5af1a16>elicitation/create</code> in <code data-v-b5af1a16>form</code> mode with a <code data-v-b5af1a16>message</code> and a flat <code data-v-b5af1a16>requestedSchema</code>. Like every result it carries <code data-v-b5af1a16>serverInfo</code>, and like no cacheable one it carries no <code data-v-b5af1a16>ttlMs</code> or <code data-v-b5af1a16>cacheScope</code> — the answer belongs to the user.</p>",1)),o(d,{code:k,language:"bash"}),o(d,{code:U,language:"json"}),e[139]||(e[139]=n("<p data-v-b5af1a16>The client shows the form, then sends the <strong data-v-b5af1a16>same call again</strong> — a new <code data-v-b5af1a16>id</code>, the same <code data-v-b5af1a16>name</code> and <code data-v-b5af1a16>arguments</code> — with <code data-v-b5af1a16>inputResponses</code> under the same keys: <code data-v-b5af1a16>action</code> is <code data-v-b5af1a16>accept</code>, <code data-v-b5af1a16>decline</code> or <code data-v-b5af1a16>cancel</code>, and <code data-v-b5af1a16>content</code> holds the form’s fields on an accept. Jeffrey sends no <code data-v-b5af1a16>requestState</code>: the arguments already name everything, and the retry is judged afresh, so a recording that became undeletable in the meantime is still refused.</p>",1)),o(d,{code:C,language:"bash"}),o(d,{code:W,language:"json"}),e[140]||(e[140]=n('<ul data-v-b5af1a16><li data-v-b5af1a16><strong data-v-b5af1a16>No is an answer, not an error.</strong> A decline or a dismissal — or the box left unchecked — completes the call without <code data-v-b5af1a16>isError</code>: <code data-v-b5af1a16>{&quot;status&quot;: &quot;NOT_CONFIRMED&quot;, …}</code> from <code data-v-b5af1a16>recordings_delete</code>, <code data-v-b5af1a16>{&quot;status&quot;: &quot;NOT_DOWNLOADED&quot;, …}</code> from <code data-v-b5af1a16>remote_download</code>, with nothing deleted or transferred.</li><li data-v-b5af1a16><strong data-v-b5af1a16>A malformed answer asks again.</strong> Content missing a field, a value of the wrong type or out of range, an end before a start — each is answered with a new <code data-v-b5af1a16>input_required</code> result whose message states the problem first. It never ends in an error.</li><li data-v-b5af1a16><strong data-v-b5af1a16>A task never waits on input.</strong> Questions are asked only before work starts; <code data-v-b5af1a16>tasks/update</code> ignores <code data-v-b5af1a16>inputResponses</code>.</li></ul><h3 id="what-an-older-client-sees" data-v-b5af1a16>What an Older Client Sees</h3><p data-v-b5af1a16>A client built for the handshake revisions (<code data-v-b5af1a16>2024-11-05</code> to <code data-v-b5af1a16>2025-11-25</code>) opens with <code data-v-b5af1a16>initialize</code> and sends no <code data-v-b5af1a16>_meta</code>. Jeffrey no longer speaks those revisions, and says so rather than failing vaguely. A request without <code data-v-b5af1a16>_meta</code>, or without the version in it, is malformed under <code data-v-b5af1a16>2026-07-28</code>, so the answer is <code data-v-b5af1a16>400</code> with <code data-v-b5af1a16>-32602</code> — but its message and <code data-v-b5af1a16>data.supported</code> name <code data-v-b5af1a16>2026-07-28</code>, since a handshake-era client has nowhere else to learn what to speak. A client that does send <code data-v-b5af1a16>_meta</code>, with the header and <code data-v-b5af1a16>_meta</code> agreeing on a version Jeffrey does not speak, gets <code data-v-b5af1a16>-32022</code> instead, with that version echoed in <code data-v-b5af1a16>data.requested</code>.</p>',3)),o(d,{code:K,language:"bash"}),o(d,{code:X,language:"json"}),e[141]||(e[141]=t("p",null,[a("How the client shows that is up to the client — usually as a server that failed to start. Jeffrey’s log records each refusal at "),t("code",null,"INFO"),a(", which is the quickest way to tell “wrong revision” from “not running”:")],-1)),o(d,{code:B,language:"text"}),t("p",null,[e[75]||(e[75]=a("The fix is on the client side: a version that supports MCP ",-1)),e[76]||(e[76]=t("code",null,"2026-07-28",-1)),e[77]||(e[77]=a(", or the setting that turns it on — the ",-1)),o(r,{to:"/docs/microscope-mcp/claude-code#before-you-start"},{default:s(()=>[...e[73]||(e[73]=[a("Claude Code",-1)])]),_:1}),e[78]||(e[78]=a(" and ",-1)),o(r,{to:"/docs/microscope-mcp/codex#before-you-start"},{default:s(()=>[...e[74]||(e[74]=[a("Codex",-1)])]),_:1}),e[79]||(e[79]=a(" pages say which.",-1))]),o(i,{type:"info",title:"Every tool says whether it writes"},{default:s(()=>[e[81]||(e[81]=a(" Each spec in ",-1)),e[82]||(e[82]=t("code",null,"tools/list",-1)),e[83]||(e[83]=a(" carries MCP ",-1)),e[84]||(e[84]=t("code",null,"annotations",-1)),e[85]||(e[85]=a(": ",-1)),e[86]||(e[86]=t("code",null,"readOnlyHint",-1)),e[87]||(e[87]=a(", ",-1)),e[88]||(e[88]=t("code",null,"destructiveHint",-1)),e[89]||(e[89]=a(", ",-1)),e[90]||(e[90]=t("code",null,"idempotentHint",-1)),e[91]||(e[91]=a(" and ",-1)),e[92]||(e[92]=t("code",null,"openWorldHint",-1)),e[93]||(e[93]=a(". Almost everything Jeffrey exposes only reads a profile, and declares it; the ",-1)),o(r,{to:"/docs/microscope-mcp/clients#what-writes"},{default:s(()=>[...e[80]||(e[80]=[a("eleven that write",-1)])]),_:1}),e[94]||(e[94]=a(" declare that too, each for itself rather than for its family, so ",-1)),e[95]||(e[95]=t("code",null,"recordings_list",-1)),e[96]||(e[96]=a(", ",-1)),e[97]||(e[97]=t("code",null,"recordings_status",-1)),e[98]||(e[98]=a(" and ",-1)),e[99]||(e[99]=t("code",null,"heap_status",-1)),e[100]||(e[100]=a(" read as read-only although they sit beside writers. ",-1)),e[101]||(e[101]=t("code",null,"destructiveHint",-1)),e[102]||(e[102]=a(" is true on ",-1)),e[103]||(e[103]=t("code",null,"recordings_delete",-1)),e[104]||(e[104]=a(" alone — nothing else deletes a profile, a recording or a dump — and ",-1)),e[105]||(e[105]=t("code",null,"openWorldHint",-1)),e[106]||(e[106]=a(" marks the ",-1)),e[107]||(e[107]=t("code",null,"remote_",-1)),e[108]||(e[108]=a(" and ",-1)),e[109]||(e[109]=t("code",null,"ide_",-1)),e[110]||(e[110]=a(" families, and the ",-1)),e[111]||(e[111]=t("code",null,"operations_",-1)),e[112]||(e[112]=a(" pair, which can poll or cancel a remote transfer. A client that gates approval on those hints does not need a hand-written deny-list. ",-1))]),_:1}),e[142]||(e[142]=t("h2",{id:"instructions-and-completions"},"Instructions and Completions",-1)),e[143]||(e[143]=t("p",null,"Two things the server hands a client that has no plugin behind it.",-1)),t("p",null,[e[114]||(e[114]=n("<strong data-v-b5af1a16><code data-v-b5af1a16>server/discover</code> returns an <code data-v-b5af1a16>instructions</code> field.</strong> A hundred-odd tools in nineteen families is a lot to meet with nothing but a tool list, so discovery carries the short version: start at <code data-v-b5af1a16>profiles_list</code>, then <code data-v-b5af1a16>profiles_summary</code> and read <code data-v-b5af1a16>topFindings</code> and <code data-v-b5af1a16>capabilityGaps</code> before choosing a family, and for an open question put its ",10)),o(r,{to:"/docs/microscope-mcp/tools#investigation-areas"},{default:s(()=>[...e[113]||(e[113]=[t("code",null,"investigationAreas",-1)])]),_:1}),e[115]||(e[115]=n(" to the user as the menu — each area the profile can answer, its weight and what suggests it — so the user picks what is worth running; that each next call in <code data-v-b5af1a16>followUp.nextTools</code> carries its weight; every tool outside <code data-v-b5af1a16>profiles_list</code> and the <code data-v-b5af1a16>recordings_</code>, <code data-v-b5af1a16>remote_</code> and <code data-v-b5af1a16>operations_</code> families needs a <code data-v-b5af1a16>profileId</code>; what each family is for; the call order that matters inside each advertised family — <code data-v-b5af1a16>flamegraph_list</code> before <code data-v-b5af1a16>flamegraph_export</code>, <code data-v-b5af1a16>compare_list</code> before the other <code data-v-b5af1a16>compare_</code> tools, <code data-v-b5af1a16>jvm_sections</code> before the other <code data-v-b5af1a16>jvm_</code> tools, <code data-v-b5af1a16>ide_resolve</code> before a finding names a file, and the like; that the eleven writers are named and the long ones return an <code data-v-b5af1a16>operationId</code> to poll, or a task after about five seconds to a client that declared the tasks extension; and that output is capped and always says when it cut. Most clients put it in front of the model automatically. The longer guidance stays where it was — one prompt per workflow.",29))]),e[144]||(e[144]=n('<p id="completions" data-v-b5af1a16><strong data-v-b5af1a16><code data-v-b5af1a16>completion/complete</code> completes <code data-v-b5af1a16>profileId</code> and <code data-v-b5af1a16>baselineProfileId</code>.</strong> A profile id is a UUIDv7, and there is no way to produce one except by reading it out of the catalogue first, which is exactly what this method exists for; <code data-v-b5af1a16>baselineProfileId</code> is the same kind of value, filled from the same catalogue, for the one prompt and handful of tools that compare two profiles. It answers for both reference types — a <code data-v-b5af1a16>ref/prompt</code>, for whichever of the two arguments the prompt declares, and a <code data-v-b5af1a16>ref/resource</code> naming one of the per-profile templates — matching on what has been typed so far, case-insensitively, and capping the response at the hundred values the protocol allows while reporting the true <code data-v-b5af1a16>total</code>. No other argument is completed: an event type is <code data-v-b5af1a16>jdk.ExecutionSample</code>, a name a model already knows. The capability is declared only when the <code data-v-b5af1a16>profiles</code> family is advertised, so a narrowed server does not offer a picker it cannot fill.</p><p data-v-b5af1a16><strong data-v-b5af1a16>Tool results can carry resource links.</strong> Where a tool has an exact resource counterpart — <code data-v-b5af1a16>profiles_summary</code>, <code data-v-b5af1a16>profiles_evidence</code>, and an unnarrowed <code data-v-b5af1a16>flamegraph_export</code> — the result carries a <code data-v-b5af1a16>resource_link</code> block after its text, so a client can attach the answer instead of letting it scroll away. <code data-v-b5af1a16>profiles_summary</code> and <code data-v-b5af1a16>profiles_evidence</code> also link the profile’s <code data-v-b5af1a16>…/findings</code>, and <code data-v-b5af1a16>jfr_listTables</code> and <code data-v-b5af1a16>jfr_describeTable</code> its <code data-v-b5af1a16>…/schema</code>, the whole document their answer is part of. The text block is always there; a link is an extra, never a replacement. A filtered flamegraph gets no link to the template, because the template takes an event type and nothing else and would return a different call tree under the same name.</p>',2)),o(i,{type:"info",title:"POST-only, and stateless on purpose"},{default:s(()=>[...e[116]||(e[116]=[a(" The endpoint answers ",-1),t("code",null,"POST",-1),a(" and nothing else. ",-1),t("code",null,"GET",-1),a(" and ",-1),t("code",null,"DELETE",-1),a(" return ",-1),t("code",null,"405",-1),a(": there is no server-to-client SSE stream, no ",-1),t("code",null,"Mcp-Session-Id",-1),a(", and therefore no server-initiated notifications — no ",-1),t("code",null,"notifications/progress",-1),a(", and no ",-1),t("code",null,"listChanged",-1),a(" or ",-1),t("code",null,"resources/updated",-1),a(", each of which ",-1),t("code",null,"server/discover",-1),a(" declares as absent rather than leaving a client to discover. Long-running work is polled instead: a long call hands back an ",-1),t("code",null,"operationId",-1),a(" that ",-1),t("code",null,"operations_status",-1),a(" reports on or, to a client that declared the tasks extension, a ",-1),t("a",{href:"#tasks"},"task",-1),a(" that ",-1),t("code",null,"tasks/get",-1),a(" reports on. That survives a dropped connection, which a progress stream does not, and it keeps the server a plain request-response service that any HTTP client can drive. ",-1)])]),_:1}),e[145]||(e[145]=t("h2",{id:"a-session-by-hand"},"A Session by Hand",-1)),e[146]||(e[146]=t("p",null,[a("Everything below works with "),t("code",null,"curl"),a(", which makes it a good way to check that the server is up before blaming a client.")],-1)),e[147]||(e[147]=t("p",null,[t("strong",null,"Discover"),a(" — the same request the plugin’s startup check sends:")],-1)),o(d,{code:u,language:"bash"}),o(d,{code:D,language:"json"}),e[148]||(e[148]=t("p",null,[a("Then "),t("code",null,"tools/list"),a(" with the same envelope — "),t("code",null,"Mcp-Method: tools/list"),a(" and "),t("code",null,'"method": "tools/list"'),a(" — returns all hundred and twelve specs. To run one, name the tool in "),t("code",null,"Mcp-Name"),a(" as well:")],-1)),o(d,{code:h,language:"bash"}),e[149]||(e[149]=t("p",null,"The result arrives as MCP text content — for the export tools, the same Markdown document the plugin would hand to Claude, preamble included.",-1)),e[150]||(e[150]=t("h2",{id:"errors"},"Errors",-1)),e[151]||(e[151]=t("p",null,"There are two distinct failure shapes, and a client has to read both.",-1)),e[152]||(e[152]=t("p",null,[t("strong",null,"A tool that ran and failed"),a(" is still a "),t("em",null,"successful"),a(" JSON-RPC call, answered with HTTP "),t("code",null,"200"),a(": the result carries "),t("code",null,"isError: true"),a(" and the message as text content. A profile that is not a heap dump, a query that matched nothing, a remote that stopped answering — anything the model is meant to read and try differently — lands here.")],-1)),o(d,{code:G,language:"json"}),e[153]||(e[153]=n("<p data-v-b5af1a16>This is what MCP specifies, and it is deliberate — the message is written for a model to act on. A profile that is not a heap dump, for instance, names the families to use instead.</p><p data-v-b5af1a16>A mistake in the arguments is this too. A missing required argument, an argument the tool does not take, or a value of the wrong type comes back as a tool result with <code data-v-b5af1a16>isError: true</code> and a message naming the fix, so the model can correct the call and try again. The schema’s bounds are advice rather than a gate: an out-of-range <code data-v-b5af1a16>limit</code> or <code data-v-b5af1a16>top</code> is clamped silently — a non-positive one takes the default, one above the maximum takes the maximum — and only a value no answer can be built from, such as a <code data-v-b5af1a16>thresholdPct</code> outside 0–100 or a <code data-v-b5af1a16>bucketMs</code> below its floor, is refused with <code data-v-b5af1a16>isError: true</code>. Only a call that could never reach a tool is a protocol error: an unknown tool name, or <code data-v-b5af1a16>arguments</code> that are not a JSON object — so a client can still tell “that tool does not exist” from “the analysis found nothing”.</p><p data-v-b5af1a16><strong data-v-b5af1a16>A protocol-level failure</strong> is a real JSON-RPC error object, and the HTTP status says which kind:</p>",3)),o(d,{code:F,language:"json"}),e[154]||(e[154]=n('<table data-v-b5af1a16><thead data-v-b5af1a16><tr data-v-b5af1a16><th data-v-b5af1a16>Code</th><th data-v-b5af1a16>HTTP</th><th data-v-b5af1a16>Meaning</th></tr></thead><tbody data-v-b5af1a16><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32602</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>Invalid <code data-v-b5af1a16>_meta</code>: no <code data-v-b5af1a16>_meta</code> or no <code data-v-b5af1a16>protocolVersion</code> in it — every <code data-v-b5af1a16>initialize</code> from a handshake-era client — with a message and <code data-v-b5af1a16>data.supported</code> naming <code data-v-b5af1a16>2026-07-28</code> (see <a href="#what-an-older-client-sees" data-v-b5af1a16>above</a>); also <code data-v-b5af1a16>params</code> that are not an object, or <code data-v-b5af1a16>clientCapabilities</code> missing</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32022</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>Unsupported protocol version: <code data-v-b5af1a16>MCP-Protocol-Version</code> and <code data-v-b5af1a16>_meta</code> agree on a version other than <code data-v-b5af1a16>2026-07-28</code>. <code data-v-b5af1a16>data.supported</code> is <code data-v-b5af1a16>[&quot;2026-07-28&quot;]</code>; <code data-v-b5af1a16>data.requested</code> echoes what was asked for</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32020</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>Header mismatch: <code data-v-b5af1a16>MCP-Protocol-Version</code>, <code data-v-b5af1a16>Mcp-Method</code> or <code data-v-b5af1a16>Mcp-Name</code> is missing, disagrees with the body, or is a malformed <code data-v-b5af1a16>=?base64?…?=</code> value. The message names the header and both values. The version header is compared with <code data-v-b5af1a16>_meta</code> before the version itself is judged, so a header that does not repeat <code data-v-b5af1a16>_meta</code> is <code data-v-b5af1a16>-32020</code> even when one of the two names an unsupported version</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32021</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>Missing client capability: the method belongs to an extension the client did not declare in <code data-v-b5af1a16>clientCapabilities</code>; <code data-v-b5af1a16>data.requiredCapabilities</code> says which. That is <code data-v-b5af1a16>tasks/get</code>, <code data-v-b5af1a16>tasks/update</code> and <code data-v-b5af1a16>tasks/cancel</code> from a client that did not declare <code data-v-b5af1a16>io.modelcontextprotocol/tasks</code></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32601</code></td><td data-v-b5af1a16><code data-v-b5af1a16>404</code></td><td data-v-b5af1a16>Unknown method — including <code data-v-b5af1a16>initialize</code>, <code data-v-b5af1a16>ping</code> and <code data-v-b5af1a16>logging/setLevel</code> sent with a valid <code data-v-b5af1a16>_meta</code>, <code data-v-b5af1a16>tasks/list</code> and <code data-v-b5af1a16>tasks/result</code>, which the tasks extension no longer has, and a <code data-v-b5af1a16>notifications/*</code> method sent with an <code data-v-b5af1a16>id</code></td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32600</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>Not a JSON-RPC request: not an object, a JSON array (batching does not exist), no <code data-v-b5af1a16>method</code>, or an <code data-v-b5af1a16>id</code> that is neither a string nor an integer</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32700</code></td><td data-v-b5af1a16><code data-v-b5af1a16>400</code></td><td data-v-b5af1a16>The body is not JSON</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32602</code></td><td data-v-b5af1a16><code data-v-b5af1a16>200</code></td><td data-v-b5af1a16>Invalid params, rejected before any tool was chosen: an unknown tool name, <code data-v-b5af1a16>arguments</code> that are not an object, a pagination <code data-v-b5af1a16>cursor</code> on a list method (this server never issues one), a malformed completion request, and a <code data-v-b5af1a16>resources/read</code> whose subject is not there — a <code data-v-b5af1a16>jeffrey://</code> URI this server does not serve, or a profile that does not exist — and a <code data-v-b5af1a16>taskId</code> that is unknown, expired, or belongs to a family this installation does not advertise. A missing, unknown or mistyped argument is a tool result with <code data-v-b5af1a16>isError: true</code> instead, as is a refused <code data-v-b5af1a16>thresholdPct</code> or <code data-v-b5af1a16>bucketMs</code>; an out-of-range <code data-v-b5af1a16>limit</code> or <code data-v-b5af1a16>top</code> is clamped, not refused</td></tr><tr data-v-b5af1a16><td data-v-b5af1a16><code data-v-b5af1a16>-32603</code></td><td data-v-b5af1a16><code data-v-b5af1a16>200</code></td><td data-v-b5af1a16>An internal failure outside the tool call</td></tr></tbody></table>',1)),t("p",null,[e[118]||(e[118]=a("An HTTP ",-1)),e[119]||(e[119]=t("code",null,"404",-1)),e[120]||(e[120]=a()),e[121]||(e[121]=t("em",null,"without",-1)),e[122]||(e[122]=a(" a JSON-RPC body is a different thing again: it means this installation switched the server off, not that the method was wrong. See ",-1)),o(r,{to:"/docs/microscope-mcp/enabling"},{default:s(()=>[...e[117]||(e[117]=[a("Enabling the Server",-1)])]),_:1}),e[123]||(e[123]=a(".",-1))])]),o(T)])}}}),se=A($,[["__scopeId","data-v-b5af1a16"]]);export{se as default};
