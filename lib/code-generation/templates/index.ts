import type { AppTemplate } from "../types"
import { simpleAppTemplate } from "./simple-app"
import { ecommerceTemplate } from "./ecommerce"
import { blogTemplate } from "./blog"
import { dashboardTemplate } from "./dashboard"
import { landingTemplate } from "./landing"
import { todoAppTemplate } from "./todo-app"
import { chatAppTemplate } from "./chat-app"

export const templates: Record<string, AppTemplate> = {
  simpleApp: simpleAppTemplate,
  ecommerce: ecommerceTemplate,
  blog: blogTemplate,
  dashboard: dashboardTemplate,
  landing: landingTemplate,
  todoApp: todoAppTemplate,
  chatApp: chatAppTemplate,
}
