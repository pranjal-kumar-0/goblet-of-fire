// "use client";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/firebase.config"; // import your db from firebase.js

// function Users() {
//   const [emails, setEmails] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const allEmails = querySnapshot.docs.map(doc => doc.data().email);

//         // ✅ remove duplicates
//         const uniqueEmails = [...new Set(allEmails)];

//         setEmails(uniqueEmails);
//         console.log("Unique Emails:", uniqueEmails);
//       } catch (error) {
//         console.error("Error fetching emails:", error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   return (
//     <div>
//       <h2>User Emails</h2>
//       <ul>
//         {emails.map((email, idx) => (
//           <li key={idx}>{email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Users;
