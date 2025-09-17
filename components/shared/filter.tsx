'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent, useCallback, useRef } from 'react'
import { addUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'

export default function Filter() {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const onInputChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim()
    let newUrlQuery = ''

    newUrlQuery = addUrlQuery({ params: searchParams.toString(), key: 'query', value: inputValue })

    if (!inputValue) {
      newUrlQuery = removeUrlQuery({ params: searchParams.toString(), key: 'query' })
    }

    router.push(newUrlQuery)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounceChangeUrl = useCallback(debounce(onInputChangeUrl, 300), [])

  return (
    <div className='flex flex-col md:flex-row md:justify-center gap-2 max-md:w-full'>
      <div className='flex flex-col md:flex-row gap-2 max-md:w-full'>
        <div className={'flex items-center bg-secondary rounded-full'}>
          <Input
            ref={inputRef}
            placeholder={'Search...'}
            className={'no-focus border-none w-full md:min-w-96 h-10 rounded-r-none'}
            onChange={onDebounceChangeUrl}
          />
          <Search
            onClick={() => inputRef.current?.focus()}
            className={'mx-4 cursor-pointer text-muted-foreground'}
          />
        </div>
      </div>
    </div>
  )
}
