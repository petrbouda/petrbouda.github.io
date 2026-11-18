import{D as r}from"./DocsCallout-BCQLDTeo.js";import{D as d}from"./DocsCodeBlock-Dld_Ow3Y.js";import{D as u}from"./DocsNavFooter-4J6CZJp9.js";import{D as v}from"./DocsPageHeader-CouDrwJi.js";import{u as p}from"./useDocHeadings-DQ3lI-D1.js";import{d as h,o as b,c as m,f as a,b as t,g as s,w as c,e as o,k as g,l as j}from"./index-CEzrIUL9.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"docs-article"},y={class:"docs-content"},T="curl -s http://volume-scheduler:8080/api/v1/storage",A=`{
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
}`,O=`{
  "measuredAt": null,
  "totalBytes": 0,
  "totalFiles": 0,
  "workspaces": []
}`,S="curl -s http://volume-scheduler:8080/api/v1/jobs",P=`[
  {
    "id": "retention",
    "enabled": true,
    "period": "PT5M",
    "settings": {
      "sessionRetention": "PT168H",
      "maxSessions": 10,
      "newestSessionFileRetention": "PT168H",
      "maxSizeBytes": 21474836480,
      "instanceRetention": "PT336H"
    }
  },
  {
    "id": "compression",
    "enabled": true,
    "period": "PT1M",
    "settings": null
  }
]`,k="curl -s http://volume-scheduler:8080/api/v1/jobs/retention",x="curl -s -X POST http://volume-scheduler:8080/api/v1/jobs/retention/run",E=`{
  "job": "retention",
  "startedAt": "2026-11-08T20:37:14.278Z",
  "took": "PT0.153S",
  "summary": "Deleted 1 session, 0 files and 0 instances; 1.2 GB across 3 projects"
}`,N=`{
  "job": "compression",
  "startedAt": "2026-11-08T20:38:02.104Z",
  "took": "PT1.87S",
  "summary": "Compressed 4 recordings in 2 sessions across 3 projects"
}`,R=`curl -s http://volume-scheduler:8080/actuator/health/liveness
curl -s http://volume-scheduler:8080/actuator/health/readiness`,B=`HTTP/1.1 404 Not Found

{
  "code": "JOB_NOT_FOUND",
  "message": "No such job: cleanup"
}`,D=`HTTP/1.1 405 Method Not Allowed

{
  "code": "METHOD_NOT_ALLOWED",
  "message": "Request method 'GET' is not supported"
}`,H=`curl -s http://volume-scheduler:8080/api/v1/storage \\
  | jq -r '.workspaces[] | .id as $ws | .projects[] | "\\(.totalBytes)\\t\\($ws)/\\(.id)"' \\
  | sort -rn`,I=`curl -s -X POST http://volume-scheduler:8080/api/v1/jobs/retention/run | jq -r .summary
curl -s http://volume-scheduler:8080/api/v1/storage | jq .measuredAt`,F=h({__name:"VolumeSchedulerApiPage",setup(J){const{setHeadings:l}=p(),i=[{id:"overview",text:"Overview",level:2},{id:"storage",text:"Storage",level:2},{id:"jobs",text:"Jobs",level:2},{id:"job",text:"One Job",level:2},{id:"run-job",text:"Run a Job Now",level:2},{id:"health",text:"Health Probes",level:2},{id:"errors",text:"Errors",level:2},{id:"examples",text:"Examples",level:2}];return b(()=>{l(i)}),(q,e)=>{const n=g("router-link");return j(),m("article",w,[a(v,{title:"REST API",icon:"bi bi-braces"}),t("div",y,[e[13]||(e[13]=s('<p data-v-82ecc2e0> The Volume Scheduler has no web UI. It serves a small JSON REST API on its HTTP port (<code data-v-82ecc2e0>8080</code> by default, <code data-v-82ecc2e0>server.port</code>) for operators and scripts: what every project occupies on the shared volume, its two jobs, and a way to run either one now. Microscope never calls it — it reads the volume itself. </p><h2 id="overview" data-v-82ecc2e0>Overview</h2><p data-v-82ecc2e0>Every endpoint lives under <code data-v-82ecc2e0>http://&lt;volume-scheduler&gt;:8080/api/v1</code> and speaks JSON only.</p><table data-v-82ecc2e0><thead data-v-82ecc2e0><tr data-v-82ecc2e0><th data-v-82ecc2e0>Method</th><th data-v-82ecc2e0>Path</th><th data-v-82ecc2e0>What it returns</th></tr></thead><tbody data-v-82ecc2e0><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>GET</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>/api/v1/storage</code></td><td data-v-82ecc2e0>Size, files and last activity per workspace and project, as the last retention pass measured them</td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>GET</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>/api/v1/jobs</code></td><td data-v-82ecc2e0>Both jobs, their schedule and settings, read-only</td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>GET</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>/api/v1/jobs/{job}</code></td><td data-v-82ecc2e0>One job: <code data-v-82ecc2e0>retention</code> or <code data-v-82ecc2e0>compression</code></td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>POST</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>/api/v1/jobs/{job}/run</code></td><td data-v-82ecc2e0>Runs the job now and reports what it did</td></tr></tbody></table>',4)),a(r,{type:"warning"},{default:c(()=>[...e[0]||(e[0]=[t("strong",null,"No authentication.",-1),o(" The API has no login and no token, and ",-1),t("code",null,"POST /api/v1/jobs/retention/run",-1),o(" deletes data exactly like a scheduled retention pass would. Keep the volume scheduler's Service inside the cluster; if you put an Ingress in front of it, protect it there. ",-1)])]),_:1}),e[14]||(e[14]=t("h2",{id:"storage"},"Storage",-1)),e[15]||(e[15]=t("p",null,[t("code",null,"GET /api/v1/storage"),o(" returns what every project occupies on the volume, as measured by the last "),t("code",null,"retention"),o(" pass — totals for the whole volume, per workspace and per project. Ids are folder names: a workspace's id is its reference id, a project's is its directory name; there are no separate name fields. ")],-1)),a(d,{language:"bash",code:T}),a(d,{language:"json",code:A}),e[16]||(e[16]=s("<ul data-v-82ecc2e0><li data-v-82ecc2e0><code data-v-82ecc2e0>measuredAt</code> — when the pass that produced these figures ran; <code data-v-82ecc2e0>null</code> until the first pass.</li><li data-v-82ecc2e0><code data-v-82ecc2e0>totalBytes</code>, <code data-v-82ecc2e0>totalFiles</code> — what is left on the volume after that pass.</li><li data-v-82ecc2e0><code data-v-82ecc2e0>lastActivityAt</code> — the project&#39;s most recent activity, or <code data-v-82ecc2e0>null</code> when it has none.</li></ul>",1)),a(r,{type:"info"},{default:c(()=>[...e[1]||(e[1]=[t("strong",null,"The figures can be up to one retention period old",-1),o(" — 5 minutes by default (",-1),t("code",null,"jeffrey.volume-scheduler.retention.period",-1),o("). The first pass runs at startup; until it finishes — or, with retention disabled, until it is run by hand — the endpoint answers with no figures: ",-1)])]),_:1}),a(d,{language:"json",code:O}),e[17]||(e[17]=t("p",null,[o(" To measure again now, "),t("a",{href:"#run-job"},[o("run "),t("code",null,"retention")]),o(" — it applies retention and refreshes the figures in the same pass. ")],-1)),e[18]||(e[18]=t("h2",{id:"jobs"},"Jobs",-1)),t("p",null,[e[3]||(e[3]=t("code",null,"GET /api/v1/jobs",-1)),e[4]||(e[4]=o(" lists both jobs. It is read-only: the settings come from ",-1)),a(n,{to:"/docs/volume-scheduler/configuration"},{default:c(()=>[...e[2]||(e[2]=[t("code",null,"jeffrey.volume-scheduler.*",-1)])]),_:1}),e[5]||(e[5]=o(" and change only with a restart. ",-1))]),a(d,{language:"bash",code:S}),a(d,{language:"json",code:P}),e[19]||(e[19]=s('<ul data-v-82ecc2e0><li data-v-82ecc2e0><code data-v-82ecc2e0>id</code> — <code data-v-82ecc2e0>retention</code> or <code data-v-82ecc2e0>compression</code>, the job&#39;s path segment and its configuration group: <code data-v-82ecc2e0>jeffrey.volume-scheduler.&lt;id&gt;.*</code>.</li><li data-v-82ecc2e0><code data-v-82ecc2e0>enabled</code> — whether the job runs on its schedule. A disabled job is still listed, and still runs by hand.</li><li data-v-82ecc2e0><code data-v-82ecc2e0>period</code> — the fixed delay between runs, as an ISO-8601 duration (<code data-v-82ecc2e0>PT5M</code> is five minutes).</li><li data-v-82ecc2e0><code data-v-82ecc2e0>settings</code> — for <code data-v-82ecc2e0>retention</code>, the policy it applies, as bound at startup: the durations in ISO-8601 (<code data-v-82ecc2e0>PT168H</code> is seven days), <code data-v-82ecc2e0>maxSessions</code> per instance, and the project budget <code data-v-82ecc2e0>maxSizeBytes</code> in bytes. <code data-v-82ecc2e0>null</code> for <code data-v-82ecc2e0>compression</code>, which has no settings beyond its schedule.</li></ul><h2 id="job" data-v-82ecc2e0>One Job</h2><p data-v-82ecc2e0><code data-v-82ecc2e0>GET /api/v1/jobs/{job}</code> returns a single entry of the list above. An unknown id answers <code data-v-82ecc2e0>404</code> (see <a href="#errors" data-v-82ecc2e0>Errors</a>). </p>',3)),a(d,{language:"bash",code:k}),e[20]||(e[20]=t("h2",{id:"run-job"},"Run a Job Now",-1)),e[21]||(e[21]=t("p",null,[t("code",null,"POST /api/v1/jobs/{job}/run"),o(" runs the job now, synchronously, and answers when it has finished. It works for both jobs, enabled or not, and takes the same per-job lock as the scheduled run, so a scheduled run that is still in flight is waited for, never run alongside. ")],-1)),a(d,{language:"bash",code:x}),a(d,{language:"json",code:E}),e[22]||(e[22]=t("p",null,[t("code",null,"startedAt"),o(" is when the run began, "),t("code",null,"took"),o(" how long it took as an ISO-8601 duration, and "),t("code",null,"summary"),o(" the one line the job reports — for retention, what it deleted and what is left; for compression, what it compressed: ")],-1)),a(d,{language:"json",code:N}),e[23]||(e[23]=t("p",null,[o("An unknown job answers "),t("code",null,"404"),o(".")],-1)),e[24]||(e[24]=t("h2",{id:"health"},"Health Probes",-1)),t("p",null,[e[7]||(e[7]=o(" Outside ",-1)),e[8]||(e[8]=t("code",null,"/api/v1",-1)),e[9]||(e[9]=o(", Spring Boot's own liveness and readiness endpoints are what the ",-1)),a(n,{to:"/docs/deployment/helm-chart"},{default:c(()=>[...e[6]||(e[6]=[o("Helm chart",-1)])]),_:1}),e[10]||(e[10]=o("'s probes call. They are enabled on every start, inside Kubernetes or not, so a plain ",-1)),e[11]||(e[11]=t("code",null,"docker run",-1)),e[12]||(e[12]=o(" answers them too: ",-1))]),a(d,{language:"bash",code:R}),e[25]||(e[25]=s('<h2 id="errors" data-v-82ecc2e0>Errors</h2><p data-v-82ecc2e0> An error answers with a JSON body carrying a machine-readable <code data-v-82ecc2e0>code</code> and a <code data-v-82ecc2e0>message</code>. </p><table data-v-82ecc2e0><thead data-v-82ecc2e0><tr data-v-82ecc2e0><th data-v-82ecc2e0>Status</th><th data-v-82ecc2e0>Code</th><th data-v-82ecc2e0>When</th></tr></thead><tbody data-v-82ecc2e0><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>404</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>JOB_NOT_FOUND</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>GET /api/v1/jobs/{job}</code> or <code data-v-82ecc2e0>POST /api/v1/jobs/{job}/run</code> with a job id other than <code data-v-82ecc2e0>retention</code> or <code data-v-82ecc2e0>compression</code></td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>404</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>NOT_FOUND</code></td><td data-v-82ecc2e0>A path the API does not serve</td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>405</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>METHOD_NOT_ALLOWED</code></td><td data-v-82ecc2e0>A method the path does not take, e.g. <code data-v-82ecc2e0>GET /api/v1/jobs/{job}/run</code></td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>4xx</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>BAD_REQUEST</code></td><td data-v-82ecc2e0>Any other request Spring refuses, with its own status — e.g. <code data-v-82ecc2e0>415</code> for an unsupported content type</td></tr><tr data-v-82ecc2e0><td data-v-82ecc2e0><code data-v-82ecc2e0>500</code></td><td data-v-82ecc2e0><code data-v-82ecc2e0>INTERNAL_ERROR</code></td><td data-v-82ecc2e0>Anything else that failed; the cause is in the log</td></tr></tbody></table>',3)),a(d,{language:"text",code:B}),a(d,{language:"text",code:D}),e[26]||(e[26]=t("h2",{id:"examples"},"Examples",-1)),e[27]||(e[27]=t("p",null,"Biggest projects first, across every workspace:",-1)),a(d,{language:"bash",code:H}),e[28]||(e[28]=t("p",null,"Apply retention now, then read the fresh figures:",-1)),a(d,{language:"bash",code:I})]),a(u)])}}}),Z=f(F,[["__scopeId","data-v-82ecc2e0"]]);export{Z as default};
