import { McpSeverToolManager } from "./server/mcp-server-tool-manager.js";
import { jiraServerConfig } from "./config/jira-tool.config.js";
import { todoServerConfig } from "./config/todo-tool.config.js";
const serverManager = new McpSeverToolManager();
serverManager.registerTools(jiraServerConfig);
serverManager.registerTools(todoServerConfig);
// start the server
async function start() {
    await serverManager.startServer();
}
start().catch((error) => {
    console.error(error);
    process.exit(1);
});
