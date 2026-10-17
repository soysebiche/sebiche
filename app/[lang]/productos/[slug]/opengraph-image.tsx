import { productStaticParams } from '../../../../lib/routes'
import { productImage, productImageMetadata } from '../../../../lib/productOg'
import { ogContentType, ogSize } from '../../../../lib/og'

export const size = ogSize
export const contentType = ogContentType

export const generateStaticParams = productStaticParams('es')

export const generateImageMetadata = productImageMetadata

export default function Image(props: { params: Promise<{ slug: string }> }) {
    return productImage(props, 'es')
}
