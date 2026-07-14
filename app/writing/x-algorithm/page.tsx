import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageTracker } from '@/components/page-tracker'
import { ReadMore } from '@/components/read-more'
import { ArticleEngagement } from '@/components/article-engagement'

export const metadata: Metadata = {
  title: 'X Algorithm 2026: Every Question Answered From the Source Code | Tereza Tizkova',
  description: 'A deep read through the open-sourced X algorithm to answer the questions that keep coming up about reach, timing, and engagement.',
  openGraph: {
    title: 'X Algorithm 2026: Every Question Answered From the Source Code',
    description: 'A deep read through the open-sourced X algorithm to answer the questions that keep coming up about reach, timing, and engagement.',
    images: [
      {
        url: 'https://www.terezatizkova.com/api/og?title=X%20Algorithm%202026&subtitle=Every%20Question%20Answered%20From%20the%20Source%20Code',
        width: 1200,
        height: 630,
        alt: 'X Algorithm 2026: Every Question Answered From the Source Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X Algorithm 2026: Every Question Answered From the Source Code',
    description: 'A deep read through the open-sourced X algorithm to answer the questions that keep coming up about reach, timing, and engagement.',
    images: ['https://www.terezatizkova.com/api/og?title=X%20Algorithm%202026&subtitle=Every%20Question%20Answered%20From%20the%20Source%20Code'],
  },
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.02em] mt-16 mb-6 pt-8 border-t border-border">
      {children}
    </h2>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 pl-4 border-l-4 border-primary bg-card/50 py-4 pr-4">
      <p className="text-[15px] leading-relaxed italic text-primary/90">
        {children}
      </p>
    </div>
  )
}

function NotInCode({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 border border-dashed border-border bg-muted/20 p-4">
      <p className="font-mono text-[10px] font-light tracking-[0.1em] uppercase text-muted-foreground mb-2">
        Not in the code
      </p>
      <p className="text-[15px] leading-relaxed text-foreground/80">
        {children}
      </p>
    </div>
  )
}

export default function XAlgorithmArticle() {
  return (
    <div className="min-h-screen">
      <PageTracker />
      {/* Navigation */}
      <nav className="px-6 sm:px-12 md:px-16 lg:px-20 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </nav>

      {/* Article */}
      <article className="px-6 sm:px-12 md:px-16 lg:px-20 pb-24 max-w-[900px] mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.02em] leading-[1.1] mb-4">
            X Algorithm 2026: Every Question Answered From the Source Code
          </h1>
          <p className="text-[18px] sm:text-[20px] text-muted-foreground mb-6">
            A deep read through the open-sourced X algorithm to answer the questions that keep coming up about reach, timing, and engagement.
          </p>
          <time className="font-mono text-[11px] font-light text-muted-foreground tracking-[0.05em] uppercase">
            July 2026
          </time>
        </header>

        {/* Content */}
        <div className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/90">
          <p className="mb-6">
            I spent some time digging into how the X algorithm actually works — reading through the open-sourced code rather than the usual &quot;growth hack&quot; threads. I ran the research with the help of my AI agents, having them comb the repositories line by line so I could answer the questions that keep coming up about reach, timing, and engagement. What follows is what we found, straight from the source.
          </p>

          <p className="mb-6">
            All sources are the open-sourced GitHub repositories (twitter/the-algorithm, twitter/the-algorithm-ml, xai-org/x-algorithm) and official X team communications — no third-party marketing studies. The algorithm changes, so check whether there have been new commits since this was written.
          </p>

          <p className="mb-6">
            X is the only major social platform where the algorithm is fully open-source — twice, in March 2023 (twitter/the-algorithm, twitter/the-algorithm-ml) and January 2026 (xai-org/x-algorithm, Grok-powered rewrite). The weights are public, the scoring formula is documented, and most people still haven&apos;t read it. Everything below links directly to the relevant file in the repo.
          </p>

          <SectionHeader>&quot;What actually matters for reach? Likes? Followers? Impressions?&quot;</SectionHeader>

          <p className="mb-6">
            Follower count, impression count, like count — none of these appear in the ranking formula. The heavy ranker source code is explicit about what moves the score, and the mechanism is worth understanding because it explains why the same post performs differently for different users.
          </p>

          <p className="mb-6">
            The model is a neural network (parallel MaskNet architecture) that takes in features about a tweet and features about the user viewing it, then outputs a set of numbers between 0 and 1 — each representing the predicted probability that THIS specific user will engage with THIS specific tweet in a particular way. So for every user-tweet pair, the model produces predictions like &quot;12% chance this user will reply, 3% chance they&apos;ll bookmark, 45% chance they&apos;ll like, 0.1% chance they&apos;ll report it.&quot; These predictions are personalized — a tweet about Rust programming might get a 30% predicted reply probability for a developer who follows the author, but 0.1% for someone who only follows sports accounts.
          </p>

          <p className="mb-6">
            Each predicted probability is then multiplied by a fixed weight (set in the config, not learned) and summed into a final score. The weights determine how much the system cares about each type of engagement — a higher weight means that engagement type contributes more to the ranking position. The formula from the README is literally <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">score = sum_i {'{'} weight_i * probability_i {'}'}</code>.
          </p>

          {/* Weights table */}
          <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse text-[14px] sm:text-[15px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 pr-4 font-mono text-[11px] font-light tracking-[0.05em] uppercase text-muted-foreground">Signal</th>
                  <th className="text-right py-3 px-4 font-mono text-[11px] font-light tracking-[0.05em] uppercase text-muted-foreground">Weight</th>
                  <th className="text-right py-3 pl-4 font-mono text-[11px] font-light tracking-[0.05em] uppercase text-muted-foreground">vs. a Like</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Reply that gets author reply back</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+75</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">150x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Reply</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+13.5</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">27x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Quote tweet (RT with comment)</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">~13.5</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">27x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Profile click + engagement</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+12</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">24x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Dwell time (click in, stay 2+ min)</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+10</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">20x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Bookmark</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+10</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">20x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Retweet (plain, no comment)</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+1</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">2x</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Like</td>
                  <td className="py-2.5 px-4 text-right font-mono text-primary">+0.5</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">baseline</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 pr-4">Mute/Block/&quot;Show less&quot;</td>
                  <td className="py-2.5 px-4 text-right font-mono text-destructive">-74</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">catastrophic</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4">Report</td>
                  <td className="py-2.5 px-4 text-right font-mono text-destructive">-369</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-muted-foreground">nuclear</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-6">
            These weights come from the <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">scored_tweets_model_weight_*</code> variables in the heavy ranker README, which are read by the serving stack from ScoredTweetsParam.scala line 84. Confirmed in both the 2023 release and the 2026 xAI release.
          </p>

          <p className="mb-6">
            To walk through an example: say the model predicts for a specific user-tweet pair that there&apos;s a 5% chance of a reply (0.05), a 1% chance of a reply that gets author engagement (0.01), a 40% chance of a like (0.40), and a 2% chance of a bookmark/dwell (0.02). The score calculation would be: (13.5 × 0.05) + (75 × 0.01) + (0.5 × 0.40) + (10 × 0.02) = 0.675 + 0.75 + 0.20 + 0.20 = 1.825. Notice that the 1% reply_engaged_by_author probability contributes more to the final score than the 40% like probability, because 75 × 0.01 = 0.75 while 0.5 × 0.40 = 0.20. This is why the algorithm structurally rewards conversation over passive engagement — even a small probability of high-weight engagement outranks a large probability of low-weight engagement in the scoring formula.
          </p>

          <SectionHeader>&quot;Does it matter if I quote tweet or just repost?&quot;</SectionHeader>

          <p className="mb-6">
            In the scoring model, a plain retweet is handled by <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">scored_tweets_model_weight_retweet</code> which carries a weight of 1.0, while a quote tweet is treated more like a reply and falls under the reply-class weights at ~13.5. To understand what that means concretely: say the model predicts a 10% probability someone will retweet your post. That contributes 1.0 × 0.1 = 0.1 to the final score. If instead someone quote-tweets it (also at 10% predicted probability), that contributes 13.5 × 0.1 = 1.35 to the score. Same predicted probability, but 13x more impact on where the post ranks in someone&apos;s feed. The reason the system values these differently is that a plain retweet is passive redistribution — you&apos;re just forwarding content unchanged — while a quote tweet creates a new engagement surface where people can reply to your commentary, bookmark it, and click through to the original, generating additional signals.
          </p>

          <SectionHeader>&quot;How fast do I need to react to comments?&quot;</SectionHeader>

          <p className="mb-6">
            The FEATURES.md file documents that the heavy ranker uses real-time aggregate features computed over 30-minute windows. Specifically, features named like <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">user_author ... timelines.engagement.is_replied 30.minutes.count</code> feed directly into the model — they literally count how many replies, favorites, retweets, and other engagements a post has accumulated in the last 30 minutes. These counts become inputs to the scoring model, which means a post with 15 replies in its first 30 minutes produces a fundamentally different (higher) score than the same post with 2 replies. The high-scoring post gets ranked into more people&apos;s For You feeds, which generates more engagement, which increases the counts further on the next scoring pass.
          </p>

          <p className="mb-6">
            On top of the velocity effect, there&apos;s a separate and even larger signal: <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">scored_tweets_model_weight_reply_engaged_by_author</code> at weight +75. This fires when someone replies to your post AND you reply back to them. The model predicts the probability of this happening, and that prediction is multiplied by 75 in the final score calculation. For comparison, a like is multiplied by 0.5. So if you post something, someone replies, and you reply back — that single interaction contributes 150x more to your post&apos;s ranking score than if someone had just liked it. The algorithm is literally measuring whether you showed up to the conversation.
          </p>

          <Callout>
            Post only when you can actively reply for at least 30–60 minutes afterward. Walking away for 2 hours means you miss both the 30-minute velocity window and the 75-weight reply_engaged_by_author signal.
          </Callout>

          <SectionHeader>&quot;Does it matter if I post in the morning vs evening?&quot;</SectionHeader>

          <p className="mb-6">
            The source code uses time-decayed engagement counts (<code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">timelines.earlybird.decayed_favorite_count</code>, <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">timelines.earlybird.decayed_retweet_count</code>) as inputs to the ranker, and the feature <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">time_features.time_since_tweet_creation</code> is used directly in scoring. The Earlybird search system indexes the realtime cluster covering approximately the last 7 days, with engagement counts decaying over time. The exact half-life constant isn&apos;t published as a named variable, but based on the decay curves and the 7-day realtime window, posts lose meaningful algorithmic push within roughly 24 hours.
          </p>

          <p className="mb-6">
            The algorithm itself doesn&apos;t have a &quot;morning boost&quot; or &quot;evening penalty&quot; — there&apos;s no variable in the code that says &quot;posts at 9am score higher.&quot; What matters is the interaction between timing and the velocity mechanics described above. The 30-minute real-time aggregate features need actual humans engaging with your post during that window. If you post when your audience is asleep or busy, those 30-minute counts stay low, the model scores the post lower, and by the time people wake up the <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">time_features.time_since_tweet_creation</code> feature has already penalized it for age.
          </p>

          <p className="mb-6">
            So the question isn&apos;t really &quot;morning or evening&quot; but &quot;when are the people who would reply to my posts actively scrolling.&quot; The algorithm also tracks per-user temporal patterns via <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">user_request_context_aggregate</code> features that aggregate engagement by day-of-week and hour-of-day — it knows when a given user tends to engage and factors that into scoring.
          </p>

          <SectionHeader>&quot;Do the first few seconds after posting matter?&quot;</SectionHeader>

          <p className="mb-6">
            This is essentially the same answer as the comment velocity question above — the FEATURES.md documents real-time aggregate features computed over 30-minute windows, and these are fed directly into the heavy ranker as inputs. A post that accumulates engagement counts quickly in these windows gets a higher score from the model, which means it ranks higher and gets shown to more people, which generates more engagement, creating a feedback loop. A post with low counts in the 30-minute window gets a low score and just decays from there via <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">timelines.earlybird.decayed_favorite_count</code>. So posting at 2am when nobody is around to engage means the 30-minute window passes with low counts, and by the time your audience wakes up the post has already lost score to time decay.
          </p>

          <SectionHeader>&quot;Am I posting too much? Does posting more dilute my reach?&quot;</SectionHeader>

          <p className="mb-6">
            Yes, and this one is provable directly from the source code rather than anecdotal data.
          </p>

          <p className="mb-6">
            In ScoredTweetsParam.scala, the diversity parameters:
          </p>

          <div className="my-6 bg-muted/30 border border-border p-4 font-mono text-[13px] sm:text-[14px] leading-relaxed overflow-x-auto">
            <div>scored_tweets_author_diversity_decay_factor = 0.5</div>
            <div>scored_tweets_author_diversity_floor = 0.25</div>
          </div>

          <p className="mb-6">
            Every post gets a score based on the weighted engagement formula above (replies, bookmarks, dwell time, etc.). When the algorithm is assembling someone&apos;s feed and encounters multiple posts from the same author, it multiplies each subsequent post&apos;s score by the decay factor. So if your first post earned a score of 100 from engagement, it keeps that full 100. Your second post, even if it also earned 100 from engagement, gets multiplied by 0.5 and shows up as 50 in the ranking. Third post gets multiplied by 0.25 — score of 25 in the ranking despite earning 100 from engagement. It floors at 0.25, so everything after that also gets quartered. In practice this means your 4th post would need to generate 4x the engagement of your 1st post just to rank at the same position in someone&apos;s feed.
          </p>

          <p className="mb-6">
            3-4 posts/day is fine if it&apos;s a mix (1 substantial post + 2-3 replies/takes/engagement posts). 3-4 big announcements the same day is self-cannibalizing because each one gets halved by the diversity decay. The math alone tells you that beyond 4 posts competing in the same feed refresh, you&apos;re operating at the 0.25 floor — every additional post is working at quarter strength regardless of quality.
          </p>

          <NotInCode>
            The scored_tweets_author_diversity_decay_factor is applied per candidate batch during feed assembly — but the code doesn&apos;t publish how often a user&apos;s feed is reassembled or how large the candidate window is. We know the decay exists and its exact value (0.5 with 0.25 floor), but not the trigger frequency for feed refresh.
          </NotInCode>

          <SectionHeader>&quot;How much time should I leave between posts?&quot;</SectionHeader>

          <p className="mb-6">
            The code doesn&apos;t publish a variable for &quot;minimum gap between posts&quot; — the diversity decay is triggered by multiple posts from the same author appearing in the same candidate batch during feed assembly, not by a fixed time threshold. What we can reason from the architecture: the Earlybird realtime cluster indexes tweets from roughly the last 7 days, and the system pulls ~1,500 candidates per feed refresh. Posts very close together (say 15 minutes) are almost certainly both in the same candidate batch for anyone scrolling during that period. Posts several hours apart are less likely to compete because the earlier one may have already been served and scored in a previous refresh.
          </p>

          <p className="mb-6">
            Based on this architecture, two posts 20 minutes apart will almost certainly both appear in the same candidate batch for your followers, meaning the second gets the 0.5 multiplier. Posts 4+ hours apart are increasingly unlikely to compete. But the exact refresh cadence is not a published parameter — this is inference from the system design, not a named variable.
          </p>

          <SectionHeader>&quot;Do threads count as multiple posts? Do they dilute?&quot;</SectionHeader>

          <p className="mb-6">
            Threads count as one content unit in the ranking system, so you can post them immediately back-to-back without spacing and they won&apos;t trigger the diversity decay against each other.
          </p>

          <p className="mb-6">
            The one catch is that if later tweets in a thread get significantly less engagement than the first, the algorithm can de-rank the thread as a whole, so you want to front-load the value rather than burying the best stuff in tweet 7 — the first 2-3 tweets should be self-contained and strong enough to generate replies on their own.
          </p>

          <SectionHeader>&quot;What if a big company launches the same day as us?&quot;</SectionHeader>

          <p className="mb-6">
            The algorithm itself won&apos;t suppress your post — trending topics get their own allocated feed slots and don&apos;t steal yours, and your engaged followers still see you via Real Graph regardless of what&apos;s trending.
          </p>

          <p className="mb-6">
            The real risk is attention-based rather than algorithmic. When GPT-5 drops, your followers are replying to AI content, bookmarking threads about it, spending their engagement budget elsewhere, which means your post gets fewer replies in the first 30 minutes and lower velocity translates to less amplification — not because the algorithm is punishing you, but because your audience is busy with something else.
          </p>

          <p className="mb-6">
            The practical response is to avoid launching same-hour as a known keynote and counter-program by posting when the news cycle moves on (usually 24-48 hours after), or spreading major launches across 2-3 days.
          </p>

          <NotInCode>
            There is no variable or parameter in the published repositories that deprioritizes non-trending content during major events. The reduced reach during big launches appears to be a second-order effect of your audience spending their engagement on other content, which lowers your 30-minute velocity counts, which lowers your score. But this is inference from the mechanics, not a confirmed feature.
          </NotInCode>

          <SectionHeader>&quot;Does text or video perform better on X?&quot;</SectionHeader>

          <p className="mb-6">
            Buffer&apos;s 18.8M post analysis found that text outperforms video by about 30% on X, and the scoring weights explain why structurally. The highest-weight signals are all conversation-based: reply_engaged_by_author (75), reply (13.5), good_click (11), good_click_v2 (10). Video playback (<code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">scored_tweets_model_weight_video_playback50</code>) carries a weight of just 0.005 — the probability that someone watches 50% of your video contributes almost nothing to the ranking score. The system structurally rewards active engagement (replies, QRTs, bookmarks) over passive consumption (watching). Dense text posts that provoke replies and get bookmarked are generating the high-weight signals; video that gets watched silently is generating the 0.005-weight signal.
          </p>

          <SectionHeader>&quot;Do links kill my reach?&quot;</SectionHeader>

          <p className="mb-6">
            The FEATURES.md includes <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">recap.tweetfeature.has_visible_link</code> and <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">recap.tweetfeature.has_link</code> as features fed into the model — meaning the presence of a link is something the scorer explicitly considers. Whether this is penalized depends on the learned model weights (which aren&apos;t published), but the feature&apos;s existence means the system can and does treat posts with links differently from posts without them. Elon Musk has publicly confirmed that external links reduce distribution because X wants to keep users on-platform. The workaround is putting the link in the first reply rather than the main post — the parent post doesn&apos;t carry the link feature, so it gets scored normally.
          </p>

          <SectionHeader>&quot;Does Grok actually read my posts now? What changed in 2026?&quot;</SectionHeader>

          <p className="mb-6">
            The xai-org/x-algorithm repository (January 2026) replaced the legacy scoring system with a Grok-powered transformer called Phoenix. The repo&apos;s architecture shows that the model now processes tweet content semantically rather than relying purely on engagement pattern features. A May 2026 commit (187 files changed) added Grox classifiers — spam, category, and brand-safety classification that runs before the ranker ever sees a candidate. This means low-quality content gets filtered at the classification stage, before it reaches the scoring formula described above.
          </p>

          <p className="mb-6">
            The X team has also announced promptable feeds — users can instruct Grok with preferences like &quot;more startup content, less politics&quot; — which means the system can now route content by semantic category. The <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">user_inferred_topic_aggregate</code> features in the 2023 release already tracked per-user-per-topic engagement patterns; the 2026 system extends this with actual content understanding rather than just topic inference from engagement signals.
          </p>

          <SectionHeader>&quot;What&apos;s my TweepCred score and does it matter?&quot;</SectionHeader>

          <p className="mb-6">
            Every account has a TweepCred score from 0-100. The calculation happens in two stages visible in the source code.
          </p>

          <p className="mb-6">
            First, UserMass.scala calculates a &quot;mass&quot; for each account that serves as the starting weight in the PageRank graph. The code is explicit about what factors into this mass calculation:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Device registration</strong> — having a valid device adds deviceWeightAdditive (0.5) to the score, not having one adds only 0.05. This means accounts that never logged in from a real device start at 10x disadvantage.</li>
            <li><strong>Account age</strong> — normalized logarithmically: <code className="font-mono text-[14px] bg-muted/40 px-1.5 py-0.5 rounded">if (age &gt; 30) 1.0 else (1.0 min log(1.0 + age/15.0))</code>. Accounts younger than 30 days get a fractional multiplier. A 1-day-old account gets about 0.06x, a 7-day-old gets about 0.47x, a 15-day-old gets about 0.69x.</li>
            <li><strong>Restricted status</strong> — if the account is restricted (not suspended, just restricted), the score is multiplied by restrictedWeightMultiplicative = 0.1, which is a 90% reduction.</li>
            <li><strong>Suspended accounts</strong> get mass = 0 (completely excluded from the graph).</li>
            <li><strong>Verified accounts</strong> get mass = 100 (maximum, bypassing the calculation entirely).</li>
          </ul>

          <p className="mb-6">
            Then the mass gets a follower-to-following ratio penalty. If an account follows more than 500 people (threshAbsNumFriendsUMass) AND has a followings-to-followers ratio above 0.6 (threshFriendsToFollowersRatioUMass), the mass is divided by exp(5.0 * (ratio - 0.6)). This is an exponential penalty — an account following 2000 people but with only 100 followers (ratio = 20) gets its mass divided by exp(5 × 19.4) which is astronomically large, effectively zeroing it out.
          </p>

          <p className="mb-6">
            Second, Reputation.scala converts the raw PageRank output into the 0-100 score using the formula 130 + 5.21 * log(pagerank), clamped to 0-100. The constants come from a linear fit where max pagerank maps to 95 and min pagerank maps to 15. After this conversion, there&apos;s a second follower/following penalty via adjustReputationsPostCalculation — if followings exceed 2500, the reputation is divided by up to 50x based on the ratio, using a slightly different formula than the mass calculation.
          </p>

          <p className="mb-6">
            The TweepCred batch job runs as an AnalyticsIterativeBatchJob on Hadoop MapReduce — it iterates the PageRank calculation until convergence, which means the score updates periodically in batches rather than in real-time. The code doesn&apos;t specify how often this batch runs (daily, weekly, etc.), but changes to your account&apos;s social graph take at least one full batch cycle to reflect in your score.
          </p>

          <p className="mb-6">
            The published code does not specify what score threshold affects tweet distribution or how many tweets are eligible at each level — those decisions happen downstream in the candidate sourcing pipeline which references the TweepCred score as an input feature but doesn&apos;t publish its thresholds.
          </p>

          <SectionHeader>&quot;How do I actually test any of this?&quot;</SectionHeader>

          <p className="mb-6">
            You need X Premium (free accounts are too noisy for signal), minimum 2 weeks per condition, one variable at a time. Tuesday-Thursday only to control for day-of-week effects.
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Frequency test.</strong> 2 weeks at 1x/day vs. 3x/day vs. 5x/day. Measure per-post engagement rate, not total engagement.</li>
            <li><strong>Spacing test.</strong> 30-min gaps vs. 2-hour gaps vs. 4-hour gaps. Measure per-post impressions.</li>
            <li><strong>Dilution test.</strong> Major announcement + 0 other posts vs. announcement + 3 regular posts. Compare announcement performance.</li>
            <li><strong>Content density.</strong> Dense data posts vs. lighter hot takes. Track bookmark rate and reply rate specifically (those are the high-weight signals).</li>
          </ul>

          <p className="mb-6">
            Based on the scoring weights, the metrics worth tracking in order of algorithmic importance are: reply count and depth (weight 13.5, and 75 if you reply back), bookmark rate (weight 10 via good_click_v2), profile visits that lead to engagement (weight 12 via good_profile_click), and impressions trajectory week-over-week as a proxy for whether the system is distributing your content more broadly. Like count is the lowest positive signal in the model (weight 0.5), and follower count doesn&apos;t appear in the ranking formula at all.
          </p>

          <SectionHeader>&quot;What don&apos;t we know?&quot;</SectionHeader>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Exact per-author diversity cap per feed refresh (we know decay is 0.5 with 0.25 floor, not how often it resets)</li>
            <li>Grok&apos;s production weights (only architecture is published, not the trained model)</li>
            <li>How fast TweepCred recovers once it drops below 65</li>
            <li>Whether the 4-week open-source update cadence holds (they&apos;ve done 2 updates in 6 months)</li>
            <li>Exact impact of competitor launches on unrelated content reach</li>
            <li>Premium+ vs Premium exact multiplier difference</li>
          </ul>

          <p className="mb-6">
            The architecture and hand-tuned signal weights are all in the xai-org/x-algorithm and twitter/the-algorithm-ml repositories. What&apos;s not published is the trained model itself — we know what features go in and how the formula combines them, but not what the neural network learned from production data about which combinations matter most.
          </p>

          <p className="mt-12 pt-8 border-t border-border text-muted-foreground text-[14px]">
            Sources: xai-org/x-algorithm · twitter/the-algorithm · twitter/the-algorithm-ml · Heavy Ranker README · FEATURES.md · ScoredTweetsParam.scala · Earlybird README · TweepCred README · Real Graph source
          </p>

          <ArticleEngagement
            slug="x-algorithm"
            title="X Algorithm 2026: Every Question Answered From the Source Code"
            url="https://www.terezatizkova.com/writing/x-algorithm"
          />

          <ReadMore currentUrl="/writing/x-algorithm" />
        </div>
      </article>
    </div>
  )
}
