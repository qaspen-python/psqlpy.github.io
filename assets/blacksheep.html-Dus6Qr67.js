import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as t,o as p}from"./app-DsL8Igpq.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<p>There is the default example for <code>Blacksheep</code> framework.</p><p>We strongly recommend to use the following example as a standard way to use <code>PSQLPy</code> with <code>Blacksheep</code> framework.</p><h2 id="complete-example" tabindex="-1"><a class="header-anchor" href="#complete-example"><span>Complete example</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># Start example</span>
<span class="token keyword">from</span> __future__ <span class="token keyword">import</span> annotations

<span class="token keyword">from</span> typing <span class="token keyword">import</span> Any

<span class="token keyword">import</span> uvicorn
<span class="token keyword">from</span> blacksheep <span class="token keyword">import</span> Application<span class="token punctuation">,</span> get
<span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> ConnectionPool


app <span class="token operator">=</span> Application<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>on_start</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">on_start</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Application<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Create a database pool and saves it in the application state.&quot;&quot;&quot;</span>
    db_pool <span class="token operator">=</span> ConnectionPool<span class="token punctuation">(</span>
        dsn<span class="token operator">=</span><span class="token string">&quot;postgres://postgres:postgres@localhost:5432/postgres&quot;</span><span class="token punctuation">,</span>
        max_db_pool_size<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    app<span class="token punctuation">.</span>services<span class="token punctuation">.</span>add_instance<span class="token punctuation">(</span>db_pool<span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>on_stop</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">on_stop</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Application<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Close a database pool if it exists in app scope.&quot;&quot;&quot;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        db_pool <span class="token operator">=</span> app<span class="token punctuation">.</span>services<span class="token punctuation">.</span>resolve<span class="token punctuation">(</span>ConnectionPool<span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception<span class="token punctuation">:</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        db_pool<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@get</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">pg_pool_example</span><span class="token punctuation">(</span>db_pool<span class="token punctuation">:</span> ConnectionPool<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    query_result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM users&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> query_result<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
        <span class="token string">&quot;start_example:app&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const u=s(e,[["render",o],["__file","blacksheep.html.vue"]]),r=JSON.parse('{"path":"/usage/frameworks/blacksheep.html","title":"Blacksheep","lang":"en-US","frontmatter":{"title":"Blacksheep","description":"There is the default example for Blacksheep framework. We strongly recommend to use the following example as a standard way to use PSQLPy with Blacksheep framework. Complete exa...","head":[["meta",{"property":"og:url","content":"https://psqlpy-python.github.io/usage/frameworks/blacksheep.html"}],["meta",{"property":"og:site_name","content":"PSQLPy"}],["meta",{"property":"og:title","content":"Blacksheep"}],["meta",{"property":"og:description","content":"There is the default example for Blacksheep framework. We strongly recommend to use the following example as a standard way to use PSQLPy with Blacksheep framework. Complete exa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-09-19T20:31:21.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-19T20:31:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Blacksheep\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-19T20:31:21.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Complete example","slug":"complete-example","link":"#complete-example","children":[]}],"git":{"createdTime":1726777881000,"updatedTime":1726777881000,"contributors":[{"name":"chandr-andr (Kiselev Aleksandr)","email":"chandr@chandr.net","commits":1}]},"filePathRelative":"usage/frameworks/blacksheep.md","localizedDate":"September 19, 2024","autoDesc":true,"excerpt":"<p>There is the default example for <code>Blacksheep</code> framework.</p>\\n<p>We strongly recommend to use the following example as a standard way to use <code>PSQLPy</code> with <code>Blacksheep</code> framework.</p>\\n<h2>Complete example</h2>\\n<div class=\\"language-python\\" data-ext=\\"py\\" data-title=\\"py\\"><pre class=\\"language-python\\"><code><span class=\\"token comment\\"># Start example</span>\\n<span class=\\"token keyword\\">from</span> __future__ <span class=\\"token keyword\\">import</span> annotations\\n\\n<span class=\\"token keyword\\">from</span> typing <span class=\\"token keyword\\">import</span> Any\\n\\n<span class=\\"token keyword\\">import</span> uvicorn\\n<span class=\\"token keyword\\">from</span> blacksheep <span class=\\"token keyword\\">import</span> Application<span class=\\"token punctuation\\">,</span> get\\n<span class=\\"token keyword\\">from</span> psqlpy <span class=\\"token keyword\\">import</span> ConnectionPool\\n\\n\\napp <span class=\\"token operator\\">=</span> Application<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token decorator annotation punctuation\\">@app<span class=\\"token punctuation\\">.</span>on_start</span>\\n<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">def</span> <span class=\\"token function\\">on_start</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">:</span> Application<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token boolean\\">None</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token triple-quoted-string string\\">\\"\\"\\"Create a database pool and saves it in the application state.\\"\\"\\"</span>\\n    db_pool <span class=\\"token operator\\">=</span> ConnectionPool<span class=\\"token punctuation\\">(</span>\\n        dsn<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"postgres://postgres:postgres@localhost:5432/postgres\\"</span><span class=\\"token punctuation\\">,</span>\\n        max_db_pool_size<span class=\\"token operator\\">=</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">)</span>\\n    app<span class=\\"token punctuation\\">.</span>services<span class=\\"token punctuation\\">.</span>add_instance<span class=\\"token punctuation\\">(</span>db_pool<span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token decorator annotation punctuation\\">@app<span class=\\"token punctuation\\">.</span>on_stop</span>\\n<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">def</span> <span class=\\"token function\\">on_stop</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">:</span> Application<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token boolean\\">None</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token triple-quoted-string string\\">\\"\\"\\"Close a database pool if it exists in app scope.\\"\\"\\"</span>\\n    <span class=\\"token keyword\\">try</span><span class=\\"token punctuation\\">:</span>\\n        db_pool <span class=\\"token operator\\">=</span> app<span class=\\"token punctuation\\">.</span>services<span class=\\"token punctuation\\">.</span>resolve<span class=\\"token punctuation\\">(</span>ConnectionPool<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">except</span> Exception<span class=\\"token punctuation\\">:</span>\\n        <span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span>\\n    <span class=\\"token keyword\\">else</span><span class=\\"token punctuation\\">:</span>\\n        db_pool<span class=\\"token punctuation\\">.</span>close<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token decorator annotation punctuation\\">@get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"/\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">def</span> <span class=\\"token function\\">pg_pool_example</span><span class=\\"token punctuation\\">(</span>db_pool<span class=\\"token punctuation\\">:</span> ConnectionPool<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token builtin\\">list</span><span class=\\"token punctuation\\">[</span><span class=\\"token builtin\\">dict</span><span class=\\"token punctuation\\">[</span>Any<span class=\\"token punctuation\\">,</span> Any<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">:</span>\\n    connection <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">await</span> db_pool<span class=\\"token punctuation\\">.</span>connection<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    query_result <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">await</span> connection<span class=\\"token punctuation\\">.</span>execute<span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token string\\">\\"SELECT * FROM users\\"</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">return</span> query_result<span class=\\"token punctuation\\">.</span>result<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token keyword\\">if</span> __name__ <span class=\\"token operator\\">==</span> <span class=\\"token string\\">\\"__main__\\"</span><span class=\\"token punctuation\\">:</span>\\n    uvicorn<span class=\\"token punctuation\\">.</span>run<span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token string\\">\\"start_example:app\\"</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">)</span>\\n</code></pre></div>"}');export{u as comp,r as data};
