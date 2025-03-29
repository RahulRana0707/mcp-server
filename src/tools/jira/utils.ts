import { Status, StatusIDMap, TJiraADF } from "../../types/jira/responses.js";

export const getStatusId = (status: Status) => {
  if (!(status in StatusIDMap)) return StatusIDMap["In Progress"];
  return StatusIDMap[status];
};

/**
 * Converts plain text to Atlassian Document Format (ADF)
 * Used for formatting issue descriptions in Jira's rich text format
 * @param text - Plain text to convert to ADF
 * @returns ADF document object with the text content
 */
export function convertToADF(text: string): TJiraADF {
  const lines = text.split("\n");
  const content: any[] = [];
  let currentList: any = null;
  let currentListType: "bullet" | "ordered" | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1] || "";

    // Skip empty lines between paragraphs
    if (line.trim() === "") {
      currentList = null;
      currentListType = null;
      continue;
    }

    // Handle bullet points
    if (line.trim().startsWith("- ")) {
      const listItem = line.trim().substring(2);
      if (currentListType !== "bullet") {
        currentList = {
          type: "bulletList",
          content: [],
        };
        content.push(currentList);
        currentListType = "bullet";
      }
      currentList.content.push({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: listItem,
              },
            ],
          },
        ],
      });
      continue;
    }

    // Handle numbered lists
    if (/^\d+\.\s/.test(line.trim())) {
      const listItem = line.trim().replace(/^\d+\.\s/, "");
      if (currentListType !== "ordered") {
        currentList = {
          type: "orderedList",
          content: [],
        };
        content.push(currentList);
        currentListType = "ordered";
      }
      currentList.content.push({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: listItem,
              },
            ],
          },
        ],
      });
      continue;
    }

    // Handle headings (lines ending with ":")
    if (line.trim().endsWith(":") && nextLine.trim() === "") {
      content.push({
        type: "heading",
        attrs: { level: 3 },
        content: [
          {
            type: "text",
            text: line.trim(),
          },
        ],
      });
      continue;
    }

    // Regular paragraph
    currentList = null;
    currentListType = null;
    content.push({
      type: "paragraph",
      content: [
        {
          type: "text",
          text: line,
        },
      ],
    });
  }

  return {
    version: 1,
    type: "doc",
    content,
  };
}
