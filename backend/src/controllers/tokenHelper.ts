import jwt from "jsonwebtoken";
import { config } from "../config";
import { NextFunction, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";

export function getAccessToken(payload: JWT.Payload) {
  return jwt.sign(payload, config.jwt.accessTokenKey, {
    expiresIn: config.jwt.accessTokenExpirationTime,
  });
}

export function getRefreshToken(payload: JWT.Payload) {
  return jwt.sign(payload, config.jwt.refreshTokenKey, {
    expiresIn: config.jwt.refreshTokenExpirationTime,
  });
}

export function refreshTokenValid(token: string) {
  try {
    const jwtPayload = jwt.verify(
      token,
      config.jwt.refreshTokenKey
    ) as JWT.Payload;
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = jwtPayload.exp && jwtPayload.exp <= currentTime;

    return !isExpired;
  } catch (error) {
    return false;
  }
}

export function refreshUsingRefreshToken(
  res: Response,
  refreshToken: string,
  next?: NextFunction
) {
  if (refreshToken && refreshTokenValid(refreshToken)) {
    refreshAccessToken(res, refreshToken);
    res.status(HttpStatus.OK);
    if (next) {
      next();
    } else {
      res.send({ message: "Refreshed access token" });
    }
    return;
  }

  res
    .status(HttpStatus.UNAUTHORIZED)
    .send({ message: "Invalid refresh token" });
  return;
}

export function accessTokenValid(token: string) {
  try {
    jwt.verify(token, config.jwt.accessTokenKey);

    return true;
  } catch (error) {
    return false;
  }
}

export function accessTokenNotExpired(token: string) {
  try {
    const jwtPayload = jwt.verify(
      token,
      config.jwt.accessTokenKey
    ) as JWT.Payload;
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = jwtPayload.exp && jwtPayload.exp <= currentTime;

    return !isExpired;
  } catch (error) {
    return false;
  }
}

export function refreshAccessToken(res: Response, refreshToken: string) {
  const payload = getDataFromToken(refreshToken);
  const newAccessToken = getAccessToken(payload);
  res.header("Authorization", newAccessToken);
}

function getDataFromToken(token: string) {
  const { email, role } = jwt.decode(token) as JWT.Payload;
  return { email, role };
}
