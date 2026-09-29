---
title: running a local LLM on MacOS
slug: 2026/09/29/running-a-local-LLM-on-MacOS
publishDate: 2026-09-29
tags: [AI, MacOS, howto, tooling]
---

With reports that [Zhipu AI](https://z.ai)'s open-weight model GLM-5.2 is beating Anthropic's Claude Opus 4.8 [on (some) benchmarks](https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/), I wanted to see if I could run it on my beefy MacBook Pro (Apple M5 chip, 16GB of RAM, 800+GB disk space).

...but even the 1-quantization model (the smallest file size) fails to launch in [`unsloth`](https://unsloth.ai)'s web UX:

> Failed to load model: llama-server was stopped by the operating system (signal 9), most likely out of memory. Try a smaller or more quantized GGUF, lower the context length, or free memory (on WSL, raise the memory limit in .wslconfig).

So then I looked into [MLX](https://opensource.apple.com/projects/mlx/), "an array framework optimized for the unified memory architecture of Apple silicon"... but in my brief time poking at the agents available on HuggingFace I still didn't find one that would run on my MacBook.

Looking around on the web, I got the message that the RAM space is a significant factor, and tasking the computer with keeping MacOS responsive alongside doing LLM stuff might be a little too much to ask. Instead I found a used Mac Mini with lots of RAM on eBay.


## running `north-mini-code-1.0` on a Mac Mini with 64GB RAM

Hardware: 2018 Mac Mini
* CPU: 3.0GHz i5 6-Core (Intel)
* memory: 64GB (on a headless setup, ollama reports `available="56.0 GiB"`)
* disk: 256GB SSD

I poked at gemma4 and Qwen a bit, but eventually came across [`north-mini-code-1.0`](https://ollama.com/library/north-mini-code-1.0).

Started with (per Claude):

```shell
$ ollama pull north-mini-code-1.0
$ ollama run north-mini-code-1.0 --verbose
```

Asked it "what time is it?" which it can't answer... but prompt eval was 50.5 token/sec, response eval was 12.0 token/sec. Pretty decent.

Then I told it to fix a bug in a local repo, which it also can't do without a harness... prompt eval 56.9 t/s, response eval 10.6 t/s.

The Intarwebs recommended using OpenCode as a harness...

### `north-mini-code` with OpenCode harness

Install:

```shell
$ curl -fsSL https://opencode.ai/install | sh
```

Configure:

```jsonc
// ~/.config/opencode/opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "north-mini-code-1.0": {
          "name": "North Mini Code 1.0",
          "interleaved": {
            "field": "reasoning"
          },
          "limit": {
            "context": 256000,
            "output": 64000
          }
        }
      }
    }
  }
}
```

Note from Claude Code:

> `"interleaved": { "field": "reasoning" }` is the key setting from Cohere's
documented config — it tells OpenCode to carry the model's reasoning/thinking
output forward into subsequent steps rather than discarding it, which is the
behavior this model depends on for good agentic performance.

...then I `cd`'d into a codebase, started up the harness with `opencode`, and gave it a coding task which it performed admirably and in a reasonable amount of time!
