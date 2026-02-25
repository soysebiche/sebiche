import { Linkedin, Mail, Github } from 'lucide-react'

const navLinks = [
  { name: 'Journey', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sebastian-napuri/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/soysebiche', label: 'GitHub' },
  { icon: Mail, href: 'mailto:snapuri@smu.edu', label: 'Email' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <p className="font-bold text-lg mb-1">Sebastian Napuri</p>
            <p className="text-sm text-gray-400">Product Designer & eCommerce Strategist</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-turquoise transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-gray-400 hover:text-turquoise transition"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Sebastian Napuri Mendoza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
