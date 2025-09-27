'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent, useCallback, useRef } from 'react'
import { addUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import { Button } from '../ui/button'

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
    <div className={'flex max-md:flex-1 items-center '}>
      <Input
        ref={inputRef}
        placeholder={'Search...'}
        className='h-10 md:min-w-96 rounded-r-none'
        onChange={onDebounceChangeUrl}
      />
      <Button
        size={'icon'}
        variant={'outline'}
        className='size-10 border border-input bg-input/30 rounded-l-none p-2 hover:bg-input/30'
        onClick={() => inputRef.current?.focus()}
        asChild
      >
        <Search />
      </Button>
    </div>
  )
}
