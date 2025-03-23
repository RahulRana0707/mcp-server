import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
export class McpSeverToolManager {
    server;
    constructor() {
        this.server = new McpServer({
            name: "PersonalizedServer",
            version: "1.0.0",
        });
    }
    registerTools(config) {
        config.tools.forEach(({ name, handler, schema }) => {
            this.server.tool(name, schema.shape, handler);
        });
        return this.server;
    }
    getServer() {
        return this.server;
    }
    async startServer() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.log(`Server ${this.server.tool.name} started`);
    }
}
