import{D as f,a as p}from"./DocsPageHeader-64RWP-14.js";import{D as o}from"./DocsCodeBlock-C0C8biN2.js";import{D as n}from"./DocsCallout-BQR4CNYn.js";import{u as m}from"./useDocHeadings-gQYepUus.js";import{d as c,i as g,c as v,b as a,a as i,k as t,w as r,m as s,o as u}from"./index-D3jXmUN6.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},j={class:"docs-content"},b=`apiVersion: apps/v1
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
          image: petrbouda/jeffrey:latest
          command:
            - /bin/bash
            - '-c'
            - >-
              eval "$(java -jar /jeffrey-libs/jeffrey-cli.jar
              init /mnt/config/jeffrey-init.conf)" &&
              exec java -jar /app/jeffrey.jar
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

    # AI Assistant (Anthropic Claude)
    jeffrey.ai.enabled=true
    jeffrey.ai.provider=anthropic
    spring.ai.anthropic.api-key=<token>

  jeffrey-init.conf: |
    # Jeffrey CLI configuration for self-monitoring

    jeffrey-home = "/data/jeffrey"
    profiler-path = "/data/jeffrey/libs/libasyncProfiler.so"

    workspace-id = "uat"
    project-name = "jeffrey-"\${ENV_NAME}
    project-label = "Jeffrey "\${ENV_NAME}

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
                  number: 8080`,J=c({__name:"LiveRecordingJeffreyDeploymentPage",setup(N){const{setHeadings:d}=m(),l=[{id:"overview",text:"Overview",level:2},{id:"deployment",text:"Deployment",level:2},{id:"configmap",text:"ConfigMap",level:2},{id:"service-ingress",text:"Service & Ingress",level:2}];return g(()=>{d(l)}),(k,e)=>(u(),v("article",h,[a(f,{title:"Jeffrey Deployment",icon:"bi bi-box-seam"}),i("div",j,[e[2]||(e[2]=t('<p data-v-63358d07>This guide demonstrates deploying Jeffrey on Kubernetes with <strong data-v-63358d07>self-monitoring</strong> - Jeffrey profiles itself using Jeffrey CLI.</p><h2 id="overview" data-v-63358d07>Overview</h2><p data-v-63358d07>The deployment consists of:</p><ul data-v-63358d07><li data-v-63358d07><strong data-v-63358d07>Deployment</strong> - Jeffrey container with CLI initialization</li><li data-v-63358d07><strong data-v-63358d07>ConfigMap</strong> - Application properties and CLI configuration</li><li data-v-63358d07><strong data-v-63358d07>Service &amp; Ingress</strong> - Network exposure</li><li data-v-63358d07><strong data-v-63358d07>PersistentVolumeClaim</strong> - Storage for recordings and database</li></ul>',4)),a(n,{type:"info"},{default:r(()=>[...e[0]||(e[0]=[i("strong",null,"Self-monitoring:",-1),s(" Jeffrey uses its own CLI to configure profiling of itself. This is useful for monitoring Jeffrey's performance in production and dogfooding the profiling setup. ",-1)])]),_:1}),e[3]||(e[3]=t('<h3 data-v-63358d07>How It Works</h3><p data-v-63358d07>The container startup command:</p><ol data-v-63358d07><li data-v-63358d07>Runs <code data-v-63358d07>jeffrey-cli.jar init</code> to generate JVM flags</li><li data-v-63358d07>Uses <code data-v-63358d07>eval</code> to set environment variables (including <code data-v-63358d07>JDK_JAVA_OPTIONS</code>)</li><li data-v-63358d07>Starts Jeffrey with the profiling configuration active</li></ol><h2 id="deployment" data-v-63358d07>Deployment</h2>',4)),a(o,{language:"yaml",code:b}),e[4]||(e[4]=t('<h3 data-v-63358d07>Key Points</h3><ul data-v-63358d07><li data-v-63358d07><strong data-v-63358d07>Command</strong> - Uses <code data-v-63358d07>eval &quot;$(java -jar ... init ...)&quot;</code> to set environment variables before starting the app</li><li data-v-63358d07><strong data-v-63358d07>Volume mounts</strong> - ConfigMap for configuration, PVC for persistent data</li><li data-v-63358d07><strong data-v-63358d07>Environment variables</strong> - <code data-v-63358d07>ENV_NAME</code> is used in CLI config via HOCON substitution</li><li data-v-63358d07><strong data-v-63358d07>Resources</strong> - 2GB memory recommended for Jeffrey with profiling enabled</li></ul><h2 id="configmap" data-v-63358d07>ConfigMap</h2><p data-v-63358d07>Contains both <code data-v-63358d07>application.properties</code> for Jeffrey and <code data-v-63358d07>jeffrey-init.conf</code> for the CLI:</p>',4)),a(o,{language:"yaml",code:C}),e[5]||(e[5]=t('<h3 data-v-63358d07>CLI Configuration Highlights</h3><ul data-v-63358d07><li data-v-63358d07><strong data-v-63358d07>jdk-java-options</strong> - Enabled so JVM flags are set via <code data-v-63358d07>JDK_JAVA_OPTIONS</code></li><li data-v-63358d07><strong data-v-63358d07>attributes</strong> - Uses <code data-v-63358d07>${?VAR}</code> syntax for optional environment variable substitution</li><li data-v-63358d07><strong data-v-63358d07>heap-dump</strong> - Configured to dump on crash for post-mortem analysis</li><li data-v-63358d07><strong data-v-63358d07>jvm-logging</strong> - JFR trace logging for debugging profiler issues</li></ul><h2 id="service-ingress" data-v-63358d07>Service &amp; Ingress</h2>',3)),a(o,{language:"yaml",code:x}),a(n,{type:"tip"},{default:r(()=>[...e[1]||(e[1]=[i("strong",null,"Large uploads:",-1),s(" The ingress annotations increase proxy timeouts and body size limits. This is important for uploading large JFR files to Jeffrey. ",-1)])]),_:1})]),a(p)]))}}),_=y(J,[["__scopeId","data-v-63358d07"]]);export{_ as default};
