import{D as p,a as g}from"./DocsPageHeader-eA4hMhgw.js";import{D as i}from"./DocsCodeBlock-vrnmwhSA.js";import{D as n}from"./DocsCallout-DRXeuY10.js";import{u as c}from"./useDocHeadings-CsEjSeXR.js";import{d as u,i as v,c as m,b as r,a as t,k as s,w as a,m as o,r as y,o as j}from"./index-C-iaNavr.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"docs-article"},b={class:"docs-content"},k=`# application.properties for Jeffrey

server.port=8080
jeffrey.home.dir=/data/jeffrey

# Enable scheduler for automatic recording collection
jeffrey.job.scheduler.enabled=true
jeffrey.job.default.period=1m

# Recording storage - where recordings are collected
jeffrey.project.recording-storage.path=\${jeffrey.home.dir}/recordings

# Global profiler settings for target applications
jeffrey.profiler.global-settings.create-if-not-exists=true
jeffrey.profiler.global-settings.command=-agentpath:<<JEFFREY_PROFILER_PATH>>=start,alloc,lock,event=ctimer,loop=15m,chunksize=5m,file=<<JEFFREY_CURRENT_SESSION>>/profile-%t.jfr`,C=`# jeffrey-init.conf for target application

jeffrey-home = "/data/jeffrey"
profiler-path = "/opt/async-profiler/libasyncProfiler.so"

workspace-id = "production"
project-name = "my-service"
project-label = "My Service"

perf-counters { enabled = true }
heap-dump { enabled = true, type = "crash" }

jdk-java-options {
  enabled = true
  additional-options = "-Xmx2g -Xms2g"
}

attributes {
  env = "production"
  cluster = "blue"
}`,S=`# Initialize profiling and start application
eval "$(java -jar jeffrey-cli.jar init /path/to/jeffrey-init.conf)"
java -jar my-application.jar`,J=u({__name:"DeploymentsLiveRecordingPage",setup(x){const{setHeadings:l}=c(),d=[{id:"overview",text:"Overview",level:2},{id:"architecture",text:"Architecture",level:2},{id:"jeffrey-configuration",text:"Jeffrey Configuration",level:2},{id:"target-application",text:"Target Application Setup",level:2},{id:"workflow",text:"Workflow",level:2}];return v(()=>{l(d)}),(A,e)=>{const f=y("router-link");return j(),m("article",w,[r(p,{title:"Live with Recording Collection",icon:"bi bi-broadcast-pin"}),t("div",b,[e[6]||(e[6]=s('<p data-v-9d5a849a>Deploy Jeffrey in <strong data-v-9d5a849a>Live mode</strong> to continuously collect recordings from profiled applications. This setup is ideal for production environments where you want ongoing profiling data.</p><h2 id="overview" data-v-9d5a849a>Overview</h2><p data-v-9d5a849a>In this deployment model:</p><ul data-v-9d5a849a><li data-v-9d5a849a><strong data-v-9d5a849a>Jeffrey</strong> runs as a central server collecting and analyzing recordings</li><li data-v-9d5a849a><strong data-v-9d5a849a>Target applications</strong> use Jeffrey CLI to write recordings to a shared storage</li><li data-v-9d5a849a><strong data-v-9d5a849a>Scheduler</strong> automatically discovers and imports new recordings</li></ul>',4)),r(n,{type:"info"},{default:a(()=>[...e[0]||(e[0]=[t("strong",null,"Live Workspace:",-1),o(" A Live workspace monitors a directory for new recording sessions and automatically imports them as they appear. ",-1)])]),_:1}),e[7]||(e[7]=t("h2",{id:"architecture"},"Architecture",-1)),e[8]||(e[8]=t("div",{class:"architecture-diagram"},[t("pre",null,[t("code",null,`┌─────────────────────┐     ┌─────────────────────┐
│  Target App 1       │     │  Target App 2       │
│  + Jeffrey CLI      │     │  + Jeffrey CLI      │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          │    writes recordings      │
          ▼                           ▼
┌─────────────────────────────────────────────────┐
│              Shared Storage (NFS/PVC)           │
│  /recordings/workspace/project/session/*.jfr    │
└─────────────────────────────────────────────────┘
                      ▲
                      │ monitors & imports
                      │
┌─────────────────────┴───────────────────────────┐
│                   Jeffrey                       │
│  - Live Workspace configured                    │
│  - Scheduler polls for new sessions             │
│  - Auto-creates profiles from recordings        │
└─────────────────────────────────────────────────┘`)])],-1)),e[9]||(e[9]=t("h2",{id:"jeffrey-configuration"},"Jeffrey Configuration",-1)),e[10]||(e[10]=t("p",null,"Configure Jeffrey to monitor the recording storage directory:",-1)),r(i,{language:"properties",code:k}),e[11]||(e[11]=t("h3",null,"Key Settings",-1)),e[12]||(e[12]=t("ul",null,[t("li",null,[t("strong",null,"Scheduler"),o(" - Must be enabled to poll for new recordings")]),t("li",null,[t("strong",null,"Recording storage"),o(" - Path where target applications write their recordings")]),t("li",null,[t("strong",null,"Profiler settings"),o(" - Default settings synced to target applications")])],-1)),e[13]||(e[13]=t("h2",{id:"target-application"},"Target Application Setup",-1)),e[14]||(e[14]=t("p",null,"Each application that should be profiled needs Jeffrey CLI configuration:",-1)),r(i,{language:"hocon",code:C}),e[15]||(e[15]=t("h3",null,"Starting the Application",-1)),r(i,{language:"bash",code:S}),r(n,{type:"tip"},{default:a(()=>[e[2]||(e[2]=t("strong",null,"Container deployment:",-1)),e[3]||(e[3]=o(" In Kubernetes or Docker, mount the shared storage volume to both Jeffrey and target application containers. See the ",-1)),r(f,{to:"/docs/deployments/kubernetes"},{default:a(()=>[...e[1]||(e[1]=[o("Kubernetes deployment guide",-1)])]),_:1}),e[4]||(e[4]=o(" for a complete example. ",-1))]),_:1}),e[16]||(e[16]=s('<h2 id="workflow" data-v-9d5a849a>Workflow</h2><ol data-v-9d5a849a><li data-v-9d5a849a><strong data-v-9d5a849a>Application starts</strong> - Jeffrey CLI creates session directory and configures profiling</li><li data-v-9d5a849a><strong data-v-9d5a849a>Recordings generated</strong> - Async-Profiler writes JFR chunks to the session directory</li><li data-v-9d5a849a><strong data-v-9d5a849a>Jeffrey discovers</strong> - Scheduler detects new session via <code data-v-9d5a849a>.session-info.json</code></li><li data-v-9d5a849a><strong data-v-9d5a849a>Profile created</strong> - Jeffrey imports recordings and creates analyzable profiles</li><li data-v-9d5a849a><strong data-v-9d5a849a>Analysis available</strong> - Flamegraphs, timeseries, and other features ready to use</li></ol>',2)),r(n,{type:"warning"},{default:a(()=>[...e[5]||(e[5]=[t("strong",null,"Storage considerations:",-1),o(" Ensure sufficient disk space for recordings. Configure session cleanup in the Scheduler to automatically remove old sessions. ",-1)])]),_:1})]),r(g)])}}}),F=h(J,[["__scopeId","data-v-9d5a849a"]]);export{F as default};
