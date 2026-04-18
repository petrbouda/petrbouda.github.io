import{D as m,a as f}from"./DocsPageHeader-B1UG2q28.js";import{D as n}from"./DocsCodeBlock-CoxO7wTz.js";import{D as r}from"./DocsCallout-D3DINpua.js";import{u as p}from"./useDocHeadings-BLgnaUVY.js";import{d as c,i as u,c as g,b as o,a,k as s,m as t,w as i,o as v}from"./index-BCuEPExC.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"docs-article"},h={class:"docs-content"},E=`apiVersion: apps/v1
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
            - /bin/sh
            - '-c'
            - >-
              java -jar /data/jeffrey/libs/current/jeffrey-cli.jar
              init --base-config /mnt/config/jeffrey-init.conf &&
              exec java @/tmp/jvm.args -jar /app/my-service.jar
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
    profiler-path = "/data/jeffrey/libs/current/libasyncProfiler.so"
    arg-file = "/tmp/jvm.args"

    project {
        workspace-id = "uat"
        name = \${SERVICE_NAME}"-"\${ENV_NAME}
        label = \${SERVICE_NAME}" "\${ENV_NAME}
    }

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
    }`,b=c({__name:"LiveRecordingServiceDeploymentPage",setup(N){const{setHeadings:l}=p(),d=[{id:"overview",text:"Overview",level:2},{id:"deployment",text:"Deployment",level:2},{id:"configmap",text:"ConfigMap",level:2}];return u(()=>{l(d)}),(M,e)=>(v(),g("article",j,[o(m,{title:"Service Deployment",icon:"bi bi-gear"}),a("div",h,[e[5]||(e[5]=a("p",null,[t("This guide demonstrates deploying a Java service on Kubernetes with "),a("strong",null,"continuous profiling"),t(" using Jeffrey CLI and shared storage.")],-1)),o(r,{type:"danger"},{default:i(()=>[...e[0]||(e[0]=[a("strong",null,"Single pod limitation:",-1),t(" Currently, only single-replica deployments are supported. Multi-pod scaling support is coming soon. ",-1)])]),_:1}),e[6]||(e[6]=a("h2",{id:"overview"},"Overview",-1)),e[7]||(e[7]=a("p",null,"The deployment consists of:",-1)),e[8]||(e[8]=a("ul",null,[a("li",null,[a("strong",null,"Deployment"),t(" - Your service container with CLI initialization")]),a("li",null,[a("strong",null,"ConfigMap"),t(" - Jeffrey CLI configuration")]),a("li",null,[a("strong",null,"Shared PVC"),t(" - Same storage volume that Jeffrey monitors")])],-1)),o(r,{type:"info"},{default:i(()=>[...e[1]||(e[1]=[a("strong",null,"Shared storage:",-1),t(" The service mounts the same PersistentVolumeClaim as Jeffrey. Recording sessions are written to this shared storage, and Jeffrey automatically discovers and displays them in the Repository. ",-1)])]),_:1}),e[9]||(e[9]=a("h3",null,"How It Works",-1)),e[10]||(e[10]=a("p",null,"The container startup command:",-1)),e[11]||(e[11]=a("ol",null,[a("li",null,[t("Runs "),a("code",null,"jeffrey-cli.jar init"),t(" from the shared storage to generate a JVM @argfile")]),a("li",null,[t("Starts your service with "),a("code",null,"java @/tmp/jvm.args"),t(" to apply profiling flags")])],-1)),o(r,{type:"tip"},{default:i(()=>[...e[2]||(e[2]=[a("strong",null,"No image modification required:",-1),t(" Jeffrey CLI and Async-Profiler are loaded from the shared storage. Your service image doesn't need to include any profiling tools. ",-1)])]),_:1}),e[12]||(e[12]=a("h2",{id:"deployment"},"Deployment",-1)),o(n,{language:"yaml",code:E}),e[13]||(e[13]=s('<h3 data-v-2232ed09>Key Points</h3><ul data-v-2232ed09><li data-v-2232ed09><strong data-v-2232ed09>Shared PVC</strong> - Mounts <code data-v-2232ed09>jeffrey-pvc</code> at <code data-v-2232ed09>/data/jeffrey</code> (same as Jeffrey)</li><li data-v-2232ed09><strong data-v-2232ed09>CLI from shared storage</strong> - Uses <code data-v-2232ed09>/data/jeffrey/libs/current/jeffrey-cli.jar</code></li><li data-v-2232ed09><strong data-v-2232ed09>Environment variables</strong> - <code data-v-2232ed09>SERVICE_NAME</code> and <code data-v-2232ed09>ENV_NAME</code> are used in the CLI config</li><li data-v-2232ed09><strong data-v-2232ed09>No special image</strong> - Works with any Java application image</li></ul><h2 id="configmap" data-v-2232ed09>ConfigMap</h2><p data-v-2232ed09>Contains the <code data-v-2232ed09>jeffrey-init.conf</code> for Jeffrey CLI:</p>',4)),o(n,{language:"yaml",code:C}),o(r,{type:"tip"},{default:i(()=>[...e[3]||(e[3]=[a("strong",null,"Auto-resolved profiler path:",-1),t(" When using ",-1),a("code",null,"jeffrey-home",-1),t(" with copy-libs enabled, ",-1),a("code",null,"profiler-path",-1),t(" can be omitted. It is automatically resolved from ",-1),a("code",null,"libs/current/libasyncProfiler.so",-1),t(". ",-1)])]),_:1}),e[14]||(e[14]=s("<h3 data-v-2232ed09>CLI Configuration Highlights</h3><ul data-v-2232ed09><li data-v-2232ed09><strong data-v-2232ed09>profiler-path</strong> - Points to Async-Profiler on shared storage</li><li data-v-2232ed09><strong data-v-2232ed09>project.name</strong> - Uses <code data-v-2232ed09>SERVICE_NAME</code> and <code data-v-2232ed09>ENV_NAME</code> for unique project identification</li><li data-v-2232ed09><strong data-v-2232ed09>arg-file</strong> - Writes JVM arguments to <code data-v-2232ed09>/tmp/jvm.args</code> for @argfile startup</li><li data-v-2232ed09><strong data-v-2232ed09>attributes</strong> - Custom metadata that appears in Jeffrey UI</li></ul>",2)),o(r,{type:"info"},{default:i(()=>[...e[4]||(e[4]=[a("strong",null,"Multiple services:",-1),t(" Each service creates its own project in Jeffrey based on ",-1),a("code",null,"project-name",-1),t(". Use environment variables to ensure unique project names across your services. ",-1)])]),_:1})]),o(f)]))}}),w=y(b,[["__scopeId","data-v-2232ed09"]]);export{w as default};
