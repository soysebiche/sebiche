import { ProductsIndexRoute, productsIndexMetadata } from '../../../components/routes/productsIndexRoute'

export function generateMetadata({ params }: PageProps<'/[lang]/products'>) {
    return productsIndexMetadata(params, 'en')
}

export default function Page({ params }: PageProps<'/[lang]/products'>) {
    return <ProductsIndexRoute params={params} language="en" />
}
