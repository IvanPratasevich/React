import { apiUrl } from '../constants/constants';
import { rest } from 'msw';
import { characters, character } from './characters';

export const handlers = [
  rest.get(`${apiUrl}/characters`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters));
  }),

  rest.get(`${apiUrl}/characters/id/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(character));
  }),
];

export const errorHandlers = [
  rest.get(`${apiUrl}/characters`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        statusCode: 500,
        message: 'Internal Server Error',
      })
    );
  }),

  rest.get(`${apiUrl}/characters/id/:id`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        statusCode: 500,
        message: 'Internal Server Error',
      })
    );
  }),
];
