import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {authorization} = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res
      .status(401)
      .json({success: false, message: "Not Authorized Login Again"});
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const token_decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
};

export default authMiddleware;
