import{D as l}from"./DocsPageHeader-BOBWAF2M.js";import{D as i}from"./DocsCodeBlock-QKO_qUBJ.js";import{D as n}from"./DocsCallout-nyzNnnpk.js";import{D as f}from"./DocsNavFooter-DbQBO4fb.js";import{u as p}from"./useDocHeadings-4SzKTyiF.js";import{d as m,k as g,a as v,g as t,b as a,e as d,w as r,j as o,o as u}from"./index-B7d66JPk.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},h={class:"docs-content"},b=`apiVersion: apps/v1
kind: Deployment
metadata:
  name: jeffrey
  namespace: profiling
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jeffrey
  template:
    metadata:
      labels:
        app: jeffrey
    spec:
      volumes:
        - name: config-volume
          configMap:
            name: jeffrey-config
        - name: jeffrey-data
          persistentVolumeClaim:
            claimName: jeffrey-pvc
      containers:
        - name: jeffrey
          image: petrbouda/microscope:latest
          command:
            - /bin/sh
            - '-c'
            - >-
              java -jar /jeffrey-libs/jeffrey-cli.jar
              init --base-config /mnt/config/jeffrey-init.conf &&
              exec java @/tmp/jvm.args -jar /app/microscope.jar
              --spring.config.location=file:/mnt/config/application.properties
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
          env:
            - name: ENV_NAME
              value: "UAT"
          resources:
            limits:
              memory: 2Gi
              cpu: '1'
            requests:
              memory: 2Gi
              cpu: '1'
          volumeMounts:
            - name: config-volume
              mountPath: /mnt/config
            - name: jeffrey-data
              mountPath: /data/jeffrey
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
  strategy:
    type: Recreate`,C=`apiVersion: v1
kind: ConfigMap
metadata:
  name: jeffrey-config
  namespace: profiling
data:
  application.properties: |
    # Jeffrey home directory
    jeffrey.home.dir=/data/jeffrey

    # AI Assistant (Claude)
    jeffrey.ai.provider=claude
    jeffrey.ai.api-key=<token>

  jeffrey-init.conf: |
    # Jeffrey CLI configuration for self-monitoring

    jeffrey-home = "/data/jeffrey"
    profiler-path = "/data/jeffrey/libs/libasyncProfiler.so"
    arg-file = "/tmp/jvm.args"

    project {
        workspace-id = "uat"
        name = "jeffrey-"\${ENV_NAME}
        label = "Jeffrey "\${ENV_NAME}
    }

    perf-counters { enabled = true }
    heap-dump { enabled = true, type = "crash" }

    messaging {
      enabled = true
      max-age = "24h"  # How long to keep messages (e.g., 12h, 1d, 30m)
    }

    jvm-logging {
      enabled = true
      command = "jfr*=trace:file=<<JEFFREY_CURRENT_SESSION>>/jfr-jvm.log::filecount=3,filesize=5m"
    }

    jdk-java-options {
      enabled = true
      additional-options = "-Xmx1200m -Xms1200m -XX:+UseG1GC -XX:+AlwaysPreTouch"
    }

    attributes {
      env = \${?ENV_NAME}
      namespace = "profiling"
    }`,x=`apiVersion: v1
kind: Service
metadata:
  name: jeffrey-service
  namespace: profiling
spec:
  selector:
    app: jeffrey
  ports:
    - name: http
      port: 8080
      targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: jeffrey-ingress
  namespace: profiling
  annotations:
    nginx.ingress.kubernetes.io/proxy-body-size: "200m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "300"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - jeffrey.example.com
      secretName: jeffrey-tls
  rules:
    - host: jeffrey.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: jeffrey-service
                port:
                  number: 8080`,J=m({__name:"LiveRecordingJeffreyDeploymentPage",setup(N){const{setHeadings:s}=p(),c=[{id:"overview",text:"Overview",level:2},{id:"deployment",text:"Deployment",level:2},{id:"configmap",text:"ConfigMap",level:2},{id:"service-ingress",text:"Service & Ingress",level:2}];return g(()=>{s(c)}),(k,e)=>(u(),v("article",j,[t(l,{title:"Jeffrey Deployment",icon:"bi bi-box-seam"}),a("div",h,[e[2]||(e[2]=d('<p data-v-cdda5cde>This guide demonstrates deploying Jeffrey on Kubernetes with <strong data-v-cdda5cde>self-monitoring</strong> - Jeffrey profiles itself using Jeffrey CLI.</p><h2 id="overview" data-v-cdda5cde>Overview</h2><p data-v-cdda5cde>The deployment consists of:</p><ul data-v-cdda5cde><li data-v-cdda5cde><strong data-v-cdda5cde>Deployment</strong> - Jeffrey container with CLI initialization</li><li data-v-cdda5cde><strong data-v-cdda5cde>ConfigMap</strong> - Application properties and CLI configuration</li><li data-v-cdda5cde><strong data-v-cdda5cde>Service &amp; Ingress</strong> - Network exposure</li><li data-v-cdda5cde><strong data-v-cdda5cde>PersistentVolumeClaim</strong> - Storage for recordings and database</li></ul>',4)),t(n,{type:"info"},{default:r(()=>[...e[0]||(e[0]=[a("strong",null,"Self-monitoring:",-1),o(" Jeffrey uses its own CLI to configure profiling of itself. This is useful for monitoring Jeffrey's performance in production and dogfooding the profiling setup. ",-1)])]),_:1}),e[3]||(e[3]=a("h3",null,"How It Works",-1)),e[4]||(e[4]=a("p",null,"The container startup command:",-1)),e[5]||(e[5]=a("ol",null,[a("li",null,[o("Runs "),a("code",null,"jeffrey-cli.jar init"),o(" to generate a JVM @argfile")]),a("li",null,[o("Starts Jeffrey with "),a("code",null,"java @/tmp/jvm.args"),o(" to apply profiling flags")])],-1)),e[6]||(e[6]=a("h2",{id:"deployment"},"Deployment",-1)),t(i,{language:"yaml",code:b}),e[7]||(e[7]=d('<h3 data-v-cdda5cde>Key Points</h3><ul data-v-cdda5cde><li data-v-cdda5cde><strong data-v-cdda5cde>Command</strong> - Runs <code data-v-cdda5cde>jeffrey-cli.jar init</code> to generate @argfile, then starts with <code data-v-cdda5cde>java @/tmp/jvm.args</code></li><li data-v-cdda5cde><strong data-v-cdda5cde>Volume mounts</strong> - ConfigMap for configuration, PVC for persistent data</li><li data-v-cdda5cde><strong data-v-cdda5cde>Environment variables</strong> - <code data-v-cdda5cde>ENV_NAME</code> is used in CLI config via HOCON substitution</li><li data-v-cdda5cde><strong data-v-cdda5cde>Resources</strong> - 2GB memory recommended for Jeffrey with profiling enabled</li></ul><h2 id="configmap" data-v-cdda5cde>ConfigMap</h2><p data-v-cdda5cde>Contains both <code data-v-cdda5cde>application.properties</code> for Jeffrey and <code data-v-cdda5cde>jeffrey-init.conf</code> for the CLI:</p>',4)),t(i,{language:"yaml",code:C}),e[8]||(e[8]=d('<h3 data-v-cdda5cde>CLI Configuration Highlights</h3><ul data-v-cdda5cde><li data-v-cdda5cde><strong data-v-cdda5cde>jdk-java-options</strong> - Enabled so JVM flags are set via <code data-v-cdda5cde>JDK_JAVA_OPTIONS</code></li><li data-v-cdda5cde><strong data-v-cdda5cde>attributes</strong> - Uses <code data-v-cdda5cde>${?VAR}</code> syntax for optional environment variable substitution</li><li data-v-cdda5cde><strong data-v-cdda5cde>heap-dump</strong> - Configured to dump on crash for post-mortem analysis</li><li data-v-cdda5cde><strong data-v-cdda5cde>jvm-logging</strong> - JFR trace logging for debugging profiler issues</li></ul><h2 id="service-ingress" data-v-cdda5cde>Service &amp; Ingress</h2>',3)),t(i,{language:"yaml",code:x}),t(n,{type:"tip"},{default:r(()=>[...e[1]||(e[1]=[a("strong",null,"Large uploads:",-1),o(" The ingress annotations increase proxy timeouts and body size limits. This is important for uploading large JFR files to Jeffrey. ",-1)])]),_:1})]),t(f)]))}}),M=y(J,[["__scopeId","data-v-cdda5cde"]]);export{M as default};
