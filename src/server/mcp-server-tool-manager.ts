import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseServerConfig } from "../types/server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

interface IMcpSeverToolManager {
  registerTools(config: BaseServerConfig): McpServer;
  getServer(): McpServer | undefined;
  startServer(): Promise<void>;
}

export class McpSeverToolManager implements IMcpSeverToolManager {
  private server: McpServer;

  constructor() {
    this.server = new McpServer({
      name: "PersonalizedServer",
      version: "1.0.0",
    });
  }

  registerTools(config: BaseServerConfig): McpServer {
    config.tools.forEach(({ name, handler, schema }) => {
      this.server.tool(name, schema.shape, handler);
    });
    return this.server;
  }

  getServer(): McpServer | undefined {
    return this.server;
  }

  async startServer(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log(`Server ${this.server.tool.name} started`);
  }
}
