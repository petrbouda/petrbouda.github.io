import{D as l}from"./DocsCallout-Q8kmVbpu.js";import{D as r}from"./DocsCodeBlock-PSo5gpRl.js";import{D as p}from"./DocsNavFooter-BmGpU8vw.js";import{D as f}from"./DocsPageHeader-Br9SE4s-.js";import{u}from"./useDocHeadings-DHgg5ugF.js";import{d as m,k as c,c as h,e as o,a as t,b as y,w as n,j as a,i as v,o as g}from"./index-vXLSprmJ.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},P={class:"docs-content"},C=`helm/
├── jeffrey-hub/
│   ├── Chart.yaml
│   ├── values.yaml                   # image tag, sharedVolume, ports, ingress, probes
│   ├── application.properties        # Spring Boot config (home.dir)
│   ├── jeffrey-base.conf             # provisioner init config for self-profiling
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml              # HTTP 8080 (Storage + Scheduler UI)
│       ├── ingress.yaml              # optional HTTP ingress
│       ├── persistent-volume-claim.yaml
│       ├── persistent-volume.yaml    # hostPath PV (orbstack/minikube)
│       ├── configmap.yaml            # mounts application.properties + jeffrey-base.conf
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
        └── _helpers.tpl`,w=`image:
  repository: petrbouda/jeffrey-hub
  # Pin to a specific upstream build. Bump when a newer 0.7.x is pushed
  # (https://hub.docker.com/r/petrbouda/jeffrey-hub/tags).
  tag: 0.7.1-b68
  pullPolicy: IfNotPresent

containerPort: 8080

selfProfile:
  enabled: true   # jeffrey-hub self-profiles via the JIB entrypoint`,S=`apiVersion: v1
kind: Service
metadata:
  name: {{ include "jeffrey-hub.fullname" . }}
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: http
      name: http
  selector:
    {{- include "jeffrey-hub.selectorLabels" . | nindent 4 }}`,E=`# Service-mode toggle: "direct" (efficient.mode=true) or "dom" (efficient.mode=false).
mode: dom

applicationProperties: |-
  server.port=8080
  database.file=/var/lib/jeffrey/testapp.db
  database.cleanup-on-shutdown=false
  management.endpoints.web.exposure.include=health
  management.endpoint.health.probes.enabled=true

# Must match jeffrey-hub's sharedVolume block exactly.
sharedVolume:
  claimName: jeffrey-pvc
  mountPath: /mnt/jeffrey

jeffrey:
  baseConfigPath: /jeffrey/jeffrey-base.conf
  enabled: true
  hubHost: jeffrey-hub:8080`,I=`env:
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

# In Jeffrey Hub, the two projects appear as:
#   direct-jeffrey-testapp-server   (efficient PersonService)
#   dom-jeffrey-testapp-server      (inefficient PersonService)`,T=`# 1) Jeffrey Hub — creates the shared PVC the recordings land in.
helm upgrade --install jeffrey-hub helm/jeffrey-hub \\
  --namespace jeffrey-testapp --create-namespace

# 2) Two flavours of the testapp service from the same chart.
helm upgrade --install direct helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=dom

# 3) Load generator that drives both servers.
helm upgrade --install jeffrey-testapp-client helm/jeffrey-testapp-client \\
  --namespace jeffrey-testapp`,k=`# When the cluster has no RWX provisioner (orbstack/minikube/kind), tell the
# jeffrey-hub chart to bind to a static hostPath PV instead of a dynamic one:
helm upgrade --install jeffrey-hub helm/jeffrey-hub \\
  --namespace jeffrey-testapp --create-namespace \\
  --set sharedVolume.storageClassName="" \\
  --set sharedVolume.hostPath.create=true`,F=m({__name:"DeploymentHelmChartPage",setup(N){const{setHeadings:i}=u(),d=[{id:"three-charts",text:"Three Charts at a Glance",level:2},{id:"chart-structure",text:"Chart Structure",level:2},{id:"configure-server",text:"Configuring Jeffrey Hub",level:2},{id:"configure-app",text:"Configuring the Monitored Application",level:2},{id:"side-by-side",text:"Side-by-Side: direct vs dom",level:2},{id:"installing",text:"Installing the Stack",level:2},{id:"tearing-down",text:"Tearing Down",level:2}];return c(()=>{i(d)}),(V,e)=>{const s=v("router-link");return g(),h("article",j,[o(f,{title:"Helm Chart",icon:"bi bi-file-earmark-code"}),t("div",P,[e[32]||(e[32]=y('<p data-v-0170c9e9> The full Kubernetes example for the <a href="https://github.com/petrbouda/jeffrey-testapp" target="_blank" rel="noopener" data-v-0170c9e9>jeffrey-testapp</a> repo. Three charts under <code data-v-0170c9e9>helm/</code> coordinate a Jeffrey Hub, two flavours of the testapp service, and one load-generating client — all in a single namespace, all sharing one PVC. Every snippet on this page is taken verbatim from the repo with minor formatting trims; follow the file links for the un-edited source. </p><h2 id="three-charts" data-v-0170c9e9>Three Charts at a Glance</h2><table data-v-0170c9e9><thead data-v-0170c9e9><tr data-v-0170c9e9><th data-v-0170c9e9>Chart</th><th data-v-0170c9e9>Role</th><th data-v-0170c9e9>Releases installed</th></tr></thead><tbody data-v-0170c9e9><tr data-v-0170c9e9><td data-v-0170c9e9><code data-v-0170c9e9>helm/jeffrey-hub/</code></td><td data-v-0170c9e9>Jeffrey Hub itself. Owns the shared PVC, runs the retention and compression jobs on it, and exposes its web UI on HTTP <code data-v-0170c9e9>8080</code>.</td><td data-v-0170c9e9><code data-v-0170c9e9>jeffrey-hub</code></td></tr><tr data-v-0170c9e9><td data-v-0170c9e9><code data-v-0170c9e9>helm/jeffrey-testapp-server/</code></td><td data-v-0170c9e9>SQLite-backed Spring Boot REST app, profiled by the JIB entrypoint. Toggles between efficient and inefficient PersonService via <code data-v-0170c9e9>mode</code>.</td><td data-v-0170c9e9><code data-v-0170c9e9>direct</code> (<code data-v-0170c9e9>--set mode=direct</code>), <code data-v-0170c9e9>dom</code> (<code data-v-0170c9e9>--set mode=dom</code>)</td></tr><tr data-v-0170c9e9><td data-v-0170c9e9><code data-v-0170c9e9>helm/jeffrey-testapp-client/</code></td><td data-v-0170c9e9>Load generator — drives both server flavours concurrently.</td><td data-v-0170c9e9><code data-v-0170c9e9>jeffrey-testapp-client</code></td></tr></tbody></table><h2 id="chart-structure" data-v-0170c9e9>Chart Structure</h2><p data-v-0170c9e9> Each chart follows the standard Helm v3 layout (<code data-v-0170c9e9>Chart.yaml</code> + <code data-v-0170c9e9>values.yaml</code> + <code data-v-0170c9e9>templates/</code>). The two project-config files unique to this stack are <code data-v-0170c9e9>application.properties</code> (Spring Boot) and <code data-v-0170c9e9>jeffrey-base.conf</code> (HOCON for the provisioner) — both live next to <code data-v-0170c9e9>values.yaml</code> and are pulled into ConfigMaps by the templates via <code data-v-0170c9e9>.Files.Get</code>. </p>',5)),o(r,{language:"text",code:C}),o(l,{type:"info"},{default:n(()=>[...e[0]||(e[0]=[t("strong",null,"One chart per concern.",-1),a(),t("code",null,"jeffrey-hub",-1),a(" owns the cluster-wide objects — the shared PVC, the optional hostPath PV, the Service, the optional Ingress. The two testapp charts deliberately carry no PV/PVC/Ingress — they only bind to ",-1),t("code",null,"jeffrey-hub",-1),a("'s claim and stay cluster-internal. ",-1)])]),_:1}),e[33]||(e[33]=t("h2",{id:"configure-server"},"Configuring Jeffrey Hub",-1)),e[34]||(e[34]=t("p",null,[a(" From "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-hub/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"helm/jeffrey-hub/values.yaml")]),a(": ")],-1)),o(r,{language:"yaml",code:w}),e[35]||(e[35]=t("p",null,[a("One line of "),t("code",null,"application.properties"),a(" points Jeffrey Hub at the shared volume:")],-1)),o(r,{language:"properties",code:"jeffrey.hub.home.dir=\\${JEFFREY_HOME}"}),e[36]||(e[36]=t("p",null,"The Service exposes the hub's web UI — its Storage and Scheduler pages — on a single ClusterIP:",-1)),o(r,{language:"yaml",code:S}),e[37]||(e[37]=t("p",null,[a(" OrbStack publishes in-cluster Service DNS to the host automatically — open "),t("code",null,"http://jeffrey-hub.jeffrey-testapp.svc.cluster.local:8080"),a(" directly from the laptop. For other clusters, expose Jeffrey Hub via the chart's "),t("code",null,"ingress.enabled=true"),a(" (HTTP). ")],-1)),e[38]||(e[38]=t("h2",{id:"configure-app"},"Configuring the Monitored Application",-1)),e[39]||(e[39]=t("p",null,[a(" The testapp's "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-testapp-server/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"values.yaml")]),a(": ")],-1)),o(r,{language:"yaml",code:E}),t("p",null,[e[2]||(e[2]=a(" The Deployment wires ",-1)),e[3]||(e[3]=t("code",null,"JEFFREY_HOME",-1)),e[4]||(e[4]=a(", ",-1)),e[5]||(e[5]=t("code",null,"JEFFREY_BASE_CONFIG",-1)),e[6]||(e[6]=a(", and ",-1)),e[7]||(e[7]=t("code",null,"JEFFREY_ENABLED",-1)),e[8]||(e[8]=a(" into the application container — see the ",-1)),o(s,{to:"/docs/hub/deployment/jeffrey-provisioner"},{default:n(()=>[...e[1]||(e[1]=[a("Jeffrey Provisioner",-1)])]),_:1}),e[9]||(e[9]=a(" page for the full env-var contract: ",-1))]),o(r,{language:"yaml",code:I}),o(l,{type:"tip"},{default:n(()=>[e[11]||(e[11]=t("strong",null,"Changing what the agent records.",-1)),e[12]||(e[12]=a(" Add a ",-1)),e[13]||(e[13]=t("code",null,"JEFFREY_PROFILER_COMMAND",-1)),e[14]||(e[14]=a(" entry to the pod's ",-1)),e[15]||(e[15]=t("code",null,"env:",-1)),e[16]||(e[16]=a(" with options built in ",-1)),o(s,{to:"/docs/microscope/profiler-builder"},{default:n(()=>[...e[10]||(e[10]=[a("Profiler Builder",-1)])]),_:1}),e[17]||(e[17]=a(" (",-1)),e[18]||(e[18]=t("code",null,"start,event=cpu,...",-1)),e[19]||(e[19]=a("); they run on the async-profiler the image bakes in. It takes precedence over any ",-1)),e[20]||(e[20]=t("code",null,"profiler-command",-1)),e[21]||(e[21]=a(" in a mounted configuration file, so no rebuild or ConfigMap change is needed. ",-1))]),_:1}),o(l,{type:"warning"},{default:n(()=>[...e[22]||(e[22]=[t("strong",null,"Spring Boot config-mount gotcha.",-1),a(" Use ",-1),t("code",null,"SPRING_CONFIG_ADDITIONAL_LOCATION",-1),a(", not ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),a(". Additional-location ",-1),t("em",null,"merges",-1),a(" with the image-bundled ",-1),t("code",null,"application.properties",-1),a("; the regular ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),a(),t("em",null,"replaces",-1),a(" it, silently dropping defaults like ",-1),t("code",null,"spring.sql.init.mode=always",-1),a(" that the testapp uses for its bootstrap SQL. ",-1)])]),_:1}),e[40]||(e[40]=t("h2",{id:"side-by-side"},"Side-by-Side: direct vs dom",-1)),e[41]||(e[41]=t("p",null," The headline value of this layout: one chart, two distinct projects on the shared volume, ready for differential analysis in Microscope. ",-1)),o(r,{language:"bash",code:O}),t("p",null,[e[24]||(e[24]=a(" Inside the application container, ",-1)),e[25]||(e[25]=t("code",null,"jeffrey-base.conf",-1)),e[26]||(e[26]=a(" reads ",-1)),e[27]||(e[27]=t("code",null,"JEFFREY_TESTAPP_MODE",-1)),e[28]||(e[28]=a(" via HOCON variable substitution to set the project name and label — see the ",-1)),o(s,{to:"/docs/hub/deployment/jeffrey-provisioner#project-block"},{default:n(()=>[...e[23]||(e[23]=[a("Project Block",-1)])]),_:1}),e[29]||(e[29]=a(" section for the substitution syntax. In Microscope, opening both projects side-by-side gives a one-click differential flame graph between the efficient and inefficient code paths. ",-1))]),e[42]||(e[42]=t("h2",{id:"installing"},"Installing the Stack",-1)),e[43]||(e[43]=t("p",null,[a(" Four "),t("code",null,"helm upgrade --install"),a(" calls — one per release. Order doesn't matter: each application image carries its own provisioner and async-profiler, so a pod that starts before Jeffrey Hub still profiles from the first second. It simply writes its recordings to the shared volume, and the Hub's retention and compression jobs take them over whenever it arrives. ")],-1)),o(r,{language:"bash",code:T}),e[44]||(e[44]=t("p",null,[a(" On dev clusters without an RWX provisioner (OrbStack, minikube, kind), pass two extra flags to "),t("code",null,"jeffrey-hub"),a(" so it binds the PVC to a static hostPath PV instead: ")],-1)),o(r,{language:"bash",code:k}),o(l,{type:"tip"},{default:n(()=>[...e[30]||(e[30]=[a(" Anything you'd put in ",-1),t("code",null,"values.yaml",-1),a(" can also be passed inline with ",-1),t("code",null,"--set key=value",-1),a(" or ",-1),t("code",null,"--values overrides.yaml",-1),a(" — the chart is a vanilla Helm v3 chart with no opinions on how you supply values. ",-1)])]),_:1}),e[45]||(e[45]=t("h2",{id:"tearing-down"},"Tearing Down",-1)),e[46]||(e[46]=t("p",null,[a(" Reverse-order "),t("code",null,"helm uninstall"),a(" — the testapp releases first, then "),t("code",null,"jeffrey-hub"),a(" last (so its PVC outlives the consumers): ")],-1)),o(r,{language:"bash",code:`helm uninstall jeffrey-testapp-client --namespace jeffrey-testapp
helm uninstall dom                    --namespace jeffrey-testapp
helm uninstall direct                 --namespace jeffrey-testapp
helm uninstall jeffrey-hub         --namespace jeffrey-testapp`}),o(l,{type:"warning"},{default:n(()=>[...e[31]||(e[31]=[t("strong",null,[a("Statically-defined hostPath PVs survive "),t("code",null,"helm uninstall"),a(".")],-1),a(" The default ",-1),t("code",null,"reclaimPolicy",-1),a(" for a manually-created PV is ",-1),t("code",null,"Retain",-1),a(", so the directory on the cluster node (e.g. ",-1),t("code",null,"/tmp/jeffrey-data",-1),a(" on OrbStack) keeps the contents Jeffrey Hub wrote into it. The next install would inherit stale recordings and session directories. On dev clusters, wipe the directory yourself before re-installing. On real clusters with a dynamic RWX provisioner, the ",-1),t("code",null,"StorageClass",-1),a(" owns the reclaim policy and the cleanup is automatic. ",-1)])]),_:1})]),o(p)])}}}),G=b(F,[["__scopeId","data-v-0170c9e9"]]);export{G as default};
