import{D as s}from"./DocsCallout-N2blqTh8.js";import{D as d,a as l}from"./DocsPageHeader-KstKa0lu.js";import{u as p}from"./useDocHeadings-BynNdp7B.js";import{d as c,i as f,c as u,b as o,a as t,k as m,m as r,w as n,o as g}from"./index-lGRgRmm_.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},v={class:"docs-content"},j=c({__name:"CliDirectoryStructurePage",setup(k){const{setHeadings:i}=p(),a=[{id:"jeffrey-home-structure",text:"Jeffrey Home Structure",level:2},{id:"session-directory",text:"Session Directory",level:2},{id:"streaming-repository",text:"Streaming Repository",level:2}];return f(()=>{i(a)}),(w,e)=>(g(),u("article",h,[o(d,{title:"Directory Structure",icon:"bi bi-folder-fill"}),t("div",v,[e[3]||(e[3]=t("p",null,"Jeffrey CLI creates a well-organized directory structure for storing profiling data. Understanding this structure helps with troubleshooting and managing disk space.",-1)),e[4]||(e[4]=t("h2",{id:"jeffrey-home-structure"},"Jeffrey Home Structure",-1)),e[5]||(e[5]=t("p",null,[r("The "),t("code",null,"jeffrey-home"),r(" directory (configured in your CLI config) contains all Jeffrey data organized by workspaces and projects:")],-1)),e[6]||(e[6]=t("div",{class:"directory-structure"},[t("pre",null,[t("code",null,`<jeffrey-home>/
└── workspaces/
    └── <workspace-id>/
        ├── .settings/                       # Cached profiler settings from Jeffrey
        │   └── settings-2025-01-15T....json
        └── <project-name>/
            ├── .project-info.json           # Project metadata
            └── <instance-name>/
                ├── .instance-info.json      # Instance metadata
                └── <session-id>/
                    ├── .session-info.json   # Session metadata
                    ├── profile-1704067200.jfr # Async-Profiler output
                    ├── profile-1704067800.jfr
                    └── ...`)])],-1)),o(s,{type:"info"},{default:n(()=>[...e[0]||(e[0]=[t("strong",null,"Workspace isolation:",-1),r(" Each workspace has its own directory, making it easy to manage separate environments (production, staging, development). ",-1)])]),_:1}),e[7]||(e[7]=t("h2",{id:"session-directory"},"Session Directory",-1)),e[8]||(e[8]=t("p",null,"Each recording session creates a directory with a unique identifier. The contents depend on your configuration, but Async-Profiler generates chunked JFR files using a timestamp pattern:",-1)),e[9]||(e[9]=t("div",{class:"directory-structure"},[t("pre",null,[t("code",null,`<session-id>/
├── profile-1704067200.jfr       # JFR chunk (timestamp-based naming)
├── profile-1704067800.jfr       # Next chunk after loop interval
├── profile-1704068400.jfr       # ... more chunks
├── heap-dump.hprof.gz           # Heap dump (if captured)
├── jfr-jvm.log                  # JVM log (if enabled)
├── perf-counters.hsperfdata     # Performance counters (finisher file)
├── hs-jvm-err.log               # HotSpot error log (finisher file)
└── .session-info.json           # Session metadata`)])],-1)),e[10]||(e[10]=t("p",null,[r("Async-Profiler creates new chunks based on the "),t("code",null,"loop"),r(" and "),t("code",null,"chunksize"),r(" parameters. The "),t("code",null,"%t"),r(" placeholder in the file pattern is replaced with the current timestamp.")],-1)),o(s,{type:"info"},{default:n(()=>[...e[1]||(e[1]=[t("strong",null,"Additional files:",-1),r(),t("code",null,"perf-counters.hsperfdata",-1),r(" (HotSpot Performance Counters) and ",-1),t("code",null,"hs-jvm-err.log",-1),r(" (HotSpot JVM Error Log) are artifact files that can be viewed in the session details. The presence of ",-1),t("code",null,"hs-jvm-err.log",-1),r(" indicates a JVM crash was detected. ",-1)])]),_:1}),e[11]||(e[11]=m(`<h2 id="streaming-repository" data-v-828239d8>Streaming Repository</h2><p data-v-828239d8>When <code data-v-828239d8>messaging</code> is enabled, an additional <code data-v-828239d8>streaming-repo/</code> subdirectory is created for JDK&#39;s JFR streaming repository:</p><div class="directory-structure" data-v-828239d8><pre data-v-828239d8><code data-v-828239d8>&lt;session-id&gt;/
├── profile-*.jfr                # Async-Profiler output
├── streaming-repo/              # JDK JFR streaming repository
│   ├── repository/
│   │   ├── metadata             # Repository metadata
│   │   ├── chunk0               # Streaming chunks
│   │   ├── chunk1
│   │   └── ...
│   └── .mark                    # Repository marker
└── .session-info.json</code></pre></div><p data-v-828239d8>The streaming repository serves two purposes:</p><ul data-v-828239d8><li data-v-828239d8><strong data-v-828239d8>Heartbeat events</strong> - Periodic liveness signals emitted by the Jeffrey Agent, used by the platform to detect when sessions finish</li><li data-v-828239d8><strong data-v-828239d8>Application events</strong> - Messages and alerts emitted by the application for real-time processing</li></ul><p data-v-828239d8>Unlike Async-Profiler files which are written periodically, streaming events are captured in real-time and stored in the JDK&#39;s native repository format.</p>`,6)),o(s,{type:"info"},{default:n(()=>[...e[2]||(e[2]=[t("strong",null,"Two recording mechanisms:",-1),r(" Async-Profiler generates high-performance profiling data (CPU, allocation, lock) while the JDK streaming repository captures Heartbeat, Message, and Alert events. Both coexist in the same session directory. ",-1)])]),_:1})]),o(l)]))}}),H=y(j,[["__scopeId","data-v-828239d8"]]);export{H as default};
