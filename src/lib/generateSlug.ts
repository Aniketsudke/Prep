// utils/generateSlug.ts
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a slug based on the topic, title, type, and difficulty
 * @param topicTitle - The topic of the question
 * @param subjects - The type of the question (e.g., MCQ, TRUE_FALSE)
 * @returns A unique slug for the question
 */
export function generateSlug(topicTitle: string, subjects: string) {
  const baseSlug = `${slugify(topicTitle, {
    lower: true,
    strict: true,
  })}-${slugify(subjects, { lower: true, strict: true })}`;

  const uniqueId = uuidv4();
  return `${baseSlug}-${uniqueId}`;
}