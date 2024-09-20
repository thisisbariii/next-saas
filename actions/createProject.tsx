"use server";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { projects } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  // Get the authenticated user's ID
  const { userId } = await auth();  // make sure to await this

  const project = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    userId,
  };

  // Insert the new project into the database
  const [newProject] = await db
    .insert(projects)
    .values(project)
    .returning({ insertedId: projects.id });

  // Redirect to the instructions page for the new project
  redirect(`/projects/${newProject.insertedId}/instructions`);
}
