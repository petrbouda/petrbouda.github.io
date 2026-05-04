import{D as l,a as f}from"./DocsPageHeader-BZRYkxyE.js";import{D as d}from"./DocsCodeBlock-B56V7OZN.js";import{D as r}from"./DocsCallout-aoj4fnY7.js";import{u as p}from"./useDocHeadings-DEzkgBzB.js";import{d as u,k as m,a as v,g as a,b as t,e as g,j as o,w as s,o as y}from"./index-BHzju1u0.js";import{_ as c}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},k={class:"docs-content"},j=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  petrbouda/jeffrey:latest`,h=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  -v jeffrey-data:/data/jeffrey \\
  petrbouda/jeffrey:latest`,D=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  -v /path/on/host:/data/jeffrey \\
  petrbouda/jeffrey:latest`,S=`services:
  jeffrey:
    image: petrbouda/jeffrey:latest
    container_name: jeffrey
    ports:
      - "8080:8080"
    volumes:
      - jeffrey-data:/data/jeffrey
    environment:
      - JAVA_OPTS=-Xmx2g -Xms2g
    restart: unless-stopped

volumes:
  jeffrey-data:`,x=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  -v jeffrey-data:/data/jeffrey \\
  -e JAVA_OPTS="-Xmx2g -Xms2g" \\
  petrbouda/jeffrey:latest`,V=u({__name:"DeploymentsSimpleContainerPage",setup(w){const{setHeadings:n}=p(),i=[{id:"quick-start",text:"Quick Start",level:2},{id:"persistent-storage",text:"Persistent Storage",level:2},{id:"docker-compose",text:"Docker Compose",level:2},{id:"environment-variables",text:"Environment Variables",level:2}];return m(()=>{n(i)}),(C,e)=>(y(),v("article",b,[a(l,{title:"Simple as a Container",icon:"bi bi-box-seam"}),t("div",k,[e[3]||(e[3]=t("p",null,"Run Jeffrey as a Docker container for easy deployment with isolated dependencies. This is the recommended approach for most local and development setups.",-1)),e[4]||(e[4]=t("h2",{id:"quick-start"},"Quick Start",-1)),e[5]||(e[5]=t("p",null,"Start Jeffrey with a single command:",-1)),a(d,{language:"bash",code:j}),e[6]||(e[6]=t("p",null,[o("Jeffrey is now running at "),t("a",{href:"http://localhost:8080",target:"_blank"},"http://localhost:8080"),o(".")],-1)),a(r,{type:"info"},{default:s(()=>[...e[0]||(e[0]=[t("strong",null,"Multi-arch image:",-1),o(" the ",-1),t("code",null,"petrbouda/jeffrey",-1),o(" image ships ",-1),t("code",null,"linux/amd64",-1),o(" and ",-1),t("code",null,"linux/arm64",-1),o(" in a single manifest. Docker / OrbStack / containerd pull the matching variant automatically on Apple Silicon, Graviton, and other arm64 hosts. ",-1)])]),_:1}),a(r,{type:"warning"},{default:s(()=>[...e[1]||(e[1]=[t("strong",null,"Data persistence:",-1),o(" Without a volume, all data is lost when the container stops. See the next section for persistent storage. ",-1)])]),_:1}),e[7]||(e[7]=t("h2",{id:"persistent-storage"},"Persistent Storage",-1)),e[8]||(e[8]=t("p",null,"Use a Docker volume to persist data across container restarts:",-1)),a(d,{language:"bash",code:h}),e[9]||(e[9]=t("h3",null,"Bind Mount",-1)),e[10]||(e[10]=t("p",null,"Alternatively, mount a host directory for easier access to the data:",-1)),a(d,{language:"bash",code:D}),a(r,{type:"tip"},{default:s(()=>[...e[2]||(e[2]=[t("strong",null,"Bind mounts",-1),o(" are useful when you want to access Jeffrey's data directly from the host, for example to backup recordings or inspect the database. ",-1)])]),_:1}),e[11]||(e[11]=t("h2",{id:"docker-compose"},"Docker Compose",-1)),e[12]||(e[12]=t("p",null,"For a more manageable setup, use Docker Compose:",-1)),a(d,{language:"yaml",code:S}),e[13]||(e[13]=t("p",null,"Start with:",-1)),a(d,{language:"bash",code:"docker compose up -d"}),e[14]||(e[14]=t("h2",{id:"environment-variables"},"Environment Variables",-1)),e[15]||(e[15]=t("p",null,"Configure Jeffrey using environment variables:",-1)),a(d,{language:"bash",code:x}),e[16]||(e[16]=g("<table data-v-6044dd23><thead data-v-6044dd23><tr data-v-6044dd23><th data-v-6044dd23>Variable</th><th data-v-6044dd23>Description</th></tr></thead><tbody data-v-6044dd23><tr data-v-6044dd23><td data-v-6044dd23><code data-v-6044dd23>JAVA_OPTS</code></td><td data-v-6044dd23>JVM options (heap size, GC settings, etc.)</td></tr><tr data-v-6044dd23><td data-v-6044dd23><code data-v-6044dd23>SERVER_PORT</code></td><td data-v-6044dd23>HTTP server port (default: 8080)</td></tr><tr data-v-6044dd23><td data-v-6044dd23><code data-v-6044dd23>JEFFREY_HOME_DIR</code></td><td data-v-6044dd23>Jeffrey data directory (default: /data/jeffrey)</td></tr></tbody></table>",1))]),a(f)]))}}),M=c(V,[["__scopeId","data-v-6044dd23"]]);export{M as default};
