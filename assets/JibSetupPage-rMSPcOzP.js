import{D as s}from"./DocsCallout-CxMl0flk.js";import{D as o}from"./DocsCodeBlock-BP5k14G1.js";import{D as f}from"./DocsNavFooter-BpRWCVJt.js";import{D as p}from"./DocsPageHeader-BmhmgFM9.js";import{u as m}from"./useDocHeadings-ZAbLw5SE.js";import{d as u,k as c,c as g,e as a,a as t,j as i,w as n,b as v,i as y,o as h}from"./index-CEwwdbAp.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={class:"docs-article"},x={class:"docs-content"},E=`<plugin>
  <groupId>com.google.cloud.tools</groupId>
  <artifactId>jib-maven-plugin</artifactId>
  <version>3.5.2</version>
  <dependencies>
    <dependency>
      <groupId>cafe.jeffrey-analyst</groupId>
      <artifactId>jeffrey-jib-maven-native</artifactId>
      <version>\${jeffrey-jib.version}</version>
    </dependency>
  </dependencies>
  <configuration>
    <to>
      <image>registry.example.com/team/my-service</image>
    </to>
    <pluginExtensions>
      <pluginExtension>
        <implementation>cafe.jeffrey.jib.maven.JeffreyJibMavenExtension</implementation>
      </pluginExtension>
    </pluginExtensions>
  </configuration>
</plugin>`,J=`<dependencies>
  <dependency>
    <groupId>cafe.jeffrey-analyst</groupId>
    <artifactId>jeffrey-jib-maven-jar</artifactId>
    <version>\${jeffrey-jib.version}</version>
  </dependency>
</dependencies>`,w=`<plugin>
  <groupId>com.google.cloud.tools</groupId>
  <artifactId>jib-maven-plugin</artifactId>
  <version>3.5.2</version>
  <dependencies>
    <!-- jar flavour: this image is multi-platform, and Jib layers are shared by every
         platform in the manifest list, so the native binary would ship twice. -->
    <dependency>
      <groupId>cafe.jeffrey-analyst</groupId>
      <artifactId>jeffrey-jib-maven-jar</artifactId>
      <version>\${jeffrey-jib.version}</version>
    </dependency>
  </dependencies>
  <configuration>
    <from>
      <image>eclipse-temurin:25-jre</image>
      <platforms>
        <platform><architecture>amd64</architecture><os>linux</os></platform>
        <platform><architecture>arm64</architecture><os>linux</os></platform>
      </platforms>
    </from>
    <to>
      <image>registry.example.com/team/my-service:\${project.version}</image>
    </to>
    <container>
      <mainClass>com.example.Application</mainClass>
      <!-- Let the provisioner own the JVM flags. Anything here is moved into CMD and applied
           AFTER the argfile, so a -Xmx or -XX: option would silently override profiling. -->
      <jvmFlags/>
      <environment>
        <!-- Off by default; a pod sets JEFFREY_ENABLED=true to opt in without a rebuild. -->
        <JEFFREY_ENABLED>false</JEFFREY_ENABLED>
      </environment>
    </container>
    <pluginExtensions>
      <pluginExtension>
        <implementation>cafe.jeffrey.jib.maven.JeffreyJibMavenExtension</implementation>
        <configuration implementation="cafe.jeffrey.jib.JeffreyJibConfig">
          <!-- Build-time gate: -Djeffrey.profiling=false produces a plain Jib image. -->
          <enabled>\${jeffrey.profiling}</enabled>
          <!-- Baked as JEFFREY_HOME: the shared volume every pod mounts at the same path. -->
          <jeffreyHome>/mnt/jeffrey</jeffreyHome>
          <!-- Pinned so a later artifactId rename does not start a new project on the Hub. -->
          <projectName>my-service</projectName>
          <!-- Optional per-deployment override file, mounted from a ConfigMap. -->
          <overrideConfig>/etc/jeffrey/overrides.conf</overrideConfig>
        </configuration>
      </pluginExtension>
    </pluginExtensions>
  </configuration>
</plugin>`,M=`<properties>
  <jeffrey-jib.version>0.14.0</jeffrey-jib.version>
  <jeffrey.profiling>true</jeffrey.profiling>
</properties>`,F=`buildscript {
  dependencies {
    classpath("cafe.jeffrey-analyst:jeffrey-jib-gradle-native:0.14.0")
  }
}

plugins {
  id("com.google.cloud.tools.jib") version "3.5.2"
}

jib {
  to.image = "registry.example.com/team/my-service"
  pluginExtensions {
    pluginExtension {
      implementation = "cafe.jeffrey.jib.gradle.JeffreyJibGradleExtension"
    }
  }
}`,I=`buildscript {
  dependencies {
    classpath("cafe.jeffrey-analyst:jeffrey-jib-gradle-jar:0.14.0")
  }
}`,C=`buildscript {
  dependencies {
    // jar flavour: this image is multi-platform, and Jib layers are shared by every
    // platform in the manifest list, so the native binary would ship twice.
    classpath("cafe.jeffrey-analyst:jeffrey-jib-gradle-jar:0.14.0")
  }
}

plugins {
  id("com.google.cloud.tools.jib") version "3.5.2"
}

jib {
  from {
    image = "eclipse-temurin:25-jre"
    platforms {
      platform { architecture = "amd64"; os = "linux" }
      platform { architecture = "arm64"; os = "linux" }
    }
  }
  to.image = "registry.example.com/team/my-service:\${project.version}"
  container {
    mainClass = "com.example.Application"
    // Let the provisioner own the JVM flags: anything here is moved into CMD and applied
    // AFTER the argfile, so a -Xmx or -XX: option would silently override profiling.
    jvmFlags = emptyList()
    // Off by default; a pod sets JEFFREY_ENABLED=true to opt in without a rebuild.
    environment = mapOf("JEFFREY_ENABLED" to "false")
  }
  pluginExtensions {
    pluginExtension {
      implementation = "cafe.jeffrey.jib.gradle.JeffreyJibGradleExtension"
      properties = mapOf(
        // Build-time gate: -PjeffreyProfiling=false produces a plain Jib image.
        "enabled" to (findProperty("jeffreyProfiling") ?: "true").toString(),
        // Baked as JEFFREY_HOME: the shared volume every pod mounts at the same path.
        "jeffreyHome" to "/mnt/jeffrey",
        // Pinned so a later project rename does not start a new project on the Hub.
        "projectName" to "my-service",
        // Optional per-deployment override file, mounted from a ConfigMap.
        "overrideConfig" to "/etc/jeffrey/overrides.conf",
      )
    }
  }
}`,B=`<dependency>
  <artifactId>jeffrey-jib-maven</artifactId>            <!-- bare extension -->
</dependency>
…
<configuration implementation="cafe.jeffrey.jib.JeffreyJibConfig">
  <payloadVersion>0.13.22</payloadVersion>
  <provisionerSource>jar</provisionerSource>
</configuration>`,k=`<dependency>
  <artifactId>jeffrey-jib-maven-jar</artifactId>        <!-- flavour = build + version -->
</dependency>`,D=u({__name:"JibSetupPage",setup(H){const{setHeadings:r}=m(),l=[{id:"choose-flavour",text:"Choose a Flavour",level:2},{id:"maven-setup",text:"Maven",level:2},{id:"maven-native",text:"Minimal: native",level:3},{id:"maven-jar",text:"Minimal: jar",level:3},{id:"maven-full",text:"Complete example",level:3},{id:"gradle-setup",text:"Gradle",level:2},{id:"gradle-native",text:"Minimal: native",level:3},{id:"gradle-jar",text:"Minimal: jar",level:3},{id:"gradle-full",text:"Complete example",level:3},{id:"migrating",text:"Migrating from payloadVersion",level:2}];return c(()=>{r(l)}),(N,e)=>{const d=y("router-link");return h(),g("article",b,[a(p,{title:"JIB Build Setup",icon:"bi bi-hammer"}),t("div",x,[t("p",null,[e[1]||(e[1]=i("Wiring the extension into a JIB build is one plugin dependency and one ",-1)),e[2]||(e[2]=t("code",null,"pluginExtension",-1)),e[3]||(e[3]=i(" line. The dependency is a ",-1)),e[4]||(e[4]=t("em",null,"flavour",-1)),e[5]||(e[5]=i(": the extension for your build tool plus a payload jar carrying one provisioner build and async-profiler, so declaring it is the whole configuration. Everything else on ",-1)),a(d,{to:"/docs/jib/configuration"},{default:n(()=>[...e[0]||(e[0]=[i("Configuration",-1)])]),_:1}),e[6]||(e[6]=i(" is optional.",-1))]),e[8]||(e[8]=v('<h2 id="choose-flavour" data-v-07390ce5>Choose a Flavour</h2><table data-v-07390ce5><thead data-v-07390ce5><tr data-v-07390ce5><th data-v-07390ce5>Flavour</th><th data-v-07390ce5>Provisioner</th><th data-v-07390ce5>Pick it when</th></tr></thead><tbody data-v-07390ce5><tr data-v-07390ce5><td data-v-07390ce5><code data-v-07390ce5>jeffrey-jib-maven-native</code><br data-v-07390ce5><code data-v-07390ce5>jeffrey-jib-gradle-native</code></td><td data-v-07390ce5>GraalVM binary, ~44 MB per architecture, starts in milliseconds, needs nothing of the application&#39;s JVM</td><td data-v-07390ce5>Single-architecture images; applications on a JVM older than the one Jeffrey targets (currently 25)</td></tr><tr data-v-07390ce5><td data-v-07390ce5><code data-v-07390ce5>jeffrey-jib-maven-jar</code><br data-v-07390ce5><code data-v-07390ce5>jeffrey-jib-gradle-jar</code></td><td data-v-07390ce5>One architecture-neutral jar, ~4 MB, runs a short second JVM on the application&#39;s own <code data-v-07390ce5>java</code></td><td data-v-07390ce5>Multi-architecture images (Jib layers are not per-platform, so <code data-v-07390ce5>native</code> would ship every architecture&#39;s binary in every image); any application already on a current JVM</td></tr></tbody></table><p data-v-07390ce5>Both flavours carry async-profiler for <code data-v-07390ce5>linux/amd64</code> and <code data-v-07390ce5>linux/arm64</code>; the image gets only the architectures it targets. Declaring the bare <code data-v-07390ce5>jeffrey-jib-maven</code> / <code data-v-07390ce5>jeffrey-jib-gradle</code>, or both flavours at once, fails the build with a message naming the fix.</p><h2 id="maven-setup" data-v-07390ce5>Maven</h2><h3 id="maven-native" data-v-07390ce5>Minimal: native</h3><p data-v-07390ce5>A single-architecture image that carries the GraalVM provisioner. Nothing is configured on the extension; <code data-v-07390ce5>JEFFREY_HOME</code> arrives from the pod.</p>',6)),a(o,{language:"xml",code:E}),e[9]||(e[9]=t("h3",{id:"maven-jar"},"Minimal: jar",-1)),e[10]||(e[10]=t("p",null,[i("Identical, with the other flavour in the plugin's "),t("code",null,"<dependencies>"),i(". The rest of the plugin block does not change.")],-1)),a(o,{language:"xml",code:J}),e[11]||(e[11]=t("h3",{id:"maven-full"},"Complete example",-1)),e[12]||(e[12]=t("p",null,[i("A multi-platform image pushed to a registry, with the profiling decisions made in the build and explained inline: the jar flavour because of the two platforms, an empty "),t("code",null,"jvmFlags"),i(" so the provisioner's argfile is not overridden, profiling off by default at the image level with a pod-level opt-in, a build-time gate on a Maven property, and the three values worth baking as image "),t("code",null,"ENV"),i(" defaults.")],-1)),a(o,{language:"xml",code:w}),a(o,{language:"xml",code:M}),a(s,{type:"warning"},{default:n(()=>[...e[7]||(e[7]=[t("strong",null,[t("code",null,"jeffreyHome"),i(" must point at a shared volume / disk.")],-1),i(" It is not where the binaries come from — those are in the image — but it is where the application writes its recordings, under ",-1),t("code",null,"${JEFFREY_HOME}/workspaces/",-1),i(", and where Jeffrey Hub reads them from. Every monitored pod and the Hub must see the same bytes, so a host-local directory or a per-pod ephemeral volume will not work. Leave it out of the build and set ",-1),t("code",null,"JEFFREY_HOME",-1),i(" on the pod instead when the mount path differs per cluster. ",-1)])]),_:1}),e[13]||(e[13]=t("h2",{id:"gradle-setup"},"Gradle",-1)),e[14]||(e[14]=t("h3",{id:"gradle-native"},"Minimal: native",-1)),e[15]||(e[15]=t("p",null,[i("The flavour goes on the build-script classpath — "),t("code",null,"buildscript.dependencies"),i(" as shown, or the "),t("code",null,"jib"),i(" plugin's "),t("code",null,"dependencies"),i(" block, depending on how you apply the plugin.")],-1)),a(o,{language:"kotlin",code:F}),e[16]||(e[16]=t("h3",{id:"gradle-jar"},"Minimal: jar",-1)),a(o,{language:"kotlin",code:I}),e[17]||(e[17]=t("h3",{id:"gradle-full"},"Complete example",-1)),e[18]||(e[18]=t("p",null,[i("The same multi-platform build as the Maven one. The string "),t("code",null,"properties"),i(" DSL is used on purpose: it works on every Gradle version JIB supports and keeps "),t("code",null,"JeffreyJibConfig"),i(" off the build script's compile classpath. The typed "),t("code",null,"configuration(Action<JeffreyJibConfig>) { … }"),i(" form is also accepted but is fragile across Gradle versions.")],-1)),a(o,{language:"kotlin",code:C}),e[19]||(e[19]=t("p",null,[i("Property names are the setters on "),t("code",null,"JeffreyJibConfig"),i("; the constants on that class ("),t("code",null,"JeffreyJibConfig.JEFFREY_HOME"),i(", …) can replace the strings if you prefer an IDE-checked build file at the cost of the import.")],-1)),e[20]||(e[20]=t("h2",{id:"migrating"},[i("Migrating from "),t("code",null,"payloadVersion")],-1)),e[21]||(e[21]=t("p",null,"Releases before the flavours resolved the payload at build time and needed two properties. Both are gone: the flavour's own version is the payload version, and the artifactId is the provisioner build. A build that still sets them is warned and the values are ignored.",-1)),a(o,{language:"xml",code:B}),a(o,{language:"xml",code:k})]),a(f)])}}}),S=j(D,[["__scopeId","data-v-07390ce5"]]);export{S as default};
