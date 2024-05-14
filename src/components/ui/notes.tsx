// "use client";
// import { Button, Textarea } from "@material-tailwind/react";
// import { useState } from "react";

// function Notes() {
//   const [comments, setComments] = useState([1, 2, 3]);
//   const [commentText, setCommentText] = useState("");

//   const handleOnChange = (event) => {
//     setCommentText(event.target.value);
//   };

//   const handleAddComment = () => {
//     setComments([...comments, commentText]);
//     setCommentText("");
//   };

//   return (
//     <div className=" flex flex-col items-center justify-center gap-5 h-auto min-h-screen bg-blue-gray-800 p-4">
//       <div className=" flex flex-col gap-5 h-full w-3/5 min-h-screen bg-white rounded p-3">
//         <h1 className=" font-bold text-lg">Hellow World!</h1>
//         <Textarea
//           id="commentText"
//           placeholder="Enter text here~"
//           value={commentText}
//           rows={8}
//           className="w-full text-left whitespace-pre-wrap flex flex-wrap flex-grow justify-start !border !border-gray-300 bg-white text-gray-900 shadow-lg ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900"
//           labelProps={{
//             className: "hidden",
//           }}
//           onChange={handleOnChange}
//         />
//         <Button color="green" className="h-auto w-fit text-[18px]" onClick={handleAddComment}>
//           Reply
//         </Button>
//         <h1 className=" font-bold text-lg">Comments</h1>
//         {comments.map((comment, index) => {
//           return (
//             <div key={index} className="flex font-semibold rounded-lg border-2 h-full w-full p-2">
//               <h1>{comment.user}</h1>
//               <h1 className="text-[#999999] ">{comment.body}</h1>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Home;
