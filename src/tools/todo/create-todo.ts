import { z } from "zod";
import { todoSchema } from "../../schema/todo.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const createTodo = async (
  args: z.infer<typeof todoSchema>,
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  // Here you would typically save the todo to a database or file system
  const todoDetails = [
    args.text,
    args.dueDate ? `Due: ${args.dueDate}` : null,
    args.priority ? `Priority: ${args.priority}` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return {
    content: [
      {
        type: "text",
        text: `Todo added: ${todoDetails}`,
      },
    ],
  };
};
