import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";

export interface BaseServerConfig {
  tools: Array<{
    name: string;
    schema: z.ZodObject<any>;
    handler: (args: any, extra: RequestHandlerExtra) => Promise<CallToolResult>;
  }>;
}
