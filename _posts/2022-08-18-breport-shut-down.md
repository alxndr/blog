---
layout: post
title: BReport is dead; long live the microlith
tags: [Bleacher Report, SDLC, monolith, microservices, Ruby on Rails]
---

**We did it — we finally retired BReport!!**


## 🎆💪🎊🕺🥂🙌🍾🤘🎉🥳

BReport was the legacy website which had been the entirety of [Bleacher Report]'s value proposition from 2007 (if not earlier) through 2014 (when we declared Tech Bankruptcy on the codebase and began porting its features elsewhere).

* In 2014, the [Engineering Department] began building new services and infrastructure to replicate the old features we wanted to keep (while also building new features as requested by Product / Revenue).
* By 2015, BReport was no longer involved in coordinating or distributing the content for our Mobile Apps.
* By 2018, all public-facing web content had been ported away from BReport.
* July 6 2022: The entire Content team began using a new "greenfield" rewrite of our content management front-end.
* July 26 2022: Ops pulled the plug on BReport's API façade.
* August 11 2022: Ops routed all network traffic away from BReport (and Junction).
* August 15 2022: Ops decomissioned BReport's production web infrastructure.

![the hardware-smashing scene from 'Office Space'](https://i.imgur.com/yxdIPmU.gif){:style="width:50%;margin-left:25%"}


#### _The beast is slain_

BReport's final resting state is [Ruby] 1.8.7 [REE] (EOL'd in 2012) on [Rails] 2.3 LTS (thank you [Makandra]).
After seven years of active development and eight years of 'maintenance mode', the repository's main branch had received 62594 commits via 5148 merged PRs from 51 authors.
(It also had a previous life as a Subversion repo, but that was before my time.)

It has been replaced by a web of systems: custom APIs using [Elixir] and [Phoenix] powering custom front-ends using [NodeJS] and [React], custom caching rules powered by [Fastly], and custom behavior in [native](https://apps.apple.com/app/apple-store/id418075935) [mobile](https://play.google.com/store/apps/details?id=com.bleacherreport.android.teamstream) and TV-top apps.

To the many Individual Contributors to this repo (and the constellation of repos which replaced it), thank you and congratulations to us all:

<ul style="columns:4 8em">
  <li>Aaron W</li>
  <li>Alex R</li>
  <li>Alex S</li>
  <li>Amanda S</li>
  <li>Amit S</li>
  <li>Andrew W</li>
  <li>Anisha G</li>
  <li>Anton S</li>
  <li>Ashley H</li>
  <li>Axel M</li>
  <li>Ben B</li>
  <li>Ben M</li>
  <li>Benson W</li>
  <li>Brad H</li>
  <li>Brady B</li>
  <li>Brian H</li>
  <li>Brian L</li>
  <li>Brijal S</li>
  <li>Caique M</li>
  <li>Chance F</li>
  <li>Charlie P</li>
  <li>Chris K</li>
  <li>Chris P</li>
  <li>Chuya G</li>
  <li>Dan G</li>
  <li>Dan P</li>
  <li>Daniel B</li>
  <li>David L</li>
  <li>David P</li>
  <li>David T</li>
  <li>Deon C</li>
  <li>Dustin E</li>
  <li>Eddie D</li>
  <li>Elijah C</li>
  <li>Ellie H</li>
  <li>Felix R</li>
  <li>Fisayomi O</li>
  <li>Frulwinn C</li>
  <li>George H</li>
  <li>Gration C</li>
  <li>Greg Me.</li>
  <li>Greg Mo.</li>
  <li>Gregory W</li>
  <li>Hemin P</li>
  <li>Jaime F</li>
  <li>Jason S</li>
  <li>Jeff U</li>
  <li>Jeffrey Q</li>
  <li>Jessica D</li>
  <li>Jimmy H</li>
  <li>Jocelyn S</li>
  <li>John D</li>
  <li>John G</li>
  <li>John K</li>
  <li>John L</li>
  <li>Jory R</li>
  <li>Josh Y</li>
  <li>Kameron N</li>
  <li>Kathy K</li>
  <li>Kenneth C</li>
  <li>Kenneth K</li>
  <li>Kevin S</li>
  <li>Leo T</li>
  <li>Lucas N</li>
  <li>Marc M</li>
  <li>Marcos F</li>
  <li>Mark G</li>
  <li>Marisa K</li>
  <li>Marjan P</li>
  <li>Matheus C</li>
  <li>Matt Mi.</li>
  <li>Matt P</li>
  <li>Michael C</li>
  <li>Michael Sc.</li>
  <li>Michael Sm.</li>
  <li>Mitchell H</li>
  <li>Moffat G</li>
  <li>Neil M</li>
  <li>Nick C</li>
  <li>Pancham M</li>
  <li>Patrick M</li>
  <li>Paul H</li>
  <li>Paulo S</li>
  <li>Pedro C</li>
  <li>Pete H</li>
  <li>Quentin T</li>
  <li>Raimond G</li>
  <li>Richard D</li>
  <li>Richard K</li>
  <li>Richard L</li>
  <li>Rukayat O</li>
  <li>Ryan R</li>
  <li>Ryan W</li>
  <li>Santosh S</li>
  <li>Sam Pa.</li>
  <li>Sam Po.</li>
  <li>Sonny L</li>
  <li>Sonny S</li>
  <li>Stephen S</li>
  <li>Steve Oh.</li>
  <li>Steve Op.</li>
  <li>Steve P</li>
  <li>Steven L</li>
  <li>Thia A</li>
  <li>Tim Q</li>
  <li>Tirell M</li>
  <li>Tom B</li>
  <li>Tony L</li>
  <li>Tory B</li>
  <li>Travis G</li>
  <li>Trevor B</li>
  <li>Trevor W</li>
  <li>Tung N</li>
  <li>Tyler L</li>
  <li>Victor T</li>
  <li>Victor O</li>
  <li>Vidya V</li>
  <li>William C</li>
  <li>William S</li>
  <li>Winton W</li>
  <li>...and many contractors</li>
  <li>...plus all of QA!</li>
  <li>...and all of Ops!</li>
  <li>...and our many Designers!</li>
</ul>

Special shout-out to Pete, Eddie, and Pedro — we stuck the landing!


#### A reluctant Tip of the Hat

...to Amazon, for forcing our hand.

Engineering was never able to effectively advocate for paying off this tech debt.
Partially I think this is because it was difficult to estimate the time requirements and cost-of-inaction any more accurately than "a lot" and "hard to tell".
In practice, it accelerated the burnout of dozens of engineers, frustrated dozens more, and was a near-continual source of difficult and intermittent bugs which demanded attention and energy from the very engineers who were trying to replace it.

Still, we did it!

Sam P, Ross S, Chris N, Miguel D, Matt Mo., Dave M, Melissa B, Dushyant S, Chris P — this is me bragging.


# 🥂🍾

Programming Tools is next...


[Bleacher Report]: https://bleacherreport.com
[Elixir]: https://elixir-lang.org
[Engineering Department]: https://dev.bleacherreport.com
[Fastly]: https://fastly.com
[Makandra]: https://makandra.com
[NodeJS]: https://nodejs.org
[Phoenix]: https://www.phoenixframework.org
[REE]: http://www.rubyenterpriseedition.com
[Rails]: https://rubyonrails.org
[React]: https://reactjs.org
[Ruby]: https://www.ruby-lang.org
