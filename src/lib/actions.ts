
"use server";

import { suggestSolutions } from "@/ai/flows/suggest-solutions";
import { redirect } from "next/navigation";
import { z } from "zod";

const SuggestSolutionsInputSchema = z.object({
  description: z.string().min(10, "Please provide a more detailed description."),
  intent: z.enum(["get-suggestions", "confirm-emergency"]),
});

type SuggestionsState = {
  solutions?: string[];
  error?: string;
};

export async function getSuggestions(
  prevState: SuggestionsState,
  formData: FormData
): Promise<SuggestionsState> {
  const validatedFields = SuggestSolutionsInputSchema.safeParse({
    description: formData.get("description"),
    intent: formData.get("intent"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.description?.[0],
    };
  }
  
  const { intent, description } = validatedFields.data;

  if (intent === "confirm-emergency") {
    redirect("/confirm-emergency");
  }

  try {
    const result = await suggestSolutions({ description });
    if (!result || !result.solutions || result.solutions.length === 0) {
      return { error: "Could not generate suggestions. Please select a service below." };
    }
    return { solutions: result.solutions };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please select a service below." };
  }
}
