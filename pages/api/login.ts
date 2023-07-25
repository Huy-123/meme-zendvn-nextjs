// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method not Allowed",
    });
  }

  const data = req.body;

  // console.log("1. API/Run Login | data = ", data);

  try {
    const resHeroku = await api.callJson("/member/login.php", {
      data: data,
      method: method,
    });

    const currentTime = new Date();
    const nextYear = new Date(
      currentTime.getFullYear() + 1,
      currentTime.getMonth()
    );

    if (resHeroku.status === 200) {
      // res.statusCode = 200;
      res.statusCode = 302;
      res.setHeader("Location", "/"); // Tự động redirect sáng trang Home
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Set-Cookie",
        `token=${resHeroku.token}; expires=${nextYear.toUTCString()}; Path=/`
      );
      res.json(resHeroku);
    } else {
      res.statusCode = 302;
      res.setHeader("Location" , '/login?error=Failed');
      res.json(resHeroku)
    }



  } catch (e) {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// console.log("method: ", req.method);

// if(req.method === "POST"){
//   res.statusCode = 200
//   res.json({ name: 'John Doe' })
// } else {
//   res.statusCode = 500
//   res.json({
//     status: 500,
//     message: 'Method not allowed'
//   })
// }

// Gọi Server NextJS -> Gọi Server Heroku
