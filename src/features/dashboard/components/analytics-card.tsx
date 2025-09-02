import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { NumberTicker } from '@/components/magicui/number-ticker';

type AnalyticsCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  isCurrency?: boolean;
};

export function AnalyticsCard({
  title,
  value,
  icon: Icon,
  isCurrency = true,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {typeof value === 'number' ? (
              <>
                {isCurrency && '$'}
                <NumberTicker value={value} />
              </>
            ) : (
              value
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
