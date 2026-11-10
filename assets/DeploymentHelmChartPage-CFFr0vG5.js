import{D as a}from"./DocsCallout-CluHdmEL.js";import{D as r}from"./DocsCodeBlock-Cz4VeQcw.js";import{D as p}from"./DocsNavFooter-HvW-W6qn.js";import{D as u}from"./DocsPageHeader-BSuLJIAB.js";import{u as f}from"./useDocHeadings-DgIc5lbI.js";import{d as m,o as y,c as h,f as l,b as t,e as o,w as n,g,k as b,l as v}from"./index-CYj-_IBV.js";import{_ as c}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},P={class:"docs-content"},C=`helm/
├── jeffrey-hub/
│   ├── Chart.yaml
│   ├── values.yaml                   # image tag, sharedVolume, ports, ingress, probes
│   ├── application.properties        # Spring Boot config (home.dir)
│   ├── jeffrey-base.conf             # provisioner init config for self-profiling
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml              # HTTP 8080 (REST API)
│       ├── ingress.yaml              # optional HTTP access to the API
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
  enabled: true   # jeffrey-hub self-profiles via the JIB entrypoint`,E=`apiVersion: v1
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
    {{- include "jeffrey-hub.selectorLabels" . | nindent 4 }}`,I=`# Service-mode toggle: "direct" (efficient.mode=true) or "dom" (efficient.mode=false).
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
  hubHost: jeffrey-hub:8080`,S=`env:
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
    value: {{ .Values.mode | quote }}`,T=`# Two flavours from one chart — same image, different values.mode:
helm upgrade --install direct helm/jeffrey-testapp-server --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server --set mode=dom

# In Jeffrey Hub, the two projects appear as:
#   direct-jeffrey-testapp-server   (efficient PersonService)
#   dom-jeffrey-testapp-server      (inefficient PersonService)`,k=`# 1) Jeffrey Hub — creates the shared PVC the recordings land in.
helm upgrade --install jeffrey-hub helm/jeffrey-hub \\
  --namespace jeffrey-testapp --create-namespace

# 2) Two flavours of the testapp service from the same chart.
helm upgrade --install direct helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=dom

# 3) Load generator that drives both servers.
helm upgrade --install jeffrey-testapp-client helm/jeffrey-testapp-client \\
  --namespace jeffrey-testapp`,O=`# When the cluster has no RWX provisioner (orbstack/minikube/kind), tell the
# jeffrey-hub chart to bind to a static hostPath PV instead of a dynamic one:
helm upgrade --install jeffrey-hub helm/jeffrey-hub \\
  --namespace jeffrey-testapp --create-namespace \\
  --set sharedVolume.storageClassName="" \\
  --set sharedVolume.hostPath.create=true`,F=m({__name:"DeploymentHelmChartPage",setup(N){const{setHeadings:i}=f(),d=[{id:"three-charts",text:"Three Charts at a Glance",level:2},{id:"chart-structure",text:"Chart Structure",level:2},{id:"configure-server",text:"Configuring Jeffrey Hub",level:2},{id:"configure-app",text:"Configuring the Monitored Application",level:2},{id:"side-by-side",text:"Side-by-Side: direct vs dom",level:2},{id:"installing",text:"Installing the Stack",level:2},{id:"tearing-down",text:"Tearing Down",level:2}];return y(()=>{i(d)}),(V,e)=>{const s=b("router-link");return v(),h("article",j,[l(u,{title:"Helm Chart",icon:"bi bi-file-earmark-code"}),t("div",P,[e[47]||(e[47]=t("p",null,[o(" The full Kubernetes example for the "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp",target:"_blank",rel:"noopener"},"jeffrey-testapp"),o(" repo. Three charts under "),t("code",null,"helm/"),o(" coordinate a Jeffrey Hub, two flavours of the testapp service, and one load-generating client — all in a single namespace, all sharing one PVC. Every snippet on this page is taken verbatim from the repo with minor formatting trims; follow the file links for the un-edited source. ")],-1)),e[48]||(e[48]=t("h2",{id:"three-charts"},"Three Charts at a Glance",-1)),t("table",null,[e[9]||(e[9]=t("thead",null,[t("tr",null,[t("th",null,"Chart"),t("th",null,"Role"),t("th",null,"Releases installed")])],-1)),t("tbody",null,[t("tr",null,[e[5]||(e[5]=t("td",null,[t("code",null,"helm/jeffrey-hub/")],-1)),t("td",null,[e[1]||(e[1]=o("Jeffrey Hub itself. Owns the shared PVC, runs the retention and compression jobs on it, and serves its ",-1)),l(s,{to:"/docs/hub/api"},{default:n(()=>[...e[0]||(e[0]=[o("REST API",-1)])]),_:1}),e[2]||(e[2]=o(" on HTTP ",-1)),e[3]||(e[3]=t("code",null,"8080",-1)),e[4]||(e[4]=o(".",-1))]),e[6]||(e[6]=t("td",null,[t("code",null,"jeffrey-hub")],-1))]),e[7]||(e[7]=t("tr",null,[t("td",null,[t("code",null,"helm/jeffrey-testapp-server/")]),t("td",null,[o("SQLite-backed Spring Boot REST app, profiled by the JIB entrypoint. Toggles between efficient and inefficient PersonService via "),t("code",null,"mode"),o(".")]),t("td",null,[t("code",null,"direct"),o(" ("),t("code",null,"--set mode=direct"),o("), "),t("code",null,"dom"),o(" ("),t("code",null,"--set mode=dom"),o(")")])],-1)),e[8]||(e[8]=t("tr",null,[t("td",null,[t("code",null,"helm/jeffrey-testapp-client/")]),t("td",null,"Load generator — drives both server flavours concurrently."),t("td",null,[t("code",null,"jeffrey-testapp-client")])],-1))])]),e[49]||(e[49]=g('<h2 id="chart-structure" data-v-dfd5f113>Chart Structure</h2><p data-v-dfd5f113> Each chart follows the standard Helm v3 layout (<code data-v-dfd5f113>Chart.yaml</code> + <code data-v-dfd5f113>values.yaml</code> + <code data-v-dfd5f113>templates/</code>). The two project-config files unique to this stack are <code data-v-dfd5f113>application.properties</code> (Spring Boot) and <code data-v-dfd5f113>jeffrey-base.conf</code> (HOCON for the provisioner) — both live next to <code data-v-dfd5f113>values.yaml</code> and are pulled into ConfigMaps by the templates via <code data-v-dfd5f113>.Files.Get</code>. </p>',2)),l(r,{language:"text",code:C}),l(a,{type:"info"},{default:n(()=>[...e[10]||(e[10]=[t("strong",null,"One chart per concern.",-1),o(),t("code",null,"jeffrey-hub",-1),o(" owns the cluster-wide objects — the shared PVC, the optional hostPath PV, the Service, the optional Ingress. The two testapp charts deliberately carry no PV/PVC/Ingress — they only bind to ",-1),t("code",null,"jeffrey-hub",-1),o("'s claim and stay cluster-internal. ",-1)])]),_:1}),e[50]||(e[50]=t("h2",{id:"configure-server"},"Configuring Jeffrey Hub",-1)),e[51]||(e[51]=t("p",null,[o(" From "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-hub/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"helm/jeffrey-hub/values.yaml")]),o(": ")],-1)),l(r,{language:"yaml",code:w}),e[52]||(e[52]=t("p",null,[o("One line of "),t("code",null,"application.properties"),o(" points Jeffrey Hub at the shared volume:")],-1)),l(r,{language:"properties",code:"jeffrey.hub.home.dir=\\${JEFFREY_HOME}"}),t("p",null,[e[12]||(e[12]=o("The Service exposes the hub's ",-1)),l(s,{to:"/docs/hub/api"},{default:n(()=>[...e[11]||(e[11]=[o("REST API",-1)])]),_:1}),e[13]||(e[13]=o(" (",-1)),e[14]||(e[14]=t("code",null,"/api/v1",-1)),e[15]||(e[15]=o(") and its health probes on a single ClusterIP:",-1))]),l(r,{language:"yaml",code:E}),e[53]||(e[53]=t("p",null,[o(" OrbStack publishes in-cluster Service DNS to the host automatically — call "),t("code",null,"http://jeffrey-hub.jeffrey-testapp.svc.cluster.local:8080/api/v1/storage"),o(" directly from the laptop. For other clusters, the chart's optional "),t("code",null,"ingress.enabled=true"),o(" gives HTTP access to the API from outside — or use "),t("code",null,"kubectl port-forward"),o(". The API has no authentication and its run endpoint deletes data, so keep it inside the cluster unless the Ingress is protected. ")],-1)),e[54]||(e[54]=t("h2",{id:"configure-app"},"Configuring the Monitored Application",-1)),e[55]||(e[55]=t("p",null,[o(" The testapp's "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-testapp-server/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"values.yaml")]),o(": ")],-1)),l(r,{language:"yaml",code:I}),t("p",null,[e[17]||(e[17]=o(" The Deployment wires ",-1)),e[18]||(e[18]=t("code",null,"JEFFREY_HOME",-1)),e[19]||(e[19]=o(", ",-1)),e[20]||(e[20]=t("code",null,"JEFFREY_BASE_CONFIG",-1)),e[21]||(e[21]=o(", and ",-1)),e[22]||(e[22]=t("code",null,"JEFFREY_ENABLED",-1)),e[23]||(e[23]=o(" into the application container — see the ",-1)),l(s,{to:"/docs/hub/deployment/jeffrey-provisioner"},{default:n(()=>[...e[16]||(e[16]=[o("Jeffrey Provisioner",-1)])]),_:1}),e[24]||(e[24]=o(" page for the full env-var contract: ",-1))]),l(r,{language:"yaml",code:S}),l(a,{type:"tip"},{default:n(()=>[e[26]||(e[26]=t("strong",null,"Changing what the agent records.",-1)),e[27]||(e[27]=o(" Add a ",-1)),e[28]||(e[28]=t("code",null,"JEFFREY_PROFILER_COMMAND",-1)),e[29]||(e[29]=o(" entry to the pod's ",-1)),e[30]||(e[30]=t("code",null,"env:",-1)),e[31]||(e[31]=o(" with options built in ",-1)),l(s,{to:"/docs/microscope/profiler-builder"},{default:n(()=>[...e[25]||(e[25]=[o("Profiler Builder",-1)])]),_:1}),e[32]||(e[32]=o(" (",-1)),e[33]||(e[33]=t("code",null,"start,event=cpu,...",-1)),e[34]||(e[34]=o("); they run on the async-profiler the image bakes in. It takes precedence over any ",-1)),e[35]||(e[35]=t("code",null,"profiler-command",-1)),e[36]||(e[36]=o(" in a mounted configuration file, so no rebuild or ConfigMap change is needed. ",-1))]),_:1}),l(a,{type:"warning"},{default:n(()=>[...e[37]||(e[37]=[t("strong",null,"Spring Boot config-mount gotcha.",-1),o(" Use ",-1),t("code",null,"SPRING_CONFIG_ADDITIONAL_LOCATION",-1),o(", not ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),o(". Additional-location ",-1),t("em",null,"merges",-1),o(" with the image-bundled ",-1),t("code",null,"application.properties",-1),o("; the regular ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),o(),t("em",null,"replaces",-1),o(" it, silently dropping defaults like ",-1),t("code",null,"spring.sql.init.mode=always",-1),o(" that the testapp uses for its bootstrap SQL. ",-1)])]),_:1}),e[56]||(e[56]=t("h2",{id:"side-by-side"},"Side-by-Side: direct vs dom",-1)),e[57]||(e[57]=t("p",null," The headline value of this layout: one chart, two distinct projects on the shared volume, ready for differential analysis in Microscope. ",-1)),l(r,{language:"bash",code:T}),t("p",null,[e[39]||(e[39]=o(" Inside the application container, ",-1)),e[40]||(e[40]=t("code",null,"jeffrey-base.conf",-1)),e[41]||(e[41]=o(" reads ",-1)),e[42]||(e[42]=t("code",null,"JEFFREY_TESTAPP_MODE",-1)),e[43]||(e[43]=o(" via HOCON variable substitution to set the project name and label — see the ",-1)),l(s,{to:"/docs/hub/deployment/jeffrey-provisioner#project-block"},{default:n(()=>[...e[38]||(e[38]=[o("Project Block",-1)])]),_:1}),e[44]||(e[44]=o(" section for the substitution syntax. In Microscope, opening both projects side-by-side gives a one-click differential flame graph between the efficient and inefficient code paths. ",-1))]),e[58]||(e[58]=t("h2",{id:"installing"},"Installing the Stack",-1)),e[59]||(e[59]=t("p",null,[o(" Four "),t("code",null,"helm upgrade --install"),o(" calls — one per release. Order doesn't matter: each application image carries its own provisioner and async-profiler, so a pod that starts before Jeffrey Hub still profiles from the first second. It simply writes its recordings to the shared volume, and the Hub's retention and compression jobs take them over whenever it arrives. ")],-1)),l(r,{language:"bash",code:k}),e[60]||(e[60]=t("p",null,[o(" On dev clusters without an RWX provisioner (OrbStack, minikube, kind), pass two extra flags to "),t("code",null,"jeffrey-hub"),o(" so it binds the PVC to a static hostPath PV instead: ")],-1)),l(r,{language:"bash",code:O}),l(a,{type:"tip"},{default:n(()=>[...e[45]||(e[45]=[o(" Anything you'd put in ",-1),t("code",null,"values.yaml",-1),o(" can also be passed inline with ",-1),t("code",null,"--set key=value",-1),o(" or ",-1),t("code",null,"--values overrides.yaml",-1),o(" — the chart is a vanilla Helm v3 chart with no opinions on how you supply values. ",-1)])]),_:1}),e[61]||(e[61]=t("h2",{id:"tearing-down"},"Tearing Down",-1)),e[62]||(e[62]=t("p",null,[o(" Reverse-order "),t("code",null,"helm uninstall"),o(" — the testapp releases first, then "),t("code",null,"jeffrey-hub"),o(" last (so its PVC outlives the consumers): ")],-1)),l(r,{language:"bash",code:`helm uninstall jeffrey-testapp-client --namespace jeffrey-testapp
helm uninstall dom                    --namespace jeffrey-testapp
helm uninstall direct                 --namespace jeffrey-testapp
helm uninstall jeffrey-hub         --namespace jeffrey-testapp`}),l(a,{type:"warning"},{default:n(()=>[...e[46]||(e[46]=[t("strong",null,[o("Statically-defined hostPath PVs survive "),t("code",null,"helm uninstall"),o(".")],-1),o(" The default ",-1),t("code",null,"reclaimPolicy",-1),o(" for a manually-created PV is ",-1),t("code",null,"Retain",-1),o(", so the directory on the cluster node (e.g. ",-1),t("code",null,"/tmp/jeffrey-data",-1),o(" on OrbStack) keeps the contents Jeffrey Hub wrote into it. The next install would inherit stale recordings and session directories. On dev clusters, wipe the directory yourself before re-installing. On real clusters with a dynamic RWX provisioner, the ",-1),t("code",null,"StorageClass",-1),o(" owns the reclaim policy and the cleanup is automatic. ",-1)])]),_:1})]),l(p)])}}}),G=c(F,[["__scopeId","data-v-dfd5f113"]]);export{G as default};
