import jwt from "jsonwebtoken";

export const checkLogin = (req, res, next) => {
  //let cookies =
    //Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  const cookies = req.signedCookies;
  //console.log("Signed Cookies: ", req.signedCookies);
  //console.log("Unsigned Cookies: ", req.cookies); 

  if (cookies && cookies[process.env.COOKIE_NAME]) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const {username, userId} = decoded;
      req.userId = userId;
      next();
    } catch (err) {
      
        //res.redirect("/");
        res.status(402).send("error in cookie!");
        console.log(err);
      
    }
  } else {
    
      //res.redirect("/");
      res.status(403).send("cookie not found!");
    
  }
};

