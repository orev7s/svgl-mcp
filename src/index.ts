#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { SVG, Category } from "./types.js";

const API_BASE_URL = "https://api.svgl.app";

/**
 * SVGL MCP Server
 * Provides tools to interact with the SVGL API for SVG logos
 */
class SvglMcpServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "svgl-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.getTools(),
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_all_svgs":
            return await this.getAllSvgs(args?.limit as number | undefined);
          
          case "get_svgs_by_category":
            if (!args?.category) {
              throw new Error("category parameter is required");
            }
            return await this.getSvgsByCategory(args.category as string);
          
          case "get_svg_code":
            if (!args?.filename) {
              throw new Error("filename parameter is required");
            }
            return await this.getSvgCode(
              args.filename as string,
              args.optimize !== false
            );
          
          case "search_svgs":
            if (!args?.query) {
              throw new Error("query parameter is required");
            }
            return await this.searchSvgs(args.query as string);
          
          case "get_categories":
            return await this.getCategories();
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: "get_all_svgs",
        description: "Get all SVG logos from the SVGL library. Optionally limit the number of results.",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Optional limit on the number of SVGs to return",
              minimum: 1,
            },
          },
        },
      },
      {
        name: "get_svgs_by_category",
        description: "Get SVG logos filtered by a specific category (e.g., 'software', 'framework', 'library', 'ai', 'database', etc.)",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "The category to filter by (lowercase, e.g., 'software', 'framework', 'library')",
            },
          },
          required: ["category"],
        },
      },
      {
        name: "get_svg_code",
        description: "Get the SVG code for a specific logo by filename",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "The SVG filename (e.g., 'adobe.svg', 'react.svg')",
            },
            optimize: {
              type: "boolean",
              description: "Whether to optimize the SVG using svgo (default: true)",
              default: true,
            },
          },
          required: ["filename"],
        },
      },
      {
        name: "search_svgs",
        description: "Search for SVG logos by title/name",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query to match against SVG titles",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_categories",
        description: "Get the list of all available categories with their SVG counts",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];
  }

  private async fetchApi(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    // For SVG code endpoint, return text
    if (endpoint.includes("/svg/")) {
      return await response.text();
    }

    return await response.json();
  }

  private async getAllSvgs(limit?: number) {
    const url = limit 
      ? `${API_BASE_URL}?limit=${limit}`
      : API_BASE_URL;
    
    const svgs: SVG[] = await this.fetchApi(url);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(svgs, null, 2),
        },
      ],
    };
  }

  private async getSvgsByCategory(category: string) {
    const url = `${API_BASE_URL}/category/${category.toLowerCase()}`;
    const svgs: SVG[] = await this.fetchApi(url);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(svgs, null, 2),
        },
      ],
    };
  }

  private async getSvgCode(filename: string, optimize: boolean) {
    const url = optimize
      ? `${API_BASE_URL}/svg/${filename}`
      : `${API_BASE_URL}/svg/${filename}?no-optimize`;
    
    const svgCode: string = await this.fetchApi(url);
    
    return {
      content: [
        {
          type: "text",
          text: svgCode,
        },
      ],
    };
  }

  private async searchSvgs(query: string) {
    const url = `${API_BASE_URL}?search=${encodeURIComponent(query)}`;
    const svgs: SVG[] = await this.fetchApi(url);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(svgs, null, 2),
        },
      ],
    };
  }

  private async getCategories() {
    const url = `${API_BASE_URL}/categories`;
    const categories: Category[] = await this.fetchApi(url);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(categories, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("SVGL MCP server running on stdio");
  }
}

// Start the server
const server = new SvglMcpServer();
server.run().catch(console.error);
