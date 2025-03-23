import { z } from "zod";
export const todoSchema = z.object({
    text: z.string().min(1, "Todo text is required"),
    dueDate: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
});
