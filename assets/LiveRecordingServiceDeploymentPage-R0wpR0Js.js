import{D as m,a as c}from"./DocsPageHeader-64RWP-14.js";import{D as s}from"./DocsCodeBlock-C0C8biN2.js";import{D as i}from"./DocsCallout-BQR4CNYn.js";import{u as p}from"./useDocHeadings-gQYepUus.js";import{d as f,i as v,c as g,b as o,a,k as r,m as t,w as n,o as u}from"./index-D3jXmUN6.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},j={class:"docs-content"},E=`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-service
  namespace: profiling
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-service
  template:
    metadata:
      labels:
        app: my-service
    spec:
      volumes:
        - name: config-volume
          configMap:
            name: my-service-config
        - name: jeffrey-data
          persistentVolumeClaim:
            claimName: jeffrey-pvc
      containers:
        - name: my-service
          image: my-registry/my-service:latest
          command:
            - /bin/bash
            - '-c'
            - >-
              eval "$(java -jar /data/jeffrey/libs/jeffrey-cli.jar
              init /mnt/config/jeffrey-init.conf)" &&
              exec java -jar /app/my-service.jar
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
          env:
            - name: ENV_NAME
              value: "UAT"
            - name: SERVICE_NAME
              value: "my-service"
          resources:
            limits:
              memory: 1Gi
              cpu: '1'
            requests:
              memory: 1Gi
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
      terminationGracePeriodSeconds: 30`,C=`apiVersion: v1
kind: ConfigMap
metadata:
  name: my-service-config
  namespace: profiling
data:
  jeffrey-init.conf: |
    # Jeffrey CLI configuration for service profiling

    jeffrey-home = "/data/jeffrey"
    profiler-path = "/data/jeffrey/libs/libasyncProfiler.so"

    workspace-id = "uat"
    project-name = \${SERVICE_NAME}"-"\${ENV_NAME}
    project-label = \${SERVICE_NAME}" "\${ENV_NAME}

    perf-counters { enabled = true }
    heap-dump { enabled = true, type = "crash" }

    messaging {
      enabled = true
      max-age = "24h"
    }

    jvm-logging {
      enabled = true
      command = "jfr*=trace:file=<<JEFFREY_CURRENT_SESSION>>/jfr-jvm.log::filecount=3,filesize=5m"
    }

    jdk-java-options {
      enabled = true
      additional-options = "-Xmx512m -Xms512m -XX:+UseG1GC"
    }

    attributes {
      env = \${?ENV_NAME}
      service = \${?SERVICE_NAME}
      namespace = "profiling"
    }`,b=f({__name:"LiveRecordingServiceDeploymentPage",setup(N){const{setHeadings:l}=p(),d=[{id:"overview",text:"Overview",level:2},{id:"deployment",text:"Deployment",level:2},{id:"configmap",text:"ConfigMap",level:2}];return v(()=>{l(d)}),(M,e)=>(u(),g("article",h,[o(m,{title:"Service Deployment",icon:"bi bi-gear"}),a("div",j,[e[4]||(e[4]=a("p",null,[t("This guide demonstrates deploying a Java service on Kubernetes with "),a("strong",null,"continuous profiling"),t(" using Jeffrey CLI and shared storage.")],-1)),o(i,{type:"danger"},{default:n(()=>[...e[0]||(e[0]=[a("strong",null,"Single pod limitation:",-1),t(" Currently, only single-replica deployments are supported. Multi-pod scaling support is coming soon. ",-1)])]),_:1}),e[5]||(e[5]=a("h2",{id:"overview"},"Overview",-1)),e[6]||(e[6]=a("p",null,"The deployment consists of:",-1)),e[7]||(e[7]=a("ul",null,[a("li",null,[a("strong",null,"Deployment"),t(" - Your service container with CLI initialization")]),a("li",null,[a("strong",null,"ConfigMap"),t(" - Jeffrey CLI configuration")]),a("li",null,[a("strong",null,"Shared PVC"),t(" - Same storage volume that Jeffrey monitors")])],-1)),o(i,{type:"info"},{default:n(()=>[...e[1]||(e[1]=[a("strong",null,"Shared storage:",-1),t(" The service mounts the same PersistentVolumeClaim as Jeffrey. Recording sessions are written to this shared storage, and Jeffrey automatically discovers and displays them in the Repository. ",-1)])]),_:1}),e[8]||(e[8]=r("<h3 data-v-e0050840>How It Works</h3><p data-v-e0050840>The container startup command:</p><ol data-v-e0050840><li data-v-e0050840>Runs <code data-v-e0050840>jeffrey-cli.jar</code> from the shared storage to generate JVM flags</li><li data-v-e0050840>Uses <code data-v-e0050840>eval</code> to set environment variables (including <code data-v-e0050840>JDK_JAVA_OPTIONS</code>)</li><li data-v-e0050840>Starts your service with profiling automatically enabled</li></ol>",3)),o(i,{type:"tip"},{default:n(()=>[...e[2]||(e[2]=[a("strong",null,"No image modification required:",-1),t(" Jeffrey CLI and Async-Profiler are loaded from the shared storage. Your service image doesn't need to include any profiling tools. ",-1)])]),_:1}),e[9]||(e[9]=a("h2",{id:"deployment"},"Deployment",-1)),o(s,{language:"yaml",code:E}),e[10]||(e[10]=r('<h3 data-v-e0050840>Key Points</h3><ul data-v-e0050840><li data-v-e0050840><strong data-v-e0050840>Shared PVC</strong> - Mounts <code data-v-e0050840>jeffrey-pvc</code> at <code data-v-e0050840>/data/jeffrey</code> (same as Jeffrey)</li><li data-v-e0050840><strong data-v-e0050840>CLI from shared storage</strong> - Uses <code data-v-e0050840>/data/jeffrey/libs/jeffrey-cli.jar</code></li><li data-v-e0050840><strong data-v-e0050840>Environment variables</strong> - <code data-v-e0050840>SERVICE_NAME</code> and <code data-v-e0050840>ENV_NAME</code> are used in the CLI config</li><li data-v-e0050840><strong data-v-e0050840>No special image</strong> - Works with any Java application image</li></ul><h2 id="configmap" data-v-e0050840>ConfigMap</h2><p data-v-e0050840>Contains the <code data-v-e0050840>jeffrey-init.conf</code> for Jeffrey CLI:</p>',4)),o(s,{language:"yaml",code:C}),e[11]||(e[11]=r("<h3 data-v-e0050840>CLI Configuration Highlights</h3><ul data-v-e0050840><li data-v-e0050840><strong data-v-e0050840>profiler-path</strong> - Points to Async-Profiler on shared storage</li><li data-v-e0050840><strong data-v-e0050840>project-name</strong> - Uses <code data-v-e0050840>SERVICE_NAME</code> and <code data-v-e0050840>ENV_NAME</code> for unique project identification</li><li data-v-e0050840><strong data-v-e0050840>jdk-java-options</strong> - Enabled so profiling flags are automatically picked up by the JVM</li><li data-v-e0050840><strong data-v-e0050840>attributes</strong> - Custom metadata that appears in Jeffrey UI</li></ul>",2)),o(i,{type:"info"},{default:n(()=>[...e[3]||(e[3]=[a("strong",null,"Multiple services:",-1),t(" Each service creates its own project in Jeffrey based on ",-1),a("code",null,"project-name",-1),t(". Use environment variables to ensure unique project names across your services. ",-1)])]),_:1})]),o(c)]))}}),J=y(b,[["__scopeId","data-v-e0050840"]]);export{J as default};
