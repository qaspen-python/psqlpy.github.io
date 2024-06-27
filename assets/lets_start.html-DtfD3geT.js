import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as p,c,d as r,w as e,a as t,e as d,b as n}from"./app-z_3kWU-V.js";const u={},h=t("h2",{id:"installation",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#installation"},[t("span",null,"Installation")])],-1),m=t("p",null,"You can install psqlpy with pip, poetry or directly from git using pip:",-1),y=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[n("pip "),t("span",{class:"token function"},"install"),n(` psqlpy
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"})])],-1),v=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[n("poetry "),t("span",{class:"token function"},"add"),n(` psqlpy
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"})])],-1),k=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[n("pip "),t("span",{class:"token function"},"install"),n(` git+https://github.com/qaspen-python/psqlpy
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"})])],-1),b=d(`<p>After installation you are ready to start querying!</p><h2 id="first-request-to-the-database" tabindex="-1"><a class="header-anchor" href="#first-request-to-the-database"><span>First request to the database</span></a></h2><p>There is a minimal example of what you need to do to send your first query and receive result. Let&#39;s assume that we have table <code>users</code>:</p><table><thead><tr><th style="text-align:center;">id</th><th style="text-align:center;">name</th><th style="text-align:center;">username</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">Aleksandr</td><td style="text-align:center;">chandr-andr</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">Michail</td><td style="text-align:center;">insani7y</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Final

<span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> ConnectionPool<span class="token punctuation">,</span> QueryResult


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token comment"># It uses default connection parameters</span>
    db_pool<span class="token punctuation">:</span> Final <span class="token operator">=</span> ConnectionPool<span class="token punctuation">(</span><span class="token punctuation">)</span>

    results<span class="token punctuation">:</span> Final<span class="token punctuation">[</span>QueryResult<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM users WHERE id = $1&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    dict_results<span class="token punctuation">:</span> Final<span class="token punctuation">[</span><span class="token builtin">list</span><span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> results<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>
    db<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>You must call <code>close()</code> on database pool when you application is shutting down.</p></div><div class="hint-container caution"><p class="hint-container-title">Caution</p><p>You must not use <code>ConnectionPool.execute</code> method in high-load production code! It pulls new connection from connection pull each call. Recommended way to make queries is executing them with <code>Connection</code>, <code>Transaction</code> or <code>Cursor</code>.</p></div>`,7);function g(f,_){const i=l("Tabs");return p(),c("div",null,[h,m,r(i,{id:"6",data:[{id:"pip"},{id:"poetry"},{id:"git"}]},{title0:e(({value:a,isActive:s})=>[n("pip")]),title1:e(({value:a,isActive:s})=>[n("poetry")]),title2:e(({value:a,isActive:s})=>[n("git")]),tab0:e(({value:a,isActive:s})=>[y]),tab1:e(({value:a,isActive:s})=>[v]),tab2:e(({value:a,isActive:s})=>[k]),_:1}),b])}const w=o(u,[["render",g],["__file","lets_start.html.vue"]]),A=JSON.parse(`{"path":"/introduction/lets_start.html","title":"Let's Start","lang":"en-US","frontmatter":{"title":"Let's Start","description":"Installation You can install psqlpy with pip, poetry or directly from git using pip: After installation you are ready to start querying! First request to the database There is a...","head":[["meta",{"property":"og:url","content":"https://qaspen-python.github.io/introduction/lets_start.html"}],["meta",{"property":"og:site_name","content":"PSQLPy"}],["meta",{"property":"og:title","content":"Let's Start"}],["meta",{"property":"og:description","content":"Installation You can install psqlpy with pip, poetry or directly from git using pip: After installation you are ready to start querying! First request to the database There is a..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-06-27T22:50:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T22:50:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Let's Start\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-27T22:50:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Installation","slug":"installation","link":"#installation","children":[]},{"level":2,"title":"First request to the database","slug":"first-request-to-the-database","link":"#first-request-to-the-database","children":[]}],"git":{"createdTime":1719528603000,"updatedTime":1719528603000,"contributors":[{"name":"chandr-andr (Kiselev Aleksandr)","email":"chandr@chandr.net","commits":1}]},"filePathRelative":"introduction/lets_start.md","localizedDate":"June 27, 2024","autoDesc":true,"excerpt":"<h2>Installation</h2>\\n<p>You can install psqlpy with pip, poetry or directly from git using pip:</p>\\n\\n<p>After installation you are ready to start querying!</p>\\n<h2>First request to the database</h2>\\n<p>There is a minimal example of what you need to do to send your first query and receive result.\\nLet's assume that we have table <code>users</code>:</p>"}`);export{w as comp,A as data};