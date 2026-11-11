import{D as r}from"./DocsCallout-DgRNr7kU.js";import{D as d}from"./DocsCodeBlock-CS6IHM2-.js";import{D as b}from"./DocsNavFooter-rCXrXGuP.js";import{D as p}from"./DocsPageHeader-BmU3HdtY.js";import{u as v}from"./useDocHeadings-C4yBvNnq.js";import{d as c,o as h,c as j,f as o,b as a,g as l,w as s,e as t,k as f,l as g}from"./index-BfnA4i4q.js";import{_ as m}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={class:"docs-article"},w={class:"docs-content"},T="curl -s http://jeffrey-hub:8080/api/v1/storage",S=`{
  "measuredAt": "2026-11-08T20:35:10Z",
  "totalBytes": 23622320128,
  "totalFiles": 1412,
  "workspaces": [
    {
      "id": "production",
      "totalBytes": 23622320128,
      "totalFiles": 1412,
      "projects": [
        {
          "id": "orders",
          "totalBytes": 15032385536,
          "totalFiles": 904,
          "lastActivityAt": "2026-11-08T20:30:00Z"
        },
        {
          "id": "payments",
          "totalBytes": 8589934592,
          "totalFiles": 508,
          "lastActivityAt": null
        }
      ]
    }
  ]
}`,k=`{
  "measuredAt": null,
  "totalBytes": 0,
  "totalFiles": 0,
  "workspaces": []
}`,E="curl -s http://jeffrey-hub:8080/api/v1/jobs",O=`[
  {
    "id": "project-retention",
    "enabled": true,
    "period": "PT5M",
    "manualRun": true,
    "params": {
      "session-retention": "7d",
      "max-sessions": "10",
      "active-session-file-retention": "7d",
      "max-size": "20G",
      "instance-retention": "14d"
    }
  },
  {
    "id": "repository-jfr-compression",
    "enabled": true,
    "period": "PT1M",
    "manualRun": false,
    "params": {}
  }
]`,P="curl -s http://jeffrey-hub:8080/api/v1/jobs/project-retention",A="curl -s -X POST http://jeffrey-hub:8080/api/v1/jobs/project-retention/run",R=`{
  "job": "project-retention",
  "startedAt": "2026-11-08T20:37:14.278Z",
  "durationMs": 412,
  "summary": "Deleted 3 sessions, 0 files and 1 instance; 22.0 GiB across 3 projects"
}`,x=`curl -s http://jeffrey-hub:8080/actuator/health/liveness
curl -s http://jeffrey-hub:8080/actuator/health/readiness`,N=`HTTP/1.1 404 Not Found

{
  "type": "CLIENT",
  "code": "SCHEDULER_JOB_NOT_FOUND",
  "message": "No such job: project-cleanup"
}`,I=`HTTP/1.1 409 Conflict

{
  "type": "CLIENT",
  "code": "INVALID_REQUEST",
  "message": "Job cannot be run manually: repository-jfr-compression"
}`,B=`curl -s http://jeffrey-hub:8080/api/v1/storage \\
  | jq -r '.workspaces[] | .id as $ws | .projects[] | "\\(.totalBytes)\\t\\($ws)/\\(.id)"' \\
  | sort -rn`,D=`curl -s -X POST http://jeffrey-hub:8080/api/v1/jobs/project-retention/run | jq -r .summary
curl -s http://jeffrey-hub:8080/api/v1/storage | jq .measuredAt`,H=c({__name:"HubApiPage",setup(J){const{setHeadings:i}=v(),u=[{id:"overview",text:"Overview",level:2},{id:"storage",text:"Storage",level:2},{id:"jobs",text:"Jobs",level:2},{id:"job",text:"One Job",level:2},{id:"run-job",text:"Run a Job Now",level:2},{id:"health",text:"Health Probes",level:2},{id:"errors",text:"Errors",level:2},{id:"examples",text:"Examples",level:2}];return h(()=>{i(u)}),(F,e)=>{const n=f("router-link");return g(),j("article",y,[o(p,{title:"REST API",icon:"bi bi-braces"}),a("div",w,[e[21]||(e[21]=l('<p data-v-5728dbaa> Jeffrey Hub has no web UI. It serves a small JSON REST API on its HTTP port (<code data-v-5728dbaa>8080</code> by default, <code data-v-5728dbaa>server.port</code>) for operators and scripts: what every project occupies on the shared volume, the scheduler&#39;s jobs, and a way to run retention now. Microscope never calls it — it reads the volume itself. </p><h2 id="overview" data-v-5728dbaa>Overview</h2><p data-v-5728dbaa>Every endpoint lives under <code data-v-5728dbaa>http://&lt;hub&gt;:8080/api/v1</code> and speaks JSON only.</p><table data-v-5728dbaa><thead data-v-5728dbaa><tr data-v-5728dbaa><th data-v-5728dbaa>Method</th><th data-v-5728dbaa>Path</th><th data-v-5728dbaa>What it returns</th></tr></thead><tbody data-v-5728dbaa><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>GET</code></td><td data-v-5728dbaa><code data-v-5728dbaa>/api/v1/storage</code></td><td data-v-5728dbaa>Size, files and last activity per workspace and project, as the last retention pass measured them</td></tr><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>GET</code></td><td data-v-5728dbaa><code data-v-5728dbaa>/api/v1/jobs</code></td><td data-v-5728dbaa>The scheduler&#39;s jobs and their settings, read-only</td></tr><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>GET</code></td><td data-v-5728dbaa><code data-v-5728dbaa>/api/v1/jobs/{job}</code></td><td data-v-5728dbaa>One job</td></tr><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>POST</code></td><td data-v-5728dbaa><code data-v-5728dbaa>/api/v1/jobs/{job}/run</code></td><td data-v-5728dbaa>Runs the job now and reports what it did</td></tr></tbody></table>',4)),o(r,{type:"warning"},{default:s(()=>[...e[0]||(e[0]=[a("strong",null,"No authentication.",-1),t(" The API has no login and no token, and ",-1),a("code",null,"POST /api/v1/jobs/{job}/run",-1),t(" deletes data exactly like a scheduled retention tick would. Keep the hub's Service inside the cluster; if you enable the Helm chart's Ingress, protect it in front of the hub. ",-1)])]),_:1}),e[22]||(e[22]=a("h2",{id:"storage"},"Storage",-1)),e[23]||(e[23]=a("p",null,[a("code",null,"GET /api/v1/storage"),t(" returns what every project occupies on the volume, as measured by the last "),a("code",null,"project-retention"),t(" pass — totals for the whole volume, per workspace and per project. Ids are folder names: a workspace's id is its reference id, a project's is its directory name; there are no separate name fields. ")],-1)),o(d,{language:"bash",code:T}),o(d,{language:"json",code:S}),e[24]||(e[24]=a("ul",null,[a("li",null,[a("code",null,"measuredAt"),t(" — when the pass that produced these figures ran.")]),a("li",null,[a("code",null,"totalBytes"),t(", "),a("code",null,"totalFiles"),t(" — what is left on the volume after that pass.")]),a("li",null,[a("code",null,"lastActivityAt"),t(" — the project's most recent activity, or "),a("code",null,"null"),t(" when it has none.")])],-1)),o(r,{type:"info"},{default:s(()=>[...e[1]||(e[1]=[a("strong",null,"The figures can be up to one retention period old",-1),t(" — 5 minutes by default (",-1),a("code",null,"jeffrey.hub.scheduler.jobs.project-retention.period",-1),t("). The first pass runs at startup; until it finishes, the endpoint answers with no figures: ",-1)])]),_:1}),o(d,{language:"json",code:k}),a("p",null,[e[3]||(e[3]=t(" To measure again now, ",-1)),o(n,{to:"/docs/hub/api#run-job"},{default:s(()=>[...e[2]||(e[2]=[t("run ",-1),a("code",null,"project-retention",-1)])]),_:1}),e[4]||(e[4]=t(" — it applies retention and refreshes the figures in the same pass. ",-1))]),e[25]||(e[25]=a("h2",{id:"jobs"},"Jobs",-1)),a("p",null,[e[6]||(e[6]=a("code",null,"GET /api/v1/jobs",-1)),e[7]||(e[7]=t(" lists the scheduler's jobs. It is read-only: the settings come from ",-1)),o(n,{to:"/docs/hub/configuration#job-scheduler"},{default:s(()=>[...e[5]||(e[5]=[a("code",null,"application.properties",-1)])]),_:1}),e[8]||(e[8]=t(" and change only with a restart. ",-1))]),o(d,{language:"bash",code:E}),o(d,{language:"json",code:O}),e[26]||(e[26]=l('<ul data-v-5728dbaa><li data-v-5728dbaa><code data-v-5728dbaa>id</code> — the job&#39;s configuration key: its settings live under <code data-v-5728dbaa>jeffrey.hub.scheduler.jobs.&lt;id&gt;.*</code>.</li><li data-v-5728dbaa><code data-v-5728dbaa>enabled</code> — whether the job runs on its schedule.</li><li data-v-5728dbaa><code data-v-5728dbaa>period</code> — how often it runs, as an ISO-8601 duration (<code data-v-5728dbaa>PT5M</code> is five minutes).</li><li data-v-5728dbaa><code data-v-5728dbaa>manualRun</code> — whether <code data-v-5728dbaa>POST /api/v1/jobs/{job}/run</code> accepts it.</li><li data-v-5728dbaa><code data-v-5728dbaa>params</code> — the job&#39;s <code data-v-5728dbaa>.params.*</code> entries, as resolved at startup.</li></ul><h2 id="job" data-v-5728dbaa>One Job</h2>',2)),a("p",null,[e[10]||(e[10]=a("code",null,"GET /api/v1/jobs/{job}",-1)),e[11]||(e[11]=t(" returns a single entry of the list above. An unknown id answers ",-1)),e[12]||(e[12]=a("code",null,"404",-1)),e[13]||(e[13]=t(" (see ",-1)),o(n,{to:"/docs/hub/api#errors"},{default:s(()=>[...e[9]||(e[9]=[t("Errors",-1)])]),_:1}),e[14]||(e[14]=t("). ",-1))]),o(d,{language:"bash",code:P}),e[27]||(e[27]=a("h2",{id:"run-job"},"Run a Job Now",-1)),e[28]||(e[28]=a("p",null,[a("code",null,"POST /api/v1/jobs/{job}/run"),t(" runs the job now, synchronously, and answers when it has finished. It takes the same per-job lock as the scheduled tick, so a tick that is still running is waited for, never run alongside. Only "),a("code",null,"project-retention"),t(" supports it ("),a("code",null,"manualRun: true"),t("). ")],-1)),o(d,{language:"bash",code:A}),o(d,{language:"json",code:R}),e[29]||(e[29]=a("p",null,[a("code",null,"startedAt"),t(" is when the run began, "),a("code",null,"durationMs"),t(" how long it took, and "),a("code",null,"summary"),t(" what it deleted and what is left. A job without manual run answers "),a("code",null,"409"),t("; an unknown job "),a("code",null,"404"),t(". ")],-1)),e[30]||(e[30]=a("h2",{id:"health"},"Health Probes",-1)),a("p",null,[e[16]||(e[16]=t(" Outside ",-1)),e[17]||(e[17]=a("code",null,"/api/v1",-1)),e[18]||(e[18]=t(", Spring Boot's own liveness and readiness endpoints are what the ",-1)),o(n,{to:"/docs/hub/deployment/helm-chart"},{default:s(()=>[...e[15]||(e[15]=[t("Helm chart",-1)])]),_:1}),e[19]||(e[19]=t("'s probes call: ",-1))]),o(d,{language:"bash",code:x}),e[31]||(e[31]=l('<h2 id="errors" data-v-5728dbaa>Errors</h2><p data-v-5728dbaa> An error answers with a JSON body carrying a <code data-v-5728dbaa>type</code>, a machine-readable <code data-v-5728dbaa>code</code> and a <code data-v-5728dbaa>message</code>. </p><table data-v-5728dbaa><thead data-v-5728dbaa><tr data-v-5728dbaa><th data-v-5728dbaa>Status</th><th data-v-5728dbaa>Code</th><th data-v-5728dbaa>When</th></tr></thead><tbody data-v-5728dbaa><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>404</code></td><td data-v-5728dbaa><code data-v-5728dbaa>SCHEDULER_JOB_NOT_FOUND</code></td><td data-v-5728dbaa><code data-v-5728dbaa>GET /api/v1/jobs/{job}</code> or <code data-v-5728dbaa>POST /api/v1/jobs/{job}/run</code> with an unknown job id</td></tr><tr data-v-5728dbaa><td data-v-5728dbaa><code data-v-5728dbaa>409</code></td><td data-v-5728dbaa><code data-v-5728dbaa>INVALID_REQUEST</code></td><td data-v-5728dbaa><code data-v-5728dbaa>POST /api/v1/jobs/{job}/run</code> for a job that cannot be run manually</td></tr></tbody></table>',3)),o(d,{language:"text",code:N}),o(d,{language:"text",code:I}),e[32]||(e[32]=a("h2",{id:"examples"},"Examples",-1)),e[33]||(e[33]=a("p",null,"Biggest projects first, across every workspace:",-1)),o(d,{language:"bash",code:B}),e[34]||(e[34]=a("p",null,"Apply retention now, then read the fresh figures:",-1)),o(d,{language:"bash",code:D}),o(r,{type:"tip"},{default:s(()=>[...e[20]||(e[20]=[t(" The hub's earlier web UI — its Storage page at ",-1),a("code",null,"/",-1),t(" and Scheduler page at ",-1),a("code",null,"/scheduler",-1),t(" — and every ",-1),a("code",null,"/api/internal/*",-1),t(" route are gone. Scripts that called ",-1),a("code",null,"/api/internal/storage",-1),t(" or ",-1),a("code",null,"/api/internal/scheduler/jobs",-1),t(" move to ",-1),a("code",null,"/api/v1/storage",-1),t(" and ",-1),a("code",null,"/api/v1/jobs",-1),t(". ",-1)])]),_:1})]),o(b)])}}}),Z=m(H,[["__scopeId","data-v-5728dbaa"]]);export{Z as default};
