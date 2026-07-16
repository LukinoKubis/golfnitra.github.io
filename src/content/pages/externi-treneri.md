---
title: "Externí tréneri"
nav_order: 2
slug: "externi-treneri"
permalink: "/info-blok/externi-treneri/"
published: true
layout: layouts/page.njk
---

{{ external_trainers.intro }}

**Výhody pre externých trénerov:**

{% for perk in external_trainers.perks %}
- {{ perk }}
{% endfor %}

## Zoznam externých trénerov

<table class="trainers-table">
  <thead>
    <tr>
      <th>Meno</th>
      <th>Trieda</th>
      <th>Klub / Organizácia</th>
    </tr>
  </thead>
  <tbody>
    {% for t in external_trainers.trainers %}
    <tr>
      <td>{% if t.url %}<a href="{{ t.url }}" target="_blank" rel="noopener">{{ t.name }}</a>{% else %}{{ t.name }}{% endif %}</td>
      <td>{{ t.class }}</td>
      <td>{{ t.club }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

*{{ external_trainers.note }}*

---

## Otázky a odpovede

**{{ external_trainers.faq_question }}**

{{ external_trainers.faq_answer }}
