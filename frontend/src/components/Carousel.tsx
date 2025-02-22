// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// // import Link from 'next/link';

// interface CarouselItem {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   author: string;
//   date: string;
// }

// interface CarouselProps {
//   items: CarouselItem[];
// }

// const Carousel: React.FC<CarouselProps> = ({ items }) => {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [centerIndex, setCenterIndex] = useState<number | null>(null);
//   const [cardWidth, setCardWidth] = useState(320); // Width of each card in pixels

//   const scrollToCard = (index: number) => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     const scrollLeft = index * (cardWidth + 24); // 24px is the gap between cards
//     carousel.scrollTo({
//       left: scrollLeft,
//       behavior: 'smooth',
//     });

//     setCenterIndex(index);
//   };

//   const handleScroll = () => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     const scrollPosition = carousel.scrollLeft;
//     const newIndex = Math.round(scrollPosition / (cardWidth + 24));
//     setCenterIndex(newIndex);
//   };

//   const updateCardWidth = () => {
//     const container = carouselRef.current;
//     if (!container) return;

//     const containerWidth = container.clientWidth;
    
//     // Set number of visible cards based on container width
//     if (containerWidth >= 1440) {
//       setCardWidth((containerWidth - (24 * 3)) / 3.5); // Show 3.5 cards at max width
//     } else if (containerWidth >= 768) {
//       setCardWidth((containerWidth - 24) / 2.5); // Show 2.5 cards on medium screens
//     } else {
//       setCardWidth((containerWidth - 24) / 1.2); // Show 1.2 cards on small screens
//     }
//   };

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     carousel.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', updateCardWidth);
    
//     updateCardWidth();
//     handleScroll();

//     return () => {
//       carousel.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', updateCardWidth);
//     };
//   }, [cardWidth, handleScroll]);

//   return (
//     <div className="w-full max-w-[1440px] mx-auto">
//       <div className="flex flex-col md:flex-row justify-between items-center px-6 mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-white text-center md:text-left">
//           La parole aux mamans
//         </h2>
//         <p className="text-white text-[16px] text-center md:text-left">
//           Les mamans vous racontent leurs victoires
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             className="bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
//             onClick={() => centerIndex !== null && scrollToCard(centerIndex - 1)}
//             disabled={centerIndex === 0}
//           >
//             ←
//           </button>
//           <button
//             className="bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
//             onClick={() => centerIndex !== null && scrollToCard(centerIndex + 1)}
//             disabled={centerIndex === items.length - 1}
//           >
//             →
//           </button>
//         </div>
//       </div>
//       <div
//         ref={carouselRef}
//         className="flex gap-6 overflow-x-auto py-4 px-6 scroll-smooth no-scrollbar"
//         style={{
//           scrollSnapType: 'x mandatory',
//           WebkitOverflowScrolling: 'touch',
//         }}
//       >
//         {/* {items.map((item, index) => ( */}
//           {items.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white bg-opacity-10 rounded-lg p-6 text-center flex-shrink-0 transition-transform duration-300"
//             style={{
//               width: `${cardWidth}px`,
//               scrollSnapAlign: 'start',
//             }}
//           >
//             <div>
//               <p className="text-[color:--sky] text-xl font-bold mb-4"></p>
//               <p className="text-white">{item.description}</p>
//             </div>
//             <p className="mt-6 text-[color:--sky] font-semibold">{item.author}</p>
//             <p className="text-sm text-gray-300">{item.date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;