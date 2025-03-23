import { TODO } from "../constant/tool-name.js";
import { todoSchema } from "../schema/todo.js";
import { createTodo } from "../tools/todo/create-todo.js";
import { BaseServerConfig } from "../types/server.js";

export const todoServerConfig: BaseServerConfig = {
  tools: [
    {
      name: TODO.CREATE_TODO,
      schema: todoSchema,
      handler: createTodo,
    },
  ],
};
