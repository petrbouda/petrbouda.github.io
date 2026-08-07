import{D as s}from"./DocsCallout-CGRKkMp2.js";import{D as l}from"./DocsNavFooter-D-6uZ-Z-.js";import{D as d}from"./DocsPageHeader-CC9UrM6D.js";import{u as f}from"./useDocHeadings-DQRAGXfp.js";import{i as u,o as c,e as p,h as n,a as e,g as t,B as o,m}from"./index-bTIMnMuz.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},y={class:"docs-content"},v=u({__name:"ProvisionerDirectoryStructurePage",setup(k){const{setHeadings:i}=f(),a=[{id:"jeffrey-home-structure",text:"Jeffrey Home Structure",level:2},{id:"session-directory",text:"Session Directory",level:2},{id:"streaming-repository",text:"Streaming Repository",level:2}];return c(()=>{i(a)}),(j,r)=>(m(),p("article",h,[n(d,{title:"Directory Structure",icon:"bi bi-folder-fill"}),e("div",y,[r[3]||(r[3]=e("p",null,"Jeffrey Provisioner creates a well-organized directory structure for storing profiling data. Understanding this structure helps with troubleshooting and managing disk space.",-1)),r[4]||(r[4]=e("h2",{id:"jeffrey-home-structure"},"Jeffrey Home Structure",-1)),r[5]||(r[5]=e("p",null,[t("The "),e("code",null,"jeffrey-home"),t(" directory (configured in your provisioner config) contains all Jeffrey data organized by workspaces and projects:")],-1)),r[6]||(r[6]=e("div",{class:"directory-structure"},[e("pre",null,[e("code",null,`<jeffrey-home>/
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
                    └── ...`)])],-1)),n(s,{type:"info"},{default:o(()=>[...r[0]||(r[0]=[e("strong",null,"Workspace isolation:",-1),t(" Each workspace has its own directory, making it easy to manage separate environments (production, staging, development). ",-1)])]),_:1}),r[7]||(r[7]=e("h2",{id:"session-directory"},"Session Directory",-1)),r[8]||(r[8]=e("p",null,"Each recording session creates a directory with a unique identifier. The contents depend on your configuration, but Async-Profiler generates chunked JFR files using a timestamp pattern:",-1)),r[9]||(r[9]=e("div",{class:"directory-structure"},[e("pre",null,[e("code",null,`<session-id>/
├── profile-1704067200.jfr       # JFR chunk (timestamp-based naming)
├── profile-1704067800.jfr       # Next chunk after loop interval
├── profile-1704068400.jfr       # ... more chunks
├── streaming-repo/              # JDK JFR streaming repository (always created)
├── .heartbeat/                  # Agent liveness files
│   ├── heartbeat                # Epoch millis, rewritten every 5 seconds
│   └── finished                 # Clean-exit marker (written on JVM shutdown)
├── heap-dump.hprof.gz           # Heap dump (if captured)
├── jfr-jvm.log                  # JVM log (if enabled)
├── perf-counters.hsperfdata     # Performance counters (if enabled)
├── hs-jvm-err.log               # HotSpot error log (written on JVM crash)
└── .session-info.json           # Session metadata`)])],-1)),r[10]||(r[10]=e("p",null,[t("Async-Profiler creates new chunks based on the "),e("code",null,"loop"),t(" and "),e("code",null,"chunksize"),t(" parameters. The "),e("code",null,"%t"),t(" placeholder in the file pattern is replaced with the current timestamp.")],-1)),n(s,{type:"info"},{default:o(()=>[...r[1]||(r[1]=[e("strong",null,"Liveness files:",-1),t(" the Jeffrey Agent rewrites ",-1),e("code",null,".heartbeat/heartbeat",-1),t(" every 5 seconds and writes ",-1),e("code",null,".heartbeat/finished",-1),t(" from its shutdown hook on clean exit. The hub finishes a session immediately when the ",-1),e("code",null,"finished",-1),t(" marker appears, and falls back to heartbeat staleness for crashed JVMs. The presence of ",-1),e("code",null,"hs-jvm-err.log",-1),t(" indicates a JVM crash was detected. ",-1)])]),_:1}),r[11]||(r[11]=e("h2",{id:"streaming-repository"},"Streaming Repository",-1)),r[12]||(r[12]=e("p",null,[t("The "),e("code",null,"streaming-repo/"),t(" subdirectory is created unconditionally and the JVM is started with "),e("code",null,"-XX:FlightRecorderOptions=repository=<session>/streaming-repo"),t(", so JDK's JFR streaming repository lives inside the session directory:")],-1)),r[13]||(r[13]=e("div",{class:"directory-structure"},[e("pre",null,[e("code",null,`<session-id>/
├── profile-*.jfr                # Async-Profiler output
├── streaming-repo/              # JDK JFR streaming repository
│   ├── metadata                 # Repository metadata
│   ├── chunk0                   # Streaming chunks
│   ├── chunk1
│   └── ...
└── .session-info.json`)])],-1)),r[14]||(r[14]=e("p",null,[t("The streaming repository lets the hub stream live JFR events from a running session — including the "),e("code",null,"jeffrey.AppInformation"),t(" event the Jeffrey Agent emits at the start of every JFR chunk, which makes each chunk self-describing (workspace, project, instance, session, order).")],-1)),n(s,{type:"info"},{default:o(()=>[...r[2]||(r[2]=[e("strong",null,"Two recording mechanisms:",-1),t(" Async-Profiler generates high-performance profiling data (CPU, allocation, lock) written as chunked ",-1),e("code",null,"profile-*.jfr",-1),t(" files, while the JDK streaming repository captures live events for real-time streaming. Both coexist in the same session directory. ",-1)])]),_:1})]),n(l)]))}}),x=g(v,[["__scopeId","data-v-41cce43f"]]);export{x as default};
