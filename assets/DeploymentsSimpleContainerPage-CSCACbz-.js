import{D as l,a as f}from"./DocsPageHeader-64RWP-14.js";import{D as o}from"./DocsCodeBlock-C0C8biN2.js";import{D as s}from"./DocsCallout-BQR4CNYn.js";import{u as p}from"./useDocHeadings-gQYepUus.js";import{d as u,i as m,c as v,b as a,a as t,k as y,m as r,w as d,o as g}from"./index-D3jXmUN6.js";import{_ as c}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},k={class:"docs-content"},j=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  petrbouda/jeffrey:latest`,D=`docker run -d \\
  --name jeffrey \\
  -p 8080:8080 \\
  -v jeffrey-data:/data/jeffrey \\
  petrbouda/jeffrey:latest`,h=`docker run -d \\
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
  petrbouda/jeffrey:latest`,V=u({__name:"DeploymentsSimpleContainerPage",setup(w){const{setHeadings:n}=p(),i=[{id:"quick-start",text:"Quick Start",level:2},{id:"persistent-storage",text:"Persistent Storage",level:2},{id:"docker-compose",text:"Docker Compose",level:2},{id:"environment-variables",text:"Environment Variables",level:2}];return m(()=>{n(i)}),(C,e)=>(g(),v("article",b,[a(l,{title:"Simple as a Container",icon:"bi bi-box-seam"}),t("div",k,[e[2]||(e[2]=t("p",null,"Run Jeffrey as a Docker container for easy deployment with isolated dependencies. This is the recommended approach for most local and development setups.",-1)),e[3]||(e[3]=t("h2",{id:"quick-start"},"Quick Start",-1)),e[4]||(e[4]=t("p",null,"Start Jeffrey with a single command:",-1)),a(o,{language:"bash",code:j}),e[5]||(e[5]=t("p",null,[r("Jeffrey is now running at "),t("a",{href:"http://localhost:8080",target:"_blank"},"http://localhost:8080"),r(".")],-1)),a(s,{type:"warning"},{default:d(()=>[...e[0]||(e[0]=[t("strong",null,"Data persistence:",-1),r(" Without a volume, all data is lost when the container stops. See the next section for persistent storage. ",-1)])]),_:1}),e[6]||(e[6]=t("h2",{id:"persistent-storage"},"Persistent Storage",-1)),e[7]||(e[7]=t("p",null,"Use a Docker volume to persist data across container restarts:",-1)),a(o,{language:"bash",code:D}),e[8]||(e[8]=t("h3",null,"Bind Mount",-1)),e[9]||(e[9]=t("p",null,"Alternatively, mount a host directory for easier access to the data:",-1)),a(o,{language:"bash",code:h}),a(s,{type:"tip"},{default:d(()=>[...e[1]||(e[1]=[t("strong",null,"Bind mounts",-1),r(" are useful when you want to access Jeffrey's data directly from the host, for example to backup recordings or inspect the database. ",-1)])]),_:1}),e[10]||(e[10]=t("h2",{id:"docker-compose"},"Docker Compose",-1)),e[11]||(e[11]=t("p",null,"For a more manageable setup, use Docker Compose:",-1)),a(o,{language:"yaml",code:S}),e[12]||(e[12]=t("p",null,"Start with:",-1)),a(o,{language:"bash",code:"docker compose up -d"}),e[13]||(e[13]=t("h2",{id:"environment-variables"},"Environment Variables",-1)),e[14]||(e[14]=t("p",null,"Configure Jeffrey using environment variables:",-1)),a(o,{language:"bash",code:x}),e[15]||(e[15]=y("<table data-v-f3ee4d53><thead data-v-f3ee4d53><tr data-v-f3ee4d53><th data-v-f3ee4d53>Variable</th><th data-v-f3ee4d53>Description</th></tr></thead><tbody data-v-f3ee4d53><tr data-v-f3ee4d53><td data-v-f3ee4d53><code data-v-f3ee4d53>JAVA_OPTS</code></td><td data-v-f3ee4d53>JVM options (heap size, GC settings, etc.)</td></tr><tr data-v-f3ee4d53><td data-v-f3ee4d53><code data-v-f3ee4d53>SERVER_PORT</code></td><td data-v-f3ee4d53>HTTP server port (default: 8080)</td></tr><tr data-v-f3ee4d53><td data-v-f3ee4d53><code data-v-f3ee4d53>JEFFREY_HOME_DIR</code></td><td data-v-f3ee4d53>Jeffrey data directory (default: /data/jeffrey)</td></tr></tbody></table>",1))]),a(f)]))}}),R=c(V,[["__scopeId","data-v-f3ee4d53"]]);export{R as default};
