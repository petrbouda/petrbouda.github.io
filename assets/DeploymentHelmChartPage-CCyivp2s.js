import{D as s}from"./DocsCallout-Bu-IVJZt.js";import{D as n}from"./DocsCodeBlock-CWVqalAN.js";import{D as p}from"./DocsNavFooter-El9VmGP8.js";import{D as m}from"./DocsPageHeader-BzXD3EYr.js";import{u as f}from"./useDocHeadings-CcM9IXsb.js";import{d as h,o as v,c as g,f as l,b as t,e as o,w as a,h as i,k as y,l as c}from"./index-DoGOKI5w.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const P={class:"docs-article"},j={class:"docs-content"},E=`helm/
├── volume-scheduler/
│   ├── Chart.yaml
│   ├── values.yaml                   # image tag, sharedVolume, ports, ingress, probes
│   ├── application.properties        # Spring Boot config (logging, overrides)
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml              # HTTP 8080 (REST API)
│       ├── ingress.yaml              # optional HTTP access to the API
│       ├── persistent-volume-claim.yaml
│       ├── persistent-volume.yaml    # hostPath PV (orbstack/minikube)
│       ├── configmap.yaml            # mounts application.properties
│       ├── serviceaccount.yaml
│       └── _helpers.tpl
│
├── jeffrey-testapp-server/
│   ├── Chart.yaml
│   ├── values.yaml                   # mode toggle, sharedVolume, jeffrey env, probes
│   ├── jeffrey-base.conf             # provisioner init config for the monitored service
│   └── templates/
│       ├── deployment.yaml           # JIB image, shared-volume mount, jeffrey env
│       ├── service.yaml              # HTTP 8080
│       ├── configmap.yaml            # application.properties
│       ├── jeffrey-base-configmap.yaml
│       ├── serviceaccount.yaml
│       └── _helpers.tpl
│
└── jeffrey-testapp-client/
    ├── Chart.yaml
    ├── values.yaml                   # load config, sharedVolume, jeffrey env, TCP probes
    ├── jeffrey-base.conf             # provisioner init config for the load generator
    └── templates/                    # same shape as testapp-server (no DB mount)
        ├── deployment.yaml
        ├── service.yaml
        ├── configmap.yaml
        ├── jeffrey-base-configmap.yaml
        ├── serviceaccount.yaml
        └── _helpers.tpl`,T=`image:
  repository: petrbouda/volume-scheduler   # a GraalVM native image, no JVM inside
  # Pin to a specific upstream build
  # (https://hub.docker.com/r/petrbouda/volume-scheduler/tags).
  tag: <version>
  pullPolicy: IfNotPresent

containerPort: 8080`,C=`env:
  - name: JEFFREY_VOLUMESCHEDULER_VOLUME_PATH
    value: {{ .Values.sharedVolume.mountPath | quote }}     # /mnt/jeffrey`,S=`containers:
  - name: volume-scheduler
    image: petrbouda/volume-scheduler:<version>   # or latest
    # Options of the native image itself come first, then Spring's --key=value arguments.
    args: ["-Xmx64m"]
    env:
      - name: JEFFREY_VOLUMESCHEDULER_VOLUME_PATH
        value: /mnt/jeffrey
    resources:
      requests:
        memory: 128Mi
      limits:
        memory: 192Mi`,w=`# The image, from the repository root (the build runs in a GraalVM container):
docker build -f docker/Dockerfile-volume-scheduler -t volume-scheduler .

# Or the binary alone, with GraalVM 25 as JAVA_HOME:
mvn -pl build/build-volume-scheduler-native -am -Pnative package -DskipTests
./build/build-volume-scheduler-native/target/volume-scheduler --jeffrey.volume-scheduler.volume.path=/mnt/jeffrey`,I=`apiVersion: v1
kind: Service
metadata:
  name: {{ include "volume-scheduler.fullname" . }}
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: http
      name: http
  selector:
    {{- include "volume-scheduler.selectorLabels" . | nindent 4 }}`,V=`# Service-mode toggle: "direct" (efficient.mode=true) or "dom" (efficient.mode=false).
mode: dom

applicationProperties: |-
  server.port=8080
  database.file=/var/lib/jeffrey/testapp.db
  database.cleanup-on-shutdown=false
  management.endpoints.web.exposure.include=health
  management.endpoint.health.probes.enabled=true

# Must match volume-scheduler's sharedVolume block exactly.
sharedVolume:
  claimName: jeffrey-pvc
  mountPath: /mnt/jeffrey

jeffrey:
  baseConfigPath: /jeffrey/jeffrey-base.conf
  enabled: true`,k=`env:
  # Additional-location MERGES with the image-bundled application.properties
  # (preserving spring.sql.init.* and other defaults). SPRING_CONFIG_LOCATION
  # would REPLACE them, which silently drops \`spring.sql.init.mode=always\`
  # and the init.sql schema bootstrap.
  - name: SPRING_CONFIG_ADDITIONAL_LOCATION
    value: /app/config/application.properties
  - name: JEFFREY_HOME
    value: {{ .Values.sharedVolume.mountPath | quote }}
  - name: JEFFREY_BASE_CONFIG
    value: {{ .Values.jeffrey.baseConfigPath | quote }}
  - name: JEFFREY_ENABLED
    value: {{ .Values.jeffrey.enabled | quote }}
  - name: JEFFREY_TESTAPP_MODE
    value: {{ .Values.mode | quote }}`,O=`# Two flavours from one chart — same image, different values.mode:
helm upgrade --install direct helm/jeffrey-testapp-server --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server --set mode=dom

# On the volume, and in Microscope, the two projects appear as:
#   direct-jeffrey-testapp-server   (efficient PersonService)
#   dom-jeffrey-testapp-server      (inefficient PersonService)`,F=`# 1) The Volume Scheduler — creates the shared PVC the recordings land in.
helm upgrade --install volume-scheduler helm/volume-scheduler \\
  --namespace jeffrey-testapp --create-namespace

# 2) Two flavours of the testapp service from the same chart.
helm upgrade --install direct helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=dom

# 3) Load generator that drives both servers.
helm upgrade --install jeffrey-testapp-client helm/jeffrey-testapp-client \\
  --namespace jeffrey-testapp`,N=`# When the cluster has no RWX provisioner (orbstack/minikube/kind), tell the
# volume-scheduler chart to bind to a static hostPath PV instead of a dynamic one:
helm upgrade --install volume-scheduler helm/volume-scheduler \\
  --namespace jeffrey-testapp --create-namespace \\
  --set sharedVolume.storageClassName="" \\
  --set sharedVolume.hostPath.create=true`,A=h({__name:"DeploymentHelmChartPage",setup(R){const{setHeadings:d}=f(),u=[{id:"three-charts",text:"Three Charts at a Glance",level:2},{id:"chart-structure",text:"Chart Structure",level:2},{id:"configure-volume-scheduler",text:"Configuring the Volume Scheduler",level:2},{id:"native-image",text:"Native Image",level:3},{id:"configure-app",text:"Configuring the Monitored Application",level:2},{id:"side-by-side",text:"Side-by-Side: direct vs dom",level:2},{id:"installing",text:"Installing the Stack",level:2},{id:"tearing-down",text:"Tearing Down",level:2}];return v(()=>{d(u)}),(M,e)=>{const r=y("router-link");return c(),g("article",P,[l(m,{title:"Helm Chart",icon:"bi bi-file-earmark-code"}),t("div",j,[e[64]||(e[64]=t("p",null,[o(" The full Kubernetes example for the "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp",target:"_blank",rel:"noopener"},"jeffrey-testapp"),o(" repo. Three charts under "),t("code",null,"helm/"),o(" coordinate the Volume Scheduler, two flavours of the testapp service, and one load-generating client — all in a single namespace, all sharing one PVC. Every snippet on this page is taken verbatim from the repo with minor formatting trims; follow the file links for the un-edited source. ")],-1)),e[65]||(e[65]=t("h2",{id:"three-charts"},"Three Charts at a Glance",-1)),t("table",null,[e[9]||(e[9]=t("thead",null,[t("tr",null,[t("th",null,"Chart"),t("th",null,"Role"),t("th",null,"Releases installed")])],-1)),t("tbody",null,[t("tr",null,[e[5]||(e[5]=t("td",null,[t("code",null,"helm/volume-scheduler/")],-1)),t("td",null,[e[1]||(e[1]=o("The Volume Scheduler. Owns the shared PVC, runs the retention and compression jobs on it, and serves its ",-1)),l(r,{to:"/docs/volume-scheduler/api"},{default:a(()=>[...e[0]||(e[0]=[o("REST API",-1)])]),_:1}),e[2]||(e[2]=o(" on HTTP ",-1)),e[3]||(e[3]=t("code",null,"8080",-1)),e[4]||(e[4]=o(".",-1))]),e[6]||(e[6]=t("td",null,[t("code",null,"volume-scheduler")],-1))]),e[7]||(e[7]=t("tr",null,[t("td",null,[t("code",null,"helm/jeffrey-testapp-server/")]),t("td",null,[o("SQLite-backed Spring Boot REST app, profiled by the JIB entrypoint. Toggles between efficient and inefficient PersonService via "),t("code",null,"mode"),o(".")]),t("td",null,[t("code",null,"direct"),o(" ("),t("code",null,"--set mode=direct"),o("), "),t("code",null,"dom"),o(" ("),t("code",null,"--set mode=dom"),o(")")])],-1)),e[8]||(e[8]=t("tr",null,[t("td",null,[t("code",null,"helm/jeffrey-testapp-client/")]),t("td",null,"Load generator — drives both server flavours concurrently."),t("td",null,[t("code",null,"jeffrey-testapp-client")])],-1))])]),e[66]||(e[66]=i('<h2 id="chart-structure" data-v-dae3035a>Chart Structure</h2><p data-v-dae3035a> Each chart follows the standard Helm v3 layout (<code data-v-dae3035a>Chart.yaml</code> + <code data-v-dae3035a>values.yaml</code> + <code data-v-dae3035a>templates/</code>). The two project-config files unique to this stack are <code data-v-dae3035a>application.properties</code> (Spring Boot) and <code data-v-dae3035a>jeffrey-base.conf</code> (HOCON for the provisioner) — both live next to <code data-v-dae3035a>values.yaml</code> and are pulled into ConfigMaps by the templates via <code data-v-dae3035a>.Files.Get</code>. </p>',2)),l(n,{language:"text",code:E}),l(s,{type:"info"},{default:a(()=>[...e[10]||(e[10]=[t("strong",null,"One chart per concern.",-1),o(),t("code",null,"volume-scheduler",-1),o(" owns the cluster-wide objects — the shared PVC, the optional hostPath PV, the Service, the optional Ingress. The two testapp charts deliberately carry no PV/PVC/Ingress — they only bind to ",-1),t("code",null,"volume-scheduler",-1),o("'s claim and stay cluster-internal. ",-1)])]),_:1}),e[67]||(e[67]=t("h2",{id:"configure-volume-scheduler"},"Configuring the Volume Scheduler",-1)),e[68]||(e[68]=t("p",null,[o(" From "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/volume-scheduler/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"helm/volume-scheduler/values.yaml")]),o(": ")],-1)),l(n,{language:"yaml",code:T}),t("p",null,[e[12]||(e[12]=o(" One environment variable on the Deployment points the volume scheduler at the shared volume, from ",-1)),e[13]||(e[13]=t("code",null,"sharedVolume.mountPath",-1)),e[14]||(e[14]=o(". The path is ",-1)),l(r,{to:"/docs/volume-scheduler/configuration#volume"},{default:a(()=>[...e[11]||(e[11]=[o("required",-1)])]),_:1}),e[15]||(e[15]=o(", and the pod fails to start if the volume is not mounted there: ",-1))]),l(n,{language:"yaml",code:C}),t("p",null,[e[17]||(e[17]=o("The Service exposes the volume scheduler's ",-1)),l(r,{to:"/docs/volume-scheduler/api"},{default:a(()=>[...e[16]||(e[16]=[o("REST API",-1)])]),_:1}),e[18]||(e[18]=o(" (",-1)),e[19]||(e[19]=t("code",null,"/api/v1",-1)),e[20]||(e[20]=o(") and its health probes on a single ClusterIP:",-1))]),l(n,{language:"yaml",code:I}),e[69]||(e[69]=i('<p data-v-dae3035a> OrbStack publishes in-cluster Service DNS to the host automatically — call <code data-v-dae3035a>http://volume-scheduler.jeffrey-testapp.svc.cluster.local:8080/api/v1/storage</code> directly from the laptop. For other clusters, the chart&#39;s optional <code data-v-dae3035a>ingress.enabled=true</code> gives HTTP access to the API from outside — or use <code data-v-dae3035a>kubectl port-forward</code>. The API has no authentication and its run endpoint deletes data, so keep it inside the cluster unless the Ingress is protected. </p><h3 id="native-image" data-v-dae3035a>Native Image</h3><p data-v-dae3035a> The image, <code data-v-dae3035a>petrbouda/volume-scheduler:&lt;version&gt;</code> (and <code data-v-dae3035a>latest</code>) for <code data-v-dae3035a>amd64</code> and <code data-v-dae3035a>arm64</code>, is the Volume Scheduler compiled ahead of time with GraalVM into the binary <code data-v-dae3035a>/app/volume-scheduler</code>, on a distroless base with no JVM inside. It starts in about a tenth of a second. In a small test (one project, a few recordings, a few hundred API calls) it held about half the memory a JVM build of the same code did under the same load at the same heap cap: around 100 MB resident against about 200 MB. Options of the native image itself, such as the <code data-v-dae3035a>-Xmx64m</code> heap cap below, come first among the container&#39;s arguments, before Spring&#39;s <code data-v-dae3035a>--key=value</code> ones: </p>',3)),l(n,{language:"yaml",code:S}),l(s,{type:"info"},{default:a(()=>[e[22]||(e[22]=t("strong",null,"The volume scheduler does not profile itself.",-1)),e[23]||(e[23]=o(" async-profiler is a JVM agent, which a native image cannot load, so its image has no ",-1)),l(r,{to:"/docs/deployment/jeffrey-jib"},{default:a(()=>[...e[21]||(e[21]=[o("Jeffrey JIB",-1)])]),_:1}),e[24]||(e[24]=o(" entrypoint, no Provisioner and no ",-1)),e[25]||(e[25]=t("code",null,"jeffrey-base.conf",-1)),e[26]||(e[26]=o("; ",-1)),e[27]||(e[27]=t("code",null,"JEFFREY_ENABLED",-1)),e[28]||(e[28]=o(" has no effect on it. It also has no shell, so health checks go through the HTTP probes (",-1)),e[29]||(e[29]=t("code",null,"/actuator/health/liveness",-1)),e[30]||(e[30]=o(", ",-1)),e[31]||(e[31]=t("code",null,"/actuator/health/readiness",-1)),e[32]||(e[32]=o("). The monitored applications keep their JIB entrypoints. ",-1))]),_:1}),e[70]||(e[70]=t("p",null," The volume scheduler runs as root, because it deletes and compresses files written by applications running under any uid. To build the image or the binary yourself: ",-1)),l(n,{language:"bash",code:w}),e[71]||(e[71]=t("h2",{id:"configure-app"},"Configuring the Monitored Application",-1)),e[72]||(e[72]=t("p",null,[o(" The testapp's "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-testapp-server/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"values.yaml")]),o(": ")],-1)),l(n,{language:"yaml",code:V}),t("p",null,[e[34]||(e[34]=o(" The Deployment wires ",-1)),e[35]||(e[35]=t("code",null,"JEFFREY_HOME",-1)),e[36]||(e[36]=o(", ",-1)),e[37]||(e[37]=t("code",null,"JEFFREY_BASE_CONFIG",-1)),e[38]||(e[38]=o(", and ",-1)),e[39]||(e[39]=t("code",null,"JEFFREY_ENABLED",-1)),e[40]||(e[40]=o(" into the application container — see the ",-1)),l(r,{to:"/docs/deployment/jeffrey-provisioner"},{default:a(()=>[...e[33]||(e[33]=[o("Jeffrey Provisioner",-1)])]),_:1}),e[41]||(e[41]=o(" page for the full env-var contract: ",-1))]),l(n,{language:"yaml",code:k}),l(s,{type:"tip"},{default:a(()=>[e[43]||(e[43]=t("strong",null,"Changing what the agent records.",-1)),e[44]||(e[44]=o(" Add a ",-1)),e[45]||(e[45]=t("code",null,"JEFFREY_PROFILER_COMMAND",-1)),e[46]||(e[46]=o(" entry to the pod's ",-1)),e[47]||(e[47]=t("code",null,"env:",-1)),e[48]||(e[48]=o(" with options built in ",-1)),l(r,{to:"/docs/microscope/profiler-builder"},{default:a(()=>[...e[42]||(e[42]=[o("Profiler Builder",-1)])]),_:1}),e[49]||(e[49]=o(" (",-1)),e[50]||(e[50]=t("code",null,"start,event=cpu,...",-1)),e[51]||(e[51]=o("); they run on the async-profiler the image bakes in. It takes precedence over any ",-1)),e[52]||(e[52]=t("code",null,"profiler-command",-1)),e[53]||(e[53]=o(" in a mounted configuration file, so no rebuild or ConfigMap change is needed. ",-1))]),_:1}),l(s,{type:"warning"},{default:a(()=>[...e[54]||(e[54]=[t("strong",null,"Spring Boot config-mount gotcha.",-1),o(" Use ",-1),t("code",null,"SPRING_CONFIG_ADDITIONAL_LOCATION",-1),o(", not ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),o(". Additional-location ",-1),t("em",null,"merges",-1),o(" with the image-bundled ",-1),t("code",null,"application.properties",-1),o("; the regular ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),o(),t("em",null,"replaces",-1),o(" it, silently dropping defaults like ",-1),t("code",null,"spring.sql.init.mode=always",-1),o(" that the testapp uses for its bootstrap SQL. ",-1)])]),_:1}),e[73]||(e[73]=t("h2",{id:"side-by-side"},"Side-by-Side: direct vs dom",-1)),e[74]||(e[74]=t("p",null," The headline value of this layout: one chart, two distinct projects on the shared volume, ready for differential analysis in Microscope. ",-1)),l(n,{language:"bash",code:O}),t("p",null,[e[56]||(e[56]=o(" Inside the application container, ",-1)),e[57]||(e[57]=t("code",null,"jeffrey-base.conf",-1)),e[58]||(e[58]=o(" reads ",-1)),e[59]||(e[59]=t("code",null,"JEFFREY_TESTAPP_MODE",-1)),e[60]||(e[60]=o(" via HOCON variable substitution to set the project name and label — see the ",-1)),l(r,{to:"/docs/deployment/jeffrey-provisioner#project-block"},{default:a(()=>[...e[55]||(e[55]=[o("Project Block",-1)])]),_:1}),e[61]||(e[61]=o(" section for the substitution syntax. In Microscope, opening both projects side-by-side gives a one-click differential flame graph between the efficient and inefficient code paths. ",-1))]),e[75]||(e[75]=t("h2",{id:"installing"},"Installing the Stack",-1)),e[76]||(e[76]=t("p",null,[o(" Four "),t("code",null,"helm upgrade --install"),o(" calls — one per release. Order doesn't matter: each application image carries its own provisioner and async-profiler, so a pod that starts before the volume scheduler still profiles from the first second. It simply writes its recordings to the shared volume, and the volume scheduler's retention and compression jobs take them over whenever it arrives. ")],-1)),l(n,{language:"bash",code:F}),e[77]||(e[77]=t("p",null,[o(" On dev clusters without an RWX provisioner (OrbStack, minikube, kind), pass two extra flags to "),t("code",null,"volume-scheduler"),o(" so it binds the PVC to a static hostPath PV instead: ")],-1)),l(n,{language:"bash",code:N}),l(s,{type:"tip"},{default:a(()=>[...e[62]||(e[62]=[o(" Anything you'd put in ",-1),t("code",null,"values.yaml",-1),o(" can also be passed inline with ",-1),t("code",null,"--set key=value",-1),o(" or ",-1),t("code",null,"--values overrides.yaml",-1),o(" — the chart is a vanilla Helm v3 chart with no opinions on how you supply values. ",-1)])]),_:1}),e[78]||(e[78]=t("h2",{id:"tearing-down"},"Tearing Down",-1)),e[79]||(e[79]=t("p",null,[o(" Reverse-order "),t("code",null,"helm uninstall"),o(" — the testapp releases first, then "),t("code",null,"volume-scheduler"),o(" last (so its PVC outlives the consumers): ")],-1)),l(n,{language:"bash",code:`helm uninstall jeffrey-testapp-client --namespace jeffrey-testapp
helm uninstall dom                    --namespace jeffrey-testapp
helm uninstall direct                 --namespace jeffrey-testapp
helm uninstall volume-scheduler       --namespace jeffrey-testapp`}),l(s,{type:"warning"},{default:a(()=>[...e[63]||(e[63]=[t("strong",null,[o("Statically-defined hostPath PVs survive "),t("code",null,"helm uninstall"),o(".")],-1),o(" The default ",-1),t("code",null,"reclaimPolicy",-1),o(" for a manually-created PV is ",-1),t("code",null,"Retain",-1),o(", so the directory on the cluster node (e.g. ",-1),t("code",null,"/tmp/jeffrey-data",-1),o(" on OrbStack) keeps the contents the testapp pods wrote into it. The next install would inherit stale recordings and session directories. On dev clusters, wipe the directory yourself before re-installing. On real clusters with a dynamic RWX provisioner, the ",-1),t("code",null,"StorageClass",-1),o(" owns the reclaim policy and the cleanup is automatic. ",-1)])]),_:1})]),l(p)])}}}),q=b(A,[["__scopeId","data-v-dae3035a"]]);export{q as default};
