import{D as r}from"./DocsCallout-C5N5WHD2.js";import{D as p}from"./DocsNavFooter-CW98DusR.js";import{D as f}from"./DocsPageHeader-BLKeW_ND.js";import{u}from"./useDocHeadings-ALrAs1tK.js";import{i as c,o as g,e as b,h as n,a as t,g as o,B as a,f as i,t as m,m as v}from"./index-nQy9Ciy5.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"docs-article"},j={class:"docs-content"},E=c({__name:"JibSetupPage",setup(J){const{setHeadings:d}=u(),l=[{id:"gradle-setup",text:"Gradle Setup",level:2},{id:"maven-setup",text:"Maven Setup",level:2}];return g(()=>{d(l)}),(x,e)=>{const s=m("router-link");return v(),b("article",h,[n(f,{title:"JIB Build Setup",icon:"bi bi-hammer"}),t("div",j,[t("p",null,[e[1]||(e[1]=o("Wire the extension into your JIB build. The one property that must always be reachable is ",-1)),e[2]||(e[2]=t("code",null,"jeffreyHome",-1)),e[3]||(e[3]=o(" — either baked as an image ",-1)),e[4]||(e[4]=t("code",null,"ENV",-1)),e[5]||(e[5]=o(" default at build time (shown below) or provided at runtime via a ",-1)),e[6]||(e[6]=t("code",null,"JEFFREY_HOME",-1)),e[7]||(e[7]=o(" env var on the pod. See ",-1)),n(s,{to:"/docs/jib/configuration"},{default:a(()=>[...e[0]||(e[0]=[o("Configuration",-1)])]),_:1}),e[8]||(e[8]=o(" for the full property reference.",-1))]),e[11]||(e[11]=t("h2",{id:"gradle-setup"},"Gradle Setup",-1)),e[12]||(e[12]=t("p",null,[o("Add the extension as a dependency of the JIB Gradle plugin, then reference it from "),t("code",null,"pluginExtensions"),o(". If "),t("code",null,"jeffreyHome"),o(" is reachable neither here nor at runtime, the wrapper logs a warning and starts the app without profiling.")],-1)),e[13]||(e[13]=t("div",{class:"code-block"},[t("pre",null,[t("code",null,`jib {
  pluginExtensions {
    pluginExtension {
      implementation = "cafe.jeffrey.jib.gradle.JeffreyJibGradleExtension"
      properties = mapOf(
        "jeffreyHome" to "/shared/disk/jeffrey",
      )
    }
  }
}`)])],-1)),e[14]||(e[14]=t("p",null,[o("This builds an image whose wrapper resolves the provisioner from "),t("code",null,"${JEFFREY_HOME}/libs/current/provisioner-<arch>"),o(" on the shared volume you mount at that path. Every other property has a sensible default; you only set them to override.")],-1)),n(r,{type:"warning"},{default:a(()=>[...e[9]||(e[9]=[t("strong",null,[t("code",null,"jeffreyHome"),o(" must point at a shared volume / disk.")],-1),o(" Jeffrey Hub (with ",-1),t("code",null,"copy-libs.enabled=true",-1),o(") writes the provisioner binaries and libs to this path, and every monitored application pod must mount the ",-1),t("em",null,"same",-1),o(" volume at the ",-1),t("em",null,"same",-1),o(" path so its entrypoint wrapper can resolve ",-1),t("code",null,"${JEFFREY_HOME}/libs/current/provisioner-<arch>",-1),o(" at container start. A host-local directory or a per-pod ephemeral volume will not work — both endpoints need to see the bytes Jeffrey Hub published. ",-1)])]),_:1}),e[15]||(e[15]=i(`<p data-v-fc1b5d3a>Add explicit overrides via the string <code data-v-fc1b5d3a>properties</code> DSL — for example, gating via a Gradle property and pointing at a non-default shared volume. Referencing the key constants on <code data-v-fc1b5d3a>JeffreyJibConfig</code> keeps the build file typo-proof and auto-completable in the IDE:</p><div class="code-block" data-v-fc1b5d3a><pre data-v-fc1b5d3a><code data-v-fc1b5d3a>import cafe.jeffrey.jib.JeffreyJibConfig
import cafe.jeffrey.jib.gradle.JeffreyJibGradleExtension

jib {
  pluginExtensions {
    pluginExtension {
      implementation = JeffreyJibGradleExtension::class.java.name
      properties = mapOf(
        JeffreyJibConfig.JEFFREY_HOME to &quot;/shared/disk/jeffrey&quot;,
        JeffreyJibConfig.OVERRIDE_CONFIG to &quot;/jeffrey/jeffrey-overrides.conf&quot;,
      )
    }
  }
}</code></pre></div><p data-v-fc1b5d3a>The string form (<code data-v-fc1b5d3a>&quot;enabled&quot;</code>, <code data-v-fc1b5d3a>&quot;jeffreyHome&quot;</code>, …) works just as well and avoids the imports if you prefer a zero-dependency build script. Both are equivalent at runtime.</p>`,3)),n(r,{type:"info"},{default:a(()=>[...e[10]||(e[10]=[t("strong",null,[o("Why the "),t("code",null,"properties"),o(" DSL?")],-1),o(" It works on every Gradle version JIB supports. The typed ",-1),t("code",null,"configuration(Action<JeffreyJibConfig>) { … }",-1),o(" form is also accepted but is fragile across Gradle versions — prefer ",-1),t("code",null,"properties",-1),o(" for portability. ",-1)])]),_:1}),e[16]||(e[16]=i(`<p data-v-fc1b5d3a>Add the artifact to your build-script classpath (<code data-v-fc1b5d3a>buildscript.dependencies</code> or the <code data-v-fc1b5d3a>jib</code> plugin&#39;s <code data-v-fc1b5d3a>dependencies</code> block, depending on how you apply the plugin).</p><h2 id="maven-setup" data-v-fc1b5d3a>Maven Setup</h2><p data-v-fc1b5d3a>Attach the extension as a plugin dependency and reference it from <code data-v-fc1b5d3a>pluginExtensions</code>. As with Gradle, <code data-v-fc1b5d3a>jeffreyHome</code> must be reachable either here (baked as an image <code data-v-fc1b5d3a>ENV</code> default) or at runtime via a <code data-v-fc1b5d3a>JEFFREY_HOME</code> env var — otherwise the wrapper warns and starts the app without profiling.</p><div class="code-block" data-v-fc1b5d3a><pre data-v-fc1b5d3a><code data-v-fc1b5d3a>&lt;plugin&gt;
  &lt;groupId&gt;com.google.cloud.tools&lt;/groupId&gt;
  &lt;artifactId&gt;jib-maven-plugin&lt;/artifactId&gt;
  &lt;dependencies&gt;
    &lt;dependency&gt;
      &lt;groupId&gt;cafe.jeffrey-analyst&lt;/groupId&gt;
      &lt;artifactId&gt;jeffrey-jib-maven&lt;/artifactId&gt;
      &lt;version&gt;\${jeffrey-jib.version}&lt;/version&gt;
    &lt;/dependency&gt;
  &lt;/dependencies&gt;
  &lt;configuration&gt;
    &lt;pluginExtensions&gt;
      &lt;pluginExtension&gt;
        &lt;implementation&gt;cafe.jeffrey.jib.maven.JeffreyJibMavenExtension&lt;/implementation&gt;
        &lt;properties&gt;
          &lt;jeffreyHome&gt;/shared/disk/jeffrey&lt;/jeffreyHome&gt;
        &lt;/properties&gt;
      &lt;/pluginExtension&gt;
    &lt;/pluginExtensions&gt;
  &lt;/configuration&gt;
&lt;/plugin&gt;</code></pre></div><p data-v-fc1b5d3a>Add more properties the same way — each property name matches a setter on <code data-v-fc1b5d3a>JeffreyJibConfig</code>:</p><div class="code-block" data-v-fc1b5d3a><pre data-v-fc1b5d3a><code data-v-fc1b5d3a>&lt;properties&gt;
  &lt;enabled&gt;true&lt;/enabled&gt;
  &lt;jeffreyHome&gt;/shared/disk/jeffrey&lt;/jeffreyHome&gt;
  &lt;overrideConfig&gt;/jeffrey/jeffrey-overrides.conf&lt;/overrideConfig&gt;
&lt;/properties&gt;</code></pre></div>`,6))]),n(p)])}}}),D=y(E,[["__scopeId","data-v-fc1b5d3a"]]);export{D as default};
