import { Card, CardContent, CardDescription } from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

export default function SkeletonProjectCard() {
  return (
    <Card className={'shadow-lg w-full'}>
      <CardContent className={'w-full'}>
        <div className={'h-48 w-full relative'}>
          <Skeleton className={'size-full'} />
        </div>

        <div className={'p-1'}>
          <div className={'flex justify-between items-center m-1'}>
            <Skeleton className={'w-1/2 h-4'} />
            <Skeleton className={'w-1/4 h-3'} />
          </div>
          
          <CardDescription>
            {Array.from({ length: 8 }).map((_, index) => (
              <Badge key={index} className={'bg-secondary text-primary m-1'}>
                <Skeleton className={'w-12 h-2'} />
              </Badge>
            ))}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
