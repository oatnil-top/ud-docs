---
title: "漏掉一笔之后，账本为什么越来越难继续"
description: "漏记真正破坏的是对账本的信任。一次可核对的对账如何找出遗漏、重复、退款和旧数据问题，把人的工作缩小到判断与确认。"
authors: [lintao]
tags: [story, agents]
date: 2026-07-30
---

一笔没记上，最先坏掉的往往不是月度统计，而是你对这本账的信任。

你知道它已经不准了。下次打开账本时，补记这一笔还不够：前面是不是也漏了？同一笔会不会在两个渠道里各记了一次？退款到账以后，原来的支出有没有冲掉？这些问题只要有一个答不上来，继续记录就像在一张歪掉的表上补数字。

很多人就是从这里停下来的。不是不想记，而是不想再为一份自己都不信的结果花时间。

<!-- truncate -->

最近的一次真实对账覆盖了四个月、多个支付和银行渠道，以及上百笔已有记录。开始之前，并不知道问题藏在哪里。对完以后，漏记、重复、退款和旧数据问题同时浮了出来：

- 有些支出出现在账单里，却没有进入账本；
- 有些消费在不同渠道各留下了一条记录；
- 有些已记支出后来被全额退回，原记录却还在统计里；
- 还有一批旧记录缺少日期，因此从按月统计中消失了。

其中任何一类问题，靠回忆都很难补全。尤其是退款和缺少日期的旧记录，它们看起来不像错误，只会悄悄改变统计结果。

<svg role="img" aria-labelledby="duplicate-title duplicate-desc" viewBox="0 0 1200 520" width="100%" xmlns="http://www.w3.org/2000/svg">
  <title id="duplicate-title">The same purchase appearing in multiple channels</title>
  <desc id="duplicate-desc">Three outlined channel records with no identifying details converge through dashed lines into one suspected duplicate group, which is sent to a human for confirmation.</desc>
  <rect x="1" y="1" width="1198" height="518" fill="white" stroke="black" strokeWidth="2" />
  <text x="600" y="58" textAnchor="middle" fill="black" fontSize="30" fontWeight="700">ONE PURCHASE, MULTIPLE RECORDS</text>
  <line x1="335" y1="72" x2="865" y2="72" stroke="black" strokeWidth="2" />

  <rect x="70" y="130" width="250" height="94" fill="none" stroke="black" strokeWidth="2" />
  <text x="195" y="168" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">CHANNEL A</text>
  <text x="195" y="199" textAnchor="middle" fill="black" fontSize="18">sample record</text>

  <rect x="70" y="260" width="250" height="94" fill="none" stroke="black" strokeWidth="2" />
  <text x="195" y="298" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">CHANNEL B</text>
  <text x="195" y="329" textAnchor="middle" fill="black" fontSize="18">sample record</text>

  <rect x="70" y="390" width="250" height="70" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 8" />
  <text x="195" y="433" textAnchor="middle" fill="black" fontSize="20">EXISTING LEDGER</text>

  <line x1="320" y1="177" x2="515" y2="280" stroke="black" strokeWidth="2" strokeDasharray="10 8" />
  <line x1="320" y1="307" x2="515" y2="304" stroke="black" strokeWidth="2" strokeDasharray="10 8" />
  <line x1="320" y1="425" x2="515" y2="328" stroke="black" strokeWidth="2" strokeDasharray="10 8" />

  <ellipse cx="650" cy="303" rx="135" ry="78" fill="none" stroke="black" strokeWidth="4" />
  <text x="650" y="291" textAnchor="middle" fill="black" fontSize="23" fontWeight="700">POSSIBLE</text>
  <text x="650" y="324" textAnchor="middle" fill="black" fontSize="23" fontWeight="700">DUPLICATE</text>
  <line x1="574" y1="337" x2="726" y2="337" stroke="black" strokeWidth="2" />

  <line x1="785" y1="303" x2="936" y2="303" stroke="black" strokeWidth="3" />
  <path d="M 936 303 L 918 293 M 936 303 L 918 313" fill="none" stroke="black" strokeWidth="3" />

  <rect x="936" y="248" width="205" height="110" fill="none" stroke="black" strokeWidth="4" />
  <text x="1038" y="291" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">HUMAN</text>
  <text x="1038" y="324" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">CONFIRMS</text>
  <line x1="971" y1="337" x2="1105" y2="337" stroke="black" strokeWidth="2" />
</svg>

### 先对清楚，再动账本

这次对账没有让 agent 读完账单就直接改数据。

它先把账单和已有记录逐条比对，交出一份分析：哪些可以确认是漏记，哪些疑似跨渠道重复，哪些可能已经退款，哪些需要人决定。这个阶段只给证据，不写入、不删除。

人要做的是判断。某类转账算不算消费，一笔退款该怎样归类，两条重复记录保留哪一条，这些都取决于个人的记账口径。人确认处理方案之后，agent 才按确认过的清单写入和修正。

写完也不是结束。它重新读取账本，把处理后的笔数和金额与确认清单核对；涉及去重或删除时，每条都保留记录标识、处理原因和结果。这样可以从结论一路查回原始记录，也能发现写入过程本身有没有出错。

可核对，比“自动完成”重要。自动化如果只给一句“已经帮你记好了”，人仍然不知道它漏了什么、合并了什么。分析在前、确认后写入、写完再回读，才让这件事可以放心交出去。

<svg role="img" aria-labelledby="audit-title audit-desc" viewBox="0 0 1200 450" width="100%" xmlns="http://www.w3.org/2000/svg">
  <title id="audit-title">An auditable reconciliation workflow</title>
  <desc id="audit-desc">A five-step black-and-white flow moves from analysis to human confirmation, writing, reading back and checking, then retaining an audit trail. A dashed boundary separates review from mutation.</desc>
  <rect x="1" y="1" width="1198" height="448" fill="white" stroke="black" strokeWidth="2" />
  <text x="600" y="58" textAnchor="middle" fill="black" fontSize="30" fontWeight="700">RECONCILIATION YOU CAN AUDIT</text>
  <line x1="370" y1="72" x2="830" y2="72" stroke="black" strokeWidth="2" />

  <text x="238" y="112" textAnchor="middle" fill="black" fontSize="17">REVIEW ONLY</text>
  <line x1="50" y1="122" x2="427" y2="122" stroke="black" strokeWidth="1" strokeDasharray="8 7" />
  <text x="814" y="112" textAnchor="middle" fill="black" fontSize="17">CHANGES BEGIN AFTER APPROVAL</text>
  <line x1="447" y1="122" x2="1150" y2="122" stroke="black" strokeWidth="1" strokeDasharray="8 7" />

  <rect x="50" y="178" width="180" height="108" fill="none" stroke="black" strokeWidth="2" />
  <text x="140" y="222" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">ANALYZE</text>
  <text x="140" y="253" textAnchor="middle" fill="black" fontSize="17">show evidence</text>

  <line x1="230" y1="232" x2="278" y2="232" stroke="black" strokeWidth="3" />
  <path d="M 278 232 L 263 223 M 278 232 L 263 241" fill="none" stroke="black" strokeWidth="3" />

  <rect x="278" y="178" width="180" height="108" fill="none" stroke="black" strokeWidth="4" />
  <text x="368" y="220" textAnchor="middle" fill="black" fontSize="21" fontWeight="700">HUMAN</text>
  <text x="368" y="249" textAnchor="middle" fill="black" fontSize="21" fontWeight="700">CONFIRMS</text>
  <line x1="314" y1="263" x2="422" y2="263" stroke="black" strokeWidth="2" />

  <line x1="458" y1="232" x2="506" y2="232" stroke="black" strokeWidth="3" />
  <path d="M 506 232 L 491 223 M 506 232 L 491 241" fill="none" stroke="black" strokeWidth="3" />

  <rect x="506" y="178" width="160" height="108" fill="none" stroke="black" strokeWidth="2" />
  <text x="586" y="222" textAnchor="middle" fill="black" fontSize="22" fontWeight="700">WRITE</text>
  <text x="586" y="253" textAnchor="middle" fill="black" fontSize="17">approved list</text>

  <line x1="666" y1="232" x2="714" y2="232" stroke="black" strokeWidth="3" />
  <path d="M 714 232 L 699 223 M 714 232 L 699 241" fill="none" stroke="black" strokeWidth="3" />

  <rect x="714" y="178" width="190" height="108" fill="none" stroke="black" strokeWidth="2" />
  <text x="809" y="217" textAnchor="middle" fill="black" fontSize="21" fontWeight="700">READ BACK</text>
  <text x="809" y="248" textAnchor="middle" fill="black" fontSize="17">check count + total</text>

  <line x1="904" y1="232" x2="952" y2="232" stroke="black" strokeWidth="3" />
  <path d="M 952 232 L 937 223 M 952 232 L 937 241" fill="none" stroke="black" strokeWidth="3" />

  <rect x="952" y="178" width="198" height="108" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 7" />
  <text x="1051" y="217" textAnchor="middle" fill="black" fontSize="21" fontWeight="700">AUDIT TRAIL</text>
  <text x="1051" y="248" textAnchor="middle" fill="black" fontSize="17">record + reason</text>

  <line x1="140" y1="338" x2="1051" y2="338" stroke="black" strokeWidth="2" />
  <line x1="140" y1="326" x2="140" y2="350" stroke="black" strokeWidth="2" />
  <line x1="1051" y1="326" x2="1051" y2="350" stroke="black" strokeWidth="2" />
  <text x="596" y="380" textAnchor="middle" fill="black" fontSize="20">Every conclusion can be traced back to its evidence.</text>
</svg>

### 漏记不再意味着从头再来

账本不需要靠每天零失误才能成立。月底把不同来源的账单交给 agent，它会把账单和已有记录放在一起检查，漏掉的会浮出来。偶尔忘记一笔，不会让前面的记录全部失去价值。

重复也不需要靠肉眼猜。相似的时间、金额和描述只能构成线索，拿不准的记录会被单独列出，留给人判断，而不是静默合并。

人的工作因此缩小到少数真正需要判断的地方：定口径、看证据、做确认。逐笔翻账单、交叉比对、补写、回读核对，则交给 agent。

当一次对账能说明它看过什么、准备改什么、实际改了什么，漏记就只是一项待处理的问题，不再是放弃整本账的理由。
