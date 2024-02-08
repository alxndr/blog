---
layout: splash
title: lipu Nasin Pona
tags: [toki pona, Tao Te Ching, Chinese]
---

## lipu Nasin Pona

A [Toki Pona] interpretation of [道德經 (Dao De Jing / Tao Te Ching)](https://en.wikipedia.org/wiki/Tao_Te_Ching), started by jan Lesate (aka Alexander), 2023…

{:style="font:italic 0.9em sans-serif"}
Many have started, few have finished!
[Please contribute](https://github.com/alxndr/blog/tree/main/lipu-nasin-pona) if you're so inclined!
Note that Toki Pona terms in italics are pending further consideration.

{% assign chapters = site.pages | where: "layout", "lipu-nasin-pona" %}

## lipu Nasin
<ol class="kasi kasi-nasin">
{% for kasi in chapters %}
  {% if kasi.chapter < 38 %}
    <li class="{{kasi.status}}" value={{kasi.chapter}}>
      <a href="{{kasi.url}}">{% if kasi.title %}{{kasi.title}}{% else %}kasi nanpa {{kasi.chapter}}{% endif %}</a>
    </li>
  {% endif %}
{% endfor %}
</ol>


## lipu Pona
<ol class="kasi kasi-pona">
{% for kasi in chapters %}
  {% if kasi.chapter > 37 %}
    <li class="{{kasi.status}}" value={{kasi.chapter}}>
      <a href="{{kasi.url}}">{% if kasi.title %}{{kasi.title}}{% else %}kasi nanpa {{kasi.chapter}}{% endif %}</a>
    </li>
  {% endif %}
{% endfor %}
</ol>


# Notes

* 道 — nasin — Tao / Dao; "The Way"[^Muller]
* 德 — pona — Dé; goodness, virtuous; "Power"[^Minford]; "Virtue"[^Muller]
* 天下 — ijo ale — "All-Under-Heaven"[^Minford]
* 圣人 — _o sina_ / jan sewi — "The Sage"[^Muller]
* sheng — mama — births (i.e. gives-birth-to)
* 玄 — nasa — mysterious, unknowable
* 争 — _wile_ — "struggle"[^Muller]
* 处 — _awen_ ? — "abide"[^Muller]
* 冬渉川 — tenpo ike la pali suli — a challenging endeavor, "crossing an ice-covered river"[^Muller]
* 神 — sewi — Shen; spirit(s), deity(ies), "power"[^Muller]
* 大顺 — ...
* 善 — ... _pona_
* 利 — tenpo kama, pona

The original text makes frequent reference to a social context in which gender is prescribed to be strictly binary.
I have chosen not to retain this duality imposed on a spectrum of people; instead I use "jan" to refer to persons generally, and include "tonsi" when enumerating categorizations of people.


## Acknowledgements

I studied contemporary and classical Chinese at [Oberlin College](https://oberlin.edu); 谢谢老师们!

I have used [ctext.org](https://ctext.org/dao-de-jing/ens) as the source for the text of the DaoDeJing.
I have used [mdbg.net](https://mdbg.net) as a reference for individual characters.

I have used [A.C. Muller's interpretation](http://www.acmuller.net/con-dao/daodejing.html) (with minor corrections or clarifications in brackets) for the English shown here. <!-- TODO remove it... -->
I am inspired by, and greatly informed by, [John Minford](https://johnminford.com/)'s 2018 [interpretation of (and research about) the DaoDeJing](https://www.johnminford.com/books).
I have also referred to interpretations by Gia-Fu Feng (1972), Victor H. Mair (1990), Derek Lin (1994), J.H. McDonald (1996), and Agnieszka Solska (2005), as seen via [Vít Brunner's Side By Side viewer](https://ttc.tasuki.org/display:Code:gff,vhm,dl,jhmd,as).

The [Toki Pona] language was created by jan Sonja.
My knowledge of it comes largely from the [kama sona](https://discord.gg/Sw42hJ6Qc9) and [ma pona pi toki pona](https://discord.gg/mapona) Discord communities.
I have used [nimi.li](https://nimi.li) as a reference for Toki Pona words.

<!-- I used [GNU Awk](https://www.gnu.org/software/gawk/manual/gawk.html) to along with [linku.la](https://linku.la)'s dataset to calculate statistics about the words used. -->

The [seal script](https://en.wikipedia.org/wiki/Seal_script) Chinese font is [方正小篆体 FangZheng XiaoZhuanTi via ChineseFontDesign.com](https://chinesefontdesign.com/fang-zheng-xiao-zhuan-ti-font-traditional-chinese.html).

These pages (and [my entire blog](https://alxndr.blog)) are hosted on GitHub Pages.
The domain name is registered via NameCheap.



<style>
  .kasi {
    padding-left: 1em;
    column-width: 8em;
  }
  .kasi li a {
    margin-right: 1em;
  }
  .kasi .done a {
    font-size: 1.1em;
  }
  .kasi .wip {
    opacity: 0.8;
  }
  .kasi .wip a {
    font-style: italic;
  }
  .kasi .ready {
    opacity: 0.5;
  }
  .kasi .ready a {
    color: gray;
    text-decoration: none;
  }
  .kasi .notready {
    opacity: 0.6;
  }
  .kasi .notready a {
    color: gray;
    text-decoration: none;
    font-style: italic;
  }
</style>

[^Minford]: Minford, John. "Tao Te Ching: The Tao and the Power". 2018; Viking / Penguin Random House.
[^Muller]: Muller, A Charles. "Daode Jing". 1991–2021; retrieved 2023. http://www.acmuller.net/con-dao/daodejing.html

[Toki Pona]: https://tokipona.org
