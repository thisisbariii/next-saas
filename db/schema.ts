import { pgTable, serial, text, varchar ,integer, boolean} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),  // id is an integer
  name: text('name'),
  description: text('description'),
  url: text('url'),
  userId: varchar("user_id"),  // Assuming userId remains a varchar
});

export const projectRelations = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const feedbacks = pgTable('feedbacks', { 
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),  // projectId is an integer, matching 'id' in projects
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
  rating:integer("rating"),
});

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [feedbacks.projectId],  // Relating projectId to projects.id (both integers)
    references: [projects.id],
  }),
}));
export const subscriptions=  pgTable('subscriptions', { 
  id: serial('id').primaryKey(),
  userId: varchar("user_id"),
  stripeCustomerId: text("stripe_customer_id"),
  subscribed:boolean("subscribe")

})

