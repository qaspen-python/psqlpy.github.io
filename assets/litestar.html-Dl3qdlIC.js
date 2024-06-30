import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-BF1qP4zM.js";const p={},o=t(`<p>There is the default example for <code>Litestar</code> framework.</p><p>We strongly recommend to use the following example as a standard way to use <code>PSQLPy</code> with <code>Litestar</code> framework.</p><h2 id="complete-example" tabindex="-1"><a class="header-anchor" href="#complete-example"><span>Complete example</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># Start example</span>
<span class="token keyword">from</span> __future__ <span class="token keyword">import</span> annotations

<span class="token keyword">from</span> typing <span class="token keyword">import</span> Any<span class="token punctuation">,</span> cast

<span class="token keyword">import</span> uvicorn
<span class="token keyword">from</span> litestar <span class="token keyword">import</span> Litestar<span class="token punctuation">,</span> Request<span class="token punctuation">,</span> get
<span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> ConnectionPool


<span class="token keyword">def</span> <span class="token function">start_db_pool</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Litestar<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> ConnectionPool<span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Return the db pool.

    If it doesn&#39;t exist, creates it and saves it in on the application state object
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token string">&quot;db_pool&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool <span class="token operator">=</span> ConnectionPool<span class="token punctuation">(</span>
            dsn<span class="token operator">=</span><span class="token string">&quot;postgres://postgres:postgres@localhost:5432/postgres&quot;</span><span class="token punctuation">,</span>
            max_db_pool_size<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>

    <span class="token keyword">return</span> cast<span class="token punctuation">(</span><span class="token string">&quot;ConnectionPool&quot;</span><span class="token punctuation">,</span> app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">stop_db_pool</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Litestar<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Close database connection pool.&quot;&quot;&quot;</span>
    <span class="token keyword">if</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token string">&quot;engine&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        db_pool <span class="token operator">=</span> cast<span class="token punctuation">(</span>ConnectionPool<span class="token punctuation">,</span> app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>
        db_pool<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@get</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">pg_pool_example</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> Request<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    db_pool <span class="token operator">=</span> cast<span class="token punctuation">(</span>ConnectionPool<span class="token punctuation">,</span> request<span class="token punctuation">.</span>app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    query_result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM users&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> query_result<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>


app <span class="token operator">=</span> Litestar<span class="token punctuation">(</span>
    <span class="token punctuation">[</span>pg_pool_example<span class="token punctuation">]</span><span class="token punctuation">,</span>
    on_startup<span class="token operator">=</span><span class="token punctuation">[</span>start_db_pool<span class="token punctuation">]</span><span class="token punctuation">,</span>
    on_shutdown<span class="token operator">=</span><span class="token punctuation">[</span>stop_db_pool<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
        <span class="token string">&quot;start_example:app&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","litestar.html.vue"]]),d=JSON.parse(`{"path":"/usage/frameworks/litestar.html","title":"Litestar","lang":"en-US","frontmatter":{"title":"Litestar","description":"There is the default example for Litestar framework. We strongly recommend to use the following example as a standard way to use PSQLPy with Litestar framework. Complete example","head":[["meta",{"property":"og:url","content":"https://qaspen-python.github.io/usage/frameworks/litestar.html"}],["meta",{"property":"og:site_name","content":"PSQLPy"}],["meta",{"property":"og:title","content":"Litestar"}],["meta",{"property":"og:description","content":"There is the default example for Litestar framework. We strongly recommend to use the following example as a standard way to use PSQLPy with Litestar framework. Complete example"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-06-30T15:41:43.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T15:41:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Litestar\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-30T15:41:43.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Complete example","slug":"complete-example","link":"#complete-example","children":[]}],"git":{"createdTime":1719762103000,"updatedTime":1719762103000,"contributors":[{"name":"chandr-andr (Kiselev Aleksandr)","email":"chandr@chandr.net","commits":1}]},"filePathRelative":"usage/frameworks/litestar.md","localizedDate":"June 30, 2024","autoDesc":true,"excerpt":"<p>There is the default example for <code>Litestar</code> framework.</p>\\n<p>We strongly recommend to use the following example as a standard way to use <code>PSQLPy</code> with <code>Litestar</code> framework.</p>\\n<h2>Complete example</h2>\\n<div class=\\"language-python\\" data-ext=\\"py\\" data-title=\\"py\\"><pre class=\\"language-python\\"><code><span class=\\"token comment\\"># Start example</span>\\n<span class=\\"token keyword\\">from</span> __future__ <span class=\\"token keyword\\">import</span> annotations\\n\\n<span class=\\"token keyword\\">from</span> typing <span class=\\"token keyword\\">import</span> Any<span class=\\"token punctuation\\">,</span> cast\\n\\n<span class=\\"token keyword\\">import</span> uvicorn\\n<span class=\\"token keyword\\">from</span> litestar <span class=\\"token keyword\\">import</span> Litestar<span class=\\"token punctuation\\">,</span> Request<span class=\\"token punctuation\\">,</span> get\\n<span class=\\"token keyword\\">from</span> psqlpy <span class=\\"token keyword\\">import</span> ConnectionPool\\n\\n\\n<span class=\\"token keyword\\">def</span> <span class=\\"token function\\">start_db_pool</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">:</span> Litestar<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> ConnectionPool<span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token triple-quoted-string string\\">\\"\\"\\"Return the db pool.\\n\\n    If it doesn't exist, creates it and saves it in on the application state object\\n    \\"\\"\\"</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token keyword\\">not</span> <span class=\\"token builtin\\">getattr</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"db_pool\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token boolean\\">None</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span>\\n        app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">.</span>db_pool <span class=\\"token operator\\">=</span> ConnectionPool<span class=\\"token punctuation\\">(</span>\\n            dsn<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"postgres://postgres:postgres@localhost:5432/postgres\\"</span><span class=\\"token punctuation\\">,</span>\\n            max_db_pool_size<span class=\\"token operator\\">=</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token punctuation\\">)</span>\\n\\n    <span class=\\"token keyword\\">return</span> cast<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"ConnectionPool\\"</span><span class=\\"token punctuation\\">,</span> app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">.</span>db_pool<span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">def</span> <span class=\\"token function\\">stop_db_pool</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">:</span> Litestar<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token boolean\\">None</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token triple-quoted-string string\\">\\"\\"\\"Close database connection pool.\\"\\"\\"</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token builtin\\">getattr</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"engine\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token boolean\\">None</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span>\\n        db_pool <span class=\\"token operator\\">=</span> cast<span class=\\"token punctuation\\">(</span>ConnectionPool<span class=\\"token punctuation\\">,</span> app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">.</span>db_pool<span class=\\"token punctuation\\">)</span>\\n        db_pool<span class=\\"token punctuation\\">.</span>close<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token decorator annotation punctuation\\">@get</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"/\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">def</span> <span class=\\"token function\\">pg_pool_example</span><span class=\\"token punctuation\\">(</span>request<span class=\\"token punctuation\\">:</span> Request<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token builtin\\">list</span><span class=\\"token punctuation\\">[</span><span class=\\"token builtin\\">dict</span><span class=\\"token punctuation\\">[</span>Any<span class=\\"token punctuation\\">,</span> Any<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">:</span>\\n    db_pool <span class=\\"token operator\\">=</span> cast<span class=\\"token punctuation\\">(</span>ConnectionPool<span class=\\"token punctuation\\">,</span> request<span class=\\"token punctuation\\">.</span>app<span class=\\"token punctuation\\">.</span>state<span class=\\"token punctuation\\">.</span>db_pool<span class=\\"token punctuation\\">)</span>\\n    connection <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">await</span> db_pool<span class=\\"token punctuation\\">.</span>connection<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    query_result <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">await</span> connection<span class=\\"token punctuation\\">.</span>execute<span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token string\\">\\"SELECT * FROM users\\"</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">return</span> query_result<span class=\\"token punctuation\\">.</span>result<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n\\napp <span class=\\"token operator\\">=</span> Litestar<span class=\\"token punctuation\\">(</span>\\n    <span class=\\"token punctuation\\">[</span>pg_pool_example<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n    on_startup<span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">[</span>start_db_pool<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n    on_shutdown<span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">[</span>stop_db_pool<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n\\n<span class=\\"token keyword\\">if</span> __name__ <span class=\\"token operator\\">==</span> <span class=\\"token string\\">\\"__main__\\"</span><span class=\\"token punctuation\\">:</span>\\n    uvicorn<span class=\\"token punctuation\\">.</span>run<span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token string\\">\\"start_example:app\\"</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">)</span>\\n\\n</code></pre></div>"}`);export{k as comp,d as data};