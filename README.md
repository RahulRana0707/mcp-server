# MCP Servers

A TypeScript-based server implementation for Model Context Protocol (MCP) that provides integration tools for various services like JIRA and TODO management.

## 🚀 Features

- **Multiple Tool Integration**: Modular architecture supporting multiple tool integrations
- **Type Safety**: Full TypeScript support with Zod schema validation
- **ESM Support**: Modern ES Modules implementation
- **Extensible**: Easy to add new tools and integrations

## 📦 Current Tools

### JIRA Integration
- Create issues with customizable fields
- Automatic response formatting
- Schema validation for issue creation

### TODO Management
- Create todos with priority and due dates
- Flexible schema supporting optional fields
- Formatted response messages

## 🛠 Project Structure

```
src/
├── config/           # Tool configurations
│   ├── jira-tool.config.ts
│   └── todo-tool.config.ts
├── constant/         # Constant definitions
│   └── tool-name.ts
├── schema/          # Zod schemas for validation
│   ├── jira.ts
│   └── todo.ts
├── server/          # Server management
│   └── mcp-server-tool-manager.ts
├── tools/           # Tool implementations
│   ├── jira/
│   │   └── create-issue.ts
│   └── todo/
│       └── create-todo.ts
└── index.ts         # Main entry point
```


## 🔌 Adding New Tools

1. Define tool constants in `constant/tool-name.ts`
2. Create schema in `schema/` directory
3. Implement tool handler in `tools/` directory
4. Add configuration in `config/` directory
5. Register tool in `index.ts`

Example:
```typescript
// 1. Add constant
export const NEW_TOOL = {
  ACTION: "action_name"
} as const;

// 2. Create schema
export const newToolSchema = z.object({
  // ... schema definition
});

// 3. Implement handler
export const handleAction = async (
  args: z.infer<typeof newToolSchema>,
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  // ... implementation
};

// 4. Add configuration
export const newToolConfig = {
  name: "New Tool",
  version: "1.0.0",
  tools: [
    {
      name: NEW_TOOL.ACTION,
      schema: newToolSchema,
      handler: handleAction,
    },
  ],
};
```

## 🔄 Development Workflow

1. Create feature branch
2. Implement changes
3. Run tests (when implemented)
4. Build project
5. Submit PR

## 📝 Notes

- Uses ES Modules for better modularity
- Implements Model Context Protocol for standardized communication
- Follows TypeScript best practices
- Zod schema validation for type safety

## 🛣️ Roadmap

- [ ] Add more JIRA operations
- [ ] Implement TODO persistence
- [ ] Add authentication
- [ ] Add testing framework
- [ ] Add more integrations (GitHub, Slack, etc.)

## 📄 License

MIT 