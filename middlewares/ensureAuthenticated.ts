import { Request, Response, NextFunction } from "express";
import { verify  } from "jsonwebtoken";

interface Ipaylood {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

const authToken = request.headers.authorization;

if (!authToken) {
    return response.status(401).end();
}

const [,token] = authToken.split(" ")


try {
    const { sub } = verify(token, "88e55bac1b3cab315ad67a2a1b5dfc80") as Ipaylood;
    

   request.user_id = sub;


    return next ();
}   catch (err) {
    return response.status(401).end();
    }





}