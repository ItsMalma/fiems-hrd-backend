import { ErrorRequestHandler, RequestHandler } from "express";
import { Payload } from "@/dtos/payload";
import { RepositoryError, RepositoryErrorType } from "@/errors/repository.error";

export function notFoundHandler(): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (req, res, _next) {
    res.status(404).json(new Payload(null, `route '${req.method} ${req.path}' not found`));
  };
}

export function errorHandler(): ErrorRequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (err, req, res, _next) {
    if (err instanceof RepositoryError) {
      let statusCode = 500;
      
      switch (err.type) {
      case RepositoryErrorType.Duplicate:
        statusCode = 409;
        break;
      }
      
      res.status(statusCode).json(new Payload(null, err.message));
    } else {
      res.status(500).json(new Payload(null, "internal server error"));
    }
  };
}