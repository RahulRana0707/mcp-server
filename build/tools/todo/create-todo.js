export const createTodo = async (args, extra) => {
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
