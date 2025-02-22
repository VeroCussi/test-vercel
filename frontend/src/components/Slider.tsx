// import React, { useState } from 'react';

// const Slider: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [textVisible, setTextVisible] = useState(false);


//   return (
//     <div className="flex flex-row gap-2 w-full px-12 h-[500px] overflow-hidden">
//       {/* Div 1 */}
//       <div
//         className={`flex flex-col h-full transition-all duration-1000 ease-in-out`}
//         onMouseEnter={() => {
//           setActiveIndex(0);
//           setTimeout(() => setTextVisible(true), 250);
//         }}
//         onMouseLeave={() => {
//           setActiveIndex(0);
//           setTextVisible(true);
//         }}
//         style={{ flex: activeIndex === 0 ? 4 : 0.5 }}
//       >
//         {/* Background Wrapper */}
//         <div className="rounded-xl overflow-hidden h-[500px] w-full relative">
//           <div
//             className={`absolute inset-0 transition-opacity duration-1000`}
//             style={{
//               backgroundImage: `url('/slide_bg1.png')`,
//               backgroundSize: 'cover', // Adjusted to reduce zoom
//               backgroundRepeat: 'no-repeat', // Ensure it doesn't repeat
//               backgroundPosition: 'center',
//               opacity: activeIndex === 0 ? 1 : 0,
//             }}
//           />
//           <div
//             className={`absolute inset-0 transition-opacity duration-1000`}
//             style={{
//               backgroundColor: activeIndex === 0 ? 'transparent' : '#E6D7F1',
//               opacity: activeIndex === 0 ? 0 : 1,
//             }}
//           />
//           {activeIndex === 0 && (
//             <div className="relative flex justify-end items-start text-left text-[color:--primary] p-4">
//               <p
//                 className={`pt-2 w-96 text-2xl font-semibold transition-opacity duration-1000 ${
//                   textVisible ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 ... je veux rester en forme pendant ma grossesse.
//               </p>
//             </div>
//           )}
//         </div>
//         {/* Number and Title */}
//         <div className="flex flex-row gap-2 items-center mt-2">
//           <div
//             className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-md ${
//               activeIndex === 0 ? 'bg-[color:--primary] scale-110' : 'bg-gray-300'
//             }`}
//           >
//             1
//           </div>
//           {activeIndex === 0 && (
//             <div
//               className={`text-[color:--primary] font-bold text-xl mt-1 transition-opacity duration-1000 ${
//                 textVisible ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               Je suis enceinte et ...
//             </div>
//           )}
//         </div>
//       </div>

//         {/* Div 2 */}
//         <div
//         className={`flex flex-col h-full transition-all duration-1000 ease-in-out`}
//         onMouseEnter={() => {
//           setActiveIndex(1);
//           setTimeout(() => setTextVisible(true), 250);
//         }}
//         onMouseLeave={() => {
//           setActiveIndex(1);
//           setTextVisible(true);
//         }}
//         style={{ flex: activeIndex === 1 ? 4 : 0.5 }}
//       >
//         <div className="rounded-xl overflow-hidden h-[500px] w-full relative">
//           <div
//             className={`absolute inset-0 transition-opacity duration-1000`}
//             style={{
//               backgroundImage: `url('/slide_bg2.png')`,
//               backgroundSize: 'cover', // Adjusted to reduce zoom
//               backgroundRepeat: 'no-repeat', // Ensure it doesn't repeat
//               backgroundPosition: 'center',
//               opacity: activeIndex === 1 ? 1 : 0,
//             }}
//           />
//           <div
//             className={`absolute inset-0 transition-opacity duration-1000`}
//             style={{
//               backgroundColor: activeIndex === 1 ? 'transparent' : '#C3A8DA',
//               opacity: activeIndex === 1 ? 0 : 1,
//             }}
//           />
//           {activeIndex === 1 && (
//             <div className="h-full w-full flex flex-col justify-end items-start text-center text-white p-4">
//               <p
//                 className={`text-2xl font-semibold w-80 relative transition-opacity duration-1000 ${
//                   textVisible ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 ... je veux des exercices tout doux pour réapproprier mon corps après ma grossesse.
//               </p>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-row gap-2 items-center mt-2">
//           <div
//             className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-md ${
//               activeIndex === 1 ? 'bg-[color:--primary] scale-110' : 'bg-gray-300'
//             }`}
//           >
//             2
//           </div>
//           {activeIndex === 1 && (
//             <div
//               className={`text-[color:--primary] font-bold text-xl mt-1 transition-opacity duration-1000 ${
//                 textVisible ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               J&aposai accouché hier ou il y a plusieurs années et ...
//             </div>
//           )}
//         </div>
//       </div>


//    {/* Slide 3 */}
// <div
//   className={`flex flex-col h-full transition-all duration-1000 ease-in-out`}
//   onMouseEnter={() => {
//     setActiveIndex(2);
//     setTimeout(() => setTextVisible(true), 250);
//   }}
//   onMouseLeave={() => {
//     setActiveIndex(2);
//     setTextVisible(true);
//   }}
//   style={{ flex: activeIndex === 2 ? 4 : 0.5 }}
// >
//   <div className="rounded-xl overflow-hidden h-[500px] w-full relative">
//     <div
//       className={`absolute inset-0 transition-opacity duration-1000`}
//       style={{
//         backgroundImage: `url('/slide_bg3.png')`,
//         backgroundSize: 'cover', // Adjusted to reduce zoom
//         backgroundRepeat: 'no-repeat', // Ensure it doesn't repeat
//         backgroundPosition: 'center',
//         opacity: activeIndex === 2 ? 1 : 0,
//       }}
//     />
//     <div
//       className={`absolute inset-0 transition-opacity duration-1000`}
//       style={{
//         backgroundColor: activeIndex === 2 ? 'transparent' : '#A27CC6',
//         opacity: activeIndex === 2 ? 0 : 1,
//       }}
//     />
//     {activeIndex === 2 && (
//       <div className="h-full w-full flex flex-col justify-end items-end text-right text-white p-4">
//         <p
//           className={`text-2xl font-semibold w-80 transition-opacity duration-1000 ${
//             textVisible ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           ... qui m&aposaide vraiment à soulager mon mal de dos, mon diastasis ou mes petites fuites.
//         </p>
//       </div>
//     )}
//   </div>
//   <div className="flex flex-row gap-2 items-center mt-2">
//     <div
//       className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-md ${
//         activeIndex === 2 ? 'bg-[color:--primary] scale-110' : 'bg-gray-300'
//       }`}
//     >
//       3
//     </div>
//     {activeIndex === 2 && (
//       <div
//         className={`text-[color:--primary] font-bold text-xl mt-1 transition-opacity duration-1000 ${
//           textVisible ? 'opacity-100' : 'opacity-0'
//         }`}
//       >
//         Je veux un programme post-accouchement ...
//       </div>
//     )}
//   </div>
// </div>


//     {/* Slide 4 */}
// <div
//   className={`flex flex-col h-full transition-all duration-1000 ease-in-out`}
//   onMouseEnter={() => {
//     setActiveIndex(3);
//     setTimeout(() => setTextVisible(true), 250);
//   }}
//   onMouseLeave={() => {
//     setActiveIndex(3);
//     setTextVisible(true);
//   }}
//   style={{ flex: activeIndex === 3 ? 4 : 0.5 }}
// >
//   <div className="rounded-xl overflow-hidden h-[500px] w-full relative">
//     <div
//       className={`absolute inset-0 transition-opacity duration-1000`}
//       style={{
//         backgroundImage: `url('/slide_bg4.png')`,
//         backgroundSize: 'cover', // Adjusted to reduce zoom
//         backgroundRepeat: 'no-repeat', // Ensure it doesn't repeat
//         backgroundPosition: 'center',
//         opacity: activeIndex === 3 ? 1 : 0,
//       }}
//     />
//     <div
//       className={`absolute inset-0 transition-opacity duration-1000`}
//       style={{
//         backgroundColor: activeIndex === 3 ? 'transparent' : '#6F508D',
//         opacity: activeIndex === 3 ? 0 : 1,
//       }}
//     />
//     {activeIndex === 3 && (
//       <div className="h-full w-full flex flex-col justify-center items-start text-center text-white p-4">
//         <p
//           className={`text-2xl font-bold w-80 transition-opacity duration-1000 ${
//             textVisible ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           ... avant de reprendre mon sport préféré.
//         </p>
//       </div>
//     )}
//   </div>
//   <div className="flex flex-row gap-2 items-center mt-2">
//     <div
//       className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-md ${
//         activeIndex === 3 ? 'bg-[color:--primary] scale-110' : 'bg-gray-300'
//       }`}
//     >
//       4
//     </div>
//     {activeIndex === 3 && (
//       <div
//         className={`text-[color:--primary] font-bold text-xl mt-1 transition-opacity duration-1000 ${
//           textVisible ? 'opacity-100' : 'opacity-0'
//         }`}
//       >
//         Je veux préparer mon corps en toute sécurité ...
//       </div>
//     )}
//   </div>
// </div>

// </div>

//   );
// };

// export default Slider;
