import { contactImage, contactImageMetadata } from '../../../lib/contactOg'
import { ogContentType, ogSize } from '../../../lib/og'

export const size = ogSize
export const contentType = ogContentType

export function generateImageMetadata(props: { params: Promise<{ lang: string }> }) {
    return contactImageMetadata(props, 'en')
}

export default function Image(props: { params: Promise<{ lang: string }> }) {
    return contactImage(props, 'en')
}
