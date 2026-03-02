import{D as r}from"./DocsCodeBlock-C1lr-gT9.js";import{D as f}from"./DocsCallout-cfD1WgkG.js";import{D as c,a as s}from"./DocsPageHeader-DkTA7XMf.js";import{u as b}from"./useDocHeadings-T46U2rzl.js";import{d as l,i as p,c as u,b as d,a as t,k as v,m as a,w as o,o as m}from"./index-u9kOfjq7.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={class:"docs-article"},j={class:"docs-content"},h=`# Jeffrey CLI Init Command Configuration
# Usage: java -jar target/jeffrey-cli.jar init jeffrey-init.conf

# Jeffrey home directory path
jeffrey-home = "/tmp/jeffrey"

# Profiler configuration
profiler-path = "/tmp/jeffrey/libs/current/libasyncProfiler.so"

agent-path = "/tmp/jeffrey/libs/current/jeffrey-agent.jar"

jfc-settings-path = "/tmp/jeffrey/jfc"

# Project identification
project {
    workspace-id = "uat"
    name = "jeffrey"
    label = "Jeffrey"
}

# Features

# Debug Non-Safepoints - more precise profiling (enabled by default)
debug-non-safepoints {
    enabled = true
}

# Performance counters
# It's automatically used to detect finished session
perf-counters {
    enabled = true
}

# Heap dump on OutOfMemoryError
heap-dump {
    enabled = true
    type = "crash"  # "exit" or "crash"
}

# JVM logging with <<JEFFREY_CURRENT_SESSION>> placeholder for file path
# Use '-jvm.log' suffix to automatically recognize the file as a JVM log file by Jeffrey
jvm-logging {
    enabled = true
    command = "jfr*=trace:file=<<JEFFREY_CURRENT_SESSION>>/jfr-jvm.log::filecount=3,filesize=5m"
}

# Messaging - enables jeffrey.ImportantMessage JFR events
# with a dedicated repository for real-time message consumption
messaging {
    enabled = true
}

# Alerting - enables jeffrey.Alert JFR events
# with a dedicated repository for real-time alert consumption
alerting {
    enabled = true
}

# Streaming - controls the JFR streaming recording shared by messaging,
# alerting, and heartbeat
streaming {
    max-age = "2d"  # How long to keep streaming data (e.g., 12h, 1d, 30m)
}

# Heartbeat - enables periodic jeffrey.Heartbeat JFR events
# for reliable session liveness detection
heartbeat {
    enabled = true
}

# JDK Java Options - exports JDK_JAVA_OPTIONS environment variable
jdk-java-options {
    enabled = true
    additional-options = "-Xmx1200m -Xms1200m -XX:+UseG1GC -XX:+AlwaysPreTouch -Djeffrey.logging.trace-file.path=<<JEFFREY_CURRENT_SESSION>>/jeffrey-app.log"
}

# Attributes (key-value map)
# Supports HOCON substitution: \${VAR} (required) or \${?VAR} (optional)
attributes {
    cluster = "blue"
    namespace = "klingon"
}`,E=`# ENV file with variables to source:
# /tmp/jeffrey/workspaces/uat/jeffrey/.env
export JEFFREY_HOME=/tmp/jeffrey
export JEFFREY_WORKSPACES=/tmp/jeffrey/workspaces
export JEFFREY_CURRENT_WORKSPACE=/tmp/jeffrey/workspaces/uat
export JEFFREY_CURRENT_PROJECT=/tmp/jeffrey/workspaces/uat/jeffrey
export JEFFREY_CURRENT_SESSION=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560
export JEFFREY_FILE_PATTERN=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/profile-%t.jfr
export JEFFREY_PROFILER_CONFIG='-agentpath:/tmp/jeffrey/libs/current/libasyncProfiler.so=start,alloc,lock,event=ctimer,jfrsync=default,loop=15m,chunksize=5m,file=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/profile-%t.jfr -javaagent:/tmp/jeffrey/libs/current/jeffrey-agent.jar=heartbeat=true -XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints -XX:+UsePerfData -XX:PerfDataSaveFile=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/perf-counters.hsperfdata -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpGzipLevel=1 -XX:HeapDumpPath=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/heap-dump.hprof.gz -XX:+CrashOnOutOfMemoryError -XX:ErrorFile=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/hs-jvm-err.log -Xlog:jfr*=trace:file=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/jfr-jvm.log::filecount=3,filesize=5m -XX:FlightRecorderOptions:repository=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/streaming-repo,preserve-repository=true -XX:StartFlightRecording=name=jeffrey-streaming,maxage=2d,jeffrey.ImportantMessage#enabled=true,jeffrey.Alert#enabled=true,jeffrey.Heartbeat#enabled=true -Xmx1200m -Xms1200m -XX:+UseG1GC -XX:+AlwaysPreTouch -Djeffrey.logging.trace-file.path=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/jeffrey-app.log'
export JDK_JAVA_OPTIONS='-agentpath:/tmp/jeffrey/libs/current/libasyncProfiler.so=start,alloc,lock,event=ctimer,jfrsync=default,loop=15m,chunksize=5m,file=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/profile-%t.jfr -javaagent:/tmp/jeffrey/libs/current/jeffrey-agent.jar=heartbeat=true -XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints -XX:+UsePerfData -XX:PerfDataSaveFile=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/perf-counters.hsperfdata -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpGzipLevel=1 -XX:HeapDumpPath=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/heap-dump.hprof.gz -XX:+CrashOnOutOfMemoryError -XX:ErrorFile=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/hs-jvm-err.log -Xlog:jfr*=trace:file=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/jfr-jvm.log::filecount=3,filesize=5m -XX:FlightRecorderOptions:repository=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/streaming-repo,preserve-repository=true -XX:StartFlightRecording=name=jeffrey-streaming,maxage=2d,jeffrey.ImportantMessage#enabled=true,jeffrey.Alert#enabled=true,jeffrey.Heartbeat#enabled=true -Xmx1200m -Xms1200m -XX:+UseG1GC -XX:+AlwaysPreTouch -Djeffrey.logging.trace-file.path=/tmp/jeffrey/workspaces/uat/jeffrey/019bea41-630d-7764-9ca5-7bc6099bd560/jeffrey-app.log'`,X=l({__name:"CliGeneratedOutputPage",setup(F){const{setHeadings:n}=b(),i=[{id:"input-configuration",text:"Input Configuration",level:2},{id:"generated-environment",text:"Generated Environment Variables",level:2},{id:"variable-reference",text:"Variable Reference",level:2}];return p(()=>{n(i)}),(R,e)=>(m(),u("article",y,[d(c,{title:"Generated Output",icon:"bi bi-file-earmark-code"}),t("div",j,[e[2]||(e[2]=t("p",null,[a("This page shows a complete example of the Jeffrey CLI "),t("code",null,"init"),a(" command: the input configuration file and the generated environment variables.")],-1)),e[3]||(e[3]=t("h2",{id:"input-configuration"},"Input Configuration",-1)),e[4]||(e[4]=t("p",null,[a("The following HOCON configuration file ("),t("code",null,"jeffrey-init.conf"),a(") enables all features and demonstrates typical settings:")],-1)),d(r,{language:"hocon",code:h}),d(f,{type:"tip"},{default:o(()=>[...e[0]||(e[0]=[t("strong",null,"Run the command:",-1),a(" Execute ",-1),t("code",null,"java -jar jeffrey-cli.jar init jeffrey-init.conf",-1),a(" to generate the environment variables shown below. ",-1)])]),_:1}),e[5]||(e[5]=t("h2",{id:"generated-environment"},"Generated Environment Variables",-1)),e[6]||(e[6]=t("p",null,[a("When you run "),t("code",null,"jeffrey-cli init"),a(" with the above configuration, it outputs the following environment variables:")],-1)),d(r,{language:"bash",code:E}),d(f,{type:"info"},{default:o(()=>[...e[1]||(e[1]=[t("strong",null,"Source the output:",-1),a(" Redirect the output to a file and source it: ",-1),t("code",null,"java -jar jeffrey-cli.jar init config.conf > /tmp/jeffrey.env && source /tmp/jeffrey.env",-1)])]),_:1}),e[7]||(e[7]=v('<h2 id="variable-reference" data-v-f1df177b>Variable Reference</h2><p data-v-f1df177b>Each generated environment variable serves a specific purpose:</p><table data-v-f1df177b><thead data-v-f1df177b><tr data-v-f1df177b><th data-v-f1df177b>Variable</th><th data-v-f1df177b>Description</th></tr></thead><tbody data-v-f1df177b><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_HOME</code></td><td data-v-f1df177b>Base directory for all Jeffrey data (from <code data-v-f1df177b>jeffrey-home</code> config)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_WORKSPACES</code></td><td data-v-f1df177b>Directory containing all workspaces (<code data-v-f1df177b>$JEFFREY_HOME/workspaces</code>)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_CURRENT_WORKSPACE</code></td><td data-v-f1df177b>Path to the current workspace directory (from <code data-v-f1df177b>project.workspace-id</code> config)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_CURRENT_PROJECT</code></td><td data-v-f1df177b>Path to the current project directory (from <code data-v-f1df177b>project.name</code> config)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_CURRENT_SESSION</code></td><td data-v-f1df177b>Path to the current session directory (unique UUID per CLI invocation)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_FILE_PATTERN</code></td><td data-v-f1df177b>JFR output file pattern with <code data-v-f1df177b>%t</code> timestamp placeholder</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JEFFREY_PROFILER_CONFIG</code></td><td data-v-f1df177b>Complete JVM flags for profiling - use with <code data-v-f1df177b>java $JEFFREY_PROFILER_CONFIG -jar app.jar</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>JDK_JAVA_OPTIONS</code></td><td data-v-f1df177b>Same flags as <code data-v-f1df177b>JEFFREY_PROFILER_CONFIG</code> but auto-picked by JVM (when <code data-v-f1df177b>jdk-java-options</code> enabled)</td></tr></tbody></table><h3 data-v-f1df177b>JVM Flags in JEFFREY_PROFILER_CONFIG</h3><p data-v-f1df177b>The <code data-v-f1df177b>JEFFREY_PROFILER_CONFIG</code> variable contains all JVM flags based on enabled features:</p><table data-v-f1df177b><thead data-v-f1df177b><tr data-v-f1df177b><th data-v-f1df177b>Flag</th><th data-v-f1df177b>Source Feature</th></tr></thead><tbody data-v-f1df177b><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-agentpath:...libasyncProfiler.so=...</code></td><td data-v-f1df177b>Core profiler (always included)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints</code></td><td data-v-f1df177b><code data-v-f1df177b>debug-non-safepoints { enabled = true }</code> (enabled by default)</td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:+UsePerfData -XX:PerfDataSaveFile=...</code></td><td data-v-f1df177b><code data-v-f1df177b>perf-counters { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=...</code></td><td data-v-f1df177b><code data-v-f1df177b>heap-dump { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:+CrashOnOutOfMemoryError -XX:ErrorFile=...</code></td><td data-v-f1df177b><code data-v-f1df177b>heap-dump { type = &quot;crash&quot; }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-Xlog:jfr*=trace:file=...</code></td><td data-v-f1df177b><code data-v-f1df177b>jvm-logging { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-javaagent:...jeffrey-agent.jar=heartbeat=true</code></td><td data-v-f1df177b><code data-v-f1df177b>heartbeat { enabled = true }</code> + <code data-v-f1df177b>agent-path</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:FlightRecorderOptions:repository=...</code></td><td data-v-f1df177b><code data-v-f1df177b>streaming { max-age = &quot;...&quot; }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:StartFlightRecording=...,jeffrey.ImportantMessage#enabled=true</code></td><td data-v-f1df177b><code data-v-f1df177b>messaging { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:StartFlightRecording=...,jeffrey.Alert#enabled=true</code></td><td data-v-f1df177b><code data-v-f1df177b>alerting { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-XX:StartFlightRecording=...,jeffrey.Heartbeat#enabled=true</code></td><td data-v-f1df177b><code data-v-f1df177b>heartbeat { enabled = true }</code></td></tr><tr data-v-f1df177b><td data-v-f1df177b><code data-v-f1df177b>-Xmx1200m ... -Djeffrey.logging.trace-file.path=...</code></td><td data-v-f1df177b><code data-v-f1df177b>jdk-java-options { additional-options = &quot;...&quot; }</code></td></tr></tbody></table>',6))]),d(s)]))}}),P=g(X,[["__scopeId","data-v-f1df177b"]]);export{P as default};
