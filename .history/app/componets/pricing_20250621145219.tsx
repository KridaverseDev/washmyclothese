import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Share2, Copy, Check } from 'lucide-react';

const PricingSection = () => {
    const [activeTab, setActiveTab] = useState('laundry');
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedItem, setHighlightedItem] = useState(null);
    const [copied, setCopied] = useState(false);

    const priceData = {
        laundry: {
            title: "Laundry Services",
            description: "Professional washing and drying services",
            items: {
                "Wash & Fold": { "Type": "kg", "Price": "79" },
                "Wash And Steam Iron": { "Type": "kg", "Price": "90" },
                "Premium Laundry": { "Type": "kg", "Price": "140" },
                "Express Laundry": { "Type": "kg", "Price": "190" },
            }
        },
        steamPress: {
            title: "Steam Press",
            description: "Professional pressing services for wrinkle-free clothes",
            items: {
                "Clothes (Men)": { "Type": "pc", "Price": "15" },
                "Clothes (Women)": { "Type": "pc", "Price": "20" },
                "Clothes (Kids)": { "Type": "pc", "Price": "7" },
            }
        },
        dryCleaningMen: {
            title: "Dry Cleaning (Men)",
            description: "Expert dry cleaning for men's garments",
            items: {
                "Socks": { "Type": "pc", "Price": "30" },
                "Kanduwa": { "Type": "pc", "Price": "40" },
                "Dhothi (Lungi)": { "Type": "pc", "Price": "50" },
                "Brief": { "Type": "pc", "Price": "50" },
                "Vest": { "Type": "pc", "Price": "50" },
                "Tie": { "Type": "pc", "Price": "50" },
                "Shorts": { "Type": "pc", "Price": "60" },
                "Jeans": { "Type": "pc", "Price": "79" },
                "Kurta": { "Type": "pc", "Price": "79" },
                "Pyjama": { "Type": "pc", "Price": "79" },
                "Sweater": { "Type": "pc", "Price": "79" },
                "Trouser": { "Type": "pc", "Price": "79" },
                "Shirt": { "Type": "pc", "Price": "79" },
                "T-shirt": { "Type": "pc", "Price": "79" },
                "Jacket": { "Type": "pc", "Price": "149" },
                "Safari Suit": { "Type": "pc", "Price": "175" },
                "Blazer": { "Type": "pc", "Price": "180" },
                "Leather Jacket": { "Type": "pc", "Price": "400" },
                "Suit (2Pcs)": { "Type": "pc", "Price": "249" },
                "Suit (3Pcs)": { "Type": "pc", "Price": "349" },
                "Sherwani": { "Type": "pc", "Price": "300" },
            }
        },
        dryCleaningWomen: {
            title: "Dry Cleaning (Women)",
            description: "Expert dry cleaning for women's garments",
            items: {
                "Dupatta": { "Type": "pc", "Price": "50" },
                "Socks": { "Type": "pc", "Price": "30" },
                "Petty Coat": { "Type": "pc", "Price": "40" },
                "Blouse": { "Type": "pc", "Price": "49" },
                "Night Gown": { "Type": "pc", "Price": "55" },
                "Panty": { "Type": "pc", "Price": "59" },
                "Pyjama": { "Type": "pc", "Price": "60" },
                "Shorts": { "Type": "pc", "Price": "60" },
                "Shawl": { "Type": "pc", "Price": "69" },
                "Jeans": { "Type": "pc", "Price": "69" },
                "Kurti": { "Type": "pc", "Price": "69" },
                "Frock": { "Type": "pc", "Price": "70" },
                "Legging": { "Type": "pc", "Price": "79" },
                "Burqa": { "Type": "pc", "Price": "85" },
                "Skirt": { "Type": "pc", "Price": "90" },
                "Kurti (Fancy)": { "Type": "pc", "Price": "120" },
                "Long Gown": { "Type": "pc", "Price": "120" },
                "Saree (Cotton)": { "Type": "pc", "Price": "150" },
                "Saree (Silk/Pattu)": { "Type": "pc", "Price": "220" },
                "Saree (Fancy)": { "Type": "pc", "Price": "180" },
                "Saree (Designer)": { "Type": "pc", "Price": "250" },
                "Lehenga": { "Type": "pc", "Price": "300" },
                "Lehenga (Designer)": { "Type": "pc", "Price": "500" },
            }
        },
        household: {
            title: "Household Laundry",
            description: "Quality cleaning for household items",
            items: {
                "Pillow Cover": { "Type": "pc", "Price": "30" },
                "Door Mat": { "Type": "pc", "Price": "40" },
                "Sofa Cover": { "Type": "pc", "Price": "40" },
                "Bath Towel": { "Type": "pc", "Price": "45" },
                "Cushion Cover": { "Type": "pc", "Price": "49" },
                "Bathrobe": { "Type": "pc", "Price": "60" },
                "Car Seat Cover": { "Type": "pc", "Price": "60" },
                "Table Cloth": { "Type": "pc", "Price": "70" },
                "Single Bedsheet": { "Type": "pc", "Price": "90" },
                "Double Bedsheet": { "Type": "pc", "Price": "110" },
                "Curtain (L)": { "Type": "pc", "Price": "220" },
                "Curtain (XL)": { "Type": "pc", "Price": "260" },
                "Curtain (XXL)": { "Type": "pc", "Price": "320" },
                "Single Blanket": { "Type": "pc", "Price": "250" },
                "Double Blanket": { "Type": "pc", "Price": "350" },
                "Razai/Quilt Single": { "Type": "pc", "Price": "300" },
                "Razai/Quilt Double": { "Type": "pc", "Price": "450" },
                "Duet Cover Single": { "Type": "pc", "Price": "190" },
                "Duet Cover Double": { "Type": "pc", "Price": "250" },
                "Jamkana Small": { "Type": "pc", "Price": "550" },
                "Jamkana Big": { "Type": "pc", "Price": "850" },
                "Teddy Bear": { "Type": "pc", "Price": "200" },
            }
        },
        shoeBags: {
            title: "Shoe & Bag Cleaning",
            description: "Specialized cleaning for shoes and bags",
            items: {
                "Hand Bag": { "Type": "pc", "Price": "300" },
                "Shoe": { "Type": "pc", "Price": "400" },
                "Travel Bag": { "Type": "pc", "Price": "500" },
            }
        }
    };

    // Handle URL parameters for deep linking
    useEffect(() => {
        // Parse URL hash parameters
        const handleUrlParams = () => {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1); // Remove the # character
                const params = new URLSearchParams(hash);

                // Get service category
                const service = params.get('service');
                if (service && priceData[service]) {
                    setActiveTab(service);
                }

                // Get item to highlight
                const item = params.get('item');
                if (item) {
                    setHighlightedItem(item);
                    // If the item isn't immediately visible, we can set it as a search term
                    setSearchTerm(item);
                }
            }
        };

        handleUrlParams();

        // Listen for hash changes
        window.addEventListener('hashchange', handleUrlParams);

        return () => {
            window.removeEventListener('hashchange', handleUrlParams);
        };
    }, []);

    // Handle highlighting of shared items
    useEffect(() => {
        if (highlightedItem) {
            // Scroll to the highlighted item
            const element = document.getElementById(`item-${highlightedItem.replace(/\s+/g, '-').toLowerCase()}`);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Flash animation
                    element.classList.add('bg-blue-50');
                    setTimeout(() => {
                        element.classList.remove('bg-blue-50');
                    }, 2000);
                }, 500);
            }
        }
    }, [highlightedItem, activeTab]);

    const filteredItems = () => {
        const items = priceData[activeTab].items;
        if (!searchTerm) return items;

        const filtered = {};
        Object.keys(items).forEach(key => {
            if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                filtered[key] = items[key];
            }
        });
        return filtered;
    };

    // Generate sharable URL for a service category or specific item
    const generateShareUrl = (service, item = null) => {
        const url = new URL(window.location.href.split('#')[0]);

        let hash = `service=${service}`;
        if (item) {
            hash += `&item=${encodeURIComponent(item)}`;
        }

        return `${url.toString()}#${hash}`;
    };

    // Copy link to clipboard
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section id="pricing" className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Our Pricing
                    </motion.h2>

                    <motion.div
                        className="w-20 h-1 bg-blue-600 mx-auto mb-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    />

                    <motion.p
                        className="max-w-3xl mx-auto text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Transparent pricing for all our services. No hidden fees, just quality service.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {Object.keys(priceData).map((tab) => (
                            <div key={tab} className="relative">
                                <motion.button
                                    onClick={() => setActiveTab(tab)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {priceData[tab].title}
                                </motion.button>

                                {/* Share button for each category */}
                                <button
                                    onClick={() => copyToClipboard(generateShareUrl(tab))}
                                    className="absolute -right-2 -top-2 bg-white text-blue-600 p-1 rounded-full shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors"
                                    title="Share this service category"
                                >
                                    <Share2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search for items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Share link copy notification */}
                {copied && (
                    <div className="fixed top-6 right-6 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 z-50">
                        <Check size={16} />
                        <span>Link copied to clipboard!</span>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">{priceData[activeTab].title}</h3>
                                    <p className="text-blue-100 mt-1">{priceData[activeTab].description}</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(generateShareUrl(activeTab))}
                                    className="flex items-center gap-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-3 py-1.5 transition-all"
                                    title="Share this service category"
                                >
                                    <Share2 size={16} />
                                    <span className="text-sm hidden sm:inline">Share Category</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-1 sm:p-4">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Item</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Unit</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Price (₹)</th>
                                            <th className="px-4 py-3 w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(filteredItems()).map(([item, details], index) => (
                                            <motion.tr
                                                key={item}
                                                id={`item-${item.replace(/\s+/g, '-').toLowerCase()}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} 
                                                           ${highlightedItem === item ? "bg-blue-50 transition-colors duration-500" : ""} 
                                                           hover:bg-blue-50 group transition-colors`}
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-800 border-t border-gray-100">{item}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">{details.Type}</td>
                                                <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right border-t border-gray-100">₹{details.Price}</td>
                                                <td className="px-4 py-3 text-sm border-t border-gray-100 text-right">
                                                    <button
                                                        onClick={() => copyToClipboard(generateShareUrl(activeTab, item))}
                                                        className="opacity-0 group-hover:opacity-100 inline-flex p-1 rounded hover:bg-blue-100 text-blue-600 transition-all"
                                                        title="Share this item"
                                                    >
                                                        <Share2 size={16} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}

                                        {Object.keys(filteredItems()).length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                    No items found matching your search. Try a different search term.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                * Prices may vary based on fabric type, stains, and size. Contact us for more details.
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to experience our services?</h3>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://wa.me/+918712326333?text=I'm%20interested%20in%20your%20laundry%20services"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md font-medium transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            Book via WhatsApp
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            href="tel:+918712326333"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md font-medium transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Call Us Now
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;