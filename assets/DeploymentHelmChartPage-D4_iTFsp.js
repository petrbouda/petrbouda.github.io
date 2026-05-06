import{D as n}from"./DocsCallout-CC-EoGXj.js";import{D as o}from"./DocsCodeBlock-D5bNQBBg.js";import{D as f}from"./DocsNavFooter-DL6Y37yi.js";import{D as u}from"./DocsPageHeader-DcOLsRPq.js";import{u as c}from"./useDocHeadings-DEekL5i7.js";import{d as m,k as h,a as v,g as r,b as t,e as i,w as s,j as a,h as y,o as b}from"./index-BVX3s_ut.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},C={class:"docs-content"},P=`helm/
├── jeffrey-server/
│   ├── Chart.yaml
│   ├── values.yaml                   # image tag, sharedVolume, ports, ingress, probes
│   ├── application.properties        # Spring Boot config (copy-libs, home.dir)
│   ├── jeffrey-base.conf             # CLI init config for self-profiling
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml              # HTTP 8080 + gRPC 9090
│       ├── ingress.yaml              # optional HTTP / gRPC ingress
│       ├── persistent-volume-claim.yaml
│       ├── persistent-volume.yaml    # hostPath PV (orbstack/minikube)
│       ├── configmap.yaml            # mounts application.properties + jeffrey-base.conf
│       ├── serviceaccount.yaml
│       └── _helpers.tpl
│
├── jeffrey-testapp-server/
│   ├── Chart.yaml
│   ├── values.yaml                   # mode toggle, sharedVolume, jeffrey env, probes
│   ├── jeffrey-base.conf             # CLI init config for the monitored service
│   └── templates/
│       ├── deployment.yaml           # JIB image + wait-for-jeffrey-server init container
│       ├── service.yaml              # HTTP 8080
│       ├── configmap.yaml            # application.properties
│       ├── jeffrey-base-configmap.yaml
│       ├── serviceaccount.yaml
│       └── _helpers.tpl
│
└── jeffrey-testapp-client/
    ├── Chart.yaml
    ├── values.yaml                   # load config, sharedVolume, jeffrey env, TCP probes
    ├── jeffrey-base.conf             # CLI init config for the load generator
    └── templates/                    # same shape as testapp-server (no DB mount)
        ├── deployment.yaml
        ├── service.yaml
        ├── configmap.yaml
        ├── jeffrey-base-configmap.yaml
        ├── serviceaccount.yaml
        └── _helpers.tpl`,S=`image:
  repository: petrbouda/jeffrey-server
  # Pin to a specific upstream build. Bump when a newer 0.7.x is pushed
  # (https://hub.docker.com/r/petrbouda/jeffrey-server/tags).
  tag: 0.7.1-b68
  pullPolicy: IfNotPresent

containerPort: 8080
grpcPort: 9090

selfProfile:
  enabled: true   # jeffrey-server self-profiles via the JIB entrypoint`,E=`apiVersion: v1
kind: Service
metadata:
  name: {{ include "jeffrey-server.fullname" . }}
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: http
      name: http
    - port: 9090
      targetPort: grpc
      name: grpc
  selector:
    {{- include "jeffrey-server.selectorLabels" . | nindent 4 }}`,w=`# Service-mode toggle: "direct" (efficient.mode=true) or "dom" (efficient.mode=false).
mode: dom

applicationProperties: |-
  server.port=8080
  database.file=/var/lib/jeffrey/testapp.db
  database.cleanup-on-shutdown=false
  management.endpoints.web.exposure.include=health
  management.endpoint.health.probes.enabled=true

# Must match jeffrey-server's sharedVolume block exactly.
sharedVolume:
  claimName: jeffrey-pvc
  mountPath: /mnt/jeffrey

jeffrey:
  baseConfigPath: /jeffrey/jeffrey-base.conf
  enabled: true
  serverHost: jeffrey-server:8080`,I=`env:
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
    value: {{ .Values.mode | quote }}`,T=`# Block the main container until jeffrey-server reports ready via its actuator
# readiness endpoint. By the time the readiness probe passes, jeffrey-server's
# copy-libs has published the CLI bundle to the shared volume, so the JIB
# entrypoint finds jeffrey-cli + agent + libasyncProfiler on first start
# instead of fail-opening (no profiling) for the first minute or two.
initContainers:
  - name: wait-for-jeffrey-server
    image: busybox:1.37
    command:
      - sh
      - -c
      - |
        until wget -q --spider "http://\${JEFFREY_SERVER_HOST}/actuator/health/readiness"; do
          echo "waiting for http://\${JEFFREY_SERVER_HOST}/actuator/health/readiness ..."
          sleep 2
        done
        echo "jeffrey-server is ready, starting application."
    env:
      - name: JEFFREY_SERVER_HOST
        value: {{ .Values.jeffrey.serverHost | quote }}
    # requests == limits keeps the pod in QoS class Guaranteed.
    resources:
      limits:   { cpu: 50m, memory: 32Mi }
      requests: { cpu: 50m, memory: 32Mi }`,O=`# Two flavours from one chart — same image, different values.mode:
helm upgrade --install direct helm/jeffrey-testapp-server --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server --set mode=dom

# In Jeffrey Server, the two projects appear as:
#   direct-jeffrey-testapp-server   (efficient PersonService)
#   dom-jeffrey-testapp-server      (inefficient PersonService)`,k=`# 1) Jeffrey Server — creates the shared PVC and runs copy-libs.
helm upgrade --install jeffrey-server helm/jeffrey-server \\
  --namespace jeffrey-testapp --create-namespace

# 2) Two flavours of the testapp service from the same chart.
helm upgrade --install direct helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=direct
helm upgrade --install dom    helm/jeffrey-testapp-server \\
  --namespace jeffrey-testapp --set mode=dom

# 3) Load generator that drives both servers.
helm upgrade --install jeffrey-testapp-client helm/jeffrey-testapp-client \\
  --namespace jeffrey-testapp`,R=`# When the cluster has no RWX provisioner (orbstack/minikube/kind), tell the
# jeffrey-server chart to bind to a static hostPath PV instead of a dynamic one:
helm upgrade --install jeffrey-server helm/jeffrey-server \\
  --namespace jeffrey-testapp --create-namespace \\
  --set sharedVolume.storageClassName="" \\
  --set sharedVolume.hostPath.create=true`,F=m({__name:"DeploymentHelmChartPage",setup(V){const{setHeadings:d}=c(),p=[{id:"three-charts",text:"Three Charts at a Glance",level:2},{id:"chart-structure",text:"Chart Structure",level:2},{id:"configure-server",text:"Configuring Jeffrey Server",level:2},{id:"configure-app",text:"Configuring the Monitored Application",level:2},{id:"init-container",text:"Init Container Ordering",level:2},{id:"side-by-side",text:"Side-by-Side: direct vs dom",level:2},{id:"installing",text:"Installing the Stack",level:2},{id:"tearing-down",text:"Tearing Down",level:2}];return h(()=>{d(p)}),(N,e)=>{const l=y("router-link");return b(),v("article",j,[r(u,{title:"Helm Chart",icon:"bi bi-file-earmark-code"}),t("div",C,[e[20]||(e[20]=i('<p data-v-8317b331> The full Kubernetes example for the <a href="https://github.com/petrbouda/jeffrey-testapp" target="_blank" rel="noopener" data-v-8317b331>jeffrey-testapp</a> repo. Three charts under <code data-v-8317b331>helm/</code> coordinate a Jeffrey Server, two flavours of the testapp service, and one load-generating client — all in a single namespace, all sharing one PVC. Every snippet on this page is taken verbatim from the repo with minor formatting trims; follow the file links for the un-edited source. </p><h2 id="three-charts" data-v-8317b331>Three Charts at a Glance</h2><table data-v-8317b331><thead data-v-8317b331><tr data-v-8317b331><th data-v-8317b331>Chart</th><th data-v-8317b331>Role</th><th data-v-8317b331>Releases installed</th></tr></thead><tbody data-v-8317b331><tr data-v-8317b331><td data-v-8317b331><code data-v-8317b331>helm/jeffrey-server/</code></td><td data-v-8317b331>Jeffrey Server itself. Owns the shared PVC, runs <code data-v-8317b331>copy-libs</code>, exposes HTTP <code data-v-8317b331>8080</code> + gRPC <code data-v-8317b331>9090</code>.</td><td data-v-8317b331><code data-v-8317b331>jeffrey-server</code></td></tr><tr data-v-8317b331><td data-v-8317b331><code data-v-8317b331>helm/jeffrey-testapp-server/</code></td><td data-v-8317b331>SQLite-backed Spring Boot REST app, profiled by the JIB entrypoint. Toggles between efficient and inefficient PersonService via <code data-v-8317b331>mode</code>.</td><td data-v-8317b331><code data-v-8317b331>direct</code> (<code data-v-8317b331>--set mode=direct</code>), <code data-v-8317b331>dom</code> (<code data-v-8317b331>--set mode=dom</code>)</td></tr><tr data-v-8317b331><td data-v-8317b331><code data-v-8317b331>helm/jeffrey-testapp-client/</code></td><td data-v-8317b331>Load generator — drives both server flavours concurrently.</td><td data-v-8317b331><code data-v-8317b331>jeffrey-testapp-client</code></td></tr></tbody></table><h2 id="chart-structure" data-v-8317b331>Chart Structure</h2><p data-v-8317b331> Each chart follows the standard Helm v3 layout (<code data-v-8317b331>Chart.yaml</code> + <code data-v-8317b331>values.yaml</code> + <code data-v-8317b331>templates/</code>). The two project-config files unique to this stack are <code data-v-8317b331>application.properties</code> (Spring Boot) and <code data-v-8317b331>jeffrey-base.conf</code> (HOCON for the CLI) — both live next to <code data-v-8317b331>values.yaml</code> and are pulled into ConfigMaps by the templates via <code data-v-8317b331>.Files.Get</code>. </p>',5)),r(o,{language:"text",code:P}),r(n,{type:"info"},{default:s(()=>[...e[0]||(e[0]=[t("strong",null,"One chart per concern.",-1),a(),t("code",null,"jeffrey-server",-1),a(" owns the cluster-wide objects — the shared PVC, the optional hostPath PV, the Service that both protocols share, the optional Ingress. The two testapp charts deliberately carry no PV/PVC/Ingress — they only bind to ",-1),t("code",null,"jeffrey-server",-1),a("'s claim and stay cluster-internal. ",-1)])]),_:1}),e[21]||(e[21]=t("h2",{id:"configure-server"},"Configuring Jeffrey Server",-1)),e[22]||(e[22]=t("p",null,[a(" From "),t("a",{href:"https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-server/values.yaml",target:"_blank",rel:"noopener"},[t("code",null,"helm/jeffrey-server/values.yaml")]),a(": ")],-1)),r(o,{language:"yaml",code:S}),e[23]||(e[23]=t("p",null,[a("Three lines of "),t("code",null,"application.properties"),a(" activate "),t("code",null,"copy-libs"),a(":")],-1)),r(o,{language:"properties",code:`jeffrey.server.copy-libs.enabled=true
jeffrey.server.home.dir=\\\${JEFFREY_HOME}
spring.profiles.include=trace-file-log`}),e[24]||(e[24]=t("p",null,"The Service exposes both protocols on a single ClusterIP:",-1)),r(o,{language:"yaml",code:E}),e[25]||(e[25]=i('<p data-v-8317b331> OrbStack publishes in-cluster Service DNS to the host automatically — open <code data-v-8317b331>http://jeffrey-server.jeffrey-testapp.svc.cluster.local:8080</code> directly from the laptop. For other clusters, expose Jeffrey Server via the chart&#39;s <code data-v-8317b331>ingress.enabled=true</code> (HTTP) and <code data-v-8317b331>grpcIngress.enabled=true</code> (gRPC, requires <code data-v-8317b331>backend-protocol: GRPC</code> Nginx annotation). </p><h2 id="configure-app" data-v-8317b331>Configuring the Monitored Application</h2><p data-v-8317b331> The testapp&#39;s <a href="https://github.com/petrbouda/jeffrey-testapp/blob/main/helm/jeffrey-testapp-server/values.yaml" target="_blank" rel="noopener" data-v-8317b331><code data-v-8317b331>values.yaml</code></a>: </p>',3)),r(o,{language:"yaml",code:w}),t("p",null,[e[2]||(e[2]=a(" The Deployment wires ",-1)),e[3]||(e[3]=t("code",null,"JEFFREY_HOME",-1)),e[4]||(e[4]=a(", ",-1)),e[5]||(e[5]=t("code",null,"JEFFREY_BASE_CONFIG",-1)),e[6]||(e[6]=a(", and ",-1)),e[7]||(e[7]=t("code",null,"JEFFREY_ENABLED",-1)),e[8]||(e[8]=a(" into the application container — see the ",-1)),r(l,{to:"/docs/server/deployment/jeffrey-cli"},{default:s(()=>[...e[1]||(e[1]=[a("Jeffrey CLI",-1)])]),_:1}),e[9]||(e[9]=a(" page for the full env-var contract: ",-1))]),r(o,{language:"yaml",code:I}),r(n,{type:"warning"},{default:s(()=>[...e[10]||(e[10]=[t("strong",null,"Spring Boot config-mount gotcha.",-1),a(" Use ",-1),t("code",null,"SPRING_CONFIG_ADDITIONAL_LOCATION",-1),a(", not ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),a(". Additional-location ",-1),t("em",null,"merges",-1),a(" with the image-bundled ",-1),t("code",null,"application.properties",-1),a("; the regular ",-1),t("code",null,"SPRING_CONFIG_LOCATION",-1),a(),t("em",null,"replaces",-1),a(" it, silently dropping defaults like ",-1),t("code",null,"spring.sql.init.mode=always",-1),a(" that the testapp uses for its bootstrap SQL. ",-1)])]),_:1}),e[26]||(e[26]=t("h2",{id:"init-container"},"Init Container Ordering",-1)),e[27]||(e[27]=t("p",null,[a(" Because the application image relies on the shared volume, every monitored pod carries a tiny init container that blocks startup until Jeffrey Server is ready and "),t("code",null,"copy-libs"),a(" has populated the volume: ")],-1)),r(o,{language:"yaml",code:T}),e[28]||(e[28]=t("p",null,[a(" Without this gate, the JIB entrypoint runs "),t("code",null,"jeffrey-cli init"),a(" against a half-populated "),t("code",null,"libs/current/"),a(" the first time the pod schedules, fail-opens to plain "),t("code",null,"java"),a(" (no profiling), and stays that way until you restart the pod manually. ")],-1)),e[29]||(e[29]=t("h2",{id:"side-by-side"},"Side-by-Side: direct vs dom",-1)),e[30]||(e[30]=t("p",null," The headline value of this layout: one chart, two distinct projects in Jeffrey Server, ready for differential analysis in Microscope. ",-1)),r(o,{language:"bash",code:O}),t("p",null,[e[12]||(e[12]=a(" Inside the application container, ",-1)),e[13]||(e[13]=t("code",null,"jeffrey-base.conf",-1)),e[14]||(e[14]=a(" reads ",-1)),e[15]||(e[15]=t("code",null,"JEFFREY_TESTAPP_MODE",-1)),e[16]||(e[16]=a(" via HOCON variable substitution to set the project name and label — see the ",-1)),r(l,{to:"/docs/server/deployment/jeffrey-cli#project-block"},{default:s(()=>[...e[11]||(e[11]=[a("Project Block",-1)])]),_:1}),e[17]||(e[17]=a(" section for the substitution syntax. In Microscope, opening both projects side-by-side gives a one-click differential flame graph between the efficient and inefficient code paths. ",-1))]),e[31]||(e[31]=t("h2",{id:"installing"},"Installing the Stack",-1)),e[32]||(e[32]=t("p",null,[a(" Four "),t("code",null,"helm upgrade --install"),a(" calls — one per release. Order doesn't matter; the testapp pods carry an init container that polls Jeffrey Server's "),t("code",null,"/actuator/health/readiness"),a(" so nothing starts until "),t("code",null,"copy-libs"),a(" has populated the shared volume. ")],-1)),r(o,{language:"bash",code:k}),e[33]||(e[33]=t("p",null,[a(" On dev clusters without an RWX provisioner (OrbStack, minikube, kind), pass two extra flags to "),t("code",null,"jeffrey-server"),a(" so it binds the PVC to a static hostPath PV instead: ")],-1)),r(o,{language:"bash",code:R}),r(n,{type:"tip"},{default:s(()=>[...e[18]||(e[18]=[a(" Anything you'd put in ",-1),t("code",null,"values.yaml",-1),a(" can also be passed inline with ",-1),t("code",null,"--set key=value",-1),a(" or ",-1),t("code",null,"--values overrides.yaml",-1),a(" — the chart is a vanilla Helm v3 chart with no opinions on how you supply values. ",-1)])]),_:1}),e[34]||(e[34]=t("h2",{id:"tearing-down"},"Tearing Down",-1)),e[35]||(e[35]=t("p",null,[a(" Reverse-order "),t("code",null,"helm uninstall"),a(" — the testapp releases first, then "),t("code",null,"jeffrey-server"),a(" last (so its PVC outlives the consumers): ")],-1)),r(o,{language:"bash",code:`helm uninstall jeffrey-testapp-client --namespace jeffrey-testapp
helm uninstall dom                    --namespace jeffrey-testapp
helm uninstall direct                 --namespace jeffrey-testapp
helm uninstall jeffrey-server         --namespace jeffrey-testapp`}),r(n,{type:"warning"},{default:s(()=>[...e[19]||(e[19]=[t("strong",null,[a("Statically-defined hostPath PVs survive "),t("code",null,"helm uninstall"),a(".")],-1),a(" The default ",-1),t("code",null,"reclaimPolicy",-1),a(" for a manually-created PV is ",-1),t("code",null,"Retain",-1),a(", so the directory on the cluster node (e.g. ",-1),t("code",null,"/tmp/jeffrey-data",-1),a(" on OrbStack) keeps the contents Jeffrey Server wrote into it. The next install would inherit a stale CLI bundle. On dev clusters, wipe the directory yourself before re-installing. On real clusters with a dynamic RWX provisioner, the ",-1),t("code",null,"StorageClass",-1),a(" owns the reclaim policy and the cleanup is automatic. ",-1)])]),_:1})]),r(f)])}}}),G=g(F,[["__scopeId","data-v-8317b331"]]);export{G as default};
