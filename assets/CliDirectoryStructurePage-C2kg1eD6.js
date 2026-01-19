import{D as s}from"./DocsCallout-CN2pqXu-.js";import{D as c,a as d}from"./DocsPageHeader-BBF35W9f.js";import{u as f}from"./useDocHeadings-By33_tDs.js";import{d as p,i as l,c as u,b as r,a as t,k as m,m as o,w as n,o as g}from"./index-DrKSq3n4.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},v={class:"docs-content"},k=p({__name:"CliDirectoryStructurePage",setup(j){const{setHeadings:a}=f(),i=[{id:"jeffrey-home-structure",text:"Jeffrey Home Structure",level:2},{id:"session-directory",text:"Session Directory",level:2},{id:"streaming-repository",text:"Streaming Repository",level:2}];return l(()=>{a(i)}),(w,e)=>(g(),u("article",h,[r(c,{title:"Directory Structure",icon:"bi bi-folder-fill"}),t("div",v,[e[2]||(e[2]=t("p",null,"Jeffrey CLI creates a well-organized directory structure for storing profiling data. Understanding this structure helps with troubleshooting and managing disk space.",-1)),e[3]||(e[3]=t("h2",{id:"jeffrey-home-structure"},"Jeffrey Home Structure",-1)),e[4]||(e[4]=t("p",null,[o("The "),t("code",null,"jeffrey-home"),o(" directory (configured in your CLI config) contains all Jeffrey data organized by workspaces and projects:")],-1)),e[5]||(e[5]=t("div",{class:"directory-structure"},[t("pre",null,[t("code",null,`<jeffrey-home>/
└── workspaces/
    └── <workspace-id>/
        ├── .settings/                       # Cached profiler settings from Jeffrey
        │   └── settings-2025-01-15T....json
        └── <project-name>/
            ├── .project-info.json           # Project metadata
            └── <session-id>/
                ├── .session-info.json       # Session metadata
                ├── profile-1704067200.jfr   # Async-Profiler output
                ├── profile-1704067800.jfr
                └── ...`)])],-1)),r(s,{type:"info"},{default:n(()=>[...e[0]||(e[0]=[t("strong",null,"Workspace isolation:",-1),o(" Each workspace has its own directory, making it easy to manage separate environments (production, staging, development). ",-1)])]),_:1}),e[6]||(e[6]=m(`<h2 id="session-directory" data-v-7c7cf8f1>Session Directory</h2><p data-v-7c7cf8f1>Each recording session creates a directory with a unique identifier. The contents depend on your configuration, but Async-Profiler generates chunked JFR files using a timestamp pattern:</p><div class="directory-structure" data-v-7c7cf8f1><pre data-v-7c7cf8f1><code data-v-7c7cf8f1>&lt;session-id&gt;/
├── profile-1704067200.jfr       # JFR chunk (timestamp-based naming)
├── profile-1704067800.jfr       # Next chunk after loop interval
├── profile-1704068400.jfr       # ... more chunks
├── heap-dump.hprof.gz           # Heap dump (if captured)
├── jfr-jvm.log                  # JVM log (if enabled)
├── perf-counters.hsperfdata     # Performance counters
└── .session-info.json           # Session metadata</code></pre></div><p data-v-7c7cf8f1>Async-Profiler creates new chunks based on the <code data-v-7c7cf8f1>loop</code> and <code data-v-7c7cf8f1>chunksize</code> parameters. The <code data-v-7c7cf8f1>%t</code> placeholder in the file pattern is replaced with the current timestamp.</p><h2 id="streaming-repository" data-v-7c7cf8f1>Streaming Repository</h2><p data-v-7c7cf8f1>When <code data-v-7c7cf8f1>messaging</code> is enabled, an additional <code data-v-7c7cf8f1>streaming-repo/</code> subdirectory is created for JDK&#39;s JFR streaming repository:</p><div class="directory-structure" data-v-7c7cf8f1><pre data-v-7c7cf8f1><code data-v-7c7cf8f1>&lt;session-id&gt;/
├── profile-*.jfr                # Async-Profiler output
├── streaming-repo/              # JDK JFR streaming repository
│   ├── repository/
│   │   ├── metadata             # Repository metadata
│   │   ├── chunk0               # Streaming chunks
│   │   ├── chunk1
│   │   └── ...
│   └── .mark                    # Repository marker
└── .session-info.json</code></pre></div><p data-v-7c7cf8f1>The streaming repository is used for <strong data-v-7c7cf8f1>ImportantMessage</strong> events that require immediate processing. Unlike Async-Profiler files which are written periodically, streaming events are captured in real-time and stored in the JDK&#39;s native repository format.</p>`,8)),r(s,{type:"info"},{default:n(()=>[...e[1]||(e[1]=[t("strong",null,"Two recording mechanisms:",-1),o(" Async-Profiler generates high-performance profiling data (CPU, allocation, lock) while the JDK streaming repository captures ImportantMessage events. Both coexist in the same session directory. ",-1)])]),_:1})]),r(d)]))}}),x=y(k,[["__scopeId","data-v-7c7cf8f1"]]);export{x as default};
