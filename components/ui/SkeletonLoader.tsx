interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
  spacing?: number
}

export default function SkeletonLoader({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
  spacing = 8
}: SkeletonLoaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded'
      case 'circular':
        return 'rounded-full'
      case 'card':
        return 'rounded-xl'
      case 'rectangular':
      default:
        return 'rounded-lg'
    }
  }

  const getDefaultDimensions = () => {
    switch (variant) {
      case 'text':
        return { width: '100%', height: '1rem' }
      case 'circular':
        return { width: '3rem', height: '3rem' }
      case 'card':
        return { width: '100%', height: '20rem' }
      case 'rectangular':
      default:
        return { width: '100%', height: '10rem' }
    }
  }

  const defaultDimensions = getDefaultDimensions()
  const finalWidth = width || defaultDimensions.width
  const finalHeight = height || defaultDimensions.height

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton ${getVariantStyles()} ${className}`}
      style={{
        width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
        height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
        marginBottom: i < count - 1 ? `${spacing}px` : 0
      }}
    />
  ))

  return <>{skeletons}</>
}

export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <SkeletonLoader variant="rectangular" height={400} />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <SkeletonLoader variant="circular" width={48} height={48} />
          <div className="flex-1">
            <SkeletonLoader variant="text" width="60%" height={24} className="mb-2" />
            <SkeletonLoader variant="text" width="40%" height={16} />
          </div>
        </div>
        <SkeletonLoader variant="text" count={3} spacing={12} />
        <div className="mt-4 flex gap-2">
          <SkeletonLoader variant="rectangular" width={80} height={30} className="rounded-full" />
          <SkeletonLoader variant="rectangular" width={80} height={30} className="rounded-full" />
          <SkeletonLoader variant="rectangular" width={80} height={30} className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 p-4">
      <SkeletonLoader variant="circular" width={40} height={40} />
      <div className="flex-1">
        <SkeletonLoader variant="text" width="30%" className="mb-2" />
        <SkeletonLoader variant="rectangular" width="70%" height={60} className="rounded-2xl" />
      </div>
    </div>
  )
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
      <SkeletonLoader variant="circular" width={56} height={56} />
      <div className="flex-1">
        <SkeletonLoader variant="text" width="50%" className="mb-2" />
        <SkeletonLoader variant="text" width="70%" height={14} />
      </div>
      <SkeletonLoader variant="rectangular" width={80} height={32} className="rounded-lg" />
    </div>
  )
}