# Quick Start Guide

## Step 1: Build the Server
```bash
cd /mnt/d/prjct/svgl
npm install
npm run build
```

## Step 2: Configure Your MCP Client

### For Claude Desktop (Windows)
Edit `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "svgl": {
      "command": "node",
      "args": ["D:\\prjct\\svgl\\dist\\index.js"]
    }
  }
}
```

### For Windsurf or Other MCP Clients
Add to your MCP configuration file:
```json
{
  "mcpServers": {
    "svgl": {
      "command": "node",
      "args": ["/mnt/d/prjct/svgl/dist/index.js"]
    }
  }
}
```

## Step 3: Restart Your MCP Client

After adding the configuration, restart your MCP client (Claude Desktop, Windsurf, etc.).

## Step 4: Test the Tools

Try these example prompts:
- "Get me all the framework SVGs"
- "Search for React logo"
- "Show me the SVG code for the Next.js logo"
- "List all available categories"
- "Get 5 SVG logos"

## Available Tools

1. **get_all_svgs** - Get all or limited number of SVG logos
2. **get_svgs_by_category** - Filter by category (software, framework, library, etc.)
3. **search_svgs** - Search by title
4. **get_svg_code** - Get the actual SVG code
5. **get_categories** - List all categories with counts

## Troubleshooting

### Server not appearing in MCP client
- Check that the path to `index.js` is correct
- Ensure Node.js is installed and in your PATH
- Restart the MCP client after configuration changes

### API errors
- The SVGL API is rate-limited
- Check your internet connection
- Verify the category name is lowercase

## Example Usage

### Get React logo SVG code
```
Tool: get_svg_code
Parameters: { "filename": "react.svg", "optimize": true }
```

### Search for AI-related logos
```
Tool: search_svgs
Parameters: { "query": "openai" }
```

### Get all database logos
```
Tool: get_svgs_by_category
Parameters: { "category": "database" }
```
