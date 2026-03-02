import{D as f,a as p}from"./DocsPageHeader-DkTA7XMf.js";import{D as o}from"./DocsCodeBlock-C1lr-gT9.js";import{D as n}from"./DocsCallout-cfD1WgkG.js";import{u as m}from"./useDocHeadings-T46U2rzl.js";import{d as c,i as g,c as v,b as e,a as i,k as t,w as r,m as s,o as u}from"./index-u9kOfjq7.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},j={class:"docs-content"},b=`apiVersion: apps/v1
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

    # AI Assistant (Claude)
    jeffrey.ai.provider=claude
    jeffrey.ai.api-key=<token>

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
                  number: 8080`,J=c({__name:"LiveRecordingJeffreyDeploymentPage",setup(N){const{setHeadings:d}=m(),l=[{id:"overview",text:"Overview",level:2},{id:"deployment",text:"Deployment",level:2},{id:"configmap",text:"ConfigMap",level:2},{id:"service-ingress",text:"Service & Ingress",level:2}];return g(()=>{d(l)}),(k,a)=>(u(),v("article",h,[e(f,{title:"Jeffrey Deployment",icon:"bi bi-box-seam"}),i("div",j,[a[2]||(a[2]=t('<p data-v-d91a99aa>This guide demonstrates deploying Jeffrey on Kubernetes with <strong data-v-d91a99aa>self-monitoring</strong> - Jeffrey profiles itself using Jeffrey CLI.</p><h2 id="overview" data-v-d91a99aa>Overview</h2><p data-v-d91a99aa>The deployment consists of:</p><ul data-v-d91a99aa><li data-v-d91a99aa><strong data-v-d91a99aa>Deployment</strong> - Jeffrey container with CLI initialization</li><li data-v-d91a99aa><strong data-v-d91a99aa>ConfigMap</strong> - Application properties and CLI configuration</li><li data-v-d91a99aa><strong data-v-d91a99aa>Service &amp; Ingress</strong> - Network exposure</li><li data-v-d91a99aa><strong data-v-d91a99aa>PersistentVolumeClaim</strong> - Storage for recordings and database</li></ul>',4)),e(n,{type:"info"},{default:r(()=>[...a[0]||(a[0]=[i("strong",null,"Self-monitoring:",-1),s(" Jeffrey uses its own CLI to configure profiling of itself. This is useful for monitoring Jeffrey's performance in production and dogfooding the profiling setup. ",-1)])]),_:1}),a[3]||(a[3]=t('<h3 data-v-d91a99aa>How It Works</h3><p data-v-d91a99aa>The container startup command:</p><ol data-v-d91a99aa><li data-v-d91a99aa>Runs <code data-v-d91a99aa>jeffrey-cli.jar init</code> to generate JVM flags</li><li data-v-d91a99aa>Uses <code data-v-d91a99aa>eval</code> to set environment variables (including <code data-v-d91a99aa>JDK_JAVA_OPTIONS</code>)</li><li data-v-d91a99aa>Starts Jeffrey with the profiling configuration active</li></ol><h2 id="deployment" data-v-d91a99aa>Deployment</h2>',4)),e(o,{language:"yaml",code:b}),a[4]||(a[4]=t('<h3 data-v-d91a99aa>Key Points</h3><ul data-v-d91a99aa><li data-v-d91a99aa><strong data-v-d91a99aa>Command</strong> - Uses <code data-v-d91a99aa>eval &quot;$(java -jar ... init ...)&quot;</code> to set environment variables before starting the app</li><li data-v-d91a99aa><strong data-v-d91a99aa>Volume mounts</strong> - ConfigMap for configuration, PVC for persistent data</li><li data-v-d91a99aa><strong data-v-d91a99aa>Environment variables</strong> - <code data-v-d91a99aa>ENV_NAME</code> is used in CLI config via HOCON substitution</li><li data-v-d91a99aa><strong data-v-d91a99aa>Resources</strong> - 2GB memory recommended for Jeffrey with profiling enabled</li></ul><h2 id="configmap" data-v-d91a99aa>ConfigMap</h2><p data-v-d91a99aa>Contains both <code data-v-d91a99aa>application.properties</code> for Jeffrey and <code data-v-d91a99aa>jeffrey-init.conf</code> for the CLI:</p>',4)),e(o,{language:"yaml",code:C}),a[5]||(a[5]=t('<h3 data-v-d91a99aa>CLI Configuration Highlights</h3><ul data-v-d91a99aa><li data-v-d91a99aa><strong data-v-d91a99aa>jdk-java-options</strong> - Enabled so JVM flags are set via <code data-v-d91a99aa>JDK_JAVA_OPTIONS</code></li><li data-v-d91a99aa><strong data-v-d91a99aa>attributes</strong> - Uses <code data-v-d91a99aa>${?VAR}</code> syntax for optional environment variable substitution</li><li data-v-d91a99aa><strong data-v-d91a99aa>heap-dump</strong> - Configured to dump on crash for post-mortem analysis</li><li data-v-d91a99aa><strong data-v-d91a99aa>jvm-logging</strong> - JFR trace logging for debugging profiler issues</li></ul><h2 id="service-ingress" data-v-d91a99aa>Service &amp; Ingress</h2>',3)),e(o,{language:"yaml",code:x}),e(n,{type:"tip"},{default:r(()=>[...a[1]||(a[1]=[i("strong",null,"Large uploads:",-1),s(" The ingress annotations increase proxy timeouts and body size limits. This is important for uploading large JFR files to Jeffrey. ",-1)])]),_:1})]),e(p)]))}}),_=y(J,[["__scopeId","data-v-d91a99aa"]]);export{_ as default};
