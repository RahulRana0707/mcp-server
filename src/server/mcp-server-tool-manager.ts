import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseServerConfig } from "../types/server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Interface defining the MCP Server Tool Manager structure
interface IMcpSeverToolManager {
  registerTools(config: BaseServerConfig): McpServer; // Registers tools with the server
  getServer(): McpServer | undefined; // Retrieves the server instance
  startServer(): Promise<void>; // Starts the MCP server
}

export class McpSeverToolManager implements IMcpSeverToolManager {
  private server: McpServer;

  constructor() {
    // Initializes the MCP server with a name and version
    this.server = new McpServer({
      name: "PersonalizedServer",
      version: "1.0.0",
    });
  }

  /**
   * Registers tools with the MCP server using the provided configuration.
   * Each tool has a name, schema, and handler function.
   * @param {BaseServerConfig} config - Configuration object containing tool definitions.
   * @returns {McpServer} - The configured MCP server instance.
   */
  registerTools(config: BaseServerConfig): McpServer {
    config.tools.forEach(({ name, handler, schema }) => {
      this.server.tool(name, schema.shape, handler);
    });
    return this.server;
  }

  /**
   * Retrieves the current MCP server instance.
   * @returns {McpServer | undefined} - The initialized server instance or undefined.
   */
  getServer(): McpServer | undefined {
    return this.server;
  }

  /**
   * Starts the MCP server using Stdio transport.
   * Establishes a connection to handle incoming requests.
   */
  async startServer(): Promise<void> {
    const transport = new StdioServerTransport(); // Creates a standard I/O transport for the server
    await this.server.connect(transport); // Connects the server to the transport layer
    console.log(`Server ${this.server.tool.name} started`); // Uncomment to log server start
  }
}
