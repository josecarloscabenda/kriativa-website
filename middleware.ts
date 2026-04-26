import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match everything EXCEPT Payload admin/api, Next internals, and static files.
  matcher: ["/((?!admin|api|q/|_next|_vercel|favicon|fontes|.*\\..*).*)"],
}
