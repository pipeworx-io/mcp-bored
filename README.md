# @pipeworx/mcp-bored

MCP server for the [Bored API](https://bored-api.appbrewery.com) — random activity suggestions filtered by type or number of participants. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `random_activity` | Get a random activity suggestion |
| `activity_by_type` | Get activity by category (education, social, diy, etc.) |
| `activity_by_participants` | Get activity for a specific group size |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "bored": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/bored"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/bored
```

## License

MIT
