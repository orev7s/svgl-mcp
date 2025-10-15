# SVGL MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

A Model Context Protocol (MCP) server for the [SVGL API](https://svgl.app) - providing access to a beautiful library of SVG logos. Use this server to search, retrieve, and work with SVG logos from popular brands, frameworks, libraries, and more directly in your MCP-compatible applications like Claude Desktop or Windsurf.

## ✨ Features

This MCP server provides tools to:
- 🎨 **Get all SVG logos** (with optional limit)
- 📁 **Filter SVGs by category** (software, framework, library, ai, database, etc.)
- 🔍 **Search SVGs by title**
- 📝 **Get SVG code** (optimized or raw)
- 📊 **List all available categories** with counts

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/orev7s/svgl-mcp.git
cd svgl-mcp
npm install
npm run build
```

### Configuration

Add to your MCP settings file:

#### Claude Desktop

Edit your Claude Desktop config file:
- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "svgl": {
      "command": "node",
      "args": ["/absolute/path/to/svgl-mcp/dist/index.js"]
    }
  }
}
```

#### Windsurf

Edit your Windsurf MCP settings file (usually `~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "svgl": {
      "command": "node",
      "args": ["/absolute/path/to/svgl-mcp/dist/index.js"]
    }
  }
}
```

> **Note**: Replace `/absolute/path/to/svgl-mcp` with the actual path where you cloned the repository.

After adding the configuration, restart your MCP client.

## 📚 Available Tools

### 1. `get_all_svgs`
Get all SVG logos from the library.

**Parameters:**
- `limit` (optional): Number of SVGs to return

**Example usage in Claude/Windsurf:**
> "Get me 10 SVG logos"

### 2. `get_svgs_by_category`
Filter SVGs by category.

**Parameters:**
- `category` (required): Category name (e.g., "software", "framework", "library", "ai", "database")

**Example usage:**
> "Show me all framework SVG logos"
> "Get all database logos"

### 3. `search_svgs`
Search for SVGs by title.

**Parameters:**
- `query` (required): Search query

**Example usage:**
> "Search for React logo"
> "Find OpenAI SVG"

### 4. `get_svg_code`
Get the SVG code for a specific logo.

**Parameters:**
- `filename` (required): SVG filename (e.g., "react.svg")
- `optimize` (optional, default: true): Whether to optimize the SVG using svgo

**Example usage:**
> "Get the SVG code for react.svg"
> "Show me the Next.js logo code"

### 5. `get_categories`
Get all available categories with their counts.

**Example usage:**
> "List all SVG categories"
> "What categories are available?"

## 🛠️ Development

Want to contribute or modify the server? Here's how to get started:

```bash
# Clone the repository
git clone https://github.com/orev7s/svgl-mcp.git
cd svgl-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev
```

### Project Structure
```
svgl-mcp/
├── src/
│   ├── index.ts       # Main MCP server implementation
│   └── types.ts       # TypeScript type definitions
├── dist/              # Compiled JavaScript output
├── package.json       # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## 📖 API Documentation

This server uses the [SVGL API](https://svgl.app/docs/api). Please review their documentation for:
- API limitations and rate limits
- Complete list of available categories
- SVG data structure and formats

## Response Format

### SVG Object
```typescript
{
  id: number;
  title: string;
  category: string | string[];
  route: string | { dark: string; light: string };
  url: string;
  wordmark?: string | { dark: string; light: string };
  brandUrl?: string;
}
```

### Category Object
```typescript
{
  category: string;
  total: number;
}
```

## 📂 Available Categories

The SVGL library includes logos from these categories:

| Category | Examples |
|----------|----------|
| **AI** | OpenAI, Anthropic, Hugging Face |
| **Framework** | React, Vue, Angular, Next.js, Svelte |
| **Library** | Three.js, D3.js, Lodash |
| **Language** | JavaScript, Python, Rust, Go |
| **Database** | PostgreSQL, MongoDB, Redis |
| **Software** | VS Code, Figma, Discord |
| **Design** | Sketch, Adobe, Canva |
| **Authentication** | Auth0, Okta, Clerk |
| **And many more...** | 40+ categories total |

Use the `get_categories` tool to see the complete list with counts.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

MIT

## 🙏 Credits

- **SVGL API** by [pheralb](https://github.com/pheralb/svgl) - The amazing SVG logo library
- **Model Context Protocol SDK** by [Anthropic](https://github.com/modelcontextprotocol) - MCP implementation
- Built with ❤️ for the MCP community

## 🔗 Links

- [SVGL Website](https://svgl.app)
- [SVGL API Documentation](https://svgl.app/docs/api)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP Servers List](https://github.com/modelcontextprotocol/servers)

---

**Note**: This is an unofficial MCP server. It uses the public SVGL API. Please respect their [API limitations](https://svgl.app/docs/api#limitations) and don't use it to create a competing product.
