import { ProductsIndexRoute, productsIndexMetadata } from '../../../components/routes/productsIndexRoute'

export function generateMetadata({ params }: PageProps<'/[lang]/productos'>) {
    return productsIndexMetadata(params, 'es')
}

export default function Page({ params }: PageProps<'/[lang]/productos'>) {
    return <ProductsIndexRoute params={params} language="es" />
}
