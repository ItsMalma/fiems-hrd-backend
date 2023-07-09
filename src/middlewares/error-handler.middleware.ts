import { ErrorRequestHandler, RequestHandler } from "express";
import { Payload } from "@/dtos/payload";

export function notFoundHandler(): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (req, res, _next) {
    res.status(404).json(new Payload(null, `route '${req.method} ${req.path}' not found`));
  };
}

export function errorHandler(): ErrorRequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (err, req, res, _next) {
    switch (err) {
    default:
      res.status(500).json(new Payload(null, "internal server error"));
      break;
    }
  };
}