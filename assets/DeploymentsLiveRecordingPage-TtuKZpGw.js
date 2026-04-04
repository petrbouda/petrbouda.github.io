import{D as c,a as p}from"./DocsPageHeader-BALGpuR3.js";import{D as n}from"./DocsCodeBlock-CKto-wc7.js";import{D as a}from"./DocsCallout-B8CaGgwC.js";import{u as g}from"./useDocHeadings-BG4TUEst.js";import{d as u,i as m,c as y,b as r,a as t,k as s,w as i,m as o,r as v,o as b}from"./index-CPy5Ik-c.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},w={class:"docs-content"},S=`# application.properties for Jeffrey

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
arg-file = "/tmp/jvm.args"

project {
    workspace-id = "production"
    name = "my-service"
    label = "My Service"
}

perf-counters { enabled = true }
heap-dump { enabled = true, type = "crash" }

jdk-java-options {
  enabled = true
  additional-options = "-Xmx2g -Xms2g"
}

attributes {
  env = "production"
  cluster = "blue"
}`,k=`# Initialize profiling session
jeffrey-cli init --base-config /path/to/jeffrey-init.conf

# Start application using @argfile
java @/tmp/jvm.args -jar my-application.jar`,J=u({__name:"DeploymentsLiveRecordingPage",setup(R){const{setHeadings:l}=g(),d=[{id:"overview",text:"Overview",level:2},{id:"architecture",text:"Architecture",level:2},{id:"jeffrey-configuration",text:"Jeffrey Configuration",level:2},{id:"target-application",text:"Target Application Setup",level:2},{id:"workflow",text:"Workflow",level:2}];return m(()=>{l(d)}),(x,e)=>{const f=v("router-link");return b(),y("article",h,[r(c,{title:"Live with Recording Collection",icon:"bi bi-broadcast-pin"}),t("div",w,[e[6]||(e[6]=s('<p data-v-c40292be>Deploy Jeffrey in <strong data-v-c40292be>Live mode</strong> to continuously collect recordings from profiled applications. This setup is ideal for production environments where you want ongoing profiling data.</p><h2 id="overview" data-v-c40292be>Overview</h2><p data-v-c40292be>In this deployment model:</p><ul data-v-c40292be><li data-v-c40292be><strong data-v-c40292be>Jeffrey</strong> runs as a central server collecting and analyzing recordings</li><li data-v-c40292be><strong data-v-c40292be>Target applications</strong> use Jeffrey CLI to write recordings to a shared storage</li><li data-v-c40292be><strong data-v-c40292be>Scheduler</strong> automatically discovers and imports new recordings</li></ul>',4)),r(a,{type:"info"},{default:i(()=>[...e[0]||(e[0]=[t("strong",null,"Recording Collection:",-1),o(" Jeffrey Server monitors a directory for new recording sessions and automatically imports them as they appear. ",-1)])]),_:1}),e[7]||(e[7]=t("h2",{id:"architecture"},"Architecture",-1)),e[8]||(e[8]=t("div",{class:"architecture-diagram"},[t("pre",null,[t("code",null,`┌─────────────────────┐     ┌─────────────────────┐
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
│  - Workspace configured                         │
│  - Scheduler polls for new sessions             │
│  - Auto-creates profiles from recordings        │
└─────────────────────────────────────────────────┘`)])],-1)),e[9]||(e[9]=t("h2",{id:"jeffrey-configuration"},"Jeffrey Configuration",-1)),e[10]||(e[10]=t("p",null,"Configure Jeffrey to monitor the recording storage directory:",-1)),r(n,{language:"properties",code:S}),e[11]||(e[11]=t("h3",null,"Key Settings",-1)),e[12]||(e[12]=t("ul",null,[t("li",null,[t("strong",null,"Scheduler"),o(" - Must be enabled to poll for new recordings")]),t("li",null,[t("strong",null,"Recording storage"),o(" - Path where target applications write their recordings")]),t("li",null,[t("strong",null,"Profiler settings"),o(" - Default settings synced to target applications")])],-1)),e[13]||(e[13]=t("h2",{id:"target-application"},"Target Application Setup",-1)),e[14]||(e[14]=t("p",null,"Each application that should be profiled needs Jeffrey CLI configuration:",-1)),r(n,{language:"hocon",code:C}),e[15]||(e[15]=t("h3",null,"Starting the Application",-1)),r(n,{language:"bash",code:k}),r(a,{type:"tip"},{default:i(()=>[e[2]||(e[2]=t("strong",null,"Container deployment:",-1)),e[3]||(e[3]=o(" In Kubernetes or Docker, mount the shared storage volume to both Jeffrey and target application containers. See the ",-1)),r(f,{to:"/docs/deployments/kubernetes"},{default:i(()=>[...e[1]||(e[1]=[o("Kubernetes deployment guide",-1)])]),_:1}),e[4]||(e[4]=o(" for a complete example. ",-1))]),_:1}),e[16]||(e[16]=s('<h2 id="workflow" data-v-c40292be>Workflow</h2><ol data-v-c40292be><li data-v-c40292be><strong data-v-c40292be>Application starts</strong> - Jeffrey CLI creates session directory and configures profiling</li><li data-v-c40292be><strong data-v-c40292be>Recordings generated</strong> - Async-Profiler writes JFR chunks to the session directory</li><li data-v-c40292be><strong data-v-c40292be>Jeffrey discovers</strong> - Scheduler detects new session via <code data-v-c40292be>.session-info.json</code></li><li data-v-c40292be><strong data-v-c40292be>Profile created</strong> - Jeffrey imports recordings and creates analyzable profiles</li><li data-v-c40292be><strong data-v-c40292be>Analysis available</strong> - Flamegraphs, timeseries, and other features ready to use</li></ol>',2)),r(a,{type:"warning"},{default:i(()=>[...e[5]||(e[5]=[t("strong",null,"Storage considerations:",-1),o(" Ensure sufficient disk space for recordings. Configure session cleanup in the Scheduler to automatically remove old sessions. ",-1)])]),_:1})]),r(p)])}}}),F=j(J,[["__scopeId","data-v-c40292be"]]);export{F as default};
