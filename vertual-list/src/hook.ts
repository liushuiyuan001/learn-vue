import { useState, useRef, useMemo, MutableRefObject, useEffect } from 'react'

type Options = {
  containerTarget: MutableRefObject<null | HTMLElement>;
  wrapperTarget: MutableRefObject<null | HTMLElement>;
  itemHeight: number | ((index: number, data: any) => number);
  overscan: number
}

export const useVirtualList = (list: any[], { containerTarget, wrapperTarget, itemHeight, overscan  }: Options) => {

  const ref = useRef<{ height: number; total: number }[]>([])
  const [data, setData] = useState<{ data: any; style: any; index: number; height: number}[]>([])
  const total = useMemo(() => {
    ref.current = []
    let total = 0
    list.forEach((item ,index) => {
      const h = typeof itemHeight === 'number' ? itemHeight : itemHeight(index, item)
      ref.current.push({
        height: h,
        total: total
      })
      total += h + 8
    })
    return total
  }, [list])
  useEffect(() => {
    const wrapper = wrapperTarget.current
    if(wrapper) {
      wrapper.style.position = 'relative'
      wrapper.style.height = `${total}px`
    }
  },[wrapperTarget, total])
  useEffect(() => {
    const container = containerTarget?.current
    if(container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if(container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  },[containerTarget])
  useEffect(() => {
    const container = containerTarget.current
    if(!container) return
    handleData(container.scrollTop)
  },[list, containerTarget])
  const handleScroll = () => {
    const container = containerTarget?.current
    const wrapper = wrapperTarget?.current
    if(!container || !wrapper) return
    handleData(container.scrollTop)
  }

  const handleData = (scrollTop:  number) => {
    const container = containerTarget?.current
    let index = ref?.current.findIndex(v => v.height + v.total >= scrollTop)
    console.log('init', index)
    console.log('initTotal', ref.current[index].total)
    index = Math.max(index - overscan, 0)
    const height = container?.offsetHeight ?? 0
    const result = []
    const allLen = ref.current.length
    let firstTotal = ref.current[index].total
    console.log('firstTotal', firstTotal)
    console.log('scrollTop', scrollTop)
    console.log('height', height)
    for(;index < allLen && ref.current[index].total < scrollTop + height; index += 1) {
      console.log('ref.current[index].total', ref.current[index].total)
      console.log('index', index)
      result.push({
        data: list[index],
        index,
        style: {
          position: 'relative',
          top: firstTotal,
          left: 0,
          width: '100%',
          height: ref.current[index].height
        },
        height: ref.current[index].height
      })
    }
    console.log('---finally----', index)
    for(let i = 0; i < overscan; i++) {
      console.log('i',i)
      if(index < allLen) {
        result.push({
          data: list[index],
          index,
          style: {
            position: 'relative',
            top: firstTotal,
            left: 0,
            width: '100%',
            height: ref.current[index].height
          },
          height: ref.current[index].height
        })
      }
      index += 1
    }
    setData(result)
  }


  
  return [data]
}