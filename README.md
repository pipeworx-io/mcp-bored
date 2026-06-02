# mcp-bored

Bored MCP — wraps Bored API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_activity` | Get a random activity suggestion to cure boredom. Returns activity name, type, participant count, and price range. |
| `activity_by_type` | Find a random activity by category (e.g., \'cooking\', \'sport\', \'relaxation\'). Returns activity name, type, participants needed, and price range. |
| `activity_by_participants` | Find a random activity for a specific group size (e.g., 1 for solo, 4 for group). Returns activity name, type, and price range. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "bored": {
      "url": "https://gateway.pipeworx.io/bored/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Bored data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
