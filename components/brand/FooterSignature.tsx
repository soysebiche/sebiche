import { CONTACT_EMAIL } from '../../lib/site'
import SebicheSymbol from './SebicheSymbol'

// Footer lockup: El pase symbol, wordmark and the published contact.
export default function FooterSignature() {
    return (
        <div className="footer-signature">
            <SebicheSymbol className="footer-symbol" />
            <strong>SEBICHE</strong>
            <span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <span aria-hidden> · </span>
                Dallas, Texas
            </span>
        </div>
    )
}
