'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Placeholder books - will be replaced with Goodreads API data
const placeholderBooks = [
    {
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: '/books/design-everyday-things.jpg',
        rating: 5,
        status: 'read'
    },
    {
        title: 'Hooked',
        author: 'Nir Eyal',
        cover: '/books/hooked.jpg',
        rating: 4,
        status: 'read'
    },
    {
        title: 'Sprint',
        author: 'Jake Knapp',
        cover: '/books/sprint.jpg',
        rating: 5,
        status: 'reading'
    },
    {
        title: 'Lean UX',
        author: 'Jeff Gothelf',
        cover: '/books/lean-ux.jpg',
        rating: 4,
        status: 'read'
    }
]

export default function Bookshelf() {
    const [books, setBooks] = useState(placeholderBooks)

    // TODO: Integrate with Goodreads API
    // useEffect(() => {
    //   fetch('/api/goodreads')
    //     .then(res => res.json())
    //     .then(data => setBooks(data))
    // }, [])

    return (
        <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">📚</span>
                        bookshelf
                    </h2>
                    <p className="text-xl text-gray-600">
                        currently reading & favorites
                    </p>
                </motion.div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {books.map((book, index) => (
                        <motion.div
                            key={book.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                        >
                            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-orange-200 h-full">
                                {/* Book Cover Placeholder */}
                                <div className="aspect-[2/3] bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-6xl">📖</span>
                                </div>

                                {/* Book Info */}
                                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">
                                    {book.author}
                                </p>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">
                                            {i < book.rating ? '⭐' : '☆'}
                                        </span>
                                    ))}
                                </div>

                                {/* Status Badge */}
                                {book.status === 'reading' && (
                                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                                        Currently Reading
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Goodreads Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.goodreads.com/user/show/YOUR_GOODREADS_ID"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition"
                    >
                        View Full Library on Goodreads
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
