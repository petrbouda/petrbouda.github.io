import{D as r}from"./DocsCallout-CxMl0flk.js";import{D as d}from"./DocsCodeBlock-BP5k14G1.js";import{D as T}from"./DocsNavFooter-BpRWCVJt.js";import{D as x}from"./DocsPageHeader-BmhmgFM9.js";import{u as j}from"./useDocHeadings-ZAbLw5SE.js";import{d as M,k as P,c as q,e as o,a as t,j as a,w as c,b as s,i as I,o as S}from"./index-CEwwdbAp.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const H={class:"docs-article"},E={class:"docs-content"},O=`git clone https://github.com/petrbouda/jeffrey
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
}`,i=`"_meta": {
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
          { "uri": "skill://report/SKILL.md", "digest": "sha256:...", "size": 12968 },
          { "uri": "skill://report/references/tool-prefixes.md", "digest": "sha256:...", "size": 715 }
        ]
      }
    ],
    "resultType": "complete",
    "ttlMs": 3600000,
    "cacheScope": "public",
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "jeffrey", "version": "<application-build-version>" } }
  }
}`,l=`"_meta": {
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
}`,p=`"_meta": {
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
      ${i}
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
      ${i}
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
      ${i}
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
      ${i}
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
      ${i}
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
      ${l}
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
      ${l}
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
  }'`;return(Z,e)=>{const n=I("router-link");return S(),q("article",H,[o(x,{title:"Other Clients",icon:"bi bi-terminal-split"}),t("div",E,[t("p",null,[e[3]||(e[3]=a("The plugin — in ",-1)),o(n,{to:"/docs/microscope-mcp/claude-code"},{default:c(()=>[...e[0]||(e[0]=[a("Claude Code",-1)])]),_:1}),e[4]||(e[4]=a(", ",-1)),o(n,{to:"/docs/microscope-mcp/codex"},{default:c(()=>[...e[1]||(e[1]=[a("Codex",-1)])]),_:1}),e[5]||(e[5]=a(" or ",-1)),o(n,{to:"/docs/microscope-mcp/gemini"},{default:c(()=>[...e[2]||(e[2]=[a("Gemini CLI",-1)])]),_:1}),e[6]||(e[6]=a(" — is a convenience over an ordinary MCP server. Anything that speaks MCP ",-1)),e[7]||(e[7]=t("code",null,"2026-07-28",-1)),e[8]||(e[8]=a(" over Streamable HTTP can connect instead.",-1))]),o(r,{type:"warning",title:"MCP 2026-07-28 only"},{default:c(()=>[...e[9]||(e[9]=[a(" Jeffrey works with any client that speaks MCP ",-1),t("code",null,"2026-07-28",-1),a(" over Streamable HTTP. A client that opens with ",-1),t("code",null,"initialize",-1),a(" is refused with ",-1),t("code",null,"-32602",-1),a(" naming ",-1),t("code",null,"2026-07-28",-1),a(" — see ",-1),t("a",{href:"#what-an-older-client-sees"},"What an Older Client Sees",-1),a(". Everything below about Cursor, VS Code and Kiro applies once the client supports MCP ",-1),t("code",null,"2026-07-28",-1),a("; check your client’s release notes for that, since this page cannot track it. ",-1)])]),_:1}),e[113]||(e[113]=s('<h2 id="agent-plugins-clients" data-v-0cac98eb>Agent Plugins Clients</h2><p data-v-0cac98eb>The plugin carries an <a href="https://agent-plugins.org/" target="_blank" rel="noopener" data-v-0cac98eb>Agent Plugins</a> manifest, the vendor-neutral format <strong data-v-0cac98eb>Cursor</strong>, <strong data-v-0cac98eb>GitHub Copilot</strong>, <strong data-v-0cac98eb>VS Code</strong> and <strong data-v-0cac98eb>Kiro</strong> read alongside Codex. Where a client installs a plugin from a directory, <code data-v-0cac98eb>jeffrey-claude-plugin/</code> in a clone is that directory:</p>',2)),o(d,{code:O,language:"bash"}),t("p",null,[e[11]||(e[11]=a("What is standardised is the manifest, the ten skills and the ",-1)),e[12]||(e[12]=t("code",null,"streamable-http",-1)),e[13]||(e[13]=a(" server entry. Everything past that — how a plugin is browsed and installed, how skills are invoked, how tools are approved — is the client's own, and moves faster than this page can. The ",-1)),o(n,{to:"/docs/microscope-mcp/codex"},{default:c(()=>[...e[10]||(e[10]=[a("Codex",-1)])]),_:1}),e[14]||(e[14]=a(" page is the closest map, since it documents the same portable half in detail.",-1))]),e[114]||(e[114]=t("p",null,[a("None of them can carry the three agents, for the reason that page gives: Agent Plugins defines skills and MCP servers, and nothing else. And in all of them the endpoint is fixed at "),t("code",null,"localhost:8585"),a(", because the format forbids placeholder expansion in a server URL — a Jeffrey anywhere else is registered by hand, as below.")],-1)),o(r,{type:"info",title:"Gemini CLI is not one of them"},{default:c(()=>[e[16]||(e[16]=a(" It cannot connect to this Jeffrey until it supports MCP ",-1)),e[17]||(e[17]=t("code",null,"2026-07-28",-1)),e[18]||(e[18]=a(". It reads its own extension format rather than this manifest, and takes more from the package than these clients can — the skills, the session-start check, and an endpoint you can point elsewhere. It has a ",-1)),o(n,{to:"/docs/microscope-mcp/gemini"},{default:c(()=>[...e[15]||(e[15]=[a("page of its own",-1)])]),_:1}),e[19]||(e[19]=a(". Its ",-1)),e[20]||(e[20]=t("code",null,"mcpServers",-1)),e[21]||(e[21]=a(" entry also spells the endpoint its own way: ",-1)),e[22]||(e[22]=t("code",null,"httpUrl",-1)),e[23]||(e[23]=a(", or ",-1)),e[24]||(e[24]=t("code",null,"url",-1)),e[25]||(e[25]=a(" with ",-1)),e[26]||(e[26]=t("code",null,'"type": "http"',-1)),e[27]||(e[27]=a(" — which is what its own ",-1)),e[28]||(e[28]=t("code",null,"gemini mcp add --transport http",-1)),e[29]||(e[29]=a(" writes. ",-1))]),_:1}),e[115]||(e[115]=s('<h3 id="cursor" data-v-0cac98eb>Cursor</h3><p data-v-0cac98eb>Install the plugin from the cloned directory through Cursor&#39;s plugin browser. Without it, add the server to Cursor&#39;s MCP configuration — <code data-v-0cac98eb>~/.cursor/mcp.json</code> for every project, <code data-v-0cac98eb>.cursor/mcp.json</code> for one — using the <code data-v-0cac98eb>mcpServers</code> entry from <a href="#any-mcp-client" data-v-0cac98eb>Any MCP Client</a> below. The tools then appear as <code data-v-0cac98eb>jeffrey</code> in Cursor&#39;s MCP settings, one toggle per tool.</p><h3 id="vs-code-and-github-copilot" data-v-0cac98eb>VS Code and GitHub Copilot</h3><p data-v-0cac98eb>Copilot&#39;s agent mode reads MCP servers from <code data-v-0cac98eb>.vscode/mcp.json</code> in the workspace, or from your user settings for every workspace. The shape differs slightly from the one Claude Code uses — the key is <code data-v-0cac98eb>servers</code>:</p>',4)),o(d,{code:N,language:"json"}),e[116]||(e[116]=s('<p data-v-0cac98eb>Check it in and everyone working in that repository gets the same Jeffrey, assuming they run one. The command palette&#39;s <em data-v-0cac98eb>MCP: List Servers</em> shows whether it connected.</p><h3 id="kiro" data-v-0cac98eb>Kiro</h3><p data-v-0cac98eb>Kiro reads MCP servers from <code data-v-0cac98eb>.kiro/settings/mcp.json</code> in the workspace or <code data-v-0cac98eb>~/.kiro/settings/mcp.json</code> for every workspace, in the same <code data-v-0cac98eb>mcpServers</code> shape as <a href="#any-mcp-client" data-v-0cac98eb>below</a>. Its autoApprove list is the equivalent of the approval rules the plugin pages describe: naming the read-only tools there stops it asking each time.</p><h2 id="any-mcp-client" data-v-0cac98eb>Any MCP Client</h2><p data-v-0cac98eb>Register the server directly — useful when you want it in one project only, or when you would rather not add a marketplace:</p>',5)),o(d,{code:R,language:"bash"}),e[117]||(e[117]=t("p",null,[a("Or write it into a project’s "),t("code",null,".mcp.json"),a(":")],-1)),o(d,{code:J,language:"json"}),o(r,{type:"tip",title:"Both are offered ready-made"},{default:c(()=>[...e[30]||(e[30]=[a(" Build each of them around the address you actually reach Jeffrey on — behind a container, a proxy or a non-default port, ",-1),t("code",null,"localhost:8585",-1),a(" is not it. ",-1)])]),_:1}),e[118]||(e[118]=t("h2",{id:"what-you-give-up"},"What You Give Up",-1)),e[119]||(e[119]=t("p",null,[a("The same hundred and eleven tools, named "),t("code",null,"mcp__jeffrey__*"),a(" rather than the "),t("code",null,"mcp__plugin_microscope_jeffrey__*"),a(" Claude Code gives a plugin's server — a hand-registered server is not namespaced by a plugin. Adjust any approval rule accordingly: "),t("code",null,"/permissions"),a(" in Claude Code, the "),t("code",null,"[mcp_servers.jeffrey]"),a(" block in Codex.")],-1)),t("p",null,[e[32]||(e[32]=a("What does not come along as ",-1)),e[33]||(e[33]=t("em",null,"plugin",-1)),e[34]||(e[34]=a(" skills is the guidance: the entry sequence and the two database schemas. But it is not lost. The server offers the same files over the protocol twice: as ",-1)),e[35]||(e[35]=t("strong",null,"skills",-1)),e[36]||(e[36]=a(", through the MCP skills extension, so a client that speaks ",-1)),e[37]||(e[37]=t("code",null,"2026-07-28",-1)),e[38]||(e[38]=a(" with that extension gets all ten from the server and loads them as it would a plugin’s; and as ",-1)),e[39]||(e[39]=t("strong",null,"prompts",-1)),e[40]||(e[40]=a(", so a client that only speaks ",-1)),e[41]||(e[41]=t("code",null,"prompts/list",-1)),e[42]||(e[42]=a(" can still load any of them — see below. What is genuinely missing is the ",-1)),o(n,{to:"/docs/microscope-mcp/agent"},{default:c(()=>[...e[31]||(e[31]=[a("agents",-1)])]),_:1}),e[43]||(e[43]=a(", which no MCP server can provide, and, over prompts, the automatic loading: somebody has to ask for the prompt.",-1))]),e[120]||(e[120]=s('<h2 id="prompts-skills-and-resources" data-v-0cac98eb>Prompts, Skills and Resources</h2><p data-v-0cac98eb>Three capabilities beyond the tools, and they exist for exactly this page’s readers.</p><p data-v-0cac98eb>Every call on this page is a complete MCP <code data-v-0cac98eb>2026-07-28</code> request: the version and the client’s capabilities in <code data-v-0cac98eb>params._meta</code>, repeated in the <code data-v-0cac98eb>MCP-Protocol-Version</code> and <code data-v-0cac98eb>Mcp-Method</code> headers, plus <code data-v-0cac98eb>Mcp-Name</code> for the methods that name something. <a href="#the-wire-protocol" data-v-0cac98eb>The Wire Protocol</a> explains each.</p><p data-v-0cac98eb><strong data-v-0cac98eb>Prompts</strong> are the plugin’s skills, served over the protocol. <code data-v-0cac98eb>prompts/list</code> names them — <code data-v-0cac98eb>analyze-jfr</code>, <code data-v-0cac98eb>analyze-heap</code>, <code data-v-0cac98eb>analyze-hub</code>, <code data-v-0cac98eb>compare-jfr</code>, <code data-v-0cac98eb>advise-jfr</code>, <code data-v-0cac98eb>profile-run</code>, <code data-v-0cac98eb>regression-check</code>, <code data-v-0cac98eb>jfr-sql</code>, <code data-v-0cac98eb>heap-sql</code>, <code data-v-0cac98eb>report</code> — and <code data-v-0cac98eb>prompts/get</code> returns one as a message to insert. They are the same files the plugin ships, copied onto the server’s classpath when it is built, so they cannot drift from what a Claude Code or Codex user gets.</p>',4)),o(d,{code:m,language:"bash"}),e[121]||(e[121]=s("<p data-v-0cac98eb><strong data-v-0cac98eb>Skills</strong> are the same ten files as Agent Skills, over the <code data-v-0cac98eb>io.modelcontextprotocol/skills</code> extension, which <code data-v-0cac98eb>server/discover</code> lists under <code data-v-0cac98eb>capabilities.extensions</code>. <code data-v-0cac98eb>skills/list</code> returns every skill (the answer below is cut to one of the ten) with its front matter exactly as written and its complete manifest: each file’s <code data-v-0cac98eb>skill://</code> URI, a <code data-v-0cac98eb>sha256</code> digest over its bytes, and its size. <code data-v-0cac98eb>skills/get</code> returns one, named by the URI of its <code data-v-0cac98eb>SKILL.md</code>, and each file is read with the ordinary <code data-v-0cac98eb>resources/read</code>. A client loads them the way it loads a plugin’s skills, from the descriptions, without anybody asking. Every skill is self-contained — nothing in one points into another — so a client that reads only what a manifest lists reads everything the skill uses. An unknown skill or file is <code data-v-0cac98eb>-32602</code>.</p>",1)),o(d,{code:f,language:"bash"}),o(d,{code:V,language:"json"}),e[122]||(e[122]=s("<p data-v-0cac98eb><strong data-v-0cac98eb>Resources</strong> are the parts of a profile a client can attach rather than call for. <code data-v-0cac98eb>jeffrey://profiles</code> is the catalogue; <code data-v-0cac98eb>resources/templates/list</code> offers <code data-v-0cac98eb>jeffrey://profile/{profileId}/summary</code>, <code data-v-0cac98eb>jeffrey://profile/{profileId}/flamegraph/{eventType}</code>, <code data-v-0cac98eb>…/evidence</code>, <code data-v-0cac98eb>…/schema</code> and <code data-v-0cac98eb>…/findings</code>, each while the tool or family that reads the same data is advertised. The distinction is worth the two extra methods: a tool result scrolls away, where a resource a client has attached stays in view and can be referred back to. Reading the summary, evidence or flamegraph template runs the tool that would have answered the same question, so the two never disagree; <code data-v-0cac98eb>…/schema</code> and <code data-v-0cac98eb>…/findings</code> are documents no single tool returns, described below.</p><p data-v-0cac98eb><code data-v-0cac98eb>jeffrey://diagnostics</code> reports profile readiness, bounded Hub connectivity checks and aggregate tool metrics without connection addresses or tool arguments. The <code data-v-0cac98eb>jeffrey://profile/{profileId}/evidence</code> template exposes the same bounded evidence snapshot as <code data-v-0cac98eb>profiles_evidence</code>. <code data-v-0cac98eb>…/schema</code> is the profile database as one JSON document — every table and view, the <code data-v-0cac98eb>events</code> view included, with its columns, the note on the JSON <code data-v-0cac98eb>fields</code> column and each event type with its count — served with the <code data-v-0cac98eb>jfr_</code> family. <code data-v-0cac98eb>…/findings</code> merges every finding the profile already holds — the cached Auto Analysis, the container verdict, the capability gaps — with a <code data-v-0cac98eb>status</code> of <code data-v-0cac98eb>COMPUTED</code>, <code data-v-0cac98eb>NOT_COMPUTED</code> (and a <code data-v-0cac98eb>followUp</code> offering <code data-v-0cac98eb>jvm_autoAnalysis</code> with <code data-v-0cac98eb>compute</code>) or <code data-v-0cac98eb>CANNOT_COMPUTE</code>; it is read from the cache, so reading it never starts the analysis. Each read reflects the current state; attach or save a response when you need a fixed snapshot.</p>",2)),o(d,{code:g,language:"bash"}),e[123]||(e[123]=t("p",null,[t("code",null,"jeffrey://profiles"),a(" returns the first catalogue page and provides a continuation URI when more profiles match. The "),t("code",null,"jeffrey://profiles{?cursor,limit}"),a(" template continues it. "),t("code",null,"jeffrey://server"),a(" reports the build version, effective tool families and count, and supported protocol capabilities. It contains no raw configuration, local paths or Hub addresses.")],-1)),t("p",null,[e[45]||(e[45]=s("Every tool but <code data-v-0cac98eb>ide_source</code> declares an <code data-v-0cac98eb>outputSchema</code> — 110 of the 111 — and <code data-v-0cac98eb>tools/call</code> always returns <code data-v-0cac98eb>structuredContent</code> valid against it, beside the text: the same record as JSON, or Markdown ending in a footer (<code data-v-0cac98eb>Open in Microscope: …</code> and a <code data-v-0cac98eb>Next:</code> list) for the documents written to be read. There is no text-only variant for older clients, because there are no older clients. Each tool’s <code data-v-0cac98eb>_meta</code> also carries <code data-v-0cac98eb>jeffrey/cost</code> and, where it applies, <code data-v-0cac98eb>jeffrey/requires</code>; the ",19)),o(n,{to:"/docs/microscope-mcp/tools#answers"},{default:c(()=>[...e[44]||(e[44]=[a("Tool Reference",-1)])]),_:1}),e[46]||(e[46]=a(" explains both and the conventions every answer follows — epoch-millisecond time, upper-case enums, ",-1)),e[47]||(e[47]=t("code",null,"status",-1)),e[48]||(e[48]=a(" instead of an error for a question with no data, cursor paging, ",-1)),e[49]||(e[49]=t("code",null,"followUp",-1)),e[50]||(e[50]=a(" and ",-1)),e[51]||(e[51]=t("code",null,"uiLink",-1)),e[52]||(e[52]=a(".",-1))]),e[124]||(e[124]=s('<p id="trace-context" data-v-0cac98eb>A request may carry the caller’s W3C trace context as <code data-v-0cac98eb>traceparent</code> and <code data-v-0cac98eb>tracestate</code> in <code data-v-0cac98eb>params._meta</code>; Jeffrey records both verbatim as attributes of the span it keeps for that tool call, beside its own ids, and drops a malformed one without an error.</p><h2 id="the-wire-protocol" data-v-0cac98eb>The Wire Protocol</h2><p data-v-0cac98eb>Whatever the client, the endpoint is plain <strong data-v-0cac98eb>JSON-RPC 2.0 over HTTP POST</strong>, and it speaks exactly one MCP revision: <strong data-v-0cac98eb><code data-v-0cac98eb>2026-07-28</code></strong>, the stateless one. There is no handshake and no session. Every request says for itself which revision it speaks and what the client can do, in <code data-v-0cac98eb>params._meta</code>:</p><ul data-v-0cac98eb><li data-v-0cac98eb><code data-v-0cac98eb>io.modelcontextprotocol/protocolVersion</code> — <code data-v-0cac98eb>&quot;2026-07-28&quot;</code>, required</li><li data-v-0cac98eb><code data-v-0cac98eb>io.modelcontextprotocol/clientCapabilities</code> — an object, required; <code data-v-0cac98eb>{}</code> when the client declares nothing</li><li data-v-0cac98eb><code data-v-0cac98eb>io.modelcontextprotocol/clientInfo</code> — the client’s name and version, optional</li></ul><p data-v-0cac98eb>And three headers repeat what the body says, so a proxy or a server can route and refuse a request without parsing it:</p><ul data-v-0cac98eb><li data-v-0cac98eb><code data-v-0cac98eb>MCP-Protocol-Version: 2026-07-28</code> — on every request, equal to the version in <code data-v-0cac98eb>_meta</code></li><li data-v-0cac98eb><code data-v-0cac98eb>Mcp-Method</code> — on every request, equal to <code data-v-0cac98eb>method</code></li><li data-v-0cac98eb><code data-v-0cac98eb>Mcp-Name</code> — on <code data-v-0cac98eb>tools/call</code> and <code data-v-0cac98eb>prompts/get</code> equal to <code data-v-0cac98eb>params.name</code>, on <code data-v-0cac98eb>resources/read</code> equal to <code data-v-0cac98eb>params.uri</code>, on <code data-v-0cac98eb>tasks/get</code>, <code data-v-0cac98eb>tasks/update</code> and <code data-v-0cac98eb>tasks/cancel</code> equal to <code data-v-0cac98eb>params.taskId</code>. A value that is not plain ASCII is sent as <code data-v-0cac98eb>=?base64?…?=</code></li></ul><p data-v-0cac98eb>Every result says what kind it is in <code data-v-0cac98eb>resultType</code> (<code data-v-0cac98eb>complete</code>; <code data-v-0cac98eb>task</code> when a <code data-v-0cac98eb>tools/call</code> hands back a <a href="#tasks" data-v-0cac98eb>task</a>; <code data-v-0cac98eb>input_required</code> when it <a href="#input-requests" data-v-0cac98eb>asks the user</a> something first) and which server answered in <code data-v-0cac98eb>_meta[&quot;io.modelcontextprotocol/serverInfo&quot;]</code>. The results a client may cache — <code data-v-0cac98eb>server/discover</code>, the list methods, <code data-v-0cac98eb>skills/get</code> and <code data-v-0cac98eb>resources/read</code> — carry <code data-v-0cac98eb>ttlMs</code> and <code data-v-0cac98eb>cacheScope</code>: an hour and <code data-v-0cac98eb>public</code> for the discover, list and skill answers and for reading a skill’s file, which change only with a new Jeffrey build, and <code data-v-0cac98eb>0</code> and <code data-v-0cac98eb>private</code> for reading a <code data-v-0cac98eb>jeffrey://</code> resource, which reflects the catalogue as it is now.</p><p data-v-0cac98eb>A <code data-v-0cac98eb>GET</code> or <code data-v-0cac98eb>DELETE</code> on the endpoint answers <code data-v-0cac98eb>405</code>: there is no server-to-client stream to open and no session to end.</p><table data-v-0cac98eb><thead data-v-0cac98eb><tr data-v-0cac98eb><th data-v-0cac98eb>Method</th><th data-v-0cac98eb>Purpose</th></tr></thead><tbody data-v-0cac98eb><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>server/discover</code></td><td data-v-0cac98eb>What the server speaks and offers: <code data-v-0cac98eb>supportedVersions</code>, <code data-v-0cac98eb>capabilities</code> (including <code data-v-0cac98eb>extensions</code>), the <code data-v-0cac98eb>instructions</code>, and <code data-v-0cac98eb>serverInfo</code>. Never assembles the toolset, so it answers even when a tool family cannot be built — which makes it the probe to use for “is Jeffrey up”</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>tools/list</code></td><td data-v-0cac98eb>Every tool with its description, its JSON-Schema input (including <code data-v-0cac98eb>required</code> and <code data-v-0cac98eb>enum</code>), its <code data-v-0cac98eb>outputSchema</code> where it has one, and its <code data-v-0cac98eb>annotations</code></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>tools/call</code></td><td data-v-0cac98eb>Runs one tool; the result is text content, plus <code data-v-0cac98eb>structuredContent</code> for the tools that declare an <code data-v-0cac98eb>outputSchema</code></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>prompts/list</code>, <code data-v-0cac98eb>prompts/get</code></td><td data-v-0cac98eb>The plugin’s skills as prompts — see <a href="#prompts-skills-and-resources" data-v-0cac98eb>above</a></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>skills/list</code>, <code data-v-0cac98eb>skills/get</code></td><td data-v-0cac98eb>The same skills over the skills extension, each with its front matter and manifest; their files are read with <code data-v-0cac98eb>resources/read</code> — see <a href="#prompts-skills-and-resources" data-v-0cac98eb>above</a></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>resources/list</code>, <code data-v-0cac98eb>resources/templates/list</code>, <code data-v-0cac98eb>resources/read</code></td><td data-v-0cac98eb>The catalogue, the per-profile templates, and the content behind a <code data-v-0cac98eb>jeffrey://</code> URI</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>tasks/get</code>, <code data-v-0cac98eb>tasks/update</code>, <code data-v-0cac98eb>tasks/cancel</code></td><td data-v-0cac98eb>Follow and stop a task a <code data-v-0cac98eb>tools/call</code> handed back — only for a client that declared the tasks extension; see <a href="#tasks" data-v-0cac98eb>Tasks</a></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>completion/complete</code></td><td data-v-0cac98eb>Completes <code data-v-0cac98eb>profileId</code> and <code data-v-0cac98eb>baselineProfileId</code> for a prompt argument or a per-profile template, from the live catalogue — see <a href="#completions" data-v-0cac98eb>below</a></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>notifications/*</code></td><td data-v-0cac98eb>Accepted and acknowledged with <code data-v-0cac98eb>202</code> and no body, per JSON-RPC. They still carry <code data-v-0cac98eb>_meta</code> and the headers</td></tr></tbody></table><p data-v-0cac98eb>Nothing else is served. <code data-v-0cac98eb>initialize</code>, <code data-v-0cac98eb>ping</code> and <code data-v-0cac98eb>logging/setLevel</code> do not exist in <code data-v-0cac98eb>2026-07-28</code>, and JSON-RPC batching does not either: a JSON array is refused whole with <code data-v-0cac98eb>-32600</code>.</p><h3 id="tasks" data-v-0cac98eb>Tasks</h3><p data-v-0cac98eb>Jeffrey serves the MCP tasks extension, <code data-v-0cac98eb>io.modelcontextprotocol/tasks</code>, and <code data-v-0cac98eb>server/discover</code> lists it under <code data-v-0cac98eb>capabilities.extensions</code> whenever a family that starts long work is advertised. A client that declares it too — in the <code data-v-0cac98eb>clientCapabilities</code> of each request — is not held for forty-five seconds by a long call. The seven tools that can take a while (<code data-v-0cac98eb>recordings_analyzeFile</code>, <code data-v-0cac98eb>recordings_analyzeRecording</code>, <code data-v-0cac98eb>hubs_download</code>, <code data-v-0cac98eb>hubs_fetchFile</code>, <code data-v-0cac98eb>heap_prepare</code>, <code data-v-0cac98eb>heap_oql</code> with <code data-v-0cac98eb>includeRetainedSize</code> and <code data-v-0cac98eb>jvm_autoAnalysis</code> with <code data-v-0cac98eb>compute</code>) wait about <strong data-v-0cac98eb>five seconds</strong> for it: work that finishes answers directly, and work that does not comes back as a task. <code data-v-0cac98eb>heap_prepare</code> does not wait at all: such a client gets its task at once. A client that did not declare the extension gets what it always got — the forty-five-second wait and an <code data-v-0cac98eb>operationId</code> for <code data-v-0cac98eb>operations_status</code>. Only <code data-v-0cac98eb>tools/call</code> ever answers with a task; Jeffrey decides when, so <code data-v-0cac98eb>tools/list</code> does not change.</p>',12)),o(d,{code:y,language:"bash"}),o(d,{code:L,language:"json"}),e[125]||(e[125]=s("<p data-v-0cac98eb><code data-v-0cac98eb>tasks/get</code> reports where the task stands — <code data-v-0cac98eb>working</code>, <code data-v-0cac98eb>completed</code>, <code data-v-0cac98eb>failed</code> or <code data-v-0cac98eb>cancelled</code> — and, once it has finished, carries the full <code data-v-0cac98eb>tools/call</code> result in <code data-v-0cac98eb>result</code>. <code data-v-0cac98eb>tasks/cancel</code> asks the work to stop and answers straight away; <code data-v-0cac98eb>tasks/get</code> says <code data-v-0cac98eb>cancelled</code> once it has. <code data-v-0cac98eb>tasks/update</code> only confirms the task exists: no tool asks for input in the middle of its work. Each carries the <code data-v-0cac98eb>taskId</code> in <code data-v-0cac98eb>params</code> and in <code data-v-0cac98eb>Mcp-Name</code>.</p>",1)),o(d,{code:w,language:"bash"}),o(d,{code:z,language:"json"}),e[126]||(e[126]=s('<ul data-v-0cac98eb><li data-v-0cac98eb><strong data-v-0cac98eb>The <code data-v-0cac98eb>taskId</code> is the <code data-v-0cac98eb>operationId</code>.</strong> Both name the same attempt in one in-memory store, so <code data-v-0cac98eb>operations_status</code> reads a task as well, and a task is reachable only while the family that started it is advertised. An unknown, expired or withheld id is <code data-v-0cac98eb>-32602</code>, and a restart forgets every task.</li><li data-v-0cac98eb><strong data-v-0cac98eb>Two calls that join one operation share one <code data-v-0cac98eb>taskId</code></strong> — a second import of the same file while the first is copying it, a second analysis of the same recording, a second download of the same session. A <code data-v-0cac98eb>tasks/cancel</code> from either caller cancels the work both are following.</li><li data-v-0cac98eb><strong data-v-0cac98eb><code data-v-0cac98eb>ttlMs</code> is retention, not a cache hint and not a deadline.</strong> It says the task stays readable for an hour once it has finished. A task still <code data-v-0cac98eb>working</code> outlives its advertised <code data-v-0cac98eb>ttlMs</code> for as long as the work runs. <code data-v-0cac98eb>pollIntervalMs</code> asks for a poll every five seconds.</li><li data-v-0cac98eb><strong data-v-0cac98eb>The result is what a waiting caller would have read</strong> — with one exception. An analysis that failed is a task <code data-v-0cac98eb>completed</code> with <code data-v-0cac98eb>isError: true</code> in its <code data-v-0cac98eb>result</code>, where a client that waited on <code data-v-0cac98eb>recordings_analyzeRecording</code> is answered with a status document that reports the failure without being an error. A tool that could not produce an answer at all makes the task <code data-v-0cac98eb>failed</code>.</li></ul><h3 id="input-requests" data-v-0cac98eb>Input Requests</h3><p data-v-0cac98eb>Two tools can ask the user something before they act, as the <code data-v-0cac98eb>2026-07-28</code> input-request flow (an <code data-v-0cac98eb>input_required</code> result carrying a form <code data-v-0cac98eb>elicitation/create</code>) allows. They ask <strong data-v-0cac98eb>only a client that declared form elicitation</strong> — <code data-v-0cac98eb>&quot;elicitation&quot;: {&quot;form&quot;: {}}</code> in its <code data-v-0cac98eb>clientCapabilities</code>, or an empty <code data-v-0cac98eb>&quot;elicitation&quot;: {}</code>, the older shape that meant form; <code data-v-0cac98eb>url</code> alone is not form. Every other client behaves exactly as before, and answers it sends anyway are ignored.</p>',3)),t("ul",null,[t("li",null,[e[54]||(e[54]=t("code",null,"recordings_delete",-1)),e[55]||(e[55]=a(" asks the user to ",-1)),o(n,{to:"/docs/microscope-mcp/tools#delete-confirmation"},{default:c(()=>[...e[53]||(e[53]=[a("confirm the deletion",-1)])]),_:1}),e[56]||(e[56]=a(". A host that asks before a tool with ",-1)),e[57]||(e[57]=t("code",null,"destructiveHint",-1)),e[58]||(e[58]=a(" still does; this question comes from Jeffrey and names what goes.",-1))]),t("li",null,[e[60]||(e[60]=t("code",null,"hubs_download",-1)),e[61]||(e[61]=a(" asks ",-1)),o(n,{to:"/docs/microscope-mcp/tools#window-question"},{default:c(()=>[...e[59]||(e[59]=[a("which part of a large session",-1)])]),_:1}),e[62]||(e[62]=a(" to bring — one longer than an hour or bigger than 1 GB by default — when the call names the whole session. The question comes before anything crosses the network, and before any ",-1)),e[63]||(e[63]=t("a",{href:"#tasks"},"task",-1)),e[64]||(e[64]=a(": the transfer that follows the answer takes the usual five-second path to a task.",-1))])]),e[127]||(e[127]=s("<p data-v-0cac98eb>The question is a result, not a request from the server: the call answers with <code data-v-0cac98eb>resultType: &quot;input_required&quot;</code> and an <code data-v-0cac98eb>inputRequests</code> map, one entry per question under a key the tool chooses, each an <code data-v-0cac98eb>elicitation/create</code> in <code data-v-0cac98eb>form</code> mode with a <code data-v-0cac98eb>message</code> and a flat <code data-v-0cac98eb>requestedSchema</code>. Like every result it carries <code data-v-0cac98eb>serverInfo</code>, and like no cacheable one it carries no <code data-v-0cac98eb>ttlMs</code> or <code data-v-0cac98eb>cacheScope</code> — the answer belongs to the user.</p>",1)),o(d,{code:k,language:"bash"}),o(d,{code:U,language:"json"}),e[128]||(e[128]=s("<p data-v-0cac98eb>The client shows the form, then sends the <strong data-v-0cac98eb>same call again</strong> — a new <code data-v-0cac98eb>id</code>, the same <code data-v-0cac98eb>name</code> and <code data-v-0cac98eb>arguments</code> — with <code data-v-0cac98eb>inputResponses</code> under the same keys: <code data-v-0cac98eb>action</code> is <code data-v-0cac98eb>accept</code>, <code data-v-0cac98eb>decline</code> or <code data-v-0cac98eb>cancel</code>, and <code data-v-0cac98eb>content</code> holds the form’s fields on an accept. Jeffrey sends no <code data-v-0cac98eb>requestState</code>: the arguments already name everything, and the retry is judged afresh, so a recording that became undeletable in the meantime is still refused.</p>",1)),o(d,{code:C,language:"bash"}),o(d,{code:W,language:"json"}),e[129]||(e[129]=s('<ul data-v-0cac98eb><li data-v-0cac98eb><strong data-v-0cac98eb>No is an answer, not an error.</strong> A decline or a dismissal — or the box left unchecked — completes the call without <code data-v-0cac98eb>isError</code>: <code data-v-0cac98eb>{&quot;status&quot;: &quot;NOT_CONFIRMED&quot;, …}</code> from <code data-v-0cac98eb>recordings_delete</code>, <code data-v-0cac98eb>{&quot;status&quot;: &quot;NOT_DOWNLOADED&quot;, …}</code> from <code data-v-0cac98eb>hubs_download</code>, with nothing deleted or transferred.</li><li data-v-0cac98eb><strong data-v-0cac98eb>A malformed answer asks again.</strong> Content missing a field, a value of the wrong type or out of range, an end before a start — each is answered with a new <code data-v-0cac98eb>input_required</code> result whose message states the problem first. It never ends in an error.</li><li data-v-0cac98eb><strong data-v-0cac98eb>A task never waits on input.</strong> Questions are asked only before work starts; <code data-v-0cac98eb>tasks/update</code> ignores <code data-v-0cac98eb>inputResponses</code>.</li></ul><h3 id="what-an-older-client-sees" data-v-0cac98eb>What an Older Client Sees</h3><p data-v-0cac98eb>A client built for the handshake revisions (<code data-v-0cac98eb>2024-11-05</code> to <code data-v-0cac98eb>2025-11-25</code>) opens with <code data-v-0cac98eb>initialize</code> and sends no <code data-v-0cac98eb>_meta</code>. Jeffrey no longer speaks those revisions, and says so rather than failing vaguely. A request without <code data-v-0cac98eb>_meta</code>, or without the version in it, is malformed under <code data-v-0cac98eb>2026-07-28</code>, so the answer is <code data-v-0cac98eb>400</code> with <code data-v-0cac98eb>-32602</code> — but its message and <code data-v-0cac98eb>data.supported</code> name <code data-v-0cac98eb>2026-07-28</code>, since a handshake-era client has nowhere else to learn what to speak. A client that does send <code data-v-0cac98eb>_meta</code>, with the header and <code data-v-0cac98eb>_meta</code> agreeing on a version Jeffrey does not speak, gets <code data-v-0cac98eb>-32022</code> instead, with that version echoed in <code data-v-0cac98eb>data.requested</code>.</p>',3)),o(d,{code:K,language:"bash"}),o(d,{code:X,language:"json"}),e[130]||(e[130]=t("p",null,[a("How the client shows that is up to the client — usually as a server that failed to start. Jeffrey’s log records each refusal at "),t("code",null,"INFO"),a(", which is the quickest way to tell “wrong revision” from “not running”:")],-1)),o(d,{code:B,language:"text"}),t("p",null,[e[67]||(e[67]=a("The fix is on the client side: a version that supports MCP ",-1)),e[68]||(e[68]=t("code",null,"2026-07-28",-1)),e[69]||(e[69]=a(", or the setting that turns it on — the ",-1)),o(n,{to:"/docs/microscope-mcp/claude-code#before-you-start"},{default:c(()=>[...e[65]||(e[65]=[a("Claude Code",-1)])]),_:1}),e[70]||(e[70]=a(" and ",-1)),o(n,{to:"/docs/microscope-mcp/codex#before-you-start"},{default:c(()=>[...e[66]||(e[66]=[a("Codex",-1)])]),_:1}),e[71]||(e[71]=a(" pages say which.",-1))]),o(r,{type:"info",title:"Every tool says whether it writes"},{default:c(()=>[e[73]||(e[73]=a(" Each spec in ",-1)),e[74]||(e[74]=t("code",null,"tools/list",-1)),e[75]||(e[75]=a(" carries MCP ",-1)),e[76]||(e[76]=t("code",null,"annotations",-1)),e[77]||(e[77]=a(": ",-1)),e[78]||(e[78]=t("code",null,"readOnlyHint",-1)),e[79]||(e[79]=a(", ",-1)),e[80]||(e[80]=t("code",null,"destructiveHint",-1)),e[81]||(e[81]=a(", ",-1)),e[82]||(e[82]=t("code",null,"idempotentHint",-1)),e[83]||(e[83]=a(" and ",-1)),e[84]||(e[84]=t("code",null,"openWorldHint",-1)),e[85]||(e[85]=a(". Almost everything Jeffrey exposes only reads a profile, and declares it; the ",-1)),o(n,{to:"/docs/microscope-mcp/clients#what-writes"},{default:c(()=>[...e[72]||(e[72]=[a("eleven that write",-1)])]),_:1}),e[86]||(e[86]=a(" declare that too, each for itself rather than for its family, so ",-1)),e[87]||(e[87]=t("code",null,"recordings_list",-1)),e[88]||(e[88]=a(", ",-1)),e[89]||(e[89]=t("code",null,"recordings_status",-1)),e[90]||(e[90]=a(" and ",-1)),e[91]||(e[91]=t("code",null,"heap_status",-1)),e[92]||(e[92]=a(" read as read-only although they sit beside writers. ",-1)),e[93]||(e[93]=t("code",null,"destructiveHint",-1)),e[94]||(e[94]=a(" is true on ",-1)),e[95]||(e[95]=t("code",null,"recordings_delete",-1)),e[96]||(e[96]=a(" alone — nothing else deletes a profile, a recording or a dump — and ",-1)),e[97]||(e[97]=t("code",null,"openWorldHint",-1)),e[98]||(e[98]=a(" marks the ",-1)),e[99]||(e[99]=t("code",null,"hubs_",-1)),e[100]||(e[100]=a(" and ",-1)),e[101]||(e[101]=t("code",null,"ide_",-1)),e[102]||(e[102]=a(" families, and the ",-1)),e[103]||(e[103]=t("code",null,"operations_",-1)),e[104]||(e[104]=a(" pair, which can poll or cancel a remote Hub transfer. A client that gates approval on those hints does not need a hand-written deny-list. ",-1))]),_:1}),e[131]||(e[131]=s('<h2 id="instructions-and-completions" data-v-0cac98eb>Instructions and Completions</h2><p data-v-0cac98eb>Two things the server hands a client that has no plugin behind it.</p><p data-v-0cac98eb><strong data-v-0cac98eb><code data-v-0cac98eb>server/discover</code> returns an <code data-v-0cac98eb>instructions</code> field.</strong> A hundred-odd tools in nineteen families is a lot to meet with nothing but a tool list, so discovery carries the short version: start at <code data-v-0cac98eb>profiles_list</code>, then <code data-v-0cac98eb>profiles_summary</code> and read <code data-v-0cac98eb>topFindings</code> and <code data-v-0cac98eb>capabilityGaps</code> before choosing a family; every tool outside <code data-v-0cac98eb>profiles_list</code> and the <code data-v-0cac98eb>recordings_</code>, <code data-v-0cac98eb>hubs_</code> and <code data-v-0cac98eb>operations_</code> families needs a <code data-v-0cac98eb>profileId</code>; what each family is for; the call order that matters inside each advertised family — <code data-v-0cac98eb>flamegraph_list</code> before <code data-v-0cac98eb>flamegraph_export</code>, <code data-v-0cac98eb>compare_list</code> before the other <code data-v-0cac98eb>compare_</code> tools, <code data-v-0cac98eb>jvm_sections</code> before the other <code data-v-0cac98eb>jvm_</code> tools, <code data-v-0cac98eb>ide_resolve</code> before a finding names a file, and the like; that the eleven writers are named and the long ones return an <code data-v-0cac98eb>operationId</code> to poll, or a task after about five seconds to a client that declared the tasks extension; and that output is capped and always says when it cut. Most clients put it in front of the model automatically. The longer guidance stays where it was — one prompt per workflow.</p><p id="completions" data-v-0cac98eb><strong data-v-0cac98eb><code data-v-0cac98eb>completion/complete</code> completes <code data-v-0cac98eb>profileId</code> and <code data-v-0cac98eb>baselineProfileId</code>.</strong> A profile id is a UUIDv7, and there is no way to produce one except by reading it out of the catalogue first, which is exactly what this method exists for; <code data-v-0cac98eb>baselineProfileId</code> is the same kind of value, filled from the same catalogue, for the one prompt and handful of tools that compare two profiles. It answers for both reference types — a <code data-v-0cac98eb>ref/prompt</code>, for whichever of the two arguments the prompt declares, and a <code data-v-0cac98eb>ref/resource</code> naming one of the per-profile templates — matching on what has been typed so far, case-insensitively, and capping the response at the hundred values the protocol allows while reporting the true <code data-v-0cac98eb>total</code>. No other argument is completed: an event type is <code data-v-0cac98eb>jdk.ExecutionSample</code>, a name a model already knows. The capability is declared only when the <code data-v-0cac98eb>profiles</code> family is advertised, so a narrowed server does not offer a picker it cannot fill.</p><p data-v-0cac98eb><strong data-v-0cac98eb>Tool results can carry resource links.</strong> Where a tool has an exact resource counterpart — <code data-v-0cac98eb>profiles_summary</code>, <code data-v-0cac98eb>profiles_evidence</code>, and an unnarrowed <code data-v-0cac98eb>flamegraph_export</code> — the result carries a <code data-v-0cac98eb>resource_link</code> block after its text, so a client can attach the answer instead of letting it scroll away. <code data-v-0cac98eb>profiles_summary</code> and <code data-v-0cac98eb>profiles_evidence</code> also link the profile’s <code data-v-0cac98eb>…/findings</code>, and <code data-v-0cac98eb>jfr_listTables</code> and <code data-v-0cac98eb>jfr_describeTable</code> its <code data-v-0cac98eb>…/schema</code>, the whole document their answer is part of. The text block is always there; a link is an extra, never a replacement. A filtered flamegraph gets no link to the template, because the template takes an event type and nothing else and would return a different call tree under the same name.</p>',5)),o(r,{type:"info",title:"POST-only, and stateless on purpose"},{default:c(()=>[...e[105]||(e[105]=[a(" The endpoint answers ",-1),t("code",null,"POST",-1),a(" and nothing else. ",-1),t("code",null,"GET",-1),a(" and ",-1),t("code",null,"DELETE",-1),a(" return ",-1),t("code",null,"405",-1),a(": there is no server-to-client SSE stream, no ",-1),t("code",null,"Mcp-Session-Id",-1),a(", and therefore no server-initiated notifications — no ",-1),t("code",null,"notifications/progress",-1),a(", and no ",-1),t("code",null,"listChanged",-1),a(" or ",-1),t("code",null,"resources/updated",-1),a(", each of which ",-1),t("code",null,"server/discover",-1),a(" declares as absent rather than leaving a client to discover. Long-running work is polled instead: a long call hands back an ",-1),t("code",null,"operationId",-1),a(" that ",-1),t("code",null,"operations_status",-1),a(" reports on or, to a client that declared the tasks extension, a ",-1),t("a",{href:"#tasks"},"task",-1),a(" that ",-1),t("code",null,"tasks/get",-1),a(" reports on. That survives a dropped connection, which a progress stream does not, and it keeps the server a plain request-response service that any HTTP client can drive. ",-1)])]),_:1}),e[132]||(e[132]=t("h2",{id:"a-session-by-hand"},"A Session by Hand",-1)),e[133]||(e[133]=t("p",null,[a("Everything below works with "),t("code",null,"curl"),a(", which makes it a good way to check that the server is up before blaming a client.")],-1)),e[134]||(e[134]=t("p",null,[t("strong",null,"Discover"),a(" — the same request the plugin’s startup check sends:")],-1)),o(d,{code:b,language:"bash"}),o(d,{code:D,language:"json"}),e[135]||(e[135]=t("p",null,[a("Then "),t("code",null,"tools/list"),a(" with the same envelope — "),t("code",null,"Mcp-Method: tools/list"),a(" and "),t("code",null,'"method": "tools/list"'),a(" — returns all hundred and eleven specs. To run one, name the tool in "),t("code",null,"Mcp-Name"),a(" as well:")],-1)),o(d,{code:h,language:"bash"}),e[136]||(e[136]=t("p",null,"The result arrives as MCP text content — for the export tools, the same Markdown document the plugin would hand to Claude, preamble included.",-1)),e[137]||(e[137]=t("h2",{id:"errors"},"Errors",-1)),e[138]||(e[138]=t("p",null,"There are two distinct failure shapes, and a client has to read both.",-1)),e[139]||(e[139]=t("p",null,[t("strong",null,"A tool that ran and failed"),a(" is still a "),t("em",null,"successful"),a(" JSON-RPC call, answered with HTTP "),t("code",null,"200"),a(": the result carries "),t("code",null,"isError: true"),a(" and the message as text content. A profile with no heap dump, a query that matched nothing, a hub that stopped answering — anything the model is meant to read and try differently — lands here.")],-1)),o(d,{code:G,language:"json"}),e[140]||(e[140]=s("<p data-v-0cac98eb>This is what MCP specifies, and it is deliberate — the message is written for a model to act on. A profile with no heap dump, for instance, names the families to use instead.</p><p data-v-0cac98eb>A mistake in the arguments is this too. A missing required argument, an argument the tool does not take, or a value of the wrong type comes back as a tool result with <code data-v-0cac98eb>isError: true</code> and a message naming the fix, so the model can correct the call and try again. The schema’s bounds are advice rather than a gate: an out-of-range <code data-v-0cac98eb>limit</code> or <code data-v-0cac98eb>top</code> is clamped silently — a non-positive one takes the default, one above the maximum takes the maximum — and only a value no answer can be built from, such as a <code data-v-0cac98eb>thresholdPct</code> outside 0–100 or a <code data-v-0cac98eb>bucketMs</code> below its floor, is refused with <code data-v-0cac98eb>isError: true</code>. Only a call that could never reach a tool is a protocol error: an unknown tool name, or <code data-v-0cac98eb>arguments</code> that are not a JSON object — so a client can still tell “that tool does not exist” from “the analysis found nothing”.</p><p data-v-0cac98eb><strong data-v-0cac98eb>A protocol-level failure</strong> is a real JSON-RPC error object, and the HTTP status says which kind:</p>",3)),o(d,{code:F,language:"json"}),e[141]||(e[141]=s('<table data-v-0cac98eb><thead data-v-0cac98eb><tr data-v-0cac98eb><th data-v-0cac98eb>Code</th><th data-v-0cac98eb>HTTP</th><th data-v-0cac98eb>Meaning</th></tr></thead><tbody data-v-0cac98eb><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32602</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>Invalid <code data-v-0cac98eb>_meta</code>: no <code data-v-0cac98eb>_meta</code> or no <code data-v-0cac98eb>protocolVersion</code> in it — every <code data-v-0cac98eb>initialize</code> from a handshake-era client — with a message and <code data-v-0cac98eb>data.supported</code> naming <code data-v-0cac98eb>2026-07-28</code> (see <a href="#what-an-older-client-sees" data-v-0cac98eb>above</a>); also <code data-v-0cac98eb>params</code> that are not an object, or <code data-v-0cac98eb>clientCapabilities</code> missing</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32022</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>Unsupported protocol version: <code data-v-0cac98eb>MCP-Protocol-Version</code> and <code data-v-0cac98eb>_meta</code> agree on a version other than <code data-v-0cac98eb>2026-07-28</code>. <code data-v-0cac98eb>data.supported</code> is <code data-v-0cac98eb>[&quot;2026-07-28&quot;]</code>; <code data-v-0cac98eb>data.requested</code> echoes what was asked for</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32020</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>Header mismatch: <code data-v-0cac98eb>MCP-Protocol-Version</code>, <code data-v-0cac98eb>Mcp-Method</code> or <code data-v-0cac98eb>Mcp-Name</code> is missing, disagrees with the body, or is a malformed <code data-v-0cac98eb>=?base64?…?=</code> value. The message names the header and both values. The version header is compared with <code data-v-0cac98eb>_meta</code> before the version itself is judged, so a header that does not repeat <code data-v-0cac98eb>_meta</code> is <code data-v-0cac98eb>-32020</code> even when one of the two names an unsupported version</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32021</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>Missing client capability: the method belongs to an extension the client did not declare in <code data-v-0cac98eb>clientCapabilities</code>; <code data-v-0cac98eb>data.requiredCapabilities</code> says which. That is <code data-v-0cac98eb>tasks/get</code>, <code data-v-0cac98eb>tasks/update</code> and <code data-v-0cac98eb>tasks/cancel</code> from a client that did not declare <code data-v-0cac98eb>io.modelcontextprotocol/tasks</code></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32601</code></td><td data-v-0cac98eb><code data-v-0cac98eb>404</code></td><td data-v-0cac98eb>Unknown method — including <code data-v-0cac98eb>initialize</code>, <code data-v-0cac98eb>ping</code> and <code data-v-0cac98eb>logging/setLevel</code> sent with a valid <code data-v-0cac98eb>_meta</code>, <code data-v-0cac98eb>tasks/list</code> and <code data-v-0cac98eb>tasks/result</code>, which the tasks extension no longer has, and a <code data-v-0cac98eb>notifications/*</code> method sent with an <code data-v-0cac98eb>id</code></td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32600</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>Not a JSON-RPC request: not an object, a JSON array (batching does not exist), no <code data-v-0cac98eb>method</code>, or an <code data-v-0cac98eb>id</code> that is neither a string nor an integer</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32700</code></td><td data-v-0cac98eb><code data-v-0cac98eb>400</code></td><td data-v-0cac98eb>The body is not JSON</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32602</code></td><td data-v-0cac98eb><code data-v-0cac98eb>200</code></td><td data-v-0cac98eb>Invalid params, rejected before any tool was chosen: an unknown tool name, <code data-v-0cac98eb>arguments</code> that are not an object, a pagination <code data-v-0cac98eb>cursor</code> on a list method (this server never issues one), a malformed completion request, and a <code data-v-0cac98eb>resources/read</code> whose subject is not there — a <code data-v-0cac98eb>jeffrey://</code> URI this server does not serve, or a profile that does not exist — and a <code data-v-0cac98eb>taskId</code> that is unknown, expired, or belongs to a family this installation does not advertise. A missing, unknown or mistyped argument is a tool result with <code data-v-0cac98eb>isError: true</code> instead, as is a refused <code data-v-0cac98eb>thresholdPct</code> or <code data-v-0cac98eb>bucketMs</code>; an out-of-range <code data-v-0cac98eb>limit</code> or <code data-v-0cac98eb>top</code> is clamped, not refused</td></tr><tr data-v-0cac98eb><td data-v-0cac98eb><code data-v-0cac98eb>-32603</code></td><td data-v-0cac98eb><code data-v-0cac98eb>200</code></td><td data-v-0cac98eb>An internal failure outside the tool call</td></tr></tbody></table>',1)),t("p",null,[e[107]||(e[107]=a("An HTTP ",-1)),e[108]||(e[108]=t("code",null,"404",-1)),e[109]||(e[109]=a()),e[110]||(e[110]=t("em",null,"without",-1)),e[111]||(e[111]=a(" a JSON-RPC body is a different thing again: it means this installation switched the server off, not that the method was wrong. See ",-1)),o(n,{to:"/docs/microscope-mcp/enabling"},{default:c(()=>[...e[106]||(e[106]=[a("Enabling the Server",-1)])]),_:1}),e[112]||(e[112]=a(".",-1))])]),o(T)])}}}),ce=A($,[["__scopeId","data-v-0cac98eb"]]);export{ce as default};
