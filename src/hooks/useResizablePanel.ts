import { useCallback, useRef, useState, useEffect } from 'react'

export function useResizablePanel(containerId: string, minPercent = 10, maxPercent = 90) {
  const [panelWidth, setPanelWidth] = useState(50)
  const isDragging = useRef(false)

  const onDragging = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return
    const container = document.getElementById(containerId)
    if (!container) return

    const rect = container.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const newWidth = (offsetX / rect.width) * 100

    if (newWidth > minPercent && newWidth < maxPercent) {
      setPanelWidth(newWidth)
    }
  }, [containerId, minPercent, maxPercent])

  const stopDragging = useCallback(() => {
    isDragging.current = false
    const container = document.getElementById(containerId)
    container?.classList.remove('select-none')

    document.removeEventListener('mousemove', onDragging)
    document.removeEventListener('mouseup', stopDragging)
  }, [containerId, onDragging])

  const startDragging = useCallback(() => {
    isDragging.current = true
    const container = document.getElementById(containerId)
    container?.classList.add('select-none')

    document.addEventListener('mousemove', onDragging)
    document.addEventListener('mouseup', stopDragging)
  }, [containerId, onDragging, stopDragging])

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onDragging)
      document.removeEventListener('mouseup', stopDragging)
    }
  }, [onDragging, stopDragging])

  return {
    panelWidth,
    startDragging
  }
}
