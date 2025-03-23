export const createIssue = async (args, extra) => {
    return {
        content: [
            {
                type: "text",
                text: `Issue created: ${args.summary}`,
            },
        ],
    };
};
