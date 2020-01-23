---
layout: null
sitemap: false
---

{% assign default_paths = site.pages | map: "path" %}
{% assign page_paths = site.data.theme.navigation_pages | default: default_paths %}

var store = [

  {% for path in page_paths %}
    {% assign doc = site.pages | where: "path", path | first %}
    {
      "title": {{ doc.title | jsonify }},
      "excerpt":
      {%- if site.search_full_content == true -%}
        {{ doc.content |
          replace:"</p>", " " |
          replace:"</h1>", " " |
          replace:"</h2>", " " |
          replace:"</h3>", " " |
          replace:"</h4>", " " |
          replace:"</h5>", " " |
          replace:"</h6>", " "|
        strip_html | strip_newlines | jsonify }},
      {%- else -%}
        {{ doc.content |
          replace:"</p>", " " |
          replace:"</h1>", " " |
          replace:"</h2>", " " |
          replace:"</h3>", " " |
          replace:"</h4>", " " |
          replace:"</h5>", " " |
          replace:"</h6>", " "|
        strip_html | strip_newlines | truncatewords: 50 | jsonify }},
      {%- endif -%}
      "categories": {{ doc.categories | jsonify }},
      "tags": {{ doc.tags | jsonify }},
      "url": {{ doc.url | absolute_url | jsonify }}
    },
  {%- endfor -%}

  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp: 'doc', 'doc.search != false' -%}
    {%- for doc in docs -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
        {%- if site.search_full_content == true -%}
          {{ doc.content |
            replace:"</p>", " " |
            replace:"</h1>", " " |
            replace:"</h2>", " " |
            replace:"</h3>", " " |
            replace:"</h4>", " " |
            replace:"</h5>", " " |
            replace:"</h6>", " "|
          strip_html | strip_newlines | jsonify }},
        {%- else -%}
          {{ doc.content |
            replace:"</p>", " " |
            replace:"</h1>", " " |
            replace:"</h2>", " " |
            replace:"</h3>", " " |
            replace:"</h4>", " " |
            replace:"</h5>", " " |
            replace:"</h6>", " "|
          strip_html | strip_newlines | truncatewords: 50 | jsonify }},
        {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }}
      } {%- unless forloop.last and l -%}, {%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}
]
