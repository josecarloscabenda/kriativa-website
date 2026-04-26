"use client"

import { MessageCircle, Mail, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/site.config"

export function SpecialistModal({ children }: { children: React.ReactNode }) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Falar com um Especialista</DialogTitle>
          <DialogDescription>
            Escolha o canal de contacto que preferir. Respondemos rapidamente!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="bg-black text-white hover:bg-brand-grey-90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`mailto:${siteConfig.contact.email}`}>
              <Mail className="mr-2 h-5 w-5" />
              Email: {siteConfig.contact.email}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Phone className="mr-2 h-5 w-5" />
              Ligar: {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
