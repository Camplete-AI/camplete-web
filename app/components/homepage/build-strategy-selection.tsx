import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function BiddingStrategySelector() {
  return (
    <div className="space-y-4">
      <Label className="text-base">Estratégia de Lance</Label>
      <RadioGroup
        name="biddingStrategy"
        defaultValue="MAXIMIZE_CONVERSIONS"
        className="space-y-2"
      >
        <div className="flex items-start space-x-2">
          <RadioGroupItem
            id="maximize-conversions"
            value="MAXIMIZE_CONVERSIONS"
          />
          <div>
            <Label htmlFor="maximize-conversions" className="font-medium">
              Maximizar Conversões
            </Label>
            <p className="text-muted-foreground text-sm">
              O Google vai tentar gerar o maior número possível de conversões
              com seu orçamento. Ideal para gerar leads ou inscrições.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <RadioGroupItem
            id="maximize-conversion-value"
            value="MAXIMIZE_CONVERSION_VALUE"
          />
          <div>
            <Label htmlFor="maximize-conversion-value" className="font-medium">
              Maximizar Valor de Conversão
            </Label>
            <p className="text-muted-foreground text-sm">
              O Google tentará gerar o maior valor total em conversões. Ideal
              para lojas ou vendas com ticket médio alto.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
