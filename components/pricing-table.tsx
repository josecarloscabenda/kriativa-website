import { Check } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type PricingTier, formatPriceRange } from "@/lib/format"
import { cn } from "@/lib/utils"

interface PricingTableProps {
  tiers: PricingTier[]
}

export function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={cn(
            "relative flex flex-col",
            tier.highlight && "border-purple-600 shadow-lg"
          )}
        >
          {tier.highlight && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600">
              Mais popular
            </Badge>
          )}
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{tier.name}</CardTitle>
            <p className="text-sm text-gray-600">{tier.description}</p>
            <div className="mt-4">
              <p className="text-sm font-medium text-purple-600">
                {formatPriceRange(tier.priceRange.min, tier.priceRange.max)}*
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className={cn(
                "w-full",
                tier.highlight
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-900 hover:bg-gray-800"
              )}
            >
              <Link href="/encomendar">Solicitar orçamento</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

interface PriceRangeTableProps {
  items: { item: string; min: number; max: number }[]
}

export function PriceRangeTable({ items }: PriceRangeTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Serviço</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-900">
              Faixa de preço estimada*
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.item} className="border-b last:border-0">
              <td className="px-4 py-3 text-gray-700">{row.item}</td>
              <td className="px-4 py-3 text-right font-medium text-purple-600">
                {formatPriceRange(row.min, row.max)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
        * Estimativas baseadas em mercado; valor final depende de briefing.
      </p>
    </div>
  )
}
